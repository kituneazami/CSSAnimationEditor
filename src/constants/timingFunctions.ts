import type { TimingFunction } from '@/types';

export const TIMING_FUNCTIONS: { label: string; value: TimingFunction }[] = [
  { label: 'Ease', value: 'ease' },
  { label: 'Linear', value: 'linear' },
  { label: 'Ease In', value: 'ease-in' },
  { label: 'Ease Out', value: 'ease-out' },
  { label: 'Ease In Out', value: 'ease-in-out' },
  { label: 'Step Start', value: 'step-start' },
  { label: 'Step End', value: 'step-end' },
];

export const CUSTOM_TIMING_FUNCTIONS: { label: string; value: TimingFunction }[] = [
  { label: 'Ease In Quad', value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)' },
  { label: 'Ease In Cubic', value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
  { label: 'Ease Out Quad', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
  { label: 'Ease Out Cubic', value: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
  { label: 'Ease In Out Quad', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
  { label: 'Ease In Out Cubic', value: 'cubic-bezier(0.645, 0.045, 0.355, 1)' },
];
