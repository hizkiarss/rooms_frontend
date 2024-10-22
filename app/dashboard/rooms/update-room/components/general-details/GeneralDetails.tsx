"use client";
import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Buttons from "@/components/Buttons";
import useRoomName from "@/hooks/useRoomName";
import {useToast} from "@/hooks/use-toast";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {RoomType} from "@/types/rooms/RoomsType";
import {useGetRoomById} from "@/hooks/rooms/useGetRoomById";
import {useSearchParams} from "next/navigation";
import {useUpdateRoom} from "@/hooks/rooms/useUpdateRoom";
import {useSession} from "next-auth/react";



const UpdateRoomGeneralDetails = () => {
    const param = useSearchParams();
    const roomId = param.get("num") || "";
    const {data, error, isLoading} = useGetRoomById(roomId);
    const updateRoomMutation = useUpdateRoom();
    const {toast} = useToast();
    const {roomName, setRoomName} = useRoomName("");
    const [errorPopUp, setErrorPopUp] =useState(false);
    const initialValues = {
        name: data ? data.name : "",
        description: data ? data.description : "",
        capacity: data ? data.capacity : "",
        price: data ? data.price : "",
        includeBreakfast: data ? data.includeBreakfast : false,
        bedType: data?.bedTypes.name || '',
        roomArea: data ? data.roomArea : "",
        roomNumber: data ? data.roomNumber : "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string(),
        capacity: Yup.number().positive('Must be positive').required('Required'),
        price: Yup.number().positive('Must be positive').required('Required'),
        includeBreakfast: Yup.boolean(),
        bedType: Yup.string().required('Required'),
        roomArea: Yup.number().positive('Must be positive').required('Required'),
    });

    const {data: session} = useSession();

    const handleSubmit = (values: typeof initialValues) => {
        updateRoomMutation.mutate(
            {
                id: roomId,
                input: {
                    ...values,
                    capacity: Number(values.capacity),
                    price: Number(values.price),
                    roomArea: Number(values.roomArea),
                },
                email: session?.user?.email,
            },
            {
                onSuccess: (data: string) => {
                    console.log("Room updated successfully:", data);
                    setRoomName(data);
                    toast({
                        title: "Room Updated",
                        description: "The room has been successfully updated.",
                        variant: "default",
                        className: "bg-greenr text-white",
                    });
                },
                onError: (error: Error) => {
                    if(roomId == null){
                        setErrorPopUp(true)
                    }
                    console.error("Failed to update room:", error);
                    toast({
                        title: "Error",
                        description: "Failed to update room. Please try again.",
                        variant: "destructive",
                    });
                },
            }
        );
    };


    if (isLoading || updateRoomMutation.isPending) {
        return <LoadingStateAnimation/>;
    }


    if (error) {
        return <div>Error loading room data: {error.message}</div>;
    }

    const roomData = data as RoomType;
    if (!roomData) {
        return <div>No room data available.</div>;
    }


    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-3 md:space-y-4 text-sm md:text-base">
                        <div className="flex flex-col gap-3 md:grid grid-cols-2 md:gap-6">
                            <div>
                                <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Room Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.name : ""}
                                />
                                <ErrorMessage name="name" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>

                            <div>
                                <label htmlFor="bedType"
                                       className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Bed Type
                                </label>
                                <Field
                                    as="select"
                                    name="bedType"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.bedTypes : ""}
                                >
                                    <option value="" className={"text-gray-400"}>Select Bed Type</option>
                                    <option value="Single Bed">Single</option>
                                    <option value="Double Bed">Double</option>
                                    <option value="Queen Bed">Queen</option>
                                    <option value="King Bed">King</option>
                                    <option value="Super King Bed">Super King</option>

                                </Field>
                                <ErrorMessage name="bedType" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <Field
                                name="description"
                                as="textarea"
                                className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                placeholder={data ? data.description : ""}
                            />
                            <ErrorMessage name="description" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="capacity"
                                       className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Capacity
                                </label>
                                <Field
                                    name="capacity"
                                    type="number"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.capacity : ""}
                                />
                                <ErrorMessage name="capacity" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Price
                                </label>
                                <Field
                                    name="price"
                                    type="number"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.price : ""}
                                />
                                <ErrorMessage name="price" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="roomArea"
                                       className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Room Area (sqm)
                                </label>
                                <Field
                                    name="roomArea"
                                    type="number"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.roomArea : ""}

                                />
                                <ErrorMessage name="roomArea" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>

                            <div>
                                <label htmlFor="roomNumber"
                                       className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Room Number
                                </label>
                                <Field
                                    name="roomNumber"
                                    type="text"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                    placeholder={data ? data.roomNumber : ""}
                                />
                                <ErrorMessage name="roomNumber" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="includeBreakfast" className="flex items-center">
                                <Field
                                    type="checkbox"
                                    name="includeBreakfast"
                                    className="mr-2"
                                    placeholder={data ? data.includeBreakfast : false}
                                />
                                <span
                                    className="text-xs md:text-sm font-semibold text-gray-700">Include Breakfast</span>
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <Buttons value="Update Room" type="submit" className="text-base md:text-lg px-5"/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateRoomGeneralDetails;