import type { Animation, ProjectSettings } from '@/types';

export const DEFAULT_ANIMATION: Omit<Animation, 'id' | 'keyframes'> = {
  name: 'newAnimation',
  duration: 1000,
  timingFunction: 'ease',
  delay: 0,
  iterationCount: 1,
  direction: 'normal',
  fillMode: 'both',
};

export const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  canvasWidth: 800,
  canvasHeight: 600,
  backgroundColor: '#ffffff',
  gridEnabled: true,
  gridSize: 20,
};

export const DEFAULT_ELEMENT = {
  tagName: 'div',
  className: 'animated-element',
  styles: {
    width: '100px',
    height: '100px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
  },
  content: '',
};
