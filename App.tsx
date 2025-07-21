import React, { useState, useEffect, useMemo } from 'react';
import { Medication, ChecklistItem, Theme, FontSize, Language } from './types';
import Header from './components/Header';
import AppointmentCalculator from './components/AppointmentCalculator';
import MedicationList from './components/MedicationList';
import Checklist from './components/Checklist';
import ConfirmModal from './components/ConfirmModal';
import Footer from './components/Footer';

const App: React.FC = () => {
  // --- State Initialization with localStorage ---

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem('fontSize') as FontSize) || 'normal');
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'zh-TW');
  
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    return localStorage.getItem('appointmentDate') || new Date().toISOString().split('T')[0];
  });

  const [followUpWeeks, setFollowUpWeeks] = useState<number>(() => {
    const savedWeeks = localStorage.getItem('followUpWeeks');
    return savedWeeks ? parseInt(savedWeeks, 10) : 4;
  });

  const [medications, setMedications] = useState<Medication[]>(() => {
    try {
      const savedMeds = localStorage.getItem('medications');
      return savedMeds ? JSON.parse(savedMeds) : [];
    } catch {
      return [];
    }
  });

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    try {
      const savedItems = localStorage.getItem('checklistItems');
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // --- Effects for UI and localStorage persistence ---

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.fontSize = fontSize === 'large' ? '24px' : '16px';
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('appointmentDate', appointmentDate);
  }, [appointmentDate]);

  useEffect(() => {
    localStorage.setItem('followUpWeeks', followUpWeeks.toString());
  }, [followUpWeeks]);

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('checklistItems', JSON.stringify(checklistItems));
  }, [checklistItems]);

  const totalDays = useMemo(() => followUpWeeks * 7, [followUpWeeks]);

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const appBaseClass = "min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300";

  return (
    <div className={appBaseClass}>
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        fontSize={fontSize} 
        setFontSize={setFontSize}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <AppointmentCalculator 
            appointmentDate={appointmentDate}
            setAppointmentDate={setAppointmentDate}
            followUpWeeks={followUpWeeks}
            setFollowUpWeeks={setFollowUpWeeks}
            fontSize={fontSize}
            language={language}
          />
          <MedicationList 
            medications={medications} 
            setMedications={setMedications} 
            totalDays={totalDays}
            fontSize={fontSize}
            language={language}
          />
          <Checklist 
            items={checklistItems} 
            setItems={setChecklistItems}
            fontSize={fontSize}
            language={language}
          />
        </div>
        <Footer onClearData={() => setIsConfirmModalOpen(true)} fontSize={fontSize} language={language} />
      </main>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleClearData}
        fontSize={fontSize}
        language={language}
      />
    </div>
  );
};

export default App;