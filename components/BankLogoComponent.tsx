import React from "react";
import {BankType} from "@/types/bank/BankType";

interface BankLogoComponentProps {
  selectedBank: BankType; // Use the defined type for selectedBank
}

const BankLogoComponent: React.FC<BankLogoComponentProps> = ({ selectedBank }) => {
  const bankInfo = {
    bca: {
      logo: "/bankLogo/bcaLogo.png",
      alt: "BCA Logo",
      name: "BCA Virtual Account",
    },
    bni: {
      logo: "/bankLogo/bniLogo2.jpeg",
      alt: "BNI Logo",
      name: "BNI Virtual Account",
    },
    bri: {
      logo: "/bankLogo/briLogo2.jpeg",
      alt: "BRI Logo",
      name: "BRI Virtual Account",
    },
  };

  const bank = bankInfo[selectedBank] || bankInfo.bca;

  return (
      <div className="flex items-center mb-4">
        <img src={bank.logo} alt={bank.alt} className="w-20 h-8 mr-2" />
        <h4 className="font-semibold">{bank.name}</h4>
      </div>
  );
};

export default BankLogoComponent;
