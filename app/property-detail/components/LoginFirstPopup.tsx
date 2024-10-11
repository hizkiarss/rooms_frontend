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
import Buttons from "@/components/Buttons";
import {X} from "lucide-react";


interface Props {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
}

const LoginFirstPopup: React.FC<Props> = ({title, content, isOpen, onClose}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className={"flex justify-between items-center"}>
                        <AlertDialogTitle className={"text-2xl"}>{title}</AlertDialogTitle>
                        <AlertDialogCancel className={"border-none"} onClick={onClose}><X/> </AlertDialogCancel>
                    </div>

                </AlertDialogHeader>
                <AlertDialogDescription>
                    <div className={"text-[17px] mt-2"}>
                        {content}
                    </div>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <Buttons value={"Login"} onClick={() => window.location.href = '/login'}></Buttons>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LoginFirstPopup;