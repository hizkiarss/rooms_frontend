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
import {useSearchContext} from "@/context/useSearchContext";


interface PropertiesItemsProps {
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPageError: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalProperty: React.Dispatch<React.SetStateAction<number>>;
}

const PropertiesItems: React.FC<PropertiesItemsProps> = ({setIsPageError, setIsPageLoading, setTotalProperty}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {travellers, dateRange, location,} = useSearchContext();

    useEffect(() => {
        console.log(travellers, dateRange, location);
    }, [travellers, dateRange, location]);

    const {data, error, isLoading} = useGetFilteredProperties({
        city: location?.name,
        page: currentPage, // Use the current page state
        category: "Hotel",
        rating: null,
        startPrice: null,
        endPrice: null,
    });

    const [itemWidths, setItemWidths] = useState<number[]>([]);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setIsPageLoading(isLoading);
        setIsPageError(!!error);
        if (data) {
            setTotalProperty(data.totalElements)
        }
    }, [isLoading, error, setIsPageLoading, setIsPageError]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading || !data) {
        return null;
    }

    if (error) {
        return <div>Error loading properties</div>;
    }


    return (
        <div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                {data.properties.map((propertyItem: Property) => (
                    <div key={propertyItem.property.id}
                         className="grid grid-cols-3 rounded-xl border border-slate-500 h-64">
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
                                <CarouselPrevious className={"disabled:hidden left-1 mt-1 z-10"}/>
                                <CarouselContent>
                                    {propertyItem.property.propertyFacilities.map((facility) => (
                                        <CarouselItem key={facility.id}
                                                      className="basis-auto font-semibold text-greenr h-auto overflow-hidden">
                                            {facility.facilities.name}
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselNext className={"right-1 mt-1 disabled:hidden"}/>
                            </Carousel>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination className={"mt-20"}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === data.totalPages}
                            className={" font-semibold text-greenr "}
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
                            aria-disabled={currentPage === data.totalPages}
                            className={"font-semibold text-greenr "}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PropertiesItems;
