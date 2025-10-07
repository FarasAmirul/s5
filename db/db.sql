-- Buat database
CREATE DATABASE IF NOT EXISTS spk_binaphoto;
USE spk_binaphoto;

-- Tabel barang
CREATE TABLE barang (
  id_barang INT AUTO_INCREMENT PRIMARY KEY,
  nama_barang VARCHAR(100) NOT NULL,
  stok INT NOT NULL,
  penjualan INT NOT NULL,
  leadtime INT NOT NULL,
  harga INT NOT NULL
);

-- Tabel kriteria
CREATE TABLE kriteria (
  id_kriteria INT AUTO_INCREMENT PRIMARY KEY,
  nama_kriteria VARCHAR(50) NOT NULL,
  bobot DECIMAL(5,2) NOT NULL,
  jenis ENUM('benefit', 'cost') NOT NULL
);

-- Tabel hasil_saw
CREATE TABLE hasil_saw (
  id_hasil INT AUTO_INCREMENT PRIMARY KEY,
  id_barang INT,
  skor DECIMAL(6,3),
  tanggal DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (id_barang) REFERENCES barang(id_barang)
);

-- Data awal kriteria
INSERT INTO kriteria (nama_kriteria, bobot, jenis) VALUES
('Stok', 0.3, 'cost'),
('Penjualan', 0.3, 'benefit'),
('Lead Time', 0.2, 'cost'),
('Harga', 0.2, 'cost');

-- Data awal barang
INSERT INTO barang (nama_barang, stok, penjualan, leadtime, harga) VALUES
('Kertas A4', 20, 80, 3, 50000),
('Tinta Printer', 5, 60, 7, 120000),
('Pulpen', 50, 100, 2, 3000);
