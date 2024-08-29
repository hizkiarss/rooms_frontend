import axios from "axios";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env
  .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  console.log("Uploading to Cloudinary...");
  console.log("Cloud name:", CLOUDINARY_CLOUD_NAME);
  console.log("Upload preset:", CLOUDINARY_UPLOAD_PRESET);

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

    console.log("Cloudinary response:", response.data);
    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error("Unexpected response from Cloudinary");
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
    throw error;
  }
}

export { uploadImageToCloudinary };
