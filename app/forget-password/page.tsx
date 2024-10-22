"use client"

import React, {Suspense, useEffect, useState} from 'react';
import {Formik, Form, Field, FormikHelpers, FormikValues} from 'formik';
import * as Yup from 'yup';
import Buttons from "@/components/Buttons";
import Image from "next/image";
import logopng from "@/public/logo.png";
import {useForgetPassword} from '@/hooks/user/useForgetPassword';
import ResetPasswordSuccess from "@/app/reset-password/components/ResetPasswordSuccess";
import ErrorHandler from "@/app/reset-password/components/ErrorHandler";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

interface FormValues {
    newPassword: string;
    confirmPassword: string;
}

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
});

const ForgetPassword: React.FC = () => {
    const {error, mutate: forgetPasswordMutation, isSuccess, isPending, isError} = useForgetPassword();
    const [showErrorPopUp, setShowErrorPopUp] = React.useState<boolean>(false);
    const handleCloseErrorPopup = () => {
        setShowErrorPopUp(false);
    };
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const emailParam = queryParams.get("email");

            if (emailParam) {
                setEmail(emailParam);
                setShowErrorPopUp(true);
            }
        }
    }, []);

    React.useEffect(() => {
        if (isError) {
            setShowErrorPopUp(true);
        }
    }, [isError]);

    const handleSubmit = (
        values: FormikValues,
        {setSubmitting}: FormikHelpers<FormValues>
    ) => {
        forgetPasswordMutation({
            email: email || "",
            newPassword: values.newPassword,
        });
        setSubmitting(false);
    };

    return (
        <div className={""}>
            <Suspense fallback={<LoadingStateAnimation/>}>
                <div
                    className={"bg-gradient-to-br from-greensecondary to-earth w-screen p-6 md:p-0  min-h-[90vh] flex items-center justify-center"}>
                    {isSuccess && <ResetPasswordSuccess isOpen={true}/>}
                    {isError && <ErrorHandler message={error?.message || 'An unexpected error occurred.'}
                                              isOpen={showErrorPopUp} onClose={handleCloseErrorPopup}/>}

                    <div className={"bg-white p-6 md:p-10 rounded-xl h-1/2 w-full md:w-1/3 "}>
                        <h1 className={"font-semibold text-xl md:text-3xl mb-2 text-greenr"}>Forget Password</h1>
                        <p className={"mb-8 text-xs md:text-sm text-slate-500"}>Please enter your new password</p>
                        <Formik
                            initialValues={{newPassword: '', confirmPassword: ''}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({errors, touched, isSubmitting}) => (
                                <Form>
                                    <div className={"flex flex-col mb-4 text-[15px]"}>
                                        <label className={"text-xs md:text-base font-semibold mb-1"}
                                               htmlFor="newPassword">New Password</label>
                                        <Field type="password" name="newPassword"
                                               className="border border-greenr rounded-md pl-3 md:h-10 h-8 text-xs z-10"
                                        />
                                        {errors.newPassword && touched.newPassword &&
                                            <div className={"text-red-600 font-medium text-sm mt-1"}>{errors.newPassword}</div>}
                                    </div>

                                    <div className={"flex flex-col mb-4 text-[15px]"}>
                                        <label className={"text-xs md:text-base font-semibold mb-1"}
                                               htmlFor="confirmPassword">Confirm Password</label>
                                        <Field type="password" name="confirmPassword"
                                               className="border border-greenr rounded-md pl-3 md:h-10 h-8 text-xs z-10"
                                        />
                                        {errors.confirmPassword && touched.confirmPassword &&
                                            <div className={"text-red-600 font-medium text-sm mt-1"}>{errors.confirmPassword}</div>}
                                    </div>

                                    {isPending ? <LoadingAnimation/> :
                                        <div className={"flex justify-end mt-5"}>
                                            <Buttons value={"Set New Password"} type={"submit"}
                                                     className={"text-sm md:text-xl"}
                                                     disabled={isSubmitting}></Buttons>
                                        </div>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div
                    className={"bg-white w-full grid grid-cols-2 md:h-20 md:flex justify-between items-center p-5 md:px-[160px]"}>
                    <p className="text-[10px] md:text-[12px] font-semibold ">
                        &copy; 2011-2024 Rooms,Inc. A Waki company. All Rights Reserved.
                    </p>
                    <div className={"flex justify-end"}>
                        <Image
                            src={logopng}
                            alt="logo.png"
                            className="w-16 md:w-36 h-fit"
                        />
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default ForgetPassword;