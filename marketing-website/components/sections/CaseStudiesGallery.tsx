import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, Search, Grid, List, Users, Clock, TrendingUp, BarChart, 
  Award, ChevronDown, ChevronRight, X, Sliders, ArrowUpDown, ArrowRight, Grid3X3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { caseStudies, CaseStudy, Industry, ResultType } from '@/data/caseStudies';
import { renderIcon } from '@/utils/iconUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { BookmarkButton } from '@/components/ui/BookmarkButton';

// Types for viewing and filtering
type ExtendedIndustry = Industry | 'all';
type ExtendedResultType = ResultType | 'all';
type ViewMode = 'grid' | 'list' | 'compact';
type SortOption = 'recent' | 'alphabetical' | 'resultHigh' | 'resultLow' | 'timeframe';

interface FilterState {
  industries: ExtendedIndustry[];
  resultTypes: ExtendedResultType[];
  search: string;
  sortBy: SortOption;
}

// Update getIndustryLabel to handle the 'all' option
const getIndustryLabel = (industry: ExtendedIndustry): string => {
  switch (industry) {
    case 'all':
      return 'All Industries';
    case 'health':
      return 'Health';
    case 'business':
      return 'Business';
    case 'life':
      return 'Lifestyle';
    case 'fitness':
      return 'Fitness';
    case 'career':
      return 'Career';
    case 'relationship':
      return 'Relationship';
    default:
      // Type assertion to string to avoid 'never' type errors
      return (industry as string).charAt(0).toUpperCase() + (industry as string).slice(1);
  }
};

// Update getResultTypeLabel to handle the 'all' option
const getResultTypeLabel = (resultType: ExtendedResultType): string => {
  switch (resultType) {
    case 'all':
      return 'All Results';
    case 'audience':
      return 'Audience Growth';
    case 'time':
      return 'Time Saved';
    case 'engagement':
      return 'Engagement';
    case 'revenue':
      return 'Revenue';
    default:
      // Type assertion to string to avoid 'never' type errors
      return (resultType as string).charAt(0).toUpperCase() + (resultType as string).slice(1);
  }
};

