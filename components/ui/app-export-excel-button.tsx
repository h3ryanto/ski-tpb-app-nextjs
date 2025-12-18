"use client";

import React from "react";
import { exportToExcel } from "@/utils/exportExcel";
import { DownloadCloud } from "lucide-react";
import { FormatExcelDokumenTpb } from "@/utils/formatExcelDokumenTpb";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Description } from "@radix-ui/react-dialog"
import { Button } from "./button"
import { AppSelectDokumen } from "./app-select-dokumen";
import AppSwalError from "./allert-swal-error";


export default function AppExportExcelButton() {
    const [kode_dokumen, setKodeDokumen] = React.useState("")
    const [dateFrom, setDateFrom] = React.useState("")
    const [dateTo, setDateTo] = React.useState("")


    const isDisabled =
        dateFrom.length === 0 ||
        dateTo.length === 0 ||
        kode_dokumen.length === 0;



    const handleExport = async () => {
        try {

            const filter = { "kode_dokumen": kode_dokumen, "date_from": dateFrom, "date_to": dateTo }
            const data = await fetch(`/api/get-dokumen`, {
                method: 'post',
                body: JSON.stringify({
                    search: "",
                    page: 1,
                    size: 1000,
                    filter: filter,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (data) {
                const posts = await data.json()
                if (posts.posts.data.length > 0) {
                    // Gunakan fungsi dari utils
                    const result = FormatExcelDokumenTpb(posts.posts.data);

                    console.log("Data hasil transformasi:", result);

                    // Ekspor ke Excel
                    exportToExcel(result, `BC ${kode_dokumen} periode :${dateFrom} - ${dateTo}`);
                } else {
                    AppSwalError({ message: "Data tidak ditemukan" });
                }
            }
        } catch (error: any) {
            console.error(error)
            AppSwalError({ message: error || 'Terjadi Kesalahan Saat Menyimpan Data' });
        }

    };

    return (

        <Dialog modal={false}>
            <DialogTrigger asChild >
                <Button
                    onClick={() => { setDateFrom(""); setDateTo(""); setKodeDokumen("") }}
                >
                    <DownloadCloud
                        size={16}
                        className="hover:stroke-blue-600 cursor-pointer"

                    />
                    Export To Excel
                </Button>
            </DialogTrigger>
            <Description></Description>
            <DialogContent className="max-w-full h-full flex justify-center items-top bg-black bg-opacity-40 z-[7777]"
                onInteractOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onFocusOutside={(e) => e.preventDefault()}
            >
                <div className=" bg-slate-50 p-5 top-10 max-h-max w-[20vw] ">
                    <DialogHeader>
                        <DialogTitle>Export Data To Excel</DialogTitle>
                    </DialogHeader>
                    <div className=" my-3 p-3 rounded border border-gray-300 font-sans text-sm">
                        <div className="flex flex-row items-center justify-start gap-1">
                            <div className="py-2">
                                <AppSelectDokumen setDokumen={setKodeDokumen} />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start gap-1">
                            <div className="py-2">
                                Periode :
                                <div>
                                    <input
                                        id="dateFrom"
                                        type="date"
                                        name="dateFrom"
                                        className="border border-gray-300 rounded-sm p-1 w-[15vw]"
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                </div>
                                <div>Sampai : </div>
                                <div>
                                    <input
                                        id="dateTo"
                                        type="date"
                                        name="dateTo"
                                        className="border border-gray-300 rounded-sm p-1 w-[15vw]"
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <DialogFooter className="flex flex-row justify-end items-center gap-2">
                        <Button size={"sm"} onClick={() => handleExport()} disabled={isDisabled}>Export</Button>
                        <DialogTrigger asChild>
                            <Button size={"sm"}>Close</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </div>
            </DialogContent >
        </Dialog >
    );
}