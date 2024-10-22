"use client";
import React, {useEffect, useState} from 'react';
import {useVerifyEmail} from '@/hooks/user/useVerifyEmail';
import {useRouter} from 'next/navigation';
import VerificationSuccessPopUp from './component/VerificationSuccessPopUp';
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

const VerifyEmailPage: React.FC = () => {
    const router = useRouter();
    const {mutate: verifyEmail, isError, isSuccess, error} = useVerifyEmail();
    const [email, setEmail] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const emailParam = queryParams.get("email");

            if (emailParam) {
                setEmail(emailParam);
            }
        }
    }, []);

    useEffect(() => {
        if (email) {
            verifyEmail(email as string);
        }
    }, [email, verifyEmail]);

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessPopup(true);
        }
    }, [isSuccess]);

    if (isError) {
        return <p>Verification failed. Please try again.</p>;
    }

    return (
        <>
            <VerificationSuccessPopUp isOpen={showSuccessPopup}/>
            {!isSuccess && <LoadingStateAnimation/>}
        </>
    );
};

export default VerifyEmailPage;