"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

import animationData from "../../public/animations/on2.json";

const OnAnimation = () => {
    return (
        <div className="">
            <LottieAnimation
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 28, height: 24 }}
                className={"w-fit"}
            />
        </div>
    );
};

export default OnAnimation;
