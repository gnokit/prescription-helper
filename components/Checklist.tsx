import React, { useState } from 'react';
import { ChecklistItem, FontSize, Language } from '../types';
import { PlusIcon, TrashIcon, CheckIcon } from './icons';
import { t } from '../i18n';

interface ChecklistProps {
  items: ChecklistItem[];
  setItems: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  fontSize: FontSize;
  language: Language;
}

const Checklist: React.FC<ChecklistProps> = ({ items, setItems, fontSize, language }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false,
      };
      setItems([...items, newItem]);
      setNewItemText('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className={`font-semibold text-slate-700 dark:text-slate-200 mb-4 ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>✅ {t('checklist.title', language)}</h2>
        <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder={t('checklist.placeholder', language)}
            className="flex-grow p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            className="p-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 dark:disabled:bg-slate-600"
            disabled={!newItemText.trim()}
            aria-label={t('checklist.add', language)}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </form>
        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="flex items-center p-2 bg-slate-100 dark:bg-slate-900/50 rounded-md"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-6 h-6 rounded border-2 flex-shrink-0 mr-3 flex items-center justify-center transition-colors ${
                  item.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-slate-400 dark:border-slate-500'
                }`}
                aria-label={item.completed ? `將 ${item.text} 標示為未完成` : `將 ${item.text} 標示為已完成`}
              >
                {item.completed && <CheckIcon className="w-4 h-4" />}
              </button>
              <span className={`flex-grow ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                {item.text}
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                className="ml-2 p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label={`刪除 ${item.text}`}
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-4">
              {t('checklist.empty', language)}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Checklist;