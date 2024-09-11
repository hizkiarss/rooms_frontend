"use client"

import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import { PersonIcon } from "@radix-ui/react-icons";
import { ChevronRight, FileClock, Lock } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
import defaultAvatar from "@/public/user.png";
import Profile from "@/app/user-profile/components/Profile";
import Security from "@/app/user-profile/components/Security";
import { useFindUserbyEmail } from "@/hooks/user/useFindUserbyEmail";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const Page = () => {
    const [activeButton, setActiveButton] = useState("Profile");
    const { data: user, isLoading, error } = useFindUserbyEmail("qakaben@gmail.com");
    const [isPageLoading, setIsPageLoading] = React.useState<boolean>(false);

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const renderContent = () => {
        switch (activeButton) {
            case "Profile":
                return <Profile />;
            case "History":
                return <div>Payment History Content</div>;
            case "Security":
                return <Security setIsPageLoading={setIsPageLoading} />;
            default:
                return <div>Profile Content</div>;
        }
    };


    console.log(isPageLoading);

    if (isPageLoading || isLoading) {
        return <div className={"w-screen h-screen flex items-center"}><LoadingStateAnimation /></div>;
    }
    if (error) return <div className={"w-screen h-screen"}><ErrorAnimation /></div>;

    return (
        <div>
            <div className="grid grid-cols-4 px-[130px] gap-4 mt-10 mb-20">
                <div className="col-span-1">
                    <div className="flex items-center ml-1 mb-4">
                        <div>
                            <h2 className="text-3xl font-semibold text-greenr max-w-fit">Hi, {user?.username || 'User'}</h2>
                            <p className="text-gray-500 max-w-fit">{user?.email || 'qakaben@gmail.com'}</p>
                        </div>
                        <Image
                            src={user?.profilePicture || defaultAvatar}
                            alt="User Avatar"
                            width={48}
                            height={48}
                            className="w-[72px] h-[72px] rounded-full object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div
                            className={`${activeButton === 'Profile' ? 'bg-greenr text-earth' : 'bg-earth text-greenr'} hover:bg-greenr hover:cursor-pointer hover:text-earth transition duration-200 flex items-center justify-between rounded-xl w-full p-4`}
                            onClick={() => handleClick('Profile')}>
                            <div className="flex gap-4 items-center">
                                <PersonIcon className="size-8 h-fit" />
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-lg mb-1">Profile</p>
                                    <p className="text-sm pr-2">Provide your personal and contact details</p>
                                </div>
                            </div>
                            <ChevronRight className="size-10 h-fit" />
                        </div>
                        <div
                            className={`${activeButton === 'History' ? 'bg-greenr text-earth' : 'bg-earth text-greenr'} hover:bg-greenr hover:cursor-pointer hover:text-earth transition duration-200 flex items-center justify-between rounded-xl w-full p-4`}
                            onClick={() => handleClick('History')}>
                            <div className="flex gap-4 items-center">
                                <FileClock className="size-8 h-fit" />
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-lg mb-1">Payment History</p>
                                    <p className="text-sm pr-2">Look back at your transactions in the past</p>
                                </div>
                            </div>
                            <ChevronRight className="size-10 h-fit" />
                        </div>
                        <div
                            className={`${activeButton === 'Security' ? 'bg-greenr text-earth' : 'bg-earth text-greenr'} hover:bg-greenr hover:cursor-pointer hover:text-earth transition duration-200 flex items-center justify-between rounded-xl w-full p-4`}
                            onClick={() => handleClick('Security')}>
                            <div className="flex gap-4 items-center">
                                <Lock className="size-8 h-fit" />
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-lg mb-1">Security Settings</p>
                                    <p className="text-sm pr-2">Update your password</p>
                                </div>
                            </div>
                            <ChevronRight className="size-10 h-fit" />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border-2 border-greenr border-opacity-30 rounded-xl px-16 py-16">
                    <div>{renderContent()}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
