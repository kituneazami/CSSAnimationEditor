import { Header } from './Header';
import { LayerPanel } from './Editor/LayerPanel';
import { Preview } from './Editor/Preview';
import { Timeline } from './Editor/Timeline';
import { PropertyPanel } from './Editor/PropertyPanel';
import { CodeViewer } from './Editor/CodeViewer';
import { PresetLibrary } from './Presets';

function App() {
  return (
    <div className="flex flex-col h-full">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        <LayerPanel />

        <div className="flex-1 flex flex-col">
          <Preview />
          <Timeline />
        </div>

        <PropertyPanel />

        <CodeViewer />
      </main>

      <PresetLibrary />
    </div>
  );
}

export default App;
