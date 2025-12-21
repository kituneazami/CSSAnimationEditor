import clsx from 'clsx';
import type { Keyframe as KeyframeType } from '@/types';

interface KeyframeProps {
  keyframe: KeyframeType;
  duration: number;
  onSelect: () => void;
  isSelected: boolean;
}

export function Keyframe({ keyframe, onSelect, isSelected }: KeyframeProps) {
  const left = keyframe.offset; // offset is already in percentage (0-100)

  return (
    <div
      className={clsx(
        'absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full cursor-pointer transition-all',
        isSelected
          ? 'bg-primary-600 ring-2 ring-primary-300 scale-125'
          : 'bg-primary-500 hover:bg-primary-600 hover:scale-110'
      )}
      style={{
        left: `${left}%`,
      }}
      onClick={onSelect}
      title={`${keyframe.offset}%`}
    >
      {/* Keyframe diamond indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={clsx(
          'w-2 h-2 rotate-45',
          isSelected ? 'bg-white' : 'bg-white/80'
        )} />
      </div>
    </div>
  );
}
