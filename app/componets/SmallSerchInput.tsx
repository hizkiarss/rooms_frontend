import { SquarePen } from "lucide-react";
import React from "react";

interface SmallSearchInputProps {
  cityName: string;
  date: string;
  adult: number;
  childrenNumber: number;
}

const SmallSearchInput: React.FC<SmallSearchInputProps> = ({
  cityName,
  date,
  adult,
  childrenNumber,
}) => {
  return (
    <>
      <div className="border rounded-2xl py-2 px-4 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-3/4">
            <div className="font-semibold">{cityName}</div>
            <div className="flex  w-full justify-between">
              <div>{date}</div>
              <div>
                {adult}Adult, {childrenNumber} Children{" "}
              </div>
            </div>
          </div>
          <div>
            <SquarePen className="text-greenr" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallSearchInput;
