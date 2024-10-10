import React from "react";
import Buttons from "@/components/Buttons";
import AnimationWrapper from "@/components/animations/AnimationWrapper";

const ListYourProperty = () => {
  return (
    <div className={"px-5 sm:px-10 md:px-20 lg:px-[80px] mb-20"}>
      <AnimationWrapper y={40} transition={{ ease: "easeOut", duration: 1 }}>
        <div
          className={
            "bg-[url('/homepage/listyourproperty.jpg')] h-[650px] bg-cover bg-center rounded-2xl"
          }>
          <div
            className={
              "w-full h-full bg-slate-600 bg-opacity-60 px-10 flex items-center rounded-2xl"
            }>
            <div>
              <h2
                className={
                  "text-white font-semibold text-5xl w-2/3 md:w-1/3  mb-10"
                }>
                List your property on Rooms and open your door to rental income
              </h2>
              <Buttons
                value={"List your property"}
                className={"text-xl transition-all duration-150"}
              />
            </div>
          </div>

          <div></div>
        </div>

        <div className={"mt-10"}>
          <h2 className={"text-3xl font-semibold mb-4"}>
            Discover what Rooms is all about{" "}
          </h2>
          <p>
            With a vast selection of bookable vacation rentals, Rooms connects
            homeowners with families and travelers seeking more than just a
            hotel for their getaway. The Rooms community offers a variety of
            rental property types and more. Explore properties in dream
            destinations around the globe. A simple Rooms property search makes
            it easy to securely book your next condo, cabin, or house anywhere
            in the world.{" "}
          </p>
        </div>

        <div className={"mt-10"}>
          <h2 className={"text-3xl font-semibold mb-4"}>
            Perfect Rental with Rooms
          </h2>
          <p>
            Whether you&apos;re planning a family getaway with your pet, a
            relaxing weekend escape, or an adventurous trip, Rooms has the
            perfect vacation rental for you. Discover everything from cozy
            mountain cabins and lakeside lodges to stunning city apartments and
            luxurious homes, all equipped with features to enhance your comfort
            and convenience. Enjoy amenities like extra bedrooms and
            fully-equipped kitchens for a stress-free stay. Plus, find rentals
            with extras such as waterfront views, private pools, hot tubs, and
            outdoor entertainment spaces to elevate your experience.{" "}
          </p>
        </div>
      </AnimationWrapper>
    </div>
  );
};

export default ListYourProperty;
