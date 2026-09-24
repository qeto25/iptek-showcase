import React, { useState, useEffect } from 'react';
import {
  Layers,
  Crown,
  Share2,
  Search,
  Type,
  ChevronDown,
  Minus,
  Plus,
  X,
  Check,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star
} from 'lucide-react';
import { VirtualCursor, CursorType } from './VirtualCursor';

interface CanvaSimulationProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  speed: number;
  isPlaying: boolean;
  onClose?: () => void;
}

export const CanvaSimulation: React.FC<CanvaSimulationProps> = ({
  currentStep,
  speed,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'text' | 'template' | 'uploads'>('elements');

  // Virtual Cursor Choreography State
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 30 });
  const [isCursorClicking, setIsCursorClicking] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorAction, setCursorAction] = useState<string | undefined>(undefined);
  const [showSnapGuides, setShowSnapGuides] = useState(false);
  const [isExported, setIsExported] = useState(false);

  // Natural Step-by-Step Mouse Choreography
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, Math.floor(ms / speed));
      timeouts.push(id);
    };

    if (currentStep === 0) {
      // Step 0: Setup Kanvas
      setActiveTab('template');
      setShowSnapGuides(false);
      setIsExported(false);
      setCursorPos({ x: 2.5, y: 15 });
      setCursorType('default');
      setCursorAction(undefined);

      t(() => {
        setCursorPos({ x: 60, y: 40 });
        setCursorType('pointer');
        setCursorAction('Setup Kanvas Potret 4:5');
      }, 300);

      t(() => setIsCursorClicking(true), 900);
      t(() => {
        setIsCursorClicking(false);
        setCursorType('default');
      }, 1200);

    } else if (currentStep === 1) {
      // Step 1: Drag Pita & Garuda
      setActiveTab('elements');
      setShowSnapGuides(false);
      setIsExported(false);

      // Move to elements item in left drawer
      t(() => {
        setCursorPos({ x: 20, y: 32 });
        setCursorType('pointer');
        setCursorAction('Pilih Elemen Pita & Garuda');
      }, 200);

      // Click and drag
      t(() => {
        setIsCursorClicking(true);
        setCursorType('grabbing');
        setCursorAction('Drag ke Header Kanvas...');
      }, 700);

      // Drag across to canvas
      t(() => {
        setCursorPos({ x: 40, y: 24 });
      }, 1200);

      t(() => {
        setCursorPos({ x: 60, y: 18 });
        setShowSnapGuides(true);
      }, 1700);

      // Snap & release
      t(() => {
        setIsCursorClicking(false);
        setCursorType('default');
        setCursorAction('Header Nasionalis Terpasang');
      }, 2200);

      t(() => setShowSnapGuides(false), 2700);

    } else if (currentStep === 2) {
      // Step 2: Tipografi Upacara Bendera
      setActiveTab('text');
      setShowSnapGuides(false);
      setIsExported(false);

      // Click text tab in left rail
      t(() => {
        setCursorPos({ x: 2.5, y: 32 });
        setCursorType('pointer');
        setCursorAction('Pilih Teks & Tipografi');
      }, 200);

      t(() => setIsCursorClicking(true), 600);
      t(() => setIsCursorClicking(false), 850);

      // Move to canvas center headline
      t(() => {
        setCursorPos({ x: 60, y: 38 });
        setCursorType('text');
        setCursorAction('Atur Hierarki Font Upacara');
      }, 1200);

      t(() => setIsCursorClicking(true), 1700);
      t(() => {
        setIsCursorClicking(false);
        setCursorAction('Headline "BENDERA" Bold Terformat');
      }, 2000);

    } else if (currentStep === 3) {
      // Step 3: Kartu Petugas XI FKK, Siswa Hormat & Ekspor
      setShowSnapGuides(false);

      // Move to info card
      t(() => {
        setCursorPos({ x: 60, y: 64 });
        setCursorType('pointer');
        setCursorAction('Pasang Kartu Petugas XI FKK');
      }, 200);

      t(() => setIsCursorClicking(true), 600);
      t(() => setIsCursorClicking(false), 850);

      // Move to student illustration
      t(() => {
        setCursorPos({ x: 60, y: 78 });
        setCursorType('pointer');
        setCursorAction('Atur Posisi Siswa Hormat');
      }, 1200);

      t(() => setIsCursorClicking(true), 1600);
      t(() => setIsCursorClicking(false), 1850);

      // Move to top right Bagikan / Ekspor
      t(() => {
        setCursorPos({ x: 86, y: 4.5 });
        setCursorType('pointer');
        setCursorAction('Ekspor Siap Cetak (300 DPI)');
      }, 2300);

      t(() => setIsCursorClicking(true), 2800);
      t(() => {
        setIsCursorClicking(false);
        setIsExported(true);
        setCursorAction('Poster Siap Publikasi!');
      }, 3100);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [currentStep, speed]);

  return (
    <div className="flex flex-col h-full bg-[#0e1318] text-slate-100 select-none overflow-hidden font-sans relative">
      {/* Dynamic Virtual Cursor Layer */}
      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        isClicking={isCursorClicking}
        type={cursorType}
        actionText={cursorAction}
      />

      {/* 0. Authentic Web Browser Chrome Frame (Google Chrome / Edge) */}
      <div className="bg-[#1e232a] text-slate-300 border-b border-[#2b313a] shrink-0 text-xs select-none">
        {/* Browser Tab Strip */}
        <div className="flex items-center justify-between px-2 pt-1.5 pb-0 bg-[#14181d]">
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {/* Active Canva Tab */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-[#1e232a] text-white border-t border-x border-[#2b313a] shadow-xs text-[11px] font-medium max-w-[240px]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00c4cc] flex items-center justify-center text-[8px] font-black text-slate-950">
                C
              </span>
              <span className="truncate">Canva — Poster Upacara Bendera</span>
              <span className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer ml-1">
                <X className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* New Tab Button */}
            <button type="button" aria-label="Tab Baru" className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded cursor-pointer">
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Browser Window Controls (Minimize, Maximize, Close) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-teal-300 font-mono hidden sm:inline px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              Web Browser (Cloud Studio)
            </span>
            <div className="flex items-center">
              <button type="button" aria-label="Kecilkan jendela browser" className="w-8 h-6 flex items-center justify-center hover:bg-slate-700/50 text-slate-400 hover:text-white cursor-pointer">
                <Minus className="w-3 h-3" />
              </button>
              <button type="button" aria-label="Perbesar jendela browser" className="w-8 h-6 flex items-center justify-center hover:bg-slate-700/50 text-slate-400 hover:text-white cursor-pointer">
                <span className="w-2.5 h-2.5 border border-current rounded-xs" />
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup jendela browser (Esc)"
                  className="w-8 h-6 flex items-center justify-center hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Browser Navigation & URL Omnibox */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e232a]">
          <div className="flex items-center gap-1 text-slate-400">
            <button type="button" aria-label="Halaman Sebelumnya" className="p-1 hover:text-white hover:bg-slate-700/50 rounded cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button type="button" aria-label="Halaman Berikutnya" className="p-1 hover:text-white hover:bg-slate-700/50 rounded opacity-40 cursor-not-allowed">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button type="button" aria-label="Muat Ulang Halaman" className="p-1 hover:text-white hover:bg-slate-700/50 rounded cursor-pointer">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <div className="flex-1 flex items-center gap-2 bg-[#12161b] hover:bg-[#151a21] border border-[#2e3540] rounded-full px-3 py-1 text-xs text-slate-300 shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-slate-400 select-all font-mono text-[11px] truncate">
              https://<strong className="text-white">www.canva.com</strong>/design/DAF8kL2sPqY/edit?folder=osis-spetra
            </span>
            <div className="ml-auto flex items-center gap-1.5 text-slate-400">
              <Star className="w-3 h-3 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>

          {/* Browser User Profile */}
          <div className="flex items-center gap-1.5 pl-1 text-[11px] text-slate-300">
            <div className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[9px] shadow-xs">
              IP
            </div>
            <span className="hidden lg:inline text-slate-400">OSIS IPTEK</span>
          </div>
        </div>
      </div>

      {/* 1. Canva Studio Top Navbar */}
      <div className="bg-[#00c4cc] text-slate-900 px-3 py-1 flex items-center justify-between text-xs select-none shrink-0 border-b border-teal-500 shadow-sm">
        {/* Left: Canva Teal Home Button, File, Ubah Ukuran, Edit */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer transition-colors shadow-xs">
            <Layers className="w-4 h-4 text-slate-900" />
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 cursor-pointer font-medium text-slate-900">
            <span>File</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 cursor-pointer font-medium text-slate-900">
            <span>Ubah ukuran</span>
            <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 cursor-pointer font-medium text-slate-900">
            <span>Edit</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* Center: Title UPACARA BENDERA Hari Senin */}
        <div className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-slate-950 font-bold text-xs cursor-pointer">
          <span>UPACARA BENDERA Hari Senin</span>
        </div>

        {/* Right: User Avatar SA, Bagikan, Kirim ke guru */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shadow-xs" title="User: SA">
            SA
          </div>
          <button type="button" className="p-1 rounded hover:bg-white/10 text-slate-900 cursor-pointer" title="Komentar">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1 bg-[#7d2ae8] hover:bg-[#6b21a8] text-white px-3 py-1 rounded font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <span>Bagikan</span>
          </button>
          <button
            type="button"
            className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded font-bold text-xs transition-all shadow-sm cursor-pointer ${
              isExported
                ? 'bg-emerald-600 text-white border border-emerald-400'
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
            {isExported && <Check className="w-3 h-3" />}
            <span>{isExported ? 'Siap Dicetak' : 'Kirim ke guru'}</span>
          </button>
        </div>
      </div>

      {/* 2. Canva Workspace Layout (Left Rail + Drawer Panel + Artboard Stage) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* A. Left Primary Navigation Rail */}
        <div className="w-16 bg-[#18191b] border-r border-[#25262a] flex flex-col items-center py-3 gap-5 shrink-0 z-20 select-none text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('template')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'template' ? 'text-[#00c4cc] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Desain</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('elements')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'elements' ? 'text-[#00c4cc] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Elemen</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'text' ? 'text-[#00c4cc] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Teks</span>
          </button>
        </div>

        {/* B. Left Drawer Panel */}
        <div className="w-64 bg-[#25262a] border-r border-[#303136] p-3 hidden sm:flex flex-col gap-3 shrink-0 overflow-y-auto z-10 text-xs">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              readOnly
              value={activeTab === 'text' ? 'Teks Upacara' : 'Upacara Bendera EDU'}
              className="w-full bg-[#18191b] border border-[#3e4046] rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-200"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Section: Terakhir Digunakan */}
          <div>
            <div className="flex items-center justify-between text-slate-400 font-semibold mb-2 text-[11px]">
              <span>Terakhir digunakan</span>
              <span className="text-[10px] text-teal-400 cursor-pointer">Lihat semua</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 h-14 rounded-lg flex items-center justify-center p-2 text-center text-[10px] font-bold text-white shadow-xs">
                <span>Pita Merah Putih</span>
              </div>
              <div className="bg-[#3e4046] h-14 rounded-lg flex items-center justify-center p-2 text-center text-[10px] font-bold text-white shadow-xs">
                <span>Garuda Emas</span>
              </div>
            </div>
          </div>

          {/* Section: Direkomendasikan untuk Anda */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-slate-400 font-semibold mb-2 text-[11px]">
              <span>Direkomendasikan</span>
              <span className="text-[10px] text-teal-400 cursor-pointer">Lihat semua</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#18191b] border border-[#3e4046] h-16 rounded-lg p-2 flex flex-col items-center justify-center gap-1 cursor-pointer">
                <span className="text-xl">🙋🏻‍♂️</span>
                <span className="text-[9px] text-slate-300 font-medium">Siswa Hormat</span>
              </div>
              <div className="bg-[#18191b] border border-[#3e4046] h-16 rounded-lg p-2 flex flex-col items-center justify-center gap-1 cursor-pointer">
                <span className="text-xl">👩🏽‍🏫</span>
                <span className="text-[9px] text-slate-300 font-medium">Guru PGRI</span>
              </div>
            </div>
          </div>
        </div>

        {/* C. Artboard Stage */}
        <div className="flex-1 bg-[#0e1318] p-4 sm:p-6 overflow-auto flex items-center justify-center relative">
          {/* Authentic Portrait 4:5 Poster Artboard */}
          <div className="w-[360px] sm:w-[420px] h-[520px] sm:h-[580px] bg-[#fff8ec] text-slate-900 rounded shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-300 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            
            {/* Magnetic Snapping Guide Line inside Artboard */}
            {showSnapGuides && (
              <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-pink-500 z-50 pointer-events-none" />
            )}

            {/* STEP 1: PITA MERAH PUTIH & GARUDA PANCASILA */}
            {currentStep >= 1 ? (
              <div className="relative z-10 animate-fade-in">
                {/* 3D Curved Ribbon */}
                <div className="absolute -top-3 -right-3 w-40 h-10 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-bl-3xl shadow-md border-b-2 border-red-700 transform rotate-1 flex items-center justify-center text-[10px] font-bold text-slate-900 opacity-90">
                  <span className="text-white drop-shadow-xs">MERAH</span>
                  <span className="text-red-700 ml-1">PUTIH</span>
                </div>

                {/* Garuda Pancasila Badge */}
                <div className="flex flex-col items-center justify-center pt-1">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center text-lg shadow-sm">
                    🦅
                  </div>
                  <span className="text-[8px] font-black tracking-widest text-amber-900 uppercase mt-0.5">
                    GARUDA PANCASILA
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-12" />
            )}

            {/* STEP 2: TIPOGRAFI UPACARA BENDERA HARI SENIN */}
            {currentStep >= 2 ? (
              <div className="relative z-10 my-auto animate-fade-in text-center">
                {/* Purple Canva selection box effect during Step 2 */}
                <div className={`p-2 rounded ${currentStep === 2 ? 'ring-2 ring-purple-600 ring-offset-2' : ''}`}>
                  <div className="flex items-center justify-center">
                    <span className="font-serif italic font-black text-4xl sm:text-5xl text-red-600 leading-none">
                      U
                    </span>
                    <span className="bg-red-700 text-white font-black text-xl sm:text-2xl px-2 py-0.5 tracking-wider rounded-xs ml-1">
                      PACARA
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight uppercase mt-1">
                    BENDERA
                  </h1>

                  <p className="font-serif italic text-base sm:text-lg text-slate-700 mt-0.5">
                    Hari Senin
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-auto h-24" />
            )}

            {/* STEP 3: KARTU PETUGAS (XI FKK) & ILUSTRASI SISWA */}
            {currentStep >= 3 ? (
              <div className="relative z-10 animate-fade-in space-y-2">
                {/* Information Card */}
                <div className="bg-[#fff1dc] border border-amber-300 rounded-xl p-2.5 shadow-sm text-center">
                  <div className="grid grid-cols-3 divide-x divide-amber-300 pb-1.5 mb-1.5 border-b border-amber-300 text-[9px]">
                    <div>
                      <p className="text-[7px] text-slate-500 font-bold uppercase">Tanggal</p>
                      <p className="font-bold text-slate-900">21 Sept 2026</p>
                    </div>
                    <div>
                      <p className="text-[7px] text-red-700 font-black uppercase">Petugas</p>
                      <p className="font-black text-red-700">XI FKK</p>
                    </div>
                    <div>
                      <p className="text-[7px] text-slate-500 font-bold uppercase">Waktu</p>
                      <p className="font-bold text-slate-900">07.30 WIB</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[7px] text-slate-500 font-bold uppercase">Pembina Upacara</p>
                    <p className="text-[10px] font-black text-red-700">
                      Bpk. Muhammad Fernanda S.M, Gr
                    </p>
                  </div>
                </div>

                {/* Vector Saluting Students & Teachers */}
                <div className="relative pt-1 flex items-end justify-center gap-2">
                  <div className="text-center">
                    <span className="text-xl">👩🏽‍🏫</span>
                    <p className="text-[7px] font-bold text-slate-600">Guru</p>
                  </div>
                  <div className="text-center scale-110">
                    <span className="text-2xl">🙋🏻‍♂️</span>
                    <p className="text-[8px] font-black text-red-700">Siswa Hormat</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl">🧕🏼</span>
                    <p className="text-[7px] font-bold text-slate-600">Siswi</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xl">👨🏽‍🏫</span>
                    <p className="text-[7px] font-bold text-slate-600">Pembina</p>
                  </div>
                </div>

                {/* Bottom Red Banner */}
                <div className="w-full bg-red-600 text-white rounded-lg py-1 px-2 flex items-center justify-between text-[8px] font-bold shadow-xs">
                  <span>@osis.smknusantara</span>
                  <span>@official.osis</span>
                  <span>SMK BISA HEBAT</span>
                </div>
              </div>
            ) : (
              <div className="h-20" />
            )}
          </div>
        </div>
      </div>

      {/* 4. Canva Bottom Status Controls */}
      <div className="bg-[#18191b] border-t border-[#25262a] px-3 py-1 flex items-center justify-between text-xs text-slate-400 select-none font-sans shrink-0">
        <div className="flex items-center gap-4 text-[11px]">
          <span className="cursor-pointer hover:text-white">📝 Catatan</span>
          <span className="cursor-pointer hover:text-white hidden sm:inline">⏱️ Hitung Mundur</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="font-mono">19%</span>
          <div className="flex items-center gap-1 font-mono">
            <Minus className="w-3 h-3 cursor-pointer hover:text-white" />
            <Plus className="w-3 h-3 cursor-pointer hover:text-white" />
          </div>
          <span>Halaman 1/3</span>
          <span className="cursor-pointer hover:text-white">⊞</span>
          <span className="cursor-pointer hover:text-white hidden sm:inline">⛶</span>
        </div>
      </div>
    </div>
  );
};
