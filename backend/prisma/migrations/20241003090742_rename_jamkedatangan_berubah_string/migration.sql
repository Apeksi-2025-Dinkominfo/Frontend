/*
  Warnings:

  - You are about to drop the column `asalKota` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `jamKedatangan` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahRombongan` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `lokasiMenginap` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `namaAjudan` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `namaWalikota` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `nomorHandphone` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalKedatangan` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalKepulangan` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `datamunas` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `photo` table. All the data in the column will be lost.
  - Added the required column `asal_kota` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_kedatangan` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlah_rombongan` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_menginap` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_ajudan` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_walikota` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_handphone` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_kedatangan` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_kepulangan` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `DataMunas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `datamunas` DROP COLUMN `asalKota`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `jamKedatangan`,
    DROP COLUMN `jumlahRombongan`,
    DROP COLUMN `lokasiMenginap`,
    DROP COLUMN `namaAjudan`,
    DROP COLUMN `namaWalikota`,
    DROP COLUMN `nomorHandphone`,
    DROP COLUMN `tanggalKedatangan`,
    DROP COLUMN `tanggalKepulangan`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `asal_kota` ENUM('Ambon', 'Balikpapan', 'Banda_Aceh', 'Bandar_Lampung', 'Bandung', 'Banjar', 'Banjarbaru', 'Banjarmasin', 'Batam', 'Batu', 'Baubau', 'Bekasi', 'Bengkulu', 'Bima', 'Binjai', 'Bitung', 'Blitar', 'Bogor', 'Bontang', 'Bukittinggi', 'Cilegon', 'Cimahi', 'Cirebon', 'Denpasar', 'Depok', 'Dumai', 'Gorontalo', 'Gunungsitoli', 'Jakarta_Barat', 'Jakarta_Pusat', 'Jakarta_Selatan', 'Jakarta_Timur', 'Jakarta_Utara', 'Jambi', 'Jayapura', 'Kediri', 'Kendari', 'Kotamobagu', 'Kupang', 'Langsa', 'Lhokseumawe', 'Lubuklinggau', 'Madiun', 'Magelang', 'Makassar', 'Malang', 'Manado', 'Mataram', 'Medan', 'Metro', 'Mojokerto', 'Padang', 'Padang_Panjang', 'Padangsidimpuan', 'Pagaralam', 'Palangka_Raya', 'Palembang', 'Palopo', 'Palu', 'Pangkalpinang', 'Parepare', 'Pariaman', 'Pasuruan', 'Payakumbuh', 'Pekalongan', 'Pekanbaru', 'Pematang_Siantar', 'Pontianak', 'Prabumulih', 'Probolinggo', 'Sabang', 'Salatiga', 'Samarinda', 'Sawahlunto', 'Semarang', 'Serang', 'Sibolga', 'Singkawang', 'Solok', 'Sorong', 'Subulussalam', 'Sukabumi', 'Sungaipenuh', 'Surabaya', 'Surakarta', 'Tangerang', 'Tangerang_Selatan', 'Tanjungbalai', 'Tanjungpinang', 'Tarakan', 'Tasikmalaya', 'Tebing_Tinggi', 'Tegal', 'Ternate', 'Tidore_Kepulauan', 'Tomohon', 'Tual', 'Yogyakarta') NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `jam_kedatangan` VARCHAR(191) NOT NULL,
    ADD COLUMN `jumlah_rombongan` INTEGER NOT NULL,
    ADD COLUMN `lokasi_menginap` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_ajudan` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_walikota` VARCHAR(191) NOT NULL,
    ADD COLUMN `nomor_handphone` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal_kedatangan` DATETIME(3) NOT NULL,
    ADD COLUMN `tanggal_kepulangan` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
