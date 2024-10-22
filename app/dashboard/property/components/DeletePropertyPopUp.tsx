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
} from "@/components/ui/alert-dialog"
import Buttons from "@/components/Buttons";
import {useDeleteProperties} from "@/hooks/properties/useDeleteProperties";
import useSelectedProperty from "@/hooks/useSelectedProperty";

interface Props {
    open: boolean;
    onClose: () => void;
}

const DeletePropertyPopUp: React.FC<Props> = ({open, onClose}) => {
    const deletePropertyMutation = useDeleteProperties();
    const propertyid = useSelectedProperty()
    const propertyId = propertyid as unknown as string
    const handleDelete = () => {
        deletePropertyMutation.mutate(
            {id: propertyId },
            {
                onSuccess: () => {
                    console.log('Property deleted successfully');
                    onClose();
                },
                onError: (error) => {
                    console.error('Failed to delete property:', error);
                }
            }
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-2xl"}>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className={"text-base"}>
                        This action cannot be undone. This will permanently delete your
                        property and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={deletePropertyMutation.isPending}>
                        {deletePropertyMutation.isPending ? "Deleting..." : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeletePropertyPopUp;