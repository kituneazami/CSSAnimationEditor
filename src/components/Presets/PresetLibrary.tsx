import { useState } from 'react';
import { useUIStore } from '@/store';
import { ANIMATION_PRESETS, type AnimationPreset } from '@/constants/presets';
import { PresetCard } from './PresetCard';

export function PresetLibrary() {
  const showPresetLibrary = useUIStore((state) => state.showPresetLibrary);
  const togglePresetLibrary = useUIStore((state) => state.togglePresetLibrary);
  const [selectedCategory, setSelectedCategory] = useState<
    AnimationPreset['category'] | 'all'
  >('all');

  if (!showPresetLibrary) return null;

  const categories: Array<{ value: AnimationPreset['category'] | 'all'; label: string }> =
    [
      { value: 'all', label: 'All' },
      { value: 'entrance', label: 'Entrance' },
      { value: 'exit', label: 'Exit' },
      { value: 'attention', label: 'Attention' },
      { value: 'transform', label: 'Transform' },
    ];

  const filteredPresets =
    selectedCategory === 'all'
      ? ANIMATION_PRESETS
      : ANIMATION_PRESETS.filter((preset) => preset.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Animation Presets</h2>
          <button
            onClick={togglePresetLibrary}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filteredPresets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No presets found in this category
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPresets.map((preset) => (
                <PresetCard
                  key={preset.id}
                  preset={preset}
                  onApply={togglePresetLibrary}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
