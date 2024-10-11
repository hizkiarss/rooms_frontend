import React, {useEffect, useState} from 'react';
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
import {Input} from "@/components/ui/input"
import {Minus, X} from "lucide-react";
import {Switch} from "@/components/ui/switch"
import Buttons from "@/components/Buttons";
import useSearchInput from "@/hooks/useSearchInput";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const FilterPopup: React.FC<Props> = ({isOpen, onClose}) => {
    const [startPrice, setStartPrice] = useState<string>("");
    const [endPrice, setEndPrice] = useState<string>("");
    const [includeBreakfast, setIncludeBreakfast] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const handleStartPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartPrice(e.target.value); // Update the state with the input value
    };

    const handleRating = (rating: string) => {
        setRating(rating);
    }

    const handleCategory = (category: string) => {
        setCategory(category);
    }

    const handleEndPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndPrice(e.target.value);
    };

    const handleIncludeBreakfast = () => {
        setIncludeBreakfast((prev) => !prev);
    }

    const {searchInput, setSearchInput} = useSearchInput({
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
        closed: null,
        setClosed: () => {},
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
    });

    const handleSubmit = () => {
        setSearchInput({
            startPrice: parseFloat(startPrice),
            endPrice: parseFloat(endPrice),
            category: category,
            includeBreakfast: includeBreakfast,
            rating: rating,
            searchButtonHit: true
        })
        onClose();
    }

    // useEffect(() => {
    //     console.log(searchInput.category + "category cuyyyyy");
    // }, [searchInput]);

    // useEffect(() => {
    //     if (!isOpen) {
    //         console.log("tutup gan")
    //         setStartPrice('');
    //         setEndPrice('');
    //         setCategory('');
    //         setIncludeBreakfast(false);
    //         setRating('')
    //         setSearchInput({
    //             ...searchInput,
    //             startPrice: null,
    //             endPrice: null,
    //             category: null,
    //             includeBreakfast: false,
    //             rating: null,
    //         })
    //     }
    // }, [isOpen]);

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent className={"max-w-3xl"}>
                    <AlertDialogHeader>
                        <div className={"flex justify-between"}>
                            <AlertDialogTitle className={"text-2xl w-2xl "}>Filter</AlertDialogTitle>
                            <AlertDialogCancel className={"border-none"}> <X/> </AlertDialogCancel>
                        </div>
                        <AlertDialogDescription className={""}>
                            <div className={"my-4"}>
                                <div className={"mt-4 mb-4 flex justify-between "}>
                                    <p className={"font-semibold text-black text-lg mb-2"}>Price Range</p>
                                    <div className={"flex items-center justify-center "}>
                                        <Input type={"number"} id={"startPrice"}
                                               className={"hover:cursor-pointer border-slate-400 "}
                                               onChange={handleStartPriceChange}/>
                                        <Minus size={32} strokeWidth={3} className={"text-slate-300"}/>
                                        <Input type={"number"} id={"endPrice"}
                                               className={"hover:cursor-pointer border-slate-400"}
                                               onChange={handleEndPriceChange}/>
                                    </div>
                                </div>

                                <div className={""}>
                                    <p className={"text-lg text-black font-semibold mt-4 mb-2"}>Guest Rating</p>
                                    <div className=" w-full items-center gap-2">
                                        <RadioGroup className="grid grid-cols-3">
                                            <div
                                                className={"p-3 border border-slate-400 rounded-lg flex items-center gap-4 "}>
                                                <RadioGroupItem value="9.6-10" id="9.6-10"
                                                                className={" text-sm h-5 w-5"}
                                                                onClick={() => handleRating("9.6")}/>
                                                <Label htmlFor="9.6-10" className={"text-lg text-black mt-1"}>
                                                    <p className={" font-semibold text-lg text-black "}>9.6-10</p>
                                                    <p>Exceptional</p>
                                                </Label>
                                            </div>

                                            <div
                                                className={"p-3 border border-slate-400 rounded-lg flex items-center gap-4 "}>
                                                <RadioGroupItem value=">8.6" id=">8.6"
                                                                className={" text-sm h-5 w-5"}
                                                                onClick={() => handleRating("8.6")}/>
                                                <Label htmlFor=">8.6" className={"text-lg text-black mt-1"}>
                                                    <p className={" font-semibold text-lg text-black "}>{'>'}8.6</p>
                                                    <p>Excellent</p>
                                                </Label>
                                            </div>

                                            <div
                                                className={"p-3 border border-slate-400 rounded-lg flex items-center gap-4 "}>
                                                <RadioGroupItem value=">7.6" id=">7.6"
                                                                className={" text-sm h-5 w-5"}
                                                                onClick={() => handleRating("7.6")}/>

                                                <Label htmlFor=">7.6" className={"text-lg text-black mt-1"}>
                                                    <p className={" font-semibold text-lg text-black "}> {'>'}7.6 </p>
                                                    <p>Very Good</p>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className={"mt-6 flex justify-between"}>
                                    <p className={"text-lg font-semibold text-black "}>Accommodation Type</p>
                                    <RadioGroup defaultValue="sort" className={"flex gap-6"}>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="hotel" id="hotel" className={"h-6 w-6"}
                                                            onClick={() => handleCategory("Hotel")}/>
                                            <Label htmlFor="hotel" className={"text-lg text-black mt-1"}>
                                                Hotel
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="apartment" id="apartment" className={"h-6 w-6"}
                                                            onClick={() => handleCategory("Apartment")}/>
                                            <Label htmlFor="apartment" className={"text-lg text-black mt-1"}>
                                                Apartment
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div
                                    className={"flex items-center justify-between text-lg mt-4 mb-2 font-semibold text-black"}>
                                    Include Breakfast
                                    <Switch className={"  px-[2px] h-9 w-14 "} onClick={handleIncludeBreakfast}
                                            type={"button"} checked={includeBreakfast}/>
                                </div>
                            </div>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={""}>
                        <Buttons value={"Save"} className={"border-2"} type={"submit"}
                                 onClick={handleSubmit}/>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default FilterPopup;