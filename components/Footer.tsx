"use client";

import React from "react";
import logopng from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoAndContact from "./LogoAndContact";
import CompanyAndProduct from "./CompanyAndProduct";
import SupportAndApps from "./SupportAndApps";
import PartnerSection from "./PartnerSection";
import SecureTransactionSection from "./SecureTransactionSection";
import AwardsSection from "./AwardsSection";
import FollowUsSection from "./FollowUsSection";

const Footer = () => {
  const pathName = usePathname();
  const excludedPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
  ];

  const isExcluded = excludedPaths.some((path) => pathName.startsWith(path));

  if (isExcluded) {
    return null;
  }

  return (
    <section>
      <div className="border-solid border-b-[1px] border-gray-300"></div>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-20 lg:px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start border-solid border-b-[1px] pb-6">
          <LogoAndContact />
          <CompanyAndProduct />
          <SupportAndApps />
        </div>

        <div className="md:flex justify-between text-[13px] border-solid md:border-b-[1px] py-6 md:py-10">
          <PartnerSection />
          <SecureTransactionSection />
          <AwardsSection />
          <FollowUsSection />
        </div>

        <div className="flex gap-4 items-center md:justify-between mt-6 mb-12 md:mb-18">
          <p className="text-[12px] md:text-[12px]">
            &copy; 2011-2024 Rooms,Inc. A Waki company. All Rights Reserved.
          </p>
          <Image src={logopng} alt="logo.png" className="w-24 md:w-36 h-fit" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
