"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/loading-meditation.json";

const LoadingStateAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <LottieAnimation
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default LoadingStateAnimation;
