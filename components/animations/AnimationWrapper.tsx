"use client";
import React from "react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimationWrapperProps {
  y?: number | undefined;
  transition: object;
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  transition,
  y,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: transition,
      });
    } else {
      controls.start({
        opacity: 0,
        y: 40,
      });
    }
  }, [controls, inView]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls}>
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
