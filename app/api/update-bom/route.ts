export const runtime = 'nodejs'; // pastikan pakai runtime Node.js
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const kode_barang = formData.get('kode_barang') as string;
        const nama_barang = formData.get('nama_barang') as string;
        const type = formData.get('type') as string;
        const satuan = formData.get('satuan') as string;
        const qty = formData.get('qty') as string;
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

        const data = {
            "kode_barang": kode_barang,
            "nama_barang": nama_barang,
            "type": type,
            "satuan": satuan,
            "qty": Number(qty),
        }
        console.log(id, "id yang dikirim ke golang")

        console.log(JSON.stringify(data), "data yang dikirim ke golang")
        const response = await fetch(`${process.env.API_URL}/bom/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token ?? ''}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const text = await response.json();
            return Response.json({ error: text.data.message }, { status: response.status });
        }

        const result = await response.json(); // atau .json() kalau Golang kirim JSON
        console.log(result.data.message, "respons Berhasil dari golang")
        return Response.json({ message: "Data berhasil diupdate." }, { status: response.status });
    } catch (err: any) {
        console.error(err);
        return Response.json({ error: err.error.message }, { status: 500 });
    }

}
