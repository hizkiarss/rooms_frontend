import React from 'react';
import Image from "next/image";
import circle_png from "@/public/login/circle.png";
import Buttons from "@/components/Buttons";
import google_logo from "@/public/login/google-logo.png";
import logo from "@/public/logo.png";
import circle_outline from "@/public/login/circle_outline.png";

const Page = () => {
    return (
        <div className="min-h-screen overflow-hidden">
            <div>
                <Image src={logo} alt="logo" className={"absolute right-10 top-10 w-32 h-fit"}/>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div
                    className="relative col-span-1 h-screen bg-[url('/login/login-bg.jpg')] bg-cover font-semibold text-white text-[100px] flex items-end pl-8 pb-10 leading-[110px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="z-10">
                        Book. <br/>
                        Relax. <br/>
                        Repeat. <br/>
                    </div>

                </div>
                <div className="col-span-1 flex flex-col justify-center px-32 relative">
                    <div>
                        <h2 className="font-semibold text-6xl mb-10">Welcome back.</h2>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="Username" className="font-semibold ">Email</label>
                            <input type="text" id="Username" name="Username"
                                   placeholder="Enter your email"
                                   className="border border-black rounded-md pl-3 h-12 "/>
                        </div>
                        <div className="flex flex-col gap-1 mt-6">
                            <label htmlFor="Password" className="font-semibold">Password</label>
                            <input type="password" id="Password" name="Password"
                                   placeholder="Enter your password"
                                   className="border border-black rounded-md pl-3 h-12 "/>
                            <p className="text-end font-semibold mt-1 text-sm">Forgot password?</p>
                        </div>
                    </div>
                    <Buttons value={"Sign in"}
                             className={"w-full font-semibold rounded-md text-xl mt-5  "}></Buttons>
                    <p className="font-semibold text-center mt-2">or</p>
                    <button
                        className="w-full font-semibold rounded-md text-lg mt-2 border border-black flex items-center justify-center gap-2 p-2">
                        <Image src={google_logo} alt="google_logo" className="w-5 h-5"/>
                        <p className={"text-xl"}>Sign in with Google</p>
                    </button>


                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] overflow-hidden">
                        <div className="absolute -bottom-32 -right-28 w-[300px] h-[300px]">
                            <Image src={circle_png} alt="circle.png"/>
                        </div>
                    </div>

                    <div className="absolute top-0 -left-10 w-[400px] h-[400px] overflow-hidden">
                        <div className="absolute -top-52 -left-[250px]  w-[400px] h-[400px]">
                            <div className={"border-greenr rounded-full border h-full w-full "}>

                            </div>
                        </div>
                    </div>

                    <div className="absolute top-32 -left-10 w-[400px] h-[400px] overflow-hidden">
                        <div className="absolute -left-[100px]  w-[200px] h-[200px]">
                            <div className={"border-greenr rounded-full border h-full w-full "}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Page;
