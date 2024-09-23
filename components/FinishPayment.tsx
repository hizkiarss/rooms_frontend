"use client";
import ManualTransfer from "@/app/checkout/[payment]/component/ManualTransfer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePaymentByBookingCode } from "@/hooks/payment/usePaymentByBookingCode";
import { useTransactionsByBookingCode } from "@/hooks/transactions/useTransactionsByBookingCode";
import { PaymentMethodType } from "@/types/transactions/PaymentMethodType";
import { AlertCircle, Copy, Info, Shield } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NoDataFoundAnimation from "./animations/DataNotFoundAnimation";
import ErrorAnimation from "./animations/ErrorAnimation";
import LoadingStateAnimation from "./animations/LoadingStateAnimation";
import BankAccordion from "./BankAccordion";
import TransactionExpired from "./TransactionExpired";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const bankInfo = {
  bca: {
    logo: "/bankLogo/bcaLogo.png",
    alt: "BCA Logo",
    name: "BCA Virtual Account",
  },
  bni: {
    logo: "/bankLogo/bniLogo.jpeg",
    alt: "BNI Logo",
    name: "BNI Virtual Account",
  },
  bri: {
    logo: "/bankLogo/briLogo.jpeg",
    alt: "BRI Logo",
    name: "BRI Virtual Account",
  },
};
const FinishPayment = () => {
  const { bookingCode } = useParams<{ bookingCode: string }>();
  const payment = usePaymentByBookingCode();
  const transaction = useTransactionsByBookingCode(bookingCode);

  // Initializing hooks outside any conditional logic
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const createdAtDate = new Date(transaction.data?.createdAt ?? "");
      const expirationDate = new Date(createdAtDate.getTime() + 60 * 60 * 1000); // 1 hour
      const now = new Date();
      const difference = expirationDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("00:00:00");
      }
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [transaction.data?.createdAt]);

  if (transaction.data?.paymentMethod !== PaymentMethodType.BANK_TRANSFER) {
    return (
      <ManualTransfer
        totalPrice={transaction.data?.finalPrice ?? 0}
        createdAt={transaction.data?.createdAt ?? ""}
      />
    );
  }

  if (payment.isLoading) {
    return (
      <div>
        <LoadingStateAnimation />
      </div>
    );
  }

  if (payment.error) {
    return (
      <div>
        <ErrorAnimation />
      </div>
    );
  }

  if (!payment.data) {
    return (
      <div>
        <NoDataFoundAnimation />
      </div>
    );
  }

  const selectedBank =
    (payment.data.bank?.toLowerCase() as "bca" | "bri" | "bni") || "bca";
  const bank = bankInfo[selectedBank];
  const vaNumber = payment.data.vaNumber as string;
  const totalPayment = payment.data.grossAmount;
  const formattedTotalPayment = totalPayment?.toLocaleString("id-ID");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="bg-greenr text-white p-4">
          <CardTitle className="text-lg font-medium">
            {timeLeft == "00:00:00" ? (
              "Oops! Your payment window has expired."
            ) : (
              <>
                Nearly there! Finish up your payment in {timeLeft} and start the
                good times!
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {timeLeft == "00:00:00" ? (
            <>
              <TransactionExpired />
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-2">Make a Transfer to :</h3>
              <div className="flex items-center mb-4">
                <img src={bank.logo} alt={bank.alt} className="w-20 h-8 mr-2" />
                <h4 className="font-semibold">{bank.name}</h4>
              </div>
              <div className="flex justify-between space-x-3 items-center mb-4">
                <Input value={vaNumber} readOnly className="bg-gray-100" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(vaNumber)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="font-semibold mb-2">Total payment</h3>
              <div className="flex justify-between items-center space-x-3 mb-4">
                <Input
                  value={formattedTotalPayment}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <h3 className="font-semibold mb-2">How to pay:</h3>
              <BankAccordion bank={selectedBank} />
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <p className="text-sm">
                  Once payment is verified, e-ticket and proof of payment will
                  be sent to the registered email address.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinishPayment;
