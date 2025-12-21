import { useLayerStore } from '@/store';
import { LayerItem } from './LayerItem';

export function LayerPanel() {
  const layers = useLayerStore((state) => state.layers);
  const addLayer = useLayerStore((state) => state.addLayer);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="panel h-full flex flex-col">
        <div className="panel-header flex items-center justify-between">
          <span>Layers</span>
          <button
            onClick={() => addLayer()}
            className="btn btn-primary text-sm px-2 py-1"
            title="Add Layer"
          >
            +
          </button>
        </div>
        <div className="panel-body flex-1 overflow-auto">
          {layers.length === 0 ? (
            <p className="text-gray-500 text-sm">No layers yet</p>
          ) : (
            <div className="space-y-2">
              {layers
                .slice()
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((layer) => (
                  <LayerItem key={layer.id} layer={layer} />
                ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
