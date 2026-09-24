import React, { useState } from 'react';
import { ProjectMetadata, ProjectType } from './types/project';
import { PresentationHome } from './presentation/PresentationHome';
import { ReplayModal } from './presentation/simulation/ReplayModal';
import { ResearchModal } from './presentation/ResearchModal';

const PROJECTS: ProjectMetadata[] = [
  {
    id: 'excel',
    name: 'Microsoft Excel',
    title: '01 — Hitung Anggaran',
    category: 'Spreadsheet Anggaran',
    badge: 'Aplikasi Desktop (.xlsx)',
    description: 'Otomatisasi rumus perkalian =C5*D5, tarik Fill Handle ke bawah, formula =SUM, dan format Rupiah.',
    learningGoal: 'Rumus otomatis perkalian dan penjumlahan total dana.',
    keyHighlights: ['Rumus =C5*D5 Otomatis', 'Tarik Fill Handle', 'Grand Total =SUM(...)'],
    icon: 'excel',
    color: '#107c41',
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'word',
    name: 'Microsoft Word',
    title: '02 — Susun Proposal',
    category: 'Dokumen Proposal',
    badge: 'Aplikasi Desktop (.docx)',
    description: 'Format surat pengantar, struktur kepanitiaan, tabel peserta kelas, dan susunan rundown acara resmi.',
    learningGoal: 'Struktur kepanitiaan, tabel peserta, rundown, dan juknis lomba.',
    keyHighlights: ['Format Proposal Resmi', 'Tabel Delegasi Kelas', 'Rundown 07.15 - 13.10'],
    icon: 'word',
    color: '#185abd',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'canva',
    name: 'Canva',
    title: '03 — Publikasikan Kegiatan',
    category: 'Desain Komposisi Visual',
    badge: 'Web Browser (canva.com)',
    description: 'Tata letak visual poster upacara bendera hari Senin dengan pita merah putih, kartu info, dan ilustrasi siswa.',
    learningGoal: 'Hierarki tipografi dan komposisi visual upacara sekolah.',
    keyHighlights: ['Pita Merah Putih & Garuda', 'Trio Kartu Informasi', 'Ilustrasi Siswa Hormat'],
    icon: 'canva',
    color: '#7d2ae8',
    gradient: 'from-sky-600 to-purple-600'
  }
];

export function App() {
  const [activeProjectType, setActiveProjectType] = useState<ProjectType | null>(null);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState(false);
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [researchTab, setResearchTab] = useState<'overview' | 'canva' | 'word' | 'excel'>('overview');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleOpenProject = (type: ProjectType) => {
    setActiveProjectType(type);
    setIsReplayModalOpen(true);
  };

  const handleLaunchReplay = (type: ProjectType) => {
    setActiveProjectType(type);
    setIsReplayModalOpen(true);
  };

  const handleStartFullPresentation = () => {
    setActiveProjectType('excel');
    setIsReplayModalOpen(true);
    setAlertMessage('Memulai Alur Presentasi: 01 — Microsoft Excel (Hitung Anggaran).');
    setTimeout(() => setAlertMessage(null), 3500);
  };

  const handleOpenResearch = (tab: 'overview' | 'canva' | 'word' | 'excel' = 'overview') => {
    setResearchTab(tab);
    setIsResearchModalOpen(true);
  };

  const activeProject =
    PROJECTS.find((p) => p.id === activeProjectType) || PROJECTS[0];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {alertMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-md text-xs sm:text-sm animate-fade-in flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Clean Presentation Home */}
      <PresentationHome
        projects={PROJECTS}
        onOpenProject={handleOpenProject}
        onLaunchReplay={handleLaunchReplay}
        onStartFullPresentation={handleStartFullPresentation}
        onOpenResearch={handleOpenResearch}
      />

      {/* Interactive Simulation / Replay Modal */}
      {activeProjectType && (
        <ReplayModal
          project={activeProject}
          isOpen={isReplayModalOpen}
          onClose={() => setIsReplayModalOpen(false)}
          onOpenResearch={handleOpenResearch}
        />
      )}

      {/* Deep Research Modal */}
      <ResearchModal
        isOpen={isResearchModalOpen}
        onClose={() => setIsResearchModalOpen(false)}
        defaultTab={researchTab}
        onLaunchSimulation={handleOpenProject}
      />
    </div>
  );
}

export default App;
