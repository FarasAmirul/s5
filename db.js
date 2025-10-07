const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Sesuaikan dengan username MySQL Anda
    password: "", // Sesuaikan dengan password MySQL Anda
    database: "spk_binaphoto"
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal: ", err);
        throw err;
    }
    console.log("Koneksi ke database berhasil!");
});

module.exports = db;
