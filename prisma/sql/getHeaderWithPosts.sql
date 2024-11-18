SELECT header.id,header.kode_dokumen,header.nomor_aju,header.nomor_daftar, 
    TO_CHAR(headers.tanggal_daftar, 'DD/MM/YYYY') AS ftanggal_daftar,entitas.nama_entitas
    FROM header
    LEFT JOIN entitas ON entitas.nomor_aju = header.nomor_aju 
    WHERE entitas.kode_entitas = 
    CASE
        WHEN header.kode_dokumen ='23' THEN '3'
        WHEN header.kode_dokumen ='40' THEN '5'
        WHEN header.kode_dokumen ='27' THEN '3'
        WHEN header.kode_dokumen ='30' THEN '6'
        WHEN header.kode_dokumen ='262' THEN '9'
        WHEN header.kode_dokumen ='261' THEN '8'
        WHEN header.kode_dokumen ='41' THEN '8'
        WHEN header.kode_dokumen ='25' THEN '8'
        WHEN header.kode_dokumen ='33' THEN '8'
    END
    ORDER BY header.created_at DESC
    LIMIT 10 offset 1