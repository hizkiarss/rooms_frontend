"use client"
import React, {useState} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useRouter} from "next/navigation";


interface ResetPasswordSuccessProps {
    isOpen: boolean;
}


const ResetPasswordSuccess :React.FC<ResetPasswordSuccessProps> = ({isOpen}) => {
    const router = useRouter();

    return (
        <div>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset Password Success</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your password has been reset successfully. Please click this button to back to the homepage
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/*<AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                        <AlertDialogAction onClick={()=>router.push("/")}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
};

export default ResetPasswordSuccess;