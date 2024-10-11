"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/loading-meditation.json";

const LoadingStateAnimation = () => {
  return (
    <div className="h-screen flex items-center justify-center">
        <div className={"h-1/2"}>
            <LottieAnimation
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 300, height: 300 }}
            />
        </div>

    </div>
  );
};

export default LoadingStateAnimation;
