// ==========================
// SERVER.JS VERSI LENGKAP
// Barang + Kriteria
// ==========================

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// KONEKSI DATABASE
// ==========================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spk_binaphoto'
});

db.connect(err => {
  if (err) {
    console.error('❌ Gagal konek ke database:', err);
  } else {
    console.log('✅ Terhubung ke database spk_binaphoto');
  }
});

// ==========================
// CRUD BARANG
// ==========================

// Ambil semua barang
app.get('/barang', (req, res) => {
  db.query('SELECT * FROM barang', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Tambah barang
app.post('/barang', (req, res) => {
  const { nama_barang, stok, penjualan, leadtime, harga } = req.body;
  const sql = 'INSERT INTO barang (nama_barang, stok, penjualan, leadtime, harga) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nama_barang, stok, penjualan, leadtime, harga], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Barang berhasil ditambahkan' });
  });
});

// Update barang
app.put('/barang/:id', (req, res) => {
  const { nama_barang, stok, penjualan, leadtime, harga } = req.body;
  const sql = 'UPDATE barang SET nama_barang=?, stok=?, penjualan=?, leadtime=?, harga=? WHERE id_barang=?';
  db.query(sql, [nama_barang, stok, penjualan, leadtime, harga, req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Barang berhasil diperbarui' });
  });
});

// Hapus barang
app.delete('/barang/:id', (req, res) => {
  db.query('DELETE FROM barang WHERE id_barang = ?', [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Barang berhasil dihapus' });
  });
});

// ==========================
// CRUD KRITERIA
// ==========================

app.get('/kriteria', (req, res) => {
  db.query('SELECT * FROM kriteria', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post('/kriteria', (req, res) => {
  const { nama_kriteria, jenis, bobot } = req.body;
  const sql = 'INSERT INTO kriteria (nama_kriteria, jenis, bobot) VALUES (?, ?, ?)';
  db.query(sql, [nama_kriteria, jenis, bobot], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Kriteria berhasil ditambahkan' });
  });
});

app.put('/kriteria/:id', (req, res) => {
  const { nama_kriteria, jenis, bobot } = req.body;
  const sql = 'UPDATE kriteria SET nama_kriteria=?, jenis=?, bobot=? WHERE id_kriteria=?';
  db.query(sql, [nama_kriteria, jenis, bobot, req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Kriteria berhasil diupdate' });
  });
});

app.delete('/kriteria/:id', (req, res) => {
  db.query('DELETE FROM kriteria WHERE id_kriteria = ?', [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Kriteria berhasil dihapus' });
  });
});

// ==========================
// JALANKAN SERVER
// ==========================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
