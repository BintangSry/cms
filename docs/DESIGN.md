# DESIGN.md

# Lightweight Landing Page CMS - Design System

Version: 1.0

---

# Design Philosophy

Website harus mengutamakan kesederhanaan, kecepatan, dan kemudahan penggunaan.

Setiap halaman harus memiliki tampilan yang bersih, modern, profesional, dan mudah dipahami oleh semua kalangan, termasuk pengguna yang tidak memiliki latar belakang teknis.

Seluruh komponen harus reusable, konsisten, dan mudah dikembangkan tanpa mengubah struktur utama.

---

# Design Principles

Selalu utamakan:

* Simplicity
* Readability
* Consistency
* Accessibility
* Responsive Design
* Fast Loading
* Clean Layout
* Minimal Visual Noise

Hindari:

* Terlalu banyak warna
* Animasi berlebihan
* Efek yang mengganggu
* Layout yang rumit
* Komponen yang tidak konsisten

---

# Visual Style

Style utama:

* Modern
* Minimal
* Professional
* Elegant
* Clean
* Spacious

Inspirasi desain:

* Vercel
* Linear
* Stripe
* Tailwind UI
* shadcn/ui
* Apple

---

# Layout System

Gunakan layout yang konsisten di seluruh website.

Container:

* max-width: 1280px
* Centered
* Horizontal Padding:

  * Mobile: 20px
  * Tablet: 32px
  * Desktop: 48px

Section Spacing:

* Mobile: 64px
* Desktop: 96px

Gap antar komponen:

* 16px
* 24px
* 32px
* 48px

Gunakan sistem spacing berbasis kelipatan 8.

---

# Responsive Breakpoints

Mobile

< 640px

Tablet

640px - 1023px

Desktop

1024px+

Large Desktop

1280px+

Semua komponen wajib responsive.

Tidak boleh ada horizontal scroll.

---

# Color System

Gunakan warna yang mudah dikustomisasi melalui backend.

Minimal memiliki:

Primary

Secondary

Accent

Background

Surface

Border

Text Primary

Text Secondary

Success

Warning

Danger

Default Theme:

Background:
White

Surface:
Light Gray

Text:
Dark Gray

Border:
Soft Gray

Primary:
Blue

Seluruh warna nantinya harus dapat diganti melalui pengaturan.

---

# Typography

Gunakan font modern.

Rekomendasi:

Inter

Fallback:

sans-serif

Hierarchy:

H1

Hero Title

48–64px

Bold

H2

Section Title

36–40px

Bold

H3

Card Title

24px

Semi Bold

Body

16px

Regular

Small Text

14px

Regular

Caption

12px

Regular

Gunakan line-height yang nyaman dibaca.

---

# Border Radius

Gunakan radius yang konsisten.

Button

12px

Card

16px

Input

12px

Modal

20px

Image

16px

---

# Shadow

Gunakan shadow lembut.

Tidak menggunakan shadow yang terlalu gelap.

Prioritaskan:

Small Shadow

Medium Shadow

Hover Shadow

---

# Animation

Gunakan animasi secukupnya.

Durasi:

150ms

200ms

300ms

Gunakan easing yang natural.

Animasi yang diperbolehkan:

Fade

Scale

Slide Up

Opacity

Hover Lift

Hover Scale

Tidak menggunakan animasi yang mengganggu.

---

# Button Style

Primary Button

Solid

Rounded

Medium Height

Secondary Button

Outline

Ghost Button

Transparent

Hover wajib memiliki feedback.

---

# Form Style

Input harus memiliki:

Label

Placeholder

Helper Text (opsional)

Validation Message

Focus State

Error State

Disabled State

Seluruh form harus mudah digunakan.

---

# Card Design

Card harus memiliki:

Background

Padding

Rounded Corner

Soft Shadow

Hover Effect

Transition

---

# Icon Style

Gunakan icon bergaya outline.

Ukuran:

20px

24px

32px

Gunakan satu library icon yang konsisten.

---

# Image Style

Gunakan gambar berkualitas tinggi.

Image wajib:

Responsive

Lazy Load

Object Cover

Rounded

Optimized

---

# Landing Page Structure

Urutan section:

1. Navbar

2. Hero

3. About

4. Services

5. Why Choose Us

6. Gallery

7. Testimonials

8. FAQ

9. Contact

10. Footer

Setiap section dapat dinonaktifkan melalui CMS.

---

# Navbar

Sticky

Transparent saat di atas

Solid ketika scroll

Memiliki:

Logo

Navigation Menu

CTA Button

Mobile Menu

---

# Hero

Layout:

2 Column

Desktop:

Text kiri

Image kanan

Mobile:

Stack

Isi Hero:

Headline

Subheadline

Description

CTA Button

Secondary Button

Hero Image

---

# About

Layout:

2 Column

Image

Description

Statistics (Optional)

---

# Services

Gunakan grid.

Desktop:

3 atau 4 kolom.

Mobile:

1 kolom.

Card berisi:

Icon

Title

Description

---

# Gallery

Gunakan grid.

Semua gambar memiliki ukuran yang konsisten.

Hover:

Zoom ringan

---

# Testimonials

Card sederhana.

Isi:

Photo

Name

Position

Review

Rating (Optional)

---

# FAQ

Accordion.

Hanya satu item yang terbuka dalam satu waktu.

---

# Contact

Memiliki:

Address

Phone

Email

WhatsApp Button

Google Maps

---

# Footer

Berisi:

Logo

Description

Navigation

Social Media

Copyright

---

# CMS Design

CMS harus sederhana.

Tidak menampilkan fitur yang tidak diperlukan.

Layout:

Sidebar

Topbar

Content Area

---

# Sidebar

Menu:

Dashboard

Hero

About

Services

Gallery

Testimonials

FAQ

Contact

Settings

Logout

Sidebar dapat di-collapse.

---

# Dashboard

Menampilkan:

Website Information

Last Updated

Quick Actions

Tidak perlu grafik.

---

# Editor Page

Setiap halaman editor memiliki:

Judul

Deskripsi

Form

Image Preview

Upload Button

Save Button

Cancel Button

---

# Image Upload

Setelah memilih gambar:

Tampilkan preview.

Saat upload:

Tampilkan loading.

Jika berhasil:

Tampilkan notifikasi sukses.

---

# Notifications

Gunakan Toast Notification.

Jenis:

Success

Error

Warning

Info

---

# Empty State

Jika belum ada data:

Tampilkan ilustrasi sederhana.

Berikan tombol aksi.

---

# Loading State

Gunakan skeleton loading.

Tidak menggunakan spinner untuk seluruh halaman.

---

# Accessibility

Semua gambar wajib memiliki alt text.

Semua tombol memiliki label yang jelas.

Kontras warna memenuhi standar WCAG.

Website dapat digunakan menggunakan keyboard.

---

# Performance

Prioritaskan:

Lazy Loading

Optimized Images

Minimal JavaScript

Minimal Dependencies

Reusable Components

---

# Consistency Rules

Semua komponen wajib mengikuti design system.

Tidak membuat style baru jika komponen serupa sudah tersedia.

Gunakan spacing, radius, typography, dan warna yang konsisten.

Seluruh halaman harus memiliki pengalaman pengguna yang seragam.

---

# Future Extensibility

Design system harus memungkinkan penambahan:

* Dark Mode
* Multiple Color Themes
* Multi Template
* Blog Module
* Ecommerce Module

Tanpa mengubah struktur desain utama.

---

# Design Goal

Website yang dihasilkan harus:

* Terlihat premium.
* Mudah digunakan.
* Cepat diakses.
* Mudah dipelihara.
* Mudah dikustomisasi.
* Konsisten di seluruh halaman.
* Nyaman digunakan oleh admin maupun pengunjung.
