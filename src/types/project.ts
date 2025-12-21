import type { Layer } from './layer';

export interface Project {
  id: string;
  name: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  layers: Layer[];
  settings: ProjectSettings;
}

export interface ProjectSettings {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  gridEnabled: boolean;
  gridSize: number;
}

export interface ProjectExport {
  project: Omit<Project, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
  version: string;
}
