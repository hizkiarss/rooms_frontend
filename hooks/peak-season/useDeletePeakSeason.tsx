import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { DELETE_PEAK_SEASON } from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";

interface DeletePeakSeasonVariables {
    peakSeasonId: string;
}

export function useDeletePeakSeason() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();


    return useMutation<string, Error, DeletePeakSeasonVariables>({
        mutationKey: ["deletePeakSeason"],
        mutationFn: async ({ peakSeasonId }) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });
            const response = await graphqlClient.request<{ deletePeakSeason: string }>(
                DELETE_PEAK_SEASON,
                { peakSeasonId }
            );
            return response.deletePeakSeason;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["peakSeasons"] });
            console.log("Peak season deleted successfully", data);
        },
        onError: (error) => {
            console.error("Failed to delete peak season:", error);
        },
    });
}