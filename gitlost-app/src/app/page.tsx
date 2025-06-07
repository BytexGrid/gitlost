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
      <main className="flex-1 w-full px-2 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 overflow-hidden bg-gradient-to-br from-gray-100/80 via-white/80 to-gray-200/80 dark:from-gray-900/80 dark:via-gray-950/80 dark:to-gray-800/80">
        {/* Selection Panel (1/3 width on large screens) */}
        <div className="flex-1 lg:flex-[1] min-w-[380px] max-w-[600px] rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto">
            <SelectionPanel selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          </div>
        </div>
        {/* Container for Preview and Selected Items (2/3 width on large screens) */}
        <div className="flex-[2] flex flex-col lg:flex-row gap-8 overflow-hidden">
          {/* Preview Panel (takes 2/3 of this container width on large screens) */}
          <div className="flex-[2] rounded-2xl shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
             <div className="flex-1 overflow-auto">
              <PreviewPanel content={gitignoreContent} loading={loading} selectedItems={selectedItems} />
            </div>
          </div>
           {/* Selected Items Panel (takes 1/3 of this container width on large screens) */}
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
