"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/LoadingDot.json";

const LoadingAnimation = () => {
  return (
    <div className=" inset-0 flex items-center justify-center ">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 70, height: 30 }}
      />
    </div>
  );
};

export default LoadingAnimation;
