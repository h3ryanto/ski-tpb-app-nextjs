/*
  Warnings:

  - The primary key for the `Barang_Spek_Khusus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Barang_Spek_Khusus` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Barang_Spek_Khusus" DROP CONSTRAINT "Barang_Spek_Khusus_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ADD CONSTRAINT "Barang_Spek_Khusus_pkey" PRIMARY KEY ("id");
