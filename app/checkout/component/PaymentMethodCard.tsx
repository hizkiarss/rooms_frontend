import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormikProps } from "formik";

interface FormValues {
  travelerName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  paymentMethod: string;
}

interface PaymentMethodCardProps {
  formik: FormikProps<FormValues>;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ formik }) => {
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <div className="flex text-sm pt-2 text-green-700">
            <div className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              <span>We use secure transmission</span>
            </div>
            <div className="flex items-center ml-1.5">
              <Check className="w-3 h-3 mr-1" />
              <span>We protect your personal information</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Tabs
            defaultValue="manual"
            // onValueChange={(value) =>
            //   formik.setFieldValue("paymentMethod", value)
            // }
            className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Transfer</TabsTrigger>
              <TabsTrigger value="auto">Payment Gateway</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  By choosing manual transfer, you'll proceed to a page showing
                  the payment amount and the bank account details. Once you've
                  made the transfer, navigate to the 'My Order' section, open
                  the relevant transaction, and you'll find a form to upload
                  your payment proof. After you've uploaded the receipt, please
                  wait for our team to validate your payment. Upon approval, the
                  status of your order will change.
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="auto">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  By choosing the payment gateway, you will proceed to a page
                  that outlines the amount to be paid and the payment methods
                  you can use. Follow the instructions provided for each method.
                  After completing your payment, the system will validate your
                  order, and your order status will be approved.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="pl-2 pt-2">
            <RadioGroup
              defaultValue="manual"
              onValueChange={(value) =>
                formik.setFieldValue("paymentMethod", value)
              }>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="r2" />
                <Label htmlFor="r2">Manual Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="r3" />
                <Label htmlFor="r3">Payment Gateway</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodCard;
