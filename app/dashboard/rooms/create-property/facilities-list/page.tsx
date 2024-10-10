"use client"
import React, {useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/facilities-list/component/top";
import {ArrowRight} from "lucide-react";
import {useAddPropertiesFacilities} from "@/hooks/properties/useAddPropertiesFacilities";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import Buttons from "@/components/Buttons";
import usePropertyId from "@/hooks/usePropertyId";

const facilities = [
    {id: "1", name: "High-speed internet access"},
    {id: "3", name: "Fitness Center"},
    {id: "4", name: "Swimming Pool"},
    {id: "5", name: "Spa and Wellness"},
    {id: "6", name: "Airport Shuttle"},
    {id: "7", name: "Childcare Services"},
    {id: "8", name: "Disability Support"},
    {id: "9", name: "Bar/Lounge"},
    {id: "10", name: "24-Hour Front Desk"},
    {id: "11", name: "Hot Tub"}
];

const Page: React.FC = () => {
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const addPropertiesFacilitiesMutation = useAddPropertiesFacilities();

    const handleToggle = (facility: { id: string; name: string }) => {
        setSelectedFacilities(prev =>
            prev.includes(facility.id)
                ? prev.filter(f => f !== facility.id)
                : [...prev, facility.id]
        );
    };

    const {propertyId} = usePropertyId({propertyId: ""})

    const handleSubmit = () => {
        if (selectedFacilities.length > 0) {
            addPropertiesFacilitiesMutation.mutate({
                id: propertyId.propertyId,
                facilitiesId: selectedFacilities
            });
        }
    };

    return (
        <div className="px-80 mt-8">
            <Top/>
            <div>
                <ToggleGroup variant="outline" type="multiple" value={selectedFacilities}>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-10">
                        {facilities.map((facility) => (
                            <ToggleGroupItem
                                className="py-8 px-8 text-greenr justify-start"
                                key={facility.id}
                                value={facility.id}
                                onClick={() => handleToggle(facility)}
                                aria-label={`Toggle ${facility.name}`}
                            >
                                <div className="flex items-center gap-4 text-xl font-semibold">
                                    {getAmenityLabel(facility.name)}
                                    <p>{facility.name}</p>
                                </div>
                            </ToggleGroupItem>
                        ))}
                    </div>
                </ToggleGroup>

                {addPropertiesFacilitiesMutation.isPending && (
                    <div className="h-screen flex items-center justify-center">
                        <LoadingStateAnimation/>
                    </div>
                )}
                {addPropertiesFacilitiesMutation.isError && (
                    <p className="text-red-500 mt-4">
                        Error updating facilities: {addPropertiesFacilitiesMutation.error.message}
                    </p>
                )}
                {addPropertiesFacilitiesMutation.isSuccess && (
                    <p className="text-green-500 mt-4">Facilities updated successfully!</p>
                )}

                <div className="flex gap-4 justify-end items-center">
                    <Buttons
                        value="Add Property Facilities"
                        className="mt-10 text-lg"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={selectedFacilities.length === 0 || addPropertiesFacilitiesMutation.isPending}
                    />
                    {addPropertiesFacilitiesMutation.isSuccess ?
                        <button
                            className="flex pt-2 items-end mt-8 hover:text-greenr transition-colors duration-200 font-semibold"
                            disabled={!addPropertiesFacilitiesMutation.isSuccess}
                            onClick={() => window.location.href = "/dashboard/rooms/create-property/add-photo"}
                        >
                            Continue to next step
                            <ArrowRight size={22}/>
                        </button>
                        : null}
                </div>
            </div>


        </div>
    );
};

export default Page;