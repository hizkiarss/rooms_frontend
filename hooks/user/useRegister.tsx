"use client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {REGISTER_USER} from "../graphQL/mutations";
import {RegisterInput} from "@/types/users/RegisterInput";

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation<string, Error, RegisterInput>({
        mutationKey: ["registerUser"],
        mutationFn: async (input: RegisterInput) => {
            const response = await graphqlClient.request(
                REGISTER_USER,
                {input},
            );
            // if (response.errors) {
            //     throw response.errors;
            // }
            return response.userRegister ?? '';

        }
    });
}