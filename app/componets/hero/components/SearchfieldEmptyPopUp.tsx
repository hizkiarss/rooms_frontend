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

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SearchfieldEmptyPopup: React.FC<Props> = ({isOpen,onClose}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose} >
            {/*<AlertDialogTrigger>Open</AlertDialogTrigger>*/}
            <AlertDialogContent className={"w-[400px]"}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-2xl text-center"}>Hold On—Fields Are Empty!</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className={"text-[17px] mt-2 text-center"}>
                    Oops! Looks like you missed a spot—let’s fill in those search fields before we hit the search button!
                </AlertDialogDescription>
                <div  className={"flex justify-center w-full"}>
                    <Buttons value={"Let's fill them!"} className={"w-full text-xl"} onClick={onClose} />
                </div>
                <AlertDialogFooter >
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SearchfieldEmptyPopup;