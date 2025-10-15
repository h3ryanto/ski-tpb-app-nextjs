// import cloudinary from '@/lib/cloudinary/config';
import { getToken } from "next-auth/jwt";

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string[] }> }
) {

    const { slug } = await context.params; // WAJIB di-await
    const [year, kode_dokumen, query] = slug;

    // const path = `Documens/${year}/${kode_dokumen}`;
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const url = `${process.env.API_URL}/view-pdf?name=${query}.pdf&tahun=${year}&kode_dokumen=${kode_dokumen}`;
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

    const pdfResponse = await fetch(`${url}`,
        {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`
            }
        }
    );
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