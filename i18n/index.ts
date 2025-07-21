import { Language } from '../types';

export type TranslationKey = 
  // App Title & Header
  | 'app.title'
  | 'app.logo.alt'
  
  // Theme Controls
  | 'theme.light'
  | 'theme.dark'
  | 'theme.toggle'
  
  // Font Size Controls
  | 'fontSize.normal'
  | 'fontSize.large'
  | 'fontSize.normal.aria'
  | 'fontSize.large.aria'
  
  // Language Controls
  | 'language.en'
  | 'language.zh-TW'
  | 'language.toggle'
  
  // Appointment Calculator
  | 'appointment.title'
  | 'appointment.date.label'
  | 'appointment.weeks.label'
  | 'appointment.weeks.unit'
  | 'appointment.followUpDate'
  | 'appointment.date.format'
  
  // Medication List
  | 'medication.title'
  | 'medication.add'
  | 'medication.name.label'
  | 'medication.name.placeholder'
  | 'medication.dailyDosage.label'
  | 'medication.dailyDosage.placeholder'
  | 'medication.pillsPerBox.label'
  | 'medication.pillsPerBox.placeholder'
  | 'medication.notes.label'
  | 'medication.notes.placeholder'
  | 'medication.totalPills'
  | 'medication.boxesNeeded'
  | 'medication.remainder'
  | 'medication.edit'
  | 'medication.delete'
  | 'medication.save'
  | 'medication.cancel'
  
  // Checklist
  | 'checklist.title'
  | 'checklist.add'
  | 'checklist.placeholder'
  | 'checklist.empty'
  | 'checklist.delete'
  
  // Confirm Modal
  | 'confirm.title'
  | 'confirm.clearData'
  | 'confirm.cancel'
  | 'confirm.clear'
  
  // Footer
  | 'footer.copyright'
  | 'footer.clearData'
  | 'footer.clearData.aria';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  'en': {
    // App Title & Header
    'app.title': 'Prescription Helper',
    'app.logo.alt': 'Prescription Helper Logo',
    
    // Theme Controls
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle theme',
    
    // Font Size Controls
    'fontSize.normal': 'A',
    'fontSize.large': 'A',
    'fontSize.normal.aria': 'Use normal font size',
    'fontSize.large.aria': 'Use large font size',
    
    // Language Controls
    'language.en': 'EN',
    'language.zh-TW': '中',
    'language.toggle': 'Switch language',
    
    // Appointment Calculator
    'appointment.title': 'Follow-up Appointment Calculator',
    'appointment.date.label': 'Appointment Date',
    'appointment.weeks.label': 'Follow-up Interval',
    'appointment.weeks.unit': 'weeks',
    'appointment.followUpDate': 'Next follow-up date',
    'appointment.date.format': 'en-US',
    
    // Medication List
    'medication.title': 'Medication Management',
    'medication.add': 'Add Medication',
    'medication.name.label': 'Medication Name',
    'medication.name.placeholder': 'e.g., Aspirin',
    'medication.dailyDosage.label': 'Daily Dosage (pills)',
    'medication.dailyDosage.placeholder': 'e.g., 2',
    'medication.pillsPerBox.label': 'Pills per Box',
    'medication.pillsPerBox.placeholder': 'e.g., 30',
    'medication.notes.label': 'Notes',
    'medication.notes.placeholder': 'e.g., Take with food',
    'medication.totalPills': 'Total pills needed',
    'medication.boxesNeeded': 'Boxes',
    'medication.remainder': 'Remainder Pills',
    'medication.edit': 'Edit',
    'medication.delete': 'Delete',
    'medication.save': 'Save',
    'medication.cancel': 'Cancel',
    
    // Checklist
    'checklist.title': 'Pre-appointment Checklist',
    'checklist.add': 'Add Item',
    'checklist.placeholder': 'Add a new checklist item...',
    'checklist.empty': 'No checklist items yet',
    'checklist.delete': 'Delete',
    
    // Confirm Modal
    'confirm.title': 'Confirm Action',
    'confirm.clearData': 'Are you sure you want to clear all data? This action cannot be undone.',
    'confirm.cancel': 'Cancel',
    'confirm.clear': 'Clear All Data',
    
    // Footer
    'footer.copyright': '© 2024 Prescription Helper. All rights reserved.',
    'footer.clearData': 'Clear All Data',
    'footer.clearData.aria': 'Clear all saved data'
  },
  'zh-TW': {
    // App Title & Header
    'app.title': '處方小幫手',
    'app.logo.alt': '處方小幫手圖示',
    
    // Theme Controls
    'theme.light': '淺色',
    'theme.dark': '深色',
    'theme.toggle': '切換主題',
    
    // Font Size Controls
    'fontSize.normal': 'A',
    'fontSize.large': 'A',
    'fontSize.normal.aria': '使用正常字體',
    'fontSize.large.aria': '使用大字體',
    
    // Language Controls
    'language.en': 'EN',
    'language.zh-TW': '中',
    'language.toggle': '切換語言',
    
    // Appointment Calculator
    'appointment.title': '回診日期計算器',
    'appointment.date.label': '看診日期',
    'appointment.weeks.label': '回診間隔',
    'appointment.weeks.unit': '週',
    'appointment.followUpDate': '下次回診日期',
    'appointment.date.format': 'zh-TW',
    
    // Medication List
    'medication.title': '藥物管理',
    'medication.add': '新增藥物',
    'medication.name.label': '藥物名稱',
    'medication.name.placeholder': '例如：阿斯匹靈',
    'medication.dailyDosage.label': '每日劑量（顆）',
    'medication.dailyDosage.placeholder': '例如：2',
    'medication.pillsPerBox.label': '每盒顆數',
    'medication.pillsPerBox.placeholder': '例如：30',
    'medication.notes.label': '備註',
    'medication.notes.placeholder': '例如：飯後服用',
    'medication.totalPills': '總共需要顆數',
    'medication.boxesNeeded': '需要購買盒數',
    'medication.remainder': '剩餘顆數',
    'medication.edit': '編輯',
    'medication.delete': '刪除',
    'medication.save': '儲存',
    'medication.cancel': '取消',
    
    // Checklist
    'checklist.title': '回診前檢查清單',
    'checklist.add': '新增項目',
    'checklist.placeholder': '新增檢查項目...',
    'checklist.empty': '尚無檢查項目',
    'checklist.delete': '刪除',
    
    // Confirm Modal
    'confirm.title': '確認操作',
    'confirm.clearData': '確定要清除所有資料嗎？此操作無法復原。',
    'confirm.cancel': '取消',
    'confirm.clear': '清除所有資料',
    
    // Footer
    'footer.copyright': '© 2024 處方小幫手. 版權所有.',
    'footer.clearData': '清除所有資料',
    'footer.clearData.aria': '清除所有儲存的資料'
  }
};

export const t = (key: TranslationKey, language: Language): string => {
  return translations[language][key] || translations['zh-TW'][key];
};