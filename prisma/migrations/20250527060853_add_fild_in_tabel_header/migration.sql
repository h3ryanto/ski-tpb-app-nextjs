-- AlterTable
ALTER TABLE "Header" ADD COLUMN     "barang_kiriman" TEXT,
ADD COLUMN     "barang_tidak_berwujud" TEXT,
ADD COLUMN     "kode_asal_barang_ftz" TEXT,
ADD COLUMN     "kode_jenis_pengangkut" TEXT,
ADD COLUMN     "kode_jenis_pengeluaran" TEXT,
ADD COLUMN     "kode_kantor_muat" TEXT,
ADD COLUMN     "kode_tujuan_pengeluaran" TEXT,
ADD COLUMN     "ppn_pajak" TEXT,
ADD COLUMN     "ppnbm_pajak" TEXT,
ADD COLUMN     "tarif_ppn_pajak" TEXT;
