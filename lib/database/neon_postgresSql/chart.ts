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
    count(CASE WHEN "Barang".seri_barang ='1' THEN "Header".kode_dokumen END) AS jumlah,
    SUM("Barang".cif::numeric) as cif,
    SUM("Barang".cif::numeric*"Barang".ndpbm::numeric) AS cif_idr,
    SUM(CASE WHEN "Barang".kode_kategori_barang = '11' THEN "Barang".cif::numeric ELSE 0 END) AS cif_bahan_baku_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang = '11' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang != '11' THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_23,
    SUM(CASE WHEN "Barang".kode_kategori_barang != '11' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_23,
    SUM(CASE 
            WHEN ("Barang".kode_barang LIKE '%1-0%') AND  ("Barang".cif::numeric>0) AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric 
            WHEN ("Barang".kode_barang LIKE '%1-0%') AND  ("Barang".cif::numeric=0) AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric
            ELSE 0 
        END) AS cif_bahan_baku_bc_27,   
    SUM(CASE WHEN ("Barang".kode_barang LIKE '%1-0%') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_27,
    SUM(CASE WHEN ("Barang".kode_barang NOT LIKE '%1-0%') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_27,
    SUM(CASE WHEN ("Barang".kode_barang NOT LIKE '%1-0%') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_27,
    SUM(CASE 
            WHEN ("Barang".kode_barang LIKE '%1-0%') AND  ("Barang".cif::numeric>0) AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric 
            WHEN ("Barang".kode_barang LIKE '%1-0%') AND  ("Barang".cif::numeric=0) AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric
            ELSE 0 
        END) AS cif_bahan_baku_bc_27_out,
        SUM(CASE WHEN ("Barang".kode_barang LIKE '%1-0%') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku_bc_27_out,
    SUM(CASE WHEN ("Barang".kode_barang NOT LIKE '%1-0%') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya_bc_27_out,
    SUM(CASE WHEN ("Barang".kode_barang NOT LIKE '%1-0%') AND ("Barang".nomor_aju LIKE '%0000270219892%') THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya_bc_27_out,
    SUM(CASE WHEN ("Barang".kode_barang LIKE '%1-0%') AND ("Barang".nomor_aju NOT LIKE '%0000270219892%') THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_bahan_baku,
    SUM(CASE WHEN "Barang".kode_barang NOT LIKE '%1-0%' THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_lainnya,
    SUM(CASE WHEN "Header".kode_jenis_ekspor = '1' THEN "Barang".fob::numeric ELSE 0 END) AS fob,
    SUM(CASE WHEN "Header".kode_jenis_ekspor = '1' THEN "Barang".fob::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS fob_rupiah,
    "Header".kode_valuta
    FROM "Header"
    inner JOIN "Barang" ON "Barang".nomor_aju = "Header".nomor_aju
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    GROUP BY kode_dok,"Header".kode_valuta
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
        SUM(CASE WHEN "Header".kode_tujuan_pengiriman LIKE '1' AND ("Header".kode_valuta ='USD') THEN ("Barang".cif::numeric*"Barang".ndpbm::numeric) 
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