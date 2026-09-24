# Kritik & Saran Perbaikan — iptek-showcase-osis

> Catatan dari Claude (Anthropic) untuk Antigravity. Ini hasil audit terhadap
> source code proyek `iptek-showcase-osis` (React 19 + TypeScript + Vite +
> Tailwind v4), berdasarkan pembacaan langsung file kode, bukan asumsi.
> Setiap temuan ditandai **VERIFIED** (terlihat langsung di kode),
> **LIKELY** (indikasi kuat dari pola kode, belum dikonfirmasi lewat render
> browser sungguhan), atau **RECOMMENDATION** (saran perbaikan, bukan klaim
> ada bug). Tujuan dokumen ini: jadi daftar kerja yang bisa langsung
> dieksekusi, bukan opini umum.

---

## Ringkasan Singkat

Proyek ini adalah aplikasi presentasi interaktif untuk showcase pelatihan
OSIS (Word, Excel, Canva), lengkap dengan simulation engine custom per
software dan playback controls. Kontennya solid dan spesifik (bukan filler
generik). Masalah terbesarnya ada di tiga area: **aksesibilitas keyboard**,
**metadata sharing/SEO**, dan **beberapa asset yang tidak teroptimasi/tidak
terpakai**.

---

## P0 — Critical (perbaiki dulu)

### 1. Kartu navigasi utama tidak bisa diakses keyboard
**File:** `src/presentation/FloatingAppBubble.tsx`
**Masalah (VERIFIED):** Elemen pemicu utama (3 ikon Word/Excel/Canva —
satu-satunya jalan masuk ke seluruh konten) adalah `<div onClick={...}>`
polos, tanpa `tabIndex`, `onKeyDown`, `role="button"`, atau `aria-label`.
Saya cek seluruh `src/`: hanya ada **1 `aria-label`** di keseluruhan
codebase, dan itu ada di `GlassSphereOrb.tsx` — komponen yang **tidak
pernah dipakai** (lihat dead code di bawah).
**Dampak:** Pengguna keyboard-only atau screen reader tidak bisa membuka
konten sama sekali.
**Solusi konkret:**
```tsx
// SEBELUM
<div onClick={() => onOpenProject(project.id)} className="...cursor-pointer select-none...">

// SESUDAH
<button
  type="button"
  onClick={() => onOpenProject(project.id)}
  aria-label={`Buka simulasi ${project.name}`}
  className="...cursor-pointer..."
>
```

### 2. Layout homepage rawan terpotong di layar pendek/mobile
**File:** `src/presentation/PresentationHome.tsx` (baris ~56–57)
**Masalah (LIKELY):** `h-screen w-screen overflow-hidden` pada container
utama + grid 3 kolom dengan gap besar (`gap-12 sm:gap-16 lg:gap-24`).
Begitu konten lebih tinggi dari viewport (umum di HP orientasi landscape
pendek, atau saat browser toolbar mobile muncul), konten akan **terpotong
tanpa bisa di-scroll**.
**Solusi:** Ganti `h-screen` → `min-h-screen`, hapus `overflow-hidden` dari
container utama (biarkan video/overlay yang tetap `absolute inset-0`).

---

## P1 — High Impact

### 3. Tidak ada `<h1>` di halaman yang sebenarnya tampil
**Masalah (VERIFIED):** Satu-satunya `<h1>` di codebase ada di dalam
`WordSimulation.tsx` dan `CanvaSimulation.tsx`, tapi itu meniru judul
dokumen simulasi (dan hanya muncul setelah modal dibuka). Homepage
langsung pakai `<h3>` untuk nama software, melompati h1/h2.
**Dampak:** Screen reader user yang navigasi via heading kehilangan
struktur halaman; juga kurang optimal untuk SEO on-page.
**Solusi:** Tambahkan `<h1>` (boleh visually-hidden) untuk judul aplikasi
di `PresentationHome.tsx`, jaga urutan h1 → h2 → h3.

### 4. Tidak ada Open Graph / Twitter Card metadata
**File:** `index.html`
**Masalah (VERIFIED):** Hanya ada `<title>` dan `<meta name="description">`.
Tidak ada `og:title`, `og:image`, `og:description`, `twitter:card`, atau
`canonical`.
**Dampak:** Saat link dibagikan ke WhatsApp/Discord/grup, preview akan
kosong atau hanya URL polos.
**Solusi:** Tambahkan minimal:
```html
<meta property="og:title" content="AI Showcase: Pelatihan Administrasi & Desain OSIS" />
<meta property="og:description" content="Showcase interaktif materi Word, Excel, dan Canva untuk anggota OSIS baru." />
<meta property="og:image" content="/images/wallpaper-moon.png" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://tesiptec.netlify.app/" />
```

### 5. Modal tanpa `role="dialog"` / focus trap
**File:** `ReplayModal.tsx`, `ResearchModal.tsx`
**Masalah (VERIFIED):** Kedua modal tidak punya `role="dialog"`,
`aria-modal="true"`, atau focus trap. Navigasi keyboard (Esc/Space/Arrow)
sudah diimplementasikan dengan benar, tapi fokus Tab bisa "bocor" ke
elemen di belakang modal.
**Solusi:** Tambahkan `role="dialog" aria-modal="true" aria-labelledby="..."`,
dan trap fokus (misal pakai `useRef` + cek elemen pertama/terakhir yang
bisa fokus).

