"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpenCheck } from "lucide-react";
import useFilterRoomsDashboard from "@/hooks/useFilterRoomsDashboard";

interface Prop {
    isOpen: boolean;
    onClose: () => void;
    onFilterChange: (available: boolean | null) => void;
}

export const FilterByAvailablePopUp: React.FC<Prop> = ({ isOpen, onFilterChange }) => {
    const [position, setPosition] = React.useState("all");

    const { filterContent, setFilterContent } = useFilterRoomsDashboard({
        filterName: null,
        available: null,
    });

    const handleChange = (position: string) => {
        setPosition(position);

        let available: boolean | null;
        if (position === "available") {
            available = true;
        } else if (position === "notAvailable") {
            available = false;
        } else {
            available = null;
        }

        setFilterContent({ ...filterContent, available });
        onFilterChange(available);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={"font-semibold bg-greenr text-white text-xs md:text-base"}>
                    <div className={"flex gap-1 items-center"}>
                        <BookOpenCheck size={18} className={
                            "size-[12px] md:size-[18px]"
                        } />
                        <p>Available Rooms</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Room Availability</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="available">Available</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="notAvailable">Not available</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};