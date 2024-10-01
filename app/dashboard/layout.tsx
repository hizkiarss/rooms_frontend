import DashboardNavbar from "@/components/DashboardNavbar";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";
import Sidebar from "./component/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <div className="w-full flex relative">
        <div className="w-64 border-r border-[#CFCFCF] h-screen fixed hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full lg:ml-64 overflow-x-hidden">
          <div className=" w-full min-h-screen">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