---

## P2 — Polish

### 6. Dead code — 5 komponen tidak terpakai (~750 baris)
**File:** `ProjectCard.tsx`, `BentoProjectCard.tsx`, `GlassTabletCard.tsx`,
`LauncherCard.tsx`, `GlassSphereOrb.tsx`
**Masalah (VERIFIED via grep):** Tidak diimpor di manapun oleh
`App.tsx`/`PresentationHome.tsx`. Kemungkinan besar sisa iterasi desain
yang tidak dibersihkan. Ironisnya `GlassSphereOrb.tsx` justru punya
`aria-label` yang benar — versi yang lebih accessible tidak jadi dipakai.
**Solusi:** Hapus kelima file ini, atau kalau salah satu desainnya lebih
disukai, pertimbangkan pakai `GlassSphereOrb` (sudah lebih accessible)
sebagai basis alih-alih `FloatingAppBubble`.

### 7. Asset tidak teroptimasi / tidak terpakai
**Masalah (VERIFIED):**
- `public/images/wallpaper-moon.png` — 492KB untuk resolusi hanya
  854×480px. Jauh lebih besar dari wajar; target realistis <100KB setelah
  kompresi/convert ke WebP.
- `public/images/bg-workspace.jpg` (708KB) — tidak direferensikan di kode
  manapun. Asset mati yang memperbesar ukuran repo/deploy tanpa manfaat.
**Solusi:** Kompres `wallpaper-moon.png`, hapus `bg-workspace.jpg`.

### 8. Font weight berlebihan
**File:** `index.html`
**Masalah (VERIFIED):** 3 font family (`Plus Jakarta Sans`, `Fira Code`,
`Playfair Display`) dengan total 11 weight/style di-load dari satu
`<link>` Google Fonts. `font-serif-title` (Playfair Display) tampaknya
hanya dipakai di sedikit elemen.
**Solusi:** Audit weight yang benar-benar dipakai di seluruh `className`,
kurangi query string Google Fonts sesuai yang terpakai saja.

---

## P3 — Optional / Kebijakan (bukan murni teknis)

### 9. Nama lengkap siswa di deployment publik tanpa autentikasi
**File:** `ResearchModal.tsx` (tab Word & Excel)
**Temuan (VERIFIED):** Berisi nama lengkap panitia (Siti Badriyah, Hendra
Saputra, Aruna Maharani, Syarifah, Syakira, Nailah, Zaschia, Alfin, Dinda,
Felisna, Kamalia) dan nama pembina, di situs Netlify publik tanpa login.
**Catatan:** Ini bukan bug teknis, tapi pertimbangan privasi — nama
lengkap siswa (kemungkinan di bawah umur) bisa terindeks Google dan
diakses siapa saja. Sebaiknya didiskusikan dengan pihak sekolah apakah
nama lengkap perlu tampil publik, atau cukup inisial/nama peran saja.

### 10. Tidak ada deep-linking
**Masalah:** Semua state (`activeTab`, modal terbuka) hanya di React
`useState`, tidak tersambung ke URL. Tidak bisa share link langsung ke
tab tertentu (misal `?tab=excel`).
**Solusi (nice-to-have):** Sinkronkan state penting ke query param URL.

### 11. `prefers-reduced-motion` belum didukung
**Masalah:** Banyak animasi (float, glow, video autoplay) tanpa
pengecekan preferensi pengguna yang sensitif gerakan.
**Solusi (nice-to-have):** Tambahkan media query
`@media (prefers-reduced-motion: reduce)` untuk menonaktifkan/mengurangi
animasi non-esensial.

---

## Hal yang Sudah Bagus (jangan diubah)

- Kontrol keyboard di `ReplayModal` (Esc, Space, Arrow kiri/kanan, R)
  sudah diimplementasikan dengan benar.
- Konten riset di `ResearchModal` spesifik dan faktual (rumus Excel eksak,
  nama proyek SPETRA 2026, detail historis software) — bukan filler AI
  generik.
- Skema warna per software brand-accurate (biru Word `#185abd`, hijau
  Excel `#107c41`, ungu Canva `#7d2ae8`).
- Dependency minimal (`react`, `react-dom`, `lucide-react` saja) — tidak
  ada bloat library yang tidak perlu.
- Tidak ditemukan exposed API key/env var di source.

---

## Yang Belum Bisa Diverifikasi (perlu dicek manual di browser)

- Rendering visual aktual di berbagai breakpoint (screenshot nyata).
- Angka Lighthouse / Core Web Vitals sungguhan.
- Console error saat runtime.
- Kontras warna aktual hasil render (terutama teks `text-slate-500` di
  simulasi Word/Excel/Canva yang berlatar putih — perlu dicek dengan tool
  contrast checker).
- Apakah file `dkv-report.html` di root project ikut ter-deploy ke situs
  live (secara default Vite hanya menyalin isi folder `public/`, jadi
  kemungkinan besar TIDAK ter-deploy, tapi sebaiknya dikonfirmasi manual).
