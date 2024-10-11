"use client";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DateRange} from "react-day-picker";

type filterVariables = {
    filterName: string | null;
    available: boolean | null
};

const useFilterRoomsDashboard = (initialFilter: filterVariables) => {
    const queryClient = useQueryClient();

    const {data: filterContent, isLoading} = useQuery<filterVariables>({
        queryKey: ["filterContent"],
        queryFn: () => {
            const storedData = localStorage.getItem("filterContent");
            return storedData ? JSON.parse(storedData) : initialFilter;
        },
        staleTime: Infinity,
    });

    const setFilterContent = (input: Partial<filterVariables>) => {
        const newFilterContent = {...filterContent, ...input};
        localStorage.setItem("filterContent", JSON.stringify(newFilterContent));
        queryClient.setQueryData(["filterContent"], newFilterContent);
    };

    return {filterContent: filterContent ?? initialFilter, setFilterContent, isLoading};
};

export default useFilterRoomsDashboard;