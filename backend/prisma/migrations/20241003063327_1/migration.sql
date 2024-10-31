-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tittle` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `body` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataMunas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asalKota` ENUM('Ambon', 'Balikpapan', 'Banda_Aceh', 'Bandar_Lampung', 'Bandung', 'Banjar', 'Banjarbaru', 'Banjarmasin', 'Batam', 'Batu', 'Baubau', 'Bekasi', 'Bengkulu', 'Bima', 'Binjai', 'Bitung', 'Blitar', 'Bogor', 'Bontang', 'Bukittinggi', 'Cilegon', 'Cimahi', 'Cirebon', 'Denpasar', 'Depok', 'Dumai', 'Gorontalo', 'Gunungsitoli', 'Jakarta_Barat', 'Jakarta_Pusat', 'Jakarta_Selatan', 'Jakarta_Timur', 'Jakarta_Utara', 'Jambi', 'Jayapura', 'Kediri', 'Kendari', 'Kotamobagu', 'Kupang', 'Langsa', 'Lhokseumawe', 'Lubuklinggau', 'Madiun', 'Magelang', 'Makassar', 'Malang', 'Manado', 'Mataram', 'Medan', 'Metro', 'Mojokerto', 'Padang', 'Padang_Panjang', 'Padangsidimpuan', 'Pagaralam', 'Palangka_Raya', 'Palembang', 'Palopo', 'Palu', 'Pangkalpinang', 'Parepare', 'Pariaman', 'Pasuruan', 'Payakumbuh', 'Pekalongan', 'Pekanbaru', 'Pematang_Siantar', 'Pontianak', 'Prabumulih', 'Probolinggo', 'Sabang', 'Salatiga', 'Samarinda', 'Sawahlunto', 'Semarang', 'Serang', 'Sibolga', 'Singkawang', 'Solok', 'Sorong', 'Subulussalam', 'Sukabumi', 'Sungaipenuh', 'Surabaya', 'Surakarta', 'Tangerang', 'Tangerang_Selatan', 'Tanjungbalai', 'Tanjungpinang', 'Tarakan', 'Tasikmalaya', 'Tebing_Tinggi', 'Tegal', 'Ternate', 'Tidore_Kepulauan', 'Tomohon', 'Tual', 'Yogyakarta') NOT NULL,
    `namaWalikota` VARCHAR(191) NOT NULL,
    `namaAjudan` VARCHAR(191) NOT NULL,
    `nomorHandphone` VARCHAR(191) NOT NULL,
    `tanggalKedatangan` DATETIME(3) NOT NULL,
    `jamKedatangan` DATETIME(3) NOT NULL,
    `tanggalKepulangan` DATETIME(3) NOT NULL,
    `lokasiMenginap` VARCHAR(191) NOT NULL,
    `jumlahRombongan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `photoType` ENUM('DAY', 'VENUE', 'EVENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
