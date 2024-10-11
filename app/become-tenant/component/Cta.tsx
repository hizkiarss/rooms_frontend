"use client";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import Buttons from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface CtaProps {
  title: string;
  desc: string;
}

const Cta: React.FC<CtaProps> = ({ title, desc }) => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("register-tenant");
  };
  return (
    <div className="py-[64px] px-5 sm:px-10 md:px-14 lg:px-[80px] ">
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <div className=" flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <div className=" text-3xl font-semibold mb-4 lg:text-center">
              {title}
            </div>
            <div className=" max-w-[500px] mb-4 lg:text-center">{desc}</div>
            <div className=" max-w-[500px] mb-4 lg:text-center font-semibold text-greenr">
              #BookRelaxRepeat
            </div>
            <Buttons
              value={"Register now"}
              onClick={handleNavigation}
              className={"w-full my-5 rounded-lg"}
            />
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default Cta;
