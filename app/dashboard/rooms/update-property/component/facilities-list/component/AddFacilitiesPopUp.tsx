"use client"
import React, {useState, useMemo} from 'react';
import {ArrowRight, X} from "lucide-react";
import {useAddPropertiesFacilities} from "@/hooks/properties/useAddPropertiesFacilities";
import {getAmenityLabel} from "@/utils/FacilityLogoUtils";
import Buttons from "@/components/Buttons";
import usePropertyId from "@/hooks/usePropertyId";
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";
import {Checkbox} from "@/components/ui/checkbox"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import {FacilitiesType} from "@/types/facilities/FacilitiesType";
import {PropertyFacility} from "@/types/property-facility/PropertyFacilityType";
import {map} from "d3-array";

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
    {id: "11", name: "Hot Tub"},

];

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}


const AddFacilitiesPopUp: React.FC<Prop> = ({isOpen, onClose}) => {
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const addPropertiesFacilitiesMutation = useAddPropertiesFacilities();
    const {data} = useGetPropertyBySlug("icikiwirasf-2jCf");
    const propertyData = data as PropertyDetailType;
    const existingFacilityIds = useMemo(() => {
        return data?.propertyFacilities?.map((facility: PropertyFacility) => facility.facilities.id) || [];
    }, [data]);

    const facilitiesOptions = useMemo(() => {
        return facilities.filter(facility => !existingFacilityIds.includes(facility.id));
    }, [existingFacilityIds]);


    const handleToggle = (facilityId: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facilityId)
                ? prev.filter(f => f !== facilityId)
                : [...prev, facilityId]
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
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Buttons value={"Add Facilities"}/>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-3xl max-h-fit px-10 py-10">
                    <AlertDialogHeader>


                        <AlertDialogDescription>
                            <div className={"mb-16 text-black"}>
                                <AlertDialogTitle className={"text-2xl mb-6 flex justify-between"}>
                                    <div>
                                        <h2>Your Current Facilities</h2>
                                        <p className={"text-base text-gray-400 font-medium"}>
                                            Attract customers with your new facilities</p>
                                    </div>
                                    <AlertDialogCancel className="px-0 hover:none !border-none !hover:border-none">
                                    <X/>
                                    </AlertDialogCancel>
                                </AlertDialogTitle> {propertyData?.propertyFacilities.length > 0 ? (
                                <div className={"grid grid-cols-2 gap-y-3 gap-x-3 text-base items-center "}>
                                    {propertyData.propertyFacilities.map((facility: PropertyFacility) => (
                                        <div key={facility.id} className={"flex gap-2"}>
                                            {getAmenityLabel(facility.facilities.name)}
                                            <p>{facility.facilities.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                                <div>
                                </div>
                            </div>

                            <div className={"text-black"}>
                                <AlertDialogTitle className={"text-2xl mb-6"}>Add Facilities
                                    <p className={"text-base text-gray-400 font-medium"}> Attract customers with your
                                        new
                                        facilities</p>
                                </AlertDialogTitle>
                                <div className={"grid grid-cols-2 gap-y-3 gap-x-8 "}>
                                    {facilitiesOptions.length > 0 ? (
                                        facilitiesOptions.map((facility, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox className={"size-5"}
                                                          checked={selectedFacilities.includes(facility.id)}
                                                          onCheckedChange={() => handleToggle(facility.id)}
                                                          id={facility.id}/>
                                                <label
                                                    htmlFor="terms"
                                                    className="text-base flex items-center gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {getAmenityLabel(facility.name)}
                                                    {facility.name}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Your guest must be so lucky! You already have them all!</p>
                                    )}
                                </div>
                            </div>


                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="px-0 hover:none !border-none !hover:border-none" onClick={handleSubmit}>
                            <Buttons value={addPropertiesFacilitiesMutation.isPending ? "Saving..." : "Save"} disabled={addPropertiesFacilitiesMutation.isPending} />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
};

export default AddFacilitiesPopUp;