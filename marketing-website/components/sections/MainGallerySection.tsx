import React from 'react';
import CaseStudiesGallery from '@/components/sections/CaseStudiesGallery';
import { CaseStudy, Industry, ResultType } from '@/data/caseStudies';
import { Search, Filter, Tag, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Define proper sort option type
type SortOption = 'recent' | 'alphabetical' | 'resultHigh' | 'resultLow' | 'timeframe';

// Define FilterState type for passing to gallery component
type FilterState = {
  industries: Industry[];
  resultTypes: ResultType[];
  search: string;
  sortBy: SortOption;
};

interface MainGallerySectionProps {
  onSelectStudy: (id: string) => void;
  loading?: boolean;
}

export const MainGallerySection: React.FC<MainGallerySectionProps> = ({ 
  onSelectStudy, 
  loading = false 
}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    industries: [],
    resultTypes: [],
    search: '',
    sortBy: 'recent'
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  // Handle industry filter toggle
  const toggleIndustry = (industry: Industry) => {
    setFilters(prev => {
      // For any selected industry, allow toggling
      // If it's the last selected one and being toggled off, we'll just show all
      const newIndustries = prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry];
      
      // Return the new filter state with updated industries
      return {
        ...prev,
        industries: newIndustries
      };
    });
  };

  // Handle result type filter toggle
  const toggleResultType = (resultType: ResultType) => {
    setFilters(prev => {
      // For any selected result type, allow toggling
      // If it's the last selected one and being toggled off, we'll just show all
      const newResultTypes = prev.resultTypes.includes(resultType)
        ? prev.resultTypes.filter(r => r !== resultType)
        : [...prev.resultTypes, resultType];
      
      // Return the new filter state with updated result types
      return {
        ...prev,
        resultTypes: newResultTypes
      };
    });
  };

  // Handle sort option change
  const changeSortOption = (option: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: option as SortOption
    }));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Find the Perfect Case Study</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          We've transformed social media presence for coaches and consultants across 
          various niches. Use our filtering system to find case studies that match your specific needs and goals.
        </p>
        
        {/* Organized filtering interface */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Left column: Filters explanation */}
            <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="space-y-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Filter by Industry</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Whether you're in health, business, or lifestyle coaching, find relevant examples in your niche.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Filter by Result Type</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Looking for audience growth, time savings, or revenue increase? Focus on what matters to you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Sort Options</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Sort by metrics that matter most to you, like transformation time or percentage growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column: Interactive filters */}
            <div className="md:w-1/2 p-6 relative">
              {/* Try clicking popup */}
              <div className="absolute -top-12 -right-6 w-40 hidden lg:block">
                <div className="transform rotate-12 bg-blue-50 text-blue-600 p-3 rounded-lg text-sm font-medium text-center shadow-sm border border-blue-100">
                  Try clicking on any filter!
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-blue-50 border-r border-b border-blue-100"></div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="w-full h-10 rounded-md bg-white border border-gray-200 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {filters.search && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Industry filters */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Industry</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {id: 'health', label: 'Health'},
                      {id: 'business', label: 'Business'},
                      {id: 'life', label: 'Lifestyle'},
                      {id: 'fitness', label: 'Fitness'},
                      {id: 'career', label: 'Career'},
                      {id: 'relationship', label: 'Relationship'}
                    ].map(industry => (
                      <button
                        key={industry.id}
                        onClick={() => toggleIndustry(industry.id as any)}
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                          filters.industries.includes(industry.id as any)
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {industry.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Result Type filters */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Result Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {id: 'audience', label: 'Audience Growth'},
                      {id: 'revenue', label: 'Revenue'},
                      {id: 'time', label: 'Time Saved'},
                      {id: 'engagement', label: 'Engagement'}
                    ].map(result => (
                      <button
                        key={result.id}
                        onClick={() => toggleResultType(result.id as any)}
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                          filters.resultTypes.includes(result.id as any)
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {result.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Sort options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sort by: Transformation Time</h4>
                  <div className="relative">
                    <div 
                      className="px-3 py-2 bg-white border border-gray-200 rounded-md flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        const dropdown = document.getElementById('sort-dropdown');
                        if (dropdown) dropdown.classList.toggle('hidden');
                      }}
                    >
                      <span className="text-sm text-gray-700">
                        {filters.sortBy === 'recent' && 'Most Recent'}
                        {filters.sortBy === 'alphabetical' && 'Alphabetical'}
                        {filters.sortBy === 'resultHigh' && 'Highest Results First'}
                        {filters.sortBy === 'resultLow' && 'Lowest Results First'}
                        {filters.sortBy === 'timeframe' && 'Transformation Time'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    
                    <div 
                      id="sort-dropdown"
                      className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 hidden"
                    >
                      <div className="py-1">
                        {[
                          {id: 'recent', label: 'Most Recent'},
                          {id: 'alphabetical', label: 'Alphabetical'},
                          {id: 'resultHigh', label: 'Highest Results First'},
                          {id: 'resultLow', label: 'Lowest Results First'},
                          {id: 'timeframe', label: 'Transformation Time'}
                        ].map(option => (
                          <button
                            key={option.id}
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm hover:bg-blue-50",
                              filters.sortBy === option.id && "text-blue-600 font-medium"
                            )}
                            onClick={() => {
                              changeSortOption(option.id);
                              document.getElementById('sort-dropdown')?.classList.add('hidden');
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Active filters summary */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Active filters: {filters.industries.length > 0 || filters.resultTypes.length > 0 || filters.search 
                        ? (
                          <span className="font-medium text-blue-600">
                            {[
                              filters.industries.length > 0 && `${filters.industries.length} industries`,
                              filters.resultTypes.length > 0 && `${filters.resultTypes.length} result types`,
                              filters.search && "search term"
                            ].filter(Boolean).join(", ")}
                          </span>
                        ) 
                        : <span className="text-gray-400">None</span>
                      }
                    </div>
                    <button
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                      onClick={() => setFilters({
                        industries: [],
                        resultTypes: [],
                        search: '',
                        sortBy: 'recent'
                      })}
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="case-studies-gallery">
          <CaseStudiesGallery 
            onSelectStudy={onSelectStudy}
            loading={loading}
            initialFilters={filters}
          />
        </div>
      </div>
    </section>
  );
}; 