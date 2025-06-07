import React, { useState, useMemo } from 'react';
import { gitignoreTemplates } from '@/utils/gitignoreTemplates';

function MacWindowBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-transparent border-b border-gray-200 dark:border-gray-800">
      <span className="w-3 h-3 rounded-full bg-red-500 border border-red-400 shadow-sm"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 shadow-sm"></span>
      <span className="w-3 h-3 rounded-full bg-green-500 border border-green-400 shadow-sm"></span>
    </div>
  );
}

const TAGS = ["All", "Popular", "Web", "App", "Backend"] as const;
type TagType = typeof TAGS[number];

// Hand-picked popular and category templates (by name)
const POPULAR = [
  "Node", "Python", "Java", "Android", "VisualStudio", "Unity", "macOS", "Windows", "Docker", "Go", "C++", "C", "Swift", "Ruby", "PHP", "React", "Nextjs", "Django", "Laravel", "VSCode"
];
const WEB = [
  "Node", "React", "Nextjs", "Vue", "Angular", "PHP", "Django", "Laravel", "Ruby", "Rails", "Nuxt", "Svelte", "Astro", "Gatsby", "WordPress"
];
const APP = [
  "Android", "iOS", "Swift", "Xcode", "Flutter", "ReactNative", "Unity", "UnrealEngine", "Expo", "Cordova", "Electron"
];
const BACKEND = [
  "Node", "Python", "Java", "Go", "Rust", "PHP", "Ruby", "Spring", "Express", "Django", "Flask", "Laravel", "Dotnet", "C#"
];

// Category mappings for grouped display
const CATEGORY_MAP: Record<string, string> = {
  // Programming Languages
  "Node": "Programming Language",
  "Python": "Programming Language",
  "Java": "Programming Language",
  "Go": "Programming Language",
  "C++": "Programming Language",
  "C": "Programming Language",
  "Swift": "Programming Language",
  "Ruby": "Programming Language",
  "PHP": "Programming Language",
  "Rust": "Programming Language",
  "C#": "Programming Language",
  // Frameworks
  "React": "Framework",
  "Nextjs": "Framework",
  "Vue": "Framework",
  "Angular": "Framework",
  "Django": "Framework",
  "Laravel": "Framework",
  "Rails": "Framework",
  "Nuxt": "Framework",
  "Svelte": "Framework",
  "Astro": "Framework",
  "Gatsby": "Framework",
  "Flask": "Framework",
  "Express": "Framework",
  // IDEs
  "VisualStudio": "IDE",
  "VSCode": "IDE",
  "Xcode": "IDE",
  // OS
  "macOS": "Operating System",
  "Windows": "Operating System",
  // Tools
  "Docker": "Tool",
  // App/Platform
  "Android": "App Platform",
  "iOS": "App Platform",
  "Flutter": "App Platform",
  "ReactNative": "App Platform",
  "Unity": "App Platform",
  "UnrealEngine": "App Platform",
  "Expo": "App Platform",
  "Cordova": "App Platform",
  "Electron": "App Platform",
  "WordPress": "App Platform",
  // Backend
  "Spring": "Framework",
  "Dotnet": "Framework",
};

function cleanName(name: string) {
  return name.replace('.gitignore', '');
}

function groupByCategory(templates: typeof gitignoreTemplates) {
  const groups: Record<string, typeof gitignoreTemplates> = {};
  templates.forEach(t => {
    const base = cleanName(t.name);
    const cat = CATEGORY_MAP[base] || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(t);
  });
  return groups;
}

interface SelectionPanelProps {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export default function SelectionPanel({ selectedItems, setSelectedItems }: SelectionPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<TagType>('All');

  // Flat, alphabetically sorted list
  const sortedTemplates = useMemo(() => {
    return [...gitignoreTemplates].sort((a, b) => cleanName(a.name).localeCompare(cleanName(b.name)));
  }, []);

  // Filter by tag
  const taggedTemplates = useMemo(() => {
    if (activeTag === 'All') return sortedTemplates;
    if (activeTag === 'Popular') return sortedTemplates.filter(t => POPULAR.includes(cleanName(t.name)));
    if (activeTag === 'Web') return sortedTemplates.filter(t => WEB.includes(cleanName(t.name)));
    if (activeTag === 'App') return sortedTemplates.filter(t => APP.includes(cleanName(t.name)));
    if (activeTag === 'Backend') return sortedTemplates.filter(t => BACKEND.includes(cleanName(t.name)));
    return sortedTemplates;
  }, [activeTag, sortedTemplates]);

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return taggedTemplates;
    return taggedTemplates.filter(template =>
      cleanName(template.name).toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, taggedTemplates]);

  const groupedTemplates = useMemo(() => {
    if (activeTag === 'All') return null;
    return groupByCategory(filteredTemplates);
  }, [filteredTemplates, activeTag]);

  const toggleItem = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(item => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  return (
    <div className="h-full w-full p-0 bg-transparent flex flex-col">
      <MacWindowBar />
      <div className="p-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-800">
        <input
          type="text"
          placeholder="Search languages, frameworks, etc."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 mt-4">
          {TAGS.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${activeTag === tag ? 'bg-primary text-white border-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-primary/10'}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTag === 'All' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTemplates.map((template) => (
              <label
                key={template.name}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <span className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(template.name)}
                    onChange={() => toggleItem(template.name)}
                    className="peer appearance-none w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 checked:bg-primary checked:dark:bg-primary checked:border-primary checked:dark:border-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                  />
                  <svg
                    className="pointer-events-none absolute w-3 h-3 text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="5 11 9 15 15 7" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">{cleanName(template.name)}</span>
              </label>
            ))}
          </div>
        ) : (
          groupedTemplates && Object.entries(groupedTemplates).map(([cat, group]) => (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wider">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.map((template) => (
                  <label
                    key={template.name}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <span className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(template.name)}
                        onChange={() => toggleItem(template.name)}
                        className="peer appearance-none w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 checked:bg-primary checked:dark:bg-primary checked:border-primary checked:dark:border-primary transition-colors duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                      />
                      <svg
                        className="pointer-events-none absolute w-3 h-3 text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="5 11 9 15 15 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{cleanName(template.name)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        )}
        <div className="w-full text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
} 