import React from 'react';
import FinishPropertyAnimation from "@/components/animations/FinishPropertyAnimation";
import Buttons from "@/components/Buttons";

const FinishCreateProperty = () => {
    return (
        <div className={"h-screen flex flex-col gap-3 items-center justify-center"}>
            <div className="h-4/5">
                <FinishPropertyAnimation/>
                <div className={"flex flex-col justify-center items-center gap-3"}>
                    <h2 className={"font-semibold text-4xl"}> Your Property Is Ready! </h2>
                    <p> Let&apos;s add awesome rooms to impress potential tenants! </p>
                    <Buttons value={"Create rooms"} className={"text-xl w-fit px-10"} onClick={()=>window.location.href = "/dashboard/rooms"}/>
                </div>
            </div>


        </div>
    );
};

export default FinishCreateProperty;