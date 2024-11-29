-- CreateTable
CREATE TABLE "Header" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "kode_dokumen" TEXT,
    "kode_kantor" TEXT,
    "kode_kantor_bongkar" TEXT,
    "kode_kantor_periksa" TEXT,
    "kode_kantor_tujuan" TEXT,
    "kode_kantor_ekspor" TEXT,
    "kode_jenis_impor" TEXT,
    "kode_jenis_ekspor" TEXT,
    "kode_jenis_tpb" TEXT,
    "kode_jenis_plb" TEXT,
    "kode_jenis_prosedur" TEXT,
    "kode_tujuan_pemasukan" TEXT,
    "kode_tujuan_pengiriman" TEXT,
    "kode_tujuan_tpb" TEXT,
    "kode_cara_dagang" TEXT,
    "kode_cara_bayar" TEXT,
    "kode_cara_bayar_lainnya" TEXT,
    "kode_gudang_asal" TEXT,
    "kode_gudang_tujuan" TEXT,
    "kode_jenis_kirim" TEXT,
    "kode_jenis_pengiriman" TEXT,
    "kode_kategori_ekspor" TEXT,
    "kode_kategori_masuk_ftz" TEXT,
    "kode_kategori_keluar_ftz" TEXT,
    "kode_kategori_barang_ftz" TEXT,
    "kode_lokasi" TEXT,
    "kode_lokasi_bayar" TEXT,
    "lokasi_asal" TEXT,
    "lokasi_tujuan" TEXT,
    "kode_daerah_asal" TEXT,
    "kode_negara_tujuan" TEXT,
    "kode_tutup_pu" TEXT,
    "nomor_bc11" TEXT,
    "tanggal_bc11" TEXT,
    "nomor_pos" TEXT,
    "nomor_sub_pos" TEXT,
    "kode_pelabuhan_bongkar" TEXT,
    "kode_pelabuhan_muat" TEXT,
    "kode_pelabuhan_muat_akhir" TEXT,
    "kode_pelabuhan_transit" TEXT,
    "kode_pelabuhan_tujuan" TEXT,
    "kode_pelabuhan_ekspor" TEXT,
    "kode_tps" TEXT,
    "tanggal_berangkat" TEXT,
    "tanggal_ekspor" TEXT,
    "tanggal_masuk" TEXT,
    "tanggal_muat" TEXT,
    "tanggal_tiba" TEXT,
    "tanggal_periksa" TEXT,
    "tempat_stuffing" TEXT,
    "tanggal_stuffing" TEXT,
    "kode_tanda_pengaman" TEXT,
    "jumlah_tanda_pengaman" TEXT,
    "flag_curah" TEXT,
    "flag_sda" TEXT,
    "flag_vd" TEXT,
    "flag_ap_bk" TEXT,
    "flag_migas" TEXT,
    "kode_asuransi" TEXT,
    "asuransi" DECIMAL(65,30),
    "nilai_barang" DECIMAL(65,30),
    "nilai_incoterm" DECIMAL(65,30),
    "nilai_maklon" DECIMAL(65,30),
    "freight" DECIMAL(65,30),
    "fob" DECIMAL(65,30),
    "biaya_tambahan" DECIMAL(65,30),
    "biaya_pengurang" DECIMAL(65,30),
    "vd" DECIMAL(65,30),
    "cif" DECIMAL(65,30),
    "harga_penyerahan" DECIMAL(65,30),
    "ndpbm" DECIMAL(65,30),
    "total_dana_sawit" DECIMAL(65,30),
    "dasar_pengenaan_pajak" DECIMAL(65,30),
    "nilai_jasa" DECIMAL(65,30),
    "uang_muka" INTEGER,
    "bruto" INTEGER,
    "netto" INTEGER,
    "volume" INTEGER,
    "kota_pernyataan" TEXT,
    "tanggal_pernyataan" TEXT,
    "nama_pernyataan" TEXT,
    "jabatan_pernyataan" TEXT,
    "kode_valuta" TEXT,
    "kode_incoterm" TEXT,
    "kode_jasa_kena_pajak" TEXT,
    "nomor_bukti_bayar" TEXT,
    "tanggal_bukti_bayar" TEXT,
    "kode_jenis_nilai" TEXT,
    "nomor_daftar" TEXT,
    "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entitas" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "kode_entitas" TEXT,
    "kode_jenis_identitas" TEXT,
    "nomor_identitas" TEXT,
    "nama_entitas" TEXT,
    "alamat_entitas" TEXT,
    "nib_entitas" TEXT,
    "kode_jenis_api" TEXT,
    "kode_status" TEXT,
    "nomor_ijin_entitas" TEXT,
    "tanggal_ijin_entitas" TEXT,
    "kode_negara" TEXT,
    "niper_entitas" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "hs" TEXT,
    "kode_barang" TEXT,
    "uraian" TEXT,
    "merek" TEXT,
    "tipe" TEXT,
    "ukuran" TEXT,
    "spesifikasi_lain" TEXT,
    "kode_satuan" TEXT,
    "jumlah_satuan" DECIMAL(65,30),
    "kode_kemasan" TEXT,
    "jumlah_kemasan" TEXT,
    "kode_dokumen_asal" TEXT,
    "kode_kantor_asal" TEXT,
    "nomor_daftar_asal" TEXT,
    "tanggal_daftar_asal" TEXT,
    "nomor_aju_asal" TEXT,
    "seri_barang_asal" TEXT,
    "netto" TEXT,
    "bruto" TEXT,
    "volume" TEXT,
    "saldo_awal" TEXT,
    "saldo_akhir" TEXT,
    "jumlah_realisasi" TEXT,
    "cif" TEXT,
    "cif_rupiah" TEXT,
    "ndpbm" TEXT,
    "fob" TEXT,
    "asuransi" TEXT,
    "freight" TEXT,
    "nilai_tambah" TEXT,
    "diskon" TEXT,
    "harga_penyerahan" TEXT,
    "harga_perolehan" TEXT,
    "harga_satuan" TEXT,
    "harga_ekspor" TEXT,
    "harga_patokan" TEXT,
    "nilai_barang" TEXT,
    "nilai_jasa" TEXT,
    "nilai_dana_sawit" TEXT,
    "nilai_devisa" TEXT,
    "persentase_impor" TEXT,
    "kode_asal_barang" TEXT,
    "kode_daerah_asal" TEXT,
    "kode_guna_barang" TEXT,
    "kode_jenis_nilai" TEXT,
    "jatuh_tempo_royalti" TEXT,
    "kode_kategori_barang" TEXT,
    "kode_kondisi_barang" TEXT,
    "kode_negara_asal" TEXT,
    "kode_perhitungan" TEXT,
    "pernyataan_lartas" TEXT,
    "flag_4_tahun" TEXT,
    "seri_izin" TEXT,
    "tahun_pembuatan" TEXT,
    "kapasitas_silinder" TEXT,
    "kode_bkc" TEXT,
    "kode_komoditi_bkc" TEXT,
    "kode_sub_komoditi_bkc" TEXT,
    "flag_tis" TEXT,
    "isi_per_kemasan" TEXT,
    "umlah_dilekatkan" TEXT,
    "jumlah_pita_cukai" TEXT,
    "hje_cukai" TEXT,
    "tarif_cukai" TEXT,
    "stok" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dokumen" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "kode_dokumen" TEXT,
    "nomor_dokumen" TEXT,
    "tanggal_dokumen" TIMESTAMP(3),
    "kode_fasilitas" TEXT,
    "kode_ijin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kemasan" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "kode_kemasan" TEXT,
    "jumlah_kemasan" TEXT,
    "merek" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kemasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kontainer" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "nomor_kontiner" TEXT,
    "kode_ukuran_kontainer" TEXT,
    "kode_jenis_kontainer" TEXT,
    "kode_tipe_kontainer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kontainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bahan_Baku" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "seri_bahan_baku" TEXT,
    "kode_asal_bahan_baku" TEXT,
    "hs" TEXT,
    "kode_barang" TEXT,
    "uraian" TEXT,
    "merek" TEXT,
    "tipe" TEXT,
    "ukuran" TEXT,
    "spesifikasi_lain" TEXT,
    "kode_satuan" TEXT,
    "jumlah_satuan" TEXT,
    "kode_kemasan" TEXT,
    "jumlah_kemasan" TEXT,
    "kode_dokumen_asal" TEXT,
    "kode_kantor_asal" TEXT,
    "nomor_daftar_asal" TEXT,
    "tanggal_daftar_asal" TIMESTAMP(3),
    "nomor_aju_asal" TEXT,
    "seri_barang_asal" TEXT,
    "netto" TEXT,
    "bruto" TEXT,
    "volume" TEXT,
    "cif" TEXT,
    "cif_rupiah" TEXT,
    "ndpbm" TEXT,
    "harga_penyerahan" TEXT,
    "harga_perolehan" TEXT,
    "nilai_jasa" TEXT,
    "seri_izin" TEXT,
    "kode_bkc" TEXT,
    "kode_komoditi_bkc" TEXT,
    "kode_sub_komoditi_bkc" TEXT,
    "flag_tis" TEXT,
    "isi_per_kemasan" TEXT,
    "jumlah_dilekatkan" TEXT,
    "jumlah_pita_cukai" TEXT,
    "hje_cukai" TEXT,
    "tarif_cukai" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bahan_Baku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bahan_Baku_Dokumen" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "seri_bahan_baku" TEXT,
    "kode_asal_bahan_baku" TEXT,
    "seri_dokumen" TEXT,
    "seri_izin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bahan_Baku_Dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bahan_Baku_Tarif" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "seri_bahan_baku" TEXT,
    "kode_asal_bahan_baku" TEXT,
    "kode_pungutan" TEXT,
    "kode_tarif" TEXT,
    "tarif" TEXT,
    "kode_fasilitas" TEXT,
    "tarif_fasilitas" TEXT,
    "nilai_bayar" TEXT,
    "nilai_fasilitas" TEXT,
    "nilai_sudah_dilunasi" TEXT,
    "kode_satuan" TEXT,
    "jumlah_satuan" TEXT,
    "flag_bmt_sementara" TEXT,
    "kode_komoditi_cukai" TEXT,
    "kode_sub_komoditi_cukai" TEXT,
    "flag_tis" TEXT,
    "flag_pelekatan" TEXT,
    "kode_kemasan" TEXT,
    "jumlah_kemasan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bahan_Baku_Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank_Devisa" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "kode" TEXT,
    "nama" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bank_Devisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang_Dokumen" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "seri_dokumen" TEXT,
    "seri_izin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang_Entitas" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "seri_dokumen" TEXT,
    "seri_izin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Entitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang_Spek_Khusus" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "kode" TEXT,
    "uraian" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Spek_Khusus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang_Tarif" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "kode_pungutan" TEXT,
    "kode_tarif" TEXT,
    "tarif" TEXT,
    "kode_fasilitas" TEXT,
    "tarif_fasilitas" TEXT,
    "nilai_bayar" TEXT,
    "nilai_fasilitas" TEXT,
    "nilai_sudah_dilunasi" TEXT,
    "kode_satuan" TEXT,
    "jumlah_satuan" TEXT,
    "flag_bmt_sementara" TEXT,
    "kode_komoditi_cukai" TEXT,
    "kode_sub_komoditi_cukai" TEXT,
    "flag_tis" TEXT,
    "flag_pelekatan" TEXT,
    "kode_kemasan" TEXT,
    "jumlah_kemasan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang_Vds" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "kode_vd" TEXT,
    "nilai_barang" TEXT,
    "biaya_tambahan" TEXT,
    "biaya_pengurang" TEXT,
    "jatuh_tempo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_Vds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jaminan" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "kode_fasilitas_tarif" TEXT,
    "kode_jenis_pungutan" TEXT,
    "nilai_pungutan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jaminan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengangkut" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri" TEXT,
    "kode_cara_angkut" TEXT,
    "nama_pengangkut" TEXT,
    "nomor_pengangkut" TEXT,
    "kode_bendera" TEXT,
    "call_sign" TEXT,
    "flag_angkut_plb" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pengangkut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pungutan" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "kode_fasilitas_tarif" TEXT,
    "kode_jenis_pungutan" TEXT,
    "nilai_pungutan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pungutan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarif" (
    "id" BIGSERIAL NOT NULL,
    "hs" TEXT,
    "bm" TEXT,
    "ppn" TEXT,
    "pph" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Header_nomor_aju_key" ON "Header"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Entitas" ADD CONSTRAINT "Entitas_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumen" ADD CONSTRAINT "Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kemasan" ADD CONSTRAINT "Kemasan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kontainer" ADD CONSTRAINT "Kontainer_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan_Baku" ADD CONSTRAINT "Bahan_Baku_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan_Baku_Dokumen" ADD CONSTRAINT "Bahan_Baku_Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan_Baku_Tarif" ADD CONSTRAINT "Bahan_Baku_Tarif_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank_Devisa" ADD CONSTRAINT "Bank_Devisa_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Dokumen" ADD CONSTRAINT "Barang_Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Entitas" ADD CONSTRAINT "Barang_Entitas_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Spek_Khusus" ADD CONSTRAINT "Barang_Spek_Khusus_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Tarif" ADD CONSTRAINT "Barang_Tarif_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Vds" ADD CONSTRAINT "Barang_Vds_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jaminan" ADD CONSTRAINT "Jaminan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengangkut" ADD CONSTRAINT "Pengangkut_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pungutan" ADD CONSTRAINT "Pungutan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;
