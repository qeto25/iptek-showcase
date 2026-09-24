# GPT WEBSITE AUDIT — INSTRUKSI UNTUK ANTIGRAVITY

## Konteks

Saya telah meminta GPT melakukan audit terhadap website:

https://tesiptec.netlify.app/

Repository:
https://github.com/qeto25/iptek-showcase

Gunakan audit di bawah ini sebagai **temuan dan arahan dari GPT**, bukan sebagai alasan untuk langsung mengubah seluruh website.

## ATURAN PALING PENTING

1. Jangan melakukan redesign besar-besaran secara membabi buta.
2. Jangan menghapus fitur yang sudah bekerja.
3. Jangan menyentuh area yang tidak berkaitan dengan masalah.
4. Pertahankan konsep interactive presentation/showcase yang sudah ada.
5. Gunakan prinsip **Minimal Safe Change**.
6. Sebelum mengubah kode, pahami implementasi yang sekarang dan cari root cause.
7. Setelah perubahan, lakukan verifikasi nyata.
8. Jangan mengatakan "fixed", "done", atau "working" tanpa benar-benar menguji.
9. Jika sebuah temuan di bawah belum terbukti dari runtime, lakukan verifikasi terlebih dahulu.
10. Jika ternyata sebuah temuan tidak berlaku pada versi kode terbaru, jangan memaksakan perubahan.
11. Jangan mengurangi kualitas visual hanya karena ingin membuat kode lebih sederhana.
12. Fokus utama adalah membuat website lebih jelas sebagai **website presentasi/showcase OSIS**, bukan menjadikannya SaaS atau website lain.

---

# HASIL AUDIT GPT

## 1. Gambaran Besar

Menurut audit source code, website ini bukan sekadar landing page. Konsepnya adalah interactive presentation / digital showcase untuk memperlihatkan bagaimana:

- Microsoft Word
- Microsoft Excel
- Canva

digunakan dalam konteks pekerjaan administrasi/event OSIS.

Struktur utamanya mencakup:

- PresentationHome
- Word simulation
- Excel simulation
- Canva simulation
- Replay / playback
- Step-by-step animation
- Keyboard navigation
- Fullscreen
- Research modal
- Tab pembahasan Word/Excel/Canva
- Background video
- Virtual cursor
- Micro-animation

Konsep interactive showcase ini **harus dipertahankan**.

Masalah terbesar yang ditemukan bukan kekurangan fitur, tetapi:

> Website terlalu fokus pada "wow presentation" dibanding "jelas menjelaskan apa yang sedang dipresentasikan".

Tujuan perbaikan adalah membuat narasi presentasi lebih jelas tanpa menghancurkan visual dan interaksi yang sudah ada.

---

# 2. PRIORITAS P0 — WAJIB DIPERIKSA DAN DIBENAHI

## P0.1 — Verifikasi dan perbaiki state ResearchModal

Audit menemukan potensi bug pada alur research tab.

Di App.tsx terdapat state seperti:

- researchTab
- setResearchTab

Parent dapat membuka research dengan tab tertentu.

Namun ResearchModal memiliki state internal:

```tsx
const [activeTab, setActiveTab] = useState(defaultTab);
```

Masalah potensial:

- `defaultTab` dapat berubah setelah component sudah mounted.
- `activeTab` internal tidak otomatis mengikuti perubahan `defaultTab`.
- Modal bisa tetap mounted dan hanya disembunyikan ketika `isOpen` false.

### Tugas

1. Buka implementasi terbaru `App.tsx`.
2. Buka implementasi terbaru `ResearchModal.tsx`.
3. Verifikasi apakah masalah ini masih benar-benar terjadi.
4. Jika benar, perbaiki dengan sinkronisasi yang tepat, misalnya pola:

```tsx
useEffect(() => {
  if (isOpen) {
    setActiveTab(defaultTab);
  }
}, [isOpen, defaultTab]);
```

5. Jangan menambahkan useEffect jika arsitektur terbaru sudah menyelesaikan masalah dengan cara lain.
6. Test:
   - buka research overview
   - buka research Canva
   - buka research Word
   - buka research Excel
   - tutup modal
   - buka lagi
   - pastikan tab yang diminta benar-benar terbuka.

---

# 3. PRIORITAS P0 — ACCESSIBILITY

## P0.2 — FloatingAppBubble harus memiliki semantic button

Audit menemukan bahwa clickable app bubble menggunakan pola seperti:

```tsx
<div onClick={...}>
```

untuk interaksi utama.

Ini bermasalah karena user keyboard dan screen reader tidak mendapatkan semantic button yang benar.

### Tugas

Cari implementasi terbaru `FloatingAppBubble`.

Jika memang masih menggunakan div sebagai click target utama:

- ubah menjadi `<button type="button">`
- pertahankan visual yang sekarang
- pertahankan animation
- pertahankan ukuran/layout
- tambahkan accessible label yang jelas

Contoh:

```tsx
<button
  type="button"
  onClick={() => onOpenProject(project.id)}
  aria-label={`Buka simulasi ${project.name}`}
>
```

Jangan mengubah desain visual hanya karena mengganti semantic element.

### Verifikasi

Keyboard harus bisa:

- Tab menuju bubble
- Enter membuka
- Space membuka
- focus state terlihat

---

# 4. PRIORITAS P0 — MODAL ACCESSIBILITY

Periksa:

- ReplayModal
- ResearchModal

Pastikan modal memiliki semantic yang tepat jika memang belum ada:

```html
role="dialog"
aria-modal="true"
aria-labelledby="..."
```

### Focus management

Idealnya:

```text
Open modal
↓
focus masuk modal
↓
Tab tetap berada di modal
↓
Escape menutup
↓
focus kembali ke trigger
```

Jangan merusak keyboard shortcut yang sudah ada.

ReplayModal saat ini sudah memiliki konsep Escape / keyboard navigation. Pertahankan fungsi tersebut.

---

# 5. PRIORITAS P1 — HOMEPAGE HARUS LEBIH JELAS

## Masalah

Homepage terlalu mengandalkan tiga visual besar:

- Word
- Excel
- Canva

Pengunjung baru bisa bertanya:

- Website ini tentang apa?
- Kenapa Word, Excel, Canva?
- Saya harus klik yang mana?
- Ini aplikasi atau presentasi?

Padahal App.tsx sudah memiliki metadata/project information yang dapat digunakan.

### Perbaikan yang diminta

Tambahkan **context layer yang sangat singkat**, jangan membuat homepage menjadi penuh.

Contoh arah copy:

```text
SIMULASI SELEKSI DIVISI IPTEK OSIS

Administrasi & Desain Digital

Lihat bagaimana Microsoft Word, Excel, dan Canva
digunakan untuk menyusun sebuah kegiatan OSIS.
```

Lalu tiga aplikasi dapat diberi konteks:

```text
WORD
Proposal

EXCEL
Anggaran

CANVA
Publikasi
```

Jika struktur UI saat ini sudah memiliki elemen yang dapat digunakan, lebih baik gunakan/memodifikasi elemen tersebut daripada membuat section baru secara berlebihan.

---

# 6. PRIORITAS P1 — TAMPILKAN OUTPUT SETIAP TOOLS

Audit menemukan bahwa hubungan:

- Word → Proposal
- Excel → Anggaran
- Canva → Poster/Publikasi

sudah terdapat dalam metadata/project information.

Masalahnya: hubungan tersebut belum cukup kuat pada first impression.

### Target UX

User harus langsung memahami:

```text
WORD
↓
Proposal Kegiatan

EXCEL
↓
Rencana Anggaran

CANVA
↓
Poster / Publikasi
```

Jangan sekadar menampilkan nama aplikasi.

---

# 7. PRIORITAS P1 — BUAT WORKFLOW WORD / EXCEL / CANVA TERASA SATU KESATUAN

Sekarang tiga aplikasi cenderung terasa seperti tiga demo terpisah.

Buat hubungan konseptualnya lebih jelas:

