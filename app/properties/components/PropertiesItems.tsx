"use client";

import React, {useEffect, useState, useRef} from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import {getRateLabel} from "@/utils/rateutils";
import {Car, Utensils} from "lucide-react";
import {useGetFilteredProperties} from "@/hooks/properties/useGetFilteredProperties";
import useSearchInput from "@/hooks/useSearchInput";
import {boolean, date} from "yup";
import {SearchVariables} from "@/types/properties/PropertiesSearchVariables";
// import {length} from "axios";
import {useSearchParams} from "next/navigation";

interface PropertiesItemsProps {
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPageError: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalProperty: React.Dispatch<React.SetStateAction<number>>;
}

const PropertiesItems: React.FC<PropertiesItemsProps> = ({setIsPageError, setIsPageLoading, setTotalProperty}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchVariables, setSearchVariables] = useState<SearchVariables>({city: ""})

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
        cityParam: null,
        dateRangeParam: null,
        travellersParam: null,
        isHomepage: null,
        closed: null,
        setClosed: () => {
        },
        setIsHomepage: () => {
        },
        setCityParam: () => {
        },
        setTravellersParam: () => {
        },
        setDateRangeParam: () => {
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
        setTravellers: () => {
        },
        setDateRange: () => {
        },
        setLocation: () => {
        },
    });


    const params = useSearchParams();
    const cityParam = params.get('city');
    const ratingParam = params.get('rating');
    const categoryParam = params.get('category');
    const startPriceParam = params.get('startPrice');
    const endPriceParam = params.get('endPrice');
    const isBreakfastParam = params.get('includeBreakfast');
    const sortByParam = params.get('sortBy')
    const rating = ratingParam ? parseFloat(ratingParam) : null;
    const startPrice = startPriceParam ? parseFloat(startPriceParam) : null;
    const endPrice = endPriceParam ? parseFloat(endPriceParam) : null;

    const {data, error, isLoading} = useGetFilteredProperties({
        city: cityParam || "Jakarta",
        page: currentPage,
        category: categoryParam || "Hotel",
        rating: rating || null,
        startPrice: startPrice || null,
        endPrice: endPrice || null,
        isBreakfast: isBreakfastParam ? true : null,
        sortBy: sortByParam || null
    });


    useEffect(() => {
        if (searchInput.searchButtonHit) {
            const queryParams = new URLSearchParams(
                {
                    city: searchInput.cityParam || '',
                    from: searchInput.dateRangeParam?.from?.toString() || '',
                    to: searchInput.dateRangeParam?.to?.toString() || '',
                    adult: searchInput.travellersParam?.adults?.toString() || '',
                    children: searchInput.travellersParam?.children?.toString() || '',
                });
            if (searchInput.startPrice) {
                queryParams.append('startPrice', searchInput.startPrice.toString())
            }
            if (searchInput.endPrice) {
                queryParams.append('endPrice', searchInput.endPrice.toString());
            }
            if (searchInput.category) {
                console.log("category")
                queryParams.append('category', searchInput.category)
            }
            if (searchInput.includeBreakfast) {
                queryParams.append('includeBreakfast', 'true')
            }
            if (searchInput.rating) {
                queryParams.append('rating', searchInput.rating.toString())
            }
            if (searchInput.sortBy) {
                queryParams.append('sortBy', searchInput.sortBy)
            }

            const queryString = queryParams.toString();
            window.location.href = `/properties?${queryString}`;

        }
        setSearchInput({...searchInput, searchButtonHit: false});

    }, [searchInput.searchButtonHit]);


    useEffect(() => {
        setIsPageLoading(isLoading);
        setIsPageError(!!error);
        if (data) {
            setSearchInput({...searchInput, totalProperties: data && data.properties && data.totalElements})
        }
        console.log(searchInput.totalProperties)
    }, [isLoading, error, setIsPageLoading, setIsPageError, data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (!data || !data.properties) {
        return <div></div>;
    }

    console.log(data.properties)

    const handleClick = (slug: string) => {

        const fromString = params.get("from");
        const toString = params.get("to");
        const adult = params.get("adult");
        const children = params.get("children");
        const slugs = slug;

        const queryObject: Record<string, string> = {};

        if (fromString) queryObject.from = fromString;
        if (toString) queryObject.to = toString;
        if (adult) queryObject.adult = adult;
        if (children) queryObject.children = children;
        queryObject.slugs = slugs;

        const queryParams = new URLSearchParams(queryObject);

// Use the queryParams as needed
        window.location.href = `/property-detail?${queryParams.toString()}`;
    }

    return (
        <div className={"px-[150px] pb-[60px] pt-8 bg-[#F3F8FA]"}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 ">
                {data && data.properties && data.properties.map((propertyItem: Property) => (
                    <div key={propertyItem.property.id}
                         className="grid grid-cols-3 rounded-xl border-[1.5px] border-slate-200 h-64 bg-white"
                         onClick={() => {
                             handleClick(propertyItem.property.slug);
                         }}>
                        <Carousel>
                            <CarouselPrevious className="left-2 z-10"/>
                            <CarouselContent>
                                {/* Uncomment to display property pictures */}
                                {/* {propertyItem.property.propertyPictures.map((picture) => ( */}
                                {/*     <CarouselItem key={picture.id} className=""> */}
                                {/*         <Image */}
                                {/*             src={picture.imgUrl} */}
                                {/*             alt={propertyItem.property.name} */}
                                {/*             className="rounded-l-xl h-64 object-cover" */}
                                {/*             width={300} */}
                                {/*             height={300} */}
                                {/*         /> */}
                                {/*     </CarouselItem> */}
                                {/* ))} */}
                            </CarouselContent>
                            <CarouselNext className="right-2"/>
                        </Carousel>

                        <div className="col-span-2 py-4 ml-4">
                            <p className="font-semibold text-lg">{propertyItem.property.name}</p>
                            <p className="text-slate-400 text-sm mt-1">{propertyItem.property.address}</p>
                            <div className="flex gap-2 items-center mt-3">
                                <div className="bg-greenr text-white rounded-sm p-1 px-2">
                                    <p className="text-sm">
                                        <span className="font-semibold text-lg">9.5</span>/10
                                    </p>
                                </div>
                                <div className="flex mt-[3px] gap-1 text-[14px]">
                                    <p className="font-semibold">{getRateLabel("9.5")}</p>
                                    <p className="mt-[1px]">(2.801 reviews)</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <div className="flex gap-1 items-center">
                                    {propertyItem.isBreakfast && (
                                        <>
                                            <Utensils size={24} className="text-white bg-greenr p-1 rounded-sm"/>
                                            <p className="text-greenr font-semibold text-sm">Include Breakfast</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-col items-end justify-end pr-6">
                                    <p className="font-semibold text-xl text-red-600">
                                        IDR {propertyItem.price.toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-slate-500 text-xs">/per night, include taxes and fees</p>
                                </div>
                            </div>

                            <Carousel className="border-t border-slate-500 pt-4 mt-4 text-[15px]">
                                <CarouselPrevious className={"disabled:hidden left-1  z-10 shadow-custom3 mt-2"}/>
                                <CarouselContent>
                                    {propertyItem.property.propertyFacilities.map((facility) => (
                                        <CarouselItem key={facility.id}
                                                      className="basis-auto font-semibold text-greenr h-auto overflow-hidden text-sm">
                                            {facility.facilities.name}
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                <CarouselNext className={"right-1 mt-2 disabled:hidden shadow-custom2 "}/>
                            </Carousel>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination className={"mt-16"}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={"disabled:hidden font-semibold text-greenr "}
                        />
                    </PaginationItem>
                    {Array.from({length: data.totalPages}, (_, index) => (
                        <PaginationItem key={index} className={""}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={" font-semibold text-greenr "}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => currentPage < data.totalPages && handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === length}
                            className={"disabled:hidden font-semibold text-greenr "}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PropertiesItems;
