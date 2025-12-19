"use server";
import { neon } from "@neondatabase/serverless";


export async function retriveDataChart({ date_from, date_to }: { date_from?: string, date_to?: string }) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
    SELECT
    CASE 
        WHEN "Header".nomor_aju NOT LIKE '%0000270219892%' AND "Header".kode_dokumen = '27' THEN concat("Header".kode_dokumen,'_IN') 
        WHEN "Header".nomor_aju LIKE '%0000270219892%' AND "Header".kode_dokumen = '27' THEN concat("Header".kode_dokumen,'_OUT') 
        WHEN "Header".kode_dokumen <> '27' THEN "Header".kode_dokumen
    END AS kode_dok,
      CASE 
        WHEN "Header".kode_dokumen = '25' THEN 'IDR' 
        ELSE "Header".kode_valuta
    END AS kurs,
    count(CASE WHEN "Barang".seri_barang ='1' THEN "Header".kode_dokumen END) AS jumlah,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='23' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_23,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='25' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_25,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='30' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_30,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='40' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_40,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='41' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_41,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='261' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_261,
    (SELECT count(kode_dokumen) FROM "Header" WHERE kode_dokumen='262' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_262,
    (SELECT count(kode_dokumen) FROM "Header" WHERE "Header".nomor_aju LIKE '%0000270219892%' AND kode_dokumen='27' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_27_out,
    (SELECT count(kode_dokumen) FROM "Header" WHERE "Header".nomor_aju NOT LIKE '%0000270219892%' AND kode_dokumen='27' AND tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_dok_27_in,
    SUM("Barang".cif::numeric) as cif,
    SUM("Barang".cif::numeric*"Barang".ndpbm::numeric) AS cif_idr,
    SUM(CASE WHEN "Barang".kode_kategori_barang = '11' THEN "Barang".cif::numeric ELSE 0 END) AS cif_bahan_baku_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang = '11' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang != '11' THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang != '11' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_23,
    SUM(CASE 
            WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND  ("Barang".cif::numeric>0) AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric 
            WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND  ("Barang".cif::numeric=0) AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric
            ELSE 0 
        END) AS cif_bahan_baku_bc_27,   
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_27,
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman NOT LIKE '1') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_27,
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman NOT LIKE '1') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_27,
    SUM(CASE 
            WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND  ("Barang".cif::numeric>0) AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric 
            WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND  ("Barang".cif::numeric=0) AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric
            ELSE 0 
        END) AS cif_bahan_baku_bc_27_out,
        SUM(CASE WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_27_out,
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman NOT LIKE '1') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_27_out,
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman NOT LIKE '1') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_27_out,
    SUM(CASE WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_bahan_baku,
    SUM(CASE WHEN "Barang".kode_barang NOT LIKE '%1-0%' THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_lainnya,
    SUM(CASE WHEN "Header".kode_jenis_ekspor = '1' THEN COALESCE(NULLIF("Barang".fob, '')::numeric, 0) ELSE 0 END) AS fob,
    SUM(CASE WHEN "Header".kode_jenis_ekspor = '1' THEN COALESCE(NULLIF("Barang".fob, '')::numeric, 0) * COALESCE(NULLIF("Barang".ndpbm, '')::numeric, 0) ELSE 0 END) AS fob_rupiah,
    SUM(CASE WHEN "Header".kode_jenis_ekspor != '1' THEN COALESCE(NULLIF("Barang".fob, '')::numeric, 0) ELSE 0 END) AS fob_lainnya,
    SUM(CASE WHEN "Header".kode_jenis_ekspor != '1' THEN COALESCE(NULLIF("Barang".fob, '')::numeric, 0) * COALESCE(NULLIF("Barang".ndpbm, '')::numeric, 0) ELSE 0 END) AS fob_rupiah_lainnya
    FROM "Header"
    inner JOIN "Barang" ON "Barang".nomor_aju = "Header".nomor_aju
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    GROUP BY kode_dok,kurs
    ORDER BY kode_dok`
    return posts;
}

export async function retriveDataStatikChart({ date_from, date_to }: { date_from?: string, date_to?: string }) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
    SELECT
    "Header".kode_dokumen AS dokumen,
    (CASE
        WHEN SUM(CASE WHEN "Barang".kode_kategori_barang LIKE '%11%' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END)>0 THEN
        SUM(CASE WHEN "Barang".kode_kategori_barang LIKE '%11%' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END)
        WHEN SUM(CASE WHEN "Header".kode_tujuan_pengiriman LIKE '1' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END)>0 THEN
        SUM(CASE WHEN "Header".kode_tujuan_pengiriman LIKE '1' AND ("Header".kode_valuta ='USD') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN ("Barang".cif::numeric*"Barang".ndpbm::numeric) 
                 WHEN ("Header".kode_tujuan_pengiriman LIKE '1') AND ("Header".kode_valuta ='IDR') THEN "Barang".harga_penyerahan::numeric
            ELSE 0 END)
        ELSE
        SUM(CASE WHEN "Header".kode_jenis_ekspor LIKE '1' THEN "Barang".fob::numeric*"Barang".ndpbm::numeric ELSE 0 END)
    END)::numeric AS harga,
   
    (CASE 
        WHEN "Header".kode_dokumen = '23' THEN 'var(--color-23)' 
        WHEN "Header".kode_dokumen = '27' THEN 'var(--color-27)'
        WHEN "Header".kode_dokumen = '30' THEN 'var(--color-30)'
        WHEN "Header".kode_dokumen = '33' THEN 'var(--color-33)'
        ELSE 'var(--color-other)'
    END) AS fill
    FROM "Header"
    inner JOIN "Barang" ON "Barang".nomor_aju = "Header".nomor_aju
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    AND
    "Header".kode_dokumen IN ('23','27','30','33')
    GROUP BY "Header".kode_dokumen
    ORDER BY "Header".kode_dokumen`
    const chartData =
        posts.map((data: any) => {
            return {
                browser: data.dokumen,
                visitors: Number(data.harga),
                fill: data.fill
            }
        })


    return chartData;
}

export async function countData({ date_from, date_to }: { date_from?: string, date_to?: string }) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const count = await sql`
    SELECT
    COUNT("Header".kode_dokumen) AS jumlah
    FROM "Header"
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    GROUP BY kode_dokumen
    ORDER BY jumlah DESC
    LIMIT 1`

    return count;

}


