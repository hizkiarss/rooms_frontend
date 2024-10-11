"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

import animationData from "../../public/animations/no-slug.json";

const NoSlugAnimation = () => {
    return (
        <div className="">
            <LottieAnimation
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 350, height: 350 }}
            />
        </div>
    );
};

export default NoSlugAnimation;
