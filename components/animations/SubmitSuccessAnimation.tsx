"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

import animationData from "../../public/animations/check.json";
import { Card, CardContent } from "../ui/card";
interface SubmitSuccessAnimationProps {
  message: string;
  onClose?: () => void;
}

const SubmitSuccessAnimation: React.FC<SubmitSuccessAnimationProps> = ({
  message,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="w-[300px] h-[300px] flex flex-col items-center justify-center border-transparent">
        <CardContent className="flex flex-col items-center justify-center">
          <LottieAnimation
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 240, height: 240 }}
          />
          <h4 className="scroll-m-20 text-greenr text-lg font-semibold tracking-tight overflow-hidden w-[280px] text-pretty text-center mt-4">
            {message}
          </h4>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitSuccessAnimation;
