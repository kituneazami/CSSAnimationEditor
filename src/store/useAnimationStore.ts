import { create } from 'zustand';
import type { Animation, Keyframe } from '@/types';
import { DEFAULT_ANIMATION } from '@/constants/defaults';

interface AnimationState {
  animations: Animation[];
  selectedAnimationId: string | null;

  // Actions
  addAnimation: (animation: Omit<Animation, 'id'>) => string;
  updateAnimation: (id: string, updates: Partial<Animation>) => void;
  deleteAnimation: (id: string) => void;
  selectAnimation: (id: string | null) => void;

  // Keyframe actions
  addKeyframe: (animationId: string, keyframe: Omit<Keyframe, 'id'>) => string;
  updateKeyframe: (animationId: string, keyframeId: string, updates: Partial<Keyframe>) => void;
  deleteKeyframe: (animationId: string, keyframeId: string) => void;

  // Utility
  getAnimation: (id: string) => Animation | undefined;
  getSelectedAnimation: () => Animation | undefined;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  animations: [],
  selectedAnimationId: null,

  addAnimation: (animation) => {
    const id = `animation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newAnimation: Animation = {
      ...DEFAULT_ANIMATION,
      ...animation,
      id,
      keyframes: animation.keyframes || [],
    };

    set((state) => ({
      animations: [...state.animations, newAnimation],
      selectedAnimationId: id,
    }));

    return id;
  },

  updateAnimation: (id, updates) => {
    set((state) => ({
      animations: state.animations.map((anim) =>
        anim.id === id ? { ...anim, ...updates } : anim
      ),
    }));
  },

  deleteAnimation: (id) => {
    set((state) => ({
      animations: state.animations.filter((anim) => anim.id !== id),
      selectedAnimationId:
        state.selectedAnimationId === id ? null : state.selectedAnimationId,
    }));
  },

  selectAnimation: (id) => {
    set({ selectedAnimationId: id });
  },

  addKeyframe: (animationId, keyframe) => {
    const id = `keyframe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newKeyframe: Keyframe = {
      ...keyframe,
      id,
    };

    set((state) => ({
      animations: state.animations.map((anim) =>
        anim.id === animationId
          ? {
              ...anim,
              keyframes: [...anim.keyframes, newKeyframe].sort(
                (a, b) => a.offset - b.offset
              ),
            }
          : anim
      ),
    }));

    return id;
  },

  updateKeyframe: (animationId, keyframeId, updates) => {
    set((state) => ({
      animations: state.animations.map((anim) =>
        anim.id === animationId
          ? {
              ...anim,
              keyframes: anim.keyframes
                .map((kf) =>
                  kf.id === keyframeId ? { ...kf, ...updates } : kf
                )
                .sort((a, b) => a.offset - b.offset),
            }
          : anim
      ),
    }));
  },

  deleteKeyframe: (animationId, keyframeId) => {
    set((state) => ({
      animations: state.animations.map((anim) =>
        anim.id === animationId
          ? {
              ...anim,
              keyframes: anim.keyframes.filter((kf) => kf.id !== keyframeId),
            }
          : anim
      ),
    }));
  },

  getAnimation: (id) => {
    return get().animations.find((anim) => anim.id === id);
  },

  getSelectedAnimation: () => {
    const { animations, selectedAnimationId } = get();
    if (!selectedAnimationId) return undefined;
    return animations.find((anim) => anim.id === selectedAnimationId);
  },
}));
