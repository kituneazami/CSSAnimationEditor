import { useAnimationStore, useUIStore } from '@/store';
import { TimelineRuler } from './TimelineRuler';
import { Keyframe } from './Keyframe';

export function Timeline() {
  const selectedAnimation = useAnimationStore((state) =>
    state.getSelectedAnimation()
  );
  const addKeyframe = useAnimationStore((state) => state.addKeyframe);
  const timelineZoom = useUIStore((state) => state.timelineZoom);
  const selectedKeyframeId = useUIStore((state) => state.selectedKeyframeId);
  const selectKeyframe = useUIStore((state) => state.selectKeyframe);

  if (!selectedAnimation) {
    return (
      <div className="h-64 bg-white border-t border-gray-200 p-4">
        <div className="panel h-full">
          <div className="panel-header">Timeline</div>
          <div className="panel-body flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              Select or create an animation to edit timeline
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddKeyframe = (offset: number) => {
    addKeyframe(selectedAnimation.id, {
      offset,
      properties: {},
    });
  };

  return (
    <div className="h-64 bg-white border-t border-gray-200 p-4">
      <div className="panel h-full flex flex-col">
        <div className="panel-header flex items-center justify-between">
          <span>Timeline - {selectedAnimation.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Duration: {selectedAnimation.duration}ms
            </span>
            <button
              onClick={() => handleAddKeyframe(50)}
              className="btn btn-primary text-sm px-3 py-1"
            >
              Add Keyframe
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Timeline ruler */}
          <TimelineRuler
            duration={selectedAnimation.duration}
            zoom={timelineZoom}
          />

          {/* Keyframes track */}
          <div className="relative h-16 bg-gray-50 border-b border-gray-200">
            {/* Track line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300" />

            {/* Keyframes */}
            {selectedAnimation.keyframes.map((keyframe) => (
              <Keyframe
                key={keyframe.id}
                keyframe={keyframe}
                duration={selectedAnimation.duration}
                onSelect={() => selectKeyframe(keyframe.id)}
                isSelected={selectedKeyframeId === keyframe.id}
              />
            ))}
          </div>

          {/* Properties preview */}
          <div className="p-4">
            {selectedKeyframeId && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-2">Selected Keyframe</div>
                {(() => {
                  const kf = selectedAnimation.keyframes.find(
                    (k) => k.id === selectedKeyframeId
                  );
                  if (!kf) return null;
                  return (
                    <div className="space-y-1">
                      <div>Offset: {kf.offset}%</div>
                      <div>
                        Properties:{' '}
                        {Object.keys(kf.properties).length > 0
                          ? Object.keys(kf.properties).join(', ')
                          : 'None'}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
