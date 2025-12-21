import { useEffect, useRef } from 'react';
import { useLayerStore, useUIStore } from '@/store';
import { generateKeyframesCSS } from '@/utils/cssGenerator';
import clsx from 'clsx';

export function PreviewCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const layers = useLayerStore((state) => state.layers);
  const selectedLayerId = useLayerStore((state) => state.selectedLayerId);
  const showGrid = useUIStore((state) => state.showGrid);
  const isPlaying = useUIStore((state) => state.isPlaying);

  // Generate and inject CSS keyframes for all animations
  useEffect(() => {
    // Create or get style element
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.id = 'animation-preview-styles';
      document.head.appendChild(styleRef.current);
    }

    // Generate CSS for all animations
    const cssRules = layers
      .filter((layer) => layer.animation)
      .map((layer) => generateKeyframesCSS(layer.animation!))
      .join('\n\n');

    styleRef.current.textContent = cssRules;

    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [layers]);

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
          const animation = layer.animation;

          // Build animation CSS property
          let animationStyle = '';
          if (animation && isPlaying) {
            const parts = [
              animation.name,
              `${animation.duration}ms`,
              animation.timingFunction,
              `${animation.delay}ms`,
              animation.iterationCount,
              animation.direction,
              animation.fillMode,
              'running', // play state
            ];
            animationStyle = parts.join(' ');
          }

          // Render different element types
          const renderContent = () => {
            switch (element.type) {
              case 'text':
                return (
                  <div
                    style={{
                      ...element.styles,
                      fontSize: element.styles?.fontSize || '24px',
                      color: element.styles?.color || '#000000',
                      fontFamily: element.styles?.fontFamily || 'sans-serif',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {element.content || 'Sample Text'}
                  </div>
                );
              case 'image':
                return (
                  <img
                    src={element.imageUrl || 'https://via.placeholder.com/150'}
                    alt={element.content || 'Animation element'}
                    style={{
                      ...element.styles,
                      maxWidth: element.styles?.width || '150px',
                      maxHeight: element.styles?.height || '150px',
                      objectFit: 'contain',
                    }}
                  />
                );
              case 'box':
              default:
                return element.content;
            }
          };

          return (
            <div
              key={layer.id}
              className={clsx(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                isSelected && 'ring-2 ring-primary-500'
              )}
              style={{
                ...(element.type === 'box' ? element.styles : {}),
                zIndex: layer.zIndex,
                animation: animationStyle || undefined,
              }}
            >
              {renderContent()}
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
