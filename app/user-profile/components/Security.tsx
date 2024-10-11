import React, {useState, useEffect} from 'react';
import {ChevronRight} from "lucide-react";
import {useSendResetPasswordLink} from "@/hooks/user/useSendResetPasswordLink";
import EmailSentPopUp from "@/app/user-profile/components/EmailSentPopUp";
import ErrorHandler from "@/app/reset-password/components/ErrorHandler";
import ErrorPopUp from "@/components/ErrorPopUp";
import {useRouter} from "next/navigation";

interface SecurityProps {
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Security: React.FC<SecurityProps> = ({setIsPageLoading}) => {
    const {mutate: sendResetPasswordLink, isPending, isError, error} = useSendResetPasswordLink();
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);
    const router = useRouter();
    const email: string = "qakaben@gmail.com";

    const handleChangePasswordClick = () => {
        sendResetPasswordLink(
            {email},
            {
                onSuccess: (data) => {
                    console.log(data, "Email sent successfully");
                    setIsPageLoading(false); // Stop loading animation
                    setEmailSent(true); // Trigger email sent popup
                },
                onError: (error) => {
                    console.error("Failed to send email:", error);
                    setIsErrorDialogOpen(true); // Trigger error dialog
                    setIsPageLoading(false); // Stop loading animation even if there's an error
                },
                onSettled: () => {
                    setIsPageLoading(false); // Stop loading animation in any case (error or success)
                }
            }
        );
    };


    const handleCloseErrorDialog = () => {
        setIsErrorDialogOpen(false);
    };

    return (
        <div>
            {emailSent && <EmailSentPopUp isOpen={emailSent} onClose={() => setEmailSent(false)}/>}
            <ErrorPopUp
                title="An error occured"
                content={error?.message || "An error occurred"}
                isOpen={isErrorDialogOpen}
                onClose={handleCloseErrorDialog}
            />

            <h2 className="font-semibold text-3xl text-greenr">Sign-in and security</h2>
            <p className="text-slate-500 w-1/2 text-sm mt-2">
                Keep your account safe with a secure password and by
                signing out of devices you&apos;re not actively using.
            </p>
            <div className="grid grid-cols-2  gap-4 items-center">
                <button
                    className="flex justify-between mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200"
                    onClick={handleChangePasswordClick}
                    disabled={isPending}
                >
                    <div>
                        <p className="text-start font-semibold text-xl mb-2">Change password</p>
                        <p className="w-5/6 text-start text-sm">
                            Change your password after an email verification process
                        </p>
                    </div>
                    <ChevronRight className="size-12 h-fit"/>
                </button>

                <button
                    className="flex justify-between mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200"
                    onClick={()=>router.push("/delete-account")}
                    disabled={isPending}
                >
                    <div>
                        <p className="text-start font-semibold text-xl mb-2">Delete Account</p>
                        <p className="w-5/6 text-start text-sm">
                            Permanently removes your account and all associated data. </p>
                    </div>
                    <ChevronRight className="size-12 h-fit"/>
                </button>
            </div>


        </div>
    );
};

export default Security;