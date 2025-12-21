import { useProjectStore, useAnimationStore, useLayerStore } from '@/store';

export function Header() {
  const project = useProjectStore((state) => state.project);
  const createNewProject = useProjectStore((state) => state.createNewProject);
  const exportProject = useProjectStore((state) => state.exportProject);
  const importProject = useProjectStore((state) => state.importProject);
  const saveToLocalStorage = useProjectStore((state) => state.saveToLocalStorage);
  const loadFromLocalStorage = useProjectStore(
    (state) => state.loadFromLocalStorage
  );
  const addAnimation = useAnimationStore((state) => state.addAnimation);
  const addLayer = useLayerStore((state) => state.addLayer);

  const handleNew = () => {
    if (confirm('Create new project? Unsaved changes will be lost.')) {
      createNewProject();
    }
  };

  const handleExport = () => {
    try {
      const exportData = exportProject();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project?.name || 'project'}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export project');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          importProject(data);
        } catch (err) {
          alert('Failed to import project');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleQuickStart = () => {
    // Quick start: create a layer and animation
    addLayer();
    addAnimation({
      name: 'fadeIn',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'both',
      keyframes: [
        {
          id: 'kf-0',
          offset: 0,
          properties: { opacity: 0 },
        },
        {
          id: 'kf-100',
          offset: 100,
          properties: { opacity: 1 },
        },
      ],
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-600">
          CSS Animation Editor
        </h1>
        <div className="flex gap-2">
          <button onClick={handleNew} className="btn btn-secondary">
            New Project
          </button>
          <button onClick={handleImport} className="btn btn-secondary">
            Import
          </button>
          <button
            onClick={saveToLocalStorage}
            className="btn btn-secondary"
            disabled={!project}
          >
            Save
          </button>
          <button
            onClick={loadFromLocalStorage}
            className="btn btn-secondary"
          >
            Load
          </button>
          <button
            onClick={handleExport}
            className="btn btn-primary"
            disabled={!project}
          >
            Export
          </button>
          {!project && (
            <button onClick={handleQuickStart} className="btn btn-primary">
              Quick Start
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
