# PRD - Lightweight Landing Page CMS

Version: 1.0

---

# 1. Project Overview

## Project Name

Lightweight Landing Page CMS

## Goal

Membangun sebuah sistem Landing Page modern yang memiliki CMS (Content Management System) sederhana dalam satu project tanpa menggunakan database maupun REST API.

Seluruh data website disimpan menggunakan file JSON, sedangkan seluruh aset gambar disimpan langsung pada folder assets.

Sistem ditujukan agar:

* Sangat ringan
* Mudah dipindahkan ke hosting
* Mudah dikelola oleh developer
* Mudah digunakan client
* Tidak membutuhkan konfigurasi database
* Tidak membutuhkan migration
* Tidak membutuhkan API terpisah

Target utama adalah website Company Profile, UMKM, Restaurant, Cafe, Bengkel, Klinik, Agency, Landing Product, Personal Brand, dan bisnis kecil hingga menengah.

---

# 2. Project Objectives

Project harus memenuhi tujuan berikut:

* Landing page modern menggunakan Tailwind CSS.
* Backend sederhana menggunakan Node.js + Express.
* CMS berada dalam project yang sama.
* Seluruh konten tersimpan pada file JSON.
* Seluruh gambar tersimpan pada folder assets.
* Upload gambar harus otomatis menimpa gambar lama.
* Tidak menggunakan MySQL.
* Tidak menggunakan PostgreSQL.
* Tidak menggunakan MongoDB.
* Tidak menggunakan Firebase.
* Tidak menggunakan Headless CMS.
* Tidak menggunakan REST API publik.

---

# 3. Tech Stack

Frontend

* HTML
* Tailwind CSS
* Vanilla JavaScript

Backend

* Node.js
* Express.js
* Multer
* Express Session
* bcrypt

Storage

* JSON
* File System

Deployment

* VPS
* Node Hosting
* Docker (Optional)

---

# 4. Folder Structure

```
project/

public/
    assets/
        logo.png
        hero.png
        about.png
        gallery-1.png
        gallery-2.png
        gallery-3.png

    css/
    js/

    index.html

admin/

    login.html

    dashboard.html

    pages/

    js/

data/

    content.json

    setting.json

uploads/

server.js

package.json

README.md
```

---

# 5. CMS Scope

CMS hanya memiliki fitur untuk mengatur konten Landing Page.

CMS bukan Website Builder.

CMS bukan Blog.

CMS bukan Ecommerce.

CMS hanya berfungsi mengganti isi website.

---

# 6. Landing Page Sections

Website minimal memiliki section berikut.

Hero

About

Services

Gallery

Why Choose Us

Testimonials

FAQ (Optional)

Contact

Footer

Setiap section dapat diaktifkan atau dinonaktifkan melalui konfigurasi.

---

# 7. Content Storage

Semua teks website disimpan pada file:

```
data/content.json
```

Contoh:

```
{
    "hero": {
        "title": "...",
        "subtitle": "...",
        "button": "..."
    }
}
```

Ketika Admin menekan tombol Save:

* Backend membaca JSON
* Memperbarui field
* Menulis ulang file
* Website langsung menggunakan data terbaru

---

# 8. Image Storage

Semua gambar disimpan pada:

```
public/assets
```

Contoh:

```
logo.png

hero.png

about.png

gallery-1.png

gallery-2.png
```

Website hanya memanggil nama file tetap.

Contoh:

```
hero.png
```

Nama file tidak pernah berubah.

---

# 9. Image Upload Flow

Contoh:

Admin mengganti hero.

Flow:

Upload

↓

Server menerima file

↓

Rename menjadi

hero.png

↓

Replace file lama

↓

Website otomatis menggunakan gambar baru

Tidak boleh membuat nama random.

Tidak boleh menyimpan duplicate.

Selalu overwrite.

---

# 10. Gallery Upload

Gallery menggunakan slot tetap.

Contoh:

gallery-1.png

gallery-2.png

gallery-3.png

gallery-4.png

