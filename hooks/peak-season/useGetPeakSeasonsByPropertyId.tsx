import {useQuery, useQueryClient} from "@tanstack/react-query";
import {graphqlClient} from "../graphQL/graphqlClient";
import {GET_PEAK_SEASONS_BY_PROPERTY_ID} from "@/hooks/graphQL/queries";
import {PeakSeason} from "@/types/peak-season/PeakSeasonType";
import {useSession} from "next-auth/react";


export function useGetPeakSeasonsByPropertyId(propertyId: string) {
    const queryClient = useQueryClient();
    const { data: session } = useSession();


    return useQuery<PeakSeason[], Error>({
        queryKey: ["peakSeasons", propertyId],
        queryFn: async () => {
            const token = session?.accessToken;
            graphqlClient.setHeaders({
                Authorization: `Bearer ${token}`,
            });

            const response = await graphqlClient.request<{
                getPeakSeasonsByPropertyId: PeakSeason[];
            }>(GET_PEAK_SEASONS_BY_PROPERTY_ID, {propertyId});

            return response.getPeakSeasonsByPropertyId;
        },
        onSuccess: (data: PeakSeason[]) => {
            console.log("Fetched peak seasons successfully");
        },
        onError: (error: Error) => {
            console.error("Failed to fetch peak seasons:", error);
        },
    });
}