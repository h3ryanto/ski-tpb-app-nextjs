import { getToken } from "next-auth/jwt";
import axios from "axios"
import { auth } from "@/auth"

export async function POST(req: Request) {


    const body = await req.json();
    const search = body.search || '';
    const filter = body.filter || '';
    const size = Number(body.size) || 10;
    const page = Number(body.page) || 1;
    // log the parsed filter value
    console.log('API get-dokumen called with params:', JSON.stringify(filter, null, 2));

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
        `${process.env.API_URL}/dokumen?page=${page}&size=${size}&search=${search}&nomor_daftar=${filter.nomor_daftar || ''}&nomor_aju=${filter.nomor_aju || ''}&kode_dokumen=${filter.kode_dokumen || ''}&entitas=${filter.entitas || ''}&no_dokumen=${filter.no_dokumen || ''}&date_from=${filter.date_from || ''}&date_to=${filter.date_to || ''}&sortBy=${filter.sortBy || ''}&asc=${filter.asc || ''}&kode_valuta=${filter.kode_valuta || ''}`,
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