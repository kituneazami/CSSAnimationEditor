import type { AnimationPreset } from '@/constants/presets';
import { useAnimationStore } from '@/store';

interface PresetCardProps {
  preset: AnimationPreset;
  onApply?: () => void;
}

export function PresetCard({ preset, onApply }: PresetCardProps) {
  const addAnimation = useAnimationStore((state) => state.addAnimation);

  const handleApply = () => {
    // Generate unique IDs for the animation and keyframes
    addAnimation({
      ...preset.animation,
      keyframes: preset.animation.keyframes.map((kf, idx) => ({
        ...kf,
        id: `kf-${Date.now()}-${idx}`,
      })),
    });

    onApply?.();
  };

  const getCategoryColor = () => {
    switch (preset.category) {
      case 'entrance':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'exit':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'transform':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryLabel = () => {
    switch (preset.category) {
      case 'entrance':
        return 'Entrance';
      case 'exit':
        return 'Exit';
      case 'attention':
        return 'Attention';
      case 'transform':
        return 'Transform';
      default:
        return preset.category;
    }
  };

  return (
    <div className="panel overflow-hidden hover:shadow-md transition-shadow">
      <div className="panel-body p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-base">{preset.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded border ${getCategoryColor()}`}
          >
            {getCategoryLabel()}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{preset.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{preset.animation.duration}ms</span>
          <span>{preset.animation.timingFunction}</span>
          <span>
            {preset.animation.keyframes.length} keyframe
            {preset.animation.keyframes.length !== 1 ? 's' : ''}
          </span>
        </div>

        <button
          onClick={handleApply}
          className="btn btn-primary w-full text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
