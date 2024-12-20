import { retriveData } from "@/database/postgresSql/posts";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const term = searchParams.get('search') || '';
        console.log(term);

        const posts = await retriveData(10, 0, term);

        return Response.json(
            {
                posts
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






}