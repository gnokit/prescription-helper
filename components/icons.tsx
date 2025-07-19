import React from 'react';
import { Sun, Moon, Plus, Trash2, Check } from 'lucide-react';

interface IconProps {
  className?: string;
}

export const SunIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <Sun className={className} />
);

export const MoonIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <Moon className={className} />
);

export const PlusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <Plus className={className} />
);

export const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <Trash2 className={className} />
);

export const CheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <Check className={className} />
);
