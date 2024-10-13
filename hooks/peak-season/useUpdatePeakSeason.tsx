import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../graphQL/graphqlClient";
import { UPDATE_PEAK_SEASON } from "@/hooks/graphQL/mutations";
import { PeakSeason } from "@/types/peak-season/PeakSeasonType";
import {useSession} from "next-auth/react";

interface UpdatePeakSeasonInput {
    peakSeasonId: string;
    name: string
    startDate: string;
    endDate: string;
    markUpPercentage: number;
}

export function useUpdatePeakSeason() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<PeakSeason, Error, UpdatePeakSeasonInput>({
        mutationKey: ["updatePeakSeason"],
        mutationFn: async (input) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{ updatePeakSeason: PeakSeason }>(
                UPDATE_PEAK_SEASON,
                { input }
            );
            return response.updatePeakSeason;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["peakSeasons"] });
            console.log("Peak season updated successfully", data);
        },
        onError: (error) => {
            console.error("Failed to update peak season:", error);
        },
    });
}
