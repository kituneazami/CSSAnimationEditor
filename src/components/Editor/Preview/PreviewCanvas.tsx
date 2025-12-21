import { useEffect, useRef } from 'react';
import { useLayerStore, useUIStore } from '@/store';
import clsx from 'clsx';

export function PreviewCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layers = useLayerStore((state) => state.layers);
  const selectedLayerId = useLayerStore((state) => state.selectedLayerId);
  const showGrid = useUIStore((state) => state.showGrid);
  const isPlaying = useUIStore((state) => state.isPlaying);
  const currentTime = useUIStore((state) => state.currentTime);

  useEffect(() => {
    if (!isPlaying) return;

    // Animation loop will be implemented here
    // For now, just a placeholder
  }, [isPlaying, currentTime]);

  return (
    <div
      ref={canvasRef}
      className={clsx(
        'relative w-full h-full bg-gray-50 overflow-hidden',
        showGrid && 'bg-grid-pattern'
      )}
    >
      {/* Grid overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      )}

      {/* Render layers */}
      {layers
        .filter((layer) => layer.visible)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((layer) => {
          const isSelected = layer.id === selectedLayerId;
          const element = layer.element;

          return (
            <div
              key={layer.id}
              className={clsx(
                'absolute',
                isSelected && 'ring-2 ring-primary-500'
              )}
              style={{
                ...element.styles,
                zIndex: layer.zIndex,
                // Animation will be applied here
                animation: layer.animation
                  ? `${layer.animation.name} ${layer.animation.duration}ms ${layer.animation.timingFunction}`
                  : undefined,
              }}
            >
              {element.content}
            </div>
          );
        })}

      {/* Center guide */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-blue-500 opacity-30 top-1/2 -mt-px" />
        <div className="absolute h-full w-0.5 bg-blue-500 opacity-30 left-1/2 -ml-px" />
      </div>
    </div>
  );
}
