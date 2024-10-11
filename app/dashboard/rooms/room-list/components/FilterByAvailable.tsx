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
}

export const FilterByAvailablePopUp: React.FC<Prop> = ({ isOpen, onClose }) => {
    const [position, setPosition] = React.useState("bottom");

    const { filterContent, setFilterContent } = useFilterRoomsDashboard({
        filterName: null,
        available: null,
    });

    const handleChange = (position: string) => {
        setPosition(position);

        // Set available based on position value
        const available = position === "top"; // Assuming 'top' means available and 'bottom' means not available
        setFilterContent({ ...filterContent, available });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={"font-semibold bg-greenr text-white"}>
                    <div className={"flex gap-1 items-center"}>
                        <BookOpenCheck size={18} />
                        <p>Available Rooms</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Room Availability</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
                    <DropdownMenuRadioItem value="top">Available</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Not available</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
