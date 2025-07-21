import React from 'react';
import { Theme, FontSize, Language } from '../types';
import { SunIcon, MoonIcon } from './icons';
import app_logo from '../favicon-256x256.png';
import { t } from '../i18n';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  language: Language;
  setLanguage: (language: Language) => void;
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

const Header: React.FC<HeaderProps> = ({ theme, setTheme, fontSize, setFontSize, language, setLanguage }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  
  const titleClassName = `font-bold text-indigo-600 dark:text-indigo-400 ${
    fontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
  }`;

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
        <h1 className={titleClassName}>
          <img src={app_logo} className="w-8 h-8 inline-block mr-2" alt={t('app.logo.alt', language)} />
          {t('app.title', language)}
        </h1>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-full">
             <ToggleButton onClick={() => setFontSize('normal')} active={fontSize === 'normal'} ariaLabel={t('fontSize.normal.aria', language)}>
                <span className="text-xs font-semibold px-1">{t('fontSize.normal', language)}</span>
             </ToggleButton>
             <ToggleButton onClick={() => setFontSize('large')} active={fontSize === 'large'} ariaLabel={t('fontSize.large.aria', language)}>
                <span className="text-base font-semibold px-1">{t('fontSize.large', language)}</span>
             </ToggleButton>
          </div>
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-full">
             <ToggleButton onClick={() => setLanguage('zh-TW')} active={language === 'zh-TW'} ariaLabel={t('language.toggle', language)}>
                <span className="text-xs font-semibold px-1">{t('language.zh-TW', language)}</span>
             </ToggleButton>
             <ToggleButton onClick={() => setLanguage('en')} active={language === 'en'} ariaLabel={t('language.toggle', language)}>
                <span className="text-xs font-semibold px-1">{t('language.en', language)}</span>
             </ToggleButton>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={`${t('theme.toggle', language)}: ${theme === 'light' ? t('theme.dark', language) : t('theme.light', language)}`}
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