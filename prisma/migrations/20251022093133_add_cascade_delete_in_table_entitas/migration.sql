-- DropForeignKey
ALTER TABLE "public"."Entitas" DROP CONSTRAINT "Entitas_nomor_aju_fkey";

-- AlterTable
ALTER TABLE "Entitas" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Entitas_nomor_aju_idx" ON "Entitas"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Entitas" ADD CONSTRAINT "Entitas_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;
