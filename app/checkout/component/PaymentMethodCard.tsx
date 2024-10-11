import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";

interface FormValues {
  travelerName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  paymentMethod: string;
}

interface PaymentMethodCardProps {
  formik: FormikProps<FormValues>;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ formik }) => {
  // Local state to manage active tab
  const [activeTab, setActiveTab] = useState(
    formik.values.paymentMethod || "manual"
  );

  const handlePaymentMethodChange = (value: string) => {
    formik.setFieldValue("paymentMethod", value);
    setActiveTab(value); // Update active tab when radio button is selected
  };

  // Synchronize active tab with formik value
  useEffect(() => {
    setActiveTab(formik.values.paymentMethod);
  }, [formik.values.paymentMethod]);

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
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="manual"
                onClick={() => handlePaymentMethodChange("manual")}>
                Manual Transfer
              </TabsTrigger>
              <TabsTrigger
                value="bank"
                onClick={() => handlePaymentMethodChange("bank")}>
                Payment Gateway
              </TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Transfer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  Great choice! When you opt for manual transfer, you&apos;ll be
                  taken to a page that displays the payment amount along with
                  our bank account details. After you&apos;ve completed your
                  transfer, head over to the &apos;My Order&apos; section. Open the
                  relevant transaction, and you&apos;ll find a handy form to
                  upload your payment proof. Once you&apos;ve submitted your
                  receipt, just kick back and relax while our team validates
                  your payment. Once everything checks out, the status of your
                  order will change to reflect your payment!
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bank">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  Awesome choice! By selecting the payment gateway, you&apos;ll
                  be directed to a page that outlines how much you need to pay
                  and the various payment methods at your disposal. Just follow
                  the simple instructions for each method, and once you&apos;ve
                  completed your payment, our system will get to work validating
                  your order. Before you know it, your order status will be
                  approved, and you&apos;ll be one step closer to enjoying your
                  purchase!
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="pl-2 pt-2">
            <RadioGroup
              value={formik.values.paymentMethod}
              onValueChange={handlePaymentMethodChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="r2" />
                <Label htmlFor="r2">Manual Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="r3" />
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
