"use client";

import React from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";
import Link from "next/link";

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const excludedPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/delete-account",
    "/dashboard",
  ];

  const isExcluded = excludedPaths.some((path) => pathName.startsWith(path));

  if (isExcluded) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm ">
      <div className="mx-auto px-5 sm:px-10 md:px-20 lg:px-[80px]">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 ">
            <Link href="/" passHref>
              <Image
                className={"w-[130px] h-fit cursor-pointer"}
                src={logo}
                alt={"logo.png"}
              />
            </Link>
          </div>
          <DesktopNavMenu />
          <MobileNavMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
