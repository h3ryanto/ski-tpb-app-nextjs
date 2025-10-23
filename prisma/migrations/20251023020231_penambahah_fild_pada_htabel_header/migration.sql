/*
  Warnings:

  - You are about to drop the column `kode_jenis_pengangkut` on the `Header` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Header" DROP COLUMN "kode_jenis_pengangkut",
ADD COLUMN     "flag_konsol" TEXT,
ADD COLUMN     "flag_proporsional_netto" TEXT,
ADD COLUMN     "kode_jenis_pengangkutan" TEXT;
