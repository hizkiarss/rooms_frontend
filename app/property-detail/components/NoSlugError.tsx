import React from 'react';
import NoSlugAnimation from "@/components/animations/NoSlugAnimation";
import Buttons from "@/components/Buttons";

const NoSlugError = () => {
    return (
        <div className="h-screen">
            <div className={"h-5/6   flex flex-col items-center justify-center"}>
                <NoSlugAnimation/>
                <h2 className={"text-4xl font-semibold"}>Seems like you&apos;re lost</h2>
                <p className={"mt-3"}>Sorry, we couldn&apos;t find what you&apos;re looking for (404)</p>
                <Buttons value={"Back to homepage "} className={"mt-5 text-xl"}   onClick={() => { window.location.href = "/" }}
                />
            </div>
        </div>
    );
};

export default NoSlugError;