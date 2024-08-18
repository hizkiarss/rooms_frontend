"use client"

import React from 'react';
import logo from '../public/logo.png'
import Image from "next/image";
import {usePathname} from "next/navigation";

const Navbar = () => {
    const pathName = usePathname()

    if (pathName === "/login") {
        return null
    }

    return (
        <div className="py-4 flex justify-between items-center px-[130px]">
            <Image className={"w-[130px] h-fit"} src={logo} alt={"logo.png"}></Image>
            <div className={"flex gap-20 font-semibold"}>
                <p>List Your Property</p>
                <p>Sign in</p>
            </div>
            </div>
    );
};

export default Navbar;