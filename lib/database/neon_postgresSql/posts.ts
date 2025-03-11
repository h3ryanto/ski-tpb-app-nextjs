"use server";
import { neon } from "@neondatabase/serverless";
import { prisma } from '@/lib/prisma/init';


export async function getData(limit: number = 10, skip: number = 0, query: any = '', filter: any = '') {
    let date_from: string;
    let date_to: string;
    // console.log(filter)
    if (filter.date_from && filter.date_to) {
        date_from = filter.date_from;
        date_to = filter.date_to;
    } else {
        date_from = '1900-01-01';
        date_to = new Date().toISOString().split('T')[0];
    }
    const posts = await prisma.header.findMany({
        select: {
            id: true,
            kode_dokumen: true,
            nomor_aju: true,
            nomor_daftar: true,
            tanggal_daftar: true,
            kode_valuta: true,
            ndpbm: true,
            asuransi: true,
            freight: true,
            cif: true,
            kode_incoterm: true,
            harga_penyerahan: true,
            biaya_pengurang: true,
            biaya_tambahan: true,
            kode_kantor: true,
            kode_kantor_tujuan: true,
            kode_kantor_ekspor: true,
            kode_kantor_bongkar: true,
            kode_tujuan_tpb: true,
            kode_jenis_tpb: true,
            entitas: {
                select: {
                    id: true,
                    kode_entitas: true,
                    nama_entitas: true,
                    alamat_entitas: true,
                    nomor_identitas: true,
                    nib_entitas: true,
                    header: {
                        select: {
                            kode_dokumen: true
                        }
                    }
                }
            },
            dokumen: {
                select: {
                    id: true,
                    kode_dokumen: true,
                    nomor_dokumen: true,
                    tanggal_dokumen: true,
                },
            },
            kemasan: true,
            kontainer: true,
            barang: {
                select: {
                    id: true,
                    kode_barang: true,
                    uraian: true,
                    hs: true,
                    jumlah_satuan: true,
                    kode_satuan: true,
                    cif: true,
                    fob: true,
                    harga_penyerahan: true,
                    tipe: true,
                    ndpbm: true,
                    header: {
                        select: {
                            kode_valuta: true
                        }
                    }
                }
            },
        },
        where: {
            kode_dokumen: {
                contains: filter.kode_dokumen,
                mode: 'insensitive',
            },
            nomor_aju: {
                contains: filter.nomor_aju,
                mode: 'insensitive',
            },
            nomor_daftar: {
                contains: filter.nomor_daftar,
                mode: 'insensitive',
            },
            tanggal_daftar: {
                gte: new Date(date_from),
                lte: new Date(date_to),
            },
            entitas: {
                some: {
                    nama_entitas: { contains: filter.entitas, mode: 'insensitive' },
                    // kode_entitas: { in: filter.entitas ? ['9'] : [], mode: 'insensitive' },
                },
            },

            dokumen: {
                some: {
                    nomor_dokumen: { contains: filter.nomor_dokumen, mode: 'insensitive' }
                }
            },
            OR: [
                { nomor_aju: { contains: query, mode: 'insensitive' } },
                { nomor_daftar: { contains: query, mode: 'insensitive' } },
                {
                    dokumen: {
                        some: {
                            nomor_dokumen: { contains: query, mode: 'insensitive' },
                        },
                    },
                },
                {
                    barang: {
                        some: {
                            uraian: { contains: query, mode: 'insensitive' },
                        },
                    },
                },
                {
                    barang: {
                        some: {
                            tipe: { contains: query, mode: 'insensitive' },
                        },
                    },
                },
                {
                    barang: {
                        some: {
                            kode_barang: { contains: query, mode: 'insensitive' },
                        },
                    },
                },
                {
                    entitas: {
                        some: {
                            nama_entitas: { contains: query, mode: 'insensitive' },
                        },
                    },
                },
            ],
        },
        orderBy: {
            [filter.sortBy || 'id']: filter.asc === true ? 'asc' : 'desc',
        },
        take: limit,
        skip: skip,
    });

    return posts;
}

export async function retriveData(limit: number = 10, skip: number = 0, query: any = '', filter: any = '') {
    let date_from: string;
    let date_to: string;
    // console.log(filter)
    if (filter.date_from && filter.date_to) {
        date_from = filter.date_from;
        date_to = filter.date_to;
    } else {
        date_from = '1900-01-01';
        date_to = new Date().toISOString().split('T')[0];
    }
    let sortBy: string = `id`;
    if (filter.sortBy === undefined) {
        sortBy = `id`;
    } else
        if (filter.sortBy === 'nomor_aju') {
            sortBy = `nomor_aju`;
        } else if (filter.sortBy === 'kode_dokumen') {
            sortBy = `kode_dokumen`;
        } else if (filter.sortBy === 'nama_entitas') {
            sortBy = `"Entitas".nama_entitas`;
        } else if (filter.sortBy === 'tanggal_daftar') {
            sortBy = `tanggal_daftar`;
        }
    console.log(sortBy)



    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
    SELECT 
        "Header".id,
        "Header".kode_dokumen, 
        "Header".kode_kantor,
        "Header".kode_kantor_tujuan,
        "Header".kode_kantor_ekspor,
        "Header".kode_kantor_bongkar, 
        "Header".nomor_aju, 
        "Entitas".kode_entitas,
        "Entitas".nama_entitas,
        "Entitas".nomor_identitas,
        "Entitas".alamat_entitas, 
        "Entitas".nomor_identitas,  
        "Entitas".nib_entitas,
        "Header".nomor_daftar, 
        "Header".ndpbm,
        "Header".kode_valuta,
        "Header".asuransi,
        "Header".freight,
        "Header".cif,
        "Header".kode_incoterm,
        "Header".harga_penyerahan,
        "Header".biaya_pengurang,
        "Header".biaya_tambahan,
        "Header".kode_tujuan_tpb,
        "Header".kode_jenis_tpb,
        TO_CHAR("Header".tanggal_daftar, 'YYYY') AS tahun, 
        TO_CHAR("Header".tanggal_daftar, 'YYYY-MM-DD') AS ftanggal_daftar, 
        (
        SELECT 
            json_agg(json_build_object('id',"Entitas".id,'kode_entitas',"Entitas".kode_Entitas,'nama_entitas', "Entitas".nama_entitas,'nomor_identitas',"Entitas".nomor_identitas,'alamat_entitas',"Entitas".alamat_entitas,
            'nomor_ijin_entitas',"Entitas".nomor_ijin_entitas,'nib_entitas',"Entitas".nib_entitas) ORDER BY kode_entitas ASC) 
        from 
            "Entitas" 
        WHERE 
            "Entitas".nomor_aju = "Header".nomor_aju     
        )
        AS
            DetailEntitas,
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
    ORDER BY "Header".id DESC   
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

    // console.log(filter)
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

