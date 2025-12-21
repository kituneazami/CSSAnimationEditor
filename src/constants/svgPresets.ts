import type { AnimationPreset } from './presets';

export const SVG_PATH_PRESETS: AnimationPreset[] = [
  {
    id: 'circularPath',
    name: 'Circular Path',
    description: 'Element moves along a circular path',
    category: 'transform',
    animation: {
      name: 'circularPath',
      duration: 3000,
      timingFunction: 'linear',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            offsetPath: 'path("M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0")',
            offsetDistance: '0%',
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            offsetPath: 'path("M 50 50 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0")',
            offsetDistance: '100%',
          },
        },
      ],
    },
  },
  {
    id: 'wavePath',
    name: 'Wave Path',
    description: 'Element moves along a wave path',
    category: 'transform',
    animation: {
      name: 'wavePath',
      duration: 4000,
      timingFunction: 'linear',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            offsetPath: 'path("M 0 50 Q 25 0 50 50 T 100 50")',
            offsetDistance: '0%',
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            offsetPath: 'path("M 0 50 Q 25 0 50 50 T 100 50")',
            offsetDistance: '100%',
          },
        },
      ],
    },
  },
  {
    id: 'infinityPath',
    name: 'Infinity Path',
    description: 'Element moves along an infinity symbol path',
    category: 'transform',
    animation: {
      name: 'infinityPath',
      duration: 5000,
      timingFunction: 'linear',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: {
            offsetPath: 'path("M 0 40 C 0 20 40 20 40 40 C 40 60 80 60 80 40 C 80 20 120 20 120 40")',
            offsetDistance: '0%',
          },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: {
            offsetPath: 'path("M 0 40 C 0 20 40 20 40 40 C 40 60 80 60 80 40 C 80 20 120 20 120 40")',
            offsetDistance: '100%',
          },
        },
      ],
    },
  },
];
