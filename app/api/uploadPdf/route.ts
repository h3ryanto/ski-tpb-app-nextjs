export const runtime = 'nodejs'; // pastikan pakai runtime Node.js
import { getToken } from "next-auth/jwt";


import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get('file') as File | null;
        const fileName = formData.get('fileName') as string;
        const tahun = formData.get('tahun') as string;
        const kode_dokumen = formData.get('kode_dokumen') as string;

        if (!file) {
            return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
        }

        const cookieKey = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';
        const jwt = await getToken({ req, secret: process.env.AUTH_SECRET, salt: cookieKey, cookieName: cookieKey });
        const token = jwt?.accessToken;


        // ✅ Konversi File ke Blob langsung (tanpa Buffer)
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });

        // Buat FormData baru untuk diteruskan ke API Golang
        const golangForm = new FormData();
        golangForm.append('file', blob, file.name);
        golangForm.append('fileName', fileName);
        golangForm.append('tahun', tahun);
        golangForm.append('kode_dokumen', kode_dokumen);

        const response = await fetch(`${process.env.API_URL}/upload-pdf`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token ?? ''}`,
            },
            body: golangForm as any,
        });
        // console.log(response)

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json({ error: text }, { status: response.status });
        }

        const result = await response.text(); // atau .json() kalau Golang kirim JSON
        return NextResponse.json({ message: 'Upload berhasil', result });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

}
