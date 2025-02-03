import { CldUploadWidget } from 'next-cloudinary';
export default function WidgetCloudinary({ fileName, folderName, children }: { fileName: string, folderName: string, children: React.ReactNode }) {
    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            options={
                {
                    fieldName: fileName,
                    publicId: fileName,
                    folder: folderName
                }
            }
        >

            {({ open }) => {
                return (
                    <button onClick={() => open()}>
                        {children}
                    </button>
                );
            }}
        </CldUploadWidget>
    )
}