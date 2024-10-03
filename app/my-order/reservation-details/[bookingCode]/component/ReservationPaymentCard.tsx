"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Dot, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ManualTransferDetails from "./ManualTransferDetails";

const ReservationPaymentCard = () => {
  const accountNumber = "52 6032 2488";
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="text-lg flex items-center mb-2">
            <div className="flex-col">
              <div>Property Name</div>
            </div>
          </div>
        </div>
        <Card className="w-full">
          <CardContent className="py-6 space-y-4">
            <div>Room Name</div>
            <Separator />
            <div>Price</div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                <Dot />
                <div>Night 1 x 1 Room</div>
              </div>
              <div>IDR 21313</div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex">
                <Dot />
                <div>Night 1 x 1 Room</div>
              </div>
              <div>IDR 21313</div>
            </div>
            <Separator />
            <div>Payment Method</div>
            <ManualTransferDetails />

            <Separator />
            <div className="flex items-center justify-between mt-4">
              <div>Total</div>
              <div>IDR 21313</div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
export default ReservationPaymentCard;
