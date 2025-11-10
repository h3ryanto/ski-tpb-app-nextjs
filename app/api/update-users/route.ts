import { getToken } from "next-auth/jwt";
import axios from "axios"
import { auth } from "@/auth"
import { date } from "zod";

export async function PUT(req: Request) {

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

    const body = await req.json();
    const token = jwt?.accessToken;
    const res = await axios.put(
        `${process.env.API_URL}/users/${body.email}`,
        {
            [body.atribut]: body.value
        },
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
            data: res.data
        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}