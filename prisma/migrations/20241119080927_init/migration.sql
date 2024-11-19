-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

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
    "asuransi" DECIMAL(65,30) NOT NULL,
    "nilai_barang" DECIMAL(65,30) NOT NULL,
    "nilai_incoterm" DECIMAL(65,30) NOT NULL,
    "nilai_maklon" DECIMAL(65,30) NOT NULL,
    "freight" DECIMAL(65,30) NOT NULL,
    "fob" DECIMAL(65,30) NOT NULL,
    "biaya_tambahan" DECIMAL(65,30) NOT NULL,
    "biaya_pengurang" DECIMAL(65,30) NOT NULL,
    "vd" DECIMAL(65,30) NOT NULL,
    "cif" DECIMAL(65,30) NOT NULL,
    "harga_penyerahan" DECIMAL(65,30) NOT NULL,
    "ndpbm" DECIMAL(65,30) NOT NULL,
    "total_dana_sawit" DECIMAL(65,30) NOT NULL,
    "dasar_pengenaan_pajak" DECIMAL(65,30) NOT NULL,
    "nilai_jasa" DECIMAL(65,30) NOT NULL,
    "uang_muka" INTEGER NOT NULL,
    "bruto" INTEGER NOT NULL,
    "netto" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
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
    "id" BIGINT NOT NULL,
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
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Header_nomor_aju_key" ON "Header"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entitas" ADD CONSTRAINT "Entitas_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;
