"use client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {VERIFY_EMAIL} from "../graphQL/mutations";

export function useVerifyEmail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (email :string) => {
            const response = await graphqlClient.request(VERIFY_EMAIL, {email});
            if (response.errors) {
                throw new Error(response.errors.map((err: any) => err.message).join(", "));
            }
            return response.verifyEmail;
        },
        onError: (error: Error) => {
            console.error("Verification failed", error);
        },
    });
}