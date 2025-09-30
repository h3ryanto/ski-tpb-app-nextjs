import { useEffect, useState } from "react";
import { FileTextIcon, LoaderCircle } from "lucide-react";
import path from "path";

export default function AppPdfLinkIcon({ nomor_daftar, tahun, kode_dokumen }: { nomor_daftar: any, tahun: string, kode_dokumen: any }) {
    const [pdfExists, setPdfExists] = useState<boolean | null>(null);
    const [checkLoading, setCheckLoading] = useState<boolean | null>(null);
    const [pdfLinkPath, setPdfLinkPath] = useState<string>("");
    useEffect(() => {

        const cek_pdf = async (nomor_daftar: string, tahun: string, kode_dokumen: string) => {
            setCheckLoading(true);
            // const url = `https://tpb.heryheryanto.my.id/check-pdf/${tahun}/${kode_dokumen}/${nomor_daftar}`;
            const url = `https://go.heryheryanto.my.id/check-pdf?filename=${nomor_daftar}.pdf&tahun=${tahun}&kode_dokumen=${kode_dokumen}`;
            const result = await fetch(url);
            const status = await result.json();
            // console.log("PDF exists:", status);
            setCheckLoading(false);
            return status.exists;
        };
        const filePath = path.join(`/api/getPdf/${tahun}/${kode_dokumen}/`, `${nomor_daftar}`);
        setPdfLinkPath(filePath);
        cek_pdf(nomor_daftar, tahun, kode_dokumen).then(setPdfExists);
    }, [nomor_daftar, tahun, kode_dokumen]);

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
