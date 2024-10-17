"use client";

import React, {useEffect, useState} from "react";
import {PersonIcon} from "@radix-ui/react-icons";
import {ChevronRight, FileClock, Lock} from "lucide-react";
import Image from "next/image";
import defaultAvatar from "@/public/user.png";
import Profile from "@/app/user-profile/components/Profile";
import Security from "@/app/user-profile/components/Security";
import {useFindUserbyEmail} from "@/hooks/user/useFindUserbyEmail";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import OrderList from "../my-order/component/OrderList";
import {useSession} from "next-auth/react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {useSendResetPasswordLink} from "@/hooks/user/useSendResetPasswordLink";

const Page = () => {
    const {data: session} = useSession();
    const [activeButton, setActiveButton] = useState("Profile");
    const {
        data: user,
        isLoading,
        error,
        isError,
    } = useFindUserbyEmail(session?.user?.email);
    const [isPageLoading, setIsPageLoading] = React.useState<boolean>(false);
    const [resetSuccess, setResetSuccess] = React.useState(false);

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const renderContent = () => {
        switch (activeButton) {
            case "Profile":
                return <Profile/>;
            case "History":
                return <OrderList/>;
            case "Security":
                return <Security setIsPageLoading={setIsPageLoading} setResetSuccess={setResetSuccess}/>;
            default:
                return <div>Profile Content</div>;
        }
    };



    if (isPageLoading || isLoading ) {
        return (
            <div className={"h-screen flex items-center justify-center"}>
                <LoadingStateAnimation/>
            </div>
        );
    }


    if (isError)
        return (
            <div className={"w-screen flex items-center justify-center h-screen"}>
                <ErrorAnimation/>
            </div>
        );

    const options = [
        {name: "Profile", icon: PersonIcon, description: "Provide your personal and contact details"},
        {name: "History", icon: FileClock, description: "Look back at your transactions in the past"},
        {name: "Security", icon: Lock, description: "Update your password"},
    ];

    return (
        <div>
            {error && (
                <div>
                    <ErrorAnimation/>
                </div>
            )}
            <div className="flex flex-col md:grid grid-cols-4 px-[20px] md:px-[130px] gap-4 mt-10 mb-20">
                <div className="col-span-1">
                    <div className="flex gap-2 md:justify-start w-full md:w-fit items-center ml-1 mb-4">
                        <div className={"order-2 md:order-1"}>
                            <h2 className="text-xl md:text-3xl font-semibold text-greenr max-w-fit">
                                Hi, {user?.username || "User"}
                            </h2>
                            <p className="text-sm md:text-base text-gray-500 max-w-fit">
                                {user?.email || "qakaben@gmail.com"}
                            </p>
                        </div>
                        <Image
                            src={user?.profilePicture || defaultAvatar}
                            alt="User Avatar"
                            width={48}
                            height={48}
                            className="order-1 md:order-2 w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full object-cover object-center"
                        />
                    </div>
                    <div className="md:hidden">
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {options.map((option) => (
                                    <CarouselItem key={option.name}>
                                        <div
                                            className={`${
                                                activeButton === option.name
                                                    ? "bg-greenr text-earth"
                                                    : "bg-earth text-greenr"
                                            } hover:bg-greenr hover:cursor-pointer hover:text-earth transition duration-200 flex items-center justify-between rounded-xl w-full p-4`}
                                            onClick={() => handleClick(option.name)}>
                                            <div className="flex gap-4 items-center">
                                                <option.icon className="size-8"/>
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-semibold text-lg mb-1">{option.name}</p>
                                                    <p className="text-sm pr-2">{option.description}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="size-10"/>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {/*<CarouselPrevious />*/}
                            {/*<CarouselNext />*/}
                        </Carousel>
                    </div>
                    <div className="hidden md:flex md:flex-col gap-4">
                        {options.map((option) => (
                            <div
                                key={option.name}
                                className={`${
                                    activeButton === option.name
                                        ? "bg-greenr text-earth"
                                        : "bg-earth text-greenr"
                                } hover:bg-greenr hover:cursor-pointer hover:text-earth transition duration-200 flex items-center justify-between rounded-xl w-full p-4`}
                                onClick={() => handleClick(option.name)}>
                                <div className="flex gap-4 items-center">
                                    <option.icon className="size-8"/>
                                    <div className="flex flex-col justify-center">
                                        <p className="font-semibold text-lg mb-1">{option.name}</p>
                                        <p className="text-sm pr-2">{option.description}</p>
                                    </div>
                                </div>
                                <ChevronRight className="size-10"/>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="col-span-3 border-2 border-greenr border-opacity-30 rounded-xl px-6 py-8 md:px-16 md:py-16">
                    <div>{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Page;