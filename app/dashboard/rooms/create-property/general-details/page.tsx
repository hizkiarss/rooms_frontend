"use client";
import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useCreateProperties} from "@/hooks/properties/useCreateProperty";
import Buttons from "@/components/Buttons";
import {LocationPopOverDashboard} from "@/app/dashboard/component/LocationPopOverDashboard";
import {City} from "@/types/city/City";
import usePropertyId from "@/hooks/usePropertyId";
import {useSession} from "next-auth/react";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

const Page = () => {
    const initialValues = {
        propertyName: '',
        propertyCategories: 'Hotel',
        description: '',
        checkInTime: '',
        checkOutTime: '',
        address: '',
        city: '',
        phoneNumber: '',
        star: "",
    };

    const validationSchema = Yup.object({
        propertyName: Yup.string().required('Required'),
        propertyCategories: Yup.string().oneOf(['Hotel', 'Apartment'], 'Invalid property category').required('Required'),
        description: Yup.string(),
        checkInTime: Yup.string().required('Required'),
        checkOutTime: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        phoneNumber: Yup.string()
            .matches(/^[+]?[\d\s()-]+$/, 'Invalid phone number')
            .required('Required'),
        star: Yup.string()
            .oneOf(["1", "2", "3", "4", "5"], 'Invalid rating')
            .required('Required'),
    });
    const {data: session} = useSession();

    const createPropertiesMutation = useCreateProperties();
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const {propertyId, setPropertyId} = usePropertyId({propertyId: ""});
    const handleSubmit = (values: typeof initialValues) => {
        createPropertiesMutation.mutate(
            {
                ...values,
                email: session?.user?.email,
                star: parseInt(values.star, 10),
                city: selectedCity?.name ?? null,
            },
            {
                onSuccess: (data) => {
                    if (data?.id) {
                        setPropertyId({...propertyId, propertyId: data.id});
                    }
                    window.location.href = "/dashboard/rooms/create-property/facilities-list";
                },
                onError: (error) => {
                    console.log("Mutation error:", error);
                },
            }
        );
    };


    if (createPropertiesMutation.isPending) {
        return <div className={"h-screen w-full flex items-center justify-center"}><LoadingStateAnimation/></div>
    }


    return (
        <div className="mt-8 px-80">
            <div className={"flex flex-col items-center justify-center"}>
                <h2 className={"font-semibold text-4xl"}>Create your property</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Fill this form to start your rooms.</p>
            </div>

            <div className={"grid grid-cols-5 gap-2 items-center mb-10"}>
                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit"}>
                        <p className={"border-4 font-semibold border-greenr text-greenr rounded-full w-10 h-10 flex items-center justify-center pr-[1px]"}>1</p>
                        <p className={"font-semibold text-greenr"}>General Details</p>
                    </div>
                </div>

                <div className={"h-[3px] w-full bg-gray-400 rounded-full"}></div>

                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit"}>
                        <p className={"border-4 font-semibold border-gray-400 text-black rounded-full w-10 h-10 flex items-center justify-center"}>2</p>
                        <p className={"font-semibold text-slate-400"}>Facilities List</p>
                    </div>
                </div>

                <div className={"h-[3px] w-full bg-gray-400 rounded-full"}></div>

                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit"}>
                        <p className={"border-4 font-semibold border-gray-400 text-black rounded-full w-10 h-10 flex items-center justify-center"}>3</p>
                        <p className={"font-semibold text-slate-400"}>Add Photos</p>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-4">
                        <div className={"grid grid-cols-2 gap-6"}>
                            {/* Property Name Field */}
                            <div>
                                <label htmlFor="propertyName" className="block text-sm font-semibold text-gray-700">Property
                                    Name</label>
                                <Field name="propertyName" type="text"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                                <ErrorMessage name="propertyName" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>

                            {/* Property Categories Field */}
                            <div>
                                <label htmlFor="propertyCategories"
                                       className="block text-sm font-semibold text-gray-700">Property Categories</label>
                                <Field as="select" name="propertyCategories"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10">
                                    <option value="Hotel">Hotel</option>
                                    <option value="Apartment">Apartment</option>
                                </Field>
                                <ErrorMessage name="propertyCategories" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description"
                                   className="block text-sm font-semibold text-gray-700">Description</label>
                            <Field name="description" as="textarea"
                                   className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className={"grid grid-cols-2 gap-6"}>
                            {/* Check-in Time Field */}
                            <div>
                                <label htmlFor="checkInTime" className="block text-sm font-semibold text-gray-700">Check-in
                                    Time</label>
                                <Field name="checkInTime" type="text"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                                <ErrorMessage name="checkInTime" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            {/* Check-out Time Field */}
                            <div>
                                <label htmlFor="checkOutTime" className="block text-sm font-semibold text-gray-700">Check-out
                                    Time</label>
                                <Field name="checkOutTime" type="text"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                                <ErrorMessage name="checkOutTime" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
                            <LocationPopOverDashboard
                                onCitySelect={setSelectedCity}
                                selectedCity={selectedCity}
                            />
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address"
                                   className="block text-sm font-semibold text-gray-700">Address</label>
                            <Field name="address" type="text"
                                   className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className={"grid grid-cols-2 gap-6"}>
                            {/* Phone Number Field */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone
                                    Number</label>
                                <Field name="phoneNumber" type="text"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            {/* Stars Field */}
                            <div>
                                <label htmlFor="star"
                                       className="block text-sm font-semibold text-gray-700">Stars</label>
                                <Field as="select" name="star"
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10">
                                    <option value="">Select Star</option>
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="5">5 Stars</option>
                                </Field>
                                <ErrorMessage name="star" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        <div className={"w-full flex justify-end mt-8"}>
                            <Buttons disabled={isSubmitting} type="submit" value={"Next"} className={"w-full py-4"}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Page;
