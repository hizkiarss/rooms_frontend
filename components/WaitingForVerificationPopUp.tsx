import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface WaitingForVerificationPopUpProps {
    isOpen: boolean;
}

const WaitingForVerificationPopUp: React.FC<WaitingForVerificationPopUpProps> = ({isOpen, }) => {
    return (
        <Dialog open={isOpen}>

            <DialogContent>

                    <DialogTitle className={"text-2xl"}>Waiting for verification</DialogTitle>
                    <DialogDescription className={"text-[16px]"}>
                        We have send an email to your account. Please finish the verification process in 5 minutes. Refresh this page for a new verification link after 5 minutes.
                    </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default WaitingForVerificationPopUp;