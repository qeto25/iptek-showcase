export type ProjectType = 'word' | 'excel' | 'canva';

export interface ProjectMetadata {
  id: ProjectType;
  name: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  keyHighlights: string[];
  icon: string;
  color: string;
  gradient: string;
  learningGoal: string;
}
