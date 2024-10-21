import React, {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {X} from "lucide-react";
import Buttons from "@/components/Buttons"
import {useSendResetPasswordLink} from "@/hooks/user/useSendResetPasswordLink";
import EmailSentPopUp from "@/app/user-profile/components/EmailSentPopUp";
import LoadingAnimation from "@/components/animations/LoadingAnimation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgetPasswordPopup: React.FC<Props> = ({isOpen, onClose, setIsPageLoading}) => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

    const {mutate: sendResetPasswordLink, isPending, isError, error} = useSendResetPasswordLink();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePasswordClick = () => {
        sendResetPasswordLink(
            {email},
            {
                onSuccess: () => {
                    onClose();
                    setEmailSent(true);
                },
                onError: () => {
                    setIsErrorDialogOpen(true);
                    setIsPageLoading(false);
                }
            }
        );
    };


    return (
        <div>
            <EmailSentPopUp isOpen={emailSent} onClose={() => setEmailSent(false)}/>
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent>
                    <AlertDialogHeader className={"flex flex-row justify-between items-center mb-2"}>
                        <AlertDialogTitle className={"text-2xl"}>Reset Password</AlertDialogTitle>
                        <AlertDialogCancel className={"border-none !mt-0 h-fit"}><X/></AlertDialogCancel>
                    </AlertDialogHeader>

                    <AlertDialogDescription className={"text-base w-full"}>
                        <p className={"mb-6"}>
                            This will permanently change your password and cannot be undone. Fill this field with your
                            email to continue.
                        </p>

                        <div className="flex w-full items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={isPending}
                            />

                            {isPending
                                ? <LoadingAnimation/>
                                : <Buttons
                                    value={"Reset"}
                                    type="submit"
                                    onClick={handleChangePasswordClick}
                                    disabled={isPending || !email}
                                />}

                        </div>
                        {isError && (
                            <p className="text-red-500 mt-2">
                                {error?.message || "An error occurred while sending the reset link."}
                            </p>
                        )}
                        {emailSent && (
                            <p className="text-green-500 mt-2">
                                Reset password link has been sent to your email.
                            </p>
                        )}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ForgetPasswordPopup;