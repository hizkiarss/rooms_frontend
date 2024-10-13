import React from "react";
import LoginAdsAnimation from "@/components/animations/LoginAds";
import Buttons from "@/components/Buttons";
import { useSession } from "next-auth/react"; // Import useSession
const LoginAds = () => {
  const { data: session } = useSession();

  if (session) {
    return null;
  }
  return (
    <div className="bg-[#F3F8FA] pt-10 pb-2 px-5 sm:px-10 md:px-20 lg:px-[80px]">
      <div className="max-w-full md:max-w-[100%] h-auto px-5 sm:px-10 py-5 rounded-lg bg-white shadow-custom text-black flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4 justify-center items-center w-full md:w-auto">
          <LoginAdsAnimation />
          <div className="flex flex-col gap-1 w-full md:w-auto text-center md:text-left">
            <p className="font-semibold text-xl">Got any account yet?</p>
            <p className="text-sm">
              There are too many rewards waiting for you! Sign-in now
            </p>
          </div>
        </div>

        <button
          value={"Login now"}
          className="text-xl h-fit py-2 bg-[#CCE4E7] text-greenr font-semibold transition-colors duration-300 ease-out rounded-lg px-6 hover:text-greenr hover:bg-white hover:border-2 hover:border-[#007989]">
          Login now
        </button>
      </div>
    </div>
  );
};

export default LoginAds;
