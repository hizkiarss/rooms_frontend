"use client"
import React, {useEffect, useState} from 'react';
import {useGetPropertiesByOwnerEmail} from "@/hooks/properties/useGetPropertiesByOwnerEmail";
import PropertyCards from "@/app/dashboard/rooms/room-list/components/RoomCards";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import {useGetFilteredRoomsByPropertySlug} from "@/hooks/rooms/useGetFilteredRoomsByPropertySlug";
import FilterPopup from "@/app/properties/components/FilterPopup";
import {FilterByNamePopUp} from "@/app/dashboard/rooms/room-list/components/FilterByNamePopUp";
import Buttons from "@/components/Buttons";
import {FilterByAvailablePopUp} from "@/app/dashboard/rooms/room-list/components/FilterByAvailable";
import useFilterRoomsDashboard from "@/hooks/useFilterRoomsDashboard";
import PaginationControl from "@/components/PaginationControl";
import {PagedPropertyResult} from "@/types/properties/PagedPropertyResult";
import {PagedRoomResult} from "@/types/rooms/PagedRoomResult";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";


const Page = () => {
    const {data} = useGetPropertiesByOwnerEmail("email@dummy.com") as { data: PropertyDetailType[] | null };

    const {filterContent, setFilterContent} = useFilterRoomsDashboard({
        filterName: null,
        available: null,
    })


    const [openFilterName, setOpenFilterName] = useState<boolean>(true)
    const [openFilterAvailable, setOpenFilterAvailable] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState(0);
    const {data: RoomsData, error, refetch, isLoading} = useGetFilteredRoomsByPropertySlug({
        propertySlug: "hotel-Dummy-MbUS",
        isAvailable: filterContent?.available ? filterContent.available : null,
        roomName: filterContent?.filterName ? filterContent.filterName : null,
        pageNumber: currentPage,
        pageSize: 30,
    })

    const pagedData = RoomsData as PagedRoomResult | undefined;


    const handlePageChange = (page: number) => {
        if (pagedData && page > 0 && page <= pagedData.totalPages) {
            setCurrentPage(page - 1);
        }
    };


    useEffect(() => {
        refetch()
        console.log(filterContent.filterName)
        console.log("kocak")
    }, [filterContent, setFilterContent]);


    if(isLoading){
        return <LoadingStateAnimation />;
    }

    return (
        <div className={"pb-16 flex flex-col justify-between min-h-screen"}>
            <div className={""}>
                <div className="flex justify-between mx-10 my-6 items-center ">
                    <p className={"font-semibold"}>Showing {RoomsData?.totalElements} rooms</p>
                    <div className={"flex gap-2 items-center w-fit"}>
                        <p className={"font-semibold"}>Filter by:</p>
                        <FilterByNamePopUp isOpen={openFilterName} onClose={() => setOpenFilterName(false)}
                        />
                        <FilterByAvailablePopUp isOpen={openFilterAvailable} onClose={() => setOpenFilterAvailable(false)}/>
                        <Buttons value={"Reset"} className={"hover:!bg-greenr hover:!text-white"}
                                 onClick={() => setFilterContent({available: null, filterName: null})}/>
                    </div>
                </div>
                <PropertyCards data={RoomsData?.rooms ?? null}/>
            </div>
            <PaginationControl
                currentPage={currentPage}
                totalPages={pagedData?.totalPages || 0}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Page;