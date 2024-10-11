"use client";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DateRange} from "react-day-picker";

type propertyID = {
    propertyId: string;
};

const usePropertyId = (initialPropertyID: propertyID) => {
    const queryClient = useQueryClient();

    const {data: propertyId, isLoading} = useQuery<propertyID>({
        queryKey: ["propertyId"],
        queryFn: () => {
            const storedData = localStorage.getItem("propertyId");
            return storedData ? JSON.parse(storedData) : initialPropertyID;
        },
        staleTime: Infinity,
    });

    const setPropertyId = (input: Partial<propertyID>) => {
        const newPropertyId = {...propertyId, ...input};
        localStorage.setItem("propertyId", JSON.stringify(newPropertyId));
        queryClient.setQueryData(["propertyId"], newPropertyId);
    };

    return {propertyId: propertyId ?? initialPropertyID, setPropertyId, isLoading};
};

export default usePropertyId;