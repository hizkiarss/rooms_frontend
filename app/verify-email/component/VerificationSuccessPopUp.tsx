import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from 'react';
import { useRouter } from 'next/navigation';

interface VerificationSuccessPopUpProps {
    isOpen: boolean;
}

const VerificationSuccessPopUp: React.FC<VerificationSuccessPopUpProps> = ({ isOpen }) => {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/login');
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Verification success</AlertDialogTitle>
                    <AlertDialogDescription>
                        Verification process is successfully done. You need to login using this new account to finish
                        this process. Click the button below to continue
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default VerificationSuccessPopUp;