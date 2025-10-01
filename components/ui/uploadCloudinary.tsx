'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { CircleCheckBig, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './button';

interface FileUploadProps {
    file_name: string;
    tahun: string;
    kode_dokumen: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ file_name, tahun, kode_dokumen }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setSuccess] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    // cek_pdf(file_name, tahun, kode_dokumen);

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file_name);
        formData.append('tahun', tahun);
        formData.append('kode_dokumen', kode_dokumen)
        try {
            const response = await fetch('https://go.heryheryanto.my.id/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();



            if (response.ok) {
                toast({
                    title: "Upload Success",
                    description: "File berhasil diupload",
                })
                setFile(null);
                setSuccess(true);
                setFile(null);
            } else {
                toast({
                    variant: "destructive",
                    title: "Upload Failed",
                    description: data.message,
                })
                setError(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (

        <Dialog>
            <DialogTrigger asChild>
                <UploadCloud size={16} className='hover:stroke-blue-600 cursor-pointer' />
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto top-52 bg-slate-50 text-sm">
                <DialogHeader>
                    <DialogTitle className='text-lg'>Upload File PDF - {file_name}</DialogTitle>
                </DialogHeader>

                <div className="max-w-md mx-auto bg-white p-6 rounded border border-gray-300">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mb-4 p-2 w-full border rounded"
                        disabled={uploading}
                    />
                    <Button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="w-full text-white p-2 rounded disabled:bg-gray-300"
                    >
                        Upload
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {isSuccess && <p className="flex items-center gap-2 text-green-500 mt-2"><CircleCheckBig size={16} /> File Berhasil diupload</p>}
                    {uploading && <p className="animate-pulse text-gray-500 mt-2">Uploading file...</p>}
                </div>
                <DialogFooter className="sm:justify-end text-sm">
                    <DialogClose asChild>
                        {isSuccess &&
                            <Button size={"sm"}>Selesai</Button>
                            ||
                            <Button size={"sm"}>Close</Button>
                        }
                    </DialogClose>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};

export default FileUpload;