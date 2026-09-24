import React from 'react';
import { ProjectMetadata, ProjectType } from '../types/project';
import { WordBrandIcon, ExcelBrandIcon, CanvaBrandIcon } from '../components/AppIcons';
import { ArrowRight, Play } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectMetadata;
  onOpenProject: (type: ProjectType) => void;
  onLaunchReplay: (type: ProjectType) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenProject,
  onLaunchReplay
}) => {
  const getBrandIcon = () => {
    switch (project.id) {
      case 'word':
        return <WordBrandIcon className="w-16 h-16 shrink-0" />;
      case 'excel':
        return <ExcelBrandIcon className="w-16 h-16 shrink-0" />;
      case 'canva':
        return <CanvaBrandIcon className="w-16 h-16 shrink-0" />;
    }
  };

  return (
    <div className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-7 flex flex-col justify-between transition-transform transition-opacity duration-200 border border-slate-800/80 hover:border-slate-700 shadow-xl group">
      <div>
        {/* Top App Icon & Category Tag */}
        <div className="flex items-start justify-between mb-6">
          <div className="transform group-hover:scale-105 transition-transform duration-200 filter drop-shadow-md">
            {getBrandIcon()}
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full uppercase tracking-wider">
            {project.badge}
          </span>
        </div>

        {/* Clean Application & Document Title */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {project.name}
          </p>
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Short, Clean 1-Line Description */}
        <p className="text-sm text-slate-300/90 mt-3 leading-relaxed">
          {project.description}
        </p>

        {/* Single Refined Feature Tag */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span className="text-slate-400 font-medium">Fokus Materi:</span>
          <span className="font-semibold text-slate-200 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
            {project.id === 'word' ? 'Format Proposal & Rundown' :
             project.id === 'excel' ? 'Rumus =C5*D5 & =SUM' :
             'Tata Letak Poster Upacara'}
          </span>
        </div>
      </div>

      {/* Clean Modern Buttons */}
      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onOpenProject(project.id)}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors border border-slate-700/80 cursor-pointer"
        >
          <span>Buka Proyek</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onLaunchReplay(project.id)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
          title="Putar Simulasi Pembuatan"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Replay</span>
        </button>
      </div>
    </div>
  );
};
