"use client";

import React, {useEffect, useState, useRef} from "react";
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
import {getRateLabel} from "@/utils/rateutils";
import {Car, Utensils} from "lucide-react";
import {useGetFilteredProperties} from "@/hooks/properties/useGetFilteredProperties";
import useSearchInput from "@/hooks/useSearchInput";
import {useSearchParams} from "next/navigation";
import {PagedPropertyResult} from "@/types/properties/PagedPropertyResult";
import {PropertyProjection} from "@/types/properties/PropertiesProjection";
import PaginationControl from "@/components/PaginationControl";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import AnimationWrapper from "@/components/animations/AnimationWrapper";

// import {useRouter} from "next/router";

interface PropertiesItemsProps {
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPageError: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalProperty: React.Dispatch<React.SetStateAction<number>>;
}

const PropertiesItems: React.FC<PropertiesItemsProps> = ({
                                                             setIsPageError,
                                                             setIsPageLoading,
                                                             setTotalProperty,
                                                         }) => {
    const [currentPage, setCurrentPage] = useState(0);
    // const [searchVariables, setSearchVariables] = useState<SearchVariables>({city: ""})

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
    });

    const params = useSearchParams();
    const cityParam = params.get("city");
    const ratingParam = params.get("rating");
    const categoryParam = params.get("category");
    const startPriceParam = params.get("startPrice");
    const endPriceParam = params.get("endPrice");
    const isBreakfastParam = params.get("includeBreakfast");
    const sortByParam = params.get("sortBy");
    const rating = ratingParam ? parseFloat(ratingParam) : null;
    const startPrice = startPriceParam ? parseFloat(startPriceParam) : null;
    const endPrice = endPriceParam ? parseFloat(endPriceParam) : null;
    const checkInDate = params.get("from");
    const checkOutDate = params.get("to");

    const {data, error, isLoading} = useGetFilteredProperties({
        city: cityParam || "Jakarta",
        page: currentPage,
        category: categoryParam || "Hotel",
        rating: rating || null,
        startPrice: startPrice || null,
        endPrice: endPrice || null,
        isBreakfast: isBreakfastParam ? true : null,
        sortBy: sortByParam || null,
        checkInDate: checkInDate || "",
        checkOutDate: checkOutDate || "",
    });

    const pagedData = data as PagedPropertyResult | undefined;

    useEffect(() => {
        if (searchInput.searchButtonHit) {
            const queryParams = new URLSearchParams({
                city: searchInput.cityParam || "",
                from: searchInput.dateRangeParam?.from?.toString() || "",
                to: searchInput.dateRangeParam?.to?.toString() || "",
                adult: searchInput.travellersParam?.adults?.toString() || "",
                children: searchInput.travellersParam?.children?.toString() || "",
            });
            if (searchInput.startPrice) {
                queryParams.append("startPrice", searchInput.startPrice.toString());
            }
            if (searchInput.endPrice) {
                queryParams.append("endPrice", searchInput.endPrice.toString());
            }
            if (searchInput.category) {
                console.log("category");
                queryParams.append("category", searchInput.category);
            }
            if (searchInput.includeBreakfast) {
                queryParams.append("includeBreakfast", "true");
            }
            if (searchInput.rating) {
                queryParams.append("rating", searchInput.rating.toString());
            }
            if (searchInput.sortBy) {
                queryParams.append("sortBy", searchInput.sortBy);
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
            setSearchInput({
                ...searchInput,
                totalProperties: data && pagedData && pagedData.totalElements,
            });
        }
        console.log(searchInput.totalProperties);
    }, [isLoading, error, setIsPageLoading, setIsPageError, data]);


    const handlePageChange = (page: number) => {
        if (pagedData && page > 0 && page <= pagedData.totalPages) {
            setCurrentPage(page - 1);
        }
    };

    if (!data) {
        return <div></div>;
    }

    console.log(data);

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

        window.location.href = `/property-detail?${queryParams.toString()}`;
    };

    return (
        <div className="px-5 sm:px-10 md:px-20 lg:px-[80px] pb-[60px] pt-8 bg-[#F3F8FA]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                {data &&
                    pagedData?.properties &&
                    pagedData.properties.map((propertyItem: PropertyProjection, index) => (
                        <div key={index}>
                            <AnimationWrapper
                                y={40}
                                transition={{ease: "easeOut", duration: 1}}>
                                <div
                                    key={propertyItem.property.id}
                                    className="grid grid-cols-1 lg:grid-cols-2 rounded-xl border-[1.5px] border-slate-200 h-auto bg-white transition-transform transform hover:scale-105 hover:shadow-lg">
                                    {/* Carousel for image */}
                                    <Carousel className="lg:col-span-1 col-span-1">
                                        <CarouselPrevious className="left-2 z-10"/>
                                        <CarouselContent>
                                            {propertyItem.property.propertyPictures.length > 0 ? (
                                                propertyItem.property.propertyPictures.map((picture) => (
                                                    <CarouselItem key={picture.id} className="">
                                                        <Image
                                                            src={picture.imgUrl}
                                                            alt={propertyItem.property.name}
                                                            className="rounded-l-xl h-64 object-cover"
                                                            width={300}
                                                            height={300}
                                                        />
                                                    </CarouselItem>
                                                ))
                                            ) : (
                                                <CarouselItem>
                                                    <Image
                                                        src="/images/default-placeholder.png"
                                                        alt="No image available"
                                                        className="rounded-l-xl h-64 object-cover"
                                                        width={300}
                                                        height={300}
                                                    />
                                                </CarouselItem>
                                            )}
                                        </CarouselContent>
                                        <CarouselNext className="right-2"/>
                                    </Carousel>

                                    {/* Property Details */}
                                    <div className="col-span-1 py-4 ml-4 flex flex-col">
                                        <p className="font-semibold text-lg">
                                            {propertyItem.property.name}
                                        </p>
                                        <p className="text-slate-400 text-sm mt-1">
                                            {propertyItem.property.address}
                                        </p>
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
                                                        <Utensils
                                                            size={24}
                                                            className="text-white bg-greenr p-1 rounded-sm"
                                                        />
                                                        <p className="text-greenr font-semibold text-sm">
                                                            Include Breakfast
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end justify-end pr-6">
                                                <p className="font-semibold text-xl text-red-600">
                                                    IDR {propertyItem.price.toLocaleString("id-ID")}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    /per night, include taxes and fees
                                                </p>
                                            </div>
                                        </div>

                                        <Carousel className="border-t border-slate-500 pt-4 mt-4 text-[15px]">
                                            <CarouselPrevious
                                                className={
                                                    "disabled:hidden left-1  z-10 shadow-custom3 mt-2"
                                                }
                                            />
                                            <CarouselContent>
                                                {propertyItem.property.propertyFacilities.map(
                                                    (facility) => (
                                                        <CarouselItem
                                                            key={facility.id}
                                                            className="basis-auto font-semibold text-greenr h-auto overflow-hidden text-sm">
                                                            {facility.facilities.name}
                                                        </CarouselItem>
                                                    )
                                                )}
                                            </CarouselContent>

                                            <CarouselNext
                                                className={"right-1 mt-2 disabled:hidden shadow-custom2"}
                                            />
                                        </Carousel>

                                        {/* Button Take a Look */}
                                        <div className="w-full flex justify-end items-end mt-auto">
                                            <Buttons
                                                className=" self-end mr-4 mt-4"
                                                value={"Check this out!"}
                                                onClick={() => handleClick(propertyItem.property.slug)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </AnimationWrapper>
                        </div>
                    ))}
            </div>

            <PaginationControl
                currentPage={currentPage}
                totalPages={pagedData?.totalPages || 0}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PropertiesItems;

{
    /* <div
        className={
          "px-5 sm:px-10 md:px-20 lg:px-[80px] pb-[60px] pt-8 bg-[#F3F8FA]"
        }>
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 ">
          {data &&
            pagedData?.properties &&
            pagedData.properties.map((propertyItem: PropertyProjection) => (
              <div
                key={propertyItem.property.id}
                className="grid grid-cols-3 rounded-xl border-[1.5px] border-slate-200 h-64 bg-white"
                onClick={() => {
                  handleClick(propertyItem.property.slug);
                }}>
                <Carousel>
                  <CarouselPrevious className="left-2 z-10" />
                  <CarouselContent>
                    {/* Uncomment to display property pictures */
}
{
    /* {propertyItem.property.propertyPictures.map((picture) => ( */
}
{
    /*     <CarouselItem key={picture.id} className=""> */
}
{
    /*         <Image */
}
{
    /*             src={picture.imgUrl} */
}
{
    /*             alt={propertyItem.property.name} */
}
{
    /*             className="rounded-l-xl h-64 object-cover" */
}
{
    /*             width={300} */
}
{
    /*             height={300} */
}
{
    /*         /> */
}
{
    /*     </CarouselItem> */
}
{
    /* ))} */
}
//             </CarouselContent>
//             <CarouselNext className="right-2" />
//           </Carousel>

//           <div className="col-span-2 py-4 ml-4">
//             <p className="font-semibold text-lg">
//               {propertyItem.property.name}
//             </p>
//             <p className="text-slate-400 text-sm mt-1">
//               {propertyItem.property.address}
//             </p>
//             <div className="flex gap-2 items-center mt-3">
//               <div className="bg-greenr text-white rounded-sm p-1 px-2">
//                 <p className="text-sm">
//                   <span className="font-semibold text-lg">9.5</span>/10
//                 </p>
//               </div>
//               <div className="flex mt-[3px] gap-1 text-[14px]">
//                 <p className="font-semibold">{getRateLabel("9.5")}</p>
//                 <p className="mt-[1px]">(2.801 reviews)</p>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-6">
//               <div className="flex gap-1 items-center">
//                 {propertyItem.isBreakfast && (
//                   <>
//                     <Utensils
//                       size={24}
//                       className="text-white bg-greenr p-1 rounded-sm"
//                     />
//                     <p className="text-greenr font-semibold text-sm">
//                       Include Breakfast
//                     </p>
//                   </>
//                 )}
//               </div>
//               <div className="flex flex-col items-end justify-end pr-6">
//                 <p className="font-semibold text-xl text-red-600">
//                   IDR {propertyItem.price.toLocaleString("id-ID")}
//                 </p>
//                 <p className="text-slate-500 text-xs">
//                   /per night, include taxes and fees
//                 </p>
//               </div>
//             </div>

//             <Carousel className="border-t border-slate-500 pt-4 mt-4 text-[15px]">
//               <CarouselPrevious
//                 className={
//                   "disabled:hidden left-1  z-10 shadow-custom3 mt-2"
//                 }
//               />
//               <CarouselContent>
//                 {propertyItem.property.propertyFacilities.map(
//                   (facility) => (
//                     <CarouselItem
//                       key={facility.id}
//                       className="basis-auto font-semibold text-greenr h-auto overflow-hidden text-sm">
//                       {facility.facilities.name}
//                     </CarouselItem>
//                   )
//                 )}
//               </CarouselContent>

//               <CarouselNext
//                 className={"right-1 mt-2 disabled:hidden shadow-custom2 "}
//               />
//             </Carousel>
//           </div>
//         </div>
//       ))}
//   </div>

{
    /*<Pagination className={"mt-16"}>*/
}
{
    /*    <PaginationContent>*/
}
{
    /*        <PaginationItem>*/
}
{
    /*            <PaginationPrevious*/
}
{
    /*                href="#"*/
}
{
    /*                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}*/
}
{
    /*                aria-disabled={currentPage === 1}*/
}
{
    /*                className={"disabled:hidden font-semibold text-greenr "}*/
}
{
    /*            />*/
}
{
    /*        </PaginationItem>*/
}
{
    /*        {Array.from({length: pagedData?.totalPages || 0}, (_, index) => (*/
}
{
    /*            <PaginationItem key={index} className={""}>*/
}
{
    /*                <PaginationLink*/
}
{
    /*                    href="#"*/
}
{
    /*                    isActive={currentPage === index + 1}*/
}
{
    /*                    onClick={() => handlePageChange(index + 1)}*/
}
{
    /*                    className={" font-semibold text-greenr "}*/
}
{
    /*                >*/
}
{
    /*                    {index + 1}*/
}
{
    /*                </PaginationLink>*/
}
{
    /*            </PaginationItem>*/
}
{
    /*        ))}*/
}
{
    /*        <PaginationItem>*/
}
{
    /*            <PaginationNext*/
}
{
    /*                href="#"*/
}
{
    /*                onClick={() => currentPage < (pagedData?.totalPages || 0) && handlePageChange(currentPage + 1)}*/
}
{
    /*                aria-disabled={currentPage === length}*/
}
{
    /*                className={"disabled:hidden font-semibold text-greenr "}*/
}
{
    /*            />*/
}
{
    /*        </PaginationItem>*/
}
{
    /*    </PaginationContent>*/
}
{
    /*</Pagination>*/
}

//   <PaginationControl
//     currentPage={currentPage}
//     totalPages={pagedData?.totalPages || 0}
//     onPageChange={handlePageChange}
//   />
// </div> */}
