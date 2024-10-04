"use client";
import Link from "next/link";
import React from "react";
import SidebarRoutes from "./SideBarRoutes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSelectedProperty from "@/hooks/useSelectedProperty";

const Sidebar = () => {
  const { selectedProperty, setSelectedProperty } = useSelectedProperty();

  return (
    <div className="w-full flex flex-col h-full bg-white">
      <div className="w-full px-5 pt-4">
        <div>
          <Select
            value={selectedProperty}
            onValueChange={(value) => setSelectedProperty(value)}>
            <SelectTrigger className="w-full border-transparent text-lg text-greenr focus:border-transparent focus:ring-0">
              <SelectValue
                className="font-bold text-2xl"
                placeholder="Select Property"
              />
            </SelectTrigger>
            <SelectContent className="font-semibold text-gray-600 hover:text-greenr text-2xl">
              <SelectGroup>
                <SelectLabel>Property</SelectLabel>
                <SelectItem value="My Hotel">My Hotel</SelectItem>
                <SelectItem value="1">Hotel 1</SelectItem>
                <SelectItem value="2">Hotel 2</SelectItem>
                <SelectItem value="3">Hotel 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 p-3 flex-grow">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
