import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp, ExternalLink, Clock, Users, BarChart, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CaseStudy, SocialPost as SocialPostType } from '@/data/caseStudies';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { renderIcon } from '@/utils/iconUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onBack: () => void;
  onNextCase: (id: string) => void;
  onPrevCase: (id: string) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ 
  study, 
  onBack, 
  onNextCase, 
  onPrevCase, 
  hasNext, 
  hasPrev 
}) => {
  const { 
    name, 
    title, 
    image, 
    logo, 
    quote, 
    challenge, 
    solution, 
    results, 
    stats, 
    beforeMetrics, 
    afterMetrics, 
    transformationTime,
    socialPosts,
    beforeAfter,
    videos,
    websiteMetrics,
    socialMetrics,
    category,
    avatarUrl,
    tags
  } = study;

  // Calculate percentage increases for metrics display
  const calculateIncrease = (before: string, after: string): number => {
    const getNumericValue = (value: string): number => {
      const match = value.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    };
    
    const beforeNum = getNumericValue(before);
    const afterNum = getNumericValue(after);
    
    if (beforeNum === 0) return 100; // Avoid division by zero
    return Math.round(((afterNum - beforeNum) / beforeNum) * 100);
  };
  
  const formatPercentage = (before: string, after: string): string => {
    const percentage = calculateIncrease(before, after);
    // If timeSpent, we typically want to show a reduction (negative percentage)
    if (before.includes('hr') && after.includes('hr')) {
      return `-${Math.abs(100 - percentage)}%`;
    }
    return `+${percentage}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pb-20">
      {/* Navigation header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-gray-600"
              onClick={onBack}
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
              >
                <span aria-hidden="true" className="mr-1">←</span> Previous
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasNext}
                onClick={() => hasNext && onNextCase(study.id)}
                className={cn(!hasNext && "opacity-50")}
              >
                Next <span aria-hidden="true" className="ml-1">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero section */}
      <div className="w-full bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {logo && (
                  <img src={logo} alt={`${name} logo`} className="h-12 w-auto object-contain" />
                )}
                {category && (
                  <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
                    {category === 'coach' ? 'Coach' : category === 'consultant' ? 'Consultant' : 'Expert'}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{name}</h1>
              <h2 className="text-xl text-gray-600 mb-6">{title}</h2>
              
              {transformationTime && (
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{transformationTime} Transformation</span>
                </div>
              )}
              
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-4 my-6">
                "{quote}"
              </blockquote>
              
              <div className="flex gap-2 flex-wrap mt-4">
                {tags && tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {image && (
                <img 
                  src={image} 
                  alt={name} 
                  className="rounded-xl shadow-lg w-full h-auto object-cover aspect-[4/3]" 
                />
              )}
              {avatarUrl && (
                <Avatar className="absolute -bottom-6 -left-6 w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      {stats && stats.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  {renderIcon({ icon: stat.icon, className: "w-5 h-5 text-blue-600" })}
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
          <Tabs defaultValue="challenge">
            <TabsList className="mb-8 border-b border-gray-200 w-full justify-start">
              <TabsTrigger value="challenge" className="text-base">Challenge</TabsTrigger>
              <TabsTrigger value="solution" className="text-base">Solution</TabsTrigger>
              <TabsTrigger value="results" className="text-base">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="challenge" className="text-gray-700 leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The Challenge</h3>
              <p className="whitespace-pre-line">{challenge}</p>
            </TabsContent>
            
            <TabsContent value="solution" className="text-gray-700 leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h3>
              <p className="whitespace-pre-line">{solution}</p>
            </TabsContent>
            
            <TabsContent value="results" className="text-gray-700 leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900 mb-4">The Results</h3>
              <p className="whitespace-pre-line">{results}</p>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Before & After Metrics */}
        {beforeMetrics && afterMetrics && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transformation Results</h3>
            
            <div className="space-y-6">
              {beforeMetrics.followers && afterMetrics.followers && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Followers</h4>
                    <span className="ml-auto px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {formatPercentage(beforeMetrics.followers, afterMetrics.followers)}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 items-center mb-6">
                    <div className="w-1/2">
                      <div className="text-sm text-gray-500 mb-1">Before</div>
                      <div className="text-2xl font-bold text-gray-700">{beforeMetrics.followers}</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-sm text-blue-600 mb-1">After</div>
                      <div className="text-2xl font-bold text-blue-700">{afterMetrics.followers}</div>
                    </div>
                  </div>
                  
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, calculateIncrease(beforeMetrics.followers, afterMetrics.followers))}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              )}
              
              {beforeMetrics.engagement && afterMetrics.engagement && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Engagement</h4>
                    <span className="ml-auto px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {formatPercentage(beforeMetrics.engagement, afterMetrics.engagement)}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 items-center mb-6">
                    <div className="w-1/2">
                      <div className="text-sm text-gray-500 mb-1">Before</div>
                      <div className="text-2xl font-bold text-gray-700">{beforeMetrics.engagement}</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-sm text-blue-600 mb-1">After</div>
                      <div className="text-2xl font-bold text-blue-700">{afterMetrics.engagement}</div>
                    </div>
                  </div>
                  
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, calculateIncrease(beforeMetrics.engagement, afterMetrics.engagement))}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  </div>
                </div>
              )}
              
              {beforeMetrics.leads && afterMetrics.leads && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Lead Generation</h4>
                    <span className="ml-auto px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {formatPercentage(beforeMetrics.leads, afterMetrics.leads)}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 items-center mb-6">
                    <div className="w-1/2">
                      <div className="text-sm text-gray-500 mb-1">Before</div>
                      <div className="text-2xl font-bold text-gray-700">{beforeMetrics.leads}</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-sm text-blue-600 mb-1">After</div>
                      <div className="text-2xl font-bold text-blue-700">{afterMetrics.leads}</div>
                    </div>
                  </div>
                  
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, calculateIncrease(beforeMetrics.leads, afterMetrics.leads))}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              )}
              
              {beforeMetrics.timeSpent && afterMetrics.timeSpent && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Time Investment</h4>
                    <span className="ml-auto px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {formatPercentage(beforeMetrics.timeSpent, afterMetrics.timeSpent)}
                    </span>
                  </div>
                  
                  <div className="flex gap-6 items-center mb-6">
                    <div className="w-1/2">
                      <div className="text-sm text-gray-500 mb-1">Before</div>
                      <div className="text-2xl font-bold text-gray-700">{beforeMetrics.timeSpent}</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-sm text-blue-600 mb-1">After</div>
                      <div className="text-2xl font-bold text-blue-700">{afterMetrics.timeSpent}</div>
                    </div>
                  </div>
                  
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.abs(100 - calculateIncrease(beforeMetrics.timeSpent, afterMetrics.timeSpent)))}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Before & After Comparisons */}
        {beforeAfter && beforeAfter.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Visual Proof</h3>
            
            <div className="space-y-8">
              {beforeAfter.map((comparison, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Before</h4>
                      {comparison.before.date && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {comparison.before.date}
                        </div>
                      )}
                    </div>
                    
                    {comparison.before.image && (
                      <img 
                        src={comparison.before.image} 
                        alt={`Before - ${comparison.metric}`}
                        className="w-full h-auto rounded-lg mb-4" 
                      />
                    )}
                    
                    <div className="flex justify-between items-end">
                      <div className="text-sm text-gray-500">{comparison.metric}</div>
                      <div className="text-xl font-bold text-gray-700">{comparison.before.value}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-blue-900">After</h4>
                      {comparison.after.date && (
                        <div className="flex items-center gap-1 text-sm text-blue-700">
                          <Calendar className="w-3 h-3" />
                          {comparison.after.date}
                        </div>
                      )}
                    </div>
                    
                    {comparison.after.image && (
                      <img 
                        src={comparison.after.image} 
                        alt={`After - ${comparison.metric}`}
                        className="w-full h-auto rounded-lg mb-4" 
                      />
                    )}
                    
                    <div className="flex justify-between items-end">
                      <div className="text-sm text-blue-700">{comparison.metric}</div>
                      <div className="text-xl font-bold text-blue-900">{comparison.after.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Social Posts */}
        {socialPosts && socialPosts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Social Media Success</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialPosts.map((post, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={`Social post on ${post.platform}`}
                      className="w-full h-48 object-cover" 
                    />
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "capitalize",
                          post.platform === 'instagram' && "text-pink-600 bg-pink-50 border-pink-200",
                          post.platform === 'facebook' && "text-blue-600 bg-blue-50 border-blue-200",
                          post.platform === 'twitter' && "text-sky-600 bg-sky-50 border-sky-200",
                          post.platform === 'linkedin' && "text-blue-800 bg-blue-50 border-blue-200",
                          post.platform === 'tiktok' && "text-black bg-gray-100 border-gray-200"
                        )}
                      >
                        {post.platform}
                      </Badge>
                      
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{post.engagement.likes.toLocaleString()} likes</span>
                        <span>{post.engagement.comments.toLocaleString()} comments</span>
                        {post.engagement.shares && <span>{post.engagement.shares.toLocaleString()} shares</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Videos */}
        {videos && videos.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Video Content</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover" 
                    />
                    <a 
                      href={video.embedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </a>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{video.title}</h4>
                    {video.views !== undefined && (
                      <div className="text-sm text-gray-500">{video.views.toLocaleString()} views</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation footer */}
        <div className="flex flex-wrap gap-4 justify-between items-center mt-12">
          <Button 
            onClick={onBack}
            className="flex-1 md:flex-none"
          >
            Back to Gallery
          </Button>
          
          <div className="flex gap-2 flex-1 md:flex-none justify-end">
            {hasPrev && (
              <Button 
                variant="outline"
                onClick={() => onPrevCase(study.id)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous Case Study
              </Button>
            )}
            
            {hasNext && (
              <Button 
                variant="outline"
                onClick={() => onNextCase(study.id)}
              >
                Next Case Study <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 