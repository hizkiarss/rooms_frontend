"use client"

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import circle_png from "@/public/login/circle.png";
import Buttons from "@/components/Buttons";
import google_logo from "@/public/login/google-logo.png";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import WaitingForVerificationPopUp from "@/components/WaitingForVerificationPopUp";
import {useRegisterTenant} from "@/hooks/user/useRegisterTenant";
import EmailAlreadyUsedPopUp from "@/components/EmailAlreadyUsedPopUp";

interface FormValues {
    email: string;
    username: string;
    password: string;
    mobileNumber: string;
}

const Page: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {status} = useSession();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEmailAlreadyUsed, setIsEmailAlreadyUsed] = useState(false);

    const initialValues: FormValues = {
        email: "",
        username: "",
        password: "",
        mobileNumber: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        mobileNumber: Yup.string().required("Phone number is required"),
        username: Yup.string().required("Username is required"),
    });

    const {mutate: registerTenant} = useRegisterTenant();

    const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        setError(null);
        setIsLoading(true);

        try {
            await registerTenant({
                email: values.email,
                username: values.username,
                password: values.password,
                mobileNumber: values.mobileNumber,
            }, {
                onSuccess: (data) => {
                    console.log("Registration successful", data);
                    setIsPopupOpen(true);
                },
                onError: (error: any) => {
                    console.error("Registration failed", error);
                    if (error.message.includes("Email is already in use")) {
                        // formikHelpers.setFieldError("email", error.message);
                        setIsPopupOpen(false);
                        setIsEmailAlreadyUsed(true)
                    } else {
                        formikHelpers.setStatus({general: error.message});
                    }
                }
            });
        } catch (error: any) {
            console.error("Registration failed", error);
            if (error.message.includes("Email is already in use")) {
                formikHelpers.setFieldError("email", error.message);
            } else {
                formikHelpers.setStatus({general: error.message});
            }
        } finally {
            setIsLoading(false)
        }
    };

    const handleSubmitGoogle = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const result = await signIn("google", {redirect: false});
            if (result?.error) {
                setError("Login Failed. Please try again.");
                console.log(result.error);
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
            <WaitingForVerificationPopUp isOpen={isPopupOpen}/>
            <EmailAlreadyUsedPopUp isOpen={isEmailAlreadyUsed}/>
            <div className="block md:grid md:grid-cols-2 md:gap-10">
                {/* Left side (hidden on mobile) */}
                <div
                    className="hidden relative col-span-1 h-screen bg-[url('/login/login-bg.jpg')] bg-cover font-semibold text-white text-[100px] md:flex items-end pl-8 pb-10 leading-[110px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="z-10">
                        Book. <br/>
                        Relax. <br/>
                        Repeat. <br/>
                    </div>
                </div>

                {/* Right side (form) */}
                <div
                    className="col-span-1 flex flex-col md:justify-center px-12 pt-16 md:pt-0 pb-12 md:pb-0 md:px-32 relative rounded-3xl bg-white bg-opacity-90">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isValid, dirty}) => (
                            <Form>
                                <h2 className="font-semibold text-3xl md:text-6xl mb-5 md:mb-10">Welcome, partner.</h2>

                                {['email', 'username', 'mobileNumber', 'password'].map((fieldName) => (
                                    <div key={fieldName} className="flex flex-col gap-1 mt-3 md:mt-6">
                                        <label htmlFor={fieldName} className="font-semibold text-sm">
                                            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                        </label>
                                        <Field
                                            type={fieldName === 'password' ? 'password' : 'text'}
                                            name={fieldName}
                                            id={fieldName}
                                            className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-xs text-greenr z-10"
                                        />
                                        <ErrorMessage
                                            name={fieldName}
                                            component="div"
                                            className="text-red-600 text-sm mt-1"
                                        />
                                    </div>
                                ))}

                                {/* Forgot password link */}
                                <button type="button" className="text-end font-semibold mt-1 text-xs md:text-sm">
                                    Forgot password?
                                </button>

                                {/* Submit button */}
                                <Buttons
                                    value="Sign up"
                                    className={`w-full font-semibold border border-white md:border-none rounded-md text-sm md:text-xl mt-8 md:mt-5 ${
                                        !dirty || isLoading
                                            ? 'bg-opacity-90 cursor-not-allowed'
                                            : 'hover:bg-white text-greenr border border-greenr'
                                    }`}
                                    type="submit"
                                    disabled={!dirty || isLoading}
                                />
                            </Form>
                        )}
                    </Formik>


                    <p className="font-semibold text-xs md:text-base text-center mt-[3px] md:mt-2">or</p>

                    {/* Google Sign In button */}
                    <button
                        onClick={handleSubmitGoogle}
                        className="w-full font-semibold rounded-md text-sm md:text-lg mt-[3px] md:mt-2 border border-greenr flex items-center justify-center gap-2 p-2"
                    >
                        <Image src={google_logo} alt="google_logo" className="w-5 h-5"/>
                        <p>Sign up with Google</p>
                    </button>

                    {/* Decorative elements */}
                    <div className="hidden md:block absolute bottom-0 right-0 w-[300px] h-[300px] overflow-hidden">
                        <div className="absolute -bottom-40 -right-28 w-[300px] h-[300px]">
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