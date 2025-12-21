import { PreviewCanvas } from './PreviewCanvas';
import { PlaybackControls } from './PlaybackControls';
import { useUIStore } from '@/store';

export function Preview() {
  const showGrid = useUIStore((state) => state.showGrid);
  const toggleGrid = useUIStore((state) => state.toggleGrid);

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-100">
      <div className="panel flex flex-col h-full">
        <div className="panel-header flex items-center justify-between">
          <span>Preview</span>
          <div className="flex items-center gap-4">
            <PlaybackControls />
            <button
              onClick={toggleGrid}
              className={`btn btn-secondary text-sm px-3 py-1`}
              title="Toggle Grid"
            >
              Grid: {showGrid ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
        <div className="panel-body flex-1 p-0">
          <PreviewCanvas />
        </div>
      </div>
    </div>
  );
}

export { PreviewCanvas, PlaybackControls };
