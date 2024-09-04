"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/data-not-found.json";

const NoDataFoundAnimation = () => {
  return (
    <div className=" inset-0 flex items-center justify-center ">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default NoDataFoundAnimation;