Admin cukup memilih slot yang ingin diganti.

---

# 11. Logo Upload

Flow:

Upload logo

↓

Rename menjadi

logo.png

↓

Replace

↓

Website otomatis berubah.

---

# 12. Admin Authentication

CMS harus memiliki Login.

Menggunakan:

Express Session

Username dan password disimpan pada:

```
setting.json
```

Password wajib disimpan dalam bentuk hash menggunakan bcrypt.

Session digunakan untuk menjaga status login.

---

# 13. CMS Features

Dashboard

Hero Editor

About Editor

Service Editor

Gallery Editor

Contact Editor

Footer Editor

Setting Editor

Logout

---

# 14. Hero Editor

Editable:

Title

Subtitle

Description

Button Text

Button URL

Hero Image

---

# 15. About Editor

Editable:

Title

Description

Image

---

# 16. Services Editor

Editable:

Nama Service

Deskripsi

Icon

Urutan

Status Aktif

---

# 17. Gallery Editor

Editable:

Upload gambar

Caption

Alt Text

---

# 18. Contact Editor

Editable:

Phone

WhatsApp

Email

Address

Google Maps Embed

---

# 19. Footer Editor

Editable:

Copyright

Instagram

Facebook

LinkedIn

TikTok

YouTube

---

# 20. Settings

Website Name

Meta Title

Meta Description

Primary Color

Logo

Favicon

---

# 21. CMS UI

Sidebar kiri.

Header atas.

Main Content.

Form sederhana.

Save Button.

Cancel Button.

Preview gambar.

Tidak menggunakan UI kompleks.

Harus mudah dipahami client non-teknis.

---

# 22. Performance Requirements

Landing Page harus memiliki:

First Load cepat

Minified CSS

Optimized Image

Tidak menggunakan library berat

Lighthouse minimal:

Performance ≥ 90

Accessibility ≥ 90

SEO ≥ 90

Best Practice ≥ 90

---

# 23. Security

Semua input harus divalidasi.

Upload hanya menerima:

PNG

JPG

JPEG

WEBP

Ukuran maksimal upload dapat dikonfigurasi.

Session harus memiliki timeout.

Password harus di-hash.

Folder data tidak boleh dapat diakses langsung dari browser.

---

# 24. Error Handling

Jika JSON rusak:

Tampilkan pesan error.

Jika upload gagal:

File lama tidak boleh terhapus.

Jika rename gagal:

Rollback.

---

# 25. Future Scalability

Project harus memiliki struktur modular sehingga mudah dikembangkan menjadi:

* Blog
* Multi Template
* Dynamic Theme
* Multi User
* SEO Manager
* Analytics
* Backup Manager

Tanpa mengubah arsitektur utama.

---

# 26. Out of Scope

Project ini tidak mencakup:

Database

REST API Publik

Marketplace

Payment Gateway

Shopping Cart

Multi Language

Membership

Komentar

Blog Engine

---

# 27. Success Criteria

Project dianggap selesai apabila:

✓ Landing Page dapat menampilkan seluruh data dari JSON.

✓ Admin dapat login.

✓ Admin dapat mengubah seluruh teks.

✓ Perubahan langsung tersimpan ke JSON.

✓ Admin dapat mengganti gambar.

✓ Upload otomatis menimpa gambar lama.

✓ Website langsung menggunakan gambar baru.

✓ Tidak menggunakan database.

✓ Tidak menggunakan API eksternal.

✓ Seluruh sistem berjalan dalam satu project.

---

# 28. Development Principles

* Kode harus modular dan mudah dipelihara.
* Pisahkan logika frontend dan backend dengan jelas.
* Hindari duplikasi kode (DRY).
* Gunakan helper untuk operasi file JSON dan upload.
* Validasi semua input sebelum disimpan.
* Utamakan kesederhanaan dibanding fitur yang tidak diperlukan.
* Dokumentasikan struktur data JSON agar mudah dipahami developer lain.
* Seluruh komponen harus mudah digunakan oleh client tanpa pengetahuan teknis.
