import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Users, Filter, Search, Award, Star, CheckCircle, BarChart, MessageSquare, Instagram, Facebook, Twitter, Linkedin, PlaySquare, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { keepForLater } from '@/utils/types';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { caseStudies, CaseStudy, Industry, ResultType } from '@/data/caseStudies';
import { renderIcon } from '@/utils/iconUtils';

// Prevent TypeScript warnings
keepForLater(Link);

// You can use the Link variable by adding a type annotation that references it
type LinkComponentType = typeof Link;
// Now Link is "used" for TypeScript purposes

// Case Study Modal Component using Portal for better DOM management
interface CaseStudyModalProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ study, isOpen, onClose }: CaseStudyModalProps) => {
  // Exit early if no study or not open
  if (!study || !isOpen) return null;
  
  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle focus management when modal opens
  useEffect(() => {
    // Store the previously focused element to restore focus when modal closes
    const previousActiveElement = document.activeElement as HTMLElement;
    
    // Focus the close button when modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    
    // Focus trap to keep keyboard focus inside modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        // Get all focusable elements within the modal
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Convert NodeList to Array for easier manipulation
        const focusableArray = Array.from(focusableElements);
        
        // If there are no focusable elements, do nothing
        if (focusableArray.length === 0) return;
        
        // Get first and last focusable elements
        const firstElement = focusableArray[0] as HTMLElement;
        const lastElement = focusableArray[focusableArray.length - 1] as HTMLElement;
        
        // Check if shift key is pressed
        if (e.shiftKey) {
          // If focusing the first element and shift+tab is pressed, move to the last element
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // If focusing the last element and tab is pressed, move to the first element
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    // Add event listener for tab key
    document.addEventListener('keydown', handleTabKey);
    
    return () => {
      // Remove event listener and restore focus when component unmounts
      document.removeEventListener('keydown', handleTabKey);
      if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen]);
  
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Using createPortal to render outside the main DOM tree
  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      aria-modal="true" 
      role="dialog"
      aria-labelledby={`case-study-${study.id}-title`}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className="fixed inset-0 overflow-hidden flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b sticky top-0 z-10 bg-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                <img src={study.image} alt={study.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 id={`case-study-${study.id}-title`} className="text-xl font-bold text-gray-900">{study.name}</h2>
                <p className="text-sm text-gray-500">{study.title}</p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Scrollable Content Area */}
          <div className="overflow-y-auto flex-1 overscroll-behavior-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="p-6">
              {/* Key Results Section */}
              <div className="bg-blue-50 p-5 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart className="w-4 h-4 mr-2 text-primary-600" />
                  Key Results
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {study.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 text-primary-600 mb-2">
                        {renderIcon({ icon: stat.icon })}
                        <span className="text-xs font-medium">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Before & After Comparisons - Moved to top as requested */}
              {study.beforeAfter && study.beforeAfter.length > 0 && (
                <div className="visual-evidence-section mb-6">
                  <div className="visual-evidence-header">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-primary-600" />
                      Before & After
                    </h3>
                  </div>
                  <div className="visual-evidence-content">
                    <div className="space-y-6">
                      {study.beforeAfter.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">{item.metric}</h4>
                          <div className="before-after-container">
                            <div className="before-after-card">
                              <div className="before-after-header bg-gray-100">Before: {item.before.date}</div>
                              {item.before.image && (
                                <img 
                                  src={item.before.image} 
                                  alt={`${item.metric} before`} 
                                  className="before-after-image" 
                                />
                              )}
                              <div className="p-3 text-center">
                                <span className="text-xl font-bold text-gray-700">{item.before.value}</span>
                              </div>
                            </div>
                            
                            <div className="before-after-card">
                              <div className="before-after-header bg-green-50 text-green-800">After: {item.after.date}</div>
                              {item.after.image && (
                                <img 
                                  src={item.after.image} 
                                  alt={`${item.metric} after`} 
                                  className="before-after-image" 
                                />
                              )}
                              <div className="p-3 text-center">
                                <span className="text-xl font-bold text-primary-600">{item.after.value}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Website Metrics */}
              {study.websiteMetrics && study.websiteMetrics.length > 0 && (
                <div className="visual-evidence-section mb-6">
                  <div className="visual-evidence-header">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <BarChart className="w-4 h-4 mr-2 text-primary-600" />
                      Website Performance
                    </h3>
                  </div>
                  <div className="visual-evidence-content">
                    <div className="metrics-grid">
                      {study.websiteMetrics.map((metric, idx) => (
                        <div key={idx} className="metric-card">
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.name}</div>
                          <div className={`text-xs mt-1 font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Social Media Metrics */}
              {study.socialMetrics && study.socialMetrics.length > 0 && (
                <div className="visual-evidence-section mb-6">
                  <div className="visual-evidence-header">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary-600" />
                      Social Media Growth
                    </h3>
                  </div>
                  <div className="visual-evidence-content">
                    <div className="metrics-grid">
                      {study.socialMetrics.map((metric, idx) => (
                        <div key={idx} className="metric-card">
                          <div className="metric-value">{metric.value}</div>
                          <div className="metric-label">{metric.name}</div>
                          <div className={`text-xs mt-1 font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Social Posts */}
              {study.socialPosts && study.socialPosts.length > 0 && (
                <div className="visual-evidence-section mb-6">
                  <div className="visual-evidence-header">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-primary-600" />
                      Social Media Content
                    </h3>
                  </div>
                  <div className="visual-evidence-content">
                    <div className="grid md:grid-cols-2 gap-4">
                      {study.socialPosts.map((post, idx) => (
                        <div key={idx} className="social-post">
                          <div className="social-post-header">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-primary-600">
                              {post.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                              {post.platform === 'facebook' && <Facebook className="w-4 h-4" />}
                              {post.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                              {post.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                              {post.platform === 'tiktok' && <PlaySquare className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-medium">{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</div>
                              <div className="text-xs text-gray-500">{post.date}</div>
                            </div>
                          </div>
                          
                          {post.image && (
                            <div className="my-2 overflow-hidden">
                              <img src={post.image} alt="Social media post" className="w-full h-40 object-cover" />
                            </div>
                          )}
                          
                          <div className="social-post-content">
                            {post.content}
                          </div>
                          
                          <div className="social-post-stats">
                            <span>{post.engagement.likes.toLocaleString()} likes</span>
                            <span>{post.engagement.comments.toLocaleString()} comments</span>
                            {post.engagement.shares && <span>{post.engagement.shares.toLocaleString()} shares</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Videos */}
              {study.videos && study.videos.length > 0 && (
                <div className="visual-evidence-section mb-6">
                  <div className="visual-evidence-header">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Play className="w-4 h-4 mr-2 text-primary-600" />
                      Videos
                    </h3>
                  </div>
                  <div className="visual-evidence-content">
                    <div className="space-y-4">
                      {study.videos.map((video, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">{video.title}</h4>
                          <div className="aspect-video bg-gray-100 relative overflow-hidden rounded-lg">
                            <iframe 
                              src={video.embedUrl} 
                              title={video.title}
                              className="absolute inset-0 w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{video.duration}</span>
                            {video.views && <span>{video.views.toLocaleString()} views</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Challenge, Solution, Results Sections - Moved to bottom as requested */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 text-xs">1</span>
                  The Challenge
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-400">
                  <p className="text-gray-700 text-sm">{study.challenge}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2 text-xs">2</span>
                  Our Solution
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-400">
                  <p className="text-gray-700 text-sm">{study.solution}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">3</span>
                  Results
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-400">
                  <p className="text-gray-700 text-sm">{study.results}</p>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="bg-primary-50 p-4 rounded-lg mb-6">
                <div className="text-gray-700 text-sm italic relative pl-6">
                  <span className="absolute left-0 top-0 text-primary-400 text-3xl font-serif">"</span>
                  <p className="text-gray-800">{study.quote}</p>
                  <div className="mt-2 font-medium text-gray-900 not-italic">— {study.name}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer with CTA Button */}
          <div className="p-5 border-t bg-white sticky bottom-0 w-full z-10 flex justify-end items-center gap-4">
            <a 
              href="https://calendly.com/clycio/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book a Strategy Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
};

export const CaseStudiesSection = (): JSX.Element => {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('all');
  const [activeResultType, setActiveResultType] = useState<ResultType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Store scroll position in a ref for persistence between renders
  const scrollPositionRef = useRef<number>(0);

  // Dedicated functions for opening and closing modal to ensure consistent handling
  const openModal = (studyId: string) => {
    setExpandedStudy(studyId);
  };
  
  const closeModal = () => {
    setExpandedStudy(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedStudy) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedStudy]);

  // Calculate scrollbar width for proper padding when modal is open
  useEffect(() => {
    // Only run once on component mount
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  useEffect(() => {
    // Simple animation trigger after component mounts
    setIsInView(true);
  }, []);

  // Aggregate results data
  const aggregatedResults = {
    audienceGrowth: '83%',
    timeSaved: '40+',
    revenueIncrease: '32%',
    engagementBoost: '4.2x'
  };

  // Filter case studies based on active filters and search term
  const filteredStudies = caseStudies.filter(study => {
    const matchesIndustry = activeIndustry === 'all' || study.industry === activeIndustry;
    const matchesResultType = activeResultType === 'all' || study.resultType === activeResultType;
    const matchesSearch = searchTerm === '' || 
      study.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesIndustry && matchesResultType && matchesSearch;
  });

  // Get featured case studies
  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Results-focused Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6">
            <BarChart className="w-4 h-4 mr-2" />
            Proven Results
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Transformative <span className="text-primary-600">Results</span> for Coaches & Creators
          </h1>
          
          <p className="text-xl text-gray-600 mb-12">
            Our AI content solutions deliver measurable impact that grows your audience, 
            saves time, and increases revenue.
          </p>
          
          {/* Average Results Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{aggregatedResults.audienceGrowth}</div>
              <div className="text-sm text-gray-600 font-medium">Average Audience Growth</div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '83%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary-500 rounded-full"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{aggregatedResults.timeSaved}<span className="text-xl">hrs</span></div>
              <div className="text-sm text-gray-600 font-medium">Weekly Hours Saved</div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '75%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{aggregatedResults.revenueIncrease}</div>
              <div className="text-sm text-gray-600 font-medium">Average Revenue Increase</div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '62%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{aggregatedResults.engagementBoost}</div>
              <div className="text-sm text-gray-600 font-medium">Engagement Multiplier</div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '84%' } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Introduction to Case Studies */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how coaches across industries have transformed their businesses with our AI-powered content solutions.
          </p>
        </div>

        {/* Featured case studies (large cards) */}
        {featuredStudies.length > 0 && (
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-10">
              {featuredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    {/* Hero section with gradient overlay */}
                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                      {/* Placeholder for case study image */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-600/20 to-primary-600/5">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="relative z-10 text-white text-xl font-bold">
                          {study.name}
                        </div>
                      </div>
                      
                      {/* Featured badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-amber-500 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      </div>
                      
                      {/* Primary result highlight */}
                      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                            {renderIcon({ icon: study.stats[0].icon })}
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 font-medium">{study.stats[0].label}</div>
                            <div className="text-xl font-bold text-primary-600">{study.stats[0].value}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-1 text-gray-900">{study.name}</h3>
                          <p className="text-primary-600 font-medium">{study.title}</p>
                        </div>
                      </div>
                      
                      {/* Results Summary - 3 key stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {study.stats.map((stat, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-1.5 text-primary-600 mb-1">
                              {renderIcon({ icon: stat.icon })}
                              <span className="text-xs font-medium">{stat.label}</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Challenge summary with visual indicator */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 pl-3">The Challenge:</h4>
                        <p className="text-gray-600 text-sm line-clamp-2 pl-3">{study.challenge}</p>
                      </div>
                      
                      {/* Quick result highlight with icon */}
                      <div className="flex items-start gap-3 mb-6">
                        <div className="flex-shrink-0 rounded-full bg-green-100 p-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-sm text-gray-700">
                          {study.results.split('.')[0]}.
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {study.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {study.tags.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              +{study.tags.length - 2} more
                            </span>
                          )}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="text-primary-600 border-primary-200 hover:bg-primary-50"
                          onClick={() => openModal(study.id)}
                        >
                          Read Full Story
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filters Section - We'll keep the same filter functionality but improve the styling */}
        <div className="bg-gray-50 p-8 rounded-xl mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-5 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary-600" />
                <h3 className="font-medium text-gray-900">Filter Results By:</h3>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Industry:</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveIndustry('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'all' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    All Industries
                  </button>
                  <button
                    onClick={() => setActiveIndustry('life')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'life' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Life Coaching
                  </button>
                  <button
                    onClick={() => setActiveIndustry('business')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'business' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setActiveIndustry('health')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'health' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Health & Wellness
                  </button>
                  <button
                    onClick={() => setActiveIndustry('career')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'career' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Career
                  </button>
                  <button
                    onClick={() => setActiveIndustry('relationship')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeIndustry === 'relationship' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Relationship
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Result Type:</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveResultType('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeResultType === 'all' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    All Results
                  </button>
                  <button
                    onClick={() => setActiveResultType('audience')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeResultType === 'audience' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Audience Growth
                  </button>
                  <button
                    onClick={() => setActiveResultType('time')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeResultType === 'time' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Time Saved
                  </button>
                  <button
                    onClick={() => setActiveResultType('engagement')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeResultType === 'engagement' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Engagement
                  </button>
                  <button
                    onClick={() => setActiveResultType('revenue')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeResultType === 'revenue' 
                        ? "bg-primary-600 text-white shadow-sm" 
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    )}
                  >
                    Revenue
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search case studies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results counter with subtle style improvement */}
        <div className="mb-8 flex items-center text-gray-600">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
          Showing <span className="font-medium text-gray-900 mx-1">{filteredStudies.length}</span> 
          {filteredStudies.length === 1 ? 'result' : 'results'}
        </div>

        {/* Case studies grid - redesigned for better results focus */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {/* Gradient overlay on image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-700/10 to-primary-500/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="relative z-10 text-white text-lg font-medium">
                    {study.name}
                  </div>
                </div>
                
                {/* Result highlight */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm text-primary-600 font-bold py-1 px-3 rounded-full text-sm shadow-md flex items-center">
                    {renderIcon({ icon: study.stats[0].icon })}
                    <span className="ml-1">{study.stats[0].value}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{study.name}</h3>
                  <p className="text-primary-600 text-sm font-medium">{study.title}</p>
                </div>
                
                {/* Key results at a glance */}
                <div className="flex gap-2 mb-4">
                  {study.stats.slice(0, 2).map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 px-2 py-1 rounded flex items-center gap-1 text-xs">
                      {renderIcon({ icon: stat.icon })}
                      <span className="font-medium text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Challenge with left border accent */}
                <div className="relative mb-5 pl-3 flex-grow">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary-200 rounded-full"></div>
                  <p className="text-gray-600 text-sm line-clamp-3">{study.challenge}</p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                    onClick={() => openModal(study.id)}
                  >
                    View Results
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state - enhanced design */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-sm">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">No results found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't find any case studies matching your current filters and search criteria.</p>
            <Button 
              variant="outline" 
              className="border-primary-200 text-primary-600 hover:bg-primary-50"
              onClick={() => {
                setActiveIndustry('all');
                setActiveResultType('all');
                setSearchTerm('');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
        
        {/* Case Study Detail Modal */}
        <AnimatePresence>
          {expandedStudy && (
            <CaseStudyModal 
              study={caseStudies.find(s => s.id === expandedStudy) || null} 
              isOpen={!!expandedStudy} 
              onClose={closeModal} 
            />
          )}
        </AnimatePresence>
        
        {/* Call to action - enhanced with stronger results focus */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Join Our Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
            <p className="text-primary-100 mb-8 text-lg">
              Our AI-powered solutions have helped coaches increase audience growth by 83% and save 40+ hours weekly. 
              Book a strategy call to learn how we can help you achieve similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary-700 hover:bg-primary-50 font-medium px-6 py-3 text-base">
                Book a Strategy Call
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 text-base"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
