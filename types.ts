export interface Medication {
  id: string;
  name: string;
  dailyDosage: number;
  pillsPerBox: number;
  notes: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export type Theme = 'light' | 'dark';
export type FontSize = 'normal' | 'large';
export type Language = 'en' | 'zh-TW';