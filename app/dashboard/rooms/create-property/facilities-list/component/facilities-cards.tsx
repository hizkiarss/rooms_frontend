"use client"
import React, {useState, useEffect} from 'react';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import {useAddPropertiesFacilities} from "@/hooks/properties/useAddPropertiesFacilities";
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


const FacilitiesCards: React.FC = () => {
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const addPropertiesFacilitiesMutation = useAddPropertiesFacilities();
    const[hit, setHit] = useState<boolean>(false);
    const {propertyId} = usePropertyId({propertyId: ""})
    useEffect(() => {
        if (hit && selectedFacilities.length > 0) {
            addPropertiesFacilitiesMutation.mutate({
                id: propertyId.propertyId,
                facilitiesId: selectedFacilities
            });
            setHit(false)
        }
    }, [selectedFacilities]);

    const handleToggle = (facility: { id: string; name: string }) => {
        setSelectedFacilities(prev =>
            prev.includes(facility.id)
                ? prev.filter(f => f !== facility.id)
                : [...prev, facility.id]
        );
    };

    return (
        <div className={""}>
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
            {addPropertiesFacilitiesMutation.isPending &&
                <div className={"h-screen flex items-center justify-center"}><LoadingStateAnimation/></div>}
            {addPropertiesFacilitiesMutation.isError && (
                <p>Error updating facilities: {addPropertiesFacilitiesMutation.error.message}</p>
            )}
            {addPropertiesFacilitiesMutation.isSuccess && <p>Facilities updated successfully!</p>}

            <div className={"flex justify-end"}>
                <Buttons value={"Add Property Facilities"}  className={"mt-10 text-lg"} type="submit" onClick={()=> setHit(true)}/>
            </div>
        </div>
    );
};

export default FacilitiesCards;