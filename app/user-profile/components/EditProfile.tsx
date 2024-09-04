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
import Image from "next/image";
import defaultAvatar from "@/public/user.png";
import {Close} from "@radix-ui/react-dialog";
import {CircleX, X} from "lucide-react";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    mobileNumber: Yup.string().required("Phone number is required"),
    name: Yup.string().required("Name is required"),
});


interface FormValues {
    email: string;
    name: string;
    password: string;
    mobileNumber: string;
}

const initialValues: FormValues = {
    email: "",
    name: "",
    password: "",
    mobileNumber: "",
};

const handleSubmit = () => {
}

const EditProfile: React.FC = ({}) => {
    return (
        <Drawer>
            <DrawerTrigger
                className={"text-greenr font-semibold text-xl hover:text-opacity-40 hover:underline duration-200 "}>
                Edit
            </DrawerTrigger>
            <DrawerContent className={"w-full md:w-1/2"}>
                <div className={"px-16 py-12"}>
                    <DrawerHeader className={"mb-6 flex justify-between" }>
                        <div className={""}>
                            <DrawerTitle className={"text-2xl"}>User Information</DrawerTitle>
                            <DrawerDescription className={""}>Make sure this information matches your travel ID, like your passport or license.
                            </DrawerDescription>
                        </div>

                        <DrawerClose>
                            <Button>
                                <X/>
                            </Button>
                        </DrawerClose>

                    </DrawerHeader>
                    <div className={""}>

                        <div className={"flex gap-4 items-center justify-center mb-6"}>
                            <Image src={defaultAvatar} alt={"profile"} className={"w-[90px] h-fit"}/>
                            <div>
                                <p className={"font-semibold"}> Profile picture </p>
                                <p className={"text-slate-400"}>Click to change your profile picture</p>
                            </div>
                        </div>

                        <Formik initialValues={initialValues} onSubmit={handleSubmit}
                                validationSchema={validationSchema}>
                            <Form>
                                <div className={"flex flex-col gap-1"}>
                                    <label htmlFor="Name" className="font-semibold text-sm">
                                        Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="Name"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-xs text-greenr z-10"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </div>

                                <div className={"flex flex-col gap-1 mt-6"}>
                                    <label htmlFor="Name" className="font-semibold text-sm">
                                        Mobile Number
                                    </label>
                                    <Field
                                        type="text"
                                        name="mobileNumber"
                                        id="Name"
                                        className="border border-greenr rounded-md pl-3 md:h-12 h-8 text-xs text-greenr z-10"
                                    />
                                    <ErrorMessage
                                        name="mobileNumber"
                                        component="div"
                                        className="text-red-600 text-sm mt-1"
                                    />
                                </div>

                            </Form>
                        </Formik>

                    </div>
                    <DrawerFooter className={"px-0"}>
                        <Button >Submit</Button>
                    </DrawerFooter>
                </div>

            </DrawerContent>
        </Drawer>
    );
};

export default EditProfile;