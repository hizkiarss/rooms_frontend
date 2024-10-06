"use client";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DateRange} from "react-day-picker";

type TravellersType = {
    adults?: number | null;
    children?: number | null;
}

type SearchInputProps = {
    // travellers: TravellersType | null;
    // dateRange: DateRange | null;
    // location: { id: string; name: string } | null;
    searchButtonHit: boolean;
    ready: boolean
    totalProperties: number | null;
    startPrice: number | null;
    endPrice: number | null;
    sortBy: string | null;
    category: string | null;
    includeBreakfast: boolean | null;
    rating: string | null;
    cityParam: string | null;
    travellersParam: TravellersType | null;
    dateRangeParam: DateRange | null;
    isHomepage: boolean | null;
    closed: boolean | null;
    setClosed: (closed: boolean) => void;
    setIsHomepage: (isHomepage: boolean) => void;
    setCityParam: (cityParam: string | null) => void;
    setTravellersParam: (travellersParam: TravellersType | null) => void;
    setDateRangeParam: (dateRangeParam: DateRange | null) => void;
    setRating: (rating: number | null) => void;
    setIncludeBreakfast: (includebreakfast: boolean | null) => void;
    setCategory: (category: string | null) => void;
    setSortBy: (sortBy: number | null) => void;
    setStartPrice: (startPrice: number | null) => void;
    setEndPrice: (endPrice: number | null) => void;
    setSearchButtonHit: (hit: boolean) => void;
    setTotalProperties: (totalProperties: number) => void;
    setReady: (ready: boolean) => void;
    // setTravellers: (travellers: TravellersType) => void;
    // setDateRange: (dateRange: DateRange | null) => void;
    // setLocation: (location: { id: string; name: string }) => void;

}

const useSearchInput = (defaultSearchInput: SearchInputProps) => {
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery<SearchInputProps>({
        queryKey: ["searchInput"],
        queryFn: () => {
            const storedData = localStorage.getItem("searchInput");
            if (storedData) {
                return JSON.parse(storedData) as SearchInputProps;
            }
            return defaultSearchInput;
        },
    });

    const setSearchInput = (input: Partial<SearchInputProps>) => {
        const updatedSearchInput = {
            ...data,
            ...input,
        };

        const searchInputString = JSON.stringify(updatedSearchInput);
        queryClient.setQueryData(["searchInput"], updatedSearchInput);
        localStorage.setItem("searchInput", searchInputString);
    };

    return {searchInput: data ?? defaultSearchInput, isLoading, setSearchInput};
};

export default useSearchInput;
