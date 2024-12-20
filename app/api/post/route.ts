import { retriveData, countData } from "@/database/postgresSql/posts";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const term = searchParams.get('search') || '';
        const currenPage = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('pageSize')) || 10;
        const skip = (currenPage - 1) * limit;
        console.log(term);

        const posts = await retriveData(limit, skip, term);
        const count = await countData(term);
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






}