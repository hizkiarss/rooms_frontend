"use client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {REGISTER_TENANT} from "../graphQL/mutations";
import {RegisterInput} from "@/types/users/RegisterInput";

export function useRegisterTenant() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, RegisterInput>({
        mutationKey: ["registerUser"],
        mutationFn: async (input: RegisterInput) => {
            const response = await graphqlClient.request(
                REGISTER_TENANT,
                {input},
            );


            //
            // if (!response.tenantRegister) {
            //     throw new Error("No data returned from the server");
            // }

            return response.tenantRegister ?? '';
        },
        // onError: (error) => {
        //     console.error("Registration failed:", error.message);
        // },
        // onSuccess: (data) => {
        //     console.log('Registration successful', data);
        // },
    });
}
