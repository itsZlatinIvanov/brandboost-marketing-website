import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { renderIcon } from '@/utils/iconUtils';

interface MoreCaseStudiesSectionProps {
  studies: CaseStudy[];
  onSelectStudy: (id: string) => void;
}

export const MoreCaseStudiesSection: React.FC<MoreCaseStudiesSectionProps> = ({ 
  studies, 
  onSelectStudy 
}) => {
  if (studies.length === 0) return null;
  
  return (
    <div className="mt-12 sm:mt-16 pt-10 sm:pt-16 border-t border-gray-200">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">More Success Stories</h2>
        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Explore more case studies showing how we've helped coaches and consultants across different industries
        </p>
      </div>
      
      {/* Responsive grid - single column on mobile, three columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        {studies.map((study) => (
          <div 
            key={study.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectStudy(study.id)}
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={study.image} 
                alt={study.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 mb-1 w-fit">
                  {study.industry.charAt(0).toUpperCase() + study.industry.slice(1)} Coaching
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{study.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {study.stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {renderIcon({ icon: stat.icon, className: "w-3 h-3" })}
                    <span className="whitespace-nowrap">{stat.value} {stat.label}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{study.challenge.substring(0, 100)}...</p>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-blue-700 gap-1.5">
                  Read more <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8 sm:mt-10">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => document.getElementById('case-studies-gallery')?.scrollIntoView({ behavior: 'smooth' })}
          className="relative group"
        >
          <span className="relative z-10">View All Case Studies</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          <ArrowRight className="ml-2 w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}; 