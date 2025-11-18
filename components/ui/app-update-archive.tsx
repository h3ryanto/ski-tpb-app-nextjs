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
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './button';
import { z } from 'zod'
import { format } from 'date-fns';
import AppLoading from "./app-loading";

interface UpdateArchiveProps {
    onUpdateDataSuccess: () => void;
    data: any
}

const UpdateArchive: React.FC<UpdateArchiveProps> = ({ onUpdateDataSuccess, data }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = React.useRef<HTMLFormElement>(null); // Tambahkan ref untuk form
    const schema = z.object({
        nomor_dokumen: z.string().min(1),
        tanggal_dokumen: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Tanggal tidak valid",
        }),
        nama_dokumen: z.string().min(1),
        kategori_dokumen: z.string().min(1),
        description: z.string().min(1),

    });






    const formAction = async (formData: FormData, id: number) => {
        const file = formData.get('file') as File
        const validatedFields = schema.safeParse({
            nomor_dokumen: formData.get('nomor_dokumen'),
            tanggal_dokumen: formData.get('tanggal_dokumen'),
            nama_dokumen: formData.get('nama_dokumen'),
            kategori_dokumen: formData.get('kategori_dokumen'),
            description: formData.get('description'),

        })

        if (!validatedFields.success) {
            displayValidationErrors(validatedFields.error);
            console.log(validatedFields.error)
        } else {
            const archiveData = new FormData();
            if (file) {
                archiveData.append('file', file);
            }
            archiveData.append('nomor_dokumen', validatedFields.data.nomor_dokumen);
            const dateObj = new Date(validatedFields.data.tanggal_dokumen);
            const isoDate = dateObj.toISOString(); // untuk dikirim ke backend
            archiveData.append('tanggal_dokumen', isoDate);
            archiveData.append('nama_dokumen', validatedFields.data.nama_dokumen);
            archiveData.append('kategori_dokumen', validatedFields.data.kategori_dokumen);
            archiveData.append('description', validatedFields.data.description);
            archiveData.append('filename', crypto.randomUUID());
            archiveData.append('id', id.toString());
            setIsLoading(true)
            const result = await fetch('/api/update-archive', {
                method: 'POST',
                body: archiveData,
            });



            console.log(result, "<-res")

            if (result.status === 200) {
                formRef.current?.reset();
                const res = await result.json();
                toast({
                    title: "Update Data Berhasil",
                    description: res.message,
                });
                onUpdateDataSuccess();
                setOpen(false)
            } else {
                const res = await result.json();
                toast({
                    variant: "destructive",
                    title: "Gagal Simpan Data",
                    description: `${res.status} -> ${res.message}`,
                });
            }
            setIsLoading(false)
        }

    }

    const displayValidationErrors = (errors: z.ZodError) => {
        errors.errors.forEach((error) => {
            const field = document.getElementById(String(error.path[0])) as HTMLInputElement | null;
            if (field) {
                const errorSpan = document.createElement("span");
                errorSpan.className = "text-sm italic text-red-500";
                errorSpan.textContent = error.message;

                // Remove existing error message if present
                const existingError = field.parentElement?.querySelector(".text-red-500");
                if (existingError) {
                    existingError.remove();
                }

                // Append the error message
                field.parentElement?.appendChild(errorSpan);
            }
        });
    };

    const clearValidationError = (fieldId: string) => {
        const field = document.getElementById(fieldId) as HTMLInputElement | null;
        if (field) {
            const existingError = field.parentElement?.querySelector(".text-red-500");
            if (existingError) {
                existingError.remove();
            }
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Pencil size={16} onClick={() => setOpen(true)} className='cursor-pointer stroke-slate-500 hover:stroke-yellow-500' />
                </DialogTrigger>
                <DialogContent className="max-w-md mx-auto top-96 bg-slate-50 text-sm">
                    <DialogHeader>
                        <DialogTitle className='text-lg'>Entry Data</DialogTitle>
                    </DialogHeader>
                    <form
                        ref={formRef}
                        onSubmit={(e) => {
                            e.preventDefault();
                            formAction(new FormData(e.currentTarget), data.id);

                        }}>
                        <div className=" bg-white p-6 rounded border border-gray-300">
                            <div className="py-2">
                                Nomor Dokumen :
                                <input
                                    id="nomor_dokumen"
                                    name="nomor_dokumen"
                                    type="text"
                                    defaultValue={data.nomor_dokumen}
                                    required
                                    autoComplete="nomor_dokumen"
                                    placeholder="Nomor Dokumen"
                                    className="block w-full rounded-md border py-1.5 pl-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("nama_dokumen")}
                                />
                            </div>
                            <div className="py-2">
                                Tanggal Dokumen :
                                <input
                                    id="tanggal_dokumen"
                                    name="tanggal_dokumen"
                                    defaultValue={format(new Date(data.tanggal_dokumen), 'yyyy-MM-dd')}
                                    type="date"
                                    required
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("tanggal_dokumen")}
                                />
                            </div>
                            <div className="py-2">
                                Nama Dokumen :
                                <input
                                    id="nama_dokumen"
                                    name="nama_dokumen"
                                    defaultValue={data.nama_dokumen}
                                    type="text"
                                    required
                                    autoComplete="nama_dokumen"
                                    placeholder="Nama Dokumen"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("nama_dokumen")}
                                />
                            </div>
                            <div className="py-2">
                                Kategori Dokumen :
                                <select
                                    name="kategori_dokumen"
                                    id="kategori_dokumen"
                                    defaultValue={data.kategori_dokumen}
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onChange={() => clearValidationError("kategori_dokumen")}
                                >
                                    <option value="Surat Masuk">Surat Masuk</option>
                                    <option value="Surat Keluar">Surat Keluar</option>
                                    <option value="SKEP">SKEP</option>
                                    <option value="Laporan">Laporan</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div className="py-2">
                                Keterangan :
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={data.description}
                                    required
                                    autoComplete="description"
                                    placeholder="Keterangan"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("description")}
                                />
                            </div>

                            <div className="py-2">
                                Pilih File :
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    className="mb-4 p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <DialogFooter className="justify-end text-sm pt-3">
                            <Button
                                type="submit"
                                size={"sm"}
                            >
                                Save
                            </Button>
                            <DialogClose asChild>
                                <Button size={"sm"} onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
            <AppLoading isLoading={isLoading} />
        </>
    );
};

export default UpdateArchive;