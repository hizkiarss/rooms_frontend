import {useMutation, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {CHANGE_PRICE_FOR_PEAK_SEASON} from "@/hooks/graphQL/mutations";
import {useSession} from "next-auth/react";

interface ChangePriceForPeakSeasonInput {
    name: string
    propertyId: string;
    startDate: string;
    endDate: string;
    markUpPercentage: number;
}

export function useChangePriceForPeakSeason() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();

    return useMutation<string, Error, ChangePriceForPeakSeasonInput>({
        mutationKey: ["changePriceForPeakSeason"],
        mutationFn: async (input) => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });
            const response = await graphqlClient.request<{ changePriceForPeakSeason: string }>(
                CHANGE_PRICE_FOR_PEAK_SEASON,
                { input }
            );
            return response.changePriceForPeakSeason;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["peakSeason", "changePriceForPeakSeason"] });
            console.log("Peak season price updated successfully", data);
        },
        onError: (error) => {
            console.error("Failed to update peak season price:", error);
        },
    });
}