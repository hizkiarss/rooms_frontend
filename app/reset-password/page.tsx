"use client"

import React, {Suspense, useEffect, useState} from 'react';
import {Formik, Form, Field, FormikHelpers, FormikValues} from 'formik';
import * as Yup from 'yup';
import Buttons from "@/components/Buttons";
import Image from "next/image";
import logopng from "@/public/logo.png";
import {useSearchParams} from "next/navigation";
import {useResetPassword} from '@/hooks/user/useResetPassword';
import data from "@react-google-maps/api/src/components/drawing/Data";
import ResetPasswordSuccess from "@/app/reset-password/components/ResetPasswordSuccess";
import {Simulate} from "react-dom/test-utils";
import ErrorHandler from "@/app/reset-password/components/ErrorHandler";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

interface FormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

}

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
});

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const {error, mutate: resetPasswordMutation, isSuccess, isPending, isError} = useResetPassword();
    const [showErrorPopUp, setShowErrorPopUp] = React.useState<boolean>(false);
    const handleCloseErrorPopup = () => {
        setShowErrorPopUp(false);
    };

    React.useEffect(() => {
        if (isError) {
            setShowErrorPopUp(true);
        }
    }, [isError]);

    const handleSubmit = (
        values: FormikValues,
        {setSubmitting}: FormikHelpers<FormValues>
    ) => {
        resetPasswordMutation({
            email: email || "",
            input: {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            },
        });
        setSubmitting(false);
    };


    return (

        <div>
            <Suspense fallback={<LoadingStateAnimation/>}>
                <div
                    className={"bg-gradient-to-br from-greensecondary to-earth min-h-[90vh] flex items-center justify-center"}>
                    {isSuccess && <ResetPasswordSuccess isOpen={true}/>}
                    {isError && <ErrorHandler message={error?.message || 'An unexpected error occurred.'}
                                              isOpen={showErrorPopUp} onClose={handleCloseErrorPopup}/>}

                    <div className={"bg-white p-10 rounded-xl h-1/2 w-1/3 "}>
                        <h1 className={"font-semibold text-3xl mb-2 text-greenr"}>Reset Your Password</h1>
                        <p className={"mb-8 text-sm text-slate-500"}>Fill this field with correct information to reset
                            your
                            password</p>
                        <Formik
                            initialValues={{currentPassword: '', newPassword: '', confirmPassword: ''}}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({errors, touched, isSubmitting}) => (
                                <Form>
                                    <div className={"flex flex-col mb-4 text-[15px]"}>
                                        <label className={"font-semibold mb-1"} htmlFor="currentPassword">Current
                                            Password</label>
                                        <Field type="password" name="currentPassword"
                                               className="border border-greenr rounded-md pl-3 md:h-10 h-8 text-xs z-10 "
                                        />
                                        {errors.currentPassword && touched.currentPassword &&
                                            <div
                                                className={" text-red-600 font-medium text-sm mt-1"}>{errors.currentPassword}</div>}
                                    </div>

                                    <div className={"flex flex-col mb-4 text-[15px]"}>
                                        <label className={"font-semibold mb-1"} htmlFor="newPassword">New
                                            Password</label>
                                        <Field type="password" name="newPassword"
                                               className="border border-greenr rounded-md pl-3 md:h-10 h-8 text-xs z-10 "
                                        />
                                        {errors.newPassword && touched.newPassword && <div
                                            className={" text-red-600 font-medium text-sm mt-1"}>{errors.newPassword}</div>}
                                    </div>

                                    <div className={"flex flex-col mb-4 text-[15px]"}>
                                        <label className={"font-semibold mb-1"} htmlFor="confirmPassword">Confirm
                                            Password</label>
                                        <Field type="password" name="confirmPassword"
                                               className="border border-greenr rounded-md pl-3 md:h-10 h-8 text-xs z-10 "
                                        />
                                        {errors.confirmPassword && touched.confirmPassword &&
                                            <div
                                                className={" text-red-600 font-medium text-sm mt-1"}>{errors.confirmPassword}</div>}
                                    </div>

                                    <div className={"flex justify-end mt-5"}>
                                        <Buttons value={"Reset Password"} type={"submit"} className={"text-xl"}
                                                 disabled={isSubmitting}></Buttons>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className={"bg-white w-full h-20 flex justify-between items-center px-[160px]"}>
                    <p className="text-[12px] md:text-[12px] font-semibold text-lg">
                        &copy; 2011-2024 Rooms,Inc. A Waki company. All Rights Reserved.
                    </p>
                    <Image
                        src={logopng}
                        alt="logo.png"
                        className="w-24 md:w-36 h-fit"
                    />
                </div>
            </Suspense>
        </div>
    );
};

export default ResetPassword;