"use client";

import React, {useState, useEffect} from "react";
import {useDeleteAccount} from "@/hooks/user/useDeleteAccount";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Buttons from "@/components/Buttons";
import DeleteAccountErrorPopUp from "@/app/delete-account/components/DeleteAccountErrorPopUp";

const DeleteAccountComponent: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPopUp, setConfirmPopUp] = useState(false);
    const [showErrorPopUp, setShowErrorPopUp] = useState(false);
    const router = useRouter();
    const {error, mutate: deleteAccountMutation, isError, isPending, isSuccess} = useDeleteAccount();

    useEffect(() => {
        if (isError) {
            setShowErrorPopUp(true);
            setConfirmPopUp(false)
        }
    }, [isError]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleDeleteRequest = () => {
        if (password) {
            setConfirmPopUp(true);
        } else {
            console.log("Please enter your password.");
        }
    };

    const handleConfirmDelete = () => {
        const userEmail: string = "qakaben@gmail.com"; // Replace with actual user email
        deleteAccountMutation({email: userEmail, password});
        handleSessionCleanup();
        if (isSuccess) {
            router.push("/");
        }
    };

    const handleSessionCleanup = () => {
        localStorage.clear();
        console.log("Session cleaned up");
    };

    const closeShowErrorPopUp = () => {

        setShowErrorPopUp(false);
    };

    return (
        <div
            className={"bg-gradient-to-br from-greensecondary to-earth min-h-[90vh] flex items-center justify-center px-[180px]"}>
            <DeleteAccountErrorPopUp isOpen={showErrorPopUp} onClose={closeShowErrorPopUp} message={error?.message || ""}/>
            <div className={"bg-white p-10 rounded-xl h-1/2 w-1/2 "}>
                <h2 className="text-2xl font-semibold">Delete Account</h2>
                <p className={"text-slate-500 mt-2 mb-4"}>Permanently removes your account and all associated data. This
                    action is irreversible, so please proceed with caution.</p>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div className={"flex justify-end mt-4"}>
                    <Button onClick={handleDeleteRequest} variant="destructive" disabled={!password || isPending}>
                        {isPending ? "Deleting..." : "Delete Account"}
                    </Button>
                </div>
            </div>

            <AlertDialog open={confirmPopUp} onOpenChange={setConfirmPopUp}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={"text-2xl mb-4"}>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className={"text-base"}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <Buttons value={"Close"} onClick={() => setConfirmPopUp(false)}
                                 className={"rounded-md hover:border-[2px] border-1"}/>
                        <Button onClick={handleConfirmDelete} variant="destructive"
                                className="ml-2 px-4 py-2 font-semibold">
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteAccountComponent;