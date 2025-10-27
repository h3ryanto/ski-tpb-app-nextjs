/*
  Warnings:

  - The `tanggal_bc11` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_berangkat` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_ekspor` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_masuk` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_muat` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_tiba` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_periksa` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tempat_stuffing` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_stuffing` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vd` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_pernyataan` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tanggal_bukti_bayar` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Header" DROP COLUMN "tanggal_bc11",
ADD COLUMN     "tanggal_bc11" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_berangkat",
ADD COLUMN     "tanggal_berangkat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_ekspor",
ADD COLUMN     "tanggal_ekspor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_masuk",
ADD COLUMN     "tanggal_masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_muat",
ADD COLUMN     "tanggal_muat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_tiba",
ADD COLUMN     "tanggal_tiba" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_periksa",
ADD COLUMN     "tanggal_periksa" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tempat_stuffing",
ADD COLUMN     "tempat_stuffing" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_stuffing",
ADD COLUMN     "tanggal_stuffing" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "vd",
ADD COLUMN     "vd" DOUBLE PRECISION,
ALTER COLUMN "netto" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "tanggal_pernyataan",
ADD COLUMN     "tanggal_pernyataan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "tanggal_bukti_bayar",
ADD COLUMN     "tanggal_bukti_bayar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
