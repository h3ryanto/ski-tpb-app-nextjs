"use server";
import { neon } from "@neondatabase/serverless";
import { prisma } from '@/lib/prisma/init'

export async function getData(limit: number = 10, skip: number = 0, query: any) {
    const posts = await prisma.header.findMany({
        relationLoadStrategy: 'join',
        select: {
            kode_dokumen: true,
            nomor_aju: true,
            nomor_daftar: true,
            tanggal_daftar: true,
            entitas: {

                select: {
                    kode_entitas: true,
                    nama_entitas: true
                }
            },

        },
        where: {
            OR: [{
                entitas: {
                    some: {
                        nama_entitas: {
                            contains: query,
                            mode: 'insensitive',
                        }

                    }
                },
            },
            {
                nomor_daftar: {
                    contains: query,
                    mode: 'insensitive',
                }
            },
            {
                nomor_aju: {
                    contains: query,
                    mode: 'insensitive',
                }
            },
            ],
        },
        orderBy: {
            created_at: 'desc',
        },
        skip: skip,
        take: limit,
    });

    const postsAll = await prisma.header.findMany({
        relationLoadStrategy: 'join',
        select: {
            kode_dokumen: true,
            nomor_aju: true,
            nomor_daftar: true,
            tanggal_daftar: true,
            entitas: {

                select: {
                    kode_entitas: true,
                    nama_entitas: true
                }
            },
        },
        where: {
            OR: [{
                entitas: {
                    some: {
                        nama_entitas: {
                            contains: query,
                            mode: 'insensitive',
                        }

                    }
                },
            },
            {
                nomor_daftar: {
                    contains: query,
                    mode: 'insensitive',
                }
            },
            {
                nomor_aju: {
                    contains: query,
                    mode: 'insensitive',
                }
            },
            ],

        },

        orderBy: {
            created_at: 'desc',
        },
    });

    const headerCount = postsAll.length;
    return { posts, headerCount };


}


export async function retriveData(limit: number = 10, skip: number = 0, query: any = '', filter: any = '') {
    let date_from: string;
    let date_to: string;
    console.log(filter)
    if (filter.date_from && filter.date_to) {
        date_from = filter.date_from;
        date_to = filter.date_to;
    } else {
        date_from = '1900-01-01';
        date_to = new Date().toISOString().split('T')[0];
        // console.log(date_to)
    }
const sortColumn = '"Header".'+filter.sortColumn || '"Header".id'; // Default ke 'Header.id' jika tidak ada
const sortOrder = filter.sortOrder === 'DESC' ? 'DESC' : 'ASC'; // 

    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
        SELECT 
            "Header".kode_dokumen, 
            "Header".nomor_aju, 
            "Entitas".kode_entitas,
            "Entitas".nama_entitas,
            "Entitas".nomor_identitas,
            "Entitas".alamat_entitas, 
            "Entitas".nomor_identitas,  
            "Entitas".nib_entitas,
            "Header".nomor_daftar, 
            TO_CHAR("Header".tanggal_daftar, 'YYYY') AS tahun, 
            TO_CHAR("Header".tanggal_daftar, 'YYYY-MM-DD') AS ftanggal_daftar, 
            (
            SELECT 
                json_agg(json_build_object('id',"Dokumen".id,'kode_dokumen',"Dokumen".kode_dokumen,'nomor_dokumen', "Dokumen".nomor_dokumen,'tanggal_dokumen',TO_CHAR("Dokumen".tanggal_dokumen, 'YYYY-MM-DD'))) 
            from 
                "Dokumen" 
            WHERE 
                "Dokumen".nomor_aju = "Header".nomor_aju
            )
            AS
                Dokumens,
                
            (
            SELECT 
                json_agg(json_build_object('hs',"Barang".hs,'id',"Barang".id,'kode_barang',"Barang".kode_barang,'uraian', "Barang".uraian, 'tipe',"Barang".tipe,
                'jumlah_satuan',"Barang".jumlah_satuan,'kode_satuan',"Barang".kode_satuan,'cif',"Barang".cif,'harga_penyerahan',"Barang".harga_penyerahan,'fob',"Barang".fob,'valuta',"Header".kode_valuta)) 
            FROM "Barang" 
            WHERE 
                "Barang".nomor_aju = "Header".nomor_aju
            )
            AS
                Barang
        FROM 
            "Header" 
        
        LEFT JOIN 
            "Entitas" 
        ON 
            "Header".nomor_aju = "Entitas".nomor_aju
        WHERE 
        "Entitas".kode_entitas = 
                CASE
                    WHEN "Header".kode_dokumen = '23' THEN '5'
                    WHEN "Header".kode_dokumen = '40' THEN '9'
                    WHEN "Header".kode_dokumen = '27' THEN '3'
                    WHEN "Header".kode_dokumen = '30' THEN '8'
                    WHEN "Header".kode_dokumen = '262' THEN '9'
                    WHEN "Header".kode_dokumen = '261' THEN '8'
                    WHEN "Header".kode_dokumen = '41' THEN '8'
                    WHEN "Header".kode_dokumen = '25' THEN '8'
                    WHEN "Header".kode_dokumen = '33' THEN '8'
                END                
        AND
        ( 
        "Entitas".nama_entitas ILIKE ${'%' + query + '%'}
        OR
        "Header".nomor_aju ILIKE ${'%' + query + '%'}
        OR
        "Header".nomor_daftar ILIKE ${'%' + query + '%'}
        OR
        "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Dokumen" WHERE nomor_dokumen ILIKE ${'%' + query + '%'})
        OR
        "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Barang" WHERE uraian ILIKE ${'%' + query + '%'})
        )
        AND
        "Header".kode_dokumen LIKE ${'%' + filter.kode_dokumen + '%'}
        AND
        "Entitas".nama_entitas ILIKE ${'%' + filter.entitas + '%'}
        AND
        "Header".nomor_aju ILIKE ${'%' + filter.nomor_aju + '%'}
        AND
        "Header".nomor_daftar ILIKE ${'%' + filter.nomor_daftar + '%'}
        AND
        "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Dokumen" WHERE nomor_dokumen ILIKE ${'%' + filter.nomor_dokumen + '%'})
        AND
        "Header".tanggal_daftar between ${"'" + date_from + "'"} AND ${"'" + date_to + "'"}
        ORDER BY
       ${sql`${sortColumn}`} ${sql`${sortOrder}`}          

        DESC
        LIMIT 
        ${limit}
    OFFSET 
        ${skip}
        `;

    return posts;
}

export async function countData(query: any = '', filter: any = '') {
    let date_from: string;
    let date_to: string;

    console.log(filter)
    if (filter.date_from && filter.date_to) {
        date_from = filter.date_from;
        date_to = filter.date_to;
    } else {
        date_from = '1900-01-01';
        date_to = new Date().toISOString().split('T')[0];
        // console.log(date_to)
    }

    const sql = neon(`${process.env.DATABASE_URL} `);

    const count = await sql`
    SELECT
    "Header".kode_dokumen,
        "Header".nomor_aju,
        "Entitas".kode_entitas,
        "Entitas".nama_entitas,
        "Header".nomor_daftar,
        TO_CHAR("Header".tanggal_daftar, 'YYYY-MM-DD') AS ftanggal_daftar
    FROM
    "Header" 
        LEFT JOIN
    "Entitas"
    ON
    "Entitas".nomor_aju = "Header".nomor_aju

    WHERE
    "Entitas".kode_entitas =
        CASE
                    WHEN "Header".kode_dokumen = '23' THEN '5'
                    WHEN "Header".kode_dokumen = '40' THEN '9'
                    WHEN "Header".kode_dokumen = '27' THEN '3'
                    WHEN "Header".kode_dokumen = '30' THEN '8'
                    WHEN "Header".kode_dokumen = '262' THEN '9'
                    WHEN "Header".kode_dokumen = '261' THEN '8'
                    WHEN "Header".kode_dokumen = '41' THEN '8'
                    WHEN "Header".kode_dokumen = '25' THEN '8'
                    WHEN "Header".kode_dokumen = '33' THEN '8'
    END
    AND
        (
            "Entitas".nama_entitas ILIKE ${'%' + query + '%'}  
        OR 
        "Header".nomor_aju ILIKE ${'%' + query + '%'}
        OR 
        "Header".nomor_daftar ILIKE ${'%' + query + '%'}        
         OR
        "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Dokumen" WHERE nomor_dokumen ILIKE ${'%' + query + '%'}) 
        OR
        "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Barang" WHERE uraian ILIKE ${'%' + query + '%'})
        )
    AND
    "Header".kode_dokumen LIKE ${'%' + filter.kode_dokumen + '%'}
    AND
    "Entitas".nama_entitas ILIKE ${'%' + filter.entitas + '%'}
    AND
    "Header".nomor_aju ILIKE ${'%' + filter.nomor_aju + '%'}
    AND
    "Header".nomor_daftar ILIKE ${'%' + filter.nomor_daftar + '%'}
    AND
    "Header".nomor_aju = ANY(SELECT nomor_aju FROM "Dokumen" WHERE nomor_dokumen ILIKE ${'%' + filter.nomor_dokumen + '%'})
    AND
    "Header".tanggal_daftar between ${"'" + date_from + "'"} AND ${"'" + date_to + "'"}
        ORDER BY
    "Header".id DESC`;
    return count;
}
