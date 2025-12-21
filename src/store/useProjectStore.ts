import { create } from 'zustand';
import type { Project, ProjectSettings, ProjectExport } from '@/types';
import { DEFAULT_PROJECT_SETTINGS } from '@/constants/defaults';
import { useLayerStore } from './useLayerStore';
import { useAnimationStore } from './useAnimationStore';
import { useUIStore } from './useUIStore';

interface ProjectState {
  project: Project | null;
  isDirty: boolean; // Has unsaved changes

  // Actions
  createNewProject: (name?: string) => void;
  loadProject: (project: Project) => void;
  updateProjectSettings: (settings: Partial<ProjectSettings>) => void;
  updateProjectName: (name: string) => void;

  // Save/Load
  exportProject: () => ProjectExport;
  importProject: (exportData: ProjectExport) => void;

  // Local storage
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => boolean;

  // Utility
  markDirty: () => void;
  markClean: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: null,
  isDirty: false,

  createNewProject: (name = 'Untitled Project') => {
    const now = new Date();
    const newProject: Project = {
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      version: '1.0.0',
      createdAt: now,
      updatedAt: now,
      layers: [],
      settings: { ...DEFAULT_PROJECT_SETTINGS },
    };

    set({
      project: newProject,
      isDirty: false,
    });

    // Reset all stores
    useLayerStore.setState({ layers: [], selectedLayerId: null });
    useAnimationStore.setState({ animations: [], selectedAnimationId: null });
    useUIStore.getState().reset();
  },

  loadProject: (project) => {
    set({
      project: {
        ...project,
        updatedAt: new Date(),
      },
      isDirty: false,
    });

    // Load layers and animations
    useLayerStore.setState({
      layers: project.layers,
      selectedLayerId: null,
    });

    // Extract animations from layers
    const animations = project.layers
      .map((layer) => layer.animation)
      .filter((anim): anim is NonNullable<typeof anim> => anim !== undefined);

    useAnimationStore.setState({
      animations,
      selectedAnimationId: null,
    });

    useUIStore.getState().reset();
  },

  updateProjectSettings: (settings) => {
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          settings: {
            ...state.project.settings,
            ...settings,
          },
          updatedAt: new Date(),
        },
        isDirty: true,
      };
    });
  },

  updateProjectName: (name) => {
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          name,
          updatedAt: new Date(),
        },
        isDirty: true,
      };
    });
  },

  exportProject: () => {
    const { project } = get();
    if (!project) {
      throw new Error('No project to export');
    }

    // Get current layers from layer store
    const layers = useLayerStore.getState().layers;

    const exportData: ProjectExport = {
      project: {
        id: project.id,
        name: project.name,
        version: project.version,
        createdAt: project.createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
        layers,
        settings: project.settings,
      },
      version: '1.0.0',
    };

    return exportData;
  },

  importProject: (exportData) => {
    const project: Project = {
      ...exportData.project,
      createdAt: new Date(exportData.project.createdAt),
      updatedAt: new Date(exportData.project.updatedAt),
    };

    get().loadProject(project);
  },

  saveToLocalStorage: () => {
    const exportData = get().exportProject();
    localStorage.setItem('css-animation-editor-project', JSON.stringify(exportData));
    set({ isDirty: false });
  },

  loadFromLocalStorage: () => {
    const data = localStorage.getItem('css-animation-editor-project');
    if (!data) return false;

    try {
      const exportData: ProjectExport = JSON.parse(data);
      get().importProject(exportData);
      return true;
    } catch (error) {
      console.error('Failed to load project from local storage:', error);
      return false;
    }
  },

  markDirty: () => set({ isDirty: true }),

  markClean: () => set({ isDirty: false }),
}));
