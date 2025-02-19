/*
  Warnings:

  - You are about to alter the column `asuransi` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `nilai_barang` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `nilai_incoterm` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `nilai_maklon` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `freight` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fob` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `biaya_tambahan` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `biaya_pengurang` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `vd` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `cif` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `harga_penyerahan` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `ndpbm` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_dana_sawit` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `dasar_pengenaan_pajak` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `nilai_jasa` on the `Header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Header" ALTER COLUMN "asuransi" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "nilai_barang" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "nilai_incoterm" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "nilai_maklon" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "freight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fob" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "biaya_tambahan" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "biaya_pengurang" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "vd" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "cif" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "harga_penyerahan" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ndpbm" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_dana_sawit" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "dasar_pengenaan_pajak" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "nilai_jasa" SET DATA TYPE DOUBLE PRECISION;
