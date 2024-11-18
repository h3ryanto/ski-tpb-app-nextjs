-- CreateTable
CREATE TABLE `Entitas` (
    `id` BIGINT NOT NULL,
    `nomor_aju` VARCHAR(191) NOT NULL,
    `seri` VARCHAR(191) NOT NULL,
    `kode_entitas` VARCHAR(191) NOT NULL,
    `kode_jenis_identitas` VARCHAR(191) NOT NULL,
    `nomor_identitas` VARCHAR(191) NOT NULL,
    `nama_entitas` VARCHAR(191) NOT NULL,
    `alamat_entitas` VARCHAR(191) NOT NULL,
    `nib_entitas` VARCHAR(191) NOT NULL,
    `kode_jenis_api` VARCHAR(191) NOT NULL,
    `kode_status` VARCHAR(191) NOT NULL,
    `nomor_ijin_entitas` VARCHAR(191) NOT NULL,
    `tanggal_ijin_entitas` VARCHAR(191) NOT NULL,
    `kode_negara` VARCHAR(191) NOT NULL,
    `niper_entitas` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
