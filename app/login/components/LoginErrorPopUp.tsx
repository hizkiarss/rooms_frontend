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
            case "Unauthorized":
                setErrorTitle("Invalid E-mail or password");
                setContent("Invalid E-mail or password. Please close this message and try again.");
                break;
            case "USER_NOT_FOUND":
                setErrorTitle("Email hasn't registered yet");
                setContent("Please register first or insert a valid email address");
                break;
            default:
                setErrorTitle("Unexpected Error");
                setContent("Something went wrong." +errorMessage);
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