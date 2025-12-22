import { useState } from 'react';
import { useAnimationStore, useLayerStore } from '@/store';
import { generateFullCSS, generateFullHTML } from '@/utils/cssGenerator';

export function CodeViewer() {
  const selectedAnimation = useAnimationStore((state) =>
    state.getSelectedAnimation()
  );
  const layers = useLayerStore((state) => state.layers);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);

  const cssCode = selectedAnimation
    ? generateFullCSS(selectedAnimation)
    : '/* Select an animation to see generated CSS */';

  const htmlCode = generateFullHTML(layers);

  const handleCopyCSS = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopiedHTML(true);
      setTimeout(() => setCopiedHTML(false), 2000);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  return (
    <aside
      className={`bg-gray-900 text-gray-100 border-l border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-80' : 'w-12'
      }`}
    >
      {isExpanded ? (
        // Expanded view
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-semibold">Generated Code</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="hover:bg-gray-800 p-1 rounded transition-colors"
              title="Collapse"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden gap-4">
            {/* CSS Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-300">CSS</h4>
                <button
                  onClick={handleCopyCSS}
                  className="text-xs bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded transition-colors"
                  disabled={!selectedAnimation}
                >
                  {copiedCSS ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
              <div className="flex-1 bg-gray-800 rounded p-4 overflow-auto font-mono text-xs">
                <pre>
                  <code>{cssCode}</code>
                </pre>
              </div>
            </div>

            {/* HTML Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-300">HTML</h4>
                <button
                  onClick={handleCopyHTML}
                  className="text-xs bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded transition-colors"
                >
                  {copiedHTML ? 'Copied!' : 'Copy HTML'}
                </button>
              </div>
              <div className="flex-1 bg-gray-800 rounded p-4 overflow-auto font-mono text-xs">
                <pre>
                  <code>{htmlCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Collapsed view - vertical tab
        <button
          onClick={() => setIsExpanded(true)}
          className="flex-1 flex items-center justify-center hover:bg-gray-800 transition-colors"
          title="Expand Code Panel"
        >
          <div className="transform -rotate-90 whitespace-nowrap text-sm font-semibold tracking-wider">
            CODE
          </div>
        </button>
      )}
    </aside>
  );
}