```text
SATU KEGIATAN OSIS
        ↓
PERENCANAAN
        ↓
EXCEL
Anggaran
        ↓
WORD
Proposal
        ↓
CANVA
Publikasi
        ↓
HASIL KEGIATAN
```

Urutan final boleh disesuaikan dengan workflow yang memang ada di website. Jangan mengubah isi simulasi hanya demi diagram.

Tujuan utamanya:

> User memahami bahwa Word, Excel, dan Canva adalah bagian dari satu workflow kegiatan OSIS.

---

# 8. PRIORITAS P1 — TAMBAHKAN CLOSING / CONCLUSION

Presentasi perlu terasa selesai.

Setelah user menjelajah simulation, sediakan closing sederhana seperti:

```text
APA YANG KITA PELAJARI?

✓ Administrasi dokumen
✓ Pengolahan anggaran
✓ Komunikasi visual

[ Kembali ke Showcase ]
```

Jangan membuatnya menjadi halaman baru jika tidak diperlukan.

Bisa berupa section/panel ringan yang mengikuti desain yang sudah ada.

---

# 9. PRIORITAS P1 — LABEL SIMULATION

Simulation Word/Excel/Canva dibuat sangat mirip aplikasi asli.

Ini bagus untuk demo, tetapi user harus tahu bahwa itu simulasi.

Tambahkan label yang jelas namun tidak mengganggu, misalnya:

```text
SIMULASI INTERAKTIF
Microsoft Word
```

atau:

```text
DEMO — Simulasi Microsoft Word
```

Tujuannya mencegah kebingungan bahwa user sedang menggunakan aplikasi Microsoft asli.

---

# 10. PRIORITAS P1 — RESEARCH MODAL TERLALU TEKNIS

ResearchModal saat ini memiliki materi teknis seperti:

- OOXML
- XML
- DAG
- WebGL
- HTML5 Canvas
- multi-threaded calculation
- architecture details

Informasi tersebut boleh dipertahankan.

Namun untuk konteks presentasi OSIS, buat dua level informasi:

### Level ringkas

Bahasa yang mudah dipahami peserta/penguji.

Contoh:

```text
EXCEL

Excel membantu menghitung anggaran
secara otomatis sehingga mengurangi
perhitungan manual.
```

### Level deep dive

Tetap pertahankan penjelasan teknis yang sudah ada jika memang berguna.

Target:

```text
Penjelasan singkat
↓
Deep Research
```

Jangan menghapus research teknis hanya karena dianggap terlalu panjang.

---

# 11. PRIORITAS P1 — REDUCED MOTION

CSS saat ini memiliki banyak animation:

- floating
- ripple
- stamp
- typing blink
- shine
- gentle float
- marching ants
- glass effects

Homepage juga memakai background video autoplay/loop/muted.

Tambahkan dukungan:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Sesuaikan implementasi dengan CSS yang sebenarnya.

Untuk background video, pertimbangkan fallback / tidak menjalankan motion ketika user meminta reduced motion.

Jangan menghapus animation normal untuk user biasa.

---

# 12. PRIORITAS P2 — KURANGI "AI-GENERATED FEEL", BUKAN HAPUS IDENTITAS

Audit menemukan karakter visual yang kuat:

- glassmorphism
- gradient
- glow
- 3D orb
- floating animation
- cinematic background
- neon border
- blur
- banyak decorative effects

Ini bukan berarti desainnya harus dirombak.

Masalahnya adalah semua efek bersaing menarik perhatian.

### Prinsip

Pertahankan:

- futuristic
- cinematic
- interactive
- IPTEK identity

Tetapi buat hierarchy:

```text
CONTENT
↓
INTERACTION
↓
DECORATION
```

bukan:

```text
DECORATION
DECORATION
DECORATION
CONTENT
```

Jika melakukan polish, lebih baik mengurangi sebagian intensity daripada mengganti seluruh visual system.

Jangan asal menghapus gradient/glow.

---

# 13. PRIORITAS P2 — PERFORMANCE

Audit tidak mengukur Lighthouse/Core Web Vitals.

Jadi JANGAN membuat klaim seperti:

- "performance buruk"
- "LCP sekian"
- "bundle terlalu besar"

tanpa pengukuran.

Yang teridentifikasi dari source:

- background video fullscreen autoplay loop
- banyak animation
- backdrop blur
- visual effects
- Google Fonts
- beberapa font family

Ini adalah **potential performance concern**, bukan bukti bahwa website lambat.

### Tugas

Jika environment memungkinkan:

1. jalankan build
2. inspect bundle
3. ukur performance
4. cek network
5. cek image/video size
6. cek Lighthouse jika tersedia

Lalu laporkan angka nyata.

Jika tidak bisa diukur, tuliskan:

```text
Tidak dapat diverifikasi dari environment ini.
```

---

# 14. PRIORITAS P2 — FONT

index.html saat audit memuat:

- Fira Code
- Plus Jakarta Sans
- Playfair Display

Jangan langsung menghapus salah satunya.

Pertama cek:

- di mana masing-masing font digunakan
- apakah benar-benar dibutuhkan
- apakah ada visual dependency

Jika tidak diperlukan, baru pertimbangkan pengurangan font request.

---

# 15. PRIORITAS P2 — SEO

Basic metadata sudah ada:

- lang="id"
- title
- meta description
- favicon
- viewport

Tetapi audit tidak menemukan metadata sosial yang lengkap.

Pertimbangkan:

```text
og:title
og:description
og:image
og:url
twitter:card
twitter:title
twitter:description
twitter:image
canonical
```

Pastikan nilainya benar-benar sesuai website.

Buat social preview image yang relevan jika diperlukan.

---

# 16. RESPONSIVE

Source sudah menunjukkan responsive consideration seperti:

- sm
- md
- lg
- grid-cols
- mobile padding
- modal height

Tetapi runtime mobile belum dapat diverifikasi oleh audit.

### Tugas

Test minimal:

- desktop
- laptop
- tablet
- mobile

Khususnya:

- homepage
- app bubbles
- research modal
- replay modal
- Word simulation
- Excel simulation
- Canva simulation
- keyboard/touch
- overflow horizontal

Jangan menyimpulkan responsive "aman" hanya dari Tailwind class.

---

# 17. FUNCTIONALITY

Pertahankan dan verifikasi fitur yang sudah ada:

- Play
- Pause
- Restart
- Next
- Previous
- Speed
- Step navigation
- Fullscreen
- Escape
- keyboard navigation
- research tabs

Beberapa toolbar dalam simulation memang mungkin hanya visual replica, bukan functional editor.

Jika memang sengaja simulatif, jangan dipaksa menjadi aplikasi Word/Excel/Canva sungguhan.

Tetapi pastikan user tidak bingung antara:

```text
Interactive simulation
```

dan:

```text
real editor
```

---

# 18. ARSITEKTUR

Stack saat ini secara umum:

- React
- Vite
- TypeScript
- Tailwind
- Lucide React

Pertahankan kecuali ada masalah nyata.

Struktur seperti:

```text
Presentation
Simulation
Research
components
```

sudah cukup masuk akal untuk project ini.

Jangan melakukan migration framework hanya demi "best practice".

Tidak perlu mengganti stack tanpa root cause.

---

# 19. SECURITY

Audit sebelumnya tidak menemukan indikasi jelas:

- API key publik
- database
- backend credential
- sensitive environment variable
- obvious public security vulnerability

Tetapi ini bukan full security audit.

Jangan mengklaim security sudah 100% aman.

Jika ingin melakukan pemeriksaan tambahan, lakukan hanya passive/public inspection.

Jangan melakukan destructive testing atau exploit.

---

# 20. URUTAN IMPLEMENTASI YANG DIINGINKAN

Kerjakan bertahap:

## STEP 1 — INSPECT

Baca kode terbaru sebelum menyentuh apa pun.

Periksa:

- App.tsx
- PresentationHome.tsx
- FloatingAppBubble.tsx
- ResearchModal.tsx
- ReplayModal.tsx
- WordSimulation.tsx
- ExcelSimulation.tsx
- CanvaSimulation.tsx
- styles/index.css
- index.html
- package.json

