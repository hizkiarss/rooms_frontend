import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, Copy, Info, Shield } from "lucide-react";
import React from "react";

const ManualTransfer = () => {
  const accountNumber = "52 6032 2488";
  const totalPayment = "IDR 2.872.316";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here to indicate successful copy
  };

  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="bg-greenr text-white p-4">
          <CardTitle className="text-lg font-medium">
            We're holding this price for you! Let's complete your payment in
            00:29:33
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Bank Transfer</h2>
            <div className="flex items-start text-xs text-gray-600">
              <Shield className="w-4 h-4 mr-1" />
              100% SECURITY GUARANTEE
            </div>
          </div>
          <div>
            Here are the bank details and the amount you need to transfer. Make
            sure to carefully review the account information and the payment
            total to avoid any mistakes.
          </div>
          <h3 className="font-semibold mb-2 mt-4">Make a Transfer to :</h3>
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
            <Input value={totalPayment} readOnly className="bg-gray-100" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(totalPayment)}>
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
              Transfer according to the total payment up to the last 3 digits
              for ease of verification.
            </p>
          </div>

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

export default ManualTransfer;
{
  /* <div className="flex mt-4">
            <div className="w-6/12">
              <div className="flex-col">
                <div>Account Name</div>
                <div>PT. Kuki Sukses Makmur</div>
              </div>
            </div>
            <div className="w-6/12">
              <div className="flex-col">
                <div>Account Number</div>
                <div>312321312312312</div>
              </div>
            </div>
          </div> */
}
