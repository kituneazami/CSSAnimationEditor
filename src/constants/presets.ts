import type { Animation } from '@/types';
import { SVG_PATH_PRESETS } from './svgPresets';

export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
  category: 'entrance' | 'exit' | 'attention' | 'transform';
  animation: Omit<Animation, 'id'>;
}

const BASE_PRESETS: AnimationPreset[] = [
  // Entrance Animations
  {
    id: 'fadeIn',
    name: 'Fade In',
    description: 'Element fades in from transparent to opaque',
    category: 'entrance',
    animation: {
      name: 'fadeIn',
      duration: 1000,
      timingFunction: 'ease-in',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { opacity: 0 } },
        { id: 'kf-100', offset: 100, properties: { opacity: 1 } },
      ],
    },
  },
  {
    id: 'slideInLeft',
    name: 'Slide In Left',
    description: 'Element slides in from the left',
    category: 'entrance',
    animation: {
      name: 'slideInLeft',
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { translateX: '-100px' },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateX: '0px' },
            opacity: 1,
          },
        },
      ],
    },
  },
  {
    id: 'slideInRight',
    name: 'Slide In Right',
    description: 'Element slides in from the right',
    category: 'entrance',
    animation: {
      name: 'slideInRight',
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { translateX: '100px' },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateX: '0px' },
            opacity: 1,
          },
        },
      ],
    },
  },
  {
    id: 'slideInUp',
    name: 'Slide In Up',
    description: 'Element slides in from below',
    category: 'entrance',
    animation: {
      name: 'slideInUp',
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { translateY: '100px' },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateY: '0px' },
            opacity: 1,
          },
        },
      ],
    },
  },
  {
    id: 'slideInDown',
    name: 'Slide In Down',
    description: 'Element slides in from above',
    category: 'entrance',
    animation: {
      name: 'slideInDown',
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { translateY: '-100px' },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateY: '0px' },
            opacity: 1,
          },
        },
      ],
    },
  },
  {
    id: 'zoomIn',
    name: 'Zoom In',
    description: 'Element zooms in from small to normal size',
    category: 'entrance',
    animation: {
      name: 'zoomIn',
      duration: 600,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { scale: 0 },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { scale: 1 },
            opacity: 1,
          },
        },
      ],
    },
  },

  // Exit Animations
  {
    id: 'fadeOut',
    name: 'Fade Out',
    description: 'Element fades out from opaque to transparent',
    category: 'exit',
    animation: {
      name: 'fadeOut',
      duration: 1000,
      timingFunction: 'ease-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { opacity: 1 } },
        { id: 'kf-100', offset: 100, properties: { opacity: 0 } },
      ],
    },
  },
  {
    id: 'slideOutRight',
    name: 'Slide Out Right',
    description: 'Element slides out to the right',
    category: 'exit',
    animation: {
      name: 'slideOutRight',
      duration: 800,
      timingFunction: 'ease-in',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { translateX: '0px' },
            opacity: 1,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateX: '100px' },
            opacity: 0,
          },
        },
      ],
    },
  },
  {
    id: 'zoomOut',
    name: 'Zoom Out',
    description: 'Element zooms out from normal to small size',
    category: 'exit',
    animation: {
      name: 'zoomOut',
      duration: 600,
      timingFunction: 'ease-in',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            transform: { scale: 1 },
            opacity: 1,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { scale: 0 },
            opacity: 0,
          },
        },
      ],
    },
  },

  // Attention Seekers
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Element bounces up and down',
    category: 'attention',
    animation: {
      name: 'bounce',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { translateY: '0px' } } },
        { id: 'kf-25', offset: 25, properties: { transform: { translateY: '-30px' } } },
        { id: 'kf-50', offset: 50, properties: { transform: { translateY: '0px' } } },
        { id: 'kf-75', offset: 75, properties: { transform: { translateY: '-15px' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { translateY: '0px' } } },
      ],
    },
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Element pulses by scaling',
    category: 'attention',
    animation: {
      name: 'pulse',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { scale: 1 } } },
        { id: 'kf-50', offset: 50, properties: { transform: { scale: 1.1 } } },
        { id: 'kf-100', offset: 100, properties: { transform: { scale: 1 } } },
      ],
    },
  },
  {
    id: 'shake',
    name: 'Shake',
    description: 'Element shakes horizontally',
    category: 'attention',
    animation: {
      name: 'shake',
      duration: 800,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { translateX: '0px' } } },
        { id: 'kf-25', offset: 25, properties: { transform: { translateX: '-10px' } } },
        { id: 'kf-50', offset: 50, properties: { transform: { translateX: '10px' } } },
        { id: 'kf-75', offset: 75, properties: { transform: { translateX: '-10px' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { translateX: '0px' } } },
      ],
    },
  },

  // Transforms
  {
    id: 'rotate',
    name: 'Rotate',
    description: 'Element rotates 360 degrees',
    category: 'transform',
    animation: {
      name: 'rotate',
      duration: 1000,
      timingFunction: 'linear',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { rotate: '0deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { rotate: '360deg' } } },
      ],
    },
  },
  {
    id: 'flip',
    name: 'Flip',
    description: 'Element flips horizontally',
    category: 'transform',
    animation: {
      name: 'flip',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { rotateY: '0deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { rotateY: '360deg' } } },
      ],
    },
  },
];

// Combine base presets with SVG path presets
export const ANIMATION_PRESETS: AnimationPreset[] = [
  ...BASE_PRESETS,
  ...SVG_PATH_PRESETS,
];

export function getPresetsByCategory(category: AnimationPreset['category']): AnimationPreset[] {
  return ANIMATION_PRESETS.filter((preset) => preset.category === category);
}

export function getPresetById(id: string): AnimationPreset | undefined {
  return ANIMATION_PRESETS.find((preset) => preset.id === id);
}
