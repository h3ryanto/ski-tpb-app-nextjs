import cloudinary from '@/lib/cloudinary/config';
import { NextRequest } from "next/server";
export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ slug: string[] }> }
) {

    const { slug } = await context.params; // WAJIB di-await
    const [year, kode_dokumen, query] = slug;

    const path = `Documens/${year}/${kode_dokumen}`;
    try {
        const results = await cloudinary.search
            .expression(`${query} AND asset_folder:${path}`)
            .execute();

        const cloudinaryUrl = results.resources[0]?.url;
        if (!cloudinaryUrl) {
            return Response.json(
                { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!" },
                { status: 404 }
            );
        }

        const pdfResponse = await fetch(cloudinaryUrl);
        if (!pdfResponse.ok) {
            return Response.json(
                { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!" },
                { status: 404 }
            );
        }

        const stream = pdfResponse.body;

        return new Response(stream, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename=${query}.pdf`,
            },
        });
    } catch (error) {
        return Response.json(
            { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!", error },
            { status: 404 }
        );
    }
}