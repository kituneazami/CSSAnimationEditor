import type { ElementDefinition, ElementType } from '@/types';

interface ElementEditorProps {
  element: ElementDefinition;
  onChange: (element: ElementDefinition) => void;
}

export function ElementEditor({ element, onChange }: ElementEditorProps) {
  const handleTypeChange = (type: ElementType) => {
    onChange({
      ...element,
      type,
      content: type === 'text' ? 'Sample Text' : '',
      imageUrl: type === 'image' ? '' : undefined,
    });
  };

  const handleContentChange = (content: string) => {
    onChange({ ...element, content });
  };

  const handleImageUrlChange = (imageUrl: string) => {
    onChange({ ...element, imageUrl });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      onChange({ ...element, imageUrl });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Element Type
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleTypeChange('box')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              element.type === 'box'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Box
          </button>
          <button
            onClick={() => handleTypeChange('text')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              element.type === 'text'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Text
          </button>
          <button
            onClick={() => handleTypeChange('image')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              element.type === 'image'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Image
          </button>
        </div>
      </div>

      {element.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Content
          </label>
          <textarea
            value={element.content || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            className="input w-full min-h-[80px]"
            placeholder="Enter text to animate..."
          />
        </div>
      )}

      {element.type === 'image' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={element.imageUrl || ''}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              className="input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Upload Image
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="btn btn-secondary cursor-pointer"
              >
                Choose File
              </label>
              {element.imageUrl && (
                <span className="text-sm text-gray-500">
                  {element.imageUrl.startsWith('data:') ? 'Uploaded' : 'URL Set'}
                </span>
              )}
            </div>
          </div>

          {element.imageUrl && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="border border-gray-200 rounded p-2 bg-gray-50">
                <img
                  src={element.imageUrl}
                  alt="Preview"
                  className="max-w-full h-auto max-h-32 object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    alert('Failed to load image. Please check the URL.');
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {element.type === 'box' && (
        <div className="text-sm text-gray-500">
          <p>Box element with customizable background and dimensions.</p>
          <p className="mt-1">Use the animation properties below to customize.</p>
        </div>
      )}
    </div>
  );
}
