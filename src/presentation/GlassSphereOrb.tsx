import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';

interface GlassSphereOrbProps {
  project: ProjectMetadata;
  animationClass: string;
  onOpenProject: (type: ProjectType) => void;
}

export const GlassSphereOrb: React.FC<GlassSphereOrbProps> = ({
  project,
  animationClass,
  onOpenProject
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-24 h-24 sm:w-28 sm:h-28" />;
      case 'excel':
        return <ExcelBrandIcon className="w-24 h-24 sm:w-28 sm:h-28" />;
      case 'canva':
        return <CanvaBrandIcon className="w-24 h-24 sm:w-28 sm:h-28" />;
    }
  };

  const getTheme = () => {
    switch (project.id) {
      case 'word':
        return {
          reactorColor: 'rgba(37, 99, 235, 0.85)',
          rimGlow: 'rgba(59, 130, 246, 0.5)',
          borderHover: 'rgba(96, 165, 250, 0.5)',
          accentText: 'group-hover:text-blue-400'
        };
      case 'excel':
        return {
          reactorColor: 'rgba(16, 185, 129, 0.85)',
          rimGlow: 'rgba(52, 211, 153, 0.5)',
          borderHover: 'rgba(52, 211, 153, 0.5)',
          accentText: 'group-hover:text-emerald-400'
        };
      case 'canva':
        return {
          reactorColor: 'rgba(147, 51, 234, 0.85)',
          rimGlow: 'rgba(192, 132, 252, 0.5)',
          borderHover: 'rgba(192, 132, 252, 0.5)',
          accentText: 'group-hover:text-purple-400'
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      onClick={() => onOpenProject(project.id)}
      className="flex flex-col items-center group cursor-pointer select-none"
    >
      {/* Floating Wrapper */}
      <div className={`flex flex-col items-center ${animationClass}`}>
        
        {/* 3D Glass Sphere Container */}
        <div
          aria-label={`Buka aplikasi ${project.name}`}
          className="w-48 h-48 sm:w-60 sm:h-60 glass-sphere-body flex items-center justify-center relative cursor-pointer group-hover:-translate-y-3 group-hover:scale-105"
        >
          {/* Internal Reactor Core Glow (Awakens softly on Hover) */}
          <div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-2xl pointer-events-none transition-all duration-700 opacity-15 group-hover:opacity-90 group-hover:scale-125 group-hover:animate-reactor"
            style={{ backgroundColor: theme.reactorColor }}
          />

          {/* Suspended Brand Icon in Center */}
          <div className="relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            {getBrandIcon()}
          </div>
        </div>

        {/* Dynamic Floor Shadow */}
        <div className="sphere-floor-shadow mt-6 group-hover:scale-90 group-hover:opacity-60" />
      </div>

      {/* Clean High-Contrast Label */}
      <div className="mt-4 text-center">
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors duration-300 ${theme.accentText}`}>
          {project.name}
        </h3>
        <p className="text-xs font-medium text-slate-400 opacity-70 group-hover:opacity-100 group-hover:text-slate-300 transition-opacity mt-1">
          {project.badge}
        </p>
      </div>
    </div>
  );
};
