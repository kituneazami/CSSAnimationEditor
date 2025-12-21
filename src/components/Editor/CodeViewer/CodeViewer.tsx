import { useState } from 'react';
import { useAnimationStore } from '@/store';
import { generateFullCSS } from '@/utils/cssGenerator';

export function CodeViewer() {
  const selectedAnimation = useAnimationStore((state) =>
    state.getSelectedAnimation()
  );
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
    <footer className="h-48 bg-gray-900 text-gray-100 p-4">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Generated CSS</h3>
          <button
            onClick={handleCopy}
            className="text-sm bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded transition-colors"
            disabled={!selectedAnimation}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="flex-1 bg-gray-800 rounded p-4 overflow-auto font-mono text-sm">
          <pre>
            <code>{cssCode}</code>
          </pre>
        </div>
      </div>
    </footer>
  );
}
