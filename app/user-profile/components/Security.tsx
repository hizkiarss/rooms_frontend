import React from 'react';
import {ChevronRight} from "lucide-react";

const Security = () => {
    return (
        <div>
            <h2 className={"font-semibold text-3xl text-greenr"}>Sign-in and security</h2>
            <p className={"text-slate-500 w-1/2 text-sm mt-2"}>Keep your account safe with a secure password and by
                signing out of devices you&apos;re not actively using.
            </p>

            <div className={"flex gap-4 items-center"}>
                <button
                    className={"flex justify-between mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200 "}>
                    <div className={""}>
                        <p className={"text-start font-semibold text-xl mb-2"}>Change password</p>
                        <p className={"w-5/6 text-start text-sm"}>Change your password after an email verification
                            process</p>
                    </div>
                    <ChevronRight className={"size-12 h-fit"}/>
                </button>

                <button
                    className={"flex justify-between mt-10 mb-5 bg-greenr text-earth p-4 rounded-lg items-center hover:bg-earth hover:text-greenr transition duration-200 "}>
                    <div className={""}>
                        <p className={"text-start font-semibold text-xl mb-2"}>Delete Account</p>
                        <p className={"w-5/6 text-start text-sm"}>Permanently delete your Rooms account and data.</p>
                    </div>
                    <ChevronRight className={"size-12 h-fit"}/>
                </button>

            </div>

        </div>
    );
};

export default Security;