import React, { useState, useEffect, useRef } from 'react';
import { ProjectMetadata, ProjectType } from '../../types/project';
import { WordSimulation } from './WordSimulation';
import { ExcelSimulation } from './ExcelSimulation';
import { CanvaSimulation } from './CanvaSimulation';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Gauge,
  X,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ReplayModalProps {
  project: ProjectMetadata;
  isOpen: boolean;
  onClose: () => void;
  onOpenResearch?: (tab: 'overview' | 'canva' | 'word' | 'excel' | 'conclusion') => void;
  onNextStage?: (nextType: ProjectType) => void;
  onFinishPresentation?: () => void;
  initialMode?: 'interactive' | 'replay';
}

export const ReplayModal: React.FC<ReplayModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenResearch,
  onNextStage,
  onFinishPresentation
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 0.75x, 1x, 1.5x, 2x

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Accessible Focus Trap & Restoration
  useFocusTrap(modalRef, {
    isOpen,
    onClose,
    initialFocusRef: closeButtonRef,
    closeOnEscape: true
  });

  // Excel has 5 dedicated steps (including explicit Currency Rp formatting), Word & Canva have 4 steps
  const totalSteps = project.id === 'excel' ? 5 : 4;

  // Reset state when opening a new project
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsPlaying(true);
    }
  }, [isOpen, project.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, project.id]);

  // Auto-advancing timer when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    // Paced duration giving time for mouse movement, clicking, and slow typing
    const getStepDuration = () => {
      if (project.id === 'excel') {
        if (currentStep === 2) return 5000; // formula typing =C5*D5
        if (currentStep === 3) return 4800; // drag fill handle
        if (currentStep === 4) return 5000; // AutoSum selection
        return 3800;
      }
      if (project.id === 'word') {
        if (currentStep === 0) return 3800; // typing title
        if (currentStep === 1) return 4800; // typing panitia
        return 3800;
      }
      if (project.id === 'canva') {
        if (currentStep === 1) return 3800; // drag & snap
        if (currentStep === 3) return 4400; // finalize & export
        return 3600;
      }
      return 3800;
    };

    const duration = Math.floor(getStepDuration() / speed);

    const timer = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Paused at the end
        setIsPlaying(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentStep, speed, project.id]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const cycleSpeed = () => {
    if (speed === 1) setSpeed(1.5);
    else if (speed === 1.5) setSpeed(2);
    else if (speed === 2) setSpeed(0.75);
    else setSpeed(1);
  };

  const getStepLabels = () => {
    switch (project.id) {
      case 'excel':
        return [
          '1. Input Angka Polos',
          '2. Format Mata Uang (Rp)',
          '3. Rumus Perkalian (=C5*D5)',
          '4. Tarik Fill-Handle',
          '5. Total Otomatis =SUM()'
        ];
      case 'word':
        return [
          '1. Judul Event SPETRA',
          '2. Panitia Inti (Siti Badriyah, dkk)',
          '3. Seksi Acara & Perlengkapan',
          '4. Pengesahan & Cap Basah'
        ];
      case 'canva':
        return [
          '1. Setup Kanvas Poster',
          '2. Pita & Garuda Pancasila',
          '3. Tipografi Upacara Bendera',
          '4. Petugas XI FKK & Ekspor'
        ];
      default:
        return ['Langkah 1', 'Langkah 2', 'Langkah 3', 'Langkah 4'];
    }
  };

  const stepLabels = getStepLabels();

  const renderSimulationEngine = () => {
    switch (project.id) {
      case 'word':
        return (
          <WordSimulation
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            speed={speed}
            isPlaying={isPlaying}
            onClose={onClose}
          />
        );
      case 'excel':
        return (
          <ExcelSimulation
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            speed={speed}
            isPlaying={isPlaying}
            onClose={onClose}
          />
        );
      case 'canva':
        return (
          <CanvaSimulation
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            speed={speed}
            isPlaying={isPlaying}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  const getNextStageInfo = () => {
    if (project.id === 'excel') {
      return {
        nextType: 'word' as ProjectType,
        shortLabel: 'Lanjut: 02 Word (Proposal)',
        buttonClass: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
      };
    }
    if (project.id === 'word') {
      return {
        nextType: 'canva' as ProjectType,
        shortLabel: 'Lanjut: 03 Canva (Publikasi)',
        buttonClass: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
      };
    }
    if (project.id === 'canva') {
      return {
        nextType: null,
        shortLabel: 'Selesai: Rangkuman & Kesimpulan',
        buttonClass: 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]'
      };
    }
    return null;
  };

  const nextStageInfo = getNextStageInfo();

  const handleNextStageClick = () => {
    if (nextStageInfo?.nextType && onNextStage) {
      onNextStage(nextStageInfo.nextType);
    } else if (onFinishPresentation) {
      onFinishPresentation();
    } else if (onOpenResearch) {
      onClose();
      onOpenResearch('conclusion');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      {/* Modal Dialog Container: Zero Double-Frame, Edge-to-Edge Desktop Application Chrome */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="replay-modal-title"
        className="w-full max-w-6xl h-[94vh] sm:h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative focus:outline-none"
        tabIndex={-1}
      >
        <h2 id="replay-modal-title" className="sr-only">
          Simulasi Interaktif {project.name} — {project.title}
        </h2>
        
        {/* Dynamic Native Application Window (Word, Excel, or Canva) */}
        <div className="flex-1 overflow-hidden relative">
          {renderSimulationEngine()}
        </div>

        {/* Bottom Playback Controller Dock */}
        <div className="bg-[#121316] border-t border-[#25262a] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 select-none text-xs">
          {/* Step Timeline Indicator Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap" role="group" aria-label="Daftar langkah simulasi">
            {stepLabels.map((label, stepIdx) => {
              const isActive = currentStep === stepIdx;
              const isPast = currentStep > stepIdx;
              return (
                <button
                  key={stepIdx}
                  type="button"
                  onClick={() => {
                    setCurrentStep(stepIdx);
                    setIsPlaying(false);
                  }}
                  aria-label={`Lompat ke ${label}`}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.6)]'
                      : isPast
                      ? 'bg-slate-800 text-blue-300 hover:bg-slate-700'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700'
                  }`}
                  title={`Lompat ke ${label}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-white' : isPast ? 'bg-blue-400' : 'bg-slate-500'
                    }`}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {/* Step Back */}
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              aria-label="Langkah sebelumnya (Panah Kiri)"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Langkah Sebelumnya (Panah Kiri)"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Jeda Simulasi (Spasi)' : 'Putar Simulasi (Spasi)'}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 shadow-md transition-colors cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title={isPlaying ? 'Jeda Simulasi (Spasi)' : 'Putar Simulasi (Spasi)'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar</span>
                </>
              )}
            </button>

            {/* Step Forward */}
            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStep === totalSteps - 1}
              aria-label="Langkah berikutnya (Panah Kanan)"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Langkah Berikutnya (Panah Kanan)"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Restart */}
            <button
              type="button"
              onClick={handleRestart}
              aria-label="Ulangi dari langkah pertama (R)"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Ulangi dari Langkah 1 (R)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed, Research, Stage Progression & Exit Controls */}
          <div className="flex items-center gap-2">
            {/* Stage Progression Action Button */}
            {nextStageInfo && (
              <button
                type="button"
                onClick={handleNextStageClick}
                aria-label={nextStageInfo.shortLabel}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${nextStageInfo.buttonClass} ${
                  currentStep === totalSteps - 1 ? 'animate-pulse ring-2 ring-white/50' : ''
                }`}
                title={nextStageInfo.shortLabel}
              >
                <span>{nextStageInfo.shortLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenResearch && (
              <button
                type="button"
                onClick={() => onOpenResearch(project.id as 'word' | 'excel' | 'canva')}
                aria-label={`Buka materi riset untuk ${project.name}`}
                className="flex items-center gap-1.5 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-300 hover:text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                title="Buka Dokumen Riset Mendalam Software Ini"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Riset Teknis</span>
              </button>
            )}

            <button
              type="button"
              onClick={cycleSpeed}
              aria-label={`Ubah kecepatan pemutaran (saat ini ${speed}x)`}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border border-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Ubah Kecepatan Simulasi"
            >
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{speed}x</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup simulasi (Esc)"
              className="flex items-center gap-1 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg text-xs transition-colors border border-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              title="Keluar dari Simulasi (Esc)"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tutup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
