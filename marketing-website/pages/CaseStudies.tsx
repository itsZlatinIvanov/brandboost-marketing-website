import { useEffect, useState, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, ChevronRight, Clock, ExternalLink, Instagram, Play, TrendingUp, Users, Youtube, BarChart, Check, Quote, ArrowLeft, X, Twitter, Star, Filter, Search, SlidersHorizontal, Tag, Facebook, Linkedin, Share2, Bookmark, BookmarkCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { caseStudies, getFeaturedCaseStudies, Industry, ResultType, CaseStudy, SocialPost as SocialPostType } from '@/data/caseStudies';
import { renderIcon } from '@/utils/iconUtils';
import CaseStudiesGallery from '@/components/sections/CaseStudiesGallery';
import { Skeleton } from '@/components/ui/skeleton';
import { BookmarkButton } from '@/components/ui/BookmarkButton';

// Import our section components
import { CaseStudiesHeroSection } from '@/components/sections/CaseStudiesHeroSection';
import { FeaturedCaseStudySection } from '@/components/sections/FeaturedCaseStudySection';
import { MainGallerySection } from '@/components/sections/MainGallerySection';
import { MoreCaseStudiesSection } from '@/components/sections/MoreCaseStudiesSection';
import { CaseStudyDetailSection } from '@/components/sections/CaseStudyDetailSection';

// Component for the metrics display
interface MetricComparisonProps {
  label: string;
  before: string;
  after: string;
  increase: string;
}

const MetricComparison = ({ label, before, after, increase }: MetricComparisonProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="flex items-end gap-3 mb-2">
      <div className="text-sm text-gray-400 line-through">{before}</div>
      <div className="text-2xl font-bold text-blue-600">{after}</div>
    </div>
    <div className="flex items-center gap-1">
      <TrendingUp className="w-3 h-3 text-green-500" />
      <span className="text-xs font-medium text-green-600">{increase} increase</span>
    </div>
  </div>
);

// Component for social post display
interface SocialPostProps {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  content: string;
  image?: string;
  engagement: {
    likes: number;
    comments: number;
    shares?: number;
  };
  date: string;
}

const SocialPost = ({ platform, content, image, engagement, date }: SocialPostProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-3 border-b border-gray-100 flex items-center gap-2">
      {platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
      {platform === 'linkedin' && <Users className="w-4 h-4 text-blue-600" />}
      {platform === 'tiktok' && <Play className="w-4 h-4 text-black" />}
      <span className="text-sm font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
      <span className="text-xs text-gray-500 ml-auto">{date}</span>
    </div>
    {image && (
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={image} alt={`${platform} post`} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-3">
      <p className="text-sm text-gray-700">{content}</p>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">{engagement.likes.toLocaleString()}</span> likes
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">{engagement.comments.toLocaleString()}</span> comments
        </div>
        {engagement.shares && (
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-700">{engagement.shares.toLocaleString()}</span> shares
          </div>
        )}
      </div>
    </div>
  </div>
);

// Navigation for the case studies
interface CaseStudyNavigationProps {
  studies: CaseStudy[];
  activeCaseId: string | null;
  setActiveCaseId: (id: string) => void;
}

const CaseStudyNavigation = ({ studies, activeCaseId, setActiveCaseId }: CaseStudyNavigationProps) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden sticky top-24">
    <div className="p-4 border-b border-gray-100 bg-blue-50">
      <h3 className="font-medium text-gray-900">Client Transformations</h3>
    </div>
    <div className="py-2">
      {studies.map((study) => (
        <button
          key={study.id}
          className={cn(
            "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
            activeCaseId === study.id 
              ? "bg-blue-50 text-blue-600" 
              : "hover:bg-gray-50 text-gray-700"
          )}
          onClick={() => setActiveCaseId(study.id)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
            <img 
              src={study.avatarUrl || study.image} 
              alt={study.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="font-medium text-inherit">{study.name}</div>
            <div className="text-xs text-gray-500">{study.title}</div>
          </div>
          {activeCaseId === study.id && (
            <ChevronRight className="w-4 h-4 text-blue-500" />
          )}
        </button>
      ))}
    </div>
  </div>
);

// Featured metrics for a quick overview
const AggregatedMetrics = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">83%</div>
        <div className="text-sm text-gray-600 font-medium">Average Audience Growth</div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">40+<span className="text-xl">hrs</span></div>
        <div className="text-sm text-gray-600 font-medium">Weekly Hours Saved</div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">32%</div>
        <div className="text-sm text-gray-600 font-medium">Average Revenue Increase</div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
      >
        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4.2x</div>
        <div className="text-sm text-gray-600 font-medium">Engagement Boost</div>
      </motion.div>
    </div>
  );
};

// Enhanced metrics comparison with visual indicators
interface MetricsComparisonProps {
  beforeMetrics: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
  afterMetrics: {
    followers: string;
    engagement: string;
    leads: string;
    timeSpent: string;
  };
}

const MetricsComparison: React.FC<MetricsComparisonProps> = ({ beforeMetrics, afterMetrics }) => {
  // Helper to calculate percentage increase
  const calculateIncrease = (before: string, after: string): number => {
    const getNumericValue = (value: string): number => {
      // Extract numeric values from strings like "5.2K" or "12 hrs/week"
      const match = value.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    };
    
    const beforeNum = getNumericValue(before);
    const afterNum = getNumericValue(after);
    
    if (beforeNum === 0) return 100; // Avoid division by zero
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100);
  };
  
  // Helper to format the percentage for display
  const formatPercentage = (before: string, after: string): string => {
    const percentage = calculateIncrease(before, after);
    // If timeSpent, we typically want to show a reduction (negative percentage)
    if (before.includes('hr') && after.includes('hr')) {
      return `-${Math.abs(100 - percentage)}%`;
    }
    return `+${percentage}%`;
  };
  
  const metrics = [
    { 
      label: 'Followers', 
      before: beforeMetrics.followers, 
      after: afterMetrics.followers,
      icon: 'users'
    },
    { 
      label: 'Engagement', 
      before: beforeMetrics.engagement, 
      after: afterMetrics.engagement,
      icon: 'trending-up'
    },
    { 
      label: 'Lead Generation', 
      before: beforeMetrics.leads, 
      after: afterMetrics.leads,
      icon: 'bar-chart'
    },
    { 
      label: 'Time Investment', 
      before: beforeMetrics.timeSpent, 
      after: afterMetrics.timeSpent,
      icon: 'clock'
    },
  ];
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Transformation Results</h3>
      
      {metrics.map((metric, idx) => {
        const percentage = formatPercentage(metric.before, metric.after);
        const isPositive = !percentage.includes('-');
        const percentageValue = Math.abs(parseInt(percentage.replace(/[^0-9-]/g, '')));
        // Cap the bar width at 100% even for increases larger than 100%
        const barWidth = Math.min(100, percentageValue);
        
        return (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              {renderIcon({ icon: metric.icon as any, className: "w-5 h-5 text-blue-600" })}
              <h4 className="text-lg font-semibold text-gray-900">{metric.label}</h4>
              <span 
                className={cn(
                  "ml-auto px-3 py-1 rounded-full text-sm font-medium", 
                  isPositive 
                    ? "bg-green-100 text-green-700" 
                    : "bg-blue-100 text-blue-700"
                )}
              >
                {percentage}
              </span>
            </div>
            
            <div className="flex gap-6 items-center mb-6">
              <div className="w-1/2">
                <div className="text-sm text-gray-500 mb-1">Before</div>
                <div className="text-2xl font-bold text-gray-700">{metric.before}</div>
              </div>
              <div className="w-1/2">
                <div className="text-sm text-blue-600 mb-1">After</div>
                <div className="text-2xl font-bold text-blue-700">{metric.after}</div>
              </div>
            </div>
            
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                  "h-full rounded-full", 
                  isPositive ? "bg-green-500" : "bg-blue-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${barWidth}%` }}
                transition={{ duration: 1, delay: 0.1 * idx }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Related case studies component
const RelatedCaseStudies: React.FC<{
  currentStudy: CaseStudy;
  onSelectStudy: (id: string) => void;
}> = ({ currentStudy, onSelectStudy }) => {
  // Find related case studies based on industry, resultType, or tags
  const relatedStudies = caseStudies
    .filter(study => study.id !== currentStudy.id) // Exclude current case study
    .filter(study => 
      study.industry === currentStudy.industry || 
      study.resultType === currentStudy.resultType ||
      study.tags.some(tag => currentStudy.tags.includes(tag))
    )
    .slice(0, 3); // Limit to 3 related case studies
  
  if (relatedStudies.length === 0) return null;
  
  return (
    <div className="mt-12 pt-12 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also be interested in</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {relatedStudies.map((study) => (
          <div 
            key={study.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onSelectStudy(study.id)}
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={study.image} 
                alt={study.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 mb-1 w-fit">
                  {study.industry.charAt(0).toUpperCase() + study.industry.slice(1)} Coaching
                </div>
                <h3 className="text-lg font-semibold">{study.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {study.stats.slice(0, 1).map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {renderIcon({ icon: stat.icon, className: "w-3 h-3" })}
                    <span>{stat.value} {stat.label}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{study.challenge.substring(0, 80)}...</p>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-blue-700">
                  View Case Study <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for displaying a single case study in detail with improved accessibility
const CaseStudyDetail: React.FC<{
  study: CaseStudy;
  onBack: () => void;
  onNextCase: (id: string) => void;
  onPrevCase: (id: string) => void;
  hasNext: boolean;
  hasPrev: boolean;
}> = ({ study, onBack, onNextCase, onPrevCase, hasNext, hasPrev }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  
  // Track scroll position to update the active section
  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setScrollPosition(mainRef.current.scrollTop);
        
        // Determine which section is currently in view
        const sections = ['overview', 'challenge', 'solution', 'results'];
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };
    
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => {
        mainElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  // Focus management - focus the main content when opening detail view
  useEffect(() => {
    if (mainRef.current) {
      // Set focus to the main content area after a short delay
      // to allow for any animations to complete
      const timer = setTimeout(() => {
        mainRef.current?.focus();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [study.id]);
  
  // Content sections for the side navigation
  const sections = [
    { id: 'overview', label: 'Overview', icon: <BarChart className="w-4 h-4" /> },
    { id: 'challenge', label: 'Challenge', icon: <Calendar className="w-4 h-4" /> },
    { id: 'solution', label: 'Our Solution', icon: <Users className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <TrendingUp className="w-4 h-4" /> }
  ];
  
  // Scroll to section when clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && mainRef.current) {
      mainRef.current.scrollTo({
        top: section.offsetTop - 20,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
  };
  
  // Back to top button handler
  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // Keyboard navigation handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add keyboard shortcuts for navigation
    if (e.key === 'ArrowLeft' && hasPrev) {
      onPrevCase(study.id);
    } else if (e.key === 'ArrowRight' && hasNext) {
      onNextCase(study.id);
    } else if (e.key === 'Escape') {
      onBack();
    }
  };
  
  return (
    <div 
      className="min-h-screen bg-gray-50 relative" 
      role="region" 
      aria-label={`Case study details for ${study.name}`}
      onKeyDown={handleKeyDown}
    >
      {/* Skip to content link for better accessibility */}
      <a 
        href="#case-study-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-50 rounded-md"
      >
        Skip to case study content
      </a>
      
      {/* Sticky back button and navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-gray-600"
              onClick={onBack}
              aria-label="Back to all case studies"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all case studies
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasPrev}
                onClick={() => hasPrev && onPrevCase(study.id)}
                className={cn(!hasPrev && "opacity-50")}
                aria-label="Previous case study"
              >
                <span aria-hidden="true" className="mr-1">←</span> Previous
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasNext}
                onClick={() => hasNext && onNextCase(study.id)}
                className={cn(!hasNext && "opacity-50")}
                aria-label="Next case study"
              >
                Next <span aria-hidden="true" className="ml-1">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Side navigation - Only visible on larger screens */}
        <nav className="hidden lg:block lg:col-span-3" aria-label="Case study sections">
          <div className="sticky top-24">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-medium text-gray-900" id="nav-heading">Case Study Contents</h3>
              </div>
              <div className="py-2" role="navigation" aria-labelledby="nav-heading">
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={cn(
                          "w-full text-left px-4 py-3 flex items-center gap-2 transition-colors",
                          activeSection === section.id
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50 text-gray-700"
                        )}
                        onClick={() => scrollToSection(section.id)}
                        aria-current={activeSection === section.id ? 'true' : undefined}
                      >
                        {section.icon}
                        <span>{section.label}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-full text-center text-sm py-2 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-colors"
                    onClick={() => window.open('https://calendly.com/clycio/discovery', '_blank')}
                    aria-label="Book a call with us"
                  >
                    Book a Call
                  </Button>
                  <Button
                    className="w-full text-center text-sm py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    onClick={scrollToTop}
                    aria-label="Back to top of case study"
                  >
                    Back to Top
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main content area */}
        <div 
          className="col-span-12 lg:col-span-9 overflow-y-auto focus:outline-none" 
          ref={mainRef}
          style={{ maxHeight: 'calc(100vh - 136px)' }}
          tabIndex={0}
          id="case-study-content"
          role="main"
          aria-labelledby="case-study-title"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden pb-12">
            {/* Hero image */}
            <div className="w-full h-80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10 z-0"></div>
              <img 
                src={study.image} 
                alt={`${study.name}, ${study.title}`} 
                className="w-full h-full object-cover"
                aria-hidden="true" // Decorative image with text overlaid
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="mb-2">
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    {study.industry.charAt(0).toUpperCase() + study.industry.slice(1)} Coaching
                  </span>
                </div>
                <h1 id="case-study-title" className="text-3xl md:text-4xl font-bold mb-1">{study.name}</h1>
                <p className="text-xl opacity-90">{study.title}</p>
              </div>
            </div>
            
            {/* Content sections */}
            <div className="p-8">
              {/* Overview section with share and bookmark */}
              <section id="overview" className="mb-16" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="sr-only">Overview</h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img 
                        src={study.avatarUrl || study.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                        aria-hidden="true" // Decorative, name already in heading
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{study.name}</h2>
                      <p className="text-blue-600">{study.title}</p>
                    </div>
                  </div>
                  
                  {/* Add share and bookmark buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <BookmarkButton studyId={study.id} />
                    <SocialShareButtons study={study} className="hidden md:flex" />
                  </div>
                </div>
                
                <figure className="relative pl-8 mb-8">
                  <Quote className="absolute top-0 left-0 w-6 h-6 text-blue-300" aria-hidden="true" />
                  <blockquote className="text-xl text-gray-700 italic">{study.quote}</blockquote>
                </figure>
                
                {/* Key metrics */}
                <div className="grid md:grid-cols-3 gap-4 mb-10" aria-label="Key metrics">
                  {study.stats.map((stat, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-2 text-blue-600">
                        {renderIcon({ icon: stat.icon, className: "w-5 h-5" })}
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile sharing buttons */}
                <div className="md:hidden mb-6">
                  <SocialShareButtons study={study} />
                </div>
                
                {/* Transformation time */}
                {study.transformationTime && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Transformation Time:</span>
                      <span className="text-sm font-medium text-blue-600">{study.transformationTime}</span>
                    </div>
                    <div 
                      className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
                      role="progressbar" 
                      aria-valuemin={0} 
                      aria-valuemax={100} 
                      aria-valuenow={100}
                      aria-label={`Transformation time: ${study.transformationTime}`}
                    >
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6" aria-label="Related topics">
                  {study.tags.map((tag, idx) => (
                    <span key={idx} className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
              
              {/* Challenge section */}
              <section id="challenge" className="mb-16" aria-labelledby="challenge-heading">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 id="challenge-heading" className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                </div>
                
                {/* Before metrics if available */}
                {study.beforeMetrics && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Before Working With Us</h3>
                    <div className="grid md:grid-cols-4 gap-4" role="list" aria-label="Metrics before our intervention">
                      <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                        <h4 className="text-sm text-gray-500 mb-2">Followers</h4>
                        <div className="text-xl font-bold text-gray-700">{study.beforeMetrics.followers}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                        <h4 className="text-sm text-gray-500 mb-2">Engagement</h4>
                        <div className="text-xl font-bold text-gray-700">{study.beforeMetrics.engagement}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                        <h4 className="text-sm text-gray-500 mb-2">Lead Generation</h4>
                        <div className="text-xl font-bold text-gray-700">{study.beforeMetrics.leads}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                        <h4 className="text-sm text-gray-500 mb-2">Time Investment</h4>
                        <div className="text-xl font-bold text-gray-700">{study.beforeMetrics.timeSpent}</div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
              
              {/* Solution section */}
              <section id="solution" className="mb-16" aria-labelledby="solution-heading">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 id="solution-heading" className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h2>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>
                </div>
              </section>
              
              {/* Results section with enhanced visualization */}
              <section id="results" className="mb-16" aria-labelledby="results-heading">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 id="results-heading" className="text-2xl font-bold text-gray-900 mb-4">The Results</h2>
                    <p className="text-gray-700">{study.results}</p>
                  </div>
                </div>
                
                {/* Replace the static metrics with our new interactive visualization */}
                {study.beforeMetrics && study.afterMetrics && (
                  <div className="mt-8">
                    <MetricsComparison 
                      beforeMetrics={study.beforeMetrics} 
                      afterMetrics={study.afterMetrics}
                    />
                  </div>
                )}
              </section>
              
              {/* Social proof section */}
              {study.socialPosts && study.socialPosts.length > 0 && (
                <section id="social-proof" className="mb-16" aria-labelledby="social-proof-heading">
                  <h2 id="social-proof-heading" className="text-2xl font-bold text-gray-900 mb-6">Content Examples</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Social media content examples">
                    {study.socialPosts.map((post, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden" role="listitem">
                        <div className="flex items-center px-4 py-3 border-b border-gray-100">
                          {post.platform === 'instagram' && <Instagram className="w-4 h-4 text-pink-500" aria-hidden="true" />}
                          {post.platform === 'linkedin' && <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />}
                          {post.platform === 'twitter' && <Twitter className="w-4 h-4 text-blue-400" aria-hidden="true" />}
                          <span className="ml-2 text-sm font-medium">{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</span>
                          <span className="ml-auto text-xs text-gray-500">{post.date}</span>
                        </div>
                        {post.image && (
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={`${post.platform} post visual`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{post.engagement.likes.toLocaleString()} likes</span>
                            <span>{post.engagement.comments.toLocaleString()} comments</span>
                            {post.engagement.shares && <span>{post.engagement.shares.toLocaleString()} shares</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Add related case studies section */}
              <RelatedCaseStudies 
                currentStudy={study}
                onSelectStudy={(id) => {
                  // Smooth transition
                  if (mainRef.current) {
                    mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  // Short delay to allow scroll before changing study
                  setTimeout(() => {
                    if (id === study.id) return;
                    onNextCase(id);
                  }, 300);
                }}
              />
              
              {/* Call to action with sharing */}
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mt-12"
                role="complementary"
                aria-label="Call to action"
              >
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold mb-4">Achieve Similar Results For Your Business</h2>
                  <p className="text-blue-100 mb-6">
                    We've helped {study.name} and many other coaches and consultants transform their online presence.
                    Book a free strategy call to see how we can help you.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      size="lg"
                      onClick={() => window.open('https://calendly.com/clycio/discovery', '_blank')}
                      aria-label="Book a free strategy call - opens in a new tab"
                    >
                      Book a Free Strategy Call
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Button>
                    
                    {/* Add share buttons in CTA too */}
                    <div className="bg-blue-500/30 backdrop-blur-sm rounded-full py-1.5 px-3">
                      <SocialShareButtons 
                        study={study} 
                        className="text-white [&_a]:bg-white/10 [&_a:hover]:bg-white/20 [&_button]:bg-white/10 [&_button:hover]:bg-white/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating back to top button - only visible when scrolled down and on mobile */}
      {scrollPosition > 300 && (
        <div className="lg:hidden fixed right-4 bottom-4 z-20">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-white shadow-md border border-gray-200"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <ArrowRight className="w-5 h-5 rotate-[-90deg]" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Featured Case Study component
const FeaturedCaseStudy: React.FC<{
  study: CaseStudy;
  onSelect: (id: string) => void;
}> = ({ study, onSelect }) => {
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

// "More Case Studies" section with a different layout
const MoreCaseStudies: React.FC<{
  studies: CaseStudy[];
  onSelect: (id: string) => void;
}> = ({ studies, onSelect }) => {
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
        {studies.slice(0, 3).map((study) => (
          <div 
            key={study.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(study.id)}
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

// Inline the CaseStudiesExplainer component instead of importing it
const CaseStudiesExplainer: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find the Perfect Case Study</h2>
          <p className="text-gray-600 mb-6">
            We've transformed social media presence for coaches and consultants across various niches.
            Use our filtering system to find case studies that match your specific needs and goals.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Filter className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Filter by Industry</h3>
                <p className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-600">
                  Sort by metrics that matter most to you, like transformation time or percentage growth.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* Animated filter UI mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full flex flex-col"
          >
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <div className="w-full h-10 rounded-md bg-white border border-gray-200 pl-10 flex items-center text-gray-500 text-sm">
                  Search case studies...
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Industry</h4>
              <div className="flex flex-wrap gap-2">
                {['Health', 'Business', 'Lifestyle', 'Fitness', 'Career'].map((industry) => (
                  <div 
                    key={industry}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                      industry === 'Business' 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Result Type</h4>
              <div className="flex flex-wrap gap-2">
                {['Audience Growth', 'Revenue', 'Time Saved', 'Engagement'].map((result) => (
                  <div 
                    key={result}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                      result === 'Revenue' 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <Button 
                className="w-full justify-between" 
                variant="outline"
              >
                <span>Sort by: Transformation Time</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Add social sharing component
const SocialShareButtons: React.FC<{ 
  study: CaseStudy;
  className?: string;
}> = ({ study, className }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate share URLs
  const title = `Case Study: ${study.name} - ${study.title}`;
  const description = `See how ${study.name} achieved ${study.stats[0].value} ${study.stats[0].label.toLowerCase()} with our help.`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this case study I found: ${description} ${currentUrl}`)}`;
  
  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      
      <a 
        href={facebookUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      <a 
        href={linkedinUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      
      <a 
        href={mailtoUrl}
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors relative"
        aria-label="Copy link to clipboard"
      >
        <Share2 className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
};

// Main CaseStudies page component
const CaseStudies = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simulate loading state for demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const selectedStudy = selectedStudyId 
    ? caseStudies.find(study => study.id === selectedStudyId) 
    : null;
  
  // Get next and previous case studies for navigation
  const currentIndex = selectedStudyId 
    ? caseStudies.findIndex(study => study.id === selectedStudyId)
    : -1;
    
  const getNextCaseId = () => {
    if (currentIndex === -1 || currentIndex === caseStudies.length - 1) return null;
    return caseStudies[currentIndex + 1].id;
  };
  
  const getPrevCaseId = () => {
    if (currentIndex === -1 || currentIndex === 0) return null;
    return caseStudies[currentIndex - 1].id;
  };
  
  const handleNextCase = () => {
    const nextId = getNextCaseId();
    if (nextId) setSelectedStudyId(nextId);
  };
  
  const handlePrevCase = () => {
    const prevId = getPrevCaseId();
    if (prevId) setSelectedStudyId(prevId);
  };
  
  // Get featured case studies
  const featuredStudies = getFeaturedCaseStudies();
  const firstFeatured = featuredStudies.length > 0 ? featuredStudies[0] : null;
  
  // Get more case studies (different from the featured one)
  const moreCaseStudies = caseStudies
    .filter(study => study.id !== firstFeatured?.id)
    .filter(study => study.resultType === 'revenue' || study.resultType === 'time')
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {selectedStudy ? (
        // DETAILED CASE STUDY VIEW
        <CaseStudyDetailSection 
          study={selectedStudy}
          onBack={() => setSelectedStudyId(null)}
          onNextCase={handleNextCase}
          onPrevCase={handlePrevCase}
          hasNext={!!getNextCaseId()}
          hasPrev={!!getPrevCaseId()}
        />
      ) : (
        // GALLERY VIEW
        <div className="pt-20 pb-20">
          {/* Hero Section */}
          <CaseStudiesHeroSection />
          
          {/* Featured Case Study Section */}
          <FeaturedCaseStudySection 
            study={firstFeatured} 
            onSelectStudy={setSelectedStudyId} 
          />
          
          {/* Gallery Title Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Browse All Case Studies
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Filter and sort through our comprehensive collection of success stories to find the most relevant examples for your business.
              </p>
            </div>
          </section>
          
          {/* Main Gallery Section */}
          <MainGallerySection 
            onSelectStudy={setSelectedStudyId}
            loading={loading}
          />
          
          {/* More Case Studies Section */}
          <div className="container mx-auto px-4">
            <MoreCaseStudiesSection 
              studies={moreCaseStudies}
              onSelectStudy={setSelectedStudyId}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
