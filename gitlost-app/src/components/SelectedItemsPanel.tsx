import React, { useRef, useState } from 'react';
import { gitignoreTemplates } from '@/utils/gitignoreTemplates';

interface SelectedItemsPanelProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

function DropZonePanel({ onDetect }: { onDetect: (detected: string[]) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasDetection, setHasDetection] = useState(false);

  // Mapping from package/dependency to .gitignore template name (without .gitignore)
  const PACKAGE_TO_TEMPLATE: Record<string, string[]> = {
    // Node.js ecosystem
    'node': ['Node'],
    'react': ['Node', 'React'],
    'next': ['Node', 'Nextjs'],
    'next.js': ['Node', 'Nextjs'],
    'vue': ['Node', 'Vue'],
    'angular': ['Node', 'Angular'],
    'svelte': ['Node', 'Svelte'],
    'typescript': ['Node', 'TypeScript'],
    'jest': ['Node', 'Jest'],
    'express': ['Node', 'Express'],
    'electron': ['Node', 'Electron'],
    'gatsby': ['Node', 'Gatsby'],
    'nuxt': ['Node', 'Nuxt'],
    'nuxt.js': ['Node', 'Nuxt'],
    'cordova': ['Node', 'Cordova'],
    'expo': ['Node', 'Expo'],
    'react-native': ['Node', 'ReactNative'],
    'flutter': ['Flutter'],
    // Python ecosystem
    'python': ['Python'],
    'django': ['Python', 'Django'],
    'flask': ['Python', 'Flask'],
    'fastapi': ['Python', 'FastAPI'],
    'pytorch': ['Python'],
    'torch': ['Python'],
    'notebook': ['Python', 'JupyterNotebook'],
    'jupyter': ['Python', 'JupyterNotebook'],
    'scipy': ['Python'],
    'numpy': ['Python'],
    'pandas': ['Python'],
    'pytest': ['Python', 'Pytest'],
    'poetry': ['Python', 'Poetry'],
    'pipenv': ['Python'],
    // Add more as needed
  };

  // Helper to get valid template names from mapping
  const getValidTemplates = (names: string[]) => {
    const valid = new Set<string>();
    const allTemplates = gitignoreTemplates.map(t => t.name.replace('.gitignore', ''));
    for (const name of names) {
      if (allTemplates.includes(name)) valid.add(name);
    }
    return Array.from(valid);
  };

  const parsePackageJson = async (file: File) => {
    setLoading(true);
    setMessage(null);
    setHasDetection(false);
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const deps = Object.keys({ ...json.dependencies, ...json.devDependencies });
      const detected = new Set<string>();
      detected.add('Node');
      for (const dep of deps) {
        const lower = dep.toLowerCase();
        if (PACKAGE_TO_TEMPLATE[lower]) {
          PACKAGE_TO_TEMPLATE[lower].forEach(t => detected.add(t));
        }
      }
      const valid = getValidTemplates(Array.from(detected));
      if (valid.length > 0) {
        setMessage(`Smart suggestion: ${valid.join(', ')}.\n\nAuto-detection isn't 100% accurate. Please review before proceeding.`);
        setHasDetection(true);
        onDetect(valid);
      } else {
        setMessage('No relevant templates detected.');
        setHasDetection(false);
        onDetect([]);
      }
    } catch (e) {
      setMessage('Could not parse package.json');
      setHasDetection(false);
      onDetect([]);
    } finally {
      setLoading(false);
    }
  };

  const parseRequirementsTxt = async (file: File) => {
    setLoading(true);
    setMessage(null);
    setHasDetection(false);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/);
      const detected = new Set<string>();
      detected.add('Python');
      for (const line of lines) {
        const pkg = line.split('==')[0].split('>=')[0].split('<=')[0].trim().toLowerCase();
        if (pkg && PACKAGE_TO_TEMPLATE[pkg]) {
          PACKAGE_TO_TEMPLATE[pkg].forEach(t => detected.add(t));
        }
      }
      const valid = getValidTemplates(Array.from(detected));
      if (valid.length > 0) {
        setMessage(`Smart suggestion: ${valid.join(', ')}.\n\nAuto-detection isn't 100% accurate. Please review before proceeding.`);
        setHasDetection(true);
        onDetect(valid);
      } else {
        setMessage('No relevant templates detected.');
        setHasDetection(false);
        onDetect([]);
      }
    } catch (e) {
      setMessage('Could not parse requirements.txt');
      setHasDetection(false);
      onDetect([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name === 'package.json') {
        parsePackageJson(file);
      } else if (file.name === 'requirements.txt') {
        parseRequirementsTxt(file);
      } else {
        alert('Please drop a package.json or requirements.txt file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name === 'package.json') {
        parsePackageJson(file);
      } else if (file.name === 'requirements.txt') {
        parseRequirementsTxt(file);
      } else {
        alert('Please select a package.json or requirements.txt file');
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMessage(null);
    setHasDetection(false);
    onDetect([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="mt-4 p-4 border-2 border-dashed border-primary/40 rounded-lg bg-primary/5 text-center cursor-pointer hover:bg-primary/10 transition-colors relative"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept=".json,.txt"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="text-gray-700 dark:text-gray-300">
        <strong>Drop your <span className="text-primary">package.json</span> or <span className="text-primary">requirements.txt</span> here</strong><br />
        <span className="text-xs text-gray-500 dark:text-gray-400">Auto-detects and selects recommended .gitignore templates</span>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10 rounded-lg">
          <span className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></span>
        </div>
      )}
      {message && (
        <div className="mt-3 p-2 rounded bg-primary/10 text-primary text-xs whitespace-pre-line border border-primary/20 flex items-center justify-between">
          <span>{message}</span>
          <button
            className="ml-4 px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary/80 focus:outline-none"
            onClick={handleClear}
            tabIndex={-1}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default function SelectedItemsPanel({ selectedItems, setSelectedItems }: SelectedItemsPanelProps) {
  const removeItem = (itemToRemove: string) => {
    setSelectedItems(prev => prev.filter(item => item !== itemToRemove));
  };

  const handleDetect = (detected: string[]) => {
    setSelectedItems(detected.map(name => name.endsWith('.gitignore') ? name : name + '.gitignore'));
  };

  return (
    <div className="h-full flex flex-col bg-transparent p-4">
      <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selected Items</h2>
      {selectedItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No items selected yet.</p>
      ) : (
        <ul className="list-none p-0 m-0 space-y-2">
          {selectedItems.map(item => (
            <li key={item} className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                <span>{item.replace(/\.gitignore$/, '')}</span>
              <button
                onClick={() => removeItem(item)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                aria-label={`Remove ${item}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
      <DropZonePanel onDetect={handleDetect} />
    </div>
  );
}
 