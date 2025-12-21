export type TimingFunction =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type AnimationPlayState = 'running' | 'paused';

export interface Animation {
  id: string;
  name: string;
  duration: number; // ミリ秒
  timingFunction: TimingFunction;
  delay: number;
  iterationCount: number | 'infinite';
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  playState?: AnimationPlayState;
  keyframes: Keyframe[];
}

export interface Keyframe {
  id: string;
  offset: number; // 0-100 (%)
  properties: CSSProperties;
  easing?: TimingFunction; // キーフレーム間のイージング
}

export interface CSSProperties {
  transform?: Transform;
  opacity?: number;
  backgroundColor?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  filter?: string;
  // 追加のプロパティ
  [key: string]: string | number | Transform | undefined;
}

export interface Transform {
  translateX?: string;
  translateY?: string;
  translateZ?: string;
  rotate?: string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: string;
  skewY?: string;
}
