"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/unauthorized.json";

const UnauthorizedAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default UnauthorizedAnimation;
