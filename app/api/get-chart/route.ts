import { retriveDataChart, retriveDataStatikChart, countData, retriveDataKontainer } from '@/lib/database/neon_postgresSql/chart'
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

    const date_to = body.date_to || '';
    const date_from = body.date_from || '';

    const result = await retriveDataChart({ date_from, date_to })
    const Statistic = await retriveDataStatikChart({ date_from, date_to })
    const count = await countData({ date_from, date_to });
    const jlmContainer = await retriveDataKontainer({ date_from, date_to });

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
            posts: convertBigInt(result),
            count: count[0].jumlah,
            Statistic: convertBigInt(Statistic),
            jlmContainer: convertBigInt(jlmContainer),
        },
        {
            status: 200, statusText: 'OK',
            headers: { 'content-type': 'application/json' }
        }
    )
}