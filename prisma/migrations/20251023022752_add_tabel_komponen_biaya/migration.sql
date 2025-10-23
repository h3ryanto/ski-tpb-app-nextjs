-- AlterTable
ALTER TABLE "Pengangkut" ADD COLUMN     "cara_pengangkutan_lainnya" TEXT;

-- CreateTable
CREATE TABLE "Komponen_Biaya" (
    "id" BIGSERIAL NOT NULL,
    "nomor_aju" TEXT NOT NULL,
    "jenis_nilai" TEXT,
    "harga_invoice" DOUBLE PRECISION,
    "pembayaran_tidak_langsung" TEXT,
    "diskon" DOUBLE PRECISION,
    "komisi_penjualan" DOUBLE PRECISION,
    "biaya_pengemasan" DOUBLE PRECISION,
    "biaya_pengepakan" DOUBLE PRECISION,
    "assist" TEXT,
    "royalti" TEXT,
    "proceeds" TEXT,
    "biaya_transportasi" DOUBLE PRECISION,
    "biaya_pemuatan" DOUBLE PRECISION,
    "asuransi" DOUBLE PRECISION,
    "garansi" DOUBLE PRECISION,
    "biaya_kepentingan_sendiri" DOUBLE PRECISION,
    "biaya_pasca_impor" DOUBLE PRECISION,
    "biaya_pajak_internal" DOUBLE PRECISION,
    "bunga" DOUBLE PRECISION,
    "deviden" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Komponen_Biaya_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Komponen_Biaya_nomor_aju_idx" ON "Komponen_Biaya"("nomor_aju");

-- AddForeignKey
ALTER TABLE "Komponen_Biaya" ADD CONSTRAINT "Komponen_Biaya_nomor_aju_fkey" FOREIGN KEY ("nomor_aju") REFERENCES "Header"("nomor_aju") ON DELETE CASCADE ON UPDATE CASCADE;
