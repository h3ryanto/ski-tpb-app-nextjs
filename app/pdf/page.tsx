'use client'
import React, { useEffect, useState } from 'react'



const PdfView = () => {

    const [url, setUrl] = useState<string | null>(null);
    const pdfUrl = async (q: string, year: string, kode_dokumen: string) => {
        const data = await fetch(`/api/getPdf?q=${q}&path=Documens/${year}/${kode_dokumen}`)
        const result = await data.json()

        if ((result.url) && (data.status === 200)) {
            setUrl(result.url);
        }
    }

    useEffect(() => {
        pdfUrl('054517', '2025', '27'); // Example parameters, replace with actual values
    }, []);


    return (
        <div className="w-screen h-svh mx-auto flex flex-col items-center">
            <iframe src={url ?? undefined} className='aspect-square w-full h-full'></iframe>
        </div>
    )
}

export default PdfView