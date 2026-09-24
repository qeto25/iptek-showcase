import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileText,
  FileSpreadsheet,
  Palette,
  Layers,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'overview' | 'canva' | 'word' | 'excel';
}

export const ResearchModal: React.FC<ResearchModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'canva' | 'word' | 'excel'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in text-slate-200">
      <div className="w-full max-w-5xl h-[90vh] bg-[#0c1017] border border-slate-800 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="bg-[#111622] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Hasil Riset Mendalam (Deep Research): Canva, Word & Excel
                </h2>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Divisi IPTEK OSIS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dokumentasi arsitektur perangkat lunak, studi kasus SPETRA 2026, dan alur kerja produktivitas digital.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-[#0e121b] border-b border-slate-800/80 px-4 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none py-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Ringkasan & Sinergi Alur Kerja</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('canva')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'canva'
                ? 'bg-[#00c4cc] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>2. Canva (Desain & Grafis Visual)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('word')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'word'
                ? 'bg-[#185abd] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Microsoft Word (Pengolah Kata & Proposal)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('excel')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'excel'
                ? 'bg-[#107c41] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>4. Microsoft Excel (Spreadsheet & Anggaran)</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: OVERVIEW & SIKLUS HIDUP SPETRA */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-emerald-950/40 border border-slate-700/60">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Triad Fondasi Produktivitas Digital Organisasi Modern
                </h3>
                <p className="text-xs text-slate-300">
                  Dalam manajemen organisasi modern seperti OSIS, ketiga software ini bukanlah pilihan "salah satu", melainkan sebuah triad (trinitas) komplementer yang bekerja beriringan: <strong>Excel</strong> menghitung realitas numerik, <strong>Word</strong> menyusun legalitas birokrasi, dan <strong>Canva</strong> mengomunikasikan ide tersebut ke khalayak luas.
                </p>
              </div>

              {/* Matriks Komparasi 3 Software */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0f141f]">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#141b2a] text-slate-200 font-semibold border-b border-slate-800">
                      <th className="p-3">Dimensi Analisis</th>
                      <th className="p-3 text-blue-400">Microsoft Word</th>
                      <th className="p-3 text-emerald-400">Microsoft Excel</th>
                      <th className="p-3 text-teal-400">Canva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Fungsi Utama</td>
                      <td className="p-3">Pengolah kata, surat kedinasan, proposal resmi, & naskah legal</td>
                      <td className="p-3">Perhitungan angka, rencana anggaran biaya (RAB), & rekapitulasi</td>
                      <td className="p-3">Desain poster, publikasi promosi, banner, & konten media sosial</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Struktur Unit Dasar</td>
                      <td className="p-3">Halaman & Aliran Paragraf (*Flow Text*)</td>
                      <td className="p-3">Grid Sel 2 Dimensi (Kolom A-XFD $\times$ Baris 1-1.048.576)</td>
                      <td className="p-3">Kanvas Berbasis Koordinat (*Absolute Layers*)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Mesin Inti (*Core Engine*)</td>
                      <td className="p-3">Text Flow, Style Hierarchy, XML Document Model</td>
                      <td className="p-3">DAG Calculation Tree & Multi-Threaded Formula Engine</td>
                      <td className="p-3">HTML5 Canvas, SVG Vector, WebGL Shaders & Cloud Exporter</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Format File Standar</td>
                      <td className="p-3"><code>.docx</code> (ISO/IEC 29500 OOXML), PDF</td>
                      <td className="p-3"><code>.xlsx</code> (Open XML Spreadsheet), CSV</td>
                      <td className="p-3">Proyek Cloud $\rightarrow$ PDF Print, PNG, JPG, MP4</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Target Audiens Dokumen</td>
                      <td className="p-3">Kepala Sekolah, Pembina, Dinas, Arsip Resmi</td>
                      <td className="p-3">Bendahara, Panitia Anggaran, Sponsor, Auditor</td>
                      <td className="p-3">Siswa, Warga Sekolah, Dewan Juri, Media Sosial</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sinergi Alur Kerja Nyata SPETRA 2026 */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  Siklus Hidup Terpadu: Studi Kasus Nyata Event SPETRA 2026
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Fase 1: Excel (RAB)</span>
                    </div>
                    <p className="text-slate-300">
                      Menghitung 15 item perlengkapan (Banner, Kapur, Vitamin 3 box = Rp240.000) dan hadiah Fun Run dengan rumus <code>=C5*D5</code>, ditarik fill-handle, dan dijumlahkan otomatis dengan <code>=SUM(E5:E40)</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-blue-400">
                      <FileText className="w-4 h-4" />
                      <span>Fase 2: Word (Proposal)</span>
                    </div>
                    <p className="text-slate-300">
                      Menyusun naskah legal <code>PROPOSAL EVENT OLAHRAGA, PMI DAN BULAN BAHASA</code>, meratakan titik dua panitia inti (Siti Badriyah, Hendra Saputra, Aruna Maharani) dengan Tab Stop, nomor seksi acara, dan cap basah.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/20 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-teal-400">
                      <Palette className="w-4 h-4" />
                      <span>Fase 3: Canva (Publikasi)</span>
                    </div>
                    <p className="text-slate-300">
                      Mengekstrak tanggal dan panitia menjadi poster visual potret <code>UPACARA BENDERA Hari Senin</code> dengan pita merah putih, kartu petugas XI FKK, pembina Bpk. Muhammad Fernanda, dan diekspor cetak A3.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CANVA DEEP DIVE */}
          {activeTab === 'canva' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <CanvaBrandIcon className="w-10 h-10" />
                <div>
                  <h3 className="text-base font-bold text-white">Canva: Cloud Visual Communication Engine</h3>
                  <p className="text-xs text-teal-400">Demokratisasi Desain Grafis & Rendering Berbasis Web</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-teal-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Sejarah & Arsitektur
                  </h4>
                  <p className="text-slate-300">
                    Didirikan tahun 2012 oleh Melanie Perkins di Sydney. Canva mengganti kompleksitas Adobe Photoshop dengan antarmuka web interaktif berbasis HTML5 Canvas, manipulasi SVG, dan WebGL shaders untuk efek bayangan/kurva teks secara instan di browser.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Ekosistem Edukasi & Fitur
                  </h4>
                  <p className="text-slate-300">
                    Mendukung kolaborasi multi-pengguna *real-time*, integrasi Canva for Education dengan fitur <strong>"Kirim ke guru"</strong>, panduan magnetik (*smart snapping guides*), serta Magic Studio berbasis AI untuk in-painting dan auto-layout.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Penerapan Kasus Nyata: Poster "Upacara Bendera Hari Senin"
                </h4>
                <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside">
                  <li><strong>Kanvas Potret Proporsional:</strong> Rasio 4:5 dengan latar krem hangat (<code>#fff8ec</code>) yang bersih dan ramah untuk dicetak mading maupun diunggah ke Instagram.</li>
                  <li><strong>Elemen Pita & Garuda:</strong> Pita merah putih melengkung di kanan atas dan Garuda Pancasila emas menegaskan suasana resmi kenegaraan di sekolah.</li>
                  <li><strong>Hierarki Tipografi:</strong> Huruf U kaligrafi merah dramatis, teks PACARA dalam badge merah bata, dan headline BENDERA tebal untuk daya tarik pembaca dalam 2 detik pertama.</li>
                  <li><strong>Kartu Informasi Terstruktur:</strong> Kartu terpisah untuk Tanggal (21 Sept 2026), Petugas (XI FKK), Waktu (07.30 - 08.10 WIB), dan Pembina (Bpk. Muhammad Fernanda S.M, Gr).</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: MICROSOFT WORD DEEP DIVE */}
          {activeTab === 'word' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <WordBrandIcon className="w-10 h-10" />
                <div>
                  <h3 className="text-base font-bold text-white">Microsoft Word: Industry-Standard Document Processing</h3>
                  <p className="text-xs text-blue-400">Standar Global Tata Kelola Dokumen & Naskah Legal Formal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Sejarah & Arsitektur OOXML
                  </h4>
                  <p className="text-slate-300">
                    Diciptakan tahun 1983 oleh Charles Simonyi & Richard Brodie. Format modern <code>.docx</code> berbasis ISO/IEC 29500 Open Packaging Conventions (OPC), berupa arsip ZIP berisi berkas XML (<code>document.xml</code>, <code>styles.xml</code>, <code>numbering.xml</code>) yang menjamin integritas data jangka panjang.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-blue-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Fitur Kunci Administrasi
                  </h4>
                  <p className="text-slate-300">
                    Pengendalian aliran teks (*text-flow*), hierarki gaya (*Styles Heading 1-9*) untuk Daftar Isi otomatis, *Section Breaks* untuk orientasi halaman campuran, dan sistem mistar tab-stop perataan titik dua tanpa spasi manual.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Penerapan Kasus Nyata: PROPOSAL SPETRA.docx
                </h4>
                <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside">
                  <li><strong>Judul Resmi Kedinasan:</strong> <code>PROPOSAL EVENT OLAHRAGA, PMI DAN BULAN BAHASA</code> dalam Times New Roman 14pt tebal di bagian tengah atas.</li>
                  <li><strong>Mistar Tab-Stop Titik Dua Panitia Inti:</strong> Penataan nama Koordinator Siti Badriyah, Pembina Hendra Saputra, Ketua Aruna Maharani, Sekretaris Syarifah, dan Bendahara Syakira dengan titik dua sejajar presisi.</li>
                  <li><strong>Numbering List Bertingkat:</strong> Penugasan seksi acara (Nailah, Zaschia) dan seksi perlengkapan (Alfin, Dinda, Felisna, Kamalia) tersusun secara otomatis.</li>
                  <li><strong>Kapasitas Dokumen:</strong> Tercatat <code>Page 1 of 8</code> dengan total <code>1258 words</code>, siap disahkan dengan tanda tangan pembina dan stempel basah.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: MICROSOFT EXCEL DEEP DIVE */}
          {activeTab === 'excel' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <ExcelBrandIcon className="w-10 h-10" />
                <div>
                  <h3 className="text-base font-bold text-white">Microsoft Excel: Computational Grid & Analytical Engine</h3>
                  <p className="text-xs text-emerald-400">Fondasi Perhitungan Keuangan, Akuntansi, dan Pemodelan Data</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Dependency Graph & Komputasi Grid
                  </h4>
                  <p className="text-slate-300">
                    Dirilis tahun 1985 (Mac) dan 1987 (Windows). Excel memelihara struktur data graf terarah (Directed Acyclic Graph) sehingga ketika ada angka berubah, hanya sel turunan (*dirty cells*) yang dihitung ulang secara paralel (Multi-Threaded Calculation).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Format Akuntansi vs Nilai Mentah
                  </h4>
                  <p className="text-slate-300">
                    Excel memisahkan *underlying value* (angka mentah 75000) dengan *displayed format* (<code>Rp 75,000</code>). Ini mencegah kegagalan hitung <code>#VALUE!</code> saat rumus perkalian atau penjumlahan dijalankan.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Penerapan Kasus Nyata: ANGGARAN DANA SPETRA 2026.xlsx
                </h4>
                <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside">
                  <li><strong>Banner Hijau Muda:</strong> Header lembar kerja <code>ANGGARAN DANA SPETRA</code> membentang di atas kolom A hingga E.</li>
                  <li><strong>Rumus Perkalian Otomatis:</strong> Sel E5 menghitung <code>=C5*D5</code> (Jumlah $\times$ Harga Satuan), menghasilkan nilai pasti tanpa kalkulator manual.</li>
                  <li><strong>Fitur Tarik Fill-Handle:</strong> Menggandakan formula ke 15 baris perlengkapan (Kapur, Pita, Vitamin 3 box = Rp240.000, dst.) dan hadiah Fun Run secara instan.</li>
                  <li><strong>Agregasi Grand Total AutoSum:</strong> Sel E41 menjalankan fungsi <code>=SUM(E5:E40)</code>, menjumlahkan seluruh subtotal anggaran secara akurat dan transparan.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-[#111622] border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dokumentasi Resmi Divisi IPTEK OSIS &copy; 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:inline">Navigasi: Klik tab di atas untuk berganti topik riset</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer text-xs"
            >
              Tutup & Kembali
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
