import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { CaseStudyDetail } from '@/components/ui/CaseStudyDetail';

interface CaseStudyDetailSectionProps {
  study: CaseStudy;
  onBack: () => void;
  onNextCase: (id: string) => void;
  onPrevCase: (id: string) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const CaseStudyDetailSection: React.FC<CaseStudyDetailSectionProps> = ({ 
  study, 
  onBack, 
  onNextCase, 
  onPrevCase, 
  hasNext, 
  hasPrev 
}) => {
  return (
    <div className="pt-20">
      <CaseStudyDetail
        study={study}
        onBack={onBack}
        onNextCase={onNextCase}
        onPrevCase={onPrevCase}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
}; 