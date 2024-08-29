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

const WaitingForVerificationPopUp: React.FC<WaitingForVerificationPopUpProps> = ({isOpen,}) => {
    return (
            <Dialog open={isOpen}>
            <DialogContent>
                <DialogTitle className={"text-2xl"}>Email Already Registered</DialogTitle>
                <DialogDescription className={"text-[16px]"}>
                    Email already used. Please refresh this page and insert a new email </DialogDescription>
            </DialogContent>
        </Dialog>

    );
};

export default WaitingForVerificationPopUp;