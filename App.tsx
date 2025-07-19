import React, { useState, useEffect, useMemo } from 'react';
import { Medication, ChecklistItem, Theme, FontSize } from './types';
import Header from './components/Header';
import AppointmentCalculator from './components/AppointmentCalculator';
import MedicationList from './components/MedicationList';
import Checklist from './components/Checklist';

const App: React.FC = () => {
  // --- State Initialization with localStorage ---

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem('fontSize') as FontSize) || 'normal');
  
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
    if (window.confirm('您確定要清除所有資料嗎？此操作無法復原。')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const appBaseClass = "min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300";

  return (
    <div className={appBaseClass}>
      <Header theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} />
      <main className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <AppointmentCalculator 
            appointmentDate={appointmentDate}
            setAppointmentDate={setAppointmentDate}
            followUpWeeks={followUpWeeks}
            setFollowUpWeeks={setFollowUpWeeks}
            fontSize={fontSize}
          />
          <MedicationList 
            medications={medications} 
            setMedications={setMedications} 
            totalDays={totalDays}
            fontSize={fontSize}
          />
          <Checklist 
            items={checklistItems} 
            setItems={setChecklistItems}
            fontSize={fontSize}
          />
        </div>
        <footer className="text-center mt-12 mb-8 space-y-4">
           <button
            onClick={handleClearData}
            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
          >
            清除所有資料
          </button>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            處方小幫手 📝💊
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;