import { useLayerStore } from '@/store';
import type { Layer } from '@/types';
import clsx from 'clsx';

interface LayerItemProps {
  layer: Layer;
}

export function LayerItem({ layer }: LayerItemProps) {
  const selectedLayerId = useLayerStore((state) => state.selectedLayerId);
  const selectLayer = useLayerStore((state) => state.selectLayer);
  const toggleLayerVisibility = useLayerStore(
    (state) => state.toggleLayerVisibility
  );
  const toggleLayerLock = useLayerStore((state) => state.toggleLayerLock);
  const deleteLayer = useLayerStore((state) => state.deleteLayer);
  const moveLayer = useLayerStore((state) => state.moveLayer);

  const isSelected = selectedLayerId === layer.id;

  return (
    <div
      className={clsx(
        'p-2 rounded border transition-colors cursor-pointer',
        isSelected
          ? 'bg-primary-50 border-primary-300'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      )}
      onClick={() => selectLayer(layer.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm truncate">{layer.name}</span>
        <div className="flex items-center gap-1">
          {/* Move up */}
          <button
            className="p-1 hover:bg-gray-200 rounded text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              moveLayer(layer.id, 'up');
            }}
            title="Move Up"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Move down */}
          <button
            className="p-1 hover:bg-gray-200 rounded text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              moveLayer(layer.id, 'down');
            }}
            title="Move Down"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        {/* Visibility toggle */}
        <button
          className={clsx(
            'p-1 rounded',
            layer.visible ? 'text-gray-700' : 'text-gray-400'
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleLayerVisibility(layer.id);
          }}
          title={layer.visible ? 'Hide' : 'Show'}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {layer.visible ? (
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            ) : (
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        {/* Lock toggle */}
        <button
          className={clsx(
            'p-1 rounded',
            layer.locked ? 'text-gray-700' : 'text-gray-400'
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleLayerLock(layer.id);
          }}
          title={layer.locked ? 'Unlock' : 'Lock'}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {layer.locked ? (
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            ) : (
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            )}
          </svg>
        </button>

        <div className="flex-1" />

        {/* Delete */}
        <button
          className="p-1 hover:bg-red-100 rounded text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Delete layer "${layer.name}"?`)) {
              deleteLayer(layer.id);
            }
          }}
          title="Delete"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
