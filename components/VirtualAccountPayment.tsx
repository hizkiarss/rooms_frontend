"use client";
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
import { AlertCircle, Copy, Info, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import NoDataFoundAnimation from "./animations/DataNotFoundAnimation";
import ErrorAnimation from "./animations/ErrorAnimation";
import LoadingStateAnimation from "./animations/LoadingStateAnimation";
import BankAccordion from "./BankAccordion";
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

const VirtualAccountPayment = () => {
  const payment = usePaymentByBookingCode();

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
            Nearly there! Finish up your payment in 00:29:33 and start the good
            times!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2 ">Make a Transfer to :</h3>
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
          <h3 className="font-semibold mb-2 ">How to pay:</h3>
          <BankAccordion bank={selectedBank} />
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <p className="text-sm">
              Once payment is verified, e-ticket and proof of payment will be
              sent to the registered email address.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualAccountPayment;
