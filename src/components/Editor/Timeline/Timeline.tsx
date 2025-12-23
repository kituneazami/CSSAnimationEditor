import { useState, useRef } from 'react';
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

  const [selectedOffset, setSelectedOffset] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  const handleAddKeyframe = () => {
    const offset = selectedOffset !== null ? selectedOffset : 50;
    addKeyframe(selectedAnimation.id, {
      offset,
      properties: {},
    });
    setSelectedOffset(null); // Reset after adding
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const offset = Math.round((clickX / rect.width) * 100);

    // Clamp offset between 0 and 100
    const clampedOffset = Math.max(0, Math.min(100, offset));
    setSelectedOffset(clampedOffset);
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
            {selectedOffset !== null && (
              <span className="text-sm text-primary-600 font-medium">
                Selected: {selectedOffset}%
              </span>
            )}
            <button
              onClick={handleAddKeyframe}
              className="btn btn-primary text-sm px-3 py-1"
            >
              Add Keyframe{selectedOffset !== null ? ` at ${selectedOffset}%` : ''}
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
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="relative h-16 bg-gray-50 border-b border-gray-200 cursor-crosshair"
            title="Click to select position for new keyframe"
          >
            {/* Track line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300" />

            {/* Selected position marker */}
            {selectedOffset !== null && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary-500 opacity-50 pointer-events-none"
                style={{ left: `${selectedOffset}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full border-2 border-white" />
              </div>
            )}

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
