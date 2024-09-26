import React, { useState, useEffect } from 'react';
import { ArrowDownAZ, Filter, MapPin, Minus, UserRound } from 'lucide-react';
import { LocationPopOver } from '@/app/componets/hero/components/LocationPopOver';
import { DatePickerWithRange } from '@/app/componets/hero/components/DatePopOver';
import TravellerPopOver from '@/app/componets/hero/components/TravellerPopOver';
import Buttons from '@/components/Buttons';
import { useSearchContext} from "@/context/useSearchContext";

interface SearchbarProps {
    totalElements?: number;
}

const Searchbar: React.FC<SearchbarProps> = ({ totalElements = 0 }) => {
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const topOffset = window.scrollY;
            setIsAtTop(topOffset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="sticky top-4 z-40">
            <div className="shadow-custom rounded-lg p-4 w-full mt-4 px-10 bg-white">
                <div className="grid grid-cols-10 gap-4 justify-center items-center py-[6px] px-4 w-full">
                    <div className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
                        <MapPin className="" />
                        <div className="flex flex-col w-full">
                            <LocationPopOver />
                        </div>
                    </div>
                    <DatePickerWithRange className="col-span-3 h-full w-full rounded-xl flex gap-2 items-start" />
                    <div className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
                        <UserRound className="" />
                        <div className="flex flex-col">
                            <p className="text-xs">Travellers</p>
                            <TravellerPopOver />
                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <Buttons value={'Search'} className="text-xl"  />
                    </div>
                </div>
            </div>

            {isAtTop ? (
                <div className="flex justify-end pr-4 mb-10">
                    <div className="w-fit shadow-lg flex border-t border-slate-300 rounded-b-xl bg-white items-center">
                        <button className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-bl-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-greenr hover:bg-white hover:border-2 hover:border-[#007989]">
                            <Filter size={18} />
                            Filter
                        </button>
                        <Minus className="rotate-90 text-greenr" strokeWidth="1" size={32} />
                        <button className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-greenr hover:bg-white hover:border-2 hover:border-[#007989]">
                            <ArrowDownAZ size={18} />
                            Sort
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-4 justify-between items-center px-4 mb-6 mt-4">
                    <p className="font-semibold">Showing {totalElements} results</p>
                    <div className="flex gap-2">
                        <button className="flex gap-2 items-center px-4 py-2 bg-[#007989] border-0 rounded-sm text-sm font-semibold text-white transition-colors duration-300 ease-out hover:text-greenr hover:bg-white hover:border-2 hover:border-[#007989]">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 bg-[#007989] border-0 rounded-sm text-sm font-semibold text-white transition-colors duration-300 ease-out hover:text-greenr hover:bg-white hover:border-2 hover:border-[#007989]">
                            <ArrowDownAZ size={18} />
                            Sort
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Searchbar;