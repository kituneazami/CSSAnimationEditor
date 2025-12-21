import type { Keyframe } from '@/types';

/**
 * Sort keyframes by offset
 */
export function sortKeyframes(keyframes: Keyframe[]): Keyframe[] {
  return [...keyframes].sort((a, b) => a.offset - b.offset);
}

/**
 * Check if a keyframe offset is duplicated
 */
export function hasDuplicateOffset(
  keyframes: Keyframe[],
  offset: number,
  excludeId?: string
): boolean {
  return keyframes.some(
    (kf) => kf.offset === offset && kf.id !== excludeId
  );
}

/**
 * Find keyframe by offset
 */
export function findKeyframeByOffset(
  keyframes: Keyframe[],
  offset: number
): Keyframe | undefined {
  return keyframes.find((kf) => kf.offset === offset);
}

/**
 * Get keyframes at specific percentage
 */
export function getKeyframesAtTime(
  keyframes: Keyframe[],
  percentage: number
): { before: Keyframe | null; after: Keyframe | null } {
  const sorted = sortKeyframes(keyframes);

  let before: Keyframe | null = null;
  let after: Keyframe | null = null;

  for (const kf of sorted) {
    if (kf.offset <= percentage) {
      before = kf;
    } else if (kf.offset > percentage && !after) {
      after = kf;
      break;
    }
  }

  return { before, after };
}

/**
 * Interpolate between two values
 */
export function interpolate(
  from: number,
  to: number,
  progress: number
): number {
  return from + (to - from) * progress;
}

/**
 * Calculate progress between two keyframes
 */
export function calculateProgress(
  fromOffset: number,
  toOffset: number,
  currentOffset: number
): number {
  if (toOffset === fromOffset) return 1;
  return (currentOffset - fromOffset) / (toOffset - fromOffset);
}

/**
 * Merge keyframe properties
 */
export function mergeKeyframeProperties(
  base: Keyframe,
  override: Partial<Keyframe>
): Keyframe {
  return {
    ...base,
    ...override,
    properties: {
      ...base.properties,
      ...(override.properties || {}),
    },
  };
}

/**
 * Validate keyframe offset range
 */
export function isValidOffset(offset: number): boolean {
  return offset >= 0 && offset <= 100;
}

/**
 * Clamp offset to valid range
 */
export function clampOffset(offset: number): number {
  return Math.max(0, Math.min(100, offset));
}

/**
 * Generate default keyframes (0% and 100%)
 */
export function generateDefaultKeyframes(): Omit<Keyframe, 'id'>[] {
  return [
    {
      offset: 0,
      properties: {},
    },
    {
      offset: 100,
      properties: {},
    },
  ];
}
