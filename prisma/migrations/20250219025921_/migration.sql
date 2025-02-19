/*
  Warnings:

  - You are about to alter the column `jumlah_satuan` on the `Barang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `stok` on the `Barang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Barang" ALTER COLUMN "jumlah_satuan" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stok" SET DATA TYPE DOUBLE PRECISION;
