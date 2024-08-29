"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Buttons from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";

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
}

const travelers: Traveler[] = [
  { id: 1, name: "Kuki Labs", firstName: "Kuki", lastName: "Labs" },
  { id: 2, name: "Add Traveler", firstName: "", lastName: "" },
];

const FormCheckoutCard: React.FC<FormCheckoutCardProps> = ({ formik }) => {
  const [selectedTraveler, setSelectedTraveler] = useState<Traveler | null>(
    null
  );

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
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Who's checking in?</CardTitle>
        <div className="text-sm text-muted-foreground">
          <div className="mb-2">
            <span className="font-semibold text-black">Room 1:</span> 2 Adults,
            1 King-Bed, Non-smoking
          </div>
          <div className="flex text-green-700">
            <div className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              <span>Breakfast included</span>
            </div>
            <div className="flex items-center ml-1.5">
              <Check className="w-3 h-3 mr-1" />
              <span>Free parking</span>
            </div>
            <div className="flex items-center ml-1.5">
              <Check className="w-3 h-3 mr-1" />
              <span>Free WiFi</span>
            </div>
          </div>
        </div>
      </CardHeader>
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
              <Select
                value={countryCode}
                onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="border border-gray-300 w-1/3 rounded-l-md px-2 py-2 ">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">USA +1</SelectItem>
                  <SelectItem value="+44">UK +44</SelectItem>
                  <SelectItem value="+33">FRA +33</SelectItem>
                  <SelectItem value="+49">DEU +49</SelectItem>
                  <SelectItem value="+81">JPN +81</SelectItem>
                  <SelectItem value="+86">CHN +86</SelectItem>
                  <SelectItem value="+91">IND +91</SelectItem>
                  <SelectItem value="+7">RUS +7</SelectItem>
                  <SelectItem value="+39">ITA +39</SelectItem>
                  <SelectItem value="+61">AUS +61</SelectItem>
                  <SelectItem value="+34">ESP +34</SelectItem>
                  <SelectItem value="+55">BRA +55</SelectItem>
                  <SelectItem value="+27">ZAF +27</SelectItem>
                  <SelectItem value="+82">KOR +82</SelectItem>
                  <SelectItem value="+62">IDN +62</SelectItem>
                  <SelectItem value="+46">SWE +46</SelectItem>
                  <SelectItem value="+47">NOR +47</SelectItem>
                  <SelectItem value="+31">NLD +31</SelectItem>
                  <SelectItem value="+32">BEL +32</SelectItem>
                  <SelectItem value="+41">CHE +41</SelectItem>
                  <SelectItem value="+20">EGY +20</SelectItem>
                  <SelectItem value="+90">TUR +90</SelectItem>
                  <SelectItem value="+60">MYS +60</SelectItem>
                  <SelectItem value="+63">PHL +63</SelectItem>
                </SelectContent>
              </Select>

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
