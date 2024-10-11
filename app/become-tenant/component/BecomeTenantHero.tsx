import AnimationWrapper from "@/components/animations/AnimationWrapper";
import React from "react";

const BecomeTenantHero = () => {
  return (
    <div>
      <div className="bg-[url('/becomeTenant.webp')] bg-cover bg-bottom bg-black bg-blend-overlay bg-opacity-30 w-full h-[80vh] flex flex-col gap-5 items-center justify-center px-5 sm:px-10 md:px-20 lg:px-[80px]">
        <div className="flex flex-col w-full justify-start items-start ">
          <AnimationWrapper
            y={40}
            transition={{ ease: "easeOut", duration: 1 }}>
            <h1
              className={
                "font-semibold text-3xl md:text-5xl lg:text-7xl w-3/4  text-white"
              }>
              Rent your property confidently with rooms
            </h1>
            <div className="lg:text-2xl w-2/4 text-white mt-8">
              Trusted for decades, rooms empowers hosts to earn more and welcome
              guests with ease. Let&apos;s start your hosting journey!
            </div>{" "}
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default BecomeTenantHero;
