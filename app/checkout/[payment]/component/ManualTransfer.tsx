"use client";
import UploadPaymentProofForm from "@/app/dashboard/payment-confirmation/component/UploadPaymentProofForm";
import TransactionExpired from "@/components/TransactionExpired";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PaymentProofType } from "@/types/payment-proof/PaymentProofType";
import { AlertCircle, Copy, Info, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ManualTransferProps {
  totalPrice: number;
  createdAt: string;
  transactionId?: string;
  paymentProof: PaymentProofType[];
}

const ManualTransfer: React.FC<ManualTransferProps> = ({
  totalPrice,
  createdAt,
  transactionId,
  paymentProof,
}) => {
  const accountNumber = "52 6032 2488";
  const formattedTotalPayment = totalPrice.toLocaleString("id-ID");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");
  const router = useRouter();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const createdAtDate = new Date(createdAt);
      const expirationDate = new Date(createdAtDate.getTime() + 60 * 60 * 1000);
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
  }, [createdAt]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDialogClose = () => {
    router.push("/user-profile");
  };

  return (
    <div>
      <Card className="w-full  max-w-3xl mx-auto">
        <CardHeader className="bg-greenr text-white p-4">
          <CardTitle className="text-lg font-medium">
            {timeLeft == "00:00:00" ? (
              "Oops! Your payment window has expired."
            ) : (
              <>
                We&apos;re holding this price for you! Let&apos;s complete your
                payment in {timeLeft}
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {timeLeft == "00:00:00" ? (
            <TransactionExpired />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bank Transfer</h2>
                <div className="flex items-start text-xs text-gray-600">
                  <Shield className="w-4 h-4 mr-1" />
                  100% SECURITY GUARANTEE
                </div>
              </div>
              <div>
                Here are the bank details and the amount you need to transfer.
                Make sure to carefully review the account information and the
                payment total to avoid any mistakes.
              </div>
              <h3 className="font-semibold mb-2 mt-4">Make a Transfer to:</h3>
              <div className="flex items-center mb-4">
                <img
                  src="/bankLogo/bcaLogo.png"
                  alt="BCA Logo"
                  className="w-25 h-12 mr-2"
                />
                <div>
                  <p className="font-semibold">Bank BCA</p>
                  <p className="text-sm">PT. Kuki Sukses Makmur</p>
                </div>
              </div>

              <div className="flex justify-between space-x-3 items-center mb-4">
                <Input value={accountNumber} readOnly className="bg-gray-100" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(accountNumber)}>
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(totalPrice.toString())}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="bg-yellow-100 p-3 rounded-md flex items-start mb-4">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <p className="text-sm">
                  Transfer according to the total payment up to the last 3
                  digits for ease of verification.
                </p>
              </div>

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
      {paymentProof && paymentProof.length === 0 && (
        <Button
          onClick={() => setOpenUploadDialog(true)}
          className="w-full mt-5 rounded-lg py-3 text-center">
          Upload Payment Proof
        </Button>
      )}

      <Dialog
        open={openUploadDialog}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          }
          setOpenUploadDialog(open);
        }}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {" "}
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Upload Payment Proof
            </h4>
          </DialogTitle>

          <UploadPaymentProofForm transactionId={transactionId || ""} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualTransfer;
