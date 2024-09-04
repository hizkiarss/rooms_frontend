"use client";
import { useState, useCallback } from "react";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env
  .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

const useCloudinaryUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error("Unexpected response from Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = `Cloudinary upload failed: ${error.message}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { uploadImage, isLoading, error };
};

export default useCloudinaryUpload;
