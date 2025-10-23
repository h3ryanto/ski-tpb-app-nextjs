-- DropForeignKey
ALTER TABLE "public"."Bahan_Baku_Dokumen" DROP CONSTRAINT "Bahan_Baku_Dokumen_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bahan_Baku_Tarif" DROP CONSTRAINT "Bahan_Baku_Tarif_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bank_Devisa" DROP CONSTRAINT "Bank_Devisa_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang_Dokumen" DROP CONSTRAINT "Barang_Dokumen_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang_Entitas" DROP CONSTRAINT "Barang_Entitas_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang_Spek_Khusus" DROP CONSTRAINT "Barang_Spek_Khusus_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang_Tarif" DROP CONSTRAINT "Barang_Tarif_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Barang_Vd" DROP CONSTRAINT "Barang_Vd_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Jaminan" DROP CONSTRAINT "Jaminan_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pungutan" DROP CONSTRAINT "Pungutan_nomor_aju_fkey";

-- DropForeignKey
ALTER TABLE "public"."Respon" DROP CONSTRAINT "Respon_nomor_aju_fkey";

-- AddForeignKey
ALTER TABLE "Bahan_Baku_Dokumen" ADD CONSTRAINT "Bahan_Baku_Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan_Baku_Tarif" ADD CONSTRAINT "Bahan_Baku_Tarif_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank_Devisa" ADD CONSTRAINT "Bank_Devisa_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Dokumen" ADD CONSTRAINT "Barang_Dokumen_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Entitas" ADD CONSTRAINT "Barang_Entitas_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Spek_Khusus" ADD CONSTRAINT "Barang_Spek_Khusus_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Tarif" ADD CONSTRAINT "Barang_Tarif_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang_Vd" ADD CONSTRAINT "Barang_Vd_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respon" ADD CONSTRAINT "Respon_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jaminan" ADD CONSTRAINT "Jaminan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pungutan" ADD CONSTRAINT "Pungutan_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;
