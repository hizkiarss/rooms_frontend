"use client"

import * as React from "react";
import {Check, ChevronsUpDown, Search} from "lucide-react";
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

export function LocationPopOver() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [name, setName] = React.useState("");
    const debouncedName = useDebounce<string>(name, 400);
    const {data: cityData, error} = useFindCityByName(debouncedName);

    React.useEffect(() => {
        if (debouncedName) {
            console.log("Searching for:", debouncedName);
        }
    }, [debouncedName]);

    console.log("City Data:", cityData);
    console.log("Debounced Name:", debouncedName);




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

                    <div className={"flex flex-col justify-start items-start w-full"}>
                        Where to?
                        <div className={"flex justify-between w-full"}>
                            <div className={"flex text-[16px]"}>
                                {value
                                    ? cityData?.find((city) => city.id === value)?.name
                                    : "Select location"}
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
                        onInput={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                            {cityData?.map((city) => (

                                <CommandItem
                                    key={city.id}
                                    value={city.name}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >

                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === city.name ? "opacity-100" : "opacity-0"
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
