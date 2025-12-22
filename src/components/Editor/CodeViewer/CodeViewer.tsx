import { useState } from 'react';
import { useAnimationStore } from '@/store';
import { generateFullCSS } from '@/utils/cssGenerator';

export function CodeViewer() {
  const selectedAnimation = useAnimationStore((state) =>
    state.getSelectedAnimation()
  );
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const cssCode = selectedAnimation
    ? generateFullCSS(selectedAnimation)
    : '/* Select an animation to see generated CSS */';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <aside className="w-80 bg-gray-900 text-gray-100 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 hover:bg-gray-800 transition-colors"
      >
        <h3 className="font-semibold">Generated CSS</h3>
        <svg
          className={`w-5 h-5 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="flex-1 flex flex-col p-4 pt-0 overflow-hidden">
          <button
            onClick={handleCopy}
            className="mb-3 text-sm bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded transition-colors"
            disabled={!selectedAnimation}
          >
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <div className="flex-1 bg-gray-800 rounded p-4 overflow-auto font-mono text-xs">
            <pre>
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      )}
    </aside>
  );
}
