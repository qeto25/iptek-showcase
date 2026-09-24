import React, { useState, useEffect } from 'react';
import {
  Save,
  Undo2,
  Redo2,
  Search,
  ChevronDown,
  Check,
  X,
  Minus,
  Plus,
  Share2,
  Bold,
  Italic,
  Underline,
  Sigma
} from 'lucide-react';
import { VirtualCursor, CursorType } from './VirtualCursor';

interface ExcelSimulationProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  speed: number;
  isPlaying: boolean;
  onClose?: () => void;
}

interface BudgetItem {
  no: number;
  item: string;
  qty: string;
  price: number;
  total: number;
}

export const ExcelSimulation: React.FC<ExcelSimulationProps> = ({
  currentStep,
  speed,
  onClose
}) => {
  const [activeCell, setActiveCell] = useState('E41');
  const [formulaDisplay, setFormulaDisplay] = useState('');
  
  // Virtual Cursor Choreography State
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 35 });
  const [isCursorClicking, setIsCursorClicking] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorAction, setCursorAction] = useState<string | undefined>(undefined);
  
  // Fill Handle Drag State (how many rows filled: 0 to 14)
  const [fillDragCount, setFillDragCount] = useState(0);

  // Exact items from the user's ANGGARAN DANA SPETRA ( OLGA , PMI , BAHASA ) 2026.xlsx
  const perlengkapanList: BudgetItem[] = [
    { no: 1, item: 'BANNER', qty: '1 PCS', price: 75000, total: 75000 },
    { no: 2, item: 'KAPUR', qty: '1 PCS', price: 15000, total: 15000 },
    { no: 3, item: 'PITA', qty: '2 PCS', price: 15000, total: 30000 },
    { no: 4, item: 'STIKER MENDALI', qty: '1 PCS', price: 10000, total: 10000 },
    { no: 5, item: 'VITAMIN', qty: '3 BOX', price: 80000, total: 240000 },
    { no: 6, item: 'PLASTIK REWARD', qty: '1 PCS', price: 30000, total: 30000 },
    { no: 7, item: 'KERTAS PADI', qty: '12 PCS', price: 3000, total: 36000 },
    { no: 8, item: 'ISOLASI', qty: '2 PCS', price: 5000, total: 10000 },
    { no: 9, item: 'DOUBLE TIPE', qty: '2 PCS', price: 6000, total: 12000 },
    { no: 10, item: 'SPIDOL', qty: '2 PCS', price: 7500, total: 15000 },
    { no: 11, item: 'PARTY POPPER', qty: '1 PCS', price: 9000, total: 9000 },
    { no: 12, item: 'SPIDOL WARNA', qty: '1 PCS', price: 40000, total: 40000 },
    { no: 13, item: 'BATERAI', qty: '1 PAKET', price: 60000, total: 60000 },
    { no: 14, item: 'KOUTA', qty: '1 PAKET', price: 25000, total: 25000 },
    { no: 15, item: 'KOTAK KUE', qty: '1 PAKET', price: 20000, total: 20000 }
  ];

  const subtotalPerlengkapan = perlengkapanList.reduce((acc, r) => acc + r.total, 0);

  const funRunList: BudgetItem[] = [
    { no: 16, item: 'JUARA 1 PUTRA ANGKATAN 16', qty: '1 PAKET', price: 75000, total: 75000 },
    { no: 17, item: 'JUARA 1 PUTRI ANGKATAN 16', qty: '1 PAKET', price: 75000, total: 75000 }
  ];

  const grandTotal = subtotalPerlengkapan + 150000;

  // Natural Step-by-Step Mouse & Typing Choreography
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, Math.floor(ms / speed));
      timeouts.push(id);
    };

    if (currentStep === 0) {
      // Step 0: Input Angka Mentah SPETRA
      setActiveCell('D5');
      setFormulaDisplay('');
      setCursorType('default');
      setCursorPos({ x: 35, y: 15 });
      setCursorAction(undefined);
      setIsCursorClicking(false);
      setFillDragCount(0);

      // Move cursor to D5
      t(() => {
        setCursorPos({ x: 48, y: 29 });
        setCursorAction('Pilih Sel D5 (Harga Satuan)');
      }, 300);

      // Click D5
      t(() => {
        setIsCursorClicking(true);
        setCursorType('text');
      }, 900);
      t(() => {
        setIsCursorClicking(false);
      }, 1200);

      // Type 75000 slowly
      t(() => setFormulaDisplay('7'), 1400);
      t(() => setFormulaDisplay('75'), 1600);
      t(() => setFormulaDisplay('750'), 1800);
      t(() => setFormulaDisplay('7500'), 2000);
      t(() => {
        setFormulaDisplay('75000');
        setCursorAction('Nilai Mentah Dimasukkan');
      }, 2200);

    } else if (currentStep === 1) {
      // Step 1: Format Mata Uang (Custom / Accounting Rp)
      setActiveCell('D5:E19');
      setFillDragCount(0);
      setFormulaDisplay('Custom [Rp #,##0]');

      // Move cursor to ribbon Number Format dropdown
      t(() => {
        setCursorPos({ x: 27, y: 9 });
        setCursorType('pointer');
        setCursorAction('Klik Format Mata Uang');
      }, 300);

      // Click format dropdown
      t(() => {
        setIsCursorClicking(true);
      }, 1000);
      t(() => {
        setIsCursorClicking(false);
        setCursorAction('Format: Custom (Rp)');
      }, 1300);

      // Move cursor back to sheet
      t(() => {
        setCursorPos({ x: 48, y: 29 });
        setCursorType('default');
      }, 1700);

    } else if (currentStep === 2) {
      // Step 2: Rumus Perkalian (=C5*D5) di Sel E5
      setActiveCell('E5');
      setFormulaDisplay('');
      setFillDragCount(0);

      // Move cursor to cell E5
      t(() => {
        setCursorPos({ x: 58, y: 29 });
        setCursorType('pointer');
        setCursorAction('Pilih Sel E5');
      }, 200);

      // Click cell E5
      t(() => setIsCursorClicking(true), 700);
      t(() => setIsCursorClicking(false), 950);

      // Move cursor to formula bar
      t(() => {
        setCursorPos({ x: 26, y: 13.5 });
        setCursorType('text');
        setCursorAction('Ketik Rumus =C5*D5');
      }, 1200);

      // Type formula slowly character by character
      t(() => setFormulaDisplay('='), 1500);
      t(() => setFormulaDisplay('=C'), 1800);
      t(() => setFormulaDisplay('=C5'), 2100);
      t(() => setFormulaDisplay('=C5*'), 2400);
      t(() => setFormulaDisplay('=C5*D'), 2700);
      t(() => setFormulaDisplay('=C5*D5'), 3000);

      // Move cursor to checkmark button (Enter)
      t(() => {
        setCursorPos({ x: 9.8, y: 13.5 });
        setCursorType('pointer');
        setCursorAction('Tekan Enter');
      }, 3400);

      // Click checkmark to calculate
      t(() => setIsCursorClicking(true), 3800);
      t(() => {
        setIsCursorClicking(false);
        setCursorPos({ x: 58, y: 29 });
        setCursorAction('Total Sel E5 = Rp 75,000');
      }, 4100);

    } else if (currentStep === 3) {
      // Step 3: Tarik Fill-Handle Otomatis dari E5 ke E19
      setActiveCell('E5');
      setFormulaDisplay('=C5*D5');
      setFillDragCount(0);

      // Move cursor to the green square (bottom-right of E5)
      t(() => {
        setCursorPos({ x: 62.5, y: 30.5 });
        setCursorType('crosshair');
        setCursorAction('Arahkan ke Fill-Handle (+)');
      }, 300);

      // Grab the handle
      t(() => {
        setIsCursorClicking(true);
        setCursorAction('Tarik Fill-Handle ke Bawah...');
      }, 900);

      // Smooth downward drag through rows
      t(() => { setCursorPos({ x: 62.5, y: 34 }); setFillDragCount(2); }, 1300);
      t(() => { setCursorPos({ x: 62.5, y: 38 }); setFillDragCount(4); }, 1700);
      t(() => { setCursorPos({ x: 62.5, y: 44 }); setFillDragCount(7); }, 2100);
      t(() => { setCursorPos({ x: 62.5, y: 50 }); setFillDragCount(10); }, 2500);
      t(() => { setCursorPos({ x: 62.5, y: 58 }); setFillDragCount(13); }, 2900);
      t(() => { setCursorPos({ x: 62.5, y: 64 }); setFillDragCount(15); }, 3300);

      // Release handle
      t(() => {
        setIsCursorClicking(false);
        setActiveCell('E5:E19');
        setCursorType('default');
        setCursorAction('15 Rincian Terhitung Otomatis!');
        setFormulaDisplay('=C19*D19');
      }, 3600);

    } else if (currentStep === 4) {
      // Step 4: AutoSum Total Keseluruhan =SUM(E5:E40)
      setActiveCell('E41');
      setFillDragCount(15);
      setFormulaDisplay('');

      // Move cursor to cell E41
      t(() => {
        setCursorPos({ x: 58, y: 78 });
        setCursorType('pointer');
        setCursorAction('Pilih Sel Total E41');
      }, 300);

      // Click cell E41
      t(() => setIsCursorClicking(true), 800);
      t(() => setIsCursorClicking(false), 1050);

      // Move cursor up to AutoSum button in ribbon
      t(() => {
        setCursorPos({ x: 37, y: 9 });
        setCursorType('pointer');
        setCursorAction('Klik AutoSum (Σ)');
      }, 1400);

      // Click AutoSum
      t(() => setIsCursorClicking(true), 2000);
      t(() => {
        setIsCursorClicking(false);
        setCursorAction('Seleksi Kolom =SUM(E5:E40)');
      }, 2300);

      // Formula bar types =SUM(E5:E40)
      t(() => setFormulaDisplay('='), 2400);
      t(() => setFormulaDisplay('=S'), 2600);
      t(() => setFormulaDisplay('=SUM('), 2800);
      t(() => setFormulaDisplay('=SUM(E5:E40)'), 3100);

      // Move cursor to Checkmark button
      t(() => {
        setCursorPos({ x: 9.8, y: 13.5 });
        setCursorType('pointer');
        setCursorAction('Selesaikan AutoSum');
      }, 3400);

      // Click to finalize
      t(() => setIsCursorClicking(true), 3800);
      t(() => {
        setIsCursorClicking(false);
        setCursorPos({ x: 58, y: 78 });
        setCursorType('default');
        setCursorAction('Grand Total = Rp 1,063,000');
      }, 4100);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentStep, speed]);

  const formatRp = (num: number) => {
    return 'Rp\t' + num.toLocaleString('en-US');
  };

  return (
    <div className="flex flex-col h-full bg-[#107c41] text-slate-800 select-none overflow-hidden font-sans relative">
      {/* Dynamic Virtual Cursor Layer */}
      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        isClicking={isCursorClicking}
        type={cursorType}
        actionText={cursorAction}
      />

      {/* 1. Real Excel 365 Titlebar (Matching user's screenshot exactly!) */}
      <div className="bg-[#107c41] text-white px-3 py-1.5 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-wide">
            <span className="w-5 h-5 bg-white text-[#107c41] rounded flex items-center justify-center font-black text-xs shadow-xs">
              X
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-100 text-[11px]">
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

        {/* Center File Name */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs tracking-wide">
            ANGGARAN DANA SPETRA ( OLGA , PMI , BAHASA ) 2026.xlsx - Excel
          </span>
        </div>

        {/* Right Search, Profile & Desktop Window Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] text-emerald-200 font-mono hidden md:inline px-2 py-0.5 rounded bg-emerald-800/60 border border-emerald-500/40">
            Aplikasi Desktop (Office 365)
          </span>

          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 px-3 py-1 rounded text-[11px] border border-emerald-500/40">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
            <span className="hidden sm:inline">qeto 40</span>
            <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
              C
            </div>
          </div>

          {/* Windows Window Controls */}
          <div className="flex items-center pl-1 border-l border-emerald-700">
            <button
              type="button"
              aria-label="Kecilkan jendela Excel"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-800 text-white/80 hover:text-white cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              aria-label="Perbesar jendela Excel"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-800 text-white/80 hover:text-white cursor-pointer"
            >
              <span className="w-2.5 h-2.5 border border-current rounded-xs" />
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup jendela Excel (Esc)"
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-600 text-white transition-colors cursor-pointer"
                title="Tutup Excel (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Real Excel Ribbon Menu Tabs */}
      <div className="bg-[#f3f2f1] text-slate-700 px-3 flex items-center gap-1 text-xs border-b border-slate-300 shrink-0">
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">File</span>
        <span className="px-2.5 py-1.5 text-[#107c41] font-bold border-b-2 border-[#107c41] cursor-pointer">
          Home
        </span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Insert</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Page Layout</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer">Formulas</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden sm:inline">Data</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden sm:inline">Review</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden md:inline">View</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden lg:inline">Developer</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden lg:inline">Add-ins</span>
        <span className="px-2.5 py-1.5 hover:bg-slate-200 cursor-pointer hidden lg:inline">Help</span>
        <div className="ml-auto flex items-center gap-1.5 text-[#107c41] font-semibold text-xs px-2 py-1 rounded hover:bg-slate-200 cursor-pointer">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </div>
      </div>

      {/* 3. Real Clean Excel Ribbon Toolbar */}
      <div className="bg-[#f3f2f1] px-3 py-1.5 flex flex-wrap items-center gap-3 text-xs border-b border-slate-300 shadow-xs text-slate-700 shrink-0">
        {/* Font Group */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-300 px-2 py-0.5 rounded">
          <span className="font-sans text-slate-800 text-xs font-medium">Calibri</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
          <div className="h-3 w-[1px] bg-slate-300 mx-1" />
          <span className="text-slate-800 text-xs font-mono">11</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>

        <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
          <button type="button" className="p-1 rounded hover:bg-slate-200 text-slate-800 font-bold" title="Bold">
            <Bold className="w-3 h-3" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-slate-200 text-slate-800 italic" title="Italic">
            <Italic className="w-3 h-3" />
          </button>
          <button type="button" className="p-1 rounded hover:bg-slate-200 text-slate-800 underline" title="Underline">
            <Underline className="w-3 h-3" />
          </button>
        </div>

        {/* Alignment */}
        <div className="hidden sm:flex items-center gap-1 border-r border-slate-300 pr-2">
          <span className="p-1 rounded bg-slate-200 text-slate-800 font-mono text-xs">≡</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-[10px] font-medium">Merge & Center</span>
        </div>

        {/* NUMBER FORMAT GROUP */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
            currentStep === 1
              ? 'bg-emerald-100 border border-[#107c41]'
              : 'bg-white border border-slate-300'
          }`}
          title="Format Mata Uang Rupiah (Custom / Accounting)"
        >
          <div className="flex items-center gap-1 text-xs">
            <span className={`font-semibold ${currentStep >= 1 ? 'text-[#107c41]' : 'text-slate-700'}`}>
              {currentStep >= 1 ? 'Custom' : 'General'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>

          <div className="h-3 w-[1px] bg-slate-300 mx-1" />

          <button
            type="button"
            className={`px-1 py-0.5 rounded font-mono font-bold text-xs flex items-center gap-0.5 cursor-pointer ${
              currentStep === 1 ? 'bg-[#107c41] text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <span>$</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>
          <span className="p-0.5 hover:bg-slate-100 cursor-pointer font-bold text-xs">%</span>
          <span className="p-0.5 hover:bg-slate-100 cursor-pointer font-bold text-xs">,</span>
        </div>

        {/* AUTOSUM BUTTON */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
            currentStep === 4
              ? 'bg-emerald-100 border border-[#107c41]'
              : 'hover:bg-slate-200 text-slate-700'
          }`}
          title="AutoSum (Σ): Jumlahkan Otomatis =SUM(E5:E40)"
        >
          <Sigma
            className={`w-3.5 h-3.5 ${
              currentStep === 4 ? 'text-[#107c41] stroke-[2.5]' : 'text-slate-700'
            }`}
          />
          <span className={`text-xs font-semibold ${currentStep === 4 ? 'text-[#107c41]' : 'text-slate-700'}`}>
            AutoSum
          </span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* 4. Real Formula Bar fx */}
      <div className="bg-white px-3 py-1 flex items-center gap-2 text-xs border-b border-slate-300 shadow-inner font-mono shrink-0">
        {/* Name Box */}
        <div className="bg-white border border-slate-300 text-slate-800 font-bold px-3 py-0.5 rounded min-w-[70px] text-center flex items-center justify-between">
          <span>{activeCell}</span>
          <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
        </div>

        {/* Formula Controls: Cancel, Check, fx */}
        <div className="flex items-center gap-1 text-slate-400">
          <X className="w-3.5 h-3.5 hover:text-red-500 cursor-pointer" />
          <Check className="w-3.5 h-3.5 text-emerald-600 cursor-pointer" />
          <div className="h-3 w-[1px] bg-slate-300 mx-1" />
          <span className="font-sans italic font-bold text-slate-600 text-xs px-1">fx</span>
        </div>

        {/* Formula Input Line */}
        <div className="flex-1 bg-white border border-slate-300 text-slate-800 px-3 py-0.5 rounded flex items-center font-mono text-xs">
          <span>{formulaDisplay}</span>
          <span className="w-1.5 h-3.5 bg-emerald-600 ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* 5. Real Excel Full Worksheet Grid */}
      <div className="flex-1 bg-white text-slate-900 overflow-auto flex flex-col font-sans text-xs relative">
        {/* Column Headers (A to N) */}
        <div className="flex bg-[#f2f2f2] text-slate-700 font-semibold border-b border-slate-300 text-center text-[11px] sticky top-0 z-30 select-none">
          <div className="w-10 bg-[#e1dfdd] border-r border-slate-300 py-1 shrink-0 flex items-center justify-center text-slate-400">
            ◢
          </div>
          <div className="w-12 border-r border-slate-300 py-1 shrink-0">A</div>
          <div className="w-72 border-r border-slate-300 py-1 shrink-0">B</div>
          <div className="w-28 border-r border-slate-300 py-1 shrink-0">C</div>
          <div className="w-36 border-r border-slate-300 py-1 shrink-0">D</div>
          <div className="w-36 border-r border-slate-300 py-1 shrink-0">E</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">F</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">G</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">H</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">I</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">J</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">K</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">L</div>
          <div className="w-20 border-r border-slate-300 py-1 shrink-0">M</div>
          <div className="flex-1 border-r border-slate-300 py-1">N</div>
        </div>

        {/* Row 1 & 2: Light Green Banner ANGGARAN DANA SPETRA (#92d050) */}
        <div className="flex border-b border-slate-300 text-[11px] bg-[#92d050] text-slate-900 items-center">
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">1</div>
          <div className="w-12 border-r border-slate-400" />
          <div className="w-[700px] border-r border-slate-400 py-1.5 px-4 text-center font-black tracking-widest text-sm uppercase">
            ANGGARAN DANA SPETRA
          </div>
          <div className="flex-1" />
        </div>

        <div className="flex border-b border-slate-300 text-[11px] bg-[#92d050] text-slate-900 items-center">
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">2</div>
          <div className="w-12 border-r border-slate-400" />
          <div className="w-[700px] border-r border-slate-400 py-1" />
          <div className="flex-1" />
        </div>

        {/* Row 3: Gray Table Headers (NO, KETERANGAN, JUMLAH, HARGA SATUAN, TOTAL) */}
        <div className="flex bg-[#d9d9d9] font-bold border-b border-slate-800 text-[11px] text-slate-900 text-center items-center">
          <div className="w-10 bg-[#f2f2f2] border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">3</div>
          <div className="w-12 border-r border-slate-800 py-1 shrink-0">NO</div>
          <div className="w-72 border-r border-slate-800 py-1 shrink-0">KETERANGAN</div>
          <div className="w-28 border-r border-slate-800 py-1 shrink-0">JUMLAH</div>
          <div className="w-36 border-r border-slate-800 py-1 shrink-0">HARGA SATUAN</div>
          <div className="w-36 border-r border-slate-800 py-1 shrink-0">TOTAL</div>
          <div className="flex-1" />
        </div>

        {/* Row 4: Blue Subheader A. PERLENGKAPAN (#8ea9db) */}
        <div className="flex border-b border-slate-800 text-[11px] font-bold bg-[#8ea9db] text-slate-900 items-center">
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">4</div>
          <div className="w-12 border-r border-slate-800" />
          <div className="w-[700px] border-r border-slate-800 py-1 px-4 text-center tracking-wide font-black">
            A. PERLENGKAPAN
          </div>
          <div className="flex-1" />
        </div>

        {/* Rows 5 to 19: The 15 Items of SPETRA Perlengkapan */}
        {perlengkapanList.map((item, idx) => {
          const rowNum = 5 + idx;
          const isRow5 = rowNum === 5;
          const isCellC5Active = isRow5 && currentStep === 2 && formulaDisplay.includes('C5');
          const isCellD5Active = isRow5 && currentStep === 2 && formulaDisplay.includes('D5');

          // Formula Drag calculation: does this row have total calculated?
          const isFilledByDrag = isRow5
            ? currentStep >= 2
            : currentStep === 3
            ? idx < fillDragCount
            : currentStep >= 4;

          const priceDisplay =
            currentStep === 0
              ? item.price.toString()
              : formatRp(item.price);

          const totalDisplay = isFilledByDrag ? formatRp(item.total) : null;

          return (
            <div
              key={item.no}
              className={`flex border-b border-slate-400 text-[11px] items-center transition-colors ${
                isRow5 && currentStep === 2 ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
              }`}
            >
              {/* Row Index */}
              <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">
                {rowNum}
              </div>

              {/* Col A: NO */}
              <div className="w-12 border-r border-slate-800 py-1 text-center font-bold text-slate-900 shrink-0">
                {item.no}
              </div>

              {/* Col B: KETERANGAN */}
              <div className="w-72 border-r border-slate-800 py-1 px-3 font-bold text-slate-900 shrink-0 truncate">
                {item.item}
              </div>

              {/* Col C: JUMLAH */}
              <div
                className={`w-28 border-r border-slate-800 py-1 text-center font-bold shrink-0 transition-all ${
                  isCellC5Active
                    ? 'border-2 border-blue-600 bg-blue-100 text-blue-900'
                    : 'text-slate-900'
                }`}
              >
                {item.qty}
              </div>

              {/* Col D: HARGA SATUAN */}
              <div
                className={`w-36 border-r border-slate-800 py-1 px-2 text-right font-medium shrink-0 font-mono transition-all ${
                  isCellD5Active
                    ? 'border-2 border-rose-600 bg-rose-100 text-rose-900'
                    : currentStep === 1
                    ? 'bg-emerald-50 text-emerald-950 font-bold'
                    : isRow5 && currentStep === 0
                    ? 'bg-blue-50 border-2 border-blue-500 font-bold'
                    : 'text-slate-900'
                }`}
              >
                {priceDisplay}
              </div>

              {/* Col E: TOTAL */}
              <div
                className={`w-36 border-r border-slate-800 py-1 px-2 text-right font-medium shrink-0 font-mono relative transition-all ${
                  currentStep === 2 && isRow5
                    ? 'border-2 border-[#107c41] bg-emerald-50 text-emerald-900 font-bold'
                    : currentStep === 3 && idx < fillDragCount
                    ? 'bg-emerald-50/70 border-x border-emerald-500 font-semibold'
                    : currentStep === 4
                    ? 'marching-ants'
                    : 'text-slate-900'
                }`}
              >
                {totalDisplay ? (
                  <span>{totalDisplay}</span>
                ) : (
                  <span className="text-slate-300">-</span>
                )}

                {/* Green Fill Handle square on cell E5 */}
                {isRow5 && (currentStep === 2 || currentStep === 3) && (
                  <div
                    className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#107c41] border border-white z-20 shadow-xs cursor-crosshair"
                    title="Fill Handle: Drag ke bawah untuk mengisi formula perkalian otomatis"
                  />
                )}
              </div>

              {/* Surrounding blank cells */}
              <div className="w-20 border-r border-[#e1dfdd] py-1" />
              <div className="w-20 border-r border-[#e1dfdd] py-1" />
              <div className="flex-1 py-1" />
            </div>
          );
        })}

        {/* Row 20: Section Header B. HADIAH LOMBA */}
        <div className="flex border-b border-slate-800 text-[11px] font-bold bg-[#d9d9d9] text-slate-900 items-center">
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0 font-normal">20</div>
          <div className="w-12 border-r border-slate-800" />
          <div className="w-[700px] border-r border-slate-800 py-1 px-4 text-center tracking-wide font-black">
            B. HADIAH LOMBA
          </div>
          <div className="flex-1" />
        </div>

        {/* Row 21: Red Banner FUN RUN (#ff0000) */}
        <div className="flex border-b border-slate-800 text-[11px] font-bold bg-[#ff0000] text-white items-center">
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0 font-normal">21</div>
          <div className="w-12 border-r border-slate-800" />
          <div className="w-[700px] border-r border-slate-800 py-1 px-4 text-center tracking-widest font-black uppercase text-xs">
            FUN RUN
          </div>
          <div className="flex-1" />
        </div>

        {/* Rows 22 & 23: Fun Run Items */}
        {funRunList.map((item, idx) => (
          <div key={item.no} className="flex border-b border-slate-400 text-[11px] items-center hover:bg-slate-50">
            <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-1 text-slate-500 font-mono shrink-0">
              {22 + idx}
            </div>
            <div className="w-12 border-r border-slate-800 py-1 text-center font-bold text-slate-900 shrink-0">
              {item.no}
            </div>
            <div className="w-72 border-r border-slate-800 py-1 px-3 font-bold text-slate-900 shrink-0 truncate">
              {item.item}
            </div>
            <div className="w-28 border-r border-slate-800 py-1 text-center font-bold text-slate-900 shrink-0">
              {item.qty}
            </div>
            <div className="w-36 border-r border-slate-800 py-1 px-2 text-right font-medium shrink-0 font-mono text-slate-900">
              {currentStep === 0 ? item.price.toString() : formatRp(item.price)}
            </div>
            <div className="w-36 border-r border-slate-800 py-1 px-2 text-right font-medium shrink-0 font-mono text-slate-900 font-bold">
              {currentStep >= 3 ? formatRp(item.total) : '-'}
            </div>
            <div className="flex-1 py-1" />
          </div>
        ))}

        {/* Row 41: Grand Total Row with =SUM(E5:E40) */}
        <div
          className={`flex border-b-2 border-slate-900 text-[11px] items-center font-bold ${
            currentStep === 4 ? 'bg-emerald-50 border-2 border-[#107c41]' : 'bg-slate-100'
          }`}
        >
          <div className="w-10 bg-[#f2f2f2] text-center border-r border-slate-300 py-2 text-slate-500 font-mono shrink-0 font-normal">
            41
          </div>
          <div className="w-12 border-r border-slate-800 py-2" />
          <div className="w-[448px] border-r border-slate-800 py-2 px-4 text-right tracking-wider uppercase text-slate-800 font-black">
            TOTAL ANGGARAN SPETRA:
          </div>
          <div className="w-36 border-r border-slate-800 py-2 px-2 text-right font-mono text-xs font-black text-[#107c41]">
            {currentStep >= 4 && formulaDisplay.includes('SUM') ? (
              <span>{formatRp(grandTotal)}</span>
            ) : (
              <span className="text-slate-400 italic font-normal text-[10px]">-</span>
            )}
          </div>
          <div className="flex-1 py-2" />
        </div>
      </div>

      {/* 6. Real Excel Sheet Tabs & Status Footer */}
      <div className="bg-[#f3f2f1] text-slate-700 px-3 py-1 flex items-center justify-between text-xs border-t border-slate-300 select-none font-sans shrink-0">
        {/* Sheet Tabs */}
        <div className="flex items-center gap-1 text-[11px]">
          <span className="bg-white text-[#107c41] font-bold px-3 py-1 rounded-t border-t-2 border-[#107c41] border-x border-slate-300 cursor-pointer shadow-xs">
            Lembar1
          </span>
          <span className="w-5 h-5 flex items-center justify-center hover:bg-slate-200 rounded cursor-pointer text-slate-500 font-bold">
            +
          </span>
        </div>

        {/* Excel Metrics */}
        <div className="flex items-center gap-4 text-[11px] font-sans text-slate-600">
          <span className="hidden sm:inline">Ready</span>
          <span>Count: 17</span>
          <span className="text-[#107c41] font-bold font-mono">
            {currentStep >= 4 ? `Sum: ${formatRp(grandTotal)}` : 'Sum: -'}
          </span>
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
