"use client";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative z-[110] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in flex flex-col items-center">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl focus:outline-none"
          onClick={onClose}
          aria-label="Close About Modal"
        >
          &times;
        </button>
        <img src="/logo.ico" alt="GitLost Logo" className="h-20 w-20 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">GitLost</h2>
        <div className="text-lg text-gray-500 dark:text-gray-300 mb-4">Smart .gitignore Generator</div>
        <div className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          Welcome to <b>GitLost</b>! This app helps you quickly build the perfect <code>.gitignore</code> file for your project. Just pick your languages, frameworks, or tools from the list, and see a live preview as you go. You can even drop in your <code>package.json</code> or <code>requirements.txt</code> and let GitLost suggest what you need.
        </div>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 text-left w-full max-w-xs">
          <li>Search or browse for any language, framework, or tool</li>
          <li>See your combined <code>.gitignore</code> instantly</li>
          <li>Copy or download with one click</li>
          <li>Smart suggestions from your project files</li>
          <li>Works great in light or dark mode</li>
        </ul>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-center">
          Templates are from GitHub's official .gitignore collection.
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Made by <a href="https://github.com/bytexgrid" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">bytexgrid</a>
        </div>
      </div>
      <div className="fixed inset-0 z-[100]" onClick={onClose} aria-label="Close About Modal Overlay" />
    </div>,
    typeof window !== 'undefined' ? document.body : (null as any)
  );
}

export default function Header() {
  const [dark, setDark] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    // Set initial theme from localStorage or system
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && getSystemTheme() === 'dark')) {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <img src="/logo.ico" alt="GitLost Logo" height={36} width={36} className="h-9 w-9 mr-3" style={{ background: 'none', borderRadius: 0, boxShadow: 'none' }} />
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            GitLost
        <span className="text-base font-normal text-gray-500 dark:text-gray-300 ml-2" style={{fontWeight: 400}}>
          Smart .gitignore Generator
        </span>
          </h1>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setAboutOpen(true);
          }}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
          About
        </a>
        <a
          href="https://portfolio-bytexgrids-projects.vercel.app/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        >
          Contact
        </a>
        <a
          href="https://github.com/bytexgrid/gitlost"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          className="ml-2 flex items-center"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
              fill="currentColor"
            />
          </svg>
        </a>
          <span className="mr-2 text-gray-700 dark:text-gray-300 text-sm">{dark ? "Dark mode" : "Light mode"}</span>
          <button
            aria-label="Toggle dark mode"
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none ${dark ? "bg-gray-700" : "bg-gray-300"}`}
            onClick={() => setDark((d) => !d)}
          >
            <span
              className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${dark ? "translate-x-5" : "translate-x-0"}`}
            />
            <span className="absolute left-2 top-2 w-3 h-3 rounded-full bg-yellow-400" style={{ opacity: dark ? 1 : 0, transition: 'opacity 0.3s' }} />
            <span className="absolute right-2 top-2 w-3 h-3 rounded-full bg-gray-800" style={{ opacity: dark ? 0 : 1, transition: 'opacity 0.3s' }} />
          </button>
      </div>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
} 