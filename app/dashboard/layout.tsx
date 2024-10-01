import DashboardNavbar from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./component/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />

      <div className="lg:hidden w-full border-b ">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full bg-transparent py-3 px-4 flex items-start text-greenr hover:bg-gray-100">
              <Menu size={24} />
              <span className="ml-2 font-medium">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full flex relative">
        <div className="w-64 border-r border-[#CFCFCF] h-screen fixed hidden lg:block">
          <Sidebar />
        </div>

        <div className="w-full lg:ml-64 overflow-x-hidden">
          <div className="w-full min-h-screen">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
