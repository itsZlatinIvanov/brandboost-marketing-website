import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';

interface FeaturedCaseStudySectionProps {
  study: CaseStudy | null;
  onSelectStudy: (id: string) => void;
}

export const FeaturedCaseStudySection: React.FC<FeaturedCaseStudySectionProps> = ({ 
  study, 
  onSelectStudy 
}) => {
  if (!study) return null;
  
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4">
        <FeaturedCaseStudy 
          study={study}
          onSelect={onSelectStudy}
        />
      </div>
    </section>
  );
}; 