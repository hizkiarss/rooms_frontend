"use client";
import React, {useEffect, useState, useCallback} from "react";
import PictureLayout from "@/app/property-detail/components/pictureLayout";
import Breadcrumbs from "@/app/property-detail/components/breadcrumbs";
import Navigation from "@/app/property-detail/components/navigation";
import LoginAdsPropertyDetail from "./components/loginAdsPropertyDetail";
import Overview from "./components/Overview";
import Review from "./components/Review";
import Rooms from "./components/rooms";
import Description from "./components/description";
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";
import {useGetAvailableRooms} from "@/hooks/rooms/useGetAvailableRooms";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import {RoomType} from "@/types/rooms/RoomsType";
import useRefetchRooms from "@/hooks/useRefetchRooms";
import NoSlugError from "@/app/property-detail/components/NoSlugError";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

dayjs.extend(utc);
dayjs.extend(timezone);

const Page = () => {
    const {data: session} = useSession();
    const [slug, setSlug] = useState<string | null>(null);
    const [isSlugLoading, setIsSlugLoading] = useState(true);
    const [roomsSearchInput, setRoomsSearchInput] = useState({
        checkinDate: new Date(),
        checkOutDate: new Date(),
        propertyId: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const queryParams = new URLSearchParams(window.location.search);
            const slugParam = queryParams.get("slugs");
            const fromDateParam = queryParams.get("from");
            const toDateParam = queryParams.get("to");

            if (slugParam) {
                setSlug(slugParam);
            }

            setRoomsSearchInput((prev) => ({
                ...prev,
                checkinDate: fromDateParam
                    ? dayjs(fromDateParam).tz("Asia/Jakarta").toDate()
                    : prev.checkinDate,
                checkOutDate: toDateParam
                    ? dayjs(toDateParam).tz("Asia/Jakarta").toDate()
                    : prev.checkOutDate,
            }));

            setIsSlugLoading(false);
        }
    }, []);

    const {data, isLoading, error} = useGetPropertyBySlug(slug ?? "") as {
        data: PropertyDetailType | null;
        isLoading: boolean;
        error: Error | null;
    };

    useEffect(() => {
        if (data?.id && slug) {
            setRoomsSearchInput((prev) => ({
                ...prev,
                propertyId: data.id,
            }));
        }
    }, [data?.id, slug]);

    const {
        data: availableRoomsData,
        isLoading: roomsLoading,
        error: roomsError,
        refetch: refetchRooms,
    } = useGetAvailableRooms(roomsSearchInput);

    const {refetchStatus, setRefetchStatus} = useRefetchRooms({
        refetch: false,
        from: null,
        to: null,
        propertyId: null,
    });

    const handleRefetch = () => {
        if (data?.id) {
            setRoomsSearchInput((prev) => ({
                ...prev,
                checkinDate: refetchStatus.from
                    ? dayjs(refetchStatus.from).tz("Asia/Jakarta").toDate()
                    : prev.checkinDate,
                checkOutDate: refetchStatus.to
                    ? dayjs(refetchStatus.to).tz("Asia/Jakarta").toDate()
                    : prev.checkOutDate,
                propertyId: data.id,
            }));
        }
    };

    useEffect(() => {
        if (refetchStatus.refetch) {
            handleRefetch();
            refetchRooms();
        }
        setRefetchStatus({...refetchStatus, refetch: false});
    }, [refetchStatus]);

    useEffect(() => {
        if (data?.id) {
            setRoomsSearchInput((prev) => ({...prev, propertyId: data.id}));
            setRefetchStatus({...refetchStatus, propertyId: data.id});
        }
    }, [data?.id]);

    if (isSlugLoading) {
        return (
            <div className={""}>
                <LoadingStateAnimation/>
            </div>
        );
    }

    if (!slug) {
        return <NoSlugError/>;
    }

    if (isLoading)
        return (
            <div className={""}>
                <LoadingStateAnimation/>
            </div>
        );
    if (error || roomsError)
        return (
            <div>
                <ErrorAnimation/>
            </div>
        );
    if (roomsError) {
        console.log(roomsError);
    }
    if (!data) return <div>No property data found</div>;

    return (
        <div className={"min-h-screen py-4 px-5 sm:px-10 md:px-20 lg:px-[80px]"}>
            <div className={"min-h-screen"}>
                <Breadcrumbs data={data as PropertyDetailType}/>
                <PictureLayout data={data}/>
                {session == null ? <LoginAdsPropertyDetail/> : null}
                <Navigation/>
                <Overview data={data}/>
                {roomsLoading ? (
                    <div>
                        <LoadingAnimation/>
                    </div>
                ) : roomsError ? (
                    <div></div>
                ) : (
                    <Rooms data={availableRoomsData as RoomType[]}/>
                )}
                <Review propertyId={data.id} />
                <Description data={data}/>
            </div>
        </div>
    );
};

export default Page;
