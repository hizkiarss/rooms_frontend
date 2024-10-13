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
} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}


const SlugErrorPopUp : React.FC<Prop>= ({isOpen, onClose}) => {
    const router = useRouter();

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        An Error Occured
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You haven&apos;t chose a property to update yet. Click this button to choose a property to update.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> router.push("/dashboard/rooms/room-list")}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SlugErrorPopUp;