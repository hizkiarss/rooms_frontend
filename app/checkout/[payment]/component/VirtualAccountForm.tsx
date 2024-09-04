"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateVirtualAccountCode } from "@/hooks/payment/useCreateVIrtualAccountCode";

const validationSchema = Yup.object({
  bookingCode: Yup.string().required("Booking code is required"),
  bank: Yup.string().required("Bank is required"),
});

const VirtualAccountForm: React.FC = () => {
  const createVirtualAccountCode = useCreateVirtualAccountCode();

  const formik = useFormik({
    initialValues: {
      bookingCode: "",
      bank: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      createVirtualAccountCode.mutate(
        {
          bookingCode: values.bookingCode,
          bank: values.bank,
        },
        {
          onSuccess: (data) => {
            console.log("Virtual Account Code created:", data);
            alert("Virtual Account Code created successfully!");
            setSubmitting(false);
          },
          onError: (error) => {
            console.error("Error creating Virtual Account Code:", error);
            alert(`Error: ${error.message}`);
            setSubmitting(false);
          },
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="bookingCode">Booking Code</label>
        <input
          id="bookingCode"
          name="bookingCode"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bookingCode}
        />
        {formik.touched.bookingCode && formik.errors.bookingCode ? (
          <div>{formik.errors.bookingCode}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="bank">Bank</label>
        <select
          id="bank"
          name="bank"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bank}>
          <option value="">Select a bank</option>
          <option value="bca">BCA</option>
          <option value="bni">BNI</option>
          <option value="mandiri">Mandiri</option>
        </select>
        {formik.touched.bank && formik.errors.bank ? (
          <div>{formik.errors.bank}</div>
        ) : null}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        Create Virtual Account Code
      </button>
    </form>
  );
};

export default VirtualAccountForm;
