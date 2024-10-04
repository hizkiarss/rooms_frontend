import React from 'react';
import LoginAdsPropertyDetailAnimation from "@/components/animations/LoginAdsPropertyDetail";
import Buttons from "@/components/Buttons";

const LoginAdsPropDetail = () => {
    return (
        <div className={"flex items-center justify-between bg-gradient-to-tr from-greenr to-slate-200  px-4 rounded-lg mt-4 "}>
            <div className={"flex items-center gap-3"}>

                <LoginAdsPropertyDetailAnimation/>
                <div className={"font-semibold text-white "}>Login to get all the benefits!</div>
            </div>

            <button  className={"h-fit bg-white text-[#007989] px-8 py-2 rounded-xl font-semibold text-lg hover:bg-greenr hover:text-white transition duration-200"}> Login </button>

        </div>
    );
};

export default LoginAdsPropDetail;