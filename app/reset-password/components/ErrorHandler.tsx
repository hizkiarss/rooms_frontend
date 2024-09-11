import React from 'react';
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

interface ErrorMessageProps {
    message: string | null;
    isOpen: boolean;
    onClose: () => void;

}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message,isOpen,onClose }) => {
    if (!message) return null;
    const translateErrorMessage = (message: string) => {
        const serverMessages = message.split(';'); // Splitting by a delimiter like semicolon, assuming the server sends multiple messages this way

        // Loop through the array to check for specific conditions and return custom error messages
        return serverMessages.map((msg, index) => {
            if (msg.includes('Invalid password')) {
                return <div key={index}>The password you entered is incorrect. Please try again.</div>;
            } else if (msg.includes('Reset Password Link has expired')) {
                return <div key={index}>Your reset password link has expired. Please request a new one.</div>;
            } else if (msg.includes('User not found')) {
                return <div key={index}>The email address you entered is not associated with any account.</div>;
            }
            return <div key={index}>An unexpected error occurred. Please try again later.</div>;
        });
    };
    return (
             <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>An error occured</AlertDialogTitle>
                        <AlertDialogDescription>
                            {translateErrorMessage(message)}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    );
};

export default ErrorMessage;