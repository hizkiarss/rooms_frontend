import React, {useState, useEffect} from 'react';
import {ChevronRight} from "lucide-react";
import {useSendResetPasswordLink} from "@/hooks/user/useSendResetPasswordLink";
import EmailSentPopUp from "@/app/user-profile/components/EmailSentPopUp";
import NotificationPopUp from "@/components/NotificationPopUp";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

interface SecurityProps {
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setResetSuccess: React.Dispatch<React.SetStateAction<boolean>>;

}

const Security: React.FC<SecurityProps> = ({setIsPageLoading, setResetSuccess}) => {
    const {mutate: sendResetPasswordLink, isPending, isError, error} = useSendResetPasswordLink();
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);
    const router = useRouter();
    const {data: session} = useSession();
    const email: string = session?.user?.email;

    const handleChangePasswordClick = () => {
        sendResetPasswordLink(
            {email},
            {
                onSuccess: () => {
                    setIsPageLoading(false);
                    setEmailSent(true);
                },
                onError: () => {
                    setIsErrorDialogOpen(true);
                    setIsPageLoading(false);
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
            <NotificationPopUp
                title="An error occured"
                content={error?.message || "An error occurred"}
                isOpen={isErrorDialogOpen}
                onClose={handleCloseErrorDialog}
            />

            <h2 className="font-semibold text-2xl md:text-3xl text-greenr">Sign-in and security</h2>
            <p className="text-slate-500 md:w-1/2 text-sm mt-2">
                Keep your account safe with a secure password and by
                signing out of devices you&apos;re not actively using.
            </p>
            <div className="md:grid grid-cols-2  md:gap-4 items-center">
                <button
                    className="flex justify-between mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200"
                    onClick={handleChangePasswordClick}
                    disabled={isPending}
                >
                    <div>
                        <p className="text-start font-semibold md:text-xl mb-2">Change password</p>
                        <p className="w-5/6 text-start text-xs md:text-sm">
                            Change your password after an email verification process
                        </p>
                    </div>
                    <ChevronRight className="size-12 h-fit"/>
                </button>

                <button
                    className="flex justify-between mt-5 md:mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200"
                    onClick={() => router.push("/delete-account")}
                    disabled={isPending}
                >
                    <div>
                        <p className="text-start font-semibold md:text-xl mb-2">Delete Account</p>
                        <p className="w-5/6 text-start text-xs md:text-sm">
                            Permanently removes your account and all associated data. </p>
                    </div>
                    <ChevronRight className="size-12 h-fit"/>
                </button>
            </div>


        </div>
    );
};

export default Security;