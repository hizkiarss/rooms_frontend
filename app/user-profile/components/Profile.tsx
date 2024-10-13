import React from 'react';
import defaultAvatar from "@/public/user.png"
import Image from 'next/image'
import Drawer from "../components/EditProfile";
import ChangeAvatar from "@/app/user-profile/components/ChangeAvatar";
import {useFindUserbyEmail} from "@/hooks/user/useFindUserbyEmail";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import {formatGender} from "@/types/gender/Gender";
import {useSession} from "next-auth/react";

const Profile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const OpenDrawer = () => {
        setIsDrawerOpen(true)
    }

    const {data : session} = useSession()
    const {data: user, isLoading, error} = useFindUserbyEmail(session?.user?.email);
    if (isLoading) return <div className={"w-screen h-screen flex items-center"}><LoadingStateAnimation/></div>;
    if (error) return <div className={"w-screen h-screen "}><ErrorAnimation/></div>;


    return (
        <div>
            <div className="flex justify-between  items-end md:items-center">
                <div className="">
                    <p className={"text-gray-400 ml-[2px]"}>{user?.username}</p>
                    <h2 className={"font-semibold text-xl md:text-3xl text-greenr"}>Basic Information</h2>
                </div>
                <Drawer></Drawer>

            </div>

            <div className={"mt-10 w-full md:w-1/2 md:flex flex-col"}>
                <ChangeAvatar/>

                <div>
                </div>
            </div>

            <div className={"md:w-3/4 "}>
                <div className={"grid grid-cols-2 "}>
                    <div>
                        <p className={"font-semibold md:mr-[284px] text-sm md:text-base "}>Name</p>
                        <p className={"text-slate-400 text-sm md:text-base"}>{user?.username || "Not Provided"}</p>
                    </div>
                    <div>
                        <p className={"font-semibold text-sm md:text-base "}>Date of birth</p>
                        <p className={"text-slate-400 text-sm md:text-base"}>{user?.dateOfBirth
                            ? (typeof user.dateOfBirth === 'string'
                                ? user.dateOfBirth
                                : new Date(user.dateOfBirth).toLocaleDateString())
                            : "Not Provided"
                        }</p>
                    </div>

                </div>

            </div>

            <div className={"mt-10 md:w-3/4 "}>
                <div className={"grid grid-cols-2"}>
                    <div className={"w-fit"}>
                        <p className={"font-semibold text-sm md:text-base "}>Gender</p>
                        <p className={"text-slate-400 text-sm md:text-base w-fit "}>{formatGender(user?.gender) || "Not Provided"}</p>
                    </div>
                    <div>
                        <p className={"font-semibold text-sm md:text-base "}>Mobile Number</p>
                        <p className={"text-slate-400 text-sm md:text-base "}>{user?.mobileNumber || "Not Provided"}</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Profile;