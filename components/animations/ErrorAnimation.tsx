"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/wizard.json";

const ErrorAnimation = () => {
  return (
    <div className="flex-col inset-0 flex items-center justify-center ">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
      />
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight w-[320px] text-pretty">
        Well, this is awkward... but don't worry, our code wizards are casting a
        fix spell!
      </h4>
    </div>
  );
};

export default ErrorAnimation;
