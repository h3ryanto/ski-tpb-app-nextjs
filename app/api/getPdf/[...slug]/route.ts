import cloudinary from '@/lib/cloudinary/config';
import { NextRequest } from "next/server";

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ slug: string[] }> }
) {

    const { slug } = await context.params; // WAJIB di-await
    const [year, kode_dokumen, query] = slug;

    // const path = `Documens/${year}/${kode_dokumen}`;
    const url = `https://tpb.heryheryanto.my.id/storage/documens/${year}/${kode_dokumen}/${query}.pdf`;
    // try {
        // const results = await cloudinary.search
        //     .expression(`${query} AND asset_folder:${path}`)
        //     .execute();

        // const cloudinaryUrl = results.resources[0]?.url;
        // if (!cloudinaryUrl) {
        //     return Response.json(
        //         { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!" },
        //         { status: 404 }
        //     );
        // }

        const pdfResponse = await fetch(`${url}`);
        // if (!pdfResponse.ok) {
        //     return Response.json(
        //         { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!" },
        //         { status: 404 }
        //     );
        // }

        const stream = pdfResponse.body;
        //  const stream ="http://skitpbapp.work/storage/documens/2025/23/004624.pdf"

        return new Response(stream, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename=${query}.pdf`,
            },
        });
//     } catch (error) {
//         return Response.json(
//             { title: "File PDF tidak ditemukan", message: "Silahkan Upload File PDF terlebihdahulu!", error },
//             { status: 404 }
//         );
//     }
}