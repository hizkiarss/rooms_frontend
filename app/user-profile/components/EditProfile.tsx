import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button"
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {X} from "lucide-react";
import ChangeAvatar from "@/app/user-profile/components/ChangeAvatar";
import {useUploadUserInformation} from "@/hooks/user/useUploaduserInformation";
import {Gender} from "@/types/gender/Gender";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobileNumber: Yup.string().required("Phone number is required"),
    gender: Yup.string().oneOf(Object.values(Gender), "Invalid gender").required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of birth is required").max(new Date(), "Date of birth cannot be in the future"),
});

interface FormValues {
    name: string;
    mobileNumber: string;
    gender: Gender;
    dateOfBirth: Date;
}

const initialValues: FormValues = {
    name: "",
    mobileNumber: "",
    gender: Gender.OTHER,
    dateOfBirth: new Date(),
};

const email: String = "qakaben@gmail.com";


const EditProfile: React.FC = () => {
    const {mutate: updateUserInfo, isPending, isError, error} = useUploadUserInformation();

    const handleSubmit = (values: FormValues) => {
        updateUserInfo({input: values, email: email});
    };

    return (
        <Drawer>
            <DrawerTrigger
                className="text-greenr font-semibold text-xl hover:text-opacity-40 hover:underline duration-200">
                Edit
            </DrawerTrigger>
            <DrawerContent className="w-full md:w-1/2">
                <div className="px-16 py-12">
                    <DrawerHeader className="mb-6 flex justify-between">
                        <div>
                            <DrawerTitle className="text-2xl">User Information</DrawerTitle>
                            <DrawerDescription>
                                Make sure this information matches your travel ID, like your passport or license.
                            </DrawerDescription>
                        </div>
                        <DrawerClose>
                            <Button>
                                <X/>
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}
                                validationSchema={validationSchema}>
                            <Form>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="font-semibold text-sm">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-sm text-greenr z-10"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1"/>
                                </div>

                                <div className="flex flex-col gap-1 mt-6">
                                    <label htmlFor="mobileNumber" className="font-semibold text-sm">Mobile
                                        Number</label>
                                    <Field
                                        type="text"
                                        name="mobileNumber"
                                        id="mobileNumber"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-sm text-greenr z-10"
                                    />
                                    <ErrorMessage name="mobileNumber" component="div"
                                                  className="text-red-600 text-sm mt-1"/>
                                </div>

                                <div className="flex flex-col gap-1 mt-6">
                                    <label htmlFor="gender" className="font-semibold text-sm">Gender</label>
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-sm text-greenr z-10"
                                    >
                                        <option value={Gender.MALE}>Male</option>
                                        <option value={Gender.FEMALE}>Female</option>
                                        <option value={Gender.OTHER}>Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-red-600 text-sm mt-1"/>
                                </div>

                                <div className="flex flex-col gap-1 mt-6">
                                    <label htmlFor="dateOfBirth" className="font-semibold text-sm">Date of Birth</label>
                                    <Field
                                        type="date"
                                        name="dateOfBirth"
                                        id="dateOfBirth"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-sm text-greenr z-10"
                                    />
                                    <ErrorMessage name="dateOfBirth" component="div"
                                                  className="text-red-600 text-sm mt-1"/>
                                </div>

                                {isError && (
                                    <div className="text-red-600 text-sm mt-4">
                                        An error occurred: {error?.message}
                                    </div>
                                )}

                                <DrawerFooter className="px-0 mt-6">
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? 'Updating...' : 'Submit'}
                                    </Button>
                                </DrawerFooter>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};




export default EditProfile;