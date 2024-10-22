import React from 'react';
import LoginAdsPropertyDetailAnimation from "@/components/animations/LoginAdsPropertyDetail";



const LoginAdsPropDetail = () => {
    return (
        <div
            className={"flex items-center justify-between bg-gradient-to-tr from-greenr to-slate-200  px-2 md:px-4 rounded-lg mt-4 py-2 "}>
            <div className={"flex items-center gap-1 md:gap-3"}>

                <LoginAdsPropertyDetailAnimation/>
                <div className={"text-xs md:text-base font-semibold text-white "}>Login to get all the benefits!</div>
            </div>

            <button
                className={"h-fit bg-white text-[#007989] px-4 md:px-8 py-2 rounded-xl font-semibold text-sm md:text-lg hover:bg-greenr hover:text-white transition duration-200"}
                onClick={() => window.location.href = '/login'}>
                Login
            </button>

        </div>
    );
};

export default LoginAdsPropDetail;