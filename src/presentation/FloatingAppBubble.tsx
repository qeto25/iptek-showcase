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
        return <WordBrandIcon className="w-32 h-32 sm:w-40 sm:h-40" />;
      case 'excel':
        return <ExcelBrandIcon className="w-32 h-32 sm:w-40 sm:h-40" />;
      case 'canva':
        return <CanvaBrandIcon className="w-32 h-32 sm:w-40 sm:h-40" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'word':
        return {
          glow: 'rgba(59, 130, 246, 0.65)',
          textHover: 'group-hover:text-blue-300'
        };
      case 'excel':
        return {
          glow: 'rgba(16, 185, 129, 0.65)',
          textHover: 'group-hover:text-emerald-300'
        };
      case 'canva':
        return {
          glow: 'rgba(168, 85, 247, 0.65)',
          textHover: 'group-hover:text-purple-300'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      onClick={() => onOpenProject(project.id)}
      className={`flex flex-col items-center group cursor-pointer select-none ${animationClass} transition-all duration-300`}
    >
      {/* 3D Floating Icon Showcase */}
      <div className="relative flex items-center justify-center p-2 sm:p-4">
        {/* Luminous Ambient Moonlit Glow behind icon */}
        <div
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-100 group-hover:scale-135"
          style={{ backgroundColor: theme.glow }}
        />

        {/* The Icon itself: large, crisp, 3D floating with moonlit shadow */}
        <div className="relative z-10 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3">
          {getBrandIcon()}
        </div>
      </div>

      {/* Clean High-Contrast Title (Zero Subtitle Pills / Tanpa Tulisan Mengganggu) */}
      <div className="mt-5 text-center">
        <h3
          className={`text-2xl sm:text-3xl font-black tracking-tight text-white transition-all duration-300 drop-shadow-[0_4px_24px_rgba(0,0,0,1)] ${theme.textHover}`}
        >
          {project.name}
        </h3>
      </div>
    </div>
  );
};
