"use client"

import * as React from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import {useFindCityByName} from "@/hooks/city/useFindCityByName";
import {useSearchContext} from "@/context/useSearchContext";
import useSearchInput from "@/hooks/useSearchInput";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useParams} from "next/navigation";
import * as sea from "node:sea";

interface City {
    id: string;
    name: string;
}

interface LocationPopOverProps {
    onCitySelect: (city: City) => void;
}

export function LocationPopOver() {
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 400);
    const {data: cityData, error} = useFindCityByName(debouncedSearchTerm);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
        setOpen(false);
    };


    const {searchInput, setSearchInput} = useSearchInput({
        travellers: null,
        dateRange: null,
        location: null,
        ready: false,
        searchButtonHit: false,
        totalProperties: null,
        endPrice: null,
        startPrice: null,
        sortBy: null,
        category: null,
        includeBreakfast: null,
        rating: null,
        travellersParam: null,
        cityParam: null,
        dateRangeParam: null,
        isHomepage: null,
        setIsHomepage: () => {
        },
        setCityParam: () => {
        },
        setDateRangeParam: () => {
        },
        setTravellersParam: () => {
        },
        setRating: () => {
        },
        setIncludeBreakfast: () => {
        },
        setCategory: () => {
        },
        setEndPrice: () => {
        },
        setStartPrice: () => {
        },
        setSortBy: () => {
        },
        setTotalProperties: () => {
        },
        setReady: () => {
        },
        setSearchButtonHit: () => {
        },
        setTravellers: () => {
        },
        setDateRange: () => {
        },
        setLocation: () => {
        },
    });

    useEffect(() => {
        if (selectedCity) {
            setSearchInput({...searchInput, cityParam: selectedCity.name});
        }
    }, [selectedCity]);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border-none items-start pl-0 py-0 hover:bg-none"
                >
                    {error && <div>Error: {error.message || "An error occurred"}</div>}

                    <div className="flex flex-col justify-start items-start w-full">
                        Where to?
                        <div className="flex justify-between w-full">
                            <div className="flex text-[16px]">
                                {searchInput.cityParam || selectedCity?.name || "Select city"}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search city..."
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                    <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                            {cityData?.map((city: City) => (
                                <CommandItem
                                    key={city.id}
                                    value={city.name}
                                    onSelect={() => handleCitySelect(city)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedCity?.id === city.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {city.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}