import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LetterText} from "lucide-react";
import useFilterRoomsDashboard from "@/hooks/useFilterRoomsDashboard";
import {useGetRoomsTypesByPropertyId} from "@/hooks/rooms/useGetRoomsTypesByPropertyId";
import useSelectedProperty from "@/hooks/useSelectedProperty";

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterByNamePopUp: React.FC<Prop> = ({}) => {
    const [selectedName, setSelectedName] = useState<string>("");
    const [originalNameList, setOriginalNameList] = useState<string[]>([]);
    const {filterContent, setFilterContent} = useFilterRoomsDashboard({
        filterName: null,
        available: null,
    });

    const {selectedProperty} =useSelectedProperty();

    const {data} = useGetRoomsTypesByPropertyId(selectedProperty || "");
    const roomTypesData = Array.isArray(data) ? data : [];


    const handleChange = (filter: string) => {
        setSelectedName(filter);
        setFilterContent({...filterContent, filterName: filter});
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="font-semibold bg-greenr text-white text-xs md:text-base">
                    <div className="flex gap-1 items-center">
                        <LetterText size={18} className={
                            "size-[12px] md:size-[18px]"}/>
                        <p>Name</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Room Names</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup
                    value={selectedName}
                    onValueChange={handleChange}
                >
                    {roomTypesData.length > 0 ? (
                        roomTypesData.map((name: string, index) => (
                            <DropdownMenuRadioItem key={index} value={name}>
                                {name}
                            </DropdownMenuRadioItem>
                        ))
                    ) : (
                        <DropdownMenuRadioItem value="" disabled>
                            No room names available
                        </DropdownMenuRadioItem>
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};