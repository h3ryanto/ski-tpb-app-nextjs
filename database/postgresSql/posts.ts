"use server";
import { neon } from "@neondatabase/serverless";
import { prisma } from '@/lib/prisma/db'

export async function getData(limit: number = 10, skip: number = 0) {

    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`SELECT "Header".kode_dokumen, "Header".nomor_aju, "Entitas".kode_entitas,"Entitas".nama_entitas, "Header".nomor_daftar, TO_CHAR("Header".tanggal_daftar,'YYYY-MM-DD') AS ftanggal_daftar 
                    FROM "Header" 
                    LEFT JOIN "Entitas" ON "Entitas".nomor_aju="Header".nomor_aju
                    WHERE 
                    "Entitas".kode_entitas =
                        CASE
                        WHEN "Header".kode_dokumen ='23' THEN '5'
                        WHEN "Header".kode_dokumen ='40' THEN '9'
                        WHEN "Header".kode_dokumen ='27' THEN '3'
                        WHEN "Header".kode_dokumen ='30' THEN '6'
                        WHEN "Header".kode_dokumen ='262' THEN '9'
                        WHEN "Header".kode_dokumen ='261' THEN '8'
                        WHEN "Header".kode_dokumen ='41' THEN '8'
                        WHEN "Header".kode_dokumen ='25' THEN '8'
                        WHEN "Header".kode_dokumen ='33' THEN '8'
                        END
                    ORDER BY "Header".id DESC
                    LIMIT ${limit} OFFSET ${skip}
                    ORDER BY "Header".created_at DESC`;
    const headerCount = await prisma.header.count()
    return { posts, headerCount };
}


// export async function retriveData(limit: number = 10, skip: number = 0) {

//     const sql = neon(`${process.env.DATABASE_URL}`);

//     const posts = await sql`SELECT * FROM "Header" LIMIT ${limit} OFFSET ${skip}`;
//     return { posts, headerCount };
// }
