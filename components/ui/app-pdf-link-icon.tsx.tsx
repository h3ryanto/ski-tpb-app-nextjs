import { useEffect, useState } from "react";
import { FileTextIcon } from "lucide-react";
import { decodeFormState } from "next/dist/server/app-render/entry-base";

export default function AppPdfLinkIcon({ nomor_daftar, tahun, kode_dokumen }: { nomor_daftar: any, tahun: string, kode_dokumen: any }) {
    const [pdfExists, setPdfExists] = useState<boolean | null>(null);

    useEffect(() => {
        const cek_pdf = async (file_name: string, year: string, kode_dokumen: string) => {
            const result = await fetch(`/api/check-pdf?file=${file_name}&document=${kode_dokumen}&year=${year}`);
            const status = await result.json();
            return status.exists;
        };

        cek_pdf(nomor_daftar, tahun, kode_dokumen).then(setPdfExists);
    }, [nomor_daftar, tahun, kode_dokumen]);

    return (
        pdfExists ? (
            <FileTextIcon
                size={16}
                className="hover:stroke-red-500 cursor-pointer stroke-red-700"
                onClick={() => {
                    const pdfUrl = `/repository/${tahun}/${kode_dokumen}/${nomor_daftar}.pdf`;
                    window.open(pdfUrl, '_blank');
                }}
            />
        ) : (
            <FileTextIcon
                size={16}
                className="cursor-not-allowed stroke-gray-400 hover:stroke-gray-600"
            />
        )
    );
}