// Component for a case study card in grid view
const CaseStudyCard: React.FC<{
  study: CaseStudy;
  onClick: () => void;
}> = ({ study, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col relative group cursor-pointer"
    >
      {/* Add bookmark button overlay */}
      <div 
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <BookmarkButton studyId={study.id} />
      </div>
      
      {/* Image section */}
      <div className="relative" onClick={onClick}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={study.image} 
            alt={study.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          
          <div className="absolute bottom-3 left-3 right-3 text-white">
            {study.industry && (
              <div className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 mb-1 w-fit">
                {study.industry.charAt(0).toUpperCase() + study.industry.slice(1)} Coaching
              </div>
            )}
            <h3 className="text-lg font-semibold">{study.name}</h3>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col" onClick={onClick}>
        <div className="flex flex-wrap gap-2 mb-3">
          {study.stats.slice(0, 2).map((stat, idx) => (
            <div key={idx} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
              {renderIcon({ icon: stat.icon, className: "w-3 h-3" })}
              <span>{stat.value}</span>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{study.challenge.substring(0, 120)}...</p>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {study.transformationTime || '3-6 months'}
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
            View Case Study <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Component for a case study in list view
const CaseStudyListItem: React.FC<{
  study: CaseStudy;
  onClick: () => void;
}> = ({ study, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="md:w-1/4 h-40 md:h-auto relative">
          <img 
            src={study.image} 
            alt={study.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div>
          
          {/* Industry badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-800">
            {getIndustryLabel(study.industry)}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 md:w-3/4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={study.avatarUrl || study.image} 
                  alt={study.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{study.name}</h3>
                <p className="text-sm text-gray-500">{study.title}</p>
              </div>
            </div>
            
            {study.featured && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mb-3">
            {study.stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                {renderIcon({ icon: stat.icon, className: "w-3.5 h-3.5 text-blue-500" })}
                <span className="text-xs font-medium text-gray-700">{stat.label}:</span>
                <span className="text-xs font-bold text-blue-600">{stat.value}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {study.challenge.split('.')[0]}.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {study.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {study.tags.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  +{study.tags.length - 3}
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View Case Study
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Update the skeleton component for better visual representation
const CaseStudySkeleton: React.FC<{ mode: ViewMode; index: number }> = ({ mode, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.05 * index, // Staggered animation based on index
        ease: "easeOut" 
      }}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        mode === 'grid' ? "h-full" : "w-full"
      )}
    >
      {mode === 'grid' && (
        <>
          <div className="relative">
            {/* Image skeleton with shimmer effect */}
            <div className="aspect-video w-full bg-gray-200 animate-pulse overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" 
                   style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}></div>
            </div>
            
            {/* Content overlay skeleton */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="h-4 w-20 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-5 w-36 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Stats skeleton */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
            </div>
            
            {/* Text skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-gray-100 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
              <div className="h-8 w-24 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </>
      )}
      
      {mode === 'list' && (
        <div className="flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/3 bg-gray-200 animate-pulse relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" 
                 style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}></div>
            <div className="aspect-video md:aspect-auto md:h-full"></div>
          </div>
          
          <div className="p-4 md:p-6 md:w-2/3">
            <div className="h-6 w-40 bg-gray-200 rounded-md mb-3"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-5 w-16 bg-gray-100 rounded-full"></div>
              <div className="h-5 w-20 bg-gray-100 rounded-full"></div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full bg-gray-100 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="h-9 w-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      )}
      
      {mode === 'compact' && (
        <div className="flex gap-3 p-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-100 rounded"></div>
        </div>
      )}
    </motion.div>
  );
};

// Update loading state to show more skeletons with staggered animations
const LoadingState: React.FC<{ mode: ViewMode }> = ({ mode }) => {
  return (
    <div className={cn(
      mode === 'grid' && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      mode === 'list' && "space-y-6",
      mode === 'compact' && "space-y-2"
    )}>
      {Array(mode === 'compact' ? 8 : 6).fill(0).map((_, index) => (
        <CaseStudySkeleton key={index} mode={mode} index={index} />
      ))}
    </div>
  );
};

// Simplified gallery component - just displays case studies based on provided filters
export const CaseStudiesGallery: React.FC<{
  onSelectStudy: (id: string) => void;
  initialFilters?: Partial<FilterState>;
  loading?: boolean;
}> = ({ onSelectStudy, initialFilters, loading = false }) => {
  // State for view mode - this is still managed here
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Loading state
  const [isLoading, setIsLoading] = useState(loading);
  
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  // Filter case studies based on provided filter state
  const filteredStudies = useMemo(() => {
    if (!initialFilters) return caseStudies;
    
    const { industries, resultTypes, search, sortBy } = initialFilters;
    
    return caseStudies.filter(study => {
      // Filter by industry - if empty array, show all
      if (industries && industries.length > 0) {
        if (!industries.includes(study.industry) && !industries.includes('all')) {
          return false;
        }
      }
      
      // Filter by result type - if empty array, show all
      if (resultTypes && resultTypes.length > 0) {
        if (!resultTypes.includes(study.resultType) && !resultTypes.includes('all')) {
          return false;
        }
      }
      
      // Filter by search term
      if (search) {
        const searchTerm = search.toLowerCase();
        return (
          study.name.toLowerCase().includes(searchTerm) ||
          study.title.toLowerCase().includes(searchTerm) ||
          study.challenge.toLowerCase().includes(searchTerm) ||
          study.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      return true;
    }).sort((a, b) => {
      // Sort case studies based on sort option
      if (!sortBy) return 0;
      
      switch (sortBy) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'resultHigh':
          // Sort by highest stat value
          return parseFloat(b.stats[0].value.replace(/[^0-9.]/g, '')) - 
                 parseFloat(a.stats[0].value.replace(/[^0-9.]/g, ''));
        case 'resultLow':
          // Sort by lowest stat value
          return parseFloat(a.stats[0].value.replace(/[^0-9.]/g, '')) - 
                 parseFloat(b.stats[0].value.replace(/[^0-9.]/g, ''));
        case 'timeframe':
          // Sort by transformation time (if available)
          const getMonths = (timeStr: string | undefined) => {
            if (!timeStr) return 6; // Default to 6 months
            const match = timeStr.match(/(\d+)/);
            return match ? parseInt(match[1]) : 6;
          };
          return getMonths(a.transformationTime) - getMonths(b.transformationTime);
        case 'recent':
        default:
          // Sort by featured first, then most recently added
          return caseStudies.indexOf(b) - caseStudies.indexOf(a);
      }
    });
  }, [initialFilters]);
  
  return (
    <div className="space-y-8">
      {/* Simple view mode toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex rounded-md border border-gray-200 overflow-hidden">
          <button 
            className={cn(
              "p-2",
              viewMode === 'grid' 
                ? "bg-blue-50 text-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-3x3"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
          </button>
          <button 
            className={cn(
              "p-2",
              viewMode === 'list' 
                ? "bg-blue-50 text-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing <span className="font-medium text-gray-900">{filteredStudies.length}</span> {filteredStudies.length === 1 ? 'case study' : 'case studies'}
      </div>
      
      {/* Case studies display */}
      {isLoading ? (
        <LoadingState mode={viewMode} />
      ) : (
        <div className={cn(
          viewMode === 'grid' && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          viewMode === 'list' && "flex flex-col gap-4"
        )}>
          {filteredStudies.length > 0 ? (
            filteredStudies.map(study => (
              viewMode === 'grid' ? (
                <CaseStudyCard 
                  key={study.id} 
                  study={study} 
                  onClick={() => onSelectStudy(study.id)} 
                />
              ) : (
                <CaseStudyListItem 
                  key={study.id} 
                  study={study} 
                  onClick={() => onSelectStudy(study.id)} 
                />
              )
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Sliders className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No matching case studies</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseStudiesGallery; 