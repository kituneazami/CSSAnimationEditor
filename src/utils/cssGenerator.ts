import type { Animation, Keyframe, Transform, Layer } from '@/types';

export function generateKeyframesCSS(animation: Animation): string {
  const { name, keyframes } = animation;

  if (keyframes.length === 0) {
    return `/* No keyframes defined for ${name} */`;
  }

  const keyframeBlocks = keyframes
    .sort((a, b) => a.offset - b.offset)
    .map((kf) => generateKeyframeBlock(kf))
    .join('\n\n');

  return `@keyframes ${name} {\n${keyframeBlocks}\n}`;
}

function generateKeyframeBlock(keyframe: Keyframe): string {
  const { offset, properties } = keyframe;
  const cssProperties = Object.entries(properties)
    .map(([key, value]) => {
      if (key === 'transform' && typeof value === 'object') {
        return `    transform: ${generateTransformValue(value as Transform)};`;
      }
      return `    ${camelToKebab(key)}: ${value};`;
    })
    .join('\n');

  return `  ${offset}% {\n${cssProperties}\n  }`;
}

function generateTransformValue(transform: Transform): string {
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

export function generateAnimationCSS(animation: Animation): string {
  const { name, duration, timingFunction, delay, iterationCount, direction, fillMode } =
    animation;

  const parts = [
    name,
    `${duration}ms`,
    timingFunction,
    delay > 0 ? `${delay}ms` : null,
    iterationCount !== 1 ? iterationCount : null,
    direction !== 'normal' ? direction : null,
    fillMode !== 'none' ? fillMode : null,
  ].filter(Boolean);

  return `.animated-element {\n  animation: ${parts.join(' ')};\n}`;
}

export function generateFullCSS(animation: Animation): string {
  const keyframesCSS = generateKeyframesCSS(animation);
  const animationCSS = generateAnimationCSS(animation);

  return `${keyframesCSS}\n\n${animationCSS}`;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function generateHTML(layer: Layer): string {
  const { element, animation } = layer;
  const className = animation ? 'animated-element' : 'element';

  switch (element.type) {
    case 'text':
      return `<div class="${className}">\n  ${element.content || 'Sample Text'}\n</div>`;

    case 'image':
      const imageUrl = element.imageUrl || 'https://via.placeholder.com/150';
      const altText = element.content || 'Animation element';
      return `<img class="${className}" src="${imageUrl}" alt="${altText}">`;

    case 'box':
    default:
      return `<div class="${className}">\n  ${element.content || ''}\n</div>`;
  }
}

export function generateFullHTML(layers: Layer[]): string {
  if (layers.length === 0) {
    return '<!-- No layers defined -->';
  }

  const visibleLayers = layers.filter(layer => layer.visible);

  if (visibleLayers.length === 0) {
    return '<!-- No visible layers -->';
  }

  return visibleLayers
    .sort((a, b) => a.zIndex - b.zIndex)
    .map(layer => generateHTML(layer))
    .join('\n\n');
}
