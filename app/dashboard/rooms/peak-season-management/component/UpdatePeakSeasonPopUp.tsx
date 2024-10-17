import React, {useEffect} from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import Buttons from "@/components/Buttons";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import {useUpdatePeakSeason} from "@/hooks/peak-season/useUpdatePeakSeason";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {isError} from "node:util";
import {useToast} from "@/hooks/use-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    peakSeasonId: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required').min(
        Yup.ref('startDate'),
        'End date must be after start date'
    ),
    markUpValue: Yup.number()
        .required('Markup value is required')
        .min(0, 'Markup value must be positive')
        .when('markUpType', {
            is: 'PERCENTAGE',
            then: (schema) => schema.max(100, 'Percentage cannot exceed 100%'),
        }),
    markUpType: Yup.string()
        .required('Markup type is required')
        .oneOf(['PERCENTAGE', 'NOMINAL'], 'Invalid markup type'),
});

const UpdatePeakSeasonPopUp: React.FC<Props> = ({isOpen, onClose, peakSeasonId}) => {
    const updatePeakSeason = useUpdatePeakSeason();
    const {toast} = useToast()

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            await updatePeakSeason.mutateAsync({
                peakSeasonId: peakSeasonId,
                name: values.name,
                startDate: values.startDate,
                endDate: values.endDate,
                markupValue: parseFloat(values.markUpValue),
                markupType: values.markUpType,
            });
            resetForm();
            toast({
                title: "Success",
                description: `Peak season pricing updated successfully.`,
                className: "text-greenr border-2 border-greenr",
            });
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (updatePeakSeason.isError){
            console.log(error)
        }
    }, [updatePeakSeason.isError]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div>
                        <h2 className={"font-semibold text-2xl"}>
                            Update your peak season
                        </h2>

                        <p className={"text-gray-400 text-sm mt-1"}>
                            Adjust Your Peak Season Pricing for Maximum Bookings
                        </p>
                    </div>

                    <Formik
                        initialValues={{
                            name: '',
                            startDate: '',
                            endDate: '',
                            markUpValue: '',
                            markUpType: 'PERCENTAGE',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting, values}) => (
                            <Form className="space-y-4">
                                <div className="col-span-4">
                                    <Label htmlFor="name" className="">Name</Label>
                                    <Field name="name" type="text" as={Input}/>
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                                </div>

                                <div className="">
                                    <Label htmlFor="startDate" className="">Start Date</Label>
                                    <Field name="startDate" type="date" as={Input}/>
                                    <ErrorMessage name="startDate" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                                <div>
                                    <Label htmlFor="endDate" className="">End Date</Label>
                                    <Field name="endDate" type="date" as={Input}/>
                                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm"/>
                                </div>

                                <div>
                                    <Label htmlFor="markUpValue" className="">
                                        Markup Value {values.markUpType === 'PERCENTAGE' ? '(%)' : '($)'}
                                    </Label>
                                    <Field name="markUpValue" type="number" as={Input}/>
                                    <ErrorMessage name="markUpValue" component="div"
                                                  className="text-red-500 text-sm"/>
                                </div>

                                <div>
                                    <Label htmlFor="markUpType" className="">Markup Type</Label>
                                    <Field
                                        name="markUpType"
                                        as="select"
                                        className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        <option value="PERCENTAGE">Percentage</option>
                                        <option value="NOMINAL">Nominal</option>
                                    </Field>
                                    <ErrorMessage name="markUpType" component="div" className="text-red-500 text-sm"/>
                                </div>

                                <div className="flex justify-end items-end gap-2">
                                    <Button type="submit" disabled={isSubmitting}
                                            className="font-semibold">
                                        {isSubmitting ? 'Updating...' : 'Update Peak Season Pricing'}
                                    </Button>
                                    <AlertDialogFooter>
                                        <Buttons value="Close" onClick={onClose} className="rounded-md text-lg"/>
                                    </AlertDialogFooter>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UpdatePeakSeasonPopUp;