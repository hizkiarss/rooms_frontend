import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useChangePriceForPeakSeason} from '@/hooks/peak-season/useAddPeakSeason';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import useSelectedProperty from "@/hooks/useSelectedProperty";


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

const PeakSeasonPricingForm: React.FC = () => {
    const changePriceForPeakSeason = useChangePriceForPeakSeason();
    const {selectedProperty} = useSelectedProperty()
    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            await changePriceForPeakSeason.mutateAsync({
                propertyId: selectedProperty || "1",
                name: values.name,
                startDate: values.startDate,
                endDate: values.endDate,
                markUpPercentage: values.markUpPercentage,
            });
            resetForm();
            alert('Peak season pricing updated successfully!');
        } catch (error) {
            alert('Failed to update peak season pricing. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
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
                <Form className="space-y-4 mt-3">
                    <div className="grid grid-cols-1 gap-6 items-center mb-4">
                        <div>
                            <Label htmlFor="name" className="text-white text-xs md:text-base">Name</Label>
                            <Field name="name" type="text" as={Input}/>
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 items-center">

                        <div className="flex gap-2">
                            <div className="">
                                <Label htmlFor="startDate" className="text-white text-xs md:text-base">Start Date</Label>
                                <Field name="startDate" type="date" as={Input}/>
                                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm"/>
                            </div>

                            <div>
                                <Label htmlFor="endDate" className="text-white text-xs md:text-base">End Date</Label>
                                <Field name="endDate" type="date" as={Input}/>
                                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm"/>
                            </div>
                        </div>


                        <div>
                            <Label htmlFor="markUpPercentage" className="text-white text-xs md:text-base">Markup Percentage</Label>
                            <Field name="markUpPercentage" type="number" as={Input}/>
                            <ErrorMessage name="markUpPercentage" component="div" className="text-red-500 text-sm"/>
                        </div>

                        <div className="md:flex h-full justify-end items-end">
                            <Button type="submit" disabled={isSubmitting}
                                    className="bg-white text-greenr font-semibold text-sm md:text-base">
                            {isSubmitting ? 'Updating...' : 'Update Peak Season Pricing'}
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default PeakSeasonPricingForm;