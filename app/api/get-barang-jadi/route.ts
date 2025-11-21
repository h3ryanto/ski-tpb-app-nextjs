import { getToken } from "next-auth/jwt";
import axios from "axios"
import { auth } from "@/auth"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const search = searchParams.get('search');

    const session = await auth()
    if (!session) {
        return Response.json(
            { message: 'Unauthorized' },
            {
                status: 401, statusText: 'Unauthorized',
                headers: { 'content-type': 'application/json' }
            }
        )
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
    const res = await axios.get(
        `${process.env.API_URL}/barang-jadi?page=${page}&size=${size}&search=${search}`,
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
            posts: res.data,
        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}