"use client"
import React, {useEffect, useState} from 'react';
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
import Buttons from "@/components/Buttons";


interface Props {
    errorMessage: string;
    isOpen: boolean;
    onClose: () => void;
}


const ErrorPopUp: React.FC<Props> = ({errorMessage, isOpen, onClose}) => {
    const [title, setErrorTitle] = useState<string>("An error occurred");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        switch (errorMessage) {
            case "USER_NOT_FOUND":
                setErrorTitle("Invalid E-mail or password");
                setContent("Invalid E-mail or password. Please close this message and try again.");
                break;
            case "AccessDenied":
                setErrorTitle("Access Denied");
                setContent("You don't have permission to access this resource. Please ensure your account has the right permissions or contact support for help.");
                break;
            case "Verification":
                setErrorTitle("Verification Problem");
                setContent("There was an issue with the email verification process. The verification link may have expired or been used already. Please request a new verification email.");
                break;
            case "Default":
            default:
                setErrorTitle("Unexpected Error");
                setContent("Something went wrong, and we couldn't process your request. Please try again later, or contact support if the problem continues.");
                break;
        }
    }, [errorMessage]);


    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/*<AlertDialogTrigger>Open</AlertDialogTrigger>*/}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-2xl mb-4 "}>{title}</AlertDialogTitle>
                    <AlertDialogDescription className={"text-base"}>
                        {content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Buttons value={"Close"} onClick={onClose} className={"rounded-md text-lg"}/>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ErrorPopUp;