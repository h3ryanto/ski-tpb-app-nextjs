"use server";
import { neon } from "@neondatabase/serverless";
import { prisma } from '@/lib/prisma/init';
import { format } from "date-fns";


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

export async function retriveHeader(aju: string) {
    const posts = await prisma.header.findMany({
        where: {
            nomor_aju: aju
        },
    })

    const data = posts.map((post) => {
        return {
            'NOMOR AJU': post.nomor_aju,
            'KODE DOKUMEN': post.kode_dokumen,
            'KODE KANTOR': post.kode_kantor,
            'KODE KANTOR BONGKAR': post.kode_kantor_bongkar,
            'KODE KANTOR PERIKSA': post.kode_kantor_periksa,
            'KODE KANTOR TUJUAN': post.kode_kantor_tujuan,
            'KODE KANTOR EKSPOR': post.kode_kantor_ekspor,
            'KODE JENIS IMPOR': post.kode_jenis_impor,
            'KODE JENIS EKSPOR': post.kode_jenis_ekspor,
            'KODE JENIS TPB': post.kode_jenis_tpb,
            'KODE JENIS PLB': post.kode_jenis_plb,
            'KODE JENIS PROSEDUR': post.kode_jenis_prosedur,
            'KODE TUJUAN PEMASUKAN': post.kode_tujuan_pemasukan,
            'KODE TUJUAN PENGIRIMAN': post.kode_tujuan_pengiriman,
            'KODE TUJUAN TPB': post.kode_tujuan_tpb,
            'KODE CARA DAGANG': post.kode_cara_dagang,
            'KODE CARA BAYAR': post.kode_cara_bayar,
            'KODE CARA BAYAR LAINNYA': post.kode_cara_bayar_lainnya,
            'KODE GUDANG ASAL': post.kode_gudang_asal,
            'KODE GUDANG TUJUAN': post.kode_gudang_tujuan,
            'KODE JENIS KIRIM': post.kode_jenis_kirim,
            'KODE JENIS PENGIRIMAN': post.kode_jenis_pengiriman,
            'KODE KATEGORI EKSPOR': post.kode_kategori_ekspor,
            'KODE KATEGORI MASUK FTZ': post.kode_kategori_masuk_ftz,
            'KODE KATEGORI KELUAR FTZ': post.kode_kategori_keluar_ftz,
            'KODE KATEGORI BARANG FTZ': post.kode_kategori_barang_ftz,
            'KODE LOKASI': post.kode_lokasi,
            'KODE LOKASI BAYAR': post.kode_lokasi_bayar,
            'LOKASI ASAL': post.lokasi_asal,
            'LOKASI TUJUAN': post.lokasi_tujuan,
            'KODE DAERAH ASAL': post.kode_daerah_asal,
            'KODE GUDANG ASAL ': post.kode_gudang_asal,
            'KODE GUDANG TUJUAN ': post.kode_gudang_tujuan,
            'KODE NEGARA TUJUAN': post.kode_negara_tujuan,
            'KODE TUTUP PU': post.kode_tutup_pu,
            'NOMOR BC11': post.nomor_bc11,
            'TANGGAL BC11': post.tanggal_bc11,
            'NOMOR POS': post.nomor_pos,
            'NOMOR SUB POS': post.nomor_sub_pos,
            'KODE PELABUHAN BONGKAR': post.kode_pelabuhan_bongkar,
            'KODE PELABUHAN MUAT': post.kode_pelabuhan_muat,
            'KODE PELABUHAN MUAT AKHIR': post.kode_pelabuhan_muat_akhir,
            'KODE PELABUHAN TRANSIT': post.kode_pelabuhan_transit,
            'KODE PELABUHAN TUJUAN': post.kode_pelabuhan_tujuan,
            'KODE PELABUHAN EKSPOR': post.kode_pelabuhan_ekspor,
            'KODE TPS': post.kode_tps,
            'TANGGAL BERANGKAT': post.tanggal_berangkat,
            'TANGGAL EKSPOR': post.tanggal_ekspor,
            'TANGGAL MASUK': post.tanggal_masuk,
            'TANGGAL MUAT': post.tanggal_muat,
            'TANGGAL TIBA': post.tanggal_tiba,
            'TANGGAL PERIKSA': post.tanggal_periksa,
            'TEMPAT STUFFING': post.tempat_stuffing,
            'TANGGAL STUFFING': post.tanggal_stuffing,
            'KODE TANDA PENGAMAN': post.kode_tanda_pengaman,
            'JUMLAH TANDA PENGAMAN': post.jumlah_tanda_pengaman,
            'FLAG CURAH': post.flag_curah,
            'FLAG SDA': post.flag_sda,
            'FLAG VD': post.flag_vd,
            'FLAG AP BK': post.flag_ap_bk,
            'FLAG MIGAS': post.flag_migas,
            'KODE ASURANSI': post.kode_asuransi,
            'ASURANSI': post.asuransi,
            'NILAI BARANG': post.nilai_barang,
            'NILAI INCOTERM': post.nilai_incoterm,
            'NILAI MAKLON': post.nilai_maklon,
            'ASURANSI ': post.asuransi,
            'FREIGHT': post.freight,
            'FOB': post.fob,
            'BIAYA TAMBAHAN': post.biaya_tambahan,
            'BIAYA PENGURANG': post.biaya_pengurang,
            'VD': post.vd,
            'CIF': post.cif,
            'HARGA_PENYERAHAN': post.harga_penyerahan,
            'NDPBM': post.ndpbm,
            'TOTAL DANA SAWIT': post.total_dana_sawit,
            'DASAR PENGENAAN PAJAK': post.dasar_pengenaan_pajak,
            'NILAI JASA': post.nilai_jasa,
            'UANG MUKA': post.uang_muka,
            'BRUTO': post.bruto,
            'NETTO': post.netto,
            'VOLUME': post.volume,
            'KOTA PERNYATAAN': post.kota_pernyataan,
            'TANGGAL PERNYATAAN': post.tanggal_pernyataan,
            'NAMA PERNYATAAN': post.nama_pernyataan,
            'JABATAN PERNYATAAN': post.jabatan_pernyataan,
            'KODE VALUTA': post.kode_valuta,
            'KODE INCOTERM': post.kode_incoterm,
            'KODE JASA KENA PAJAK': post.kode_jasa_kena_pajak,
            'NOMOR BUKTI BAYAR': post.nomor_bukti_bayar,
            'TANGGAL BUKTI BAYAR': post.tanggal_bukti_bayar,
            'KODE JENIS NILAI': post.kode_jenis_nilai,
            'KODE KANTOR MUAT': post.kode_kantor?.toString() ?? '',
            'NOMOR DAFTAR': post.nomor_daftar,
            'TANGGAL DAFTAR': format(post.tanggal_daftar, "yyyy-MM-dd"),
            'KODE ASAL BARANG FTZ': '',
            'KODE TUJUAN PENGELUARAN': post.kode_tujuan_pengiriman?.toString() ?? '',
            'PPN PAJAK': '',
            'PPNBM PAJAK': '',
            'TARIF PPN PAJAK': '',
            'TARIF PPNBM PAJAK': '',
            'BARANG TIDAK BERWUJUD': '',
            'KODE JENIS PENGELUARAN': '',
            'BARANG KIRIMAN': '',
            'KODE JENIS PENGANGKUTAN': '',
        }
    })
    return data;
}