export const runtime = 'nodejs'; // pastikan pakai runtime Node.js
import { getToken } from "next-auth/jwt";


import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const kode_barang = formData.get('kode_barang') as string;
        const nama_barang = formData.get('nama_barang') as string;
        const type = formData.get('type') as string;
        const satuan = formData.get('satuan') as string;
        const harga = '0';
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
        golangForm.append('kode_barang', kode_barang);
        golangForm.append('nama_barang', nama_barang);
        golangForm.append('type', type);
        golangForm.append('satuan', satuan);
        golangForm.append('harga', harga);

        // console.log(golangForm)
        const response = await fetch(`${process.env.API_URL}/barang-jadi`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token ?? ''}`,
            },
            body: golangForm as any,
        });
        console.log(response, "respons dari golang")

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
