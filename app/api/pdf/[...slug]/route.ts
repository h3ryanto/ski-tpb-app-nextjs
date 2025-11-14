import { getToken } from "next-auth/jwt";

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string[] }> }
) {

    const { slug } = await context.params; // WAJIB di-await
    // const [year, kode_dokumen, query] = slug;
    let path = ''
    let filename = ''
    if (slug.length > 2) {
        path = `${slug[0]}/${slug[1]}`
        filename = `${slug[2]}`
    } else {
        path = `${slug[0]}`
        filename = `${slug[1]}`
    }


    const jwt =
        (await getToken({
            req,
            secret: process.env.AUTH_SECRET,
            cookieName: "__Secure-authjs.session-token",
        })) ||
        (await getToken({
            req,
            secret: process.env.AUTH_SECRET,
            cookieName: "authjs.session-token",
        }));
    const token = jwt?.accessToken;
    const url = `${process.env.API_URL}/view-pdf?name=${filename}&path=${path}`;


    const pdfResponse = await fetch(`${url}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const stream = pdfResponse.body;

    return new Response(stream, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=${filename}.pdf`,
        },
    });

}