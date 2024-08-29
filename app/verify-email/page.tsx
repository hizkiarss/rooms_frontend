"use client";
import React, {useEffect} from 'react';
import {useVerifyEmail} from '@/hooks/user/useVerifyEmail'; // Adjust the import path based on your project structure
import {useRouter, useSearchParams} from 'next/navigation';

const VerifyEmailPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const {mutate: verifyEmail, isError, isSuccess, error} = useVerifyEmail();

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