import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useChangePriceForPeakSeason} from '@/hooks/peak-season/useAddPeakSeason';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import useSelectedProperty from "@/hooks/useSelectedProperty";
import NotificationPopUp from "@/components/NotificationPopUp";

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required').min(
        Yup.ref('startDate'),
        'End date must be after start date'
    ),
    markupValue: Yup.number()
        .required('Markup value is required')
        .min(0, 'Markup value must be positive')
        .when('markupType', {
            is: 'PERCENTAGE',
            then: (schema) => schema.max(100, 'Percentage cannot exceed 100%'),
        }),
    markupType: Yup.string()
        .required('Markup type is required')
        .oneOf(['PERCENTAGE', 'NOMINAL'], 'Invalid markup type'),
});

const PeakSeasonPricingForm: React.FC = () => {
    const changePriceForPeakSeason = useChangePriceForPeakSeason();
    const {selectedProperty} = useSelectedProperty()
    const [successPopUp, setSuccessPopUp] = React.useState(false);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            await changePriceForPeakSeason.mutateAsync({
                propertyId: selectedProperty || "1",
                name: values.name,
                startDate: values.startDate,
                endDate: values.endDate,
                markupValue: Number(values.markupValue),
                markupType: values.markupType,
            });
            resetForm();
            setSuccessPopUp(true)
        } catch (error) {
            alert('Failed to update peak season pricing. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <NotificationPopUp title={"Peak season created"} content={"You have successfully created a new peak season"}
                               isOpen={successPopUp} onClose={() => setSuccessPopUp(false)}/>
            <Formik
                initialValues={{
                    name: '',
                    startDate: '',
                    endDate: '',
                    markupValue: '',
                    markupType: 'PERCENTAGE',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, values}) => (
                    <Form className="space-y-4 mt-3">
                        <div className="grid grid-cols-1 gap-6 items-center mb-4">
                            <div>
                                <Label htmlFor="name" className="text-white text-xs md:text-base">Name</Label>
                                <Field name="name" type="text" as={Input}/>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full">
                            <div className="w-full">
                                <Label htmlFor="startDate" className="text-white text-xs md:text-base">Start
                                    Date</Label>
                                <Field name="startDate" type="date" as={Input}/>
                                <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm"/>
                            </div>

                            <div className="w-full">
                                <Label htmlFor="endDate" className="text-white text-xs md:text-base">End Date</Label>
                                <Field name="endDate" type="date" as={Input}/>
                                <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm"/>
                            </div>
                        </div>


                        <div className="flex gap-4">
                            <div className="w-full">
                                <Label htmlFor="markupValue" className="text-white text-xs md:text-base">
                                    Markup Value {values.markupType === 'PERCENTAGE' ? '(%)' : '($)'}
                                </Label>
                                <Field name="markupValue" type="number" as={Input}/>
                                <ErrorMessage name="markupValue" component="div" className="text-red-500 text-sm"/>
                            </div>

                            <div className="w-full">
                                <Label htmlFor="markupType" className="text-white text-xs md:text-base">Markup
                                    Type</Label>
                                <Field
                                    name="markupType"
                                    as="select"
                                    className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="PERCENTAGE">Percentage</option>
                                    <option value="NOMINAL">Nominal</option>
                                </Field>
                                <ErrorMessage name="markupType" component="div" className="text-red-500 text-sm"/>
                            </div>

                        </div>


                        <div className="md:flex h-full justify-end items-end">
                            <Button type="submit" disabled={isSubmitting}
                                    className="bg-white text-greenr font-semibold text-sm md:text-base">
                                {isSubmitting ? 'Creating' : 'Create Peak Season Pricing'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>


    );
};

export default PeakSeasonPricingForm;