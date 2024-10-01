"use client";
import React from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-20 lg:px-[130px]">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Image className={"w-[130px] h-fit"} src={logo} alt={"logo.png"} />
          </div>
          <DesktopNavMenu />
          <MobileNavMenu />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
