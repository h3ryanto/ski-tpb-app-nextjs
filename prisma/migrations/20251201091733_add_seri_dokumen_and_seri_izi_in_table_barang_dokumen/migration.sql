/*
  Warnings:

  - You are about to drop the column `seri_entitas` on the `Barang_Dokumen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barang_Dokumen" DROP COLUMN "seri_entitas",
ADD COLUMN     "seri_dokumen" TEXT,
ADD COLUMN     "seri_izin" TEXT;
