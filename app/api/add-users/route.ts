import { getToken } from "next-auth/jwt";
import axios from "axios"
import { auth } from "@/auth"
import { date } from "zod";

export async function POST(req: Request) {

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

    try {
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
        const res = await axios.post(
            `${process.env.API_URL}/users`,
            {
                email: body.email,
                name: body.name,
                password: body.password,
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
        console.log(res.data);
        return Response.json(
            {
                message: "success",
                data: res.data
            },
            {
                status: 200, statusText: 'OK',
                headers: { 'content-type': 'application/json' }
            }
        )
    }
    catch (error: any) {
        if (error.response) {
            // ✅ Server merespon dengan status error (4xx, 5xx)
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Headers:", error.response.headers);

            // Kalau kamu mau lempar lagi error ke UI:
            return Response.json(
                {
                    message: error.response.data.error,
                    status: error.response.status
                },
                {
                    status: 500, statusText: 'Internal Server Error',
                    headers: { 'content-type': 'application/json' }
                }
            );

        } else if (error.request) {
            // ✅ Request dikirim tapi tidak ada respons
            console.error("No response received:", error.request);
            return Response.json(
                { message: 'Internal Server Error' },
                {
                    status: 500, statusText: 'Internal Server Error',
                    headers: { 'content-type': 'application/json' }
                }
            );

        } else {
            // ✅ Error lain (misal: salah setup axios)
            console.error("Error Setup:", error.message);
            return Response.json(
                { message: 'Internal Server Error' },
                {
                    status: 500, statusText: 'Internal Server Error',
                    headers: { 'content-type': 'application/json' }
                }
            );
        }


    }
}