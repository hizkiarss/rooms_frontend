"use client"

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useFindCityByName } from "@/hooks/city/useFindCityByName";

interface City {
    id: string;
    name: string;
}

interface LocationPopOverProps {
    onCitySelect: (city: City) => void;
    selectedCity: City | null;
    initialValue: string | null;
}

export function LocationPopOverDashboard({ onCitySelect, selectedCity, initialValue }: LocationPopOverProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 400);
    const { data: cityData, error } = useFindCityByName(debouncedSearchTerm);

    const handleCitySelect = (city: City) => {
        onCitySelect(city);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border-none items-center p-0 py-0 hover:bg-white border border-black"
                >
                    {error && <div>Error: {error.message || "An error occurred"}</div>}
                    <div
                        className="flex items-center justify-between w-full text-[16px] border border-slate-300 px-4 py-3 rounded-lg mx-0">
                        {initialValue || selectedCity?.name || "Select city"}
                        <ChevronsUpDown className="w-4 shrink-0 opacity-50"/>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder=  "Search city..."
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