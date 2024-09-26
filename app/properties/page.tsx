"use client"
import React, { useEffect, useState } from 'react';
import Searchbar from "@/app/properties/components/searchbar";
import Propertiesitems from "@/app/properties/components/PropertiesItems";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";

const Page = () => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageError, setIsPageError] = useState(false);
    const[totalProperties, setTotalProperties] = useState(0);

    useEffect(() => {
        if (isPageError) {
            console.error("An error occurred.");
        }
    }, [isPageError]);

    useEffect(() => {
        console.log("isPageLoading changed: ", isPageLoading);
    }, [isPageLoading]);



    return (
        <div className="px-[150px]">
            {isPageError && <ErrorAnimation />}
            {!isPageError && (
                <>
                    <Searchbar totalElements={totalProperties} />
                    <Propertiesitems setIsPageLoading={setIsPageLoading} setIsPageError={setIsPageError} setTotalProperty={setTotalProperties} />
                </>
            )}
            {isPageLoading && <LoadingStateAnimation />}

        </div>
    );
};

export default Page;