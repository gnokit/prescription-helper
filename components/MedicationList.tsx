import React from 'react';
import { Medication, FontSize, Language } from '../types';
import { PlusIcon, TrashIcon } from './icons';
import { t } from '../i18n';

interface MedicationListProps {
  medications: Medication[];
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>;
  totalDays: number;
  fontSize: FontSize;
  language: Language;
}

interface MedicationItemProps {
  medication: Medication;
  onUpdate: (id: string, field: keyof Omit<Medication, 'id'>, value: string | number) => void;
  onDelete: (id: string) => void;
  totalDays: number;
  fontSize: FontSize;
  language: Language;
}

const MedicationItem: React.FC<MedicationItemProps> = ({ medication, onUpdate, onDelete, totalDays, fontSize, language }) => {
  const { name, dailyDosage, pillsPerBox, notes } = medication;

  const totalPills = dailyDosage * totalDays;
  const boxes = pillsPerBox > 0 ? Math.floor(totalPills / pillsPerBox) : 0;
  const loosePills = pillsPerBox > 0 ? totalPills % pillsPerBox : totalPills;

  const labelClassName = `block font-medium text-slate-500 dark:text-slate-400 mb-1 ${
    fontSize === 'large' ? 'text-sm' : 'text-xs'
  }`;

  return (
    <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-start">
        <input
          type="text"
          placeholder={t('medication.name.placeholder', language)}
          value={name}
          onChange={(e) => onUpdate(medication.id, 'name', e.target.value)}
          className="font-semibold bg-transparent w-full focus:outline-none text-indigo-700 dark:text-indigo-400"
        />
        <button 
          onClick={() => onDelete(medication.id)} 
          className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 -mr-1 -mt-1 flex-shrink-0"
          aria-label={`${t('medication.delete', language)} ${name}`}
        >
          <TrashIcon />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClassName}>{t('medication.dailyDosage.label', language)}</label>
          <input
            type="number"
            value={dailyDosage}
            onChange={(e) => onUpdate(medication.id, 'dailyDosage', Math.max(0, parseFloat(e.target.value)) || 0)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className={labelClassName}>{t('medication.pillsPerBox.label', language)}</label>
          <input
            type="number"
            value={pillsPerBox}
            onChange={(e) => onUpdate(medication.id, 'pillsPerBox', Math.max(0, parseInt(e.target.value, 10)) || 0)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className={labelClassName}>{t('medication.notes.label', language)}</label>
        <textarea
          value={notes}
          onChange={(e) => onUpdate(medication.id, 'notes', e.target.value)}
          placeholder={t('medication.notes.placeholder', language)}
          rows={2}
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-center">
        <p className={`text-slate-500 dark:text-slate-400 ${fontSize === 'large' ? 'text-sm' : 'text-xs'}`}>{t('medication.totalPills', language)} {totalPills.toFixed(1)} {language === 'en' ? 'pills' : '顆'} ({totalDays} {t('appointment.weeks.unit', language)})</p>
        <p className="font-bold text-slate-700 dark:text-slate-200">
          <span className="text-lg text-indigo-600 dark:text-indigo-400">{boxes}</span> {t('medication.boxesNeeded', language)} + <span className="text-lg text-emerald-600 dark:text-emerald-400">{loosePills.toFixed(1)}</span> {t('medication.remainder', language)}
        </p>
      </div>
    </div>
  );
};

const MedicationList: React.FC<MedicationListProps> = ({ medications, setMedications, totalDays, fontSize, language }) => {
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dailyDosage: 1,
      pillsPerBox: 28,
      notes: '',
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (id: string, field: keyof Omit<Medication, 'id'>, value: string | number) => {
    setMedications(medications.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className={`font-semibold text-slate-700 dark:text-slate-200 mb-4 ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>💊 {t('medication.title', language)}</h2>
        <div className="space-y-4">
          {medications.map(med => (
            <MedicationItem
              key={med.id}
              medication={med}
              onUpdate={updateMedication}
              onDelete={deleteMedication}
              totalDays={totalDays}
              fontSize={fontSize}
              language={language}
            />
          ))}
        </div>
        <button 
          onClick={addMedication}
          className="mt-6 w-full flex items-center justify-center gap-2 p-3 text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-900 rounded-lg transition-colors"
        >
          <PlusIcon />
          {t('medication.add', language)}
        </button>
      </div>
    </div>
  );
};

export default MedicationList;