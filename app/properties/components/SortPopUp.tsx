import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {X} from "lucide-react";
import useSearchInput from "@/hooks/useSearchInput";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}


const SortPopUp: React.FC<Props> = ({isOpen, onClose}) => {
    const [sort, setSort] = React.useState<string>("");
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
    const handleClick = (sort: string) => {
        setSort(sort)
        setSearchInput({...searchInput, sortBy: sort, searchButtonHit: true})
        onClose();
    }

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent className={"max-w-md"}>
                    <AlertDialogHeader>
                        <div className={"flex justify-between "}>
                            <AlertDialogTitle className={"text-2xl mb-4"}>Sort</AlertDialogTitle>
                            <AlertDialogCancel className={"border-none"}> <X/></AlertDialogCancel>
                        </div>


                        <AlertDialogDescription>
                            <RadioGroup defaultValue="sort">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="price_desc" id="price_desc" className={"h-6 w-6"}
                                                    onClick={() => handleClick("price_desc")}/>
                                    <Label htmlFor="price_desc" className={"text-lg text-black"}>Highest Price</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="price_asc" id="price_asc" className={"h-6 w-6"}
                                                    onClick={() => handleClick("price_asc")}/>
                                    <Label htmlFor="price_asc" className={"text-lg text-black"}>Lowest Price</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rating_desc" id="rating_desc" className={"h-6 w-6"}
                                                    onClick={() => handleClick("rating_desc")}/>
                                    <Label htmlFor="rating_desc" className={"text-lg text-black"}>Highest Rating</Label>
                                </div>
                            </RadioGroup>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default SortPopUp;