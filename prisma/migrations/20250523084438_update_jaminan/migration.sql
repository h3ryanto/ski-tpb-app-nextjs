/*
  Warnings:

  - You are about to drop the column `kode_fasilitas_tarif` on the `Jaminan` table. All the data in the column will be lost.
  - You are about to drop the column `kode_jenis_pungutan` on the `Jaminan` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_pungutan` on the `Jaminan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jaminan" DROP COLUMN "kode_fasilitas_tarif",
DROP COLUMN "kode_jenis_pungutan",
DROP COLUMN "nilai_pungutan",
ADD COLUMN     "kode_jaminan" TEXT,
ADD COLUMN     "kode_kantor" TEXT,
ADD COLUMN     "nilai_jaminan" TEXT,
ADD COLUMN     "nomor_bpj" TEXT,
ADD COLUMN     "nomor_jaminan" TEXT,
ADD COLUMN     "penjamin" TEXT,
ADD COLUMN     "tanggal_bpj" TIMESTAMP(3),
ADD COLUMN     "tanggal_jaminan" TIMESTAMP(3),
ADD COLUMN     "tanggal_jatuh_tempo" TIMESTAMP(3);
