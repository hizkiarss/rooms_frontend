"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

type RefetchProps = {
    refetch: boolean;
    from: Date |null
    to: Date |null
    propertyId: string | null

};

const useRefetchRooms = (initialRefetch: RefetchProps) => {
    const queryClient = useQueryClient();

    const { data: refetchStatus, isLoading } = useQuery<RefetchProps>({
        queryKey: ["refetchRooms"],
        queryFn: () => {
            const storedData = localStorage.getItem("refetchRooms");
            return storedData ? JSON.parse(storedData) : initialRefetch;
        },
        staleTime: Infinity, // Keep the data fresh indefinitely
    });

    const setRefetchStatus = (input: Partial<RefetchProps>) => {
        const newRefetchStatus = { ...refetchStatus, ...input };
        localStorage.setItem("refetchRooms", JSON.stringify(newRefetchStatus));
        queryClient.setQueryData(["refetchRooms"], newRefetchStatus);
    };

    return { refetchStatus: refetchStatus ?? initialRefetch, setRefetchStatus, isLoading };
};

export default useRefetchRooms;