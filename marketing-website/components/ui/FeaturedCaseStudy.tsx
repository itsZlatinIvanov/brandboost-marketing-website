import React from 'react';
import { Star, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { renderIcon } from '@/utils/iconUtils';

interface FeaturedCaseStudyProps {
  study: CaseStudy;
  onSelect: (id: string) => void;
}

export const FeaturedCaseStudy: React.FC<FeaturedCaseStudyProps> = ({ study, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative">
        {/* Featured badge - improved positioning for mobile */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
          <Star className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">Featured Success Story</span>
        </div>
        
        {/* Background image with gradient overlay */}
        <div className="h-64 sm:h-80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 mix-blend-multiply z-10"></div>
          <img 
            src={study.image} 
            alt={study.name} 
            className="w-full h-full object-cover object-center"
            loading="eager" // Ensure prioritized loading
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20"></div>
          
          {/* Content overlay - improved for mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img 
                  src={study.avatarUrl || study.image} 
                  alt={study.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{study.name}</h2>
                <p className="text-xs sm:text-sm text-blue-100">{study.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 md:p-8">
        <div className="md:flex gap-6 lg:gap-10">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <blockquote className="text-lg sm:text-xl italic text-gray-700 mb-4 sm:mb-6 relative pl-4 border-l-4 border-blue-200">
              "{study.quote}"
            </blockquote>
            
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">The Challenge</h3>
                <p className="text-sm sm:text-base">{study.challenge}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Solution</h3>
                <p className="text-sm sm:text-base">{study.solution}</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            {/* Key Results - Enhanced for mobile */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Key Results</h3>
              <div className="space-y-4">
                {study.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {renderIcon({ icon: stat.icon, className: "w-5 h-5 text-blue-600" })}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags - Better mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {study.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 sm:mt-8">
          <Button 
            onClick={() => onSelect(study.id)}
            size="lg"
            className="min-w-40 relative overflow-hidden group"
          >
            <span className="relative z-10">View Full Case Study</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <ChevronRight className="ml-2 w-4 h-4 relative z-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 