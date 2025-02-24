// 'use server'
// import { getData, countData } from "@/lib/database/neon_postgresSql/posts";
// import { type NextRequest } from 'next/server'
// import { format } from "date-fns";
// // import { prisma } from '@/lib/prisma/init';
// // import { NextResponse } from 'next/server'
// // import { retriveData } from '@/lib/firebase/firestore/service';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function GET(request: NextRequest) {
//     // try {
//     const searchParams = request.nextUrl.searchParams
//     const term = searchParams.get('search') || '';
//     const filter = searchParams.get('filter') || '';
//     const currenPage = Number(searchParams.get('page')) || 1;
//     const limit = Number(searchParams.get('pageSize')) || 10;
//     const skip = (currenPage - 1) * limit;

//     const count = await countData(term, '');
//     const posts = await getData(limit, skip, term, filter);


//     console.log(posts)
//     const convertBigInt = (obj: any): any => {
//         if (Array.isArray(obj)) {
//             return obj.map(convertBigInt);
//         } else if (typeof obj === 'object' && obj !== null) {
//             const result: { [key: string]: any } = {};
//             for (const [key, value] of Object.entries(obj)) {
//                 result[key] = typeof value === 'bigint' ? value.toString() : value instanceof Date ? format(value, "yyyy-MM-dd") : convertBigInt(value);
//             }
//             return result;
//         }
//         return obj;
//     };
//     return Response.json(
//         {
//             posts: convertBigInt(posts),
//             count: count.length
//         },
//         {
//             status: 200, statusText: 'OK',
//             headers: { 'content-type': 'application/json' }
//         }
//     )

//     // } catch (error) {
//     //     return Response.json(
//     //         {
//     //             error
//     //         },
//     //         {
//     //             status: 400, statusText: 'Credential invalid',
//     //             headers: { 'content-type': 'application/json' }
//     //         }
//     //     )

//     // }

// }