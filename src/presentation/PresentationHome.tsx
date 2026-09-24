
import React, { useState, useEffect } from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { FloatingAppBubble } from './FloatingAppBubble';
import { Maximize2, Minimize2, BookOpen, Play, ArrowRight, Sparkles } from 'lucide-react';

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
  onStartFullPresentation,
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
      className="min-h-screen w-full relative overflow-x-hidden bg-[#070b14] flex flex-col justify-between p-4 sm:p-8 lg:p-10 select-none bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/wallpaper-moon.png')"
      }}
    >
      {/* Background Video directly loaded and auto-playing */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/wallpaper-moon.png"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-70"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Contrast Overlay to make text and icons pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/80 via-black/40 to-[#070b14]/90 pointer-events-none z-0" />

      {/* TOP BAR: Context Tag & Controls */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Left: Organization Badge & Research Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs font-semibold text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Divisi IPTEK OSIS — Studi Kasus SPETRA 2026
          </span>

          <button
            type="button"
            onClick={() => onOpenResearch?.('overview')}
            aria-label="Buka materi dan riset alur kerja Word, Excel, dan Canva"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/40 hover:border-blue-400 backdrop-blur-md text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-md hover:shadow-blue-500/20 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Buka Materi & Riset</span>
          </button>
        </div>

        {/* Right: Fullscreen Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Keluar dari mode layar penuh' : 'Aktifkan mode layar penuh'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/10 hover:border-white/30 backdrop-blur-md text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
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
      </header>

      {/* HERO SECTION: Clear Presentation Title & Narrative */}
      <section className="relative z-10 w-full max-w-4xl mx-auto text-center mt-4 sm:mt-6 mb-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
          Pelatihan Administrasi & Desain OSIS
        </h1>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Buat anggaran di <span className="text-emerald-400 font-semibold">Excel</span>, susun proposal di <span className="text-blue-400 font-semibold">Word</span>, lalu publikasikan kegiatan dengan <span className="text-purple-400 font-semibold">Canva</span>.
        </p>

        {/* 3-Stage Workflow Roadmap Indicator */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm shadow-sm">
            <span className="font-bold">01</span>
            <span>Hitung Anggaran</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 backdrop-blur-sm shadow-sm">
            <span className="font-bold">02</span>
            <span>Susun Proposal</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 backdrop-blur-sm shadow-sm">
            <span className="font-bold">03</span>
            <span>Publikasikan Kegiatan</span>
          </div>
        </div>

        {/* Action-Oriented CTA Button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartFullPresentation}
            aria-label="Mulai presentasi alur kerja OSIS"
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-105 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Play className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
            <span>Mulai Presentasi</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </section>

      {/* 3 FLOATING APP BUBBLES IN THE CENTER */}
      <section
        aria-label="Pilih software untuk simulasi interaktif"
        className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 justify-items-center items-center my-auto z-10 py-4"
      >
        {projects.map((proj, idx) => (
          <FloatingAppBubble
            key={proj.id}
            project={proj}
            animationClass={getAnimationClass(idx)}
            onOpenProject={onOpenProject}
          />
        ))}
      </section>

      {/* FOOTER: Accessible Navigation Hints */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto text-center pt-2 pb-1 text-[11px] text-slate-400">
        <p>
          Klik salah satu ikon di atas untuk mencoba simulasi interaktif, atau gunakan tombol <span className="text-white font-medium">Mulai Presentasi</span> untuk alur penuh.
        </p>
      </footer>
    </main>
  );
};

