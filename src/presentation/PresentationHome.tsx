import React, { useState, useEffect } from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { FloatingAppBubble } from './FloatingAppBubble';
import { Maximize2, Minimize2, BookOpen } from 'lucide-react';

interface PresentationHomeProps {
  projects: ProjectMetadata[];
  onOpenProject: (type: ProjectType) => void;
  onLaunchReplay: (type: ProjectType) => void;
  onStartFullPresentation: () => void;
  onOpenResearch?: (tab?: 'overview' | 'canva' | 'word' | 'excel') => void;
}

export const PresentationHome: React.FC<PresentationHomeProps> = ({
  projects,
  onOpenProject,
  onOpenResearch
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle Fullscreen mode for TV / Aula presentation
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const getAnimationClass = (index: number) => {
    switch (index % 3) {
      case 0:
        return 'animate-float-1';
      case 1:
        return 'animate-float-2';
      case 2:
        return 'animate-float-3';
      default:
        return 'animate-float-1';
    }
  };

  return (
    <main
      className="h-screen w-screen overflow-hidden bg-[#070b14] flex flex-col justify-center items-center p-6 sm:p-12 relative select-none bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/wallpaper-moon.png')"
      }}
    >
      {/* Background Video directly loaded and auto-playing from Pinterest */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/wallpaper-moon.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Contrast Overlay to make icons pop on top of the moon video */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none z-0" />

      {/* Top Left: Deep Research IPTEK Button */}
      <div className="absolute top-5 left-6 z-20">
        <button
          type="button"
          onClick={() => onOpenResearch?.('overview')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-blue-500/40 hover:border-blue-400 backdrop-blur-md text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-lg hover:shadow-blue-500/20 group"
          title="Buka Hasil Riset Mendalam Canva, Word & Excel"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-6 transition-transform" />
          <span>Hasil Riset IPTEK: Canva, Word & Excel</span>
        </button>
      </div>

      {/* Discreet Fullscreen Button (Top Right Corner) */}
      <div className="absolute top-5 right-6 z-20">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/40 hover:bg-slate-900/80 border border-white/10 hover:border-white/30 backdrop-blur-md text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer shadow-lg"
          title="Mode Layar Penuh (F5 / F11)"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Normal</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Layar Penuh</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Pure Floating 3D App Icons in the Center */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-24 justify-items-center items-center my-auto z-10">
        {projects.map((proj, idx) => (
          <FloatingAppBubble
            key={proj.id}
            project={proj}
            animationClass={getAnimationClass(idx)}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>
    </main>
  );
};
