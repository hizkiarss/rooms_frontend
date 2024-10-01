import Image from "next/image";
import React from "react";
import iata from "@/public/footer/iata.webp";
import topbrand from "@/public/footer/topbrand.webp";
import superbrand from "@/public/footer/superbrand.webp";

const AwardsSection: React.FC = () => {
  return (
    <div className="mt-6 md:mt-0">
      <p className="font-semibold mb-2 md:mb-6">Awards</p>
      <div className="flex gap-3 items-center flex-wrap">
        {[iata, topbrand, superbrand].map((award, index) => (
          <Image
            key={index}
            src={award}
            alt={`${award}.webp`}
            className="w-9 md:w-10 h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
