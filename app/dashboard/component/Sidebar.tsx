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
import { useSession } from "next-auth/react";
import { useFindUserbyEmail } from "@/hooks/user/useFindUserbyEmail";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

const Sidebar = () => {
  const { selectedProperty, setSelectedProperty } = useSelectedProperty();
  const { data: session } = useSession();
  const { data: user, isLoading } = useFindUserbyEmail(session?.user.email);
  const hasProperties = user?.properties && user.properties.length > 0;
  return (
    <div className="w-full flex flex-col h-full bg-white">
      <div className="w-full px-5 pt-4">
        <div>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <Select
              value={selectedProperty}
              onValueChange={(value) => setSelectedProperty(value)}>
              <SelectTrigger className="w-full border-transparent text-lg text-greenr focus:border-transparent focus:ring-0">
                <SelectValue
                  className="font-bold text-2xl"
                  placeholder={
                    hasProperties
                      ? "Select Property"
                      : "You don't have any property"
                  }
                />
              </SelectTrigger>

              <SelectContent className="font-semibold text-gray-600 hover:text-greenr text-2xl">
                <SelectGroup>
                  <SelectLabel>Property</SelectLabel>
                  {hasProperties ? (
                    user.properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {property.name}
                        </span>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none">
                      You don't have any property
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="mt-4 p-3 flex-grow">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
