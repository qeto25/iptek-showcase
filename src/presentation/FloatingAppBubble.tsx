import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';

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
        return <WordBrandIcon className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" />;
      case 'excel':
        return <ExcelBrandIcon className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" />;
      case 'canva':
        return <CanvaBrandIcon className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'word':
        return {
          glow: 'rgba(59, 130, 246, 0.65)',
          textHover: 'group-hover:text-blue-300',
          badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
        };
      case 'excel':
        return {
          glow: 'rgba(16, 185, 129, 0.65)',
          textHover: 'group-hover:text-emerald-300',
          badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
        };
      case 'canva':
        return {
          glow: 'rgba(168, 85, 247, 0.65)',
          textHover: 'group-hover:text-purple-300',
          badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
        };
    }
  };

  const theme = getTheme();

  return (
    <button
      type="button"
      onClick={() => onOpenProject(project.id)}
      aria-label={`Buka simulasi ${project.name} (${project.category})`}
      className={`flex flex-col items-center group cursor-pointer select-none ${animationClass} transition-all duration-300 p-2 sm:p-4 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#090d16] bg-transparent border-0`}
    >
      {/* 3D Floating Icon Showcase */}
      <div className="relative flex items-center justify-center p-2">
        {/* Luminous Ambient Moonlit Glow behind icon */}
        <div
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-100 group-hover:scale-135"
          style={{ backgroundColor: theme.glow }}
        />

        {/* The Icon itself: large, crisp, 3D floating with moonlit shadow */}
        <div className="relative z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
          {getBrandIcon()}
        </div>
      </div>

      {/* Title & Authentic Role Label */}
      <div className="mt-4 text-center space-y-1.5">
        <h3
          className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white transition-all duration-300 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] ${theme.textHover}`}
        >
          {project.name}
        </h3>
        <p className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} transition-all inline-block`}>
          {project.title}
        </p>
      </div>
    </button>
  );
};
