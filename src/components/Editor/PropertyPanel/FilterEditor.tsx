import { useState } from 'react';

interface FilterEditorProps {
  value: string;
  onChange: (filter: string) => void;
}

interface FilterValue {
  blur: string;
  brightness: string;
  contrast: string;
  grayscale: string;
  hueRotate: string;
  invert: string;
  opacity: string;
  saturate: string;
  sepia: string;
}

export function FilterEditor({ value, onChange }: FilterEditorProps) {
  // Parse existing filter string
  const parseFilter = (filterStr: string): FilterValue => {
    const defaults: FilterValue = {
      blur: '0px',
      brightness: '100%',
      contrast: '100%',
      grayscale: '0%',
      hueRotate: '0deg',
      invert: '0%',
      opacity: '100%',
      saturate: '100%',
      sepia: '0%',
    };

    if (!filterStr) return defaults;

    const filters = { ...defaults };
    const regex = /(\w+)\(([^)]+)\)/g;
    let match;

    while ((match = regex.exec(filterStr)) !== null) {
      const [, name, val] = match;
      const key = name as keyof FilterValue;
      if (key in filters) {
        filters[key] = val;
      }
    }

    return filters;
  };

  const [filters, setFilters] = useState<FilterValue>(parseFilter(value));

  const handleChange = (property: keyof FilterValue, newValue: string) => {
    const updated = { ...filters, [property]: newValue };
    setFilters(updated);

    // Build filter string
    const filterParts: string[] = [];
    if (updated.blur !== '0px') filterParts.push(`blur(${updated.blur})`);
    if (updated.brightness !== '100%') filterParts.push(`brightness(${updated.brightness})`);
    if (updated.contrast !== '100%') filterParts.push(`contrast(${updated.contrast})`);
    if (updated.grayscale !== '0%') filterParts.push(`grayscale(${updated.grayscale})`);
    if (updated.hueRotate !== '0deg') filterParts.push(`hue-rotate(${updated.hueRotate})`);
    if (updated.invert !== '0%') filterParts.push(`invert(${updated.invert})`);
    if (updated.opacity !== '100%') filterParts.push(`opacity(${updated.opacity})`);
    if (updated.saturate !== '100%') filterParts.push(`saturate(${updated.saturate})`);
    if (updated.sepia !== '0%') filterParts.push(`sepia(${updated.sepia})`);

    onChange(filterParts.join(' '));
  };

  return (
    <div className="space-y-4">
      <div className="font-medium text-sm border-b pb-2">Filter Properties</div>

      <div>
        <label className="block text-sm font-medium mb-2">Blur</label>
        <input
          type="text"
          className="input w-full"
          value={filters.blur}
          onChange={(e) => handleChange('blur', e.target.value)}
          placeholder="0px"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Brightness</label>
        <input
          type="text"
          className="input w-full"
          value={filters.brightness}
          onChange={(e) => handleChange('brightness', e.target.value)}
          placeholder="100%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contrast</label>
        <input
          type="text"
          className="input w-full"
          value={filters.contrast}
          onChange={(e) => handleChange('contrast', e.target.value)}
          placeholder="100%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Grayscale</label>
        <input
          type="text"
          className="input w-full"
          value={filters.grayscale}
          onChange={(e) => handleChange('grayscale', e.target.value)}
          placeholder="0%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Hue Rotate</label>
        <input
          type="text"
          className="input w-full"
          value={filters.hueRotate}
          onChange={(e) => handleChange('hueRotate', e.target.value)}
          placeholder="0deg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Invert</label>
        <input
          type="text"
          className="input w-full"
          value={filters.invert}
          onChange={(e) => handleChange('invert', e.target.value)}
          placeholder="0%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Filter Opacity</label>
        <input
          type="text"
          className="input w-full"
          value={filters.opacity}
          onChange={(e) => handleChange('opacity', e.target.value)}
          placeholder="100%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Saturate</label>
        <input
          type="text"
          className="input w-full"
          value={filters.saturate}
          onChange={(e) => handleChange('saturate', e.target.value)}
          placeholder="100%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Sepia</label>
        <input
          type="text"
          className="input w-full"
          value={filters.sepia}
          onChange={(e) => handleChange('sepia', e.target.value)}
          placeholder="0%"
        />
      </div>
    </div>
  );
}
