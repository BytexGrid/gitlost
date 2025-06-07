import React, { useState } from 'react';

interface PreviewPanelProps {
  content: string;
  loading?: boolean;
  selectedItems: string[];
}

function MacWindowBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800">
      <span className="w-3 h-3 rounded-full bg-red-500 border border-red-400 shadow-sm"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 shadow-sm"></span>
      <span className="w-3 h-3 rounded-full bg-green-500 border border-green-400 shadow-sm"></span>
    </div>
  );
}

export default function PreviewPanel({ content, loading, selectedItems }: PreviewPanelProps) {
  const [showDownloadNote, setShowDownloadNote] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.gitignore';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadNote(true);
    setTimeout(() => setShowDownloadNote(false), 6000);
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <MacWindowBar />
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Preview
        </h2>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => navigator.clipboard.writeText(content)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={loading}
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Download
            </button>
          </div>
          {showDownloadNote && (
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 shadow animate-fade-in">
              <strong>Note:</strong> If your browser saves the file as <code>.txt</code>, just rename it to <code>.gitignore</code> before using it in your project.
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 animate-pulse">
            Loading .gitignore...
          </div>
        ) : (
          <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {content || '# Select items from the left panel to generate your .gitignore file'}
          </pre>
        )}
      </div>
    </div>
  );
} 