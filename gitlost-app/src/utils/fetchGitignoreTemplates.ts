import { gitignoreTemplates, GitignoreTemplateStatic } from './gitignoreTemplates';

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/github/gitignore/main/';
const GITHUB_API_BASE_URL = 'https://api.github.com/repos/github/gitignore/contents/';
const cache: Record<string, string> = {};

const CACHE_KEY = 'gitignore_template_list_cache_v1';
const CACHE_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

export interface DynamicGitignoreTemplate {
  name: string;
  path: string;
  download_url: string;
  category?: string; // Optional, for future categorization
}

// Helper to fetch .gitignore files from a given path (root, Global, community)
async function fetchGitignoreFilesFromPath(path = ''): Promise<DynamicGitignoreTemplate[]> {
  const url = GITHUB_API_BASE_URL + path;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  // Only include .gitignore files
  return data
    .filter((item: any) => item.type === 'file' && item.name.endsWith('.gitignore'))
    .map((item: any) => ({
      name: item.name.replace(/\.gitignore$/, ''),
      path: item.path,
      download_url: item.download_url,
      // Optionally, set category based on path
      category: path ? path.replace(/\/$/, '') : 'Root',
    }));
}

// Fetch all .gitignore templates from root, Global, and community
export async function fetchAllGitignoreTemplates(): Promise<DynamicGitignoreTemplate[]> {
  const [root, global, community] = await Promise.all([
    fetchGitignoreFilesFromPath(''),
    fetchGitignoreFilesFromPath('Global'),
    fetchGitignoreFilesFromPath('community'),
  ]);
  return [...root, ...global, ...community];
}

// Fetch the raw .gitignore content by template name
export async function fetchGitignoreTemplate(name: string): Promise<string | null> {
  const template = gitignoreTemplates.find(t => t.name === name);
  if (!template) return null;
  if (cache[template.download_url]) return cache[template.download_url];
  try {
    const res = await fetch(template.download_url);
    if (!res.ok) return null;
    const text = await res.text();
    cache[template.download_url] = text;
    return text;
  } catch {
    return null;
  }
}

// Combine and deduplicate selected .gitignore templates
export async function fetchAndCombineGitignores(selected: string[]): Promise<string> {
  const uniqueTemplates = Array.from(new Set(selected))
    .map(name => gitignoreTemplates.find(t => t.name === name))
    .filter((t): t is GitignoreTemplateStatic => !!t);

  const sections: string[] = [];
  for (const template of uniqueTemplates) {
    const content = await fetchGitignoreTemplate(template.name);
    if (content) {
      sections.push(`# ===== ${template.name} =====\n${content.trim()}`);
    }
  }
  // Remove duplicate lines
  const allLines = sections.join('\n\n').split('\n');
  const seen = new Set<string>();
  const deduped = allLines.filter(line => {
    if (line.trim() === '' || line.startsWith('#')) return true;
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  });
  return deduped.join('\n');
}

export async function fetchAllGitignoreTemplatesCached(): Promise<DynamicGitignoreTemplate[]> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && parsed.templates && (Date.now() - parsed.timestamp < CACHE_TTL_MS)) {
          return parsed.templates;
        }
      }
    } catch {}
  }
  // If not cached or expired, fetch fresh
  const templates = await fetchAllGitignoreTemplates();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        templates,
      }));
    } catch {}
  }
  return templates;
} 