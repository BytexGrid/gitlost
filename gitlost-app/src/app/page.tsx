'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SelectionPanel from '@/components/SelectionPanel';
import PreviewPanel from '@/components/PreviewPanel';
import SelectedItemsPanel from '@/components/SelectedItemsPanel';
import { fetchAndCombineGitignores } from '@/utils/fetchGitignoreTemplates';

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [gitignoreContent, setGitignoreContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePanel, setActivePanel] = useState<'selection' | 'preview' | 'selected'>('selection');

  useEffect(() => {
    let cancelled = false;
    if (selectedItems.length === 0) {
      setGitignoreContent('');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAndCombineGitignores(selectedItems).then(content => {
      if (!cancelled) {
        setGitignoreContent(content);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [selectedItems]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 w-full px-2 lg:px-8 py-4 lg:py-8 flex flex-col lg:flex-row gap-4 lg:gap-8 overflow-hidden bg-gradient-to-br from-gray-100/80 via-white/80 to-gray-200/80 dark:from-gray-900/80 dark:via-gray-950/80 dark:to-gray-800/80">
        {/* Mobile Navigation */}
        <div className="lg:hidden flex gap-2 p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
          <button
            onClick={() => setActivePanel('selection')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePanel === 'selection'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActivePanel('preview')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePanel === 'preview'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActivePanel('selected')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePanel === 'selected'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Selected
          </button>
        </div>

        {/* Panels for mobile: only one visible at a time */}
        <div className="lg:hidden flex-1 flex flex-col gap-4 overflow-hidden">
          {activePanel === 'selection' && (
            <div className="flex-1 min-h-0 rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <SelectionPanel selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
              </div>
            </div>
          )}
          {activePanel === 'preview' && (
            <div className="flex-1 min-h-0 rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <PreviewPanel content={gitignoreContent} loading={loading} selectedItems={selectedItems} />
              </div>
            </div>
          )}
          {activePanel === 'selected' && (
            <div className="flex-1 min-h-0 rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <SelectedItemsPanel selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
              </div>
            </div>
          )}
        </div>

        {/* Panels for desktop: always visible side by side */}
        <div className="hidden lg:flex flex-1 gap-8 overflow-hidden">
          {/* Selection Panel */}
          <div className="flex-1 min-w-[380px] max-w-[600px] rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto">
              <SelectionPanel selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            </div>
          </div>
          {/* Preview Panel */}
          <div className="flex-[2] rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto">
              <PreviewPanel content={gitignoreContent} loading={loading} selectedItems={selectedItems} />
            </div>
          </div>
          {/* Selected Items Panel */}
          <div className="flex-1 rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto">
              <SelectedItemsPanel selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
