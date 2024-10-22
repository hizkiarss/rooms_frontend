"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Frown, Smile } from "lucide-react";
import { useCreateReview } from "@/hooks/Review/useCreateReview";

import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ReviewRequest } from "@/types/review/ReviewInputType";

type FormValues = ReviewRequest;

interface UserReviewFormProps {
  bookingCode: string;
  propertyId: string;
  userId: string;
  onSubmitSuccess: () => void;
}

const UserReviewForm: React.FC<UserReviewFormProps> = ({
  bookingCode,
  propertyId,
  userId,
  onSubmitSuccess,
}) => {
  const createReviewMutation = useCreateReview();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const initialValues: FormValues = {
    bookingCode,
    propertyId,
    userId,
    feedback: "",
    rating: 5,
  };

  const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    bookingCode: Yup.string().required("Booking code is required"),
    propertyId: Yup.string().required("Property ID is required"),
    userId: Yup.string().required("User ID is required"),
    feedback: Yup.string().required("Feedback is required"),
    rating: Yup.number().min(1).max(10).required("Rating is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      await createReviewMutation.mutateAsync(values);
      setIsSubmitted(true);
      onSubmitSuccess();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
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
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="mt-6">
                  How was your stay? We hope your stay was as relaxing as you
                  hoped! Now let the world know! Drop your review and give us
                  some star love!
                </div>
                <div>
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Share your experience..."
                    className="mt-1"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFieldValue("feedback", e.target.value)
                    }
                  />
                  {touched.feedback && errors.feedback && (
                    <div className="text-red-500 mt-2">{errors.feedback}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="rating">Your Rating (1-10)</Label>
                  <div className="flex items-center gap-2">
                    <Frown />
                    <Slider
                      id="rating"
                      name="rating"
                      min={1}
                      max={10}
                      step={1}
                      value={[values.rating]}
                      onValueChange={(value: number[]) =>
                        setFieldValue("rating", value[0])
                      }
                      className="mt-2"
                    />
                    <Smile />
                  </div>

                  <div className="text-center mt-2">{values.rating} / 10</div>
                  {touched.rating && errors.rating && (
                    <div className="text-red-500 mt-2">{errors.rating}</div>
                  )}
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default UserReviewForm;
