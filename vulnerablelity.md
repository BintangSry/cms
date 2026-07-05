# Hasil Analisis Kode dan Struktur Folder (WEVLRA CMS)

Berdasarkan pengecekan pada kode dan struktur folder di direktori `templates/cms`, berikut adalah daftar kerentanan (vulnerabilities) dan perbaikan struktur yang perlu kamu lakukan:

## 1. Kerentanan Kritis (Critical Vulnerabilities)

### ~~A. Path Traversal pada Fitur Upload File (`server/utils/uploadHelper.js`)~~ ✅ **(RESOLVED)**
Di dalam konfigurasi Multer, nama file yang disimpan mengambil nilai langsung dari `req.body.filename` tanpa sanitasi (pembersihan):
```javascript
// Di uploadHelper.js
const finalName = req.body.filename ? `${req.body.filename}${ext}` : file.originalname;
```
**Bahaya:** Seorang penyerang dapat mengirimkan `filename` bernilai `../../../../etc/passwd` atau `../../../server.js` untuk menimpa file penting di sistem atau server dengan file gambar mereka.
**Perbaikan:** Gunakan modul bawaan Node.js (`path.basename()`) atau library seperti `sanitize-filename` untuk membersihkan input.
```javascript
const path = require('path');
// Gunakan path.basename untuk membuang semua direktori parent (seperti ../)
const sanitizedFilename = req.body.filename ? path.basename(req.body.filename) : path.basename(file.originalname);
const finalName = req.body.filename ? `${sanitizedFilename}${ext}` : file.originalname;
```

### ~~B. Hardcoded Session Secret (`server.js`)~~ ✅ **(RESOLVED)**
Kunci rahasia untuk session di hardcode pada file `server.js`:
```javascript
app.use(session({
  secret: 'cms-super-secret-key-123',
```
**Bahaya:** Jika kode sumber bocor (leaked), penyerang dapat mengetahui secret key ini dan memalsukan session untuk login sebagai admin tanpa mengetahui password.
**Perbaikan:** Gunakan variabel lingkungan (Environment Variables). Buat file `.env`, gunakan package `dotenv`, dan panggil `process.env.SESSION_SECRET`.

## 2. Keamanan Tingkat Menengah (Medium Vulnerabilities)

### ~~A. Keamanan Cookie Session Kurang Ketat~~ ✅ **(RESOLVED)**
Konfigurasi cookie pada session di `server.js` tidak menggunakan pengaturan yang direkomendasikan untuk produksi.
**Perbaikan:** Tambahkan `httpOnly: true`, `secure: true` (jika menggunakan HTTPS), dan `sameSite: 'strict'` agar terhindar dari serangan XSS dan CSRF.
```javascript
cookie: {
  maxAge: 1000 * 60 * 60 * 24, // 1 hari
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true jika HTTPS
  sameSite: 'strict'
}
```

### ~~B. Tidak Ada Validasi Input / Sanitasi pada API Update (`server/routes/adminApi.js`)~~ ✅ **(RESOLVED)**
Endpoint `PUT /content/:section` dan `PUT /settings` langsung menyimpan apa pun yang dikirim melalui `req.body` ke dalam file JSON.
**Bahaya:** Ini dapat menyebabkan Stored XSS jika penyerang mengirimkan payload script HTML/JS jahat dan ditampilkan di halaman publik tanpa sanitasi, atau mengacaukan struktur file JSON jika mengirim format yang tidak sesuai.
**Perbaikan:** Lakukan validasi payload secara ketat (misal menggunakan Joi atau Zod) sebelum melakukan `writeJSON`, serta buang tag-tag HTML yang berbahaya jika tidak diperlukan. (Telah diperbaiki dengan package `sanitize-html`).

## 3. Catatan Terkait Struktur Folder & Arsitektur

### ~~A. Tidak Ada File `.env`~~ ✅ **(RESOLVED)**
Project ini belum memiliki sistem Environment Variable (file `.env`). Sangat disarankan untuk memisahkan semua konfigurasi rahasia (seperti PORT, SESSION_SECRET) ke dalam file `.env` dan menambahkannya ke `.gitignore`.

### ~~B. Penyimpanan Kredensial Admin (`data/setting.json`)~~ ✅ **(RESOLVED)**
Kredensial admin (username dan passwordHash) disimpan di file yang sama dengan pengaturan publik website di `setting.json`.
**Saran:** Pisahkan file konfigurasi yang bersifat sensitif ke file khusus seperti `admin.json` (dan pastikan tidak dapat diakses publik), atau bahkan gunakan `.env` untuk kredensial admin tunggal. Hal ini agar meminimalisir jika ada kebocoran (contoh: jika salah satu API tidak sengaja membocorkan file `setting.json`).

### ~~C. Proteksi File `.json` dari Akses Publik~~ ✅ **(RESOLVED)**
Saat ini folder `data` tidak di-serve secara publik oleh express (hanya folder `public` dan sebagian `admin`). Ini sudah bagus. Pastikan ke depannya (terutama bila di-deploy memakai Nginx/Apache) agar folder `data/` dikunci rapat agar file `setting.json` dan `content.json` tidak bisa diunduh secara langsung. (Telah dilakukan pengetatan izin via `chmod` pada sistem lokal).
