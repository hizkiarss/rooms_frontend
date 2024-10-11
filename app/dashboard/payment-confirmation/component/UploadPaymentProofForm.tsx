"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import { useAddPaymentProof } from "@/hooks/payment-proof/useAddPaymentProof";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileInput, ImageUp } from "lucide-react";

interface FormValues {
  imageUrl: string;
}

interface UploadPaymentProofFormProps {
  transactionId: string;
}

const UploadPaymentProofForm: React.FC<UploadPaymentProofFormProps> = ({
  transactionId,
}) => {
  const {
    uploadImage,
    isLoading: isUploading,
    error: uploadError,
  } = useCloudinaryUpload();

  const addPaymentProofMutation = useAddPaymentProof();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues: FormValues = {
    imageUrl: "",
  };

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required("Image is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await addPaymentProofMutation.mutateAsync({
        transactionId,
        imgUrl: values.imageUrl,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({
        setFieldValue,
        values,
        errors,
        isSubmitting,
      }: FormikProps<FormValues>) => (
        <Form>
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="mt-6">
                  Almost there! Upload your payment proof to finish. Only PNG
                  and JPG files under 1MB are allowed. Heads up! You can only
                  upload once, so make sure it&apos;s the right one. Thanks for being
                  awesome!
                </div>
                <div>
                  <Label htmlFor="image" className="sr-only">
                    Upload Image
                  </Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-greenr transition"
                    onClick={() =>
                      document.getElementById("image-input")?.click()
                    }>
                    {values.imageUrl ? (
                      <img
                        src={values.imageUrl}
                        alt="Uploaded"
                        className="mx-auto max-h-52 object-cover"
                      />
                    ) : (
                      <>
                        <div className="text-greenr mx-auto mb-2">
                          <ImageUp className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-greenr font-semibold">
                          Upload Files
                        </p>
                        <p className="text-gray-500">
                          PNG and JPG files are allowed
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    id="image-input"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    // onChange={async (event) => {
                    //     const file = event.currentTarget.files?.[0];
                    //     if (file) {
                    //         try {
                    //             const imageUrl = await uploadImage(file);
                    //             setFieldValue("imageUrl", imageUrl);
                    //         } catch (err) {
                    //             console.error("Upload failed:", err);
                    //         }
                    //     }
                    // }}
                    onChange={async (event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        const MAX_FILE_SIZE = 1 * 1024 * 1024;
                        if (file.size > MAX_FILE_SIZE) {
                          alert(
                            "Hold up! Your file's too chunky for this upload. Let's keep it light under 1MB."
                          );
                          return;
                        }

                        try {
                          const imageUrl = await uploadImage(file);
                          setFieldValue("imageUrl", imageUrl);
                        } catch (err) {
                          console.error("Upload failed:", err);
                        }
                      }
                    }}
                  />

                  {isUploading && (
                    <p className="text-gray-500 mt-2">Uploading...</p>
                  )}

                  {errors.imageUrl && (
                    <div className="text-red-500 mt-2">{errors.imageUrl}</div>
                  )}
                </div>

                {isSubmitted ? (
                  <p className="text-green-500">
                    Photo uploaded! You&apos;re good to go!
                  </p>
                ) : (
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || isUploading}>
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default UploadPaymentProofForm;
