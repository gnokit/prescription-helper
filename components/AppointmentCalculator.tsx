import React, { useMemo } from 'react';
import { FontSize, Language } from '../types';
import { t } from '../i18n';

interface AppointmentCalculatorProps {
  appointmentDate: string;
  setAppointmentDate: (date: string) => void;
  followUpWeeks: number;
  setFollowUpWeeks: (weeks: number) => void;
  fontSize: FontSize;
  language: Language;
}

const AppointmentCalculator: React.FC<AppointmentCalculatorProps> = ({
  appointmentDate,
  setAppointmentDate,
  followUpWeeks,
  setFollowUpWeeks,
  fontSize,
  language,
}) => {
  const nextAppointmentDate = useMemo(() => {
    if (!appointmentDate) return t('appointment.date.label', language);
    const currentDate = new Date(appointmentDate);
    currentDate.setDate(currentDate.getDate() + followUpWeeks * 7);
    return currentDate.toLocaleDateString(t('appointment.date.format', language), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  }, [appointmentDate, followUpWeeks, language]);

  const labelClassName = `block font-medium text-slate-600 dark:text-slate-300 mb-1 ${
    fontSize === 'large' ? 'text-base' : 'text-sm'
  }`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className={`font-semibold text-slate-700 dark:text-slate-200 mb-4 ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
          🗓️ {t('appointment.title', language)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="appointment-date" className={labelClassName}>
              {t('appointment.date.label', language)}
            </label>
            <input
              type="date"
              id="appointment-date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="follow-up-weeks" className={labelClassName}>
              {t('appointment.weeks.label', language)} ({t('appointment.weeks.unit', language)})
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="follow-up-weeks"
              value={followUpWeeks || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setFollowUpWeeks(value === '' ? 0 : parseInt(value, 10));
                }
              }}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>
        <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg text-center">
          <p className={`font-medium text-indigo-600 dark:text-indigo-300 ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>{t('appointment.followUpDate', language)}</p>
          <p className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-indigo-200 mt-1">{nextAppointmentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalculator;