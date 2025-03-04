"use server";
import { neon } from "@neondatabase/serverless";


export async function retriveDataChart({ date_from, date_to }: { date_from?: string, date_to?: string }) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const posts = await sql`
    SELECT
    "Header".kode_dokumen,
    count(CASE WHEN "Barang".seri_barang ='1' THEN "Header".kode_dokumen END) AS jumlah,
    SUM(CASE WHEN "Barang".kode_barang LIKE '%1-0%' THEN "Barang".cif::numeric ELSE 0 END) AS cif_bahan_baku,
    SUM(CASE WHEN "Barang".kode_barang LIKE '%1-0%' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_bahan_baku,
    SUM(CASE WHEN "Barang".kode_barang NOT LIKE '%1-0%' THEN "Barang".cif::numeric ELSE 0 END) AS cif_lainnya,
    SUM(CASE WHEN "Barang".kode_barang NOT LIKE '%1-0%' THEN "Barang".cif::numeric*"Barang".ndpbm::numeric ELSE 0 END) AS cif_idr_lainnya,
    SUM(CASE WHEN "Barang".kode_barang LIKE '%1-0%' THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_bahan_baku,
    SUM(CASE WHEN "Barang".kode_barang NOT LIKE '%1-0%' THEN "Barang".harga_penyerahan::numeric ELSE 0 END) AS penyerahan_lainnya,
    SUM("Header".cif*"Header".ndpbm) AS cif_rupiah,
    SUM("Header".cif) AS cif,
    SUM("Header".fob) AS fob,
    SUM("Header".fob*"Header".ndpbm) AS fob_rupiah,
    SUM("Header".harga_penyerahan) AS penyerahan,
    "Header".kode_valuta
    FROM "Header"
    inner JOIN "Barang" ON "Barang".nomor_aju = "Header".nomor_aju
    WHERE
    "Header".tanggal_daftar BETWEEN ${`'${date_from}'`} AND ${`'${date_to}'`}
    GROUP BY "Header".kode_dokumen,kode_valuta
    ORDER BY "Header".kode_dokumen`
    return posts;
}