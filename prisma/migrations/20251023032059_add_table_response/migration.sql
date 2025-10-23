/*
  Warnings:

  - You are about to drop the column `seri_dokumen` on the `Barang_Dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `seri_izin` on the `Barang_Dokumen` table. All the data in the column will be lost.
  - You are about to drop the `Barang_Vds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Barang_Vds" DROP CONSTRAINT "Barang_Vds_nomor_aju_fkey";

-- AlterTable
ALTER TABLE "Barang" ADD COLUMN     "alasan_metode_penentuan_nilai" TEXT,
ADD COLUMN     "jumlah_dilekatkan" INTEGER,
ADD COLUMN     "kode_jenis_ekspor" TEXT,
ADD COLUMN     "metode_penentuan_nilai" TEXT,
ADD COLUMN     "statement_perbedaan_harga" TEXT;

-- AlterTable
ALTER TABLE "Barang_Dokumen" DROP COLUMN "seri_dokumen",
DROP COLUMN "seri_izin",
ADD COLUMN     "seri_entitas" TEXT;

-- DropTable
DROP TABLE "public"."Barang_Vds";

-- CreateTable
CREATE TABLE "Barang_Vd" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "seri_barang" TEXT,
    "kode_vd" TEXT,
    "nilai_barang" TEXT,
    "biaya_tambahan" TEXT,
    "biaya_pengurang" TEXT,
    "jatuh_tempo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barang_Vd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respon" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "Kode_Respon" TEXT,
    "Nomor_Respon" TEXT,
    "Tanggal_Respon" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Respon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Barang_Vd_nomor_aju_idx" ON "Barang_Vd"("nomor_aju");

-- CreateIndex
CREATE INDEX "Respon_nomor_aju_idx" ON "Respon"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Barang_Vd" ADD CONSTRAINT "Barang_Vd_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respon" ADD CONSTRAINT "Respon_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE RESTRICT ON UPDATE CASCADE;
