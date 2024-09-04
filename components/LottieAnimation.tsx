import React from "react";
import Lottie from "lottie-react";
import { LottieComponentProps } from "lottie-react";

interface LottieAnimationProps extends Partial<LottieComponentProps> {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  ...props
}) => {
  return <Lottie animationData={animationData} {...props} />;
};

export default LottieAnimation;
