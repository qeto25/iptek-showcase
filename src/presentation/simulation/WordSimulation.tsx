import React, { useState, useEffect } from 'react';
import {
  Save,
  Undo2,
  Redo2,
  Search,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Award,
  Minus,
  Plus,
  X,
  Share2
} from 'lucide-react';
import { VirtualCursor, CursorType } from './VirtualCursor';

interface WordSimulationProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  speed: number;
  isPlaying: boolean;
  onClose?: () => void;
}

export const WordSimulation: React.FC<WordSimulationProps> = ({
  currentStep,
  speed,
  onClose
}) => {
  // Virtual Cursor Choreography State
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 25 });
  const [isCursorClicking, setIsCursorClicking] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorAction, setCursorAction] = useState<string | undefined>(undefined);

  // Progressive typing states
  const [typedTitle, setTypedTitle] = useState('');
  const [revealedPanitiaCount, setRevealedPanitiaCount] = useState(0);

  const fullTitle = 'PROPOSAL EVENT OLAHRAGA, PMI DAN BULAN BAHASA';

  const panitiaIntiList = [
    { role: 'Koordinator', name: 'Siti Badriyah, S.Pd.I.,Gr' },
    { role: 'Pembina', name: 'Hendra Saputra, S.Pd' },
    { role: 'Ketua Pelaksana', name: 'Aruna Maharani' },
    { role: 'Sekretaris', name: 'Syarifah Afifatul Auliyah' },
    { role: 'Bendahara', name: 'Syakira Alzahra' }
  ];

  // Natural Step-by-Step Mouse & Typing Choreography
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, Math.floor(ms / speed));
      timeouts.push(id);
    };

    if (currentStep === 0) {
      // Step 0: Judul Proposal
      setTypedTitle('');
      setRevealedPanitiaCount(0);
      setCursorPos({ x: 45, y: 15 });
      setCursorType('default');
      setCursorAction(undefined);
      setIsCursorClicking(false);

      // Move to title center
      t(() => {
        setCursorPos({ x: 50, y: 23 });
        setCursorType('text');
        setCursorAction('Ketik Judul Proposal');
      }, 300);

      // Click center
      t(() => setIsCursorClicking(true), 800);
      t(() => setIsCursorClicking(false), 1100);

      // Type title smoothly
      t(() => setTypedTitle('PROPOSAL'), 1300);
      t(() => setTypedTitle('PROPOSAL EVENT'), 1600);
      t(() => setTypedTitle('PROPOSAL EVENT OLAHRAGA, PMI'), 2000);
      t(() => {
        setTypedTitle('PROPOSAL EVENT OLAHRAGA, PMI DAN BULAN BAHASA');
        setCursorAction('Times New Roman 14pt (Bold, Center)');
      }, 2500);

    } else if (currentStep === 1) {
      // Step 1: Susunan Kepanitiaan Inti
      setTypedTitle(fullTitle);
      setRevealedPanitiaCount(0);

      // Move to Section I
      t(() => {
        setCursorPos({ x: 30, y: 31 });
        setCursorType('text');
        setCursorAction('Ketik Bab I. SUSUNAN KEPANITIAAN');
      }, 300);

      t(() => setIsCursorClicking(true), 800);
      t(() => setIsCursorClicking(false), 1050);

      // Reveal panitia lines progressively
      t(() => { setRevealedPanitiaCount(1); setCursorPos({ x: 34, y: 36 }); }, 1300);
      t(() => { setRevealedPanitiaCount(2); setCursorPos({ x: 34, y: 39 }); }, 1800);
      t(() => { setRevealedPanitiaCount(3); setCursorPos({ x: 34, y: 42 }); }, 2300);
      t(() => { setRevealedPanitiaCount(4); setCursorPos({ x: 34, y: 45 }); }, 2800);
      t(() => {
        setRevealedPanitiaCount(5);
        setCursorPos({ x: 34, y: 48 });
        setCursorAction('Tab Stop Perataan Titik Dua Rapi');
      }, 3300);

    } else if (currentStep === 2) {
      // Step 2: Seksi Acara & Seksi Perlengkapan
      setTypedTitle(fullTitle);
      setRevealedPanitiaCount(5);

      // Move cursor to ribbon Numbering
      t(() => {
        setCursorPos({ x: 23, y: 9 });
        setCursorType('pointer');
        setCursorAction('Format Numbering 1. 2. 3.');
      }, 300);

      t(() => setIsCursorClicking(true), 900);
      t(() => setIsCursorClicking(false), 1150);

      // Move cursor to document section
      t(() => {
        setCursorPos({ x: 32, y: 56 });
        setCursorType('text');
        setCursorAction('Delegasi Seksi Acara & Perlengkapan');
      }, 1500);

    } else if (currentStep === 3) {
      // Step 3: Lembar Pengesahan & Cap Basah
      setTypedTitle(fullTitle);
      setRevealedPanitiaCount(5);

      // Move cursor to signature block
      t(() => {
        setCursorPos({ x: 68, y: 78 });
        setCursorType('pointer');
        setCursorAction('Pengesahan & Stempel Basah SPETRA');
      }, 300);

      t(() => setIsCursorClicking(true), 1000);
      t(() => {
        setIsCursorClicking(false);
        setCursorAction('Dokumen Resmi Disahkan');
      }, 1300);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [currentStep, speed]);

  return (
    <div className="flex flex-col h-full bg-[#185abd] text-slate-800 select-none overflow-hidden font-sans relative">
      {/* Dynamic Virtual Cursor Layer */}
      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        isClicking={isCursorClicking}
        type={cursorType}
        actionText={cursorAction}
      />

      {/* 1. Word 365 Blue Titlebar (Exact 1:1 Match to User's Word Screenshot!) */}
      <div className="bg-[#185abd] text-white px-3 py-1.5 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-blue-100 font-semibold">
            <span>AutoSave</span>
            <span className="w-7 h-4 bg-blue-900/80 rounded-full flex items-center px-0.5">
              <span className="w-3 h-3 bg-white rounded-full shadow-xs" />
            </span>
            <span className="text-[10px] text-blue-200">Off</span>
          </div>
          <div className="h-3.5 w-[1px] bg-blue-400/40" />
          <div className="flex items-center gap-2 text-blue-100 text-[11px]">
            <button type="button" className="p-0.5 hover:text-white cursor-pointer" title="Save (Ctrl+S)">
              <Save className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-0.5 hover:text-white cursor-pointer" title="Undo (Ctrl+Z)">
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-0.5 hover:text-white cursor-pointer" title="Redo (Ctrl+Y)">
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Document Name */}
        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold tracking-wide">
            PROPOSAL SPETRA.docx
          </span>
          <span className="text-[11px] text-blue-200">- Compatibility Mode - Saved to this PC</span>
        </div>

        {/* Right Search, Profile & Desktop Window Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] text-blue-200 font-mono hidden md:inline px-2 py-0.5 rounded bg-blue-700/50 border border-blue-400/30">
            Aplikasi Desktop (Office 365)
          </span>

          <div className="hidden lg:flex items-center gap-1.5 bg-blue-700/60 hover:bg-blue-700 text-blue-100 px-3 py-1 rounded text-[11px] border border-blue-400/30">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-100 font-medium">
            <span className="hidden sm:inline">qeto 40</span>
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
              C
            </div>
          </div>

          {/* Windows Window Controls */}
          <div className="flex items-center pl-1 border-l border-blue-700">
            <button
              type="button"
              aria-label="Kecilkan jendela Word"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-blue-700 text-white/80 hover:text-white cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              aria-label="Perbesar jendela Word"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-blue-700 text-white/80 hover:text-white cursor-pointer"
            >
              <span className="w-2.5 h-2.5 border border-current rounded-xs" />
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup jendela Word (Esc)"
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-600 text-white transition-colors cursor-pointer"
                title="Tutup Word (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Real Word Ribbon Menu Tabs */}
      <div className="bg-[#f3f2f1] text-slate-700 px-3 flex items-center gap-1 text-xs border-b border-slate-300 shrink-0">
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">File</span>
        <span className="px-2.5 py-1.5 text-[#185abd] font-bold border-b-2 border-[#185abd] cursor-pointer">
          Home
        </span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Insert</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Draw</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Design</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Layout</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden sm:inline">References</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden sm:inline">Mailings</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden md:inline">Review</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden md:inline">View</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden lg:inline">Help</span>
        <div className="ml-auto flex items-center gap-1.5 text-[#185abd] font-semibold text-xs px-2 py-1 rounded hover:bg-slate-200 cursor-pointer">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </div>
      </div>

      {/* 3. Real Clean Word Ribbon Toolbar */}
      <div className="bg-[#f3f2f1] px-3 py-1.5 flex flex-wrap items-center gap-3 text-xs border-b border-slate-300 shadow-xs text-slate-700 shrink-0">
        {/* Font Group */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-300 px-2 py-0.5 rounded">
          <span className="font-serif text-slate-800 text-xs font-medium">Times New Roman</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
          <div className="h-3 w-[1px] bg-slate-300 mx-1" />
          <span className="text-slate-800 text-xs font-mono">14</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>

        <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
          <button
            type="button"
            className="p-1 rounded bg-slate-300 text-slate-900 font-bold"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-slate-200 text-slate-700 italic" title="Italic">
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-slate-200 text-slate-700 underline" title="Underline">
            <Underline className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
          <button
            type="button"
            className={`p-1 rounded ${
              currentStep === 0 ? 'bg-slate-300 text-slate-900 font-bold' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Center Alignment (Judul)"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className={`p-1 rounded ${
              currentStep >= 1 ? 'bg-slate-300 text-slate-900 font-bold' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Align Left (Susunan Panitia)"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Numbering / List Button */}
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              currentStep === 2 ? 'bg-blue-100 text-blue-900 border border-blue-400' : 'bg-white border border-slate-300 text-slate-700'
            }`}
          >
            1. 2. 3.
          </span>
        </div>

        {/* Styles Gallery */}
        <div className="hidden lg:flex items-center gap-1">
          <span className="px-2 py-0.5 rounded bg-white border border-slate-300 text-[10px] font-bold text-slate-800">
            Normal
          </span>
          <span className="px-2 py-0.5 rounded hover:bg-slate-200 text-[10px] text-slate-600">
            Heading 1
          </span>
          <span className="px-2 py-0.5 rounded hover:bg-slate-200 text-[10px] text-slate-600">
            Title
          </span>
        </div>
      </div>

      {/* 4. Horizontal Ruler */}
      <div className="bg-[#f3f2f1] text-[9px] font-mono text-slate-500 px-12 py-0.5 border-b border-slate-300 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-5">
          <span>|···1···|···2···|···3···|···4···|···5···|···6···|···7···|···8···|···9···|···10···|···11···|···12···|···13···|···14···|···15···|···16···|···17···|···18</span>
        </div>
        <span className="text-[10px] text-slate-500">Margin Normal (2.54 cm)</span>
      </div>

      {/* 5. Document Scrollable Canvas Workspace */}
      <div className="flex-1 bg-[#e8e8e8] p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
        {/* Authentic White A4 Paper Sheet */}
        <div className="w-full max-w-2xl bg-white text-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.25)] p-8 sm:p-12 font-serif text-[13px] leading-relaxed min-h-[680px] border border-slate-300 relative transition-all duration-300">
          
          {/* STEP 0: JUDUL EVENT SPETRA */}
          <div className="text-center font-bold text-sm sm:text-base tracking-wide mb-8">
            <h1 className="uppercase font-serif">
              {currentStep === 0 ? typedTitle : fullTitle}
              {currentStep === 0 && (
                <span className="inline-block w-1.5 h-4 bg-slate-900 ml-0.5 animate-pulse align-middle" />
              )}
            </h1>
          </div>

          {/* STEP 1: SUSUNAN KEPANITIAAN INTI */}
          {currentStep >= 1 && (
            <div className="font-serif animate-fade-in">
              {/* Section Header */}
              <div className="font-bold text-sm mb-3">
                <span>I.</span>
                <span className="ml-6 uppercase">SUSUNAN KEPANITIAAN</span>
              </div>

              {/* Core Team Breakdown with exact Tab-Stop Alignment */}
              <div className="ml-10 text-xs sm:text-[13px] leading-relaxed space-y-1 text-slate-900 mb-6 font-serif">
                {panitiaIntiList.map((panitia, idx) => {
                  const isVisible = currentStep > 1 || idx < revealedPanitiaCount;
                  if (!isVisible) return null;
                  return (
                    <div key={panitia.role} className="flex items-center animate-fade-in">
                      <span className="w-36 sm:w-44 text-slate-900">{panitia.role}</span>
                      <span className="w-6 text-center text-slate-900">:</span>
                      <span className="flex-1 text-slate-900 font-medium">{panitia.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SEKSI ACARA & SEKSI PERLENGKAPAN */}
          {currentStep >= 2 && (
            <div className="animate-fade-in font-serif ml-10 text-xs sm:text-[13px] leading-relaxed space-y-4 mb-8">
              {/* Seksi Acara */}
              <div>
                <p className="font-semibold text-slate-900">Seksi Acara :</p>
                <div className="ml-4 space-y-0.5 text-slate-800">
                  <p>1. Nailah</p>
                  <p>2. Zaschia Aulia Shandy</p>
                </div>
              </div>

              {/* Seksi Perlengkapan */}
              <div>
                <p className="font-semibold text-slate-900">Seksi Perlengkapan :</p>
                <div className="ml-4 space-y-0.5 text-slate-800">
                  <p>1. Alfin Nurudin</p>
                  <p>2. Dinda Aulia Nasution</p>
                  <p>3. Felisna Putri Ika Laura</p>
                  <p>4. Kamalia Syadza Atsilah</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LEMBAR PENGESAHAN & STEMPEL BASAH SPETRA */}
          {currentStep >= 3 && (
            <div className="animate-fade-in mt-10 pt-6 border-t border-slate-300 font-sans text-xs">
              <div className="grid grid-cols-2 text-center relative">
                {/* Sisi Kiri: Pembina SPETRA */}
                <div>
                  <p className="text-slate-600">Mengetahui,</p>
                  <p className="font-bold text-slate-900 mt-0.5">Pembina SPETRA 2026</p>
                  <div className="h-16 flex items-center justify-center font-serif italic text-sm text-blue-950 font-bold">
                    Hendra Saputra, S.Pd
                  </div>
                  <p className="text-[11px] text-slate-500">NIP. 19820514 200801 1 011</p>
                </div>

                {/* Sisi Kanan: Ketua Pelaksana & Stempel Basah */}
                <div className="relative">
                  <p className="text-slate-600">Hormat Kami,</p>
                  <p className="font-bold text-slate-900 mt-0.5">Ketua Pelaksana SPETRA</p>
                  <div className="h-16 flex items-center justify-center font-serif italic text-sm text-blue-950 font-bold">
                    Aruna Maharani
                  </div>
                  <p className="text-[11px] text-slate-500">NISN. 0081293847</p>

                  {/* Stempel Basah Merah Resmi SPETRA */}
                  <div className="absolute -top-3 left-4 z-20 pointer-events-none animate-stamp">
                    <div className="border-2 border-red-600 text-red-600 px-3 py-1.5 rounded-lg font-sans font-black text-[10px] tracking-wider uppercase bg-white/95 shadow-md flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-red-600" />
                      <span>DISAHKAN • PANITIA SPETRA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Word Status Bar */}
      <div className="bg-[#f3f2f1] text-slate-700 px-4 py-1 flex items-center justify-between text-[11px] border-t border-slate-300 font-sans select-none shrink-0">
        <div className="flex items-center gap-4">
          <span>Page 1 of 8</span>
          <span>{currentStep === 0 ? '12 Words' : currentStep === 1 ? '58 Words' : '1258 words'}</span>
          <span>Indonesian</span>
          <span className="hidden sm:inline">Accessibility: Good to go</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Print Layout</span>
          <div className="flex items-center gap-1 font-mono">
            <Minus className="w-3 h-3 cursor-pointer hover:text-slate-900" />
            <span>100%</span>
            <Plus className="w-3 h-3 cursor-pointer hover:text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
};
