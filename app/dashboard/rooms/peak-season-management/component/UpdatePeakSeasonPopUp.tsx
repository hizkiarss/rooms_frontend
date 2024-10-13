import React from 'react';
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

interface Props {
    isOpen: boolean;
    onClose: () => void;
    peakSeasonId: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required').min(
        Yup.ref('startDate'),
        'End date must be after start date'
    ),
    markUpPercentage: Yup.number()
        .required('Markup percentage is required')
        .min(0, 'Markup percentage must be positive')
        .max(100, 'Markup percentage cannot exceed 100%'),
});

const UpdatePeakSeasonPopUp: React.FC<Props> = ({isOpen, onClose, peakSeasonId}) => {
    const updatePeakSeason = useUpdatePeakSeason();

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            await updatePeakSeason.mutateAsync({
                peakSeasonId: peakSeasonId,
                name: values.name,
                startDate: values.startDate,
                endDate: values.endDate,
                markUpPercentage: parseFloat(values.markUpPercentage),
            });
            resetForm();
            alert('Peak season pricing updated successfully!');
            onClose();
        } catch (error) {
            alert('Failed to update peak season pricing. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

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
                            markUpPercentage: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
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
                                    <Label htmlFor="markUpPercentage" className="">Markup
                                        Percentage</Label>
                                    <Field name="markUpPercentage" type="number" as={Input}/>
                                    <ErrorMessage name="markUpPercentage" component="div"
                                                  className="text-red-500 text-sm"/>
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