"use client"
import React, {useEffect, useState} from 'react';
import Top from "@/app/dashboard/rooms/create-property/facilities-list/component/top";
import {useAddPropertiesFacilities} from "@/hooks/properties/useAddPropertiesFacilities";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import Buttons from "@/components/Buttons";
import usePropertyId from "@/hooks/usePropertyId";
import NotificationPopUp from "@/components/NotificationPopUp";

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
    const [successPopUp, setSuccessPopUp] = useState(false);
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

    useEffect(() => {
        if (addPropertiesFacilitiesMutation.isSuccess) {
            setSuccessPopUp(true);
        }
    }, [addPropertiesFacilitiesMutation.isSuccess]);

    if (addPropertiesFacilitiesMutation.isPending) {
        return <div className={"h-screen w-full flex items-center justify-center"}><LoadingStateAnimation/></div>
    }

    const hasFacilitiesSelected = selectedFacilities.length > 0;
    const showContinueButton = hasFacilitiesSelected && addPropertiesFacilitiesMutation.isSuccess;

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

                <NotificationPopUp title={"Facilities Added"}
                                   content={"You have successfully added facilities to your property"}
                                   isOpen={successPopUp}
                                   onClose={() => setSuccessPopUp(false)}/>

                <div className="flex gap-4 justify-end items-center">
                    <Buttons
                        value="Add Property Facilities"
                        className="mt-10 text-lg"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!hasFacilitiesSelected || addPropertiesFacilitiesMutation.isPending}
                    />

                    {showContinueButton && (
                        <Buttons
                            value="Continue to next step"
                            className="mt-10 text-lg"
                            type="submit"
                            onClick={() => window.location.href = "/dashboard/rooms/create-property/add-photo"}
                            disabled={addPropertiesFacilitiesMutation.isPending}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;