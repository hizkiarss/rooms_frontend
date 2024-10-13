"use client"

import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useToast} from "@/hooks/use-toast";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {useUpdateRoomsByName} from "@/hooks/rooms/useUpdateRoomsByName";
import {useSearchParams} from "next/navigation";
import {useGetRoomsTypesByPropertyId} from "@/hooks/rooms/useGetRoomsTypesByPropertyId";
import Buttons from "@/components/Buttons";
import useSelectedProperty from "@/hooks/useSelectedProperty";
import {useSession} from "next-auth/react";

const UpdateRoomsByName = () => {
    const param = useSearchParams();
    const updateRoomsMutation = useUpdateRoomsByName();
    const {toast} = useToast();

    const{selectedProperty} =useSelectedProperty()
    const {data: roomTypes, error, isLoading} = useGetRoomsTypesByPropertyId(selectedProperty || "1");

    if (error) {
        console.log(error)
    }

    const validationSchema = Yup.object({
        roomType: Yup.string().required('Required'),
        newName: Yup.string().required('Required'),
        description: Yup.string(),
        capacity: Yup.number().positive('Must be positive').required('Required'),
        price: Yup.number().positive('Must be positive').required('Required'),
        roomArea: Yup.number().positive('Must be positive').required('Required'),
        includeBreakfast: Yup.boolean(),
        bedType: Yup.string().required('Required'),
    });
    const { data: session } = useSession();

    const handleSubmit = (values: any) => {
        updateRoomsMutation.mutate(
            {
                name: values.roomType,
                input: {
                    name: values.newName,
                    capacity: Number(values.capacity),
                    price: Number(values.price),
                    roomArea: Number(values.roomArea),
                    description: values.description,
                    includeBreakfast: values.includeBreakfast,
                    bedType: values.bedType,
                },
                email: session?.user?.email,
                propertyId: selectedProperty || "",
            },
            {
                onSuccess: (data) => {
                    console.log("Rooms updated successfully:", data);
                    toast({
                        title: "Rooms Updated",
                        description: "All rooms of this type have been successfully updated.",
                        variant: "default",
                        className: "bg-greenr text-white",
                    });
                },
                onError: (error) => {
                    console.error("Failed to update rooms:", error);
                    toast({
                        title: "Error",
                        description: "Failed to update rooms. Please try again.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    if (isLoading || updateRoomsMutation.isPending) {
        return <LoadingStateAnimation/>;
    }

    if (error) {
        return <div>Error loading room data: {error.message}</div>;
    }

    const initialValues = {
        roomType: '',
        newName: '',
        description: '',
        capacity: '',
        price: '',
        roomArea: '',
        includeBreakfast: false,
        bedType: '',
    };

    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                                    Room Type to Update
                                </label>
                                <Field
                                    as="select"
                                    name="roomType"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" className="text-gray-400">Select Room Type</option>
                                    {roomTypes && roomTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="roomType" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="newName" className="block text-sm font-medium text-gray-700">
                                    New Room Name
                                </label>
                                <Field
                                    name="newName"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <ErrorMessage name="newName" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="bedType" className="block text-sm font-medium text-gray-700">
                                    Bed Type
                                </label>
                                <Field
                                    as="select"
                                    name="bedType"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="" className="text-gray-400">Select Bed Type</option>
                                    <option value="Single Bed">Single</option>
                                    <option value="Double Bed">Double</option>
                                    <option value="Queen Bed">Queen</option>
                                    <option value="King Bed">King</option>
                                    <option value="Super King Bed">Super King</option>
                                </Field>
                                <ErrorMessage name="bedType" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                                    Capacity
                                </label>
                                <Field
                                    name="capacity"
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <ErrorMessage name="capacity" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <Field
                                    name="price"
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>

                            <div>
                                <label htmlFor="roomArea" className="block text-sm font-medium text-gray-700">
                                    Room Area (sqm)
                                </label>
                                <Field
                                    name="roomArea"
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <ErrorMessage name="roomArea" component="div" className="mt-1 text-sm text-red-600"/>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <Field type="checkbox" name="includeBreakfast"
                                       className="form-checkbox h-5 w-5 text-indigo-600"/>
                                <span className="ml-2 text-sm text-gray-700">Include Breakfast</span>
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <Buttons value={"Update All Rooms of This Type"} disabled={isSubmitting} type="submit" className={"text-base md:text-lg "}/>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateRoomsByName;