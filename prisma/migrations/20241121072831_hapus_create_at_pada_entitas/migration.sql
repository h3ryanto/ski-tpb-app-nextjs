/*
  Warnings:

  - You are about to drop the column `created_at` on the `Entitas` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Entitas` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE entitas_id_seq;
ALTER TABLE "Entitas" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "id" SET DEFAULT nextval('entitas_id_seq');
ALTER SEQUENCE entitas_id_seq OWNED BY "Entitas"."id";

-- AlterTable
ALTER TABLE "Header" ALTER COLUMN "asuransi" DROP NOT NULL,
ALTER COLUMN "nilai_barang" DROP NOT NULL,
ALTER COLUMN "nilai_incoterm" DROP NOT NULL,
ALTER COLUMN "nilai_maklon" DROP NOT NULL,
ALTER COLUMN "freight" DROP NOT NULL,
ALTER COLUMN "fob" DROP NOT NULL,
ALTER COLUMN "biaya_tambahan" DROP NOT NULL,
ALTER COLUMN "biaya_pengurang" DROP NOT NULL,
ALTER COLUMN "vd" DROP NOT NULL,
ALTER COLUMN "cif" DROP NOT NULL,
ALTER COLUMN "harga_penyerahan" DROP NOT NULL,
ALTER COLUMN "ndpbm" DROP NOT NULL,
ALTER COLUMN "total_dana_sawit" DROP NOT NULL,
ALTER COLUMN "dasar_pengenaan_pajak" DROP NOT NULL,
ALTER COLUMN "nilai_jasa" DROP NOT NULL,
ALTER COLUMN "uang_muka" DROP NOT NULL,
ALTER COLUMN "bruto" DROP NOT NULL,
ALTER COLUMN "netto" DROP NOT NULL,
ALTER COLUMN "volume" DROP NOT NULL;
