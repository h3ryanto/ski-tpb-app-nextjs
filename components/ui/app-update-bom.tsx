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
import AppLoading from "./app-loading";

interface UpdateBomProps {
    onUpdateDataSuccess: () => void;
    data: any
}

const UpdateBom: React.FC<UpdateBomProps> = ({ onUpdateDataSuccess, data }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formRef = React.useRef<HTMLFormElement>(null); // Tambahkan ref untuk form

    const schema = z.object({
        kode_barang: z.string().min(1).max(13),
        nama_barang: z.string().min(5),
        type: z.string().min(3),
        qty: z.number().min(1),
        satuan: z.string().min(3).max(3),
    });

    const formAction = async (formData: FormData, id: number) => {
        const validatedFields = schema.safeParse({
            kode_barang: formData.get('kode_barang'),
            nama_barang: formData.get('nama_barang'),
            type: formData.get('type'),
            qty: Number(formData.get('qty')),
            satuan: formData.get('satuan'),

        })

        if (!validatedFields.success) {
            displayValidationErrors(validatedFields.error);
            console.log(validatedFields.error)
        } else {
            const BomData = new FormData();
            BomData.append('kode_barang', validatedFields.data.kode_barang);
            BomData.append('nama_barang', validatedFields.data.nama_barang);
            BomData.append('type', validatedFields.data.type);
            BomData.append('qty', validatedFields.data.qty.toString());
            BomData.append('satuan', validatedFields.data.satuan);
            BomData.append('id', id.toString());
            setIsLoading(true)
            const result = await fetch('/api/update-bom', {
                method: 'POST',
                body: BomData,
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
                                Kode barang :
                                <input
                                    id="kode_barang"
                                    name="kode_barang"
                                    type="text"
                                    defaultValue={data.kode_barang}
                                    required
                                    autoComplete="kode_barang"
                                    placeholder="Kode barang"
                                    className="block w-full rounded-md border py-1.5 pl-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("kode_barang")}
                                />
                            </div>

                            <div className="py-2">
                                Urain :
                                <input
                                    id="nama_barang"
                                    name="nama_barang"
                                    defaultValue={data.nama_barang}
                                    type="text"
                                    required
                                    autoComplete="nama_barang"
                                    placeholder="Nama Barang"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("nama_barang")}
                                />
                            </div>
                            <div className="py-2">
                                Type :
                                <input
                                    id="type"
                                    name="type"
                                    defaultValue={data.type}
                                    type="text"
                                    required
                                    autoComplete="type"
                                    placeholder="Type"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("type")}
                                />
                            </div>
                            <div className="py-2">
                                Jumlah Satuan :
                                <input
                                    id="qty"
                                    name="qty"
                                    defaultValue={data.qty}
                                    type="text"
                                    required
                                    autoComplete="qty"
                                    placeholder="Jumlah Satuan"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("qty")}
                                />
                            </div>
                            <div className="py-2">
                                Satuan :
                                <input
                                    id="satuan"
                                    name="satuan"
                                    defaultValue={data.satuan}
                                    type="text"
                                    required
                                    autoComplete="satuan"
                                    placeholder="Satuan"
                                    className="block w-full rounded-md border py-1.5 px-2 shadow-sm ring-1 ring-gray-300"
                                    onInput={() => clearValidationError("satuan")}
                                />
                            </div>

                        </div>

                        <DialogFooter className="justify-end text-sm pt-3">
                            <Button
                                type="submit"
                                size={"sm"}
                            >{isLoading ? 'Saving...' : ' Save'}

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

export default UpdateBom;