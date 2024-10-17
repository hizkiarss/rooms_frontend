"use client";

import React, { useEffect, useState } from "react";
import { ImageUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import defaultAvatar from "@/public/user.png";
import { Form, Formik, FormikProps } from "formik";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import * as Yup from "yup";
import { useUploadAvatar } from "@/hooks/user/useUploadAvatar";
import { useFindUserbyEmail } from "@/hooks/user/useFindUserbyEmail";
import { useSession } from "next-auth/react";
import SubmitSuccessAnimation from "@/components/animations/SubmitSuccessAnimation";

interface FormValues {
  imageUrl: string;
}

const ChangeAvatar = () => {
  const { data: session } = useSession();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userEmail: string = session?.user.email;
  console.log("ini emailnya", userEmail);
  const initialValues: FormValues = {
    imageUrl: "",
  };
  const {
    uploadImage,
    isLoading: isUploading,
    error: uploadError,
  } = useCloudinaryUpload();

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required("Image is required"),
  });

  const uploadAvatarMutation = useUploadAvatar();

  const handleSubmit = async (values: FormValues) => {
    try {
      await uploadAvatarMutation.mutateAsync({
        email: userEmail || "",
        imgUrl: values.imageUrl,
      });
      setIsSubmitted(true);
      setShowAnimation(true);
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  const handleDialogClose = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  useEffect(() => {
    if (!isDialogOpen && isSubmitted) {
      window.location.reload();
    }
  }, [isDialogOpen, isSubmitted]);

  const { data: user, isLoading, error } = useFindUserbyEmail(userEmail || "");

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <div
          className={"flex gap-4 items-center mb-10"}
          onClick={() => setIsDialogOpen(true)}>
          <Image
            src={user?.profilePicture || defaultAvatar}
            alt="User Avatar"
            width={48}
            height={48}
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full object-cover object-center"
          />{" "}
          <div>
            <p className={"font-semibold"}> Profile picture </p>
            <p className={"text-slate-400"}>
              Click to change your profile picture
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={"text-2xl"}>Insert a picture</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({
            setFieldValue,
            values,
            errors,
            isSubmitting,
          }: FormikProps<FormValues>) => (
            <Form>
              <div className="flex justify-center items-center">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-greenr transition"
                  onClick={() =>
                    document.getElementById("image-input")?.click()
                  }>
                  {values.imageUrl ? (
                    <img
                      src={values.imageUrl}
                      alt="Uploaded"
                      className="mx-auto max-h-28 md:max-h-52 object-cover"
                    />
                  ) : (
                    <>
                      <div className="text-greenr mx-auto mb-2">
                        <ImageUp className="w-6 h-6 md:w-12 md:h-12 mx-auto" />
                      </div>
                      <p className="text-greenr font-semibold">Upload Files</p>
                      <p className="text-gray-500">
                        PNG and JPG files are allowed
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <input
                    id="image-input"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
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
                </div>
              </div>
              <div className={"flex justify-end mt-5"}>
                {isSubmitted ? (
                  <>
                    {showAnimation && (
                      <SubmitSuccessAnimation
                        message="Photo uploaded! You're good to go!"
                        onClose={() => setShowAnimation(false)}
                      />
                    )}
                  </>
                ) : (
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3 font-semibold">
                    Change Avatar
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAvatar;
