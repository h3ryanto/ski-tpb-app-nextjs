// components/DeleteButton.tsx
"use client";

import { Trash } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
    id: string;
    url: string;
    realoadTrigger: () => void;
};

export default function AppSwalDelete({ id, url, realoadTrigger }: Props) {
    const handleDelete = async () => {
        Swal.fire({
            title: "Apakah kamu yakin?",
            text: "Data ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
            position: "top",
            customClass: {
                popup: "swal-mini",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Panggil API delete Next.js
                    const res = await fetch(`${url}`, {
                        method: 'DELETE',
                        body: JSON.stringify({
                            id: id
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });


                    if (res.ok) {
                        Swal.fire({
                            title: "Success!",
                            text: 'Data berhasil dihapus.',
                            icon: "success",
                            confirmButtonText: "OK",
                            position: "top",
                            customClass: {
                                container: 'swal2-container',
                                popup: "swal-mini",
                            },
                        }).then(() => {
                            realoadTrigger();
                        });
                    } else {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Tidak bisa terhubung ke server.", "error");
                }
            }
        });
    };

    return (
        <Trash size={16} className='hover:stroke-red-600 cursor-pointer' onClick={handleDelete} />
    );
}