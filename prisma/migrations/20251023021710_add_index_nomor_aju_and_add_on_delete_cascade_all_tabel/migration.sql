-- DropForeignKey
ALTER TABLE "public"."Bahan_Baku" DROP CONSTRAINT "Bahan_Baku_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang" DROP CONSTRAINT "Barang_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Dokumen" DROP CONSTRAINT "Dokumen_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Kemasan" DROP CONSTRAINT "Kemasan_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Kontainer" DROP CONSTRAINT "Kontainer_nomor_aju_fkey";

-- AlterTable
ALTER TABLE "Bahan_Baku" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Bahan_Baku_Dokumen" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Bahan_Baku_Tarif" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Bank_Devisa" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang_Dokumen" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang_Entitas" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang_Spek_Khusus" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang_Tarif" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Barang_Vds" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Dokumen" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Entitas" ADD COLUMN     "kode_afiliasi" TEXT;

-- AlterTable
ALTER TABLE "Jaminan" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Kemasan" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Kontainer" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Pengangkut" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Pungutan" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Tarif" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Bahan_Baku_nomor_aju_idx" ON "Bahan_Baku"("nomor_aju");

-- CreateIndex
CREATE INDEX "Bahan_Baku_Dokumen_nomor_aju_idx" ON "Bahan_Baku_Dokumen"("nomor_aju");

-- CreateIndex
CREATE INDEX "Bahan_Baku_Tarif_nomor_aju_idx" ON "Bahan_Baku_Tarif"("nomor_aju");

-- CreateIndex
CREATE INDEX "Bank_Devisa_nomor_aju_idx" ON "Bank_Devisa"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_nomor_aju_idx" ON "Barang"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_Dokumen_nomor_aju_idx" ON "Barang_Dokumen"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_Entitas_nomor_aju_idx" ON "Barang_Entitas"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_Spek_Khusus_nomor_aju_idx" ON "Barang_Spek_Khusus"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_Tarif_nomor_aju_idx" ON "Barang_Tarif"("nomor_aju");

-- CreateIndex
CREATE INDEX "Barang_Vds_nomor_aju_idx" ON "Barang_Vds"("nomor_aju");

-- CreateIndex
CREATE INDEX "Dokumen_nomor_aju_idx" ON "Dokumen"("nomor_aju");

-- CreateIndex
CREATE INDEX "Jaminan_nomor_aju_idx" ON "Jaminan"("nomor_aju");

-- CreateIndex
CREATE INDEX "Kemasan_nomor_aju_idx" ON "Kemasan"("nomor_aju");

-- CreateIndex
CREATE INDEX "Kontainer_nomor_aju_idx" ON "Kontainer"("nomor_aju");

-- CreateIndex
CREATE INDEX "Pengangkut_nomor_aju_idx" ON "Pengangkut"("nomor_aju");

-- CreateIndex
CREATE INDEX "Pungutan_nomor_aju_idx" ON "Pungutan"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dokumen" ADD CONSTRAINT "Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kemasan" ADD CONSTRAINT "Kemasan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kontainer" ADD CONSTRAINT "Kontainer_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan_Baku" ADD CONSTRAINT "Bahan_Baku_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;
