import React, { useState, useEffect } from "react";
import {
  ArrowDownAZ,
  Filter,
  ListRestart,
  MapPin,
  Minus,
  UserRound,
  X,
} from "lucide-react";
import { LocationPopOver } from "@/app/componets/hero/components/LocationPopOver";
import { DatePickerWithRange } from "@/app/componets/hero/components/DatePopOver";
import TravellerPopOver from "@/app/componets/hero/components/TravellerPopOver";
import Buttons from "@/components/Buttons";
import useSearchInput from "@/hooks/useSearchInput";
import FilterPopup from "@/app/properties/components/FilterPopup";
import SortPopUp from "@/app/properties/components/SortPopUp";
import { useSearchParams } from "next/navigation";
import OnAnimation from "@/components/animations/OnAnimation";
import SmallSearchInput from "@/app/componets/SmallSerchInput";
import { City } from "@/types/city/City";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
// import {useRouter} from "next/router";

interface SearchbarProps {
  totalElements?: number;
}

const Searchbar: React.FC<SearchbarProps> = ({ totalElements = 0 }) => {
  const [isAtTop, setIsAtTop] = useState(false);
  const [openFilterPopup, setOpenFilterPopup] = useState<boolean>(false);
  const [openSortPopup, setOpenSortPopup] = useState<boolean>(false);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [sortOn, setSortOn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const topOffset = window.scrollY;
      setIsAtTop(topOffset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { searchInput, setSearchInput } = useSearchInput({
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
    setIsHomepage: () => {},
    setCityParam: () => {},
    setDateRangeParam: () => {},
    setTravellersParam: () => {},
    setRating: () => {},
    setIncludeBreakfast: () => {},
    setCategory: () => {},
    setEndPrice: () => {},
    setStartPrice: () => {},
    setSortBy: () => {},
    setTotalProperties: () => {},
    setReady: () => {},
    setSearchButtonHit: () => {},
  });

  const handleClick = () => {
    setSearchInput({ ...searchInput, searchButtonHit: true });
  };

  useEffect(() => {
    if (
      searchInput.rating != null ||
      searchInput.includeBreakfast != null ||
      searchInput.category != null ||
      searchInput.startPrice != null ||
      searchInput.endPrice != null
    ) {
      setFilterOn(true);
    } else setFilterOn(false);
  }, [
    searchInput.rating,
    searchInput.includeBreakfast,
    searchInput.category,
    searchInput.startPrice,
    searchInput.endPrice,
  ]);

  console.log(filterOn);

  useEffect(() => {
    if (searchInput.sortBy != null) {
      setSortOn(true);
    }
  }, [searchInput.sortBy]);

  // const router = useRouter();
  // const { query } = router;
  // const cityParam = query.city as string;
  // const ratingParam = query.rating as string;
  // const categoryParam = query.category as string;
  // const startPriceParam = query.startPrice as string;
  // const endPriceParam = query.endPrice as string;
  // const isBreakfastParam = query.includeBreakfast as string;
  // const sortByParam = query.sortBy as string
  // const rating = ratingParam ? parseFloat(ratingParam) : null;
  // const startPrice = startPriceParam ? parseFloat(startPriceParam) : null;
  // const endPrice = endPriceParam ? parseFloat(endPriceParam) : null;

  const param = useSearchParams();
  useEffect(() => {
    const cityInitialValue = param.get("city");
    const adultInitialValue = param.get("adult");
    const childrenInitialValue = param.get("children");
    const fromDateParam = param.get("from");
    const toDateParam = param.get("to");
    const fromDate = fromDateParam ? new Date(fromDateParam) : undefined;
    const toDate = toDateParam ? new Date(toDateParam) : undefined;

    // const cityInitialValue = query.city as string;
    // const adultInitialValue = query.adult as string;
    // const childrenInitialValue = query.children as string;
    // const fromDateParam = query.from as string;
    // const toDateParam = query.to as string;
    // const fromDate = fromDateParam ? new Date(fromDateParam) : undefined;
    // const toDate = toDateParam ? new Date(toDateParam) : undefined;
    setSearchInput({
      ...searchInput,
      dateRangeParam: { from: fromDate, to: toDate },
      cityParam: cityInitialValue,
      travellersParam: {
        adults: Number(adultInitialValue),
        children: Number(childrenInitialValue),
      },
    });
  }, []);

  console.log(sortOn);

  const handleReset = () => {
    setSearchInput({
      ...searchInput,
      rating: null,
      includeBreakfast: null,
      category: null,
      startPrice: null,
      endPrice: null,
      sortBy: null,
      searchButtonHit: true,
    });
  };
  const toggleSearchForm = () => {
    setIsExpanded(!isExpanded);
  };

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (searchInput.dateRangeParam?.from && searchInput.dateRangeParam?.to) {
      return {
        from: searchInput.dateRangeParam.from,
        to: searchInput.dateRangeParam.to,
      };
    }
    // return {
    //   from: new Date(),
    //   to: addDays(new Date(), 1),
    // };
  });

  const formattedFromDate = new Date(
    searchInput?.dateRangeParam?.from || new Date()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedToDate = new Date(
    searchInput?.dateRangeParam?.to || new Date()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const showDate: string = formattedFromDate + " - " + formattedToDate;

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-[80px]">
      {isExpanded ? (
        <div className="relative">
          <button
            onClick={toggleSearchForm}
            className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
          <div
            className={`${
              isAtTop
                ? "pt-0 sticky z-40 top-4 px-5 sm:px-10 md:px-20 lg:px-[80px]"
                : "pt-0 bg-white border-slate-500 shadow-slate-400 "
            }    `}>
            <div
              className={`${
                isAtTop
                  ? "shadow-custom rounded-lg"
                  : "shadow-lg rounded-lg px-5 sm:px-10 md:px-20 lg:px-[80px] "
              } p-4 w-full px-10 bg-white`}>
              <div
                className={`${
                  isAtTop ? "px-0" : "px-16"
                } grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 justify-center items-center py-[6px] w-full`}>
                <div className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100 overflow-hidden">
                  <MapPin className="" />
                  <div className="flex flex-col w-full">
                    <LocationPopOver />
                  </div>
                </div>
                <DatePickerWithRange className="col-span-3 h-full w-full rounded-xl flex gap-2 items-start overflow-hidden" />
                <div className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100 overflow-hidden">
                  <UserRound className="" />
                  <div className="flex flex-col">
                    <p className="text-xs">Travellers</p>
                    <TravellerPopOver />
                  </div>
                </div>
                <div className="col-span-1  w-full flex justify-start">
                  <Buttons
                    value={"Search"}
                    className="text-xl ml-2"
                    onClick={handleClick}
                  />
                </div>
              </div>
            </div>

            {isAtTop ? (
              <div className="flex justify-end pr-4 mb-10 ">
                <div className="w-fit shadow-lg flex border-t border-slate-300 rounded-b-xl bg-white items-center">
                  <button
                    onClick={() => setOpenFilterPopup(true)}
                    className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-bl-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                    <Filter size={18} />
                    Filter
                    {filterOn ? <OnAnimation /> : null}
                  </button>
                  <div className={"w-[1px] bg-greenr  h-5"}></div>
                  <button
                    onClick={() => setOpenSortPopup(true)}
                    className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                    <ArrowDownAZ size={18} />
                    Sort
                    {sortOn ? <OnAnimation /> : null}
                  </button>

                  {filterOn || sortOn ? (
                    <div className={"flex items-center"}>
                      <div className={"w-[1px] bg-greenr  h-5"}></div>
                      <button
                        onClick={handleReset}
                        className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
                        <ListRestart size={18} />
                        Reset
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="flex gap-4 justify-between items-center pb-5 bg-white px-40 ">
                <p className="font-semibold">
                  Showing {searchInput.totalProperties} results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenFilterPopup(true)}
                    className={`${
                      filterOn
                        ? "bg-greenr text-white px-2"
                        : "bg-white text-greenr px-4"
                    } flex gap-2 items-center py-2 text-sm font-semibold text-greenr border-greenr border-2 rounded-xl transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                    <Filter size={18} />
                    Filter
                    {filterOn ? <OnAnimation /> : null}
                  </button>
                  <button
                    onClick={() => setOpenSortPopup(true)}
                    className={`${
                      sortOn
                        ? "bg-greenr text-white px-2"
                        : "bg-white text-greenr px-4"
                    } flex gap-2 items-center py-2 text-sm font-semibold text-greenr border-greenr border-2 rounded-xl transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                    <ArrowDownAZ size={18} />
                    Sort
                    {sortOn ? <OnAnimation /> : null}
                  </button>

                  {filterOn || sortOn ? (
                    <button
                      onClick={handleReset}
                      className={`bg-earth px-4 flex gap-2 items-center py-2 text-sm font-semibold text-greenr border-greenr border-2 rounded-xl transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
                      <ListRestart size={18} />
                      Reset
                    </button>
                  ) : null}
                </div>
              </div>
            )}
            <FilterPopup
              isOpen={openFilterPopup}
              onClose={() => setOpenFilterPopup(false)}
            />
            <SortPopUp
              isOpen={openSortPopup}
              onClose={() => setOpenSortPopup(false)}
            />
          </div>
        </div>
      ) : (
        <div onClick={toggleSearchForm} className="cursor-pointer">
          <SmallSearchInput
            cityName={
              searchInput.cityParam || selectedCity?.name || "Select city"
            }
            adult={searchInput.travellersParam?.adults || 2}
            childrenNumber={searchInput.travellersParam?.adults || 0}
            date={showDate}
          />
        </div>
      )}
    </div>
  );
};

export default Searchbar;

// interface SearchbarProps {
//     totalElements?: number;
// }

// const Searchbar: React.FC<SearchbarProps> = ({totalElements = 0}) => {
//     const [isAtTop, setIsAtTop] = useState(false);
//     const [openFilterPopup, setOpenFilterPopup] = useState<boolean>(false);
//     const [openSortPopup, setOpenSortPopup] = useState<boolean>(false);
//     const [filterOn, setFilterOn] = useState<boolean>(false);
//     const [sortOn, setSortOn] = useState<boolean>(false);
//     useEffect(() => {
//         const handleScroll = () => {
//             const topOffset = window.scrollY;
//             setIsAtTop(topOffset > 50);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const {searchInput, setSearchInput} = useSearchInput({
//         ready: false,
//         searchButtonHit: false,
//         totalProperties: null,
//         endPrice: null,
//         startPrice: null,
//         sortBy: null,
//         category: null,
//         includeBreakfast: null,
//         rating: null,
//         travellersParam: null,
//         cityParam: null,
//         dateRangeParam: null,
//         isHomepage: null,
//         closed: null,
//         setClosed: () => {},
//         setIsHomepage: () => {
//         },
//         setCityParam: () => {
//         },
//         setDateRangeParam: () => {
//         },
//         setTravellersParam: () => {
//         },
//         setRating: () => {
//         },
//         setIncludeBreakfast: () => {
//         },
//         setCategory: () => {
//         },
//         setEndPrice: () => {
//         },
//         setStartPrice: () => {
//         },
//         setSortBy: () => {
//         },
//         setTotalProperties: () => {
//         },
//         setReady: () => {
//         },
//         setSearchButtonHit: () => {
//         },
//     });

//     const handleClick = () => {
//         setSearchInput({...searchInput, searchButtonHit: true});
//     }

//     useEffect(() => {
//         if (searchInput.rating != null || searchInput.includeBreakfast != null || searchInput.category != null
//             || searchInput.startPrice != null || searchInput.endPrice != null) {
//             setFilterOn(true)
//         } else (setFilterOn(false))
//     }, [searchInput.rating, searchInput.includeBreakfast, searchInput.category, searchInput.startPrice, searchInput.endPrice]);

//     console.log(filterOn)

//     useEffect(() => {
//         if (searchInput.sortBy != null) {
//             setSortOn(true)
//         }
//     }, [searchInput.sortBy]);

//     // const router = useRouter();
//     // const { query } = router;
//     // const cityParam = query.city as string;
//     // const ratingParam = query.rating as string;
//     // const categoryParam = query.category as string;
//     // const startPriceParam = query.startPrice as string;
//     // const endPriceParam = query.endPrice as string;
//     // const isBreakfastParam = query.includeBreakfast as string;
//     // const sortByParam = query.sortBy as string
//     // const rating = ratingParam ? parseFloat(ratingParam) : null;
//     // const startPrice = startPriceParam ? parseFloat(startPriceParam) : null;
//     // const endPrice = endPriceParam ? parseFloat(endPriceParam) : null;

//     const param = useSearchParams()
//     useEffect(() => {
//         const cityInitialValue = param.get('city')
//         const adultInitialValue = param.get('adult')
//         const childrenInitialValue = param.get('children')
//         const fromDateParam = param.get('from');
//         const toDateParam = param.get('to');
//         const fromDate = fromDateParam ? new Date(fromDateParam) : undefined;
//         const toDate = toDateParam ? new Date(toDateParam) : undefined;

//         // const cityInitialValue = query.city as string;
//         // const adultInitialValue = query.adult as string;
//         // const childrenInitialValue = query.children as string;
//         // const fromDateParam = query.from as string;
//         // const toDateParam = query.to as string;
//         // const fromDate = fromDateParam ? new Date(fromDateParam) : undefined;
//         // const toDate = toDateParam ? new Date(toDateParam) : undefined;
//         setSearchInput({
//             ...searchInput,
//             dateRangeParam: {from: fromDate, to: toDate},
//             cityParam: cityInitialValue,
//             travellersParam: {adults: Number(adultInitialValue), children: Number(childrenInitialValue)}
//         });
//     }, []);

//     console.log(sortOn)

//     const handleReset = () => {
//         setSearchInput({
//             ...searchInput,
//             rating: null,
//             includeBreakfast: null,
//             category: null,
//             startPrice: null,
//             endPrice: null,
//             sortBy: null,
//             searchButtonHit: true
//         });
//     }

//     return (
//         <div
//             className={`${isAtTop ? "pt-0 sticky z-40 top-4 px-[150px]" : "pt-0 bg-white border-slate-500 shadow-slate-400 "}    `}>
//             <div
//                 className={`${isAtTop ? "shadow-custom rounded-lg" : "shadow-lg rounded-lg px-20 "} p-4 w-full px-10 bg-white`}>
//                 <div
//                     className={`${isAtTop ? "px-0" : "px-16"} grid grid-cols-10 gap-4 justify-center items-center py-[6px] w-full`}>
//                     <div
//                         className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
//                         <MapPin className=""/>
//                         <div className="flex flex-col w-full">
//                             <LocationPopOver/>
//                         </div>
//                     </div>
//                     <DatePickerWithRange className="col-span-3 h-full w-full rounded-xl flex gap-2 items-start"/>
//                     <div
//                         className="col-span-3 border border-black rounded-xl px-3 py-2 flex gap-2 items-center hover:bg-slate-100">
//                         <UserRound className=""/>
//                         <div className="flex flex-col">
//                             <p className="text-xs">Travellers</p>
//                             <TravellerPopOver/>
//                         </div>
//                     </div>
//                     <div className="col-span-1 flex justify-center">
//                         <Buttons value={'Search'} className="text-xl" onClick={handleClick}/>
//                     </div>
//                 </div>
//             </div>

//             {isAtTop ? (
//                 <div className="flex justify-end pr-4 mb-10 ">
//                     <div className="w-fit shadow-lg flex border-t border-slate-300 rounded-b-xl bg-white items-center">
//                         <button
//                             onClick={() => setOpenFilterPopup(true)}
//                             className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-bl-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
//                             <Filter size={18}/>
//                             Filter
//                             {filterOn ? <OnAnimation/> : null}

//                         </button>
//                         <div className={"w-[1px] bg-greenr  h-5"}></div>
//                         <button
//                             onClick={() => setOpenSortPopup(true)}
//                             className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
//                             <ArrowDownAZ size={18}/>
//                             Sort
//                             {sortOn ? <OnAnimation/> : null}
//                         </button>

//                         {filterOn || sortOn
//                             ?
//                             <div className={"flex items-center"}>
//                                 <div className={"w-[1px] bg-greenr  h-5"}></div>
//                                 <button
//                                     onClick={handleReset}
//                                     className="flex gap-2 items-center px-4 py-3 text-[#007989] rounded-br-xl text-base font-semibold bg-white transition-colors duration-300 ease-out hover:text-opacity-80 ">
//                                     <ListRestart size={18}/>
//                                     Reset

//                                 </button>
//                             </div>
//                             : null
//                         }
//                     </div>
//                 </div>
//             ) : (
//                 <div className="flex gap-4 justify-between items-center  pb-5  bg-white  px-40 ">
//                     <p className="font-semibold">Showing {searchInput.totalProperties} results</p>
//                     <div className="flex gap-2">
//                         <button onClick={() => setOpenFilterPopup(true)}
//                                 className={`${filterOn ? "bg-greenr text-white px-2" : "bg-white text-greenr px-4"} flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
//                             <Filter size={18}/>
//                             Filter
//                             {filterOn ? <OnAnimation/> : null}
//                         </button>
//                         <button
//                             onClick={() => setOpenSortPopup(true)}
//                             className={`${sortOn ? "bg-greenr text-white px-2" : "bg-white text-greenr px-4"} flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
//                             <ArrowDownAZ size={18}/>
//                             Sort
//                             {sortOn ? <OnAnimation/> : null}

//                         </button>

//                         {filterOn || sortOn
//                             ? <button
//                                 onClick={handleReset}
//                                 className={`bg-earth px-4 flex gap-2 items-center  py-2  text-sm font-semibold text-greenr border-greenr border-2 rounded-xl  transition-colors duration-300 ease-out hover:text-white hover:bg-greenr `}>
//                                 <ListRestart size={18}/>
//                                 Reset

//                             </button>
//                             : null
//                         }
//                     </div>
//                 </div>
//             )}
//             <FilterPopup isOpen={openFilterPopup} onClose={() => setOpenFilterPopup(false)}/>
//             <SortPopUp isOpen={openSortPopup} onClose={() => setOpenSortPopup(false)}/>

//         </div>
//     );
// };

// export default Searchbar;
