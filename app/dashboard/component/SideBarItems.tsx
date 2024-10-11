"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  FileChartColumnIncreasing,
  BedDouble,
  LayoutDashboard,
  ReceiptText,
  Handshake,
  MessagesSquare,
  House
} from "lucide-react";
import React from "react";

const iconMap = {
  LayoutDashboard,
  BedDouble,
  ReceiptText,
  Handshake,
  MessagesSquare,
  FileChartColumnIncreasing,
  House
};

interface SidebarItemsProps {
  href: string;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  textSize: string;
  icon: string;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  href,
  label,
  variant,
  textSize,
  icon,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname == href;

  const onClick = () => {
    router.push(href);
  };

  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={cn(
        "text-start flex justify-start h-10 gap-1 hover:border-b-8 hover:bg-white hover:border-greensecondary hover:text-greenr",
        isActive
          ? "text-greenr font-semibold border-r-8 border-greenr"
          : "text-gray-600 border-transparent"
      )}>
      <Icon />
      <p className={textSize}>{label}</p>
    </Button>
  );
};

export default SidebarItems;
