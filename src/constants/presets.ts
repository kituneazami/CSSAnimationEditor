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
  {
    id: 'bounceIn',
    name: 'Bounce In',
    description: 'Element bounces in with scaling effect',
    category: 'entrance',
    animation: {
      name: 'bounceIn',
      duration: 1000,
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
            transform: { scale: 0.3 },
            opacity: 0,
          },
        },
        {
          id: 'kf-50',
          offset: 50,
          properties: {
            transform: { scale: 1.05 },
            opacity: 1,
          },
        },
        {
          id: 'kf-70',
          offset: 70,
          properties: {
            transform: { scale: 0.9 },
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
  {
    id: 'rotateIn',
    name: 'Rotate In',
    description: 'Element rotates and fades in',
    category: 'entrance',
    animation: {
      name: 'rotateIn',
      duration: 1000,
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
            transform: { rotate: '-200deg', scale: 0 },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { rotate: '0deg', scale: 1 },
            opacity: 1,
          },
        },
      ],
    },
  },
  {
    id: 'rollIn',
    name: 'Roll In',
    description: 'Element rolls in from the left',
    category: 'entrance',
    animation: {
      name: 'rollIn',
      duration: 1000,
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
            transform: { translateX: '-100px', rotate: '-120deg' },
            opacity: 0,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { translateX: '0px', rotate: '0deg' },
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
  {
    id: 'slideOutLeft',
    name: 'Slide Out Left',
    description: 'Element slides out to the left',
    category: 'exit',
    animation: {
      name: 'slideOutLeft',
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
            transform: { translateX: '-100px' },
            opacity: 0,
          },
        },
      ],
    },
  },
  {
    id: 'bounceOut',
    name: 'Bounce Out',
    description: 'Element bounces out with scaling effect',
    category: 'exit',
    animation: {
      name: 'bounceOut',
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
            transform: { scale: 1 },
            opacity: 1,
          },
        },
        {
          id: 'kf-25',
          offset: 25,
          properties: {
            transform: { scale: 0.95 },
          },
        },
        {
          id: 'kf-50',
          offset: 50,
          properties: {
            transform: { scale: 1.1 },
            opacity: 1,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { scale: 0.3 },
            opacity: 0,
          },
        },
      ],
    },
  },
  {
    id: 'rotateOut',
    name: 'Rotate Out',
    description: 'Element rotates and fades out',
    category: 'exit',
    animation: {
      name: 'rotateOut',
      duration: 1000,
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
            transform: { rotate: '0deg', scale: 1 },
            opacity: 1,
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            transform: { rotate: '200deg', scale: 0 },
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
  {
    id: 'swing',
    name: 'Swing',
    description: 'Element swings like a pendulum',
    category: 'attention',
    animation: {
      name: 'swing',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { rotate: '0deg' } } },
        { id: 'kf-20', offset: 20, properties: { transform: { rotate: '15deg' } } },
        { id: 'kf-40', offset: 40, properties: { transform: { rotate: '-10deg' } } },
        { id: 'kf-60', offset: 60, properties: { transform: { rotate: '5deg' } } },
        { id: 'kf-80', offset: 80, properties: { transform: { rotate: '-5deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { rotate: '0deg' } } },
      ],
    },
  },
  {
    id: 'tada',
    name: 'Tada',
    description: 'Element does a celebratory shake and scale',
    category: 'attention',
    animation: {
      name: 'tada',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { scale: 1, rotate: '0deg' } } },
        { id: 'kf-10', offset: 10, properties: { transform: { scale: 0.9, rotate: '-3deg' } } },
        { id: 'kf-20', offset: 20, properties: { transform: { scale: 0.9, rotate: '-3deg' } } },
        { id: 'kf-30', offset: 30, properties: { transform: { scale: 1.1, rotate: '3deg' } } },
        { id: 'kf-50', offset: 50, properties: { transform: { scale: 1.1, rotate: '-3deg' } } },
        { id: 'kf-70', offset: 70, properties: { transform: { scale: 1.1, rotate: '3deg' } } },
        { id: 'kf-90', offset: 90, properties: { transform: { scale: 1.1, rotate: '-3deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { scale: 1, rotate: '0deg' } } },
      ],
    },
  },
  {
    id: 'wobble',
    name: 'Wobble',
    description: 'Element wobbles horizontally',
    category: 'attention',
    animation: {
      name: 'wobble',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { translateX: '0px', rotate: '0deg' } } },
        { id: 'kf-15', offset: 15, properties: { transform: { translateX: '-25px', rotate: '-5deg' } } },
        { id: 'kf-30', offset: 30, properties: { transform: { translateX: '20px', rotate: '3deg' } } },
        { id: 'kf-45', offset: 45, properties: { transform: { translateX: '-15px', rotate: '-3deg' } } },
        { id: 'kf-60', offset: 60, properties: { transform: { translateX: '10px', rotate: '2deg' } } },
        { id: 'kf-75', offset: 75, properties: { transform: { translateX: '-5px', rotate: '-1deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { translateX: '0px', rotate: '0deg' } } },
      ],
    },
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    description: 'Element pulses like a heartbeat',
    category: 'attention',
    animation: {
      name: 'heartbeat',
      duration: 1300,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { scale: 1 } } },
        { id: 'kf-14', offset: 14, properties: { transform: { scale: 1.3 } } },
        { id: 'kf-28', offset: 28, properties: { transform: { scale: 1 } } },
        { id: 'kf-42', offset: 42, properties: { transform: { scale: 1.3 } } },
        { id: 'kf-70', offset: 70, properties: { transform: { scale: 1 } } },
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
  {
    id: 'flipY',
    name: 'Flip Vertical',
    description: 'Element flips vertically',
    category: 'transform',
    animation: {
      name: 'flipY',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { rotateX: '0deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { rotateX: '360deg' } } },
      ],
    },
  },
  {
    id: 'rubberBand',
    name: 'Rubber Band',
    description: 'Element stretches and contracts like a rubber band',
    category: 'transform',
    animation: {
      name: 'rubberBand',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { scaleX: 1, scaleY: 1 } } },
        { id: 'kf-30', offset: 30, properties: { transform: { scaleX: 1.25, scaleY: 0.75 } } },
        { id: 'kf-40', offset: 40, properties: { transform: { scaleX: 0.75, scaleY: 1.25 } } },
        { id: 'kf-50', offset: 50, properties: { transform: { scaleX: 1.15, scaleY: 0.85 } } },
        { id: 'kf-65', offset: 65, properties: { transform: { scaleX: 0.95, scaleY: 1.05 } } },
        { id: 'kf-75', offset: 75, properties: { transform: { scaleX: 1.05, scaleY: 0.95 } } },
        { id: 'kf-100', offset: 100, properties: { transform: { scaleX: 1, scaleY: 1 } } },
      ],
    },
  },
  {
    id: 'jello',
    name: 'Jello',
    description: 'Element wobbles like jello',
    category: 'transform',
    animation: {
      name: 'jello',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        { id: 'kf-0', offset: 0, properties: { transform: { skewX: '0deg', skewY: '0deg' } } },
        { id: 'kf-11', offset: 11, properties: { transform: { skewX: '-12.5deg', skewY: '-12.5deg' } } },
        { id: 'kf-22', offset: 22, properties: { transform: { skewX: '6.25deg', skewY: '6.25deg' } } },
        { id: 'kf-33', offset: 33, properties: { transform: { skewX: '-3.125deg', skewY: '-3.125deg' } } },
        { id: 'kf-44', offset: 44, properties: { transform: { skewX: '1.5625deg', skewY: '1.5625deg' } } },
        { id: 'kf-55', offset: 55, properties: { transform: { skewX: '-0.78125deg', skewY: '-0.78125deg' } } },
        { id: 'kf-100', offset: 100, properties: { transform: { skewX: '0deg', skewY: '0deg' } } },
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
