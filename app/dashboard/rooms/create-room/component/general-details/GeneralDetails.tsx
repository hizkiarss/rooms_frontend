"use client";
import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Buttons from "@/components/Buttons";
import {useCreateRoom} from "@/hooks/rooms/useCreateRoom";
import useRoomName from "@/hooks/useRoomName";
import {useToast} from "@/hooks/use-toast";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {useSession} from "next-auth/react";
import useSelectedProperty from "@/hooks/useSelectedProperty";

const CreateRoomGeneralDetails = () => {
    const createRoomMutation = useCreateRoom();

    const initialValues = {
        name: '',
        description: '',
        capacity: '',
        price: '',
        includeBreakfast: false,
        bedType: '',
        roomArea: '',
        numberOfRooms: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string(),
        capacity: Yup.number().positive('Must be positive').required('Required'),
        price: Yup.number().positive('Must be positive').required('Required'),
        includeBreakfast: Yup.boolean(),
        bedType: Yup.string().required('Required'),
        roomArea: Yup.number().positive('Must be positive').required('Required'),
        numberOfRooms: Yup.number().positive('Must be positive').integer('Must be an integer').required('Required'),
    });

    const { toast } = useToast()

    const {roomName, setRoomName} = useRoomName("")

    const { data: session } = useSession();

    const {selectedProperty} =useSelectedProperty()

    const handleSubmit = (values: typeof initialValues) => {
        createRoomMutation.mutate(
            {
                input: {
                    ...values,
                    capacity: Number(values.capacity),
                    price: Number(values.price),
                    propertyId: selectedProperty || "1",
                    roomArea: Number(values.roomArea),
                    numberOfRooms: Number(values.numberOfRooms),
                },
                email: session?.user?.email,
            },
            {
                onSuccess: (data: string) => {
                    console.log("Room created successfully:", data);
                    setRoomName(data);
                    toast({
                        title: "Room Created",
                        description: "The room has been successfully created. Please add photos next.",
                        variant: "default",
                        className: "bg-greenr text-white",
                    });
                },
                onError: (error: Error) => {
                    console.error("Failed to create room:", error);
                    toast({
                        title: "Error",
                        description: "Failed to create room. Please try again.",
                        variant: "destructive",
                    });
                },
            }
        );
    };

    if (createRoomMutation.isPending){
        return <LoadingStateAnimation/>
    }
    console.log(roomName, "kocakk")

    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                                >
                                    <option value="">Select Bed Type</option>
                                    <option value="Single Bed">Single</option>
                                    <option value="Double Bed">Double</option>
                                    <option value="Queen Bed">Queen</option>
                                    <option value="King Bed">King </option>
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
                                />
                                <ErrorMessage name="capacity" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Price per night
                                </label>
                                <Field
                                    name="price"
                                    type="number"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
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
                                />
                                <ErrorMessage name="roomArea" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>

                            <div>
                                <label htmlFor="numberOfRooms"
                                       className="block text-xs md:text-sm font-semibold text-gray-700">
                                    Number of Rooms
                                </label>
                                <Field
                                    name="numberOfRooms"
                                    type="number"
                                    className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                />
                                <ErrorMessage name="numberOfRooms" component="div"
                                              className="text-red-500 text-xs md:text-sm mt-1"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="includeBreakfast" className="flex items-center">
                                <Field
                                    type="checkbox"
                                    name="includeBreakfast"
                                    className="mr-2"
                                />
                                <span
                                    className="text-xs md:text-sm font-semibold text-gray-700">Include Breakfast</span>
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <Buttons value="Create Room" type="submit" className="text-base md:text-xl px-5"/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateRoomGeneralDetails;