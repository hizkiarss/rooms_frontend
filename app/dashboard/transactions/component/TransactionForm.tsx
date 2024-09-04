"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";

const TransactionSchema = Yup.object().shape({
  usersId: Yup.string().required("User ID is required"),
  propertiesId: Yup.string().required("Property ID is required"),
  finalPrice: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  status: Yup.string().required("Status is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
});

function TransactionForm() {
  const createTransaction = useCreateTransaction();

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Transaction
      </h2>
      <Formik
        initialValues={{
          usersId: "",
          propertiesId: "",
          finalPrice: "",
          status: "",
          paymentMethod: "",
          firstName: "",
          lastName: "",
          mobileNumber: "",
        }}
        validationSchema={TransactionSchema}
        onSubmit={(values, { setSubmitting }) => {
          createTransaction.mutate(
            {
              ...values
              finalPrice: parseFloat(values.finalPrice),
            },
            {
              onSuccess: () => {
                alert("Transaction created successfully!");
                setSubmitting(false);
              },
              onError: (error) => {
                alert(`Error: ${error.message}`);
                setSubmitting(false);
              },
            }
          );
        }}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="usersId"
                type="text"
                placeholder="User ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="usersId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="propertiesId"
                type="text"
                placeholder="Property ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="propertiesId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="finalPrice"
                type="number"
                placeholder="Final Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="finalPrice"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="status"
                as="select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="paymentMethod"
                type="text"
                placeholder="Payment Method"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="paymentMethod"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="mobileNumber"
                type="text"
                placeholder="Mobile Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="mobileNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
              {isSubmitting ? "Submitting..." : "Create Transaction"}
            </button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
}

export default TransactionForm;
