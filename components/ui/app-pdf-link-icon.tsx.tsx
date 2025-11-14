import { useEffect, useState } from "react";
import { FileTextIcon, LoaderCircle } from "lucide-react";
import path from "path";

export default function AppPdfLinkIcon({ nomor_daftar, tahun, kode_dokumen, refresh }: { nomor_daftar: any, tahun: string, kode_dokumen: any, refresh: number }) {
    const [pdfExists, setPdfExists] = useState<boolean | null>(null);
    const [checkLoading, setCheckLoading] = useState<boolean | null>(null);
    const [pdfLinkPath, setPdfLinkPath] = useState<string>("");


    useEffect(() => {

        const cek_pdf = async (nomor_daftar: string, tahun: string, kode_dokumen: string) => {
            setCheckLoading(true);
            const url = `/api/checkPdf`;
            const result = await fetch(url,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "file_name": nomor_daftar,
                        "tahun": tahun,
                        "kode_dokumen": kode_dokumen
                    })
                }
            );
            const status = await result.json();
            setCheckLoading(false);
            return status.posts.exists;
        };
        const filePath = path.join(`/api/pdf/${tahun}/${kode_dokumen}/`, `${nomor_daftar}.pdf`);
        setPdfLinkPath(filePath);
        cek_pdf(nomor_daftar, tahun, kode_dokumen).then(setPdfExists);
    }, [nomor_daftar, tahun, kode_dokumen, refresh]);

    return (
        checkLoading ? (
            <LoaderCircle className="animate-spin stroke-red-500 mx-3" size={16} />
        ) :
            pdfExists ? (
                <FileTextIcon
                    size={16}
                    className="hover:stroke-red-500 cursor-pointer stroke-red-700"
                    onClick={() => {
                        const pdfUrl = pdfLinkPath;
                        console.log("Opening PDF:", pdfUrl);
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
