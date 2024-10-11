"use client";
import React, {useEffect, useState} from 'react';
import {useVerifyEmail} from '@/hooks/user/useVerifyEmail'; // Adjust the import path based on your project structure
import {useRouter, useSearchParams} from 'next/navigation';

const VerifyEmailPage: React.FC = () => {
    const router = useRouter();

    const {mutate: verifyEmail, isError, isSuccess, error} = useVerifyEmail();

    const [email,setEmail] = useState<string | null>(null);


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

    if (isError) {
        console.error("Verification failed:", error);
        return <p>Verification failed. Please try again.</p>;
    }
    if (isSuccess) {
        router.push('/login');
        return <p>Verification successful, redirecting...</p>;

    }

    return <p>Verifying...</p>;
};

export default VerifyEmailPage;