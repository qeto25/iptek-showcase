import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

interface LauncherCardProps {
  project: ProjectMetadata;
  animationClass: string;
  onOpenProject: (type: ProjectType) => void;
}

export const LauncherCard: React.FC<LauncherCardProps> = ({
  project,
  animationClass,
  onOpenProject
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-20 h-20 sm:w-24 sm:h-24" />;
      case 'excel':
        return <ExcelBrandIcon className="w-20 h-20 sm:w-24 sm:h-24" />;
      case 'canva':
        return <CanvaBrandIcon className="w-20 h-20 sm:w-24 sm:h-24" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'word':
        return {
          glow: 'rgba(37, 99, 235, 0.35)',
          borderHover: 'group-hover:border-blue-500/60 group-hover:shadow-[0_12px_40px_rgba(37,99,235,0.25)]',
          badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          btnBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30',
          accentColor: '#3b82f6',
          tags: ['Format Proposal Resmi', 'Tabel Delegasi Kelas', 'Rundown Otomatis']
        };
      case 'excel':
        return {
          glow: 'rgba(16, 185, 129, 0.35)',
          borderHover: 'group-hover:border-emerald-500/60 group-hover:shadow-[0_12px_40px_rgba(16,185,129,0.25)]',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30',
          accentColor: '#10b981',
          tags: ['Rumus =C5*D5', 'Tarik Fill Handle', 'Grand Total =SUM']
        };
      case 'canva':
        return {
          glow: 'rgba(147, 51, 234, 0.35)',
          borderHover: 'group-hover:border-purple-500/60 group-hover:shadow-[0_12px_40px_rgba(147,51,234,0.25)]',
          badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          btnBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30',
          accentColor: '#a855f7',
          tags: ['Pita & Garuda Emas', 'Hierarki Tipografi', 'Trio Kartu Informasi']
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      onClick={() => onOpenProject(project.id)}
      className={`group relative bg-slate-900/70 hover:bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] ${theme.borderHover} rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl select-none w-full max-w-[360px] overflow-hidden ${animationClass}`}
    >
      {/* Ambient background light beam */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: theme.glow }}
      />

      {/* Card Header: Tag & Category */}
      <div className="flex items-center justify-between relative z-10">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${theme.badgeBg} tracking-wide`}
        >
          {project.badge}
        </span>
        <span className="text-xs font-mono text-slate-400">
          Modul IPTEK
        </span>
      </div>

      {/* Center 3D Floating Icon Showcase (No microscopic text!) */}
      <div className="my-8 sm:my-10 flex flex-col items-center justify-center relative z-10">
        {/* Subtle glowing pedestal behind icon */}
        <div
          className="absolute w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-75 transition-opacity duration-500"
          style={{ backgroundColor: theme.glow }}
        />
        <div className="relative z-10 transform group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-300 filter drop-shadow-2xl">
          {getBrandIcon()}
        </div>
      </div>

      {/* App Title & Proyektor-Ready Clear Typography */}
      <div className="text-center relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {project.name}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 group-hover:text-slate-100 transition-colors">
          {project.title}
        </h3>

        {/* 3 High-Contrast Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
          {theme.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action CTA Button */}
      <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-center relative z-10">
        <button
          type="button"
          className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md ${theme.btnBg} cursor-pointer group-hover:scale-[1.02]`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Mulai Simulasi Interaktif</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
