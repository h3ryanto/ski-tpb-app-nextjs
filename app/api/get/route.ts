import { getData, countData } from "@/lib/database/neon_postgresSql/posts";
import { type NextRequest } from 'next/server'
import { format } from "date-fns";
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
    const filter = body.filter || '';;
    const limit = Number(body.limit) || 10;
    const skip = Number(body.skip) || 0;

    const count = await countData(term, filter);

    const posts = await getData(limit, skip, term, filter);

    const convertBigInt = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(convertBigInt);
        } else if (typeof obj === 'object' && obj !== null) {
            const result: { [key: string]: any } = {};
            for (const [key, value] of Object.entries(obj)) {
                result[key] = typeof value === 'bigint' ? value.toString() : value instanceof Date ? format(value, "yyyy-MM-dd") : convertBigInt(value);
            }
            return result;
        }
        return obj;
    };
    // console.log(convertBigInt(posts))
    return Response.json(
        {
            posts: convertBigInt(posts),
            count: {count}
        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}