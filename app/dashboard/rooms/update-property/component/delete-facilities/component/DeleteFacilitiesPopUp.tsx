"use client"
import React, {useState, useMemo, useEffect} from 'react';
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
import {useDeletePropertyFacilities} from "@/hooks/properties/useDeletePropertyFacilites";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import {useGetPropertyById} from "@/hooks/properties/useGetPropertyById";
import {useToast} from "@/hooks/use-toast";

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


const DeleteFacilitiesPopUp: React.FC = () => {
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const deletePropertyFacilitiesMutation = useDeletePropertyFacilities();
    const {selectedProperty} = useSelectedProperty();
    const {data, refetch} = useGetPropertyById(selectedProperty || "1");
    const propertyData = data as PropertyDetailType;
    const existingFacility = useMemo(() => {
        return data?.propertyFacilities?.map((facility: PropertyFacility) => facility.facilities) || [];
    }, [data]);


    const handleToggle = (facilityId: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facilityId)
                ? prev.filter(f => f !== facilityId)
                : [...prev, facilityId]
        );
    };
    const {toast} = useToast()

    const handleSubmit = async () => {
        if (selectedFacilities.length > 0) {
            try {
                await deletePropertyFacilitiesMutation.mutateAsync({
                    id: selectedProperty || "1",
                    facilitiesId: selectedFacilities
                });
                await refetch();
                setSelectedFacilities([]);
                toast({
                    title: "Success",
                    description: "Facilities updated successfully",
                    variant: "default",
                });
            } catch (error) {
                console.error("Failed to update facilities:", error);

                toast({
                    title: "Error",
                    description: "Failed to update facilities. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };


    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Buttons value={"Delete facilities"} className={"!text-xs md:!text-base  w-fit md:w-48 "}/>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-3xl max-h-fit md:px-10 py-10">
                    <AlertDialogHeader>


                        <AlertDialogDescription>
                            <div className={"text-black"}>
                                <AlertDialogTitle className={"text-xl text-start  md:text-2xl mb-6"}>
                                    <h2 className={"text-start"}>Remove Your Current Facilities</h2>

                                    <p className={"text-sm md:text-base text-gray-400 font-medium"}> Remove these
                                        facilities and keep your listing fresh</p>
                                </AlertDialogTitle>
                                <div className={"flex flex-col md:grid grid-cols-2 gap-y-3 gap-x-8 "}>
                                    {existingFacility.length > 0 ? (
                                        existingFacility.map((facility, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox className={"size-5"}
                                                          checked={selectedFacilities.includes(facility.id)}
                                                          onCheckedChange={() => handleToggle(facility.id)}
                                                          id={facility.id}/>
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm md:text-base flex items-center gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    <AlertDialogFooter className={"flex  flex-row items-center justify-end"}>
                        <Buttons className={"w-fit h-fit"}
                                 value={deletePropertyFacilitiesMutation.isPending ? "Deleting..." : "Delete"}
                                 disabled={deletePropertyFacilitiesMutation.isPending} onClick={handleSubmit}/>
                        <AlertDialogCancel className={"hover:none !border-none !hover:border-none p-0 m-0"}>
                            <Buttons value={"Close"} className={"py-0"}/>
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
};

export default DeleteFacilitiesPopUp;