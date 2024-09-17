"use client";

import React from 'react';
import { useAddPropertiesFacilities } from "@/hooks/properties/useAddPropertiesFacilities";

const Page = () => {
    const { mutate: addPropertiesFacilitiesMutation } = useAddPropertiesFacilities();

    const id: string = "1";
    const facilitiesId: string[] = ["8", "9", "11"];

    const handleClick = () => {
        addPropertiesFacilitiesMutation({ id, facilitiesId });
    };

    return (
        <div>
            <button onClick={handleClick}>
                Add Facilities
            </button>
        </div>
    );
};

export default Page;