import { useAnimationStore, useUIStore } from '@/store';
import { TIMING_FUNCTIONS } from '@/constants/timingFunctions';
import { TransformEditor } from './TransformEditor';
import { FilterEditor } from './FilterEditor';

export function PropertyPanel() {
  const selectedAnimation = useAnimationStore((state) =>
    state.getSelectedAnimation()
  );
  const updateAnimation = useAnimationStore((state) => state.updateAnimation);
  const selectedKeyframeId = useUIStore((state) => state.selectedKeyframeId);
  const updateKeyframe = useAnimationStore((state) => state.updateKeyframe);

  if (!selectedAnimation) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="panel">
          <div className="panel-header">Properties</div>
          <div className="panel-body">
            <p className="text-gray-500 text-sm">
              Select an animation to edit properties
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const selectedKeyframe = selectedKeyframeId
    ? selectedAnimation.keyframes.find((kf) => kf.id === selectedKeyframeId)
    : null;

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-auto">
      <div className="space-y-4">
        {/* Animation Properties */}
        <div className="panel">
          <div className="panel-header">Animation Settings</div>
          <div className="panel-body space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Animation Name
              </label>
              <input
                type="text"
                className="input w-full"
                value={selectedAnimation.name}
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, { name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duration (ms)
              </label>
              <input
                type="number"
                className="input w-full"
                value={selectedAnimation.duration}
                min="0"
                step="100"
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, {
                    duration: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Timing Function
              </label>
              <select
                className="input w-full"
                value={selectedAnimation.timingFunction}
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, {
                    timingFunction: e.target.value as any,
                  })
                }
              >
                {TIMING_FUNCTIONS.map((tf) => (
                  <option key={tf.value} value={tf.value}>
                    {tf.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Delay (ms)
              </label>
              <input
                type="number"
                className="input w-full"
                value={selectedAnimation.delay}
                min="0"
                step="100"
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, {
                    delay: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Iteration Count
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="input flex-1"
                  value={
                    selectedAnimation.iterationCount === 'infinite'
                      ? 1
                      : selectedAnimation.iterationCount
                  }
                  min="1"
                  disabled={selectedAnimation.iterationCount === 'infinite'}
                  onChange={(e) =>
                    updateAnimation(selectedAnimation.id, {
                      iterationCount: Number(e.target.value),
                    })
                  }
                />
                <button
                  className={`btn ${
                    selectedAnimation.iterationCount === 'infinite'
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                  onClick={() =>
                    updateAnimation(selectedAnimation.id, {
                      iterationCount:
                        selectedAnimation.iterationCount === 'infinite' ? 1 : 'infinite',
                    })
                  }
                >
                  ∞
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Direction</label>
              <select
                className="input w-full"
                value={selectedAnimation.direction}
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, {
                    direction: e.target.value as any,
                  })
                }
              >
                <option value="normal">Normal</option>
                <option value="reverse">Reverse</option>
                <option value="alternate">Alternate</option>
                <option value="alternate-reverse">Alternate Reverse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Fill Mode</label>
              <select
                className="input w-full"
                value={selectedAnimation.fillMode}
                onChange={(e) =>
                  updateAnimation(selectedAnimation.id, {
                    fillMode: e.target.value as any,
                  })
                }
              >
                <option value="none">None</option>
                <option value="forwards">Forwards</option>
                <option value="backwards">Backwards</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Keyframe Properties */}
        {selectedKeyframe && (
          <div className="panel">
            <div className="panel-header">Keyframe Properties</div>
            <div className="panel-body space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Offset (%)
                </label>
                <input
                  type="number"
                  className="input w-full"
                  value={selectedKeyframe.offset}
                  min="0"
                  max="100"
                  onChange={(e) =>
                    updateKeyframe(
                      selectedAnimation.id,
                      selectedKeyframe.id,
                      { offset: Number(e.target.value) }
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Opacity</label>
                <input
                  type="number"
                  className="input w-full"
                  value={selectedKeyframe.properties.opacity ?? 1}
                  min="0"
                  max="1"
                  step="0.1"
                  onChange={(e) =>
                    updateKeyframe(
                      selectedAnimation.id,
                      selectedKeyframe.id,
                      {
                        properties: {
                          ...selectedKeyframe.properties,
                          opacity: Number(e.target.value),
                        },
                      }
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  className="input w-full h-10"
                  value={selectedKeyframe.properties.backgroundColor || '#3b82f6'}
                  onChange={(e) =>
                    updateKeyframe(
                      selectedAnimation.id,
                      selectedKeyframe.id,
                      {
                        properties: {
                          ...selectedKeyframe.properties,
                          backgroundColor: e.target.value,
                        },
                      }
                    )
                  }
                />
              </div>

              <div className="pt-4 border-t">
                <TransformEditor
                  value={(selectedKeyframe.properties.transform as any) || {}}
                  onChange={(transform) =>
                    updateKeyframe(
                      selectedAnimation.id,
                      selectedKeyframe.id,
                      {
                        properties: {
                          ...selectedKeyframe.properties,
                          transform,
                        },
                      }
                    )
                  }
                />
              </div>

              <div className="pt-4 border-t">
                <FilterEditor
                  value={(selectedKeyframe.properties.filter as string) || ''}
                  onChange={(filter) =>
                    updateKeyframe(
                      selectedAnimation.id,
                      selectedKeyframe.id,
                      {
                        properties: {
                          ...selectedKeyframe.properties,
                          filter,
                        },
                      }
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
