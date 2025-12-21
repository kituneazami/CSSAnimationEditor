function App() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">
            CSS Animation Editor
          </h1>
          <div className="flex gap-2">
            <button className="btn btn-secondary">
              New Project
            </button>
            <button className="btn btn-secondary">
              Open
            </button>
            <button className="btn btn-primary">
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Layer Panel */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="panel">
            <div className="panel-header">Layers</div>
            <div className="panel-body">
              <p className="text-gray-500 text-sm">No layers yet</p>
            </div>
          </div>
        </aside>

        {/* Center - Preview Area */}
        <div className="flex-1 flex flex-col">
          {/* Preview Canvas */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
            <div className="panel w-full h-full">
              <div className="panel-header flex items-center justify-between">
                <span>Preview</span>
                <div className="flex gap-2">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Play
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Reset
                  </button>
                </div>
              </div>
              <div className="panel-body h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-primary-500 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Timeline Editor */}
          <div className="h-64 bg-white border-t border-gray-200 p-4">
            <div className="panel h-full">
              <div className="panel-header">Timeline</div>
              <div className="panel-body">
                <p className="text-gray-500 text-sm">Timeline editor coming soon...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <aside className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="panel">
            <div className="panel-header">Properties</div>
            <div className="panel-body">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Animation Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="myAnimation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (ms)
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timing Function
                  </label>
                  <select className="input w-full">
                    <option>ease</option>
                    <option>linear</option>
                    <option>ease-in</option>
                    <option>ease-out</option>
                    <option>ease-in-out</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Code Viewer */}
      <footer className="h-48 bg-gray-900 text-gray-100 p-4">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Generated CSS</h3>
            <button className="text-sm bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded">
              Copy
            </button>
          </div>
          <div className="flex-1 bg-gray-800 rounded p-4 overflow-auto font-mono text-sm">
            <pre>
              <code>{`@keyframes myAnimation {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}`}</code>
            </pre>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
