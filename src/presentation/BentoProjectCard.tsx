import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';
import { ArrowUpRight, Sparkles, FileText, Table, Palette, CheckCircle2 } from 'lucide-react';

interface BentoProjectCardProps {
  project: ProjectMetadata;
  onOpenProject: (type: ProjectType) => void;
}

export const BentoProjectCard: React.FC<BentoProjectCardProps> = ({
  project,
  onOpenProject
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-12 h-12" />;
      case 'excel':
        return <ExcelBrandIcon className="w-12 h-12" />;
      case 'canva':
        return <CanvaBrandIcon className="w-12 h-12" />;
    }
  };

  const getAccentColor = () => {
    switch (project.id) {
      case 'word':
        return {
          glow: 'rgba(59, 130, 246, 0.25)',
          borderHover: 'group-hover:border-blue-500/50',
          badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          gradientBg: 'from-blue-600/10 via-transparent to-transparent'
        };
      case 'excel':
        return {
          glow: 'rgba(16, 185, 129, 0.25)',
          borderHover: 'group-hover:border-emerald-500/50',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          gradientBg: 'from-emerald-600/10 via-transparent to-transparent'
        };
      case 'canva':
        return {
          glow: 'rgba(168, 85, 247, 0.25)',
          borderHover: 'group-hover:border-purple-500/50',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          gradientBg: 'from-purple-600/10 via-transparent to-transparent'
        };
    }
  };

  const accent = getAccentColor();

  return (
    <div
      onClick={() => onOpenProject(project.id)}
      className={`group relative bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] ${accent.borderHover} rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden select-none`}
      style={{
        boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5)`
      }}
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: accent.glow }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent.gradientBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Card Header: App Icon, Info & Action Indicator */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] group-hover:scale-105 transition-transform duration-300 shadow-inner">
            {getBrandIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${accent.badgeBg} tracking-wide`}
            >
              {project.badge}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] group-hover:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Title & Short Tagline */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {project.name}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 group-hover:text-slate-100 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Center Mini Live Visual Bento Component */}
      <div className="my-5 relative z-10 rounded-2xl bg-slate-950/60 border border-white/[0.06] p-4 overflow-hidden group-hover:border-white/10 transition-colors">
        {project.id === 'word' && (
          <div className="space-y-2.5">
            {/* Mini Paper Document Preview */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400">
                PROPOSAL_HUT_OSIS.docx
              </span>
            </div>
            {/* Mini lines imitating typewriter document */}
            <div className="space-y-1.5 pt-1">
              <div className="h-2 bg-blue-500/40 rounded w-3/4 animate-pulse" />
              <div className="h-1.5 bg-slate-700/60 rounded w-full" />
              <div className="h-1.5 bg-slate-700/60 rounded w-5/6" />
            </div>
            {/* Mini Table preview */}
            <div className="grid grid-cols-3 gap-1 pt-1 text-[9px] font-mono">
              <div className="bg-slate-900 px-1.5 py-1 rounded text-slate-400 border border-slate-800">
                Ketua
              </div>
              <div className="bg-slate-900 px-1.5 py-1 rounded text-slate-400 border border-slate-800">
                Sekretaris
              </div>
              <div className="bg-slate-900 px-1.5 py-1 rounded text-slate-400 border border-slate-800">
                Bendahara
              </div>
            </div>
          </div>
        )}

        {project.id === 'excel' && (
          <div className="space-y-2.5">
            {/* Mini Formula Bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                fx
              </span>
              <span className="text-[10px] font-mono text-emerald-300">
                =C5*D5
              </span>
            </div>
            {/* Mini Spreadsheet rows */}
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex justify-between items-center text-slate-400 px-1">
                <span>Sewa Panggung</span>
                <span className="text-slate-200">Rp 2.000.000</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 px-1">
                <span>Konsumsi (80 box)</span>
                <span className="text-slate-200">Rp 2.000.000</span>
              </div>
            </div>
            {/* Total Badge */}
            <div className="flex justify-between items-center bg-emerald-950/40 border border-emerald-600/30 px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-emerald-400">
              <span>SUM TOTAL</span>
              <span>Rp 5.250.000</span>
            </div>
          </div>
        )}

        {project.id === 'canva' && (
          <div className="space-y-2.5">
            {/* Mini Poster Preview */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-purple-400" />
                <span>Layout Poster HD</span>
              </span>
              <span className="text-[9px] bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                4:5
              </span>
            </div>
            {/* Mini Ribbon & Headline */}
            <div className="bg-gradient-to-r from-red-600/30 via-slate-800/40 to-sky-600/30 p-2 rounded-lg text-center border border-white/5">
              <div className="h-1 w-full bg-gradient-to-r from-red-500 to-white rounded-full mb-1.5" />
              <p className="text-[10px] font-extrabold text-white tracking-wide">
                UPACARA BENDERA SENIN
              </p>
            </div>
            {/* Trio Info Tags */}
            <div className="grid grid-cols-3 gap-1 text-[8px] font-semibold text-center text-slate-300">
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                07.00 WIB
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                Lapangan
              </div>
              <div className="bg-slate-900/80 p-1 rounded border border-slate-800">
                Putih Abu
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Features / Highlights & Clean CTA */}
      <div className="relative z-10 pt-2 border-t border-white/[0.05] flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.keyHighlights.slice(0, 2).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.04]"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="text-xs font-semibold text-white/90 group-hover:text-white flex items-center gap-1">
          <span>Buka</span>
          <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
      </div>
    </div>
  );
};
