import { CaseStudy } from '@/data/caseStudies';
import type { CaseStudyFields } from '@/components/admin/CaseStudiesManager';

const DRAFTS_KEY = 'clyc_case_studies_drafts';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

interface DraftState {
  id: string;
  data: CaseStudyFields;
  lastSaved: number; // timestamp
  isDirty: boolean;
}

// Get all saved drafts
export const getDrafts = (): Record<string, DraftState> => {
  try {
    const draftsJson = localStorage.getItem(DRAFTS_KEY);
    return draftsJson ? JSON.parse(draftsJson) : {};
  } catch (error) {
    console.error('Error loading drafts:', error);
    return {};
  }
};

// Save a draft
export const saveDraft = (id: string, data: CaseStudyFields): void => {
  try {
    const drafts = getDrafts();
    drafts[id] = {
      id,
      data,
      lastSaved: Date.now(),
      isDirty: true,
    };
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error saving draft:', error);
  }
};

// Get a specific draft
export const getDraft = (id: string): DraftState | null => {
  const drafts = getDrafts();
  return drafts[id] || null;
};

// Remove a draft
export const removeDraft = (id: string): void => {
  try {
    const drafts = getDrafts();
    if (drafts[id]) {
      delete drafts[id];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    }
  } catch (error) {
    console.error('Error removing draft:', error);
  }
};

// Mark a draft as saved (not dirty)
export const markDraftAsSaved = (id: string): void => {
  try {
    const drafts = getDrafts();
    if (drafts[id]) {
      drafts[id].isDirty = false;
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    }
  } catch (error) {
    console.error('Error marking draft as saved:', error);
  }
};

// Get drafts by age (older than a certain time)
export const getOldDrafts = (olderThanHours: number): DraftState[] => {
  const drafts = getDrafts();
  const cutoffTime = Date.now() - (olderThanHours * 60 * 60 * 1000);
  
  return Object.values(drafts).filter(draft => 
    draft.lastSaved < cutoffTime
  );
};

// Auto-save callback setup
let autoSaveInterval: number | null = null;

export const startAutoSave = (
  id: string, 
  getData: () => CaseStudyFields, 
  onAutoSave?: () => void
): void => {
  // Clear any existing interval
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
  
  // Set up new interval
  autoSaveInterval = window.setInterval(() => {
    const currentData = getData();
    saveDraft(id, currentData);
    if (onAutoSave) onAutoSave();
  }, AUTO_SAVE_INTERVAL);
};

export const stopAutoSave = (): void => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }
}; 