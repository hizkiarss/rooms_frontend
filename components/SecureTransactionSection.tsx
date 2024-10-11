import Image from "next/image";
import React from "react";
import ae from "@/public/footer/americanexpress.webp";
import jcb from "@/public/footer/jcb.webp";
import mc from "@/public/footer/mastercard.webp";
import visa from "@/public/footer/visa.webp";

const SecureTransactionSection: React.FC = () => {
  return (
    <div className="mt-6 md:mt-0">
      <p className="font-semibold mb-2 md:mb-6">Secure your transaction</p>
      <div className="flex gap-3 items-center flex-wrap">
        {[visa, mc, jcb, ae].map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`${logo}.webp`}
            className="w-14 h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default SecureTransactionSection;
