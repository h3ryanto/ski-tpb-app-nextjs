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
        const result = await Validasi(body.result[0].data); // assuming Header is in the first sheet
        // console.log(result, 'result di route save-data');
        if (result.some((item: any) => item.status !== 200)) {
            return Response.json(
                { message: 'Data sudah ada', errors: result },
                {
                    status: 400, statusText: 'Duplicate Data',
                    headers: { 'content-type': 'application/json' }
                }
            );
        }
        if (result.some((item: any) => item.status == 200)) {
            const cookieKey = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';
            const jwt = await getToken({ req, secret: process.env.AUTH_SECRET, salt: cookieKey, cookieName: cookieKey });
            const token = jwt?.accessToken;

            console.log(token, 'token di route save-data');

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
            console.log(saveRes.data, 'saveRes di route save-data');

            return Response.json(
                { message: saveRes.data.message, data: saveRes.data.data },
                {

                    status: 200, statusText: 'OK',
                    headers: { 'content-type': 'application/json' }
                }
            );
        }




    }
    catch (error) {
        console.error('Error saving data:', error);
        return Response.json(
            { message: 'Internal Server Error' },
            {
                status: 500, statusText: 'Internal Server Error',
                headers: { 'content-type': 'application/json' }
            }
        );
    }


}