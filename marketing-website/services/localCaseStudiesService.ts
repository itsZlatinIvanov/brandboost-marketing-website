import { caseStudies as initialCaseStudies, CaseStudy } from '@/data/caseStudies';

const STORAGE_KEY = 'clyc_case_studies';

// Initialize localStorage with case studies if not already present
const initializeStorage = (): void => {
  const storedStudies = localStorage.getItem(STORAGE_KEY);
  if (!storedStudies) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCaseStudies));
  }
};

// Get all case studies from localStorage
export const getCaseStudies = (): CaseStudy[] => {
  initializeStorage();
  const storedStudies = localStorage.getItem(STORAGE_KEY);
  return storedStudies ? JSON.parse(storedStudies) : [];
};

// Save case studies to localStorage
export const saveCaseStudies = (studies: CaseStudy[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
};

// Create a new empty case study with default values
export const createEmptyCaseStudy = (): CaseStudy => {
  // Generate a unique ID
  const id = `case-${Date.now()}`;
  
  return {
    id,
    name: '',
    title: '',
    industry: 'business' as const,
    resultType: 'audience' as const,
    image: '/placeholders/case-study.jpg',
    stats: [
      {
        value: '0%',
        label: 'Growth',
        icon: 'trending-up'
      }
    ],
    challenge: '',
    solution: '',
    results: '',
    quote: '',
    tags: [],
    beforeMetrics: {
      followers: '',
      engagement: '',
      leads: '',
      timeSpent: ''
    },
    afterMetrics: {
      followers: '',
      engagement: '',
      leads: '',
      timeSpent: ''
    }
  };
};

// Reset case studies to initial state
export const resetToInitialCaseStudies = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCaseStudies));
};

// Get a single case study by ID
export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  const studies = getCaseStudies();
  return studies.find(study => study.id === id);
};

// Add a new case study or update an existing one
export const updateCaseStudy = (study: CaseStudy): void => {
  const studies = getCaseStudies();
  const index = studies.findIndex(s => s.id === study.id);
  
  if (index !== -1) {
    // Update existing study
    studies[index] = study;
  } else {
    // Add new study
    studies.push(study);
  }
  
  saveCaseStudies(studies);
};

// Delete a case study by ID
export const deleteCaseStudy = (id: string): void => {
  const studies = getCaseStudies();
  const updatedStudies = studies.filter(study => study.id !== id);
  saveCaseStudies(updatedStudies);
}; 