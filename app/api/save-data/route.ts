// import { CreateHeader } from '@/lib/database/neon_postgresSql/createDokumen/create-headers';
import { Validasi } from '@/lib/database/neon_postgresSql/createDokumen/validasi';
import { type NextRequest } from 'next/server'
// import { auth } from "@/auth"

export async function POST(Request: NextRequest) {

    // const session = await auth()
    // if (!session) {
    //     return Response.json(
    //         { message: 'Unauthorized' },
    //         {
    //             status: 401, statusText: 'Unauthorized',
    //             headers: { 'content-type': 'application/json' }
    //         }
    //     )
    // }

    const body = await Request.json();

    // const result = await CreateHeader(body.result.Header);
    const resultValidate = await Validasi(body.result.Header)
    if (resultValidate.some((item: any) => item.status !== 200)) {
        return Response.json(
            { message: 'Data sudah ada', errors: resultValidate },
            {
                status: 400, statusText: 'Duplicate Data',
                headers: { 'content-type': 'application/json' }
            }
        );
    }





    //     return Response.json(
    //         { message: 'An error occurred', error: (error as Error).message },
    //         {
    //             status: 500, statusText: 'Internal Server Error',
    //             headers: { 'content-type': 'application/json' }
    //         }
    //     );
    // }
}