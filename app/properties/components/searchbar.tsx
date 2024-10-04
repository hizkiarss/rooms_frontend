import React, {useState, useEffect} from 'react';
import {ArrowDownAZ, Filter, ListRestart, MapPin, Minus, UserRound} from 'lucide-react';
import {LocationPopOver} from '@/app/componets/hero/components/LocationPopOver';
import {DatePickerWithRange} from '@/app/componets/hero/components/DatePopOver';
import TravellerPopOver from '@/app/componets/hero/components/TravellerPopOver';
import Buttons from '@/components/Buttons';
import {useSearchContext} from "@/context/useSearchContext";
import useSearchInput from "@/hooks/useSearchInput";
import {date} from "yup";
import LoginAds from "@/components/LoginAds";
import FilterPopup from "@/app/properties/components/FilterPopup";
import SortPopUp from "@/app/properties/components/SortPopUp";
import {useSearchParams} from "next/navigation";
import OnAnimation from "@/components/animations/OnAnimation";
import * as sea from "node:sea";

interface SearchbarProps {
    totalElements?: number;
}

const Searchbar: React.FC<SearchbarProps> = ({totalElements = 0}) => {
    const [isAtTop, setIsAtTop] = useState(false);
    const [openFilterPopup, setOpenFilterPopup] = useState<boolean>(false);
    const [openSortPopup, setOpenSortPopup] = useState<boolean>(false);
    const [filterOn, setFilterOn] = useState<boolean>(false);
    const [sortOn, setSortOn] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
            const topOffset = window.scrollY;
            setIsAtTop(topOffset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const handleClick = () => {
        setSearchInput({...searchInput, searchButtonHit: true});
    }

    useEffect(() => {
        if (searchInput.rating != null || searchInput.includeBreakfast != null || searchInput.category != null
            || searchInput.startPrice != null || searchInput.endPrice != null) {
            setFilterOn(true)
        } else (setFilterOn(false))
    }, [searchInput.rating, searchInput.includeBreakfast, searchInput.category, searchInput.startPrice, searchInput.endPrice]);

    console.log(filterOn)

    useEffect(() => {
        if (searchInput.sortBy != null) {
            setSortOn(true)
        }
    }, [searchInput.sortBy]);

    const param = useSearchParams()
    useEffect(() => {
        const cityInitialValue = param.get('city')
        const adultInitialValue = param.get('adult')
        const childrenInitialValue = param.get('children')
        const fromDateParam = param.get('from');
        const toDateParam = param.get('to');
        const fromDate = fromDateParam ? new Date(fromDateParam) : undefined;
        const toDate = toDateParam ? new Date(toDateParam) : undefined;
        setSearchInput({
            ...searchInput,
            dateRangeParam: {from: fromDate, to: toDate},
            cityParam: cityInitialValue,
            travellersParam: {adults: Number(adultInitialValue), children: Number(childrenInitialValue)}
        });
    }, []);

    console.log(sortOn)

    const handleReset = () => {
        setSearchInput({
            ...searchInput,
            rating: null,
            includeBreakfast: null,
            category: null,
            startPrice: null,
            endPrice: null,
            sortBy: null,
            searchButtonHit: true
        });
    }

    return (
        <div
            className={`${isAtTop ? "pt-0 sticky z-40 top-4 px-[150px]" : "pt-0 bg-white border-slate-500 shadow-slate-400 "}    `}>
            <div
                className={`${isAtTop ? "shadow-custom rounded-lg" : "shadow-lg rounded-lg px-20 "} p-4 w-full px-10 bg-white`}>
                <div
                    className={`${isAtTop ? "px-0" : "px-16"} grid grid-cols-10 gap-4 justify-center items-center py-[6px] w-full`}>
                    <div
                        className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
                        <MapPin className=""/>
                        <div className="flex flex-col w-full">
                            <LocationPopOver/>
                        </div>
                    </div>
                    <DatePickerWithRange className="col-span-3 h-full w-full rounded-xl flex gap-2 items-start"/>
                    <div
                        className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
                        <UserRound className=""/>
                        <div className="flex flex-col">
                            <p className="text-xs">Travellers</p>
                            <TravellerPopOver/>
                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <Buttons value={'Search'} className="text-xl" onClick={handleClick}/>
                    </div>
                </div>
            </div>


            {isAtTop ? (
                <div className="flex justify-end pr-4 mb-10 ">
                    <div className="w-fit shadow-lg flex border-t border-slate-300 rounded-b-xl bg-white items-center">
                        <button
                            onClick={() => setOpenFilterPopup(true)}
                            className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-bl-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                            <Filter size={18}/>
                            Filter
                            {filterOn ? <OnAnimation/> : null}

                        </button>
                        <div className={"w-[1px] bg-greenr  h-5"}></div>
                        <button
                            onClick={() => setOpenSortPopup(true)}
                            className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                            <ArrowDownAZ size={18}/>
                            Sort
                            {sortOn ? <OnAnimation/> : null}
                        </button>

                        {filterOn || sortOn
                            ?
                            <div className={"flex items-center"}>
                                <div className={"w-[1px] bg-greenr  h-5"}></div>
                                <button
                                    onClick={handleReset}
                                    className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                                    <ListRestart size={18}/>
                                    Reset

                                </button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            ) : (
                <div className="flex gap-4 justify-between items-center  pb-5  bg-white  px-40 ">
                    <p className="font-semibold">Showing {searchInput.totalProperties} results</p>
                    <div className="flex gap-2">
                        <button onClick={() => setOpenFilterPopup(true)}
                                className={`${filterOn ? "bg-greenr text-white px-2" : "bg-white text-greenr px-4"} flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                            <Filter size={18}/>
                            Filter
                            {filterOn ? <OnAnimation/> : null}
                        </button>
                        <button
                            onClick={() => setOpenSortPopup(true)}
                            className={`${sortOn ? "bg-greenr text-white px-2" : "bg-white text-greenr px-4"} flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                            <ArrowDownAZ size={18}/>
                            Sort
                            {sortOn ? <OnAnimation/> : null}

                        </button>

                        {filterOn || sortOn
                            ? <button
                                onClick={handleReset}
                                className={`bg-earth px-4 flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                                <ListRestart size={18}/>
                                Reset

                            </button>
                            : null
                        }
                    </div>
                </div>
            )}
            <FilterPopup isOpen={openFilterPopup} onClose={() => setOpenFilterPopup(false)}/>
            <SortPopUp isOpen={openSortPopup} onClose={() => setOpenSortPopup(false)}/>

        </div>
    );
};

export default Searchbar;