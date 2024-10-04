"use client";
import React, { useEffect } from 'react';
import PictureLayout from "@/app/property-detail/components/pictureLayout";
import Breadcrumbs from "@/app/property-detail/components/breadcrumbs";
import Navigation from "@/app/property-detail/components/navigation";
import LoginAdsPropertyDetail from "./components/loginAdsPropertyDetail";
import Overview from "./components/Overview";
import Review from "./components/Review";
import Rooms from "./components/rooms";
import Description from "./components/description";
import { useGetPropertyBySlug } from "@/hooks/properties/useGetPropertyBySlug";
import { useGetAvailableRooms } from "@/hooks/rooms/useGetAvailableRooms";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {useSearchParams} from "next/navigation";

const Page = () => {
    const param = useSearchParams();
    const slugParam: string | null = param.get("slugs");

    const slug = slugParam || ""; // Use an empty string as a fallback

    const { data, isLoading, error } = useGetPropertyBySlug(slug);

    if (!slug) {
        console.error("Slug parameter is missing");
        return <div>No slug provided.</div>;
    }

    const RoomsSearchInput = {
        checkinDate: new Date("2024-10-10"),
        checkOutDate: new Date("2024-10-11"),
        propertyId: "9"
    };

    const { data: availableRoomsData, isLoading: roomsLoading, error: roomsError } = useGetAvailableRooms(RoomsSearchInput);

    useEffect(() => {
        if (data) {
            console.log("Property data loaded:", data);
        }
    }, [data]);

    useEffect(() => {
        if (availableRoomsData) {
            console.log("Rooms data loaded:", availableRoomsData);
        }
        if (roomsError) {
            console.log("Rooms error:", roomsError);
        }
    }, [availableRoomsData, roomsLoading, roomsError]);

    if (isLoading || roomsLoading) return <div className={""}><LoadingStateAnimation/></div>;
    if (error) return <div>Error: {error.message}</div>;
    if (roomsError) return <div>Error: {roomsError.message}</div>;
    if (!data) return <div>No property data found</div>;

    return (
        <div className={"px-[180px]"}>
            <div className={"min-h-screen"}>
                <Breadcrumbs data={data} />
                <PictureLayout data={data} />
                <LoginAdsPropertyDetail />
                <Navigation />
                <Overview data={data} />
                <Rooms data={   availableRoomsData} />
                <Review />
                <Description data={data} />
            </div>
        </div>
    );
};

export default Page;
