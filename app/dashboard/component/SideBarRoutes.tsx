"use client";
import React from "react";
import SidebarItems from "./SideBarItems";

const routes = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Rooms", href: "/dashboard/rooms", icon: "BedDouble" },
  { label: "My Property", href: "/dashboard/property", icon: "Housenpx kill-port 3000" },


  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: "ReceiptText",
  },
  {
    label: "Report",
    href: "/dashboard/report",
    icon: "FileChartColumnIncreasing",
  },
  {
    label: "Payment Confirmation",
    href: "/dashboard/payment-confirmation",
    icon: "Handshake",
  },
  { label: "Review", href: "/dashboard/review", icon: "MessagesSquare" },
];

const SidebarRoutes = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      {routes.map((route, index) => (
        <SidebarItems
          label={route.label}
          href={route.href}
          key={index}
          variant="ghost"
          textSize="text-base"
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
