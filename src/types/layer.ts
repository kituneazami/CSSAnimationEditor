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

export interface ElementDefinition {
  tagName: string;
  className?: string;
  styles?: React.CSSProperties;
  content?: string;
}
