"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FormikProps } from "formik";
import { useSession } from "next-auth/react";
import { useFindUserbyEmail } from "@/hooks/user/useFindUserbyEmail";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import CountryCodeSelect from "./CountryCodeSelect";
import FormCheckoutHeaderCard from "./FormCheckOutHeaderCard";

interface Traveler {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
}

interface FormValues {
  travelerName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  paymentMethod: string;
}

interface FormCheckoutCardProps {
  formik: FormikProps<FormValues>;
  adult: number;
  childrenNumber: number;
  bedType: string;
  includeBreakfast: boolean;
}

const FormCheckoutCard: React.FC<FormCheckoutCardProps> = ({
  formik,
  adult,
  childrenNumber,
  bedType,
  includeBreakfast,
}) => {
  const [selectedTraveler, setSelectedTraveler] = useState<Traveler | null>(
    null
  );
  const { data: session } = useSession();
  const { data: user, isLoading } = useFindUserbyEmail(session?.user.email);
  const username = user?.username;

  const travelers: Traveler[] = [
    { id: 1, name: username || " ", firstName: username || " ", lastName: " " },
    { id: 2, name: "Add Traveler", firstName: "", lastName: "" },
  ];

  const handleTravelerChange = (traveler: Traveler) => {
    setSelectedTraveler(traveler);
    formik.setFieldValue("firstName", traveler.firstName);
    formik.setFieldValue("lastName", traveler.lastName);
  };
  const [countryCode, setCountryCode] = useState("+62");
  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    formik.setFieldValue(
      "mobileNumber",
      value + " " + formik.values.mobileNumber.split(" ")[1] || ""
    );
  };

  const handlemobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(countryCode + " ", "");
    const digitsOnly = input.replace(/\D/g, "");

    let formattedInput = "";
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += "-";
      }
      formattedInput += digitsOnly[i];
    }

    formik.setFieldValue("mobileNumber", countryCode + " " + formattedInput);
  };

  if (isLoading) return <LoadingAnimation />;
  return (
    <Card className="w-full">
      <FormCheckoutHeaderCard
        adult={adult}
        childrenNumber={childrenNumber}
        bedType={bedType}
        includeBreakfast={includeBreakfast}
      />
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="travelerName">Traveler name</Label>
            <Select
              onValueChange={(value) => {
                const traveler = travelers.find((t) => t.name === value);
                if (traveler) handleTravelerChange(traveler);
              }}>
              <SelectTrigger id="travelerName">
                <SelectValue placeholder="Select traveler" />
              </SelectTrigger>
              <SelectContent position="popper">
                {travelers.map((traveler) => (
                  <SelectItem key={traveler.id} value={traveler.name}>
                    {traveler.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="mobileNumber">Mobile phone number</label>
            <div className="flex gap-2">
              <CountryCodeSelect
                countryCode={countryCode}
                onCountryCodeChange={handleCountryCodeChange}
              />

              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="Mobile phone number"
                onChange={handlemobileNumberChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNumber}
                className={`border border-gray-300 rounded-md px-2 py-2 w-full ${
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>

            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="text-red-500">{formik.errors.mobileNumber}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default FormCheckoutCard;
