import React from 'react';
import defaultAvatar from "@/public/user.png"
import Image from 'next/image'
import Drawer from "../components/EditProfile";

const Profile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const OpenDrawer = () => {
        setIsDrawerOpen(true)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="">
                    <p className={"text-gray-400 ml-[2px]"}>Hizkia Sihombing</p>
                    <h2 className={"font-semibold text-3xl text-greenr"}>Basic Information</h2>
                </div>
                <Drawer ></Drawer>

            </div>


            {/*<p className={"text-gray-500 ml-[2px] mt-1"}> Make sure this information matches your ID or passport.</p>*/}

            <div className={"mt-10 w-1/2 flex flex-col"}>
                <div className={"flex gap-4 items-center mb-8"}>
                    <Image src={defaultAvatar} alt={"profile"} className={"w-12 h-fit"}/>
                    <div>
                        <p className={"font-semibold"}> Profile picture </p>
                        <p className={"text-slate-400"}>Edit or renew your profile picture</p>
                    </div>
                </div>
                <div className={"flex "}>
                    <div>
                        <p className={"font-semibold mr-[284px] "}>Name</p>
                        <p className={"text-slate-400"}>Hizkia Sihombing</p>
                    </div>
                    <div>
                        <p className={"font-semibold "}>Date of birth</p>
                        <p className={"text-slate-400"}>Not provided</p>
                    </div>
                </div>
                <div>
                </div>
            </div>

            <div className={"mt-10 w-1/2 flex flex-col"}>
                <div className={"flex"}>
                    <div>
                        <p className={"font-semibold mr-72 "}>Email</p>
                        <p className={"text-slate-400"}>Hizkia Sihombing</p>
                    </div>
                    <div>
                        <p className={"font-semibold "}>Mobile Number</p>
                        <p className={"text-slate-400"}>Not provided</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Profile;