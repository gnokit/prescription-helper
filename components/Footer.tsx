import React from 'react';
import { FontSize, Language } from '../types';
import app_logo from '../favicon-256x256.png';
import { t } from '../i18n';

interface FooterProps {
  onClearData: () => void;
  fontSize: FontSize;
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ onClearData, fontSize, language }) => {
  const textClassName = fontSize === 'large' ? 'text-base' : 'text-sm';
  const smallTextClassName = fontSize === 'large' ? 'text-sm' : 'text-xs';


  const handleClearData = () => {
    onClearData();
  };

  return (
    <footer className="text-center mt-12 mb-8 space-y-4">
      <button
        onClick={handleClearData}
        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
        aria-label={t('footer.clearData.aria', language)}
      >
        {t('footer.clearData', language)}
      </button>
      
      <div className="space-y-2">
        <p className={`${textClassName} text-slate-400 dark:text-slate-500`}>
          <img src={app_logo} className="w-8 h-8 inline-block mr-2" alt={t('app.logo.alt', language)} /> {t('app.title', language)}
        </p>
        
        <div className={`${smallTextClassName} text-slate-500 dark:text-slate-400 space-y-1`}>
          <p>
            © 2024 {t('app.title', language)}. All rights reserved.
          </p>
          <p>
            <a 
              href="https://github.com/gnokit/prescription-helper" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub Repository
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;