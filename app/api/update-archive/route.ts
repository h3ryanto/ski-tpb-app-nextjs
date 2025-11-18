export const runtime = 'nodejs'; // pastikan pakai runtime Node.js
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get('file') as File | null;
        const filename = formData.get('filename') as string;
        const nomor_dokumen = formData.get('nomor_dokumen') as string;
        const tanggal_dokumen = formData.get('tanggal_dokumen') as string;
        const nama_dokumen = formData.get('nama_dokumen') as string;
        const kategori_dokumen = formData.get('kategori_dokumen') as string;
        const description = formData.get('description') as string;
        const id = formData.get('id');



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


        // Buat FormData baru untuk diteruskan ke API Golang
        const golangForm = new FormData();
        golangForm.append('nomor_dokumen', nomor_dokumen);
        golangForm.append('tanggal_dokumen', tanggal_dokumen);
        golangForm.append('nama_dokumen', nama_dokumen);
        golangForm.append('kategori_dokumen', kategori_dokumen);
        golangForm.append('description', description);
        golangForm.append('filename', `${filename}.pdf`);

        if (file) {
            // ✅ Konversi File ke Blob langsung (tanpa Buffer)
            const arrayBuffer = await file?.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: file.type });
            golangForm.append('file', blob, file.name);
        }

        // console.log(golangForm)
        const response = await fetch(`${process.env.API_URL}/archive/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token ?? ''}`,
            },
            body: golangForm as any,
        });

        if (!response.ok) {
            const text = await response.json();
            return Response.json({ error: text.data.message }, { status: response.status });
        }

        const result = await response.json(); // atau .json() kalau Golang kirim JSON
        console.log(result.data.message, "respons Berhasil dari golang")
        return Response.json({ message: result.data.message }, { status: response.status });
    } catch (err: any) {
        console.error(err);
        return Response.json({ error: err.error.message }, { status: 500 });
    }

}
