import { filterNomorDaftar,filterNomorAju,filterEntitas,filterDokumen } from "@/lib/database/neon_postgresSql/posts";
import { type NextRequest } from 'next/server'
import { auth } from "@/auth"

export async function POST(Request: NextRequest) {

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

    const body = await Request.json();
    const term = body.query || '';
    const dokumen = body.dokumen || '';

    

    let result;

    if (dokumen === 'nomorAju') {
        result = await filterNomorAju(term); 
    } else if (dokumen === 'nomorDaftar') {
        result = await filterNomorDaftar(term);                
    } else if (dokumen === 'suplier') {
        result = await filterEntitas(term);                
    } else if (dokumen === 'dokumen') {
        result = await filterDokumen(term);                
    }

    return Response.json(
        {
            result: result,
        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}