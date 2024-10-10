"use client";

import React, {useState} from 'react';
import {ImageUp, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Form, Formik, FormikProps} from "formik";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import * as Yup from "yup";
import {useAddPropertyPictures} from "@/hooks/properties/useAddPropertyPictures";
import Top from "@/app/dashboard/rooms/create-property/add-photo/component/top";
import Buttons from "@/components/Buttons";
import usePropertyId from "@/hooks/usePropertyId";

interface FormValues {
    imageUrls: string[];
}

const UpdatePropertyAddPhotoPopUp: React.FC = () => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const initialValues: FormValues = {
        imageUrls: [],
    };
    const {uploadImage, isLoading: isUploading, error: uploadError} = useCloudinaryUpload();
    const validationSchema = Yup.object().shape({
        imageUrls: Yup.array().of(Yup.string()).min(1, "At least one image is required"),
    });

    const uploadPropertyPhotosMutation = useAddPropertyPictures();

    const {propertyId} = usePropertyId({propertyId: "9"})


    const handleSubmit = async (values: FormValues): Promise<void> => {
        try {
            await uploadPropertyPhotosMutation.mutateAsync({
                propertyId: propertyId.propertyId,
                imgUrl: values.imageUrls
            });
        } catch (error) {
            console.error("Failed to upload property photos:", error);
        }
    };

    const handleImageUpload = async (file: File, setFieldValue: (field: string, value: any) => void, values: FormValues): Promise<void> => {
        try {
            const imageUrl = await uploadImage(file);
            setFieldValue("imageUrls", [...values.imageUrls, imageUrl]);
            setPreviewImages([...previewImages, URL.createObjectURL(file)]);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const removeImage = (index: number, setFieldValue: (field: string, value: any) => void, values: FormValues): void => {
        const newImageUrls = values.imageUrls.filter((_, i) => i !== index);
        const newPreviewImages = previewImages.filter((_, i) => i !== index);
        setFieldValue("imageUrls", newImageUrls);
        setPreviewImages(newPreviewImages);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            // Reset the mutation state when the dialog is closed
            uploadPropertyPhotosMutation.reset();
        }
    };


    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                    <Buttons value={"Upload Property Photos"} className={"text-xl"}/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className={"flex items-center"}>
                        <DialogTitle className="text-2xl">Upload Property Photos</DialogTitle>
                        <DialogDescription>
                            Upload multiple photos for your property listing.
                        </DialogDescription>
                    </DialogHeader>

                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({
                              setFieldValue,
                              values,
                              errors,
                              isSubmitting,
                          }: FormikProps<FormValues>) => (
                            <Form>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {previewImages.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index, setFieldValue, values)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <X size={16}/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition"
                                    onClick={() => document.getElementById("image-input")?.click()}
                                >
                                    <div className="text-green-500 mx-auto mb-2">
                                        <ImageUp className="w-12 h-12 mx-auto"/>
                                    </div>
                                    <p className="text-green-500 font-semibold">
                                        Upload Files
                                    </p>
                                    <p className="text-gray-500">
                                        PNG and JPG files are allowed
                                    </p>
                                </div>
                                <input
                                    id="image-input"
                                    name="image"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="hidden"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const file = event.currentTarget.files?.[0];
                                        if (file) {
                                            handleImageUpload(file, setFieldValue, values);
                                        }
                                    }}
                                    multiple
                                />
                                {errors.imageUrls && <div className="text-red-500 mt-2">{errors.imageUrls}</div>}
                                <div className="flex justify-end gap-4 mt-4 items-center">
                                    {uploadPropertyPhotosMutation.isSuccess ?
                                        <p className={"text-greenr"}>Upload Success!</p> : null}
                                    <Button type="submit" size="sm" className="px-3 font-semibold"
                                            disabled={isSubmitting}>
                                        {isSubmitting ? 'Uploading...' : 'Upload Photos'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdatePropertyAddPhotoPopUp;