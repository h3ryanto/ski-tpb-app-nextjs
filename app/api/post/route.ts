import { retriveData, countData } from "@/lib/database/neon_postgresSql/posts";
import { type NextRequest } from 'next/server'
import { decrypt } from "@/lib/auth/session"

export async function GET(request: NextRequest) {
    const token = await request.headers.get('Authorization')?.split(' ')[1];
    // console.log(token)
    if (token) {
        const secretKey = process.env.SESSION_SECRET
        const jwtVerify = await decrypt(token, `${secretKey}`)
        console.log(jwtVerify)
        if (jwtVerify) {
            try {
                const searchParams = request.nextUrl.searchParams
                const term = searchParams.get('search') || '';
                const currenPage = Number(searchParams.get('page')) || 1;
                const limit = Number(searchParams.get('pageSize')) || 10;
                const skip = (currenPage - 1) * limit;
                console.log(term);

                const posts = await retriveData(limit, skip, term, '');
                const count = await countData(term, '');
                // const posts = await getData(limit, skip, term);

                return Response.json(
                    {
                        posts: posts,
                        count: count.length
                    },
                    {
                        status: 200, statusText: 'OK',
                        headers: { 'content-type': 'application/json' }
                    }
                )

            } catch (error) {
                return Response.json(
                    {
                        error
                    },
                    {
                        status: 400, statusText: 'Credential invalid',
                        headers: { 'content-type': 'application/json' }
                    }
                )
            }
        } else {
            return Response.json({ message: 'Token Tidak Valid', status: false }, { status: 403 })
        }
    } else {
        return Response.json({ message: 'Silahkan Login Terlebih Dahulu', status: false }, { status: 401 })
    }





}