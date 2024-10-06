"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import circle_png from "@/public/login/circle.png";
import google_logo from "@/public/login/google-logo.png";
import logo from "@/public/logo.png";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import LoginErrorPopUp from "@/app/login/components/LoginErrorPopUp";
import Buttons from "@/components/Buttons";

const Page = () => {
    const router = useRouter();
    const {status} = useSession();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openErrorPopUp, setOpenErrorPopUp] = useState(false);
    const closeErrorPopUp = () => setOpenErrorPopUp(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        setError(null);
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });
            console.log(result);
            if (result?.error) {
                router.push(`/login?error=${encodeURIComponent(result.error)}`);
                setError(result.error);
                setOpenErrorPopUp(true);
            } else if (result?.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setError("An unexpected error occurred. Please try again.");
            // setOpenErrorPopUp(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitGoogle = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const result = await signIn("google", {redirect: false});
            if (result?.error) {
                setError("Login Failed. Please try again.");
                console.error(result?.error);
            } else if (result?.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);



    return (
        <div
            className="min-h-screen overflow-hidden flex md:block justify-center items-center bg-[url('/login/login-bg.jpg')] bg-cover bg-right-top md:bg-none text-greenr">
            {}
            <LoginErrorPopUp errorMessage={error || ""} isOpen={openErrorPopUp} onClose={closeErrorPopUp}/>
            <div>
                <Image src={logo} alt="logo"
                       className="absolute left-[79px] md:right-10 top-[155px] md:top-10 w-14 md:w-32 h-fit z-10 md:z-0"/>
            </div>
            <div className="block md:grid md:grid-cols-2 md:gap-10">
                <div
                    className="hidden relative col-span-1 h-screen bg-[url('/login/login-bg.jpg')] bg-cover font-semibold text-white text-[100px] md:flex items-end pl-8 pb-10 leading-[110px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="z-10">Book. <br/>Relax. <br/>Repeat. <br/></div>
                </div>

                <div
                    className="col-span-1 flex flex-col md:justify-center px-12 pt-16 md:px-pt-0 pb-12 md:pb-0 md:px-32 relative rounded-3xl bg-white bg-opacity-90">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div>
                                <h2 className="font-semibold text-3xl md:text-6xl mb-5 md:mb-10">Welcome back.</h2>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="font-semibold text-sm">Email</label>
                                    <Field type="email" name="email" id="email"
                                           className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-xs text-greenr z-10"/>
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1"/>
                                </div>
                                <div className="flex flex-col gap-1 mt-3 md:mt-6">
                                    <label htmlFor="password" className="font-semibold text-sm">Password</label>
                                    <Field type="password" name="password" id="password"
                                           className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-xs z-10"/>
                                    <ErrorMessage name="password" component="div"
                                                  className="text-red-600 text-sm mt-1"/>
                                    <button className="text-end font-semibold mt-1 text-xs md:text-sm">Forgot
                                        password?
                                    </button>
                                </div>
                            </div>
                            <Buttons value="Sign in"
                                     className="w-full font-semibold border !important border-white md:border-none rounded-md text-sm md:text-xl mt-8 md:mt-5"
                                     type="submit" disabled={isLoading}/>
                        </Form>
                    </Formik>

                    <p className="font-semibold text-xs md:text-base text-center mt-[3px] md:mt-2">or</p>
                    <button onClick={handleSubmitGoogle}
                            className="w-full font-semibold rounded-md text-sm md:text-lg mt-[3px] md:mt-2 border border-greenr flex items-center justify-center gap-2 p-2">
                        <Image src={google_logo} alt="google_logo" className="w-5 h-5"/>
                        <p>Sign in with Google</p>
                    </button>

                    <div className="hidden md:block absolute bottom-0 right-0 w-[300px] h-[300px] overflow-hidden">
                        <div className="absolute -bottom-32 -right-28 w-[300px] h-[300px]">
                            <Image src={circle_png} alt="circle.png"/>
                        </div>
                    </div>

                    <div className="hidden md:block absolute top-0 -left-10 w-[400px] h-[400px] overflow-hidden">
                        <div className="absolute -top-52 -left-[250px] w-[400px] h-[400px]">
                            <div className="border-greenr rounded-full border h-full w-full"></div>
                        </div>
                    </div>

                    <div className="hidden md:block absolute top-32 -left-10 w-[200px] h-[200px] overflow-hidden">
                        <div className="absolute -left-[100px] w-[200px] h-[200px]">
                            <div className="border-greenr rounded-full border h-full w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;