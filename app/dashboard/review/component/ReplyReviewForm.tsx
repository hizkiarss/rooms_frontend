"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReplyReview } from "@/hooks/Review/useReplyReview";

interface FormValues {
  reply: string;
}

interface ReplyReviewFormProps {
  reviewId: string;
  onSubmitSuccess: () => void;
  propertyId: string;
}

const ReplyReviewForm: React.FC<ReplyReviewFormProps> = ({
  reviewId,
  onSubmitSuccess,
  propertyId,
}) => {
  const replyReview = useReplyReview();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialValues: FormValues = {
    reply: "",
  };

  const validationSchema = Yup.object().shape({
    reply: Yup.string().required("Reply is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await replyReview.mutateAsync({
        reviewId,
        reply: values.reply,
        propertyId,
      });
      setIsSubmitted(true);
      onSubmitSuccess();
    } catch (error) {
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
        touched,
        isSubmitting,
      }: FormikProps<FormValues>) => (
        <Form>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reply">Your Response </Label>
              <Textarea
                id="reply"
                name="reply"
                placeholder="Got something to say? Type away!"
                className="mt-1"
                value={values.reply}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFieldValue("reply", e.target.value)
                }
              />
              {touched.reply && errors.reply && (
                <div className="text-red-500 mt-2">{errors.reply}</div>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReplyReviewForm;
