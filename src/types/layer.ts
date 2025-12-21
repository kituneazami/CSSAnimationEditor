import type { Animation } from './animation';

export interface Layer {
  id: string;
  name: string;
  element: ElementDefinition;
  animation?: Animation;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

export type ElementType = 'box' | 'text' | 'image';

export interface ElementDefinition {
  type: ElementType;
  tagName: string;
  className?: string;
  styles?: React.CSSProperties;
  content?: string;
  imageUrl?: string;
}
