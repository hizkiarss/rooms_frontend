import React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Buttons from "@/components/Buttons";

interface EmailSentPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmailSentPopUp: React.FC<EmailSentPopUpProps> = ({isOpen, onClose}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-2xl mb-4"}>Email Sent!</AlertDialogTitle>
                    <AlertDialogDescription className={""}>
                        <div className={"text-base"}>
                            We have sent an email to your address. Please continue this process by clicking the link
                            in the email. Please finish the process in less than 5 minutes.
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>


                <AlertDialogFooter>
                    <Buttons value={"Close"} onClick={onClose} className={"rounded-md hover:border-[2px] border-1"}/>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EmailSentPopUp;
