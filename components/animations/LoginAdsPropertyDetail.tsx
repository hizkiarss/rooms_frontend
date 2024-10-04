"use client";
import dynamic from "next/dynamic";
import React from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

import animationData from "../../public/animations/login-ads-propDetail.json";

const LoginAdsPropertyDetailAnimation = () => {
    return (
        <div className="">
            <LottieAnimation
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: 80, height: 80 }}
            />
        </div>
    );
};

export default LoginAdsPropertyDetailAnimation;
