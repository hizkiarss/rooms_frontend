"use client";
import React, {useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useCreateProperties} from "@/hooks/properties/useCreateProperty";
import Buttons from "@/components/Buttons";
import {LocationPopOverDashboard} from "@/app/dashboard/component/LocationPopOverDashboard";
import {City} from "@/types/city/City";
import usePropertyId from "@/hooks/usePropertyId";
import {useGetPropertyBySlug} from "@/hooks/properties/useGetPropertyBySlug";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import {useUpdateProperties} from "@/hooks/properties/useUpdateProperties";

const GeneralDetails = () => {

    const{data, isLoading} =useGetPropertyBySlug("Horison-Bekasi-MDzj")

    console.log(data?.star)

    const currentProperty = (data as PropertyDetailType) || {
        name: '',
        propertyCategories: { name: '' },
        description: '',
        checkInTime: '',
        checkOutTime: '',
        address: '',
        city: '',
        phoneNumber: '',
        star: 0,
    };

    const initialValues = {
        propertyName: currentProperty.name,
        propertyCategories: currentProperty.propertyCategories.name,
        description: currentProperty.description,
        checkInTime: currentProperty.checkInTime,
        checkOutTime: currentProperty.checkOutTime,
        address: currentProperty.address,
        city: currentProperty.city.name,
        phoneNumber: currentProperty.phoneNumber,
        star: currentProperty.star,
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

    const updatePropertiesMutation = useUpdateProperties("47");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const handleSubmit = (values: typeof initialValues) => {
        updatePropertiesMutation.mutate(
            {
                ...values,
                star: values.star,
                city: selectedCity?.name ?? "",
            },
            {
                onSuccess: (data) => {
                    window.location.href = "/dashboard/rooms/create-property/facilities-list"

                },
                onError: (error) => {
                    console.log("Mutation error:", error);
                },
            }
        );
    };


    if(isLoading){
        return <div><LoadingStateAnimation/></div>
    }


    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        {/* Email Field */}

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="propertyName" className="block text-sm font-semibold text-gray-700">
                                    Property Name
                                </label>
                                <Field
                                    name="propertyName"
                                    type="text"
                                    placeholder={currentProperty.name}// Placeholder for property name
                                    className=" mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                />
                                <ErrorMessage name="propertyName" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>

                            {/* Property Categories Field */}
                            <div>
                                <label htmlFor="propertyCategories"
                                       className="block text-sm font-semibold text-gray-700">
                                    Property Categories
                                </label>
                                <Field
                                    as="select"
                                    name="propertyCategories"
                                    placeholder={initialValues.propertyCategories} // Placeholder for property categories
                                    className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                >
                                    <option value="Hotel">Hotel</option>
                                    <option value="Apartment">Apartment</option>
                                </Field>
                                <ErrorMessage name="propertyCategories" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <Field
                                name="description"
                                as="textarea"
                                placeholder={initialValues.description} // Placeholder for description
                                className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Check-in Time Field */}
                            <div>
                                <label htmlFor="checkInTime" className="block text-sm font-semibold text-gray-700">
                                    Check-in Time
                                </label>
                                <Field
                                    name="checkInTime"
                                    type="text"
                                    placeholder={initialValues.checkInTime} // Placeholder for check-in time
                                    className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                />
                                <ErrorMessage name="checkInTime" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>

                            {/* Check-out Time Field */}
                            <div>
                                <label htmlFor="checkOutTime" className="block text-sm font-semibold text-gray-700">
                                    Check-out Time
                                </label>
                                <Field
                                    name="checkOutTime"
                                    type="text"
                                    placeholder={initialValues.checkOutTime} // Placeholder for check-out time
                                    className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                                />
                                <ErrorMessage name="checkOutTime" component="div"
                                              className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                                Address
                            </label>
                            <Field
                                name="address"
                                type="text"
                                placeholder={initialValues.address} // Placeholder for address
                                className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1"/>
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
                            <LocationPopOverDashboard
                                onCitySelect={setSelectedCity}
                                selectedCity={selectedCity}
                                initialValue={initialValues.city}
                            />
                        </div>

                        <div className={"grid grid-cols-2 gap-6"}>
                            {/* Phone Number Field */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone
                                    Number</label>
                                <Field name="phoneNumber" type="text"
                                       placeholder={initialValues.phoneNumber} // Placeholder for address
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>


                            {/* Stars Field */}
                            <div>
                                <label htmlFor="star"
                                       className="block text-sm font-semibold text-gray-700">Stars</label>
                                <Field as="select" name="star"
                                       placeholder={initialValues.star}
                                       className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10">
                                    {/*<option value="">Select Rating</option>*/}
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="5">5 Stars</option>
                                </Field>
                                <ErrorMessage name="star" component="div" className="text-red-500 text-sm mt-1"/>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Buttons value="Submit" type="submit" className="text-xl px-5"/>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default GeneralDetails;
