import type { Animation, TimingFunction } from '@/types';

/**
 * Convert milliseconds to seconds
 */
export function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Convert seconds to milliseconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Calculate total animation duration including delay
 */
export function getTotalDuration(animation: Animation): number {
  return animation.duration + animation.delay;
}

/**
 * Calculate animation progress (0-1) at a given time
 */
export function calculateAnimationProgress(
  animation: Animation,
  currentTime: number
): number {
  if (currentTime < animation.delay) return 0;

  const elapsed = currentTime - animation.delay;
  const duration = animation.duration;

  if (elapsed >= duration) {
    if (animation.iterationCount === 'infinite') {
      return (elapsed % duration) / duration;
    }

    const totalDuration = duration * (animation.iterationCount as number);
    if (elapsed >= totalDuration) return 1;

    return (elapsed % duration) / duration;
  }

  return elapsed / duration;
}

/**
 * Apply timing function to progress
 */
export function applyTimingFunction(
  progress: number,
  timingFunction: TimingFunction
): number {
  if (timingFunction === 'linear') return progress;
  if (timingFunction === 'ease') return ease(progress);
  if (timingFunction === 'ease-in') return easeIn(progress);
  if (timingFunction === 'ease-out') return easeOut(progress);
  if (timingFunction === 'ease-in-out') return easeInOut(progress);

  // For cubic-bezier, we'd need a more complex implementation
  // For now, fallback to ease
  return ease(progress);
}

// Timing function implementations
function ease(t: number): number {
  return cubicBezier(t, 0.25, 0.1, 0.25, 1);
}

function easeIn(t: number): number {
  return cubicBezier(t, 0.42, 0, 1, 1);
}

function easeOut(t: number): number {
  return cubicBezier(t, 0, 0, 0.58, 1);
}

function easeInOut(t: number): number {
  return cubicBezier(t, 0.42, 0, 0.58, 1);
}

/**
 * Simplified cubic bezier calculation
 * This is an approximation - a full implementation would use iterative solving
 * We only calculate the Y curve here for timing
 */
function cubicBezier(
  t: number,
  _p1x: number,
  p1y: number,
  _p2x: number,
  p2y: number
): number {
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleCurveY = (t: number) => {
    return ((ay * t + by) * t + cy) * t;
  };

  return sampleCurveY(t);
}

/**
 * Determine if animation should be running at given time
 */
export function isAnimationActive(
  animation: Animation,
  currentTime: number
): boolean {
  if (currentTime < animation.delay) return false;

  if (animation.iterationCount === 'infinite') return true;

  const totalDuration = getTotalDuration(animation);
  const maxTime = totalDuration + (animation.duration * (animation.iterationCount as number - 1));

  return currentTime <= maxTime;
}

/**
 * Get current iteration number
 */
export function getCurrentIteration(
  animation: Animation,
  currentTime: number
): number {
  if (currentTime < animation.delay) return 0;

  const elapsed = currentTime - animation.delay;
  return Math.floor(elapsed / animation.duration) + 1;
}

/**
 * Check if animation should reverse (for alternate directions)
 */
export function shouldReverse(
  animation: Animation,
  currentTime: number
): boolean {
  if (
    animation.direction !== 'alternate' &&
    animation.direction !== 'alternate-reverse'
  ) {
    return animation.direction === 'reverse';
  }

  const iteration = getCurrentIteration(animation, currentTime);
  const isEvenIteration = iteration % 2 === 0;

  if (animation.direction === 'alternate') {
    return isEvenIteration;
  } else {
    // alternate-reverse
    return !isEvenIteration;
  }
}

/**
 * Validate animation configuration
 */
export function validateAnimation(animation: Animation): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!animation.name || animation.name.trim() === '') {
    errors.push('Animation name is required');
  }

  if (animation.duration <= 0) {
    errors.push('Duration must be greater than 0');
  }

  if (animation.delay < 0) {
    errors.push('Delay cannot be negative');
  }

  if (
    animation.iterationCount !== 'infinite' &&
    animation.iterationCount < 1
  ) {
    errors.push('Iteration count must be at least 1');
  }

  if (animation.keyframes.length < 2) {
    errors.push('Animation must have at least 2 keyframes');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
