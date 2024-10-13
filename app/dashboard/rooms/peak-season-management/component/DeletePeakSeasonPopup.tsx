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
import { useDeletePeakSeason } from "@/hooks/peak-season/useDeletePeakSeason";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    peakSeasonId: string;
}

const DeletePeakSeasonPopup: React.FC<Props> = ({ isOpen, onClose, peakSeasonId }) => {
    const deletePeakSeason = useDeletePeakSeason();

    const handleDelete = async () => {
        try {
            await deletePeakSeason.mutateAsync({ peakSeasonId });
            onClose();
        } catch (error) {
            console.error("Error deleting peak season:", error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the peak season
                        and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={deletePeakSeason.isPending}>
                        {deletePeakSeason.isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeletePeakSeasonPopup;