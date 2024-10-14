"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

import animationData from "../../public/animations/login-ads-propDetail.json";

const LoginAdsPropertyDetailAnimation = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize(); // Set initial width
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const animationSize = windowWidth < 768 ? 50 : 80;

    return (
        <div className="">
            <LottieAnimation
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: animationSize, height: animationSize }}
            />
        </div>
    );
};

export default LoginAdsPropertyDetailAnimation;