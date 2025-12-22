import { create } from 'zustand';
import type { Layer, Animation } from '@/types';
import { DEFAULT_ELEMENT } from '@/constants/defaults';

interface LayerState {
  layers: Layer[];
  selectedLayerId: string | null;

  // Actions
  addLayer: (layer?: Partial<Omit<Layer, 'id'>>) => string;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  deleteLayer: (id: string) => void;
  selectLayer: (id: string | null) => void;

  // Layer ordering
  moveLayer: (id: string, direction: 'up' | 'down') => void;
  reorderLayers: (draggedId: string, targetId: string) => void;
  setLayerZIndex: (id: string, zIndex: number) => void;

  // Animation assignment
  assignAnimation: (layerId: string, animation: Animation | undefined) => void;

  // Visibility and locking
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;

  // Utility
  getLayer: (id: string) => Layer | undefined;
  getSelectedLayer: () => Layer | undefined;
}

export const useLayerStore = create<LayerState>((set, get) => ({
  layers: [],
  selectedLayerId: null,

  addLayer: (layer) => {
    const id = `layer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const existingLayers = get().layers;
    const maxZIndex = existingLayers.length > 0
      ? Math.max(...existingLayers.map((l) => l.zIndex))
      : 0;

    const newLayer: Layer = {
      id,
      name: `Layer ${existingLayers.length + 1}`,
      element: DEFAULT_ELEMENT,
      visible: true,
      locked: false,
      zIndex: maxZIndex + 1,
      ...layer,
    };

    set((state) => ({
      layers: [...state.layers, newLayer],
      selectedLayerId: id,
    }));

    return id;
  },

  updateLayer: (id, updates) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, ...updates } : layer
      ),
    }));
  },

  deleteLayer: (id) => {
    set((state) => ({
      layers: state.layers.filter((layer) => layer.id !== id),
      selectedLayerId:
        state.selectedLayerId === id ? null : state.selectedLayerId,
    }));
  },

  selectLayer: (id) => {
    set({ selectedLayerId: id });
  },

  moveLayer: (id, direction) => {
    set((state) => {
      const layers = [...state.layers];
      const index = layers.findIndex((l) => l.id === id);

      if (index === -1) return state;

      const newIndex = direction === 'up' ? index + 1 : index - 1;

      if (newIndex < 0 || newIndex >= layers.length) return state;

      // Swap layers
      [layers[index], layers[newIndex]] = [layers[newIndex], layers[index]];

      // Update zIndex
      return {
        layers: layers.map((layer, idx) => ({
          ...layer,
          zIndex: idx + 1,
        })),
      };
    });
  },

  reorderLayers: (draggedId, targetId) => {
    set((state) => {
      const layers = [...state.layers];
      const draggedIndex = layers.findIndex((l) => l.id === draggedId);
      const targetIndex = layers.findIndex((l) => l.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) return state;
      if (draggedIndex === targetIndex) return state;

      // Remove dragged layer and insert at target position
      const [draggedLayer] = layers.splice(draggedIndex, 1);
      layers.splice(targetIndex, 0, draggedLayer);

      // Update zIndex for all layers
      return {
        layers: layers.map((layer, idx) => ({
          ...layer,
          zIndex: idx + 1,
        })),
      };
    });
  },

  setLayerZIndex: (id, zIndex) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, zIndex } : layer
      ),
    }));
  },

  assignAnimation: (layerId, animation) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, animation } : layer
      ),
    }));
  },

  toggleLayerVisibility: (id) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ),
    }));
  },

  toggleLayerLock: (id) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, locked: !layer.locked } : layer
      ),
    }));
  },

  getLayer: (id) => {
    return get().layers.find((layer) => layer.id === id);
  },

  getSelectedLayer: () => {
    const { layers, selectedLayerId } = get();
    if (!selectedLayerId) return undefined;
    return layers.find((layer) => layer.id === selectedLayerId);
  },
}));
