"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";

interface FormValues {
  name: string;
  imageUrl: string;
  // ... tambahkan field lain sesuai kebutuhan
}

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  imageUrl: Yup.string().required("Image is required"),
  // ... tambahkan validasi lain sesuai kebutuhan
});

const MyForm: React.FC = () => {
  const { uploadImage, isLoading, error } = useCloudinaryUpload();

  const initialValues: FormValues = {
    name: "",
    imageUrl: "",
    // ... inisialisasi field lain
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    console.log(values);
    // Kirim data ke backend
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={async (event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  try {
                    const imageUrl = await uploadImage(file);
                    setFieldValue("imageUrl", imageUrl);
                  } catch (err) {
                    console.error("Upload failed:", err);
                  }
                }
              }}
            />
            {isLoading && <p>Uploading...</p>}
            {error && <p>Error: {error}</p>}
            {values.imageUrl && (
              <img
                src={values.imageUrl}
                alt="Uploaded"
                style={{ maxWidth: "200px" }}
              />
            )}
            <ErrorMessage name="imageUrl" component="div" />
          </div>

          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
