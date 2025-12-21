import { create } from 'zustand';

interface UIState {
  // Playback state
  isPlaying: boolean;
  playbackSpeed: number; // 0.25 - 2
  currentTime: number; // Current playback time in milliseconds
  loop: boolean;

  // Timeline
  timelineZoom: number; // 1 - 5
  selectedKeyframeId: string | null;

  // Panels visibility
  showLayerPanel: boolean;
  showPropertyPanel: boolean;
  showCodeViewer: boolean;
  showPresetLibrary: boolean;

  // Canvas settings
  showGrid: boolean;
  snapToGrid: boolean;

  // Actions
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlayPause: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setCurrentTime: (time: number) => void;
  toggleLoop: () => void;

  // Timeline actions
  setTimelineZoom: (zoom: number) => void;
  selectKeyframe: (id: string | null) => void;

  // Panel actions
  toggleLayerPanel: () => void;
  togglePropertyPanel: () => void;
  toggleCodeViewer: () => void;
  togglePresetLibrary: () => void;

  // Canvas actions
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;

  // Reset
  reset: () => void;
}

const initialState = {
  isPlaying: false,
  playbackSpeed: 1,
  currentTime: 0,
  loop: false,
  timelineZoom: 1,
  selectedKeyframeId: null,
  showLayerPanel: true,
  showPropertyPanel: true,
  showCodeViewer: true,
  showPresetLibrary: false,
  showGrid: true,
  snapToGrid: true,
};

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  stop: () =>
    set({
      isPlaying: false,
      currentTime: 0,
    }),

  togglePlayPause: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  setPlaybackSpeed: (speed) =>
    set({
      playbackSpeed: Math.max(0.25, Math.min(2, speed)),
    }),

  setCurrentTime: (time) =>
    set({
      currentTime: Math.max(0, time),
    }),

  toggleLoop: () =>
    set((state) => ({
      loop: !state.loop,
    })),

  setTimelineZoom: (zoom) =>
    set({
      timelineZoom: Math.max(1, Math.min(5, zoom)),
    }),

  selectKeyframe: (id) =>
    set({
      selectedKeyframeId: id,
    }),

  toggleLayerPanel: () =>
    set((state) => ({
      showLayerPanel: !state.showLayerPanel,
    })),

  togglePropertyPanel: () =>
    set((state) => ({
      showPropertyPanel: !state.showPropertyPanel,
    })),

  toggleCodeViewer: () =>
    set((state) => ({
      showCodeViewer: !state.showCodeViewer,
    })),

  togglePresetLibrary: () =>
    set((state) => ({
      showPresetLibrary: !state.showPresetLibrary,
    })),

  toggleGrid: () =>
    set((state) => ({
      showGrid: !state.showGrid,
    })),

  toggleSnapToGrid: () =>
    set((state) => ({
      snapToGrid: !state.snapToGrid,
    })),

  reset: () => set(initialState),
}));
