import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary/uploadHelper';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const file_name = formData.get('fileName') as string | "";
        const folder = formData.get('folderName') as string | "";

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`;
        const fileName = `${file_name}`;
        const folderName = `${folder}`;

        const uploadResult = await uploadToCloudinary(fileUri, fileName, folderName);

        if (uploadResult.success && uploadResult.result) {
            return NextResponse.json({
                message: 'Upload successful',
                imageUrl: uploadResult.result.secure_url
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}