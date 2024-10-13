    "use client"
    import React, { useEffect, useState } from 'react';
    import PropertyCards from "@/app/dashboard/rooms/room-list/components/RoomCards";
    import { useGetFilteredRoomsByPropertyId } from "@/hooks/rooms/useGetFilteredRoomsByPropertyId";
    import { FilterByNamePopUp } from "@/app/dashboard/rooms/room-list/components/FilterByNamePopUp";
    import Buttons from "@/components/Buttons";
    import { FilterByAvailablePopUp } from "@/app/dashboard/rooms/room-list/components/FilterByAvailable";
    import useFilterRoomsDashboard from "@/hooks/useFilterRoomsDashboard";
    import PaginationControl from "@/components/PaginationControl";
    import { PagedRoomResult } from "@/types/rooms/PagedRoomResult";
    import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
    import useSelectedProperty from "@/hooks/useSelectedProperty";

    const Page = () => {
        const { filterContent, setFilterContent } = useFilterRoomsDashboard({
            filterName: null,
            available: null,
        })

        const {selectedProperty, isLoading: isSelectedPropertyLoading} = useSelectedProperty()
        const [currentPage, setCurrentPage] = useState(0);
        const { data: RoomsData, error, refetch, isLoading } = useGetFilteredRoomsByPropertyId({
            propertyId: selectedProperty || "",
            isAvailable: filterContent.available !== null ? filterContent.available : null,
            roomName: filterContent.filterName,
            pageNumber: currentPage,
            pageSize: 32,
        })


        const pagedData = RoomsData as PagedRoomResult | undefined;

        const handlePageChange = (page: number) => {
            if (pagedData && page > 0 && page <= pagedData.totalPages) {
                setCurrentPage(page);
            }
        };

        const handleFilterChange = (newFilterContent: { filterName?: string | null, available?: boolean | null }) => {
            setFilterContent({ ...filterContent, ...newFilterContent });
            setCurrentPage(0);
            refetch();
        };

        const handleResetFilter = () => {
            setFilterContent({ filterName: null, available: null });
            setCurrentPage(0);
            refetch();
        };

        useEffect(() => {
            refetch();
        }, [filterContent, currentPage]);

        if (error) {
            console.log(error)
        }

        if (isSelectedPropertyLoading ) {
            return <LoadingStateAnimation />;
        }

        console.log(RoomsData)

        console.log(selectedProperty);



        return (
            <div className={"pb-16 flex flex-col justify-between min-h-screen"}>
                <div className={""}>
                    <div className="md:flex justify-between mx-5 md:mx-10 mb-6 mt-0 md:mt-6 md:mb-6 items-center ">
                        <p className={"font-semibold mb-4 md:mb-0"}>Showing {RoomsData?.totalElements} rooms</p>
                        <div className={"flex gap-2 items-center w-fit"}>
                            <p className={"font-semibold hidden md:block"}>Filter by:</p>

                            <FilterByNamePopUp
                                isOpen={true}
                                onClose={() => {}}
                            />
                            <FilterByAvailablePopUp
                                isOpen={true}
                                onClose={() => {}}
                                onFilterChange={(available) => handleFilterChange({ available })}
                            />
                            <Buttons
                                value={"Reset"}
                                className={"hover:!bg-greenr hover:!text-white py-[10px] text-xs md:text-base"}
                                onClick={handleResetFilter}
                            />
                        </div>
                    </div>
                    <PropertyCards data={RoomsData?.rooms ?? null} refetch={refetch} />
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