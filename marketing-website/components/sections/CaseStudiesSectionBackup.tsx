import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp, Users, Filter, Search, Award, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { keepForLater } from '@/utils/types';
import { Link } from 'react-router-dom';

// Prevent TypeScript warnings
keepForLater(Link);

// You can use the Link variable by adding a type annotation that references it
type LinkComponentType = typeof Link;
// Now Link is "used" for TypeScript purposes

type Industry = 'all' | 'life' | 'business' | 'health' | 'career' | 'relationship';
type ResultType = 'all' | 'audience' | 'time' | 'engagement' | 'revenue';

type CaseStudy = {
  id: string;
  name: string;
  title: string;
  industry: Industry;
  resultType: ResultType;
  image: string;
  logo: string;
  stats: {
    value: string;
    label: string;
    icon: JSX.Element;
  }[];
  challenge: string;
  solution: string;
  results: string;
  quote: string;
  tags: string[];
  featured?: boolean;
};

export const CaseStudiesSection = (): JSX.Element => {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('all');
  const [activeResultType, setActiveResultType] = useState<ResultType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  // Complete case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Life Coach & Bestselling Author',
      industry: 'life',
      resultType: 'audience',
      image: '/case-studies/sarah.jpg',
      logo: '/case-studies/sarah-logo.svg',
      stats: [
        { value: '350%', label: 'Audience Growth', icon: <Users className="w-4 h-4" /> },
        { value: '8hrs', label: 'Weekly Time Saved', icon: <Clock className="w-4 h-4" /> },
        { value: '2.4x', label: 'Social Media Engagement', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      challenge: 'Sarah had built a successful career as a life coach and published a bestselling book, but struggled to maintain a consistent content creation schedule while managing her growing client base. She needed to scale her online presence without sacrificing the quality of her coaching.',
      solution: 'We implemented a custom AI content strategy that captured Sarah\'s unique voice and coaching methodology. The system was trained on her book, past content, and coaching sessions to create authentic posts, newsletters, and video scripts that truly represented her philosophy.',
      results: 'Within 6 months, Sarah\'s audience grew by 350%. She reclaimed 8 hours per week previously spent on content creation, allowing her to take on 5 additional high-value clients. Her social media engagement more than doubled, and her newsletter open rate increased from 22% to 38%.',
      quote: "Working with Zane transformed my online presence. I'm reaching more people than ever while spending less time on content creation. My audience can't tell the difference between my AI-generated content and what I write myself—it's that authentic.",
      tags: ['life coaching', 'author', 'social media', 'newsletter'],
      featured: true
    },
    {
      id: 'marcus-fernandez',
      name: 'Marcus Fernandez',
      title: 'Business Coach',
      industry: 'business',
      resultType: 'time',
      image: '/case-studies/marcus.jpg',
      logo: '/case-studies/marcus-logo.svg',
      stats: [
        { value: '12hrs', label: 'Weekly Time Saved', icon: <Clock className="w-4 h-4" /> },
        { value: '100%', label: 'Client Roster Increase', icon: <Users className="w-4 h-4" /> },
        { value: '45%', label: 'Revenue Growth', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      challenge: 'Marcus had hit a growth ceiling with his business coaching practice. He was spending up to 15 hours weekly creating content for social media, his blog, and his newsletter, which limited his ability to take on more clients.',
      solution: 'We developed an AI content ecosystem that integrated with Marcus\'s existing tools. The system was designed to produce strategic business insights in his voice across multiple platforms, while also creating personalized follow-up content for his clients.',
      results: 'Marcus reclaimed 12 hours per week, allowing him to double his client roster. His revenue increased by 45% within 4 months, and his content actually became more consistent and strategic as the AI system learned his coaching patterns.',
      quote: "The AI solution allowed me to double my client roster because I wasn't spending all my time creating content. The ROI was almost immediate, and my clients receive more consistent value than ever before.",
      tags: ['business coaching', 'time management', 'scaling', 'revenue growth']
    },
    {
      id: 'elena-chen',
      name: 'Elena Chen',
      title: 'Health & Wellness Coach',
      industry: 'health',
      resultType: 'engagement',
      image: '/case-studies/elena.jpg',
      logo: '/case-studies/elena-logo.svg',
      stats: [
        { value: '248%', label: 'Engagement Increase', icon: <TrendingUp className="w-4 h-4" /> },
        { value: '35%', label: 'Program Enrollment Growth', icon: <Users className="w-4 h-4" /> },
        { value: '10hrs', label: 'Weekly Time Saved', icon: <Clock className="w-4 h-4" /> }
      ],
      challenge: 'Elena\'s wellness coaching business required constant, engaging content across multiple platforms. Despite hiring a part-time assistant, she struggled to create content that resonated with her audience while staying scientifically accurate and aligned with her coaching philosophy.',
      solution: 'We implemented an AI system trained specifically on health and wellness content, as well as Elena\'s unique approach. The system was designed to create scientifically sound content that maintained her empathetic, supportive tone across Instagram, TikTok, her blog, and her newsletter.',
      results: 'Elena\'s engagement metrics increased by 248%, with significantly higher comments, shares, and saves. Enrollment in her signature wellness program grew by 35%, and she was able to reduce her content creation time from 12 hours to just 2 hours per week, while increasing her output.',
      quote: "My audience connects with my content more than ever, and it perfectly captures my voice and expertise. The AI has helped me reach people in a way that feels completely authentic while giving me back so much time to focus on my clients.",
      tags: ['health coaching', 'wellness', 'engagement', 'social media'],
      featured: true
    },
    {
      id: 'james-peterson',
      name: 'James Peterson',
      title: 'Career Transition Coach',
      industry: 'career',
      resultType: 'revenue',
      image: '/case-studies/james.jpg',
      logo: '/case-studies/james-logo.svg',
      stats: [
        { value: '86%', label: 'Revenue Increase', icon: <TrendingUp className="w-4 h-4" /> },
        { value: '3x', label: 'Lead Generation', icon: <Users className="w-4 h-4" /> },
        { value: '62%', label: 'Content Production Increase', icon: <Clock className="w-4 h-4" /> }
      ],
      challenge: 'James specialized in helping professionals transition to new career paths, but his own content strategy was inconsistent. He knew his expertise could help more people, but he couldn\'t produce enough quality content to reach them effectively.',
      solution: 'We created a comprehensive AI content strategy focusing on LinkedIn and email marketing. The system generated in-depth career transition advice, success stories, and industry insights that positioned James as a thought leader in his field.',
      results: 'James saw an 86% increase in revenue within 5 months as his inbound leads tripled. His content production increased by 62% while requiring less of his direct input, and his LinkedIn following grew from 3,500 to over 15,000.',
      quote: "The ROI on this investment has been extraordinary. I'm reaching more people with more valuable content, and my business has completely transformed. The AI captures nuances in career advice that I didn't think was possible.",
      tags: ['career coaching', 'LinkedIn', 'thought leadership', 'revenue growth']
    },
    {
      id: 'michelle-wong',
      name: 'Michelle Wong',
      title: 'Relationship Coach',
      industry: 'relationship',
      resultType: 'audience',
      image: '/case-studies/michelle.jpg',
      logo: '/case-studies/michelle-logo.svg',
      stats: [
        { value: '215%', label: 'Audience Growth', icon: <Users className="w-4 h-4" /> },
        { value: '5x', label: 'Content Output', icon: <Clock className="w-4 h-4" /> },
        { value: '78%', label: 'Workshop Enrollment Increase', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      challenge: 'Michelle\'s relationship coaching business required sensitive, nuanced content that she struggled to delegate to assistants or traditional content creators. Her expertise was valuable, but she couldn\'t scale her message effectively.',
      solution: 'We developed an AI system specifically trained to handle the sensitivity and nuance of relationship content. The system was calibrated to Michelle\'s compassionate approach and created content for her podcast, blog, and social media channels.',
      results: 'Michelle\'s audience grew by 215% across platforms within 7 months. She was able to increase her content output 5x while maintaining the sensitive, thoughtful approach her audience valued. Enrollment in her signature relationship workshops increased by 78%.',
      quote: "I was skeptical that AI could handle the emotional nuance my content requires, but I've been amazed by the results. The content is sensitive, thoughtful, and completely aligned with my coaching philosophy—and my audience is responding.",
      tags: ['relationship coaching', 'sensitivity', 'podcasting', 'workshops']
    }
  ];

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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real Results from Real <span className="text-primary-600">Coaches</span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover how coaches across industries have transformed their businesses with our AI-powered content solutions.
          </p>
        </div>

        {/* Featured case studies (large cards) */}
        {featuredStudies.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredStudies.map(study => (
                <motion.div
                key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    {/* Placeholder for case study image */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400">
                      {study.name} Photo
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-amber-500 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-gray-900">{study.name}</h3>
                        <p className="text-primary-600 font-medium">{study.title}</p>
                      </div>
                      {/* Placeholder for logo */}
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
                        Logo
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.stats.map((stat, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-1.5 text-primary-600 mb-1">
                            {stat.icon}
                            <span className="text-sm font-medium">{stat.label}</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">{study.challenge}</p>
                    
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
                        onClick={() => setExpandedStudy(study.id)}
                      >
                        Read Story
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-50 p-6 rounded-xl mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-4 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <h3 className="font-medium text-gray-900">Filter by:</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveIndustry('all')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'all' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  All Industries
                </button>
                <button
                  onClick={() => setActiveIndustry('life')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'life' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Life Coaching
                </button>
                <button
                  onClick={() => setActiveIndustry('business')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'business' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Business
                </button>
                <button
                  onClick={() => setActiveIndustry('health')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'health' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Health & Wellness
                </button>
                <button
                  onClick={() => setActiveIndustry('career')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'career' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Career
                </button>
                <button
                  onClick={() => setActiveIndustry('relationship')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeIndustry === 'relationship' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Relationship
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveResultType('all')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeResultType === 'all' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  All Results
                </button>
                <button
                  onClick={() => setActiveResultType('audience')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeResultType === 'audience' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Audience Growth
                </button>
                <button
                  onClick={() => setActiveResultType('time')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeResultType === 'time' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Time Saved
                </button>
                <button
                  onClick={() => setActiveResultType('engagement')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeResultType === 'engagement' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Engagement
                </button>
                <button
                  onClick={() => setActiveResultType('revenue')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    activeResultType === 'revenue' 
                      ? "bg-primary-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Revenue
                </button>
              </div>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search case studies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results counter */}
        <div className="mb-8 text-gray-600">
          Showing {filteredStudies.length} {filteredStudies.length === 1 ? 'result' : 'results'}
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredStudies.map(study => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {/* Placeholder for case study image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400">
                  {study.name} Photo
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-amber-500 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md">
                    {/* Display the primary result */}
                    {study.stats[0].value}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">{study.name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-4">{study.title}</p>
                
                <div className="relative mb-6 pl-4">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary-200 rounded-full"></div>
                  <p className="text-gray-600 text-sm line-clamp-3">{study.challenge}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center"
                    onClick={() => setExpandedStudy(study.id)}
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            ))}
          </div>

        {/* Empty state */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <Button 
              variant="outline" 
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
        
        {/* Full case study modal */}
        <AnimatePresence>
          {expandedStudy && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setExpandedStudy(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 md:p-8 shadow-2xl z-50 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                {caseStudies.filter(s => s.id === expandedStudy).map(study => (
                  <div key={study.id}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{study.name}</h2>
                        <p className="text-primary-600 font-medium">{study.title}</p>
                      </div>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setExpandedStudy(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="h-64 md:h-80 bg-gray-200 rounded-xl mb-8 overflow-hidden">
                      {/* Placeholder for larger case study image */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400 text-xl">
                        {study.name} Photo
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {study.stats.map((stat, idx) => (
                        <div key={idx} className="bg-gray-50 p-5 rounded-lg text-center">
                          <div className="flex items-center justify-center gap-1.5 text-primary-600 mb-2">
                            {stat.icon}
                            <span className="text-sm font-medium">{stat.label}</span>
                          </div>
                          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-8 mb-8">
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">The Challenge</h3>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Our Solution</h3>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">The Results</h3>
                        <p className="text-gray-600">{study.results}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <div className="relative pl-6 italic text-gray-700">
                        <div className="absolute left-0 top-0 text-primary-400 text-4xl font-serif">"</div>
                        <p>{study.quote}</p>
                        <div className="mt-4 font-medium text-gray-900 not-italic">— {study.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {study.tags.map((tag, idx) => (
                        <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        className="bg-primary-600 hover:bg-primary-700"
                        onClick={() => setExpandedStudy(null)}
                      >
                        Back to Case Studies
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Call to action */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Own Success Story?</h2>
            <p className="text-primary-100 mb-8">Join these coaches who have transformed their businesses with our AI-powered content solutions.</p>
            <Button className="bg-white text-primary-700 hover:bg-primary-50">
              Book a Strategy Call
              <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 