import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FloatingAppBubbleProps {
  project: ProjectMetadata;
  animationClass: string;
  onOpenProject: (type: ProjectType) => void;
}

export const FloatingAppBubble: React.FC<FloatingAppBubbleProps> = ({
  project,
  animationClass,
  onOpenProject
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'excel':
        return <ExcelBrandIcon className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'canva':
        return <CanvaBrandIcon className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'excel':
        return {
          stepNum: '01',
          stepLabel: 'Tahap 01',
          roleTitle: 'Hitung Anggaran & RAB',
          glow: 'rgba(16, 185, 129, 0.4)',
          borderHover: 'hover:border-emerald-500/60',
          shadowHover: 'hover:shadow-[0_15px_35px_rgba(16,185,129,0.2)]',
          badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
          tagClass: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
          buttonClass: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
        };
      case 'word':
        return {
          stepNum: '02',
          stepLabel: 'Tahap 02',
          roleTitle: 'Susun Naskah Proposal Resmi',
          glow: 'rgba(59, 130, 246, 0.4)',
          borderHover: 'hover:border-blue-500/60',
          shadowHover: 'hover:shadow-[0_15px_35px_rgba(59,130,246,0.2)]',
          badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
          tagClass: 'bg-blue-950/40 text-blue-300 border-blue-500/30',
          buttonClass: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
        };
      case 'canva':
        return {
          stepNum: '03',
          stepLabel: 'Tahap 03',
          roleTitle: 'Desain Poster Publikasi Kegiatan',
          glow: 'rgba(168, 85, 247, 0.4)',
          borderHover: 'hover:border-purple-500/60',
          shadowHover: 'hover:shadow-[0_15px_35px_rgba(168,85,247,0.2)]',
          badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
          tagClass: 'bg-purple-950/40 text-purple-300 border-purple-500/30',
          buttonClass: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40'
        };
    }
  };

  const theme = getTheme();

  return (
    <button
      type="button"
      onClick={() => onOpenProject(project.id)}
      aria-label={`Buka simulasi ${project.name} (${theme.roleTitle})`}
      className={`group w-full max-w-sm rounded-2xl p-4 bg-slate-900/75 hover:bg-slate-900/95 border border-slate-800 backdrop-blur-xl ${theme.borderHover} ${theme.shadowHover} transition-all duration-300 cursor-pointer text-left flex flex-col justify-between select-none relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090d16] hover:-translate-y-1`}
    >
      {/* Ambient Radial Spotlight inside Card */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-45 transition-opacity duration-500"
        style={{ backgroundColor: theme.glow }}
      />

      {/* 1. Card Top Status Bar */}
      <div className="w-full flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${theme.badgeClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {theme.stepLabel}
        </span>
        <span className="text-[10px] text-slate-400 font-mono tracking-tight bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
          {project.badge}
        </span>
      </div>

      {/* 2. Floating 3D Icon Presentation Stage */}
      <div className={`my-2 py-0.5 flex items-center justify-center relative ${animationClass}`}>
        {/* Glow halo behind icon */}
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none opacity-25 group-hover:opacity-60 group-hover:scale-115 transition-all duration-500"
          style={{ backgroundColor: theme.glow }}
        />
        {/* Icon itself */}
        <div className="relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] transform transition-transform duration-500 group-hover:scale-108">
          {getBrandIcon()}
        </div>
      </div>

      {/* 3. Title & Role Description */}
      <div className="w-full space-y-0.5 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-slate-100 transition-colors">
          {project.name}
        </h3>
        <p className="text-[11px] font-semibold text-slate-300">
          {theme.roleTitle}
        </p>
      </div>

      {/* 4. Key Highlights Tags */}
      <div className="w-full pt-1.5 pb-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
        {project.keyHighlights.map((highlight, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-medium border ${theme.tagClass}`}
          >
            <CheckCircle2 className="w-2.5 h-2.5 opacity-70 shrink-0" />
            <span>{highlight}</span>
          </span>
        ))}
      </div>

      {/* 5. Card Bottom Action Button */}
      <div className="w-full mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-medium leading-none text-slate-400 group-hover:text-slate-200 transition-colors">
          Mulai Simulasi Interaktif
        </span>
        <div className={`p-1 rounded-md ${theme.buttonClass} transition-transform group-hover:translate-x-1 shadow-sm shrink-0`}>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
};