export async function retriveDataKontainer({ date_from, date_to }: { date_from?: string, date_to?: string }) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
    SELECT    
    "Header".kode_dokumen,
    (
        SELECT COUNT(*) FROM "Header" 
        inner JOIN "Kontainer" ON "Kontainer".nomor_aju = "Header".nomor_aju
        WHERE "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}) AS total_kontainer,
    (CASE 
    WHEN "Header".kode_dokumen = '23' THEN 'Import' 
    WHEN "Header".kode_dokumen = '30' OR "Header".kode_dokumen = '33' THEN concat('Eksport BC ',"Header".kode_dokumen) 
    END) AS "kontainer",
    COUNT(CASE WHEN "Kontainer".kode_ukuran_kontainer = '40' AND "Header".kode_dokumen ='23' THEN 1 END)::numeric AS "import_40",
    COUNT(CASE WHEN "Kontainer".kode_ukuran_kontainer = '20' AND "Header".kode_dokumen ='23' THEN 1 END)::numeric AS "import_20",
    COUNT(CASE WHEN "Kontainer".kode_ukuran_kontainer = '40' AND ("Header".kode_dokumen ='30' OR "Header".kode_dokumen ='33') THEN 1 END)::numeric AS "export_40",
    COUNT(CASE WHEN "Kontainer".kode_ukuran_kontainer = '20' AND ("Header".kode_dokumen ='30' OR "Header".kode_dokumen ='33') THEN 1 END)::numeric AS "export_20",
    COUNT(CASE 
            WHEN ("Header".kode_dokumen ='30' OR "Header".kode_dokumen ='33') THEN 1 
            WHEN "Header".kode_dokumen ='23'THEN 1 
    END)::numeric AS "jumlah",
    (CASE 
        WHEN "Header".kode_dokumen = '23' THEN 'var(--color-23)' 
        WHEN "Header".kode_dokumen = '30' THEN 'var(--color-30)'
        WHEN "Header".kode_dokumen = '33' THEN 'var(--color-33)'
        ELSE 'var(--color-other)'
    END) AS fill
    FROM "Header"
    inner JOIN "Kontainer" ON "Kontainer".nomor_aju = "Header".nomor_aju
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    AND
    "Header".kode_dokumen IN ('23','30','33')
    GROUP BY "Header".kode_dokumen
    ORDER BY "Header".kode_dokumen`
    // console.log(posts);
    return posts;
}

