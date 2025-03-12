import cloudinary from "@/lib/cloudinary/config";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

type UploadResponse =
    { success: true; result?: UploadApiResponse } |
    { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
    fileUri: string,
    fileName: string,
    folderName: string
): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(fileUri, {
                public_id: fileName,
                invalidate: true,
                resource_type: "auto",
                filename_override: fileName,
                folder: folderName,
                use_filename: true,
            })
            .then((result) => {
                resolve({ success: true, result });
            })
            .catch((error) => {
                reject({ success: false, error });
            });
    });
};