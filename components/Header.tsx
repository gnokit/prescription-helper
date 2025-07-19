import React from 'react';
import { Theme, FontSize } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const ToggleButton: React.FC<{
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  ariaLabel: string;
}> = ({ onClick, active, children, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`p-2 rounded-full transition-colors duration-200 ${
      active
        ? 'bg-indigo-600 text-white'
        : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ theme, setTheme, fontSize, setFontSize }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  
  const titleClassName = `font-bold text-indigo-600 dark:text-indigo-400 ${
    fontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
  }`;

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
        <h1 className={titleClassName}>
          處方小幫手 <span className="hidden sm:inline">📝💊</span>
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-full">
             <ToggleButton onClick={() => setFontSize('normal')} active={fontSize === 'normal'} ariaLabel="使用正常字體">
                <span className="text-xs font-semibold px-1">A</span>
             </ToggleButton>
             <ToggleButton onClick={() => setFontSize('large')} active={fontSize === 'large'} ariaLabel="使用大字體">
                <span className="text-base font-semibold px-1">A</span>
             </ToggleButton>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={`切換至${theme === 'light' ? '深色' : '淺色'}模式`}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;