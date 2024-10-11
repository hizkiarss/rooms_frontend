"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/EmptyAnimation.json";

interface EmptyDataAnimationProps {
  message: string;
  height: number;
  width: number;
}

const EmptyDataAnimation: React.FC<EmptyDataAnimationProps> = ({
  message,
  height,
  width,
}) => {
  return (
    <div className=" inset-0 flex flex-col items-center justify-center ">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: height, height: width }}
      />
      <h4 className="scroll-m-20 text-greenr text-lg font-semibold tracking-tight overflow-hidden w-[280px] text-pretty text-center mt-4">
        {message}
      </h4>
    </div>
  );
};

export default EmptyDataAnimation;
