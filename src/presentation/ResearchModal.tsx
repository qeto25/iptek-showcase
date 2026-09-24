import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Play
} from 'lucide-react';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';

export type ResearchTabType = 'overview' | 'excel' | 'word' | 'canva' | 'conclusion';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'overview' | 'canva' | 'word' | 'excel';
  onLaunchSimulation?: (type: 'excel' | 'word' | 'canva') => void;
}

export const ResearchModal: React.FC<ResearchModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'overview',
  onLaunchSimulation
}) => {
  const [activeTab, setActiveTab] = useState<ResearchTabType>(defaultTab);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // Sync internal activeTab whenever modal opens or defaultTab changes (Root cause fix from GPT audit)
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setShowTechnicalDetails(false);
    }
  }, [isOpen, defaultTab]);

  // Keyboard navigation for escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in text-slate-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-modal-title"
        className="w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-[#0c1017] border border-slate-800 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative"
      >
        {/* Top Header Bar */}
        <header className="bg-[#111622] border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="research-modal-title" className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Materi & Alur Kerja Presentasi OSIS
                </h2>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Divisi IPTEK OSIS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Studi kasus SPETRA 2026: Sinergi Microsoft Excel, Microsoft Word, dan Canva.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog materi (Esc)"
            className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-red-600/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Agenda / Progress Indicator Tab Bar */}
        <nav
          role="tablist"
          aria-label="Agenda Presentasi IPTEK OSIS"
          className="bg-[#0e121b] border-b border-slate-800/80 px-3 sm:px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto shrink-0 scrollbar-none py-2"
        >
          <button
            type="button"
            role="tab"
            id="tab-overview"
            aria-controls="panel-overview"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01 — Alur Sinergi</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-excel"
            aria-controls="panel-excel"
            aria-selected={activeTab === 'excel'}
            onClick={() => setActiveTab('excel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'excel'
                ? 'bg-[#107c41] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>02 — Excel (Anggaran)</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-word"
            aria-controls="panel-word"
            aria-selected={activeTab === 'word'}
            onClick={() => setActiveTab('word')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              activeTab === 'word'
                ? 'bg-[#185abd] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>03 — Word (Proposal)</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-canva"
            aria-controls="panel-canva"
            aria-selected={activeTab === 'canva'}
            onClick={() => setActiveTab('canva')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              activeTab === 'canva'
                ? 'bg-[#7d2ae8] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>04 — Canva (Publikasi)</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-conclusion"
            aria-controls="panel-conclusion"
            aria-selected={activeTab === 'conclusion'}
            onClick={() => setActiveTab('conclusion')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === 'conclusion'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>05 — Kesimpulan</span>
          </button>
        </nav>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: OVERVIEW & SINERGI ALUR KERJA */}
          {activeTab === 'overview' && (
            <div
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
              className="space-y-6 max-w-4xl mx-auto animate-fade-in"
            >
              {/* Highlight Hero Message */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-blue-950/40 to-purple-950/40 border border-slate-700/60 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  Prinsip Utama Sinergi Tiga Tools
                </div>
                <blockquote className="text-base sm:text-lg font-bold text-white leading-snug">
                  &ldquo;Excel menghitung kebutuhan dan anggaran, Word menyusun proposal formal, lalu Canva mengomunikasikan kegiatan melalui desain visual.&rdquo;
                </blockquote>
                <p className="mt-2 text-xs text-slate-300">
                  Dalam administrasi OSIS modern, ketiga perangkat lunak ini saling melengkapi membentuk satu rantai alur kerja digital yang terpadu.
                </p>
              </div>

              {/* Tujuan Pembelajaran */}
              <div className="p-4 rounded-xl bg-[#0f141f] border border-slate-800 space-y-2.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Tujuan Pembelajaran Peserta Pelatihan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="font-semibold text-emerald-300">1. Anggaran Otomatis:</span>
                    <p className="text-slate-400 mt-0.5">Membuat tabel RAB di Excel dengan formula perkalian dan penjumlahan otomatis tanpa kalkulator manual.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="font-semibold text-blue-300">2. Proposal Baku:</span>
                    <p className="text-slate-400 mt-0.5">Menyusun proposal legal di Word dengan mistar Tab Stop untuk titik dua sejajar dan penomoran otomatis.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="font-semibold text-purple-300">3. Publikasi Visual:</span>
                    <p className="text-slate-400 mt-0.5">Mendesain poster pengumuman kegiatan di Canva dengan hierarki tipografi dan komposisi visual yang menarik.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <span className="font-semibold text-amber-300">4. Alur Kerja Terpadu:</span>
                    <p className="text-slate-400 mt-0.5">Menghubungkan data angka dari Excel ke dalam tabel proposal Word, lalu menjadi materi publikasi Canva.</p>
                  </div>
                </div>
              </div>

              {/* Tiga Tahap Alur Kerja SPETRA 2026 */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  Alur Kerja Nyata: Studi Kasus SPETRA 2026
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase">Tahap 01</span>
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Hitung Anggaran (Excel)</h4>
                    <p className="text-slate-300">
                      Menghitung volume, satuan, dan harga perlengkapan dengan formula <code className="text-emerald-300">=C5*D5</code>, ditarik fill-handle, dan dijumlahkan dengan <code className="text-emerald-300">=SUM(E5:E40)</code>.
                    </p>
                    <div className="pt-1">
                      <span className="text-[10px] text-emerald-300/80 font-medium">Output: Lembar RAB siap lampiran</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-400 uppercase">Tahap 02</span>
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Susun Proposal (Word)</h4>
                    <p className="text-slate-300">
                      Menyusun naskah legal <code className="text-blue-300">PROPOSAL EVENT SPETRA</code>, meratakan titik dua susunan panitia dengan mistar Tab Stop, tabel peserta lomba, dan lembar pengesahan.
                    </p>
                    <div className="pt-1">
                      <span className="text-[10px] text-blue-300/80 font-medium">Output: Berkas proposal resmi siap ttd</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-400 uppercase">Tahap 03</span>
                      <Palette className="w-4 h-4 text-purple-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Publikasikan (Canva)</h4>
                    <p className="text-slate-300">
                      Mengekstrak tanggal dan panitia menjadi poster visual potret <code className="text-purple-300">UPACARA BENDERA</code> & pengumuman SPETRA dengan pita merah putih, kartu info, dan ekspor cetak A3.
                    </p>
                    <div className="pt-1">
                      <span className="text-[10px] text-purple-300/80 font-medium">Output: Poster cetak mading & medsos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matriks Komparasi Ringkas */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0f141f]">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#141b2a] text-slate-200 font-semibold border-b border-slate-800">
                      <th className="p-3">Dimensi</th>
                      <th className="p-3 text-emerald-400">Microsoft Excel</th>
                      <th className="p-3 text-blue-400">Microsoft Word</th>
                      <th className="p-3 text-purple-400">Canva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-white">Fungsi Utama</td>
                      <td className="p-3">Perhitungan angka, RAB, & rumus otomatis</td>
                      <td className="p-3">Proposal resmi, surat dinas, & tata tertib</td>
                      <td className="p-3">Poster publikasi, banner, & materi visual</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Struktur Kerja</td>
                      <td className="p-3">Grid Sel 2 Dimensi (Baris & Kolom)</td>
                      <td className="p-3">Aliran Paragraf (*Flow Text*) & Mistar</td>
                      <td className="p-3">Kanvas Berbasis Lapisan (*Layers*)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Target Pembaca</td>
                      <td className="p-3">Bendahara, Kepala Sekolah, Auditor</td>
                      <td className="p-3">Pembina OSIS, Dinas, Arsip Resmi</td>
                      <td className="p-3">Siswa, Peserta Acara, Warga Sekolah</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: EXCEL (ANGGARAN) */}
          {activeTab === 'excel' && (
            <div
              role="tabpanel"
              id="panel-excel"
              aria-labelledby="tab-excel"
              className="space-y-6 max-w-4xl mx-auto animate-fade-in"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <ExcelBrandIcon className="w-10 h-10" />
                  <div>
                    <h3 className="text-base font-bold text-white">Microsoft Excel: Pengolah Angka & Anggaran Biaya</h3>
                    <p className="text-xs text-emerald-400">Tahap 01 — Menghitung Rencana Anggaran Biaya (RAB) Secara Otomatis</p>
                  </div>
                </div>

                {onLaunchSimulation && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLaunchSimulation('excel');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Buka Simulasi Excel</span>
                  </button>
                )}
              </div>

              {/* 3 Core Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-emerald-300">1. Masalah yang Diselesaikan</h4>
                  <p className="text-slate-300">
                    Menghilangkan kesalahan hitung manual pada anggaran OSIS. Mengubah rumus perkalian manual menjadi otomatis sehingga jika volume berubah, seluruh biaya langsung terbarui.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-emerald-300">2. Fitur & Formula Kunci</h4>
                  <p className="text-slate-300">
                    Perkalian <code className="text-emerald-300 font-mono">=C5*D5</code>, Fill Handle untuk menggandakan rumus ke bawah dalam 1 detik, serta <code className="text-emerald-300 font-mono">=SUM(...)</code> untuk total dana.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-emerald-300">3. Contoh Kasus SPETRA 2026</h4>
                  <p className="text-slate-300">
                    Menghitung 15 item belanja SPETRA (Banner 2 buah = Rp150.000, Vitamin 3 box = Rp240.000, dst.) menghasilkan grand total akurat tanpa selisih 1 rupiah pun.
                  </p>
                </div>
              </div>

              {/* MOCKUP VISUAL OUTPUT NYATA EXCEL */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Contoh Output Nyata: Tabel RAB Excel (SPETRA 2026)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Contoh RAB Excel
                  </span>
                </div>

                {/* Styled Spreadsheet Mockup */}
                <div className="overflow-x-auto rounded-lg border border-slate-700 bg-white text-slate-800 text-xs font-mono shadow-md">
                  <div className="bg-[#107c41] text-white px-3 py-1.5 font-bold text-xs flex items-center justify-between">
                    <span>ANGGARAN DANA SPETRA 2026.xlsx</span>
                    <span className="text-[10px] bg-emerald-800 px-1.5 py-0.5 rounded font-normal">Sheet1</span>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-300 font-bold text-[11px]">
                        <th className="p-2 border-r border-slate-300 w-10 text-center">No</th>
                        <th className="p-2 border-r border-slate-300">Uraian Kebutuhan</th>
                        <th className="p-2 border-r border-slate-300 text-center w-16">Vol</th>
                        <th className="p-2 border-r border-slate-300 text-center w-16">Sat</th>
                        <th className="p-2 border-r border-slate-300 text-right">Harga Satuan</th>
                        <th className="p-2 text-right bg-emerald-50">Subtotal (=C*D)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px]">
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-center">1</td>
                        <td className="p-2 border-r border-slate-200 font-sans font-medium">Banner Utama Panggung 4x2 m</td>
                        <td className="p-2 border-r border-slate-200 text-center">2</td>
                        <td className="p-2 border-r border-slate-200 text-center">Buah</td>
                        <td className="p-2 border-r border-slate-200 text-right">Rp 75.000</td>
                        <td className="p-2 text-right bg-emerald-50/60 font-semibold">Rp 150.000</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-center">2</td>
                        <td className="p-2 border-r border-slate-200 font-sans font-medium">Kapur Lapangan & Tali Pembatas</td>
                        <td className="p-2 border-r border-slate-200 text-center">5</td>
                        <td className="p-2 border-r border-slate-200 text-center">Sak</td>
                        <td className="p-2 border-r border-slate-200 text-right">Rp 25.000</td>
                        <td className="p-2 text-right bg-emerald-50/60 font-semibold">Rp 125.000</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-200 text-center">3</td>
                        <td className="p-2 border-r border-slate-200 font-sans font-medium">Paket Vitamin & Medis Peserta</td>
                        <td className="p-2 border-r border-slate-200 text-center">3</td>
                        <td className="p-2 border-r border-slate-200 text-center">Box</td>
                        <td className="p-2 border-r border-slate-200 text-right">Rp 80.000</td>
                        <td className="p-2 text-right bg-emerald-50/60 font-semibold">Rp 240.000</td>
                      </tr>
                      <tr className="bg-emerald-100 font-bold border-t-2 border-emerald-600">
                        <td colSpan={5} className="p-2 text-right text-emerald-950 font-sans">
                          GRAND TOTAL (=SUM(E5:E40)):
                        </td>
                        <td className="p-2 text-right text-emerald-950 text-xs font-mono font-black">
                          Rp 4.700.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expandable Technical Deep Dive */}
              <div className="rounded-xl border border-slate-800 bg-[#0f141f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Detail Teknis & Arsitektur Mesin Excel (Klik untuk membuka)</span>
                  </span>
                  {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showTechnicalDetails && (
                  <div className="p-4 pt-1 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                    <p>
                      <strong>DAG Calculation Tree:</strong> Excel memelihara grafik ketergantungan sel (Directed Acyclic Graph). Ketika sel input (C5 atau D5) diedit, hanya sel turunannya yang dihitung ulang secara multi-thread.
                    </p>
                    <p>
                      <strong>Format Nilai vs Tampilan:</strong> Nilai asli tetap angka murni (misal <code className="text-emerald-300">75000</code>), sementara format mata uang seperti <code className="text-emerald-300">Rp 75.000</code> hanyalah lapisan tampilan (*accounting format mask*) sehingga kalkulasi tetap berjalan valid.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: WORD (PROPOSAL) */}
          {activeTab === 'word' && (
            <div
              role="tabpanel"
              id="panel-word"
              aria-labelledby="tab-word"
              className="space-y-6 max-w-4xl mx-auto animate-fade-in"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <WordBrandIcon className="w-10 h-10" />
                  <div>
                    <h3 className="text-base font-bold text-white">Microsoft Word: Pengolah Kata & Naskah Proposal Resmi</h3>
                    <p className="text-xs text-blue-400">Tahap 02 — Menyusun Dokumen Administrasi & Pengesahan Kegiatan OSIS</p>
                  </div>
                </div>

                {onLaunchSimulation && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLaunchSimulation('word');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Buka Simulasi Word</span>
                  </button>
                )}
              </div>

              {/* 3 Core Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-blue-300">1. Masalah yang Diselesaikan</h4>
                  <p className="text-slate-300">
                    Memastikan dokumen proposal OSIS memiliki format legal formal yang rapi, hierarki judul yang terstruktur, dan tata letak nama panitia yang sejajar tanpa spasi manual yang berantakan.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-blue-300">2. Fitur Kunci Administrasi</h4>
                  <p className="text-slate-300">
                    Mistar Tab Stop (Left Tab) untuk perataan titik dua panitia sejajar, Heading Styles untuk Daftar Isi, dan Section Breaks untuk nomor halaman formal (i, ii, 1, 2).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-blue-300">3. Contoh Kasus SPETRA 2026</h4>
                  <p className="text-slate-300">
                    Naskah proposal lengkap 8 halaman: Surat Pengantar Kepala Sekolah, Bab I Pendahuluan, Susunan Panitia Inti, dan Tabel Delegasi Lomba tiap kelas.
                  </p>
                </div>
              </div>

              {/* MOCKUP VISUAL OUTPUT NYATA WORD */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Contoh Output Nyata: Halaman Proposal A4 (SPETRA 2026)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                    Contoh Proposal Word
                  </span>
                </div>

                {/* Styled A4 Sheet Mockup */}
                <div className="rounded-lg border border-slate-700 bg-white text-slate-800 p-5 font-serif text-xs shadow-md space-y-3 max-w-2xl mx-auto">
                  <div className="text-center border-b-2 border-slate-800 pb-2">
                    <h5 className="font-bold text-sm tracking-wide uppercase">ORGANISASI SISWA INTRA SEKOLAH (OSIS)</h5>
                    <p className="text-[10px] text-slate-600 font-sans">Jl. Pendidikan No. 45 • Telp: (021) 8876543 • Tahun Ajaran 2025/2026</p>
                  </div>

                  <div className="text-center pt-1 pb-1">
                    <h4 className="font-bold text-xs uppercase tracking-tight text-slate-900">
                      PROPOSAL EVENT OLAHRAGA, PMI DAN BULAN BAHASA (SPETRA 2026)
                    </h4>
                  </div>

                  <div className="space-y-1.5 font-sans text-[11px] text-slate-700">
                    <p className="font-serif font-bold text-xs text-slate-900">BAB III — SUSUNAN KEPANITIAAN</p>
                    <div className="space-y-1 font-mono text-[10px] pl-2 border-l-2 border-blue-500 bg-slate-50 p-2 rounded">
                      <div>Koordinator Umum&emsp;: Siti Badriyah, S.Pd</div>
                      <div>Pembina OSIS&emsp;&emsp;&emsp;: Hendra Saputra, M.Kom</div>
                      <div>Ketua Pelaksana&emsp;&emsp;: Aruna Maharani (XI MIPA 1)</div>
                      <div>Sekretaris Umum&emsp;&emsp;: Syarifah (XI IPS 2)</div>
                      <div>Bendahara Pelaksana&nbsp;: Syakira (XI MIPA 2)</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-sans text-slate-500">
                    <span>Halaman 1 dari 8</span>
                    <span className="italic font-serif">Status: Disetujui & Siap Pengesahan</span>
                  </div>
                </div>
              </div>

              {/* Expandable Technical Deep Dive */}
              <div className="rounded-xl border border-slate-800 bg-[#0f141f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>Detail Teknis & Format Berkas OOXML (Klik untuk membuka)</span>
                  </span>
                  {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showTechnicalDetails && (
                  <div className="p-4 pt-1 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                    <p>
                      <strong>Arsitektur ISO/IEC 29500 (OOXML):</strong> File berkas <code className="text-blue-300">.docx</code> merupakan paket terkompresi ZIP yang membungkus dokumen XML terstruktur (<code className="text-blue-300">document.xml</code>, <code className="text-blue-300">styles.xml</code>, <code className="text-blue-300">numbering.xml</code>).
                    </p>
                    <p>
                      <strong>Keunggulan Format:</strong> Memungkinkan interoperabilitas naskah formal, pemisahan konten teks dengan penataan gaya, dan pencegahan kerusakan dokumen jangka panjang.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CANVA (PUBLIKASI) */}
          {activeTab === 'canva' && (
            <div
              role="tabpanel"
              id="panel-canva"
              aria-labelledby="tab-canva"
              className="space-y-6 max-w-4xl mx-auto animate-fade-in"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <CanvaBrandIcon className="w-10 h-10" />
                  <div>
                    <h3 className="text-base font-bold text-white">Canva: Komposisi Desain Visual & Publikasi Sekolah</h3>
                    <p className="text-xs text-purple-400">Tahap 03 — Mengomunikasikan Acara ke Seluruh Siswa & Media Sosial</p>
                  </div>
                </div>

                {onLaunchSimulation && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLaunchSimulation('canva');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Buka Simulasi Canva</span>
                  </button>
                )}
              </div>

              {/* 3 Core Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-purple-300">1. Masalah yang Diselesaikan</h4>
                  <p className="text-slate-300">
                    Menghilangkan poster sekolah yang monoton atau sulit dibaca. Menyajikan informasi proposal yang padat menjadi visual yang segar, menarik, dan informatif bagi seluruh siswa.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-purple-300">2. Fitur Kunci Desain</h4>
                  <p className="text-slate-300">
                    Hierarki tipografi yang kuat, smart magnetic snapping untuk perataan elemen otomatis, kartu info waktu dan petugas, serta format ekspor PDF Print A3 yang siap cetak.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-purple-300">3. Contoh Kasus Desain</h4>
                  <p className="text-slate-300">
                    Poster potret &ldquo;Upacara Bendera Hari Senin&rdquo; lengkap dengan pita merah putih, Garuda Pancasila, rincian petugas kelas XI FKK, dan pembina upacara.
                  </p>
                </div>
              </div>

              {/* MOCKUP VISUAL OUTPUT NYATA CANVA */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    Contoh Output Nyata: Poster Potret Upacara Bendera
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    Contoh Poster Canva
                  </span>
                </div>

                {/* Styled Poster Preview Frame */}
                <div className="rounded-xl border border-slate-700 bg-[#fffdfa] text-slate-800 p-6 shadow-md max-w-sm mx-auto text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-600 to-transparent opacity-20 pointer-events-none rounded-bl-full" />
                  
                  {/* Drop Cap Typography: U + PACARA */}
                  <div className="flex items-center justify-center pt-2" aria-label="Upacara">
                    <span className="font-serif italic font-black text-3xl text-red-600 leading-none">U</span>
                    <span className="bg-red-700 text-white font-black text-base px-1.5 py-0.5 rounded-xs ml-0.5 tracking-wider">PACARA</span>
                  </div>
                  <h4 className="text-2xl font-black text-red-600 tracking-tight uppercase mt-0.5">BENDERA</h4>
                  <p className="font-serif italic text-xs text-slate-600">Hari Senin • Lapangan Utama Sekolah</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-sans text-left">
                    <div className="p-2 rounded bg-red-50 border border-red-200">
                      <span className="text-red-700 font-bold block">Tanggal & Waktu</span>
                      <span className="text-slate-800 font-medium">Senin, 21 Sept • 07.15 WIB</span>
                    </div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-200">
                      <span className="text-amber-800 font-bold block">Petugas Upacara</span>
                      <span className="text-slate-800 font-medium">Siswa Kelas XI FKK</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] text-slate-400 font-sans">
                    *Poster resmi edukasi kenegaraan OSIS
                  </p>
                </div>
              </div>

              {/* Expandable Technical Deep Dive */}
              <div className="rounded-xl border border-slate-800 bg-[#0f141f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>Detail Teknis & Mesin Rendering WebGL Canva (Klik untuk membuka)</span>
                  </span>
                  {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showTechnicalDetails && (
                  <div className="p-4 pt-1 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                    <p>
                      <strong>Arsitektur Canvas & WebGL:</strong> Canva mengeksekusi manipulasi lapisan vektor SVG dan bayangan teks secara real-time di browser menggunakan akselerasi grafis GPU (WebGL Shaders).
                    </p>
                    <p>
                      <strong>Ekspor Cetak Presisi:</strong> Mengubah tata letak kanvas web koordinat piksel menjadi format siap cetak CMYK 300 DPI dengan tanda potong (*bleed lines*) untuk hasil cetak spanduk mading sekolah.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: FINISH LINE & KESIMPULAN */}
          {activeTab === 'conclusion' && (
            <div
              role="tabpanel"
              id="panel-conclusion"
              aria-labelledby="tab-conclusion"
              className="space-y-6 max-w-4xl mx-auto animate-fade-in"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900 to-purple-950/50 border border-slate-700 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Award className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Kesimpulan Akhir Presentasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Satu Kegiatan, Tiga Alur Produktivitas Terpadu
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    Satu kegiatan OSIS dapat dikelola dengan tiga alur: <strong>Excel</strong> membantu menghitung, <strong>Word</strong> membantu meresmikan, dan <strong>Canva</strong> membantu menyampaikan.
                  </p>
                </div>

                {/* Summary checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs">
                    <span className="font-bold text-emerald-400 block mb-1">01. Excel</span>
                    <span className="text-slate-300">RAB pasti, formula otomatis, bebas galat kalkulasi.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/30 text-xs">
                    <span className="font-bold text-blue-400 block mb-1">02. Word</span>
                    <span className="text-slate-300">Proposal rapi, mistar titik dua, siap stempel resmi.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/30 text-xs">
                    <span className="font-bold text-purple-400 block mb-1">03. Canva</span>
                    <span className="text-slate-300">Poster visual menarik, komunikasi efektif ke siswa.</span>
                  </div>
                </div>

                {/* Finish Line Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  {onLaunchSimulation && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onLaunchSimulation('excel');
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Mulai Simulasi Interaktif</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
                  >
                    Tutup & Kembali ke Beranda
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <footer className="bg-[#111622] border-t border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs">Dokumentasi Pelatihan Divisi IPTEK OSIS &copy; 2026</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] text-slate-500 hidden md:inline">Navigasi: Klik tab di atas atau tombol di bawah</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup dialog materi"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Tutup & Kembali
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

