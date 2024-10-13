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
import useSelectedProperty from "@/hooks/useSelectedProperty";
import {useGetPropertyById} from "@/hooks/properties/useGetPropertyById";
import NotificationPopUp from "@/components/NotificationPopUp";

const GeneralDetails = () => {
    const {selectedProperty} = useSelectedProperty();
    const {data, error, isLoading} = useGetPropertyById(selectedProperty || "");
    const propertyDetailData = data as PropertyDetailType;
    const [successPopup, setSuccessPopup] = useState<boolean>(false);
    if (error) {
        console.log(error)
    }
    console.log(propertyDetailData);
    const currentProperty = (data as PropertyDetailType) || {
        name: '',
        propertyCategories: {name: ''},
        description: '',
        checkInTime: '',
        checkOutTime: '',
        address: '',
        city: '',
        phoneNumber: '',
        star: 0,
    };

    const initialValues = {
        propertyName: "",
        propertyCategories: "",
        description: "",
        checkInTime: "",
        checkOutTime: "",
        address: "",
        city: "",
        phoneNumber: "",
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

    const updatePropertiesMutation = useUpdateProperties(selectedProperty || "1");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const handleSubmit = (values: typeof initialValues) => {
        updatePropertiesMutation.mutate(
            {
                ...values,
                star: Number(values.star),
                city: selectedCity?.name ?? "",
            },
            {
                onSuccess: (data) => {
                    setSuccessPopup(true)
                },
                onError: (error) => {
                    console.log("Mutation error:", error);
                },
            }
        );
    };


    if (isLoading) {
        return <div><LoadingStateAnimation/></div>
    }


    return (
        <div className="">
            <NotificationPopUp title={"Property Updated"} content={"You have successfully updated this property"}
                               isOpen={successPopup} onClose={() => setSuccessPopup(false)}/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-3 md:space-y-4 text-sm md:text-base">

                    <div className="flex flex-col gap-3 md:grid grid-cols-2 md:gap-6">
                        <div>
                            <label htmlFor="propertyName"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">
                                Property Name
                            </label>
                            <Field
                                name="propertyName"
                                type="text"
                                placeholder={currentProperty.name}
                                className=" mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            />
                            <ErrorMessage name="propertyName" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>

                        <div>
                            <label htmlFor="propertyCategories"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">
                                Property Categories
                            </label>
                            <Field
                                as="select"
                                name="propertyCategories"
                                placeholder={currentProperty.propertyCategories} // Placeholder for property categories
                                className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            >
                                <option value="Hotel">Hotel</option>
                                <option value="Apartment">Apartment</option>
                            </Field>
                            <ErrorMessage name="propertyCategories" component="div"
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
                            placeholder={currentProperty.description}
                            className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                        />
                        <ErrorMessage name="description" component="div"
                                      className="text-red-500 text-xs md:text-sm mt-1"/>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="checkInTime"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">
                                Check-in Time
                            </label>
                            <Field
                                name="checkInTime"
                                type="text"
                                placeholder={currentProperty.checkInTime} // Placeholder for check-in time
                                className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            />
                            <ErrorMessage name="checkInTime" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>

                        <div>
                            <label htmlFor="checkOutTime"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">
                                Check-out Time
                            </label>
                            <Field
                                name="checkOutTime"
                                type="text"
                                placeholder={currentProperty.checkOutTime} // Placeholder for check-out time
                                className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                            />
                            <ErrorMessage name="checkOutTime" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-xs md:text-sm font-semibold text-gray-700">
                            Address
                        </label>
                        <Field
                            name="address"
                            type="text"
                            placeholder={currentProperty.address}
                            className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"
                        />
                        <ErrorMessage name="address" component="div"
                                      className="text-red-500 text-xs md:text-sm mt-1"/>
                    </div>

                    <div>
                        <label htmlFor="city"
                               className="block text-xs md:text-sm font-semibold text-gray-700">City</label>
                        <LocationPopOverDashboard
                            onCitySelect={setSelectedCity}
                            selectedCity={selectedCity}
                            initialValue={initialValues.city}
                        />
                    </div>

                    <div className={"grid grid-cols-2 gap-6"}>
                        <div>
                            <label htmlFor="phoneNumber"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">Phone
                                Number</label>
                            <Field name="phoneNumber" type="text"
                                   placeholder={currentProperty.phoneNumber}
                                   className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10"/>
                            <ErrorMessage name="phoneNumber" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>


                        <div>
                            <label htmlFor="star"
                                   className="block text-xs md:text-sm font-semibold text-gray-700">Stars</label>
                            <Field as="select" name="star"
                                   placeholder={currentProperty.star}
                                   className="mt-1 block w-full px-2 md:px-4 py-2 md:py-3 rounded-md shadow-sm bg-white border border-slate-300 focus:border-greenr focus:bg-opacity-10">
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </Field>
                            <ErrorMessage name="star" component="div"
                                          className="text-red-500 text-xs md:text-sm mt-1"/>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Buttons value="Submit" type="submit" className="text-base md:text-xl px-5"/>
                    </div>
                </Form>
            </Formik>

        </div>
    )
        ;
};

export default GeneralDetails;
