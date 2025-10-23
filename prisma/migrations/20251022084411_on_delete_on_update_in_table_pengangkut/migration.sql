-- DropForeignKey
ALTER TABLE "public"."Pengangkut" DROP CONSTRAINT "Pengangkut_nomor_aju_fkey";

-- AddForeignKey
ALTER TABLE "Pengangkut" ADD CONSTRAINT "Pengangkut_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;
