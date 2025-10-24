/*
  Warnings:

  - The `jumlah_tanda_pengaman` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ppn_pajak` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ppnbm_pajak` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tarif_ppn_pajak` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tarif_ppnbm_pajak` column on the `Header` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Header" DROP COLUMN "jumlah_tanda_pengaman",
ADD COLUMN     "jumlah_tanda_pengaman" INTEGER,
ALTER COLUMN "vd" SET DATA TYPE TEXT,
ALTER COLUMN "uang_muka" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "bruto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "volume" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "ppn_pajak",
ADD COLUMN     "ppn_pajak" DOUBLE PRECISION,
DROP COLUMN "ppnbm_pajak",
ADD COLUMN     "ppnbm_pajak" DOUBLE PRECISION,
DROP COLUMN "tarif_ppn_pajak",
ADD COLUMN     "tarif_ppn_pajak" DOUBLE PRECISION,
DROP COLUMN "tarif_ppnbm_pajak",
ADD COLUMN     "tarif_ppnbm_pajak" DOUBLE PRECISION;
