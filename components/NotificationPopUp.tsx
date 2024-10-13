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


interface Props {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPopUp: React.FC<Props> = ({title,content,isOpen,onClose}) => {
    return (
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                {/*<AlertDialogTrigger>Open</AlertDialogTrigger>*/}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {content}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    );
};

export default NotificationPopUp;