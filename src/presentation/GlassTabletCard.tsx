import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';
import { Play, Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

interface GlassTabletCardProps {
  project: ProjectMetadata;
  animationClass: string;
  onOpenProject: (type: ProjectType) => void;
}

export const GlassTabletCard: React.FC<GlassTabletCardProps> = ({
  project,
  animationClass,
  onOpenProject
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-10 h-10" />;
      case 'excel':
        return <ExcelBrandIcon className="w-10 h-10" />;
      case 'canva':
        return <CanvaBrandIcon className="w-10 h-10" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'word':
        return {
          glow: 'rgba(37, 99, 235, 0.4)',
          borderHover: 'group-hover:border-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]',
          badgeBg: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
          accentColor: '#3b82f6',
          category: 'Dokumen Proposal Resmi'
        };
      case 'excel':
        return {
          glow: 'rgba(16, 185, 129, 0.4)',
          borderHover: 'group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]',
          badgeBg: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40',
          accentColor: '#10b981',
          category: 'Spreadsheet Anggaran Otomatis'
        };
      case 'canva':
        return {
          glow: 'rgba(168, 85, 247, 0.4)',
          borderHover: 'group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
          badgeBg: 'bg-purple-600/20 text-purple-300 border-purple-500/40',
          accentColor: '#a855f7',
          category: 'Desain Komposisi Poster'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      onClick={() => onOpenProject(project.id)}
      className={`flex flex-col items-center group cursor-pointer select-none ${animationClass} w-full max-w-[340px]`}
    >
      {/* 3D Floating Glass Tablet Device */}
      <div
        className={`w-full rounded-3xl bg-slate-900/65 backdrop-blur-2xl border border-white/15 ${theme.borderHover} p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 group-hover:-translate-y-3.5 group-hover:scale-[1.03] shadow-2xl relative overflow-hidden`}
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.25)`
        }}
      >
        {/* Subtle Ambient Radial Light behind tablet screen */}
        <div
          className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: theme.glow }}
        />

        {/* Top Tablet Navigation Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-white/10 border border-white/15 shadow-sm group-hover:scale-105 transition-transform duration-300">
              {getBrandIcon()}
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-wide leading-tight group-hover:text-cyan-200 transition-colors">
                {project.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {project.badge}
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${theme.badgeBg} tracking-wide`}
          >
            Live Output
          </span>
        </div>

        {/* Tablet Display Screen (Realistic Live Output Preview) */}
        <div className="my-3.5 relative z-10 rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-slate-950/80 min-h-[220px] flex flex-col justify-center p-3.5 group-hover:border-white/20 transition-all">
          
          {/* WORD: Clean White Mini Document Page */}
          {project.id === 'word' && (
            <div className="bg-white text-slate-800 rounded-xl p-3.5 shadow-md font-serif text-[10px] space-y-2 relative overflow-hidden border border-slate-200">
              {/* Mini Kop Surat */}
              <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-1.5 font-sans">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-[9px] uppercase tracking-wider text-blue-900 leading-tight">
                    OSIS SMK NUSANTARA DIGITAL
                  </h4>
                  <p className="text-[8px] text-slate-500">
                    Proposal Kegiatan Pekan IPTEK 2026
                  </p>
                </div>
              </div>
              {/* Typewriter text line representation */}
              <p className="text-[9px] text-slate-600 leading-relaxed font-sans">
                Menyajikan format surat resmi, tabel alokasi panitia, dan rundown acara terpadu.
              </p>
              {/* Mini Table Rows */}
              <div className="border border-slate-200 rounded overflow-hidden text-[8px] font-sans">
                <div className="grid grid-cols-2 bg-blue-50 p-1 font-bold text-blue-900 border-b border-slate-200">
                  <span>Jabatan</span>
                  <span>Nama Delegasi</span>
                </div>
                <div className="grid grid-cols-2 p-1 border-b border-slate-100 bg-white">
                  <span className="font-semibold text-slate-700">Ketua Pelaksana</span>
                  <span>M. Fadhil</span>
                </div>
                <div className="grid grid-cols-2 p-1 bg-blue-50/40">
                  <span className="font-semibold text-slate-700">Sekretaris</span>
                  <span>Nabila R.</span>
                </div>
              </div>
              {/* Approved Mini Badge */}
              <div className="flex justify-end pt-1">
                <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded font-sans font-bold text-[8px] uppercase">
                  <Award className="w-2.5 h-2.5 text-red-600" />
                  <span>Approved OSIS</span>
                </span>
              </div>
            </div>
          )}

          {/* EXCEL: Clean Spreadsheet Grid */}
          {project.id === 'excel' && (
            <div className="bg-white text-slate-800 rounded-xl p-3 shadow-md font-sans text-[10px] space-y-2 border border-slate-200">
              {/* Excel Header */}
              <div className="bg-emerald-700 text-white p-1.5 rounded-lg flex items-center justify-between">
                <span className="font-bold text-[9px] tracking-wide">
                  RAB ANGGARAN OTOMATIS
                </span>
                <span className="text-[8px] bg-emerald-800 px-1.5 py-0.5 rounded font-mono">
                  =C5*D5
                </span>
              </div>
              {/* Spreadsheet Rows */}
              <div className="border border-slate-200 rounded overflow-hidden text-[9px] font-mono">
                <div className="grid grid-cols-3 bg-slate-100 p-1 font-bold text-slate-600 border-b border-slate-200 text-center">
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Subtotal</span>
                </div>
                <div className="grid grid-cols-3 p-1 border-b border-slate-100 items-center">
                  <span className="truncate">Sewa Sound</span>
                  <span className="text-center font-bold text-blue-600">1</span>
                  <span className="text-right text-slate-700">Rp 2.000.000</span>
                </div>
                <div className="grid grid-cols-3 p-1 items-center bg-emerald-50/40">
                  <span className="truncate">Konsumsi Box</span>
                  <span className="text-center font-bold text-blue-600">80</span>
                  <span className="text-right text-slate-700">Rp 2.000.000</span>
                </div>
              </div>
              {/* Total Calculation Chip */}
              <div className="bg-emerald-950 text-emerald-300 border border-emerald-600/50 p-2 rounded-lg flex items-center justify-between font-mono font-bold text-[10px]">
                <span className="text-[9px] uppercase tracking-wider text-emerald-400">
                  Total (=SUM):
                </span>
                <span className="text-white text-xs">Rp 5.250.000</span>
              </div>
            </div>
          )}

          {/* CANVA: Clean Poster Artboard */}
          {project.id === 'canva' && (
            <div className="bg-gradient-to-b from-slate-900 via-slate-850 to-indigo-950 rounded-xl p-3 shadow-md text-white text-[10px] space-y-2 border border-slate-700/80 text-center relative overflow-hidden">
              {/* Pita Merah Putih & Garuda */}
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-10 h-2 bg-gradient-to-r from-red-600 to-white rounded-full" />
                <span className="text-xs">🦅</span>
                <div className="w-10 h-2 bg-gradient-to-r from-white to-red-600 rounded-full" />
              </div>
              <div>
                <span className="text-[8px] text-amber-300 font-bold uppercase tracking-wider block">
                  OSIS SMK NUSANTARA DIGITAL
                </span>
                <h4 className="font-extrabold text-xs text-white tracking-tight mt-0.5">
                  UPACARA BENDERA SENIN
                </h4>
              </div>
              {/* Trio Glass Info Chips */}
              <div className="grid grid-cols-3 gap-1 pt-1 text-[8px] font-semibold text-slate-200">
                <div className="bg-white/10 p-1 rounded-md backdrop-blur-xs border border-white/10">
                  07.00 WIB
                </div>
                <div className="bg-white/10 p-1 rounded-md backdrop-blur-xs border border-white/10">
                  Lapangan
                </div>
                <div className="bg-white/10 p-1 rounded-md backdrop-blur-xs border border-white/10">
                  Putih Abu
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tablet Bottom Action Button */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between relative z-10">
          <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
            {theme.category}
          </span>
          <div className="flex items-center gap-1.5 bg-white/10 group-hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulasi</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Cyber Floor Light Reflection Shadow */}
      <div className="w-3/4 h-3 rounded-full bg-cyan-400/20 blur-md mt-4 group-hover:scale-110 group-hover:bg-cyan-400/40 transition-all duration-500" />
    </div>
  );
};
