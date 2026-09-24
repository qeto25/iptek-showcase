import React, { useState, useEffect } from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { FloatingAppBubble } from './FloatingAppBubble';
import { Maximize2, Minimize2, BookOpen, Play, Sparkles } from 'lucide-react';

interface PresentationHomeProps {
  projects: ProjectMetadata[];
  onOpenProject: (type: ProjectType) => void;
  onLaunchReplay: (type: ProjectType) => void;
  onStartFullPresentation: () => void;
  onOpenResearch?: (tab?: 'overview' | 'canva' | 'word' | 'excel' | 'conclusion') => void;
}

export const PresentationHome: React.FC<PresentationHomeProps> = ({
  projects,
  onOpenProject,
  onStartFullPresentation,
  onOpenResearch
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect user prefers-reduced-motion preference to handle video accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
    if (prefersReducedMotion) return '';
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
      className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden w-full relative overflow-x-hidden bg-[#070b14] flex flex-col justify-between p-3 sm:p-4 lg:py-4 lg:px-6 select-none bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/wallpaper-moon.png')"
      }}
    >
      {/* Background Video: paused and omitted if user requests reduced motion */}
      {!prefersReducedMotion && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/wallpaper-moon.png"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-60"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Cinematic Contrast Overlay to make text and cards pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/85 via-black/45 to-[#070b14]/95 pointer-events-none z-0" />

      {/* 1. TOP BAR: Floating Glass Navbar */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between gap-3 py-2 px-4 sm:px-5 rounded-2xl bg-slate-900/75 border border-slate-700/60 backdrop-blur-xl shadow-xl">
        {/* Left: Organization Badge & Case Study */}
        <div className="flex items-center gap-2.5 flex-wrap select-text">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white tracking-wide">
            <span>Divisi IPTEK OSIS</span>
            <span className="text-slate-400 font-normal hidden sm:inline">• Studi Kasus SPETRA 2026</span>
          </div>
        </div>

        {/* Right: Actions (Materi & Fullscreen) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenResearch?.('overview')}
            aria-label="Buka materi dan riset alur kerja Word, Excel, dan Canva"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Materi & Riset</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Keluar dari mode layar penuh' : 'Aktifkan mode layar penuh'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">Normal</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">Layar Penuh</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* CENTER STAGE: Hero + Showcase Cards unified block */}
      <div className="w-full flex flex-col items-center justify-center mt-1 sm:mt-2 mb-auto z-10 py-1">
        {/* 2. HERO SECTION */}
        <section className="relative w-full max-w-4xl mx-auto text-center mb-3 sm:mb-4 select-text">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs font-semibold tracking-wide mb-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Sinergi 3 Perangkat Lunak Administrasi & Desain Sekolah</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            Pelatihan Administrasi & Desain OSIS
          </h1>

          <p className="mt-1 text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Hitung anggaran otomatis di <span className="text-emerald-400 font-semibold">Excel</span>, susun proposal formal di <span className="text-blue-400 font-semibold">Word</span>, lalu publikasikan kegiatan melalui <span className="text-purple-400 font-semibold">Canva</span>.
          </p>

          {/* Action-Oriented Hero CTA Button */}
          <div className="mt-2.5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStartFullPresentation}
              aria-label="Mulai presentasi alur kerja OSIS"
              className="group inline-flex items-center gap-2 px-5 py-1.5 sm:px-6 sm:py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:shadow-[0_0_30px_rgba(99,102,241,0.85)] hover:scale-105 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Play className="w-3.5 h-3.5 fill-white group-hover:translate-x-0.5 transition-transform" />
              <span>Mulai Presentasi Alur Penuh</span>
            </button>
          </div>
        </section>

        {/* 3. 3 SHOWCASE CARDS: Equal-Height Responsive Grid */}
        <section
          aria-label="Pilih software untuk simulasi interaktif"
          className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 justify-items-center items-stretch"
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
      </div>

      {/* 4. FOOTER: Clear Guidance Note */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto text-center pt-1 pb-0.5 text-[10px] sm:text-[11px] text-slate-400 select-text">
        <p>
          Klik salah satu kartu aplikasi di atas untuk simulasi interaktif, atau tekan tombol <span className="text-white font-semibold">Mulai Presentasi</span> untuk alur berkelanjutan dari awal hingga kesimpulan.
        </p>
      </footer>
    </main>
  );
};
