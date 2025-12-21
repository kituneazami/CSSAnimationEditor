import type { Transform } from '@/types';

/**
 * Parse transform string to Transform object
 */
export function parseTransform(transformString: string): Transform {
  const transform: Transform = {};

  // Match individual transform functions
  const functions = transformString.match(/(\w+)\(([^)]+)\)/g);
  if (!functions) return transform;

  functions.forEach((fn) => {
    const match = fn.match(/(\w+)\(([^)]+)\)/);
    if (!match) return;

    const [, name, value] = match;

    switch (name) {
      case 'translateX':
        transform.translateX = value;
        break;
      case 'translateY':
        transform.translateY = value;
        break;
      case 'translateZ':
        transform.translateZ = value;
        break;
      case 'rotate':
        transform.rotate = value;
        break;
      case 'rotateX':
        transform.rotateX = value;
        break;
      case 'rotateY':
        transform.rotateY = value;
        break;
      case 'rotateZ':
        transform.rotateZ = value;
        break;
      case 'scale':
        transform.scale = parseFloat(value);
        break;
      case 'scaleX':
        transform.scaleX = parseFloat(value);
        break;
      case 'scaleY':
        transform.scaleY = parseFloat(value);
        break;
      case 'skewX':
        transform.skewX = value;
        break;
      case 'skewY':
        transform.skewY = value;
        break;
    }
  });

  return transform;
}

/**
 * Convert Transform object to CSS string
 */
export function stringifyTransform(transform: Transform): string {
  const parts: string[] = [];

  if (transform.translateX) parts.push(`translateX(${transform.translateX})`);
  if (transform.translateY) parts.push(`translateY(${transform.translateY})`);
  if (transform.translateZ) parts.push(`translateZ(${transform.translateZ})`);
  if (transform.rotate) parts.push(`rotate(${transform.rotate})`);
  if (transform.rotateX) parts.push(`rotateX(${transform.rotateX})`);
  if (transform.rotateY) parts.push(`rotateY(${transform.rotateY})`);
  if (transform.rotateZ) parts.push(`rotateZ(${transform.rotateZ})`);
  if (transform.scale !== undefined) parts.push(`scale(${transform.scale})`);
  if (transform.scaleX !== undefined) parts.push(`scaleX(${transform.scaleX})`);
  if (transform.scaleY !== undefined) parts.push(`scaleY(${transform.scaleY})`);
  if (transform.skewX) parts.push(`skewX(${transform.skewX})`);
  if (transform.skewY) parts.push(`skewY(${transform.skewY})`);

  return parts.join(' ');
}

/**
 * Merge two Transform objects
 */
export function mergeTransforms(base: Transform, override: Transform): Transform {
  return {
    ...base,
    ...override,
  };
}

/**
 * Parse numeric value from transform string (e.g., "100px" -> 100)
 */
export function parseTransformValue(value: string): number {
  return parseFloat(value);
}

/**
 * Parse unit from transform string (e.g., "100px" -> "px")
 */
export function parseTransformUnit(value: string): string {
  const match = value.match(/[\d.]+(.+)/);
  return match ? match[1] : '';
}

/**
 * Interpolate between two transform values
 */
export function interpolateTransformValue(
  from: string,
  to: string,
  progress: number
): string {
  const fromValue = parseTransformValue(from);
  const toValue = parseTransformValue(to);
  const unit = parseTransformUnit(from) || parseTransformUnit(to);

  const interpolated = fromValue + (toValue - fromValue) * progress;
  return `${interpolated}${unit}`;
}

/**
 * Interpolate between two Transform objects
 */
export function interpolateTransform(
  from: Transform,
  to: Transform,
  progress: number
): Transform {
  const result: Transform = {};

  // Interpolate each property
  const props: (keyof Transform)[] = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'skewX',
    'skewY',
  ];

  props.forEach((prop) => {
    const fromVal = from[prop];
    const toVal = to[prop];

    if (fromVal === undefined && toVal === undefined) return;

    if (prop === 'scale' || prop === 'scaleX' || prop === 'scaleY') {
      // Numeric interpolation
      const fromNum = (fromVal as number) ?? 1;
      const toNum = (toVal as number) ?? 1;
      (result[prop] as number) = fromNum + (toNum - fromNum) * progress;
    } else {
      // String value interpolation
      const fromStr = (fromVal as string) ?? '0px';
      const toStr = (toVal as string) ?? '0px';
      (result[prop] as string) = interpolateTransformValue(fromStr, toStr, progress);
    }
  });

  return result;
}

/**
 * Create identity transform
 */
export function identityTransform(): Transform {
  return {
    translateX: '0px',
    translateY: '0px',
    translateZ: '0px',
    rotate: '0deg',
    rotateX: '0deg',
    rotateY: '0deg',
    rotateZ: '0deg',
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    skewX: '0deg',
    skewY: '0deg',
  };
}
