import React from 'react';
import { FontSize } from '../types';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  fontSize: FontSize;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  fontSize,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="p-6">
          <h2 className={`font-semibold text-slate-800 dark:text-slate-100 ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
            {title}
          </h2>
          <p className={`mt-2 text-slate-600 dark:text-slate-300 ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
            {message}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800 transition ${
              fontSize === 'large' ? 'text-base' : 'text-sm'
            }`}
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 transition ${
              fontSize === 'large' ? 'text-base' : 'text-sm'
            }`}
          >
            確認清除
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
