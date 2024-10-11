import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { FormikProps, FormikValues } from "formik";
import TransactionExpired from "@/components/TransactionExpired";

interface BankOption {
  id: string;
  name: string;
  isNew: boolean;
  logoPath: string;
}
interface FormValues {
  bookingCode: string;
  bank: string;
}

interface BankOptionProps {
  formik: FormikProps<FormValues>;
  createdAt: string;
}

const bankOptions: BankOption[] = [
  {
    id: "bca",
    name: "BCA Virtual Account",
    isNew: true,
    logoPath: "/bankLogo/bcaLogo.png",
  },
  {
    id: "bri",
    name: "BRI Virtual Account",
    isNew: true,
    logoPath: "/bankLogo/briLogo.jpeg",
  },
  {
    id: "bni",
    name: "BNI Virtual Account",
    isNew: true,
    logoPath: "/bankLogo/bniLogo.jpeg",
  },
];

const BankOptionsCard: React.FC<BankOptionProps> = ({ formik, createdAt }) => {
  const [selectedBank, setSelectedBank] = useState<string>("bca");

  const handleBankSelection = (value: string) => {
    setSelectedBank(value);
    formik.setFieldValue("bank", value);
  };
  console.log("ini statenya", selectedBank);
  const [timeLeft, setTimeLeft] = useState("");

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

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-greenr text-white p-4">
        <CardTitle className="text-lg font-medium">
          {timeLeft !== "00:00:00" ? (
            <>
              We&apos;re holding this price for you! Let&apos;s complete your payment in{" "}
              {timeLeft}
            </>
          ) : (
            "Oops! Your payment window has expired."
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {timeLeft !== "00:00:00" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">How would you like to pay?</h2>
              <div className="flex items-start text-xs text-gray-600">
                <Shield className="w-4 h-4 mr-1" />
                100% SECURITY GUARANTEE
              </div>
            </div>
            <RadioGroup
              value={selectedBank}
              onValueChange={handleBankSelection}>
              <div className="space-y-4">
                <div className="font-semibold mb-2">Virtual Account</div>
                {bankOptions.map((bank, index) => (
                  <div
                    key={bank.id}
                    className={`${
                      selectedBank === bank.id
                        ? "bg-white text-greenr border border-greenr"
                        : ""
                    } rounded-md p-3 transition-colors duration-200`}>
                    <RadioGroupItem
                      value={bank.id}
                      id={bank.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={bank.id}
                      className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border rounded-full mr-3 ${
                            selectedBank === bank.id
                              ? "border-greenr bg-greenr"
                              : "border-gray-300"
                          }`}></div>
                        {bank.name}
                      </div>
                      <img
                        src={bank.logoPath}
                        alt={bank.name}
                        className="h-6"
                      />
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </>
        ) : (
          <TransactionExpired />
        )}
      </CardContent>
    </Card>
  );
};

export default BankOptionsCard;