Jangan berasumsi source masih sama dengan audit.

## STEP 2 — VERIFY

Verifikasi temuan:

- ResearchModal state
- clickable div
- modal semantics
- focus handling
- reduced motion
- homepage clarity
- responsive
- performance
- SEO

## STEP 3 — PLAN

Sebelum editing, buat daftar:

```text
Finding
Root Cause
Proposed Change
Affected Files
Risk
Verification
```

## STEP 4 — IMPLEMENT

Implementasikan:

P0 terlebih dahulu → P1 → P2 → P3.

Jaga perubahan tetap fokus.

## STEP 5 — TEST

Test:

- build
- typecheck
- lint jika tersedia
- runtime
- keyboard
- modal
- navigation
- responsive
- simulation
- research tabs
- fullscreen

## STEP 6 — REPORT

Laporkan:

```text
CHANGED
VERIFIED
NOT VERIFIED
REMAINING RISKS
```

Jangan mengatakan "semua selesai" jika masih ada yang belum diuji.

---

# 21. HAL YANG JANGAN DILAKUKAN

JANGAN:

- mengganti framework
- menghapus simulation
- menghapus ResearchModal
- menghapus ReplayModal
- menghapus animation secara total
- menghapus visual identity
- mengganti seluruh homepage
- membuat dashboard baru
- menambahkan backend
- menambahkan database
- menambah authentication
- mengubah tujuan website
- menghapus fitur yang sudah bekerja
- menyentuh file unrelated

kecuali ada alasan teknis konkret dan sudah diverifikasi.

---

# 22. TARGET AKHIR

Website setelah improvement harus tetap terasa seperti website yang sama.

Bukan:

> "website baru"

Tetapi:

> "versi yang lebih matang dari website yang sekarang."

Target pengalaman:

```text
USER MASUK
    ↓
LANGSUNG PAHAM
"Ini showcase IPTEK OSIS"
    ↓
PAHAM HUBUNGAN
Word / Excel / Canva
    ↓
PILIH SIMULASI
    ↓
MELIHAT PROSES
    ↓
MEMAHAMI OUTPUT
    ↓
MEMAHAMI WORKFLOW
    ↓
PRESENTASI SELESAI
```

Visual futuristic/cinematic tetap dipertahankan sebagai identitas.

---

# 23. SUMBER AUDIT

Audit ini dibuat berdasarkan pemeriksaan source repository:

https://github.com/qeto25/iptek-showcase

dan konteks deployment:

https://tesiptec.netlify.app/

Catatan penting:

Deployment live tidak dapat diverifikasi sepenuhnya oleh audit environment sebelumnya. Karena itu:

- source-level findings dapat digunakan sebagai dasar implementasi setelah diverifikasi terhadap kode terbaru;
- runtime findings harus diuji ulang;
- performance metrics belum boleh dibuat-buat;
- responsive visual belum boleh dianggap terverifikasi tanpa runtime test.

---

# FINAL INSTRUCTION UNTUK ANTIGRAVITY

Jangan langsung mengubah semua hal di atas.

Mulai dengan:

1. Inspect repository saat ini.
2. Cocokkan temuan audit dengan kode terbaru.
3. Identifikasi mana yang masih berlaku.
4. Buat implementation plan singkat.
5. Implementasikan P0 terlebih dahulu.
6. Test.
7. Lanjutkan P1.
8. Test lagi.
9. Lakukan P2 hanya jika aman.
10. Jangan menghapus functionality yang sudah bekerja.
11. Jangan menyentuh unrelated code.
12. Setelah selesai, berikan laporan perubahan dan hasil verifikasi.

Prinsip utama:

> **Understand → Verify → Plan → Minimal Safe Change → Test → Report**

Tujuan bukan membuat website terlihat "lebih ramai".

Tujuan adalah membuat website yang sekarang menjadi **lebih jelas, lebih accessible, lebih usable, lebih matang sebagai presentation website, dan tetap mempertahankan identitas visual serta fitur interaktif yang sudah dibuat.**
