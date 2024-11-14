import { sql } from "@vercel/postgres";
export async function retriveData(){
    const { rows } = await sql`SELECT headers.id,headers.kode_dokumen,headers.nomor_aju,headers.nomor_daftar, 
    TO_CHAR(headers.tanggal_daftar, 'DD/MM/YYYY') AS ftanggal_daftar,entitas.nama_entitas
    FROM headers 
    INNER JOIN entitas ON entitas.nomor_aju = headers.nomor_aju 
    WHERE entitas.kode_entitas = 
    (CASE
        WHEN headers.kode_dokumen ='23' THEN '3'
        WHEN headers.kode_dokumen ='40' THEN '5'
        WHEN headers.kode_dokumen ='27' THEN '3'
        WHEN headers.kode_dokumen ='30' THEN '6'
        WHEN headers.kode_dokumen ='262' THEN '9'
        WHEN headers.kode_dokumen ='261' THEN '8'
        WHEN headers.kode_dokumen ='41' THEN '8'
        WHEN headers.kode_dokumen ='25' THEN '8'
        WHEN headers.kode_dokumen ='33' THEN '8'
    END)
    ORDER BY headers.created_at DESC
    LIMIT 10 offset 1`;

   

    return rows;
}

