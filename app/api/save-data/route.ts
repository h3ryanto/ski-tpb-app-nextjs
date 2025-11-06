// import { CreateHeader } from '@/lib/database/neon_postgresSql/createDokumen/create-headers';
import { Validasi } from '@/lib/database/neon_postgresSql/createDokumen/validasi';
import { auth } from "@/auth"
import mergeSheetsByAju from '@/utils/mergeSheetsByAju';
import { getToken } from "next-auth/jwt";
import axios from "axios"


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

    const body = await req.json()


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
        const token = jwt?.accessToken;

        const data = await mergeSheetsByAju(body.result);

        console.log(JSON.stringify(data), 'data di route save-data');
        // Simpan data ke database
        const saveRes = await axios.post(
            `${process.env.API_URL}/dokumen/save-dokumen`,
            { data: data },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,

                }
            }
        );
        console.log('Data saved successfully:', saveRes.data);
        return Response.json(
            { message: saveRes.data.message, status: 200 },
            {

                status: 200, statusText: 'OK',
                headers: { 'content-type': 'application/json' }
            }
        );
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

        // console.error('Error saving data:', error);
        // return Response.json(
        //     { message: 'Internal Server Error' },
        //     {
        //         status: 500, statusText: 'Internal Server Error',
        //         headers: { 'content-type': 'application/json' }
        //     }
        // );
    }


}