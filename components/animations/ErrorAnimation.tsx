"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/wizard.json";

const ErrorAnimation = () => {
  return (
    <div className="flex-col flex items-center justify-center ">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
      />
      <h4 className="scroll-m-20 text-lg tracking-tight w-[320px] text-pretty text-center">
        <p className={"font-semibold text-2xl mb-4"}>Well, this is awkward...</p>
          <p>but don&apos;t worry, our code wizards currently are casting a
              fix spell!</p>
      </h4>
    </div>
  );
};

export default ErrorAnimation;
