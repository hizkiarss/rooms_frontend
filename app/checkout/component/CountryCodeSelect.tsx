import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryCodeSelectProps {
  countryCode: string;
  onCountryCodeChange: (value: string) => void;
}

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  countryCode,
  onCountryCodeChange,
}) => {
  return (
    <Select value={countryCode} onValueChange={onCountryCodeChange}>
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
  );
};

export default CountryCodeSelect;
