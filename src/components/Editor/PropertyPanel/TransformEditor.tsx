import type { Transform } from '@/types';

interface TransformEditorProps {
  value: Transform;
  onChange: (transform: Transform) => void;
}

export function TransformEditor({ value, onChange }: TransformEditorProps) {
  const handleChange = (property: keyof Transform, newValue: string | number) => {
    onChange({
      ...value,
      [property]: newValue,
    });
  };

  return (
    <div className="space-y-4">
      <div className="font-medium text-sm border-b pb-2">Transform Properties</div>

      {/* Translate */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Translate</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.translateX || '0px'}
              onChange={(e) => handleChange('translateX', e.target.value)}
              placeholder="0px"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.translateY || '0px'}
              onChange={(e) => handleChange('translateY', e.target.value)}
              placeholder="0px"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.translateZ || '0px'}
              onChange={(e) => handleChange('translateZ', e.target.value)}
              placeholder="0px"
            />
          </div>
        </div>
      </div>

      {/* Rotate */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Rotate</label>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.rotate || '0deg'}
              onChange={(e) => handleChange('rotate', e.target.value)}
              placeholder="0deg"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.rotateX || '0deg'}
              onChange={(e) => handleChange('rotateX', e.target.value)}
              placeholder="0deg"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.rotateY || '0deg'}
              onChange={(e) => handleChange('rotateY', e.target.value)}
              placeholder="0deg"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Z-Alt</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.rotateZ || '0deg'}
              onChange={(e) => handleChange('rotateZ', e.target.value)}
              placeholder="0deg"
            />
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Scale</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Uniform</label>
            <input
              type="number"
              className="input w-full text-sm"
              value={value.scale ?? 1}
              step="0.1"
              onChange={(e) => handleChange('scale', parseFloat(e.target.value))}
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="number"
              className="input w-full text-sm"
              value={value.scaleX ?? 1}
              step="0.1"
              onChange={(e) => handleChange('scaleX', parseFloat(e.target.value))}
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="number"
              className="input w-full text-sm"
              value={value.scaleY ?? 1}
              step="0.1"
              onChange={(e) => handleChange('scaleY', parseFloat(e.target.value))}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Skew */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Skew</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">X</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.skewX || '0deg'}
              onChange={(e) => handleChange('skewX', e.target.value)}
              placeholder="0deg"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Y</label>
            <input
              type="text"
              className="input w-full text-sm"
              value={value.skewY || '0deg'}
              onChange={(e) => handleChange('skewY', e.target.value)}
              placeholder="0deg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
