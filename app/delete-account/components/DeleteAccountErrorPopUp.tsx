"use client";
import React, { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    message: string | null;
}

const ErrorPopUp: React.FC<Props> = ({ isOpen, onClose, message }) => {
    const [errorTitle, setErrorTitle] = useState<string>("An error occurred");
    const [errorContent, setErrorContent] = useState<string>("");

    useEffect(() => {
        if (message) {
            translateErrorMessage(message);
        }
    }, [message]);

    const translateErrorMessage = (serverMessage: string) => {
        const serverMessages = serverMessage.split(";");
        serverMessages.forEach((msg) => {
            if (msg.includes("Invalid password")) {
                setErrorTitle("Wrong Password");
                setErrorContent("The password you entered is incorrect. Please try again.");
            } else {
                setErrorTitle("An error occurred");
                setErrorContent("Something went wrong. Please try again.");
            }
        });
    };

    if (!isOpen) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{errorTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{errorContent}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ErrorPopUp;
