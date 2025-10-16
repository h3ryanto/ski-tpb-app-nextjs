import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
    const body = await req.json()

    const filename = body.file_name;
    const kode_dokumen = body.kode_dokumen;
    const tahun = body.tahun
    const jwt = await getToken({ req, secret: process.env.AUTH_SECRET, secureCookie: true });
    const token = jwt?.accessToken;
    console.log("Headers:", Object.fromEntries(req.headers));
    console.log(token, "token")
    console.log(process.env.AUTH_SECRET, "auth scret")
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    const res = await axios.get(
        `${process.env.API_URL}/check-pdf?filename=${filename}.pdf&tahun=${tahun}&kode_dokumen=${kode_dokumen}`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,

            }
        }
    );
    return Response.json(
        {
            posts: res.data

        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}