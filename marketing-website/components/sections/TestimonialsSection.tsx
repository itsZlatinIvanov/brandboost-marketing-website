import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, ChevronLeft, Instagram, ExternalLink, Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, ArrowLeft, Video, Grid, User, Bell, Users, BarChart2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTransformationStories } from '@/data/caseStudies';
import { BackgroundSection2 } from '../BackgroundSection2';

// Define global styles for HD text rendering
const hdTextStyles = {
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  fontKerning: 'normal',
  textSizeAdjust: '100%',
} as const;

// Button style optimization for crisp rendering
const crispButtonStyles = {
  ...hdTextStyles,
  fontSmooth: 'always',
  letterSpacing: '0.025em',
  transform: 'translateZ(0)', // Force GPU acceleration
  backfaceVisibility: 'hidden',
  fontWeight: 500,
} as const;

// Optimized small text style (especially for bios and tiny text)
const crispSmallTextStyles = {
  ...hdTextStyles,
  fontSmooth: 'always',
  letterSpacing: '0.01em',
  transform: 'translateZ(0)',
  fontWeight: 400,
  lineHeight: 1.2,
  wordSpacing: '0.02em',
  fontOpticalSizing: 'auto',
  fontSynthesis: 'none',
} as const;

// Ultra crisp style for very small text with enhanced readability
const ultraCrispSmallTextStyles = {
  ...crispSmallTextStyles,
  textShadow: '0 0 0.01px rgba(255, 255, 255, 0.4)',
  fontFeatureSettings: '"tnum", "lnum", "calt" off',
  fontVariantNumeric: 'lining-nums tabular-nums',
  WebkitTextStroke: '0.01px rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.98)',
  fontWeight: 500,
} as const;

export const TestimonialsSection = () => {
  const [activeStory, setActiveStory] = useState<number>(0);
  const beforeProfileRef = useRef<HTMLDivElement>(null);
  const afterProfileRef = useRef<HTMLDivElement>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Използваме централизираната база данни с трансформационни истории
  const transformationStories = getTransformationStories().slice(0, 3);
  
  // Навигация между историите
  const navigateStories = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setActiveStory(prev => (prev + 1) % transformationStories.length);
    } else {
      setActiveStory(prev => (prev - 1 + transformationStories.length) % transformationStories.length);
    }
  };
  
  const currentStory = transformationStories[activeStory];
  
  // Симулация на Instagram профил данни
  const getProfileSimulation = (story: any) => {
    const beforeProfile = {
      username: story.name.toLowerCase().replace(/\s+/g, '') || "sophiawilliams",
      displayName: story.name || "Sarah Johnson",
      bio: `${story.title}. Опитвам се да развия онлайн присъствие.`,
      followers: story.beforeMetrics?.followers || "850",
      following: story.beforeMetrics?.following || "827",
      posts: story.beforeMetrics?.posts || "24",
      engagement: story.beforeMetrics?.engagement || "0.9%",
      profileImage: story.avatarUrl || "/default-avatar.png",
      postImages: [
        "/instagram-before-1.jpg",
        "/instagram-before-2.jpg",
        "/instagram-before-3.jpg"
      ],
      highlights: ["Услуги", "За нас"],
      likes: "43",
      comments: "5",
      industry: story.industry || "Health & Fitness"
    };
    
    const afterProfile = {
      username: story.name.toLowerCase().replace(/\s+/g, '') || "sophiawilliams",
      displayName: story.name || "Sarah Johnson",
      bio: story.afterBio || `${story.title} | Професионални решения и експертиза`,
      followers: story.afterMetrics?.followers || "18.5K",
      following: story.afterMetrics?.following || "903",
      posts: story.afterMetrics?.posts || "62",
      engagement: story.afterMetrics?.engagement || "3.8%",
      profileImage: story.avatarUrl || "/default-avatar.png",
      postImages: [
        "/instagram-after-1.jpg",
        "/instagram-after-2.jpg",
        "/instagram-after-3.jpg"
      ],
      highlights: ["Услуги", "Клиенти", "Екип"],
      likes: "843",
      comments: "97",
      industry: story.industry || "Health & Fitness"
    };
    
    return {
      before: beforeProfile,
      after: afterProfile
    };
  };
  
  const beforeBorder = "rounded-full overflow-hidden border border-gray-700 ring-1 ring-gray-800";
  const afterBorder = "rounded-full overflow-hidden border-2 border-blue-500 ring-1 ring-blue-600";
  
  return (
    <BackgroundSection2 className="relative overflow-hidden" noPadding>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div ref={ref} className="max-w-5xl mx-auto">
          {/* Updated header with consistent styling */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm" style={hdTextStyles}>Истории на трансформация</p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight" style={hdTextStyles}>
              От обикновен профил до <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">бизнес магнит</span>
            </h2>
            
            {/* Client name badge with consistent gradient */}
            <div className="inline-flex items-center mb-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold py-1 px-4 rounded-full hover:scale-105 transition-transform shadow-md shadow-blue-900/10"
                style={hdTextStyles}
              >
                {currentStory.name}
              </div>
            </div>
          </div>
          
          {/* Instagram интерфейс симулация – Преди и След */}
          <div className="relative flex justify-center items-center max-w-3xl mx-auto">
            {/* Updated navigation buttons with consistent styling */}
            <button
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center"
              onClick={() => navigateStories('prev')}
              aria-label="Предишна история"
              style={{ transform: 'translate(-20px, -50%)' }}
            >
              <ChevronLeft className="h-5 w-5 text-blue-600" style={{ transform: 'translateZ(0)' }} />
            </button>
            
            <button
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center"
              onClick={() => navigateStories('next')}
              aria-label="Следваща история"
              style={{ transform: 'translate(20px, -50%)' }}
            >
              <ChevronRight className="h-5 w-5 text-blue-600" style={{ transform: 'translateZ(0)' }} />
            </button>
            
            {/* Fixed height container for both profiles - small gap */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-0 w-full">
              {/* ПРЕДИ Instagram with fixed dimensions */}
              <div className="relative w-[280px] h-[490px] mx-auto md:mr-3">
                {/* Label */}
                <div 
                  className="bg-red-100 text-red-800 p-2 text-center font-bold text-sm rounded-t-2xl"
                  style={hdTextStyles}
                >
                  ПРЕДИ
                </div>
                
                {/* Instagram frame with fixed height */}
                <div 
                  className="rounded-b-2xl shadow-xl overflow-hidden border-4 border-t-0 border-red-200 h-[460px] flex flex-col bg-black text-white rounded-b-2xl"
                  style={{ 
                    ...hdTextStyles,
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-2 py-1 text-[10px]" style={hdTextStyles}>
                    <span style={{ fontWeight: 500 }}>9:51</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="white" style={{ transform: 'translateZ(0)' }}>
                        <path d="M3,7 L17,7 L17,14 L3,14 L3,7 Z M6,10 L14,10 L14,12 L6,12 L6,10 Z" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="white" style={{ transform: 'translateZ(0)' }}>
                        <path d="M10,3 C12.5,3 14.5,4 16,6 C17.5,8 17.5,12 16,14 C14.5,16 12.5,17 10,17 C7.5,17 5.5,16 4,14 C2.5,12 2.5,8 4,6 C5.5,4 7.5,3 10,3 Z" />
                      </svg>
                      <span className="bg-white text-black font-bold px-1 text-[8px] rounded-sm" style={{ fontWeight: 600 }}>55</span>
                    </div>
                  </div>
                  
                  {/* Instagram Header */}
                  <div className="flex items-center justify-between px-2 py-1 border-b border-gray-800">
                    <div className="flex items-center">
                      <ArrowLeft className="w-3 h-3 mr-1" style={{ transform: 'translateZ(0)' }} />
                      <span className="text-xs font-semibold" style={hdTextStyles}>@{getProfileSimulation(currentStory).before.username}</span>
                    </div>
                    <div className="flex gap-2">
                      <Bell className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                      <MoreHorizontal className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                    </div>
                  </div>
                  
                  {/* Profile content - static screenshot style */}
                  <div className="flex-none">
                    <div className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          {/* Profile Image */}
                          <div className={`w-16 h-16 ${beforeBorder}`} style={{ transform: 'translateZ(0)' }}>
                            <img 
                              src={getProfileSimulation(currentStory).before.profileImage} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              style={{ transform: 'translateZ(0)' }}
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150/262626/ffffff?text=Profile";
                              }}
                            />
                          </div>
                          
                          {/* Name and Stats */}
                          <div className="flex-1 pl-3">
                            <p className="text-xs font-semibold mb-1" style={hdTextStyles}>{getProfileSimulation(currentStory).before.displayName}</p>
                            <div className="flex justify-between">
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).before.posts}</div>
                                <div className="text-[10px]" style={hdTextStyles}>posts</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).before.followers}</div>
                                <div className="text-[10px]" style={hdTextStyles}>followers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).before.following}</div>
                                <div className="text-[10px]" style={hdTextStyles}>following</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        {/* Bio section with placeholder to match the other profile */}
                        <div>
                          <p 
                            className="text-[10px] leading-snug px-[0.5px]" 
                            style={ultraCrispSmallTextStyles}
                          >{getProfileSimulation(currentStory).before.bio}</p>
                          <div className="h-4"></div> {/* Space placeholder */}
                        </div>
                      
                        {/* Button row */}
                        <div className="flex gap-1 mt-2">
                          <div 
                            className="flex-1 bg-blue-600 text-white text-[10px] font-medium py-1 rounded text-center"
                            style={crispButtonStyles}
                          >
                            Follow
                          </div>
                          <div 
                            className="flex-1 bg-gray-800 text-white text-[10px] font-medium py-1 rounded text-center"
                            style={crispButtonStyles}
                          >
                            Message
                          </div>
                          <div 
                            className="bg-gray-800 text-white px-1 py-1 rounded flex items-center justify-center"
                            style={{ transform: 'translateZ(0)' }}
                          >
                            <User className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                          </div>
                        </div>
                      
                        {/* Tab navigation - Modern Instagram */}
                        <div className="flex mt-3 border-t border-gray-800">
                          <div className="flex-1 flex justify-center py-1.5">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ transform: 'translateZ(0)' }}>
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                            </svg>
                          </div>
                          <div className="flex-1 flex justify-center py-1.5 border-b border-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ transform: 'translateZ(0)' }}>
                              <path d="M5 5v14a1 1 0 001 1h3a1 1 0 001-1v-7h4v7a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1h-3a1 1 0 00-1 1v7h-4V5a1 1 0 00-1-1H6a1 1 0 00-1 1z" />
                            </svg>
                          </div>
                          <div className="flex-1 flex justify-center py-1.5">
                            <User className="w-5 h-5 text-gray-500" style={{ transform: 'translateZ(0)' }} />
                          </div>
                        </div>
                      
                        {/* Reels Layout - 9:16 aspect ratio with 3 cols, 3 rows (bottom row cut) */}
                        <div className="flex flex-col mt-2">
                          <div className="grid grid-cols-3 gap-[1px]">
                            {[1,2,3,4,5,6,7,8,9].map((i) => (
                              <div key={i} className={`bg-gray-800 relative overflow-hidden ${i > 6 ? 'h-6' : ''}`} style={{ aspectRatio: '9/16', transform: 'translateZ(0)' }}>
                                <img 
                                  src={i % 3 === 0 
                                    ? "https://via.placeholder.com/150x267/262626/555555?text=Basic" 
                                    : "https://via.placeholder.com/150x267/1c1c1c/444444?text=Video"}
                                  alt={`Post ${i}`} 
                                  className="w-full h-full object-cover"
                                  loading="eager"
                                  style={{ transform: 'translateZ(0)' }}
                                />
                                <div className="absolute bottom-1 left-1 text-white text-[8px] flex items-center" style={hdTextStyles}>
                                  <svg className="w-2 h-2 mr-0.5" viewBox="0 0 24 24" fill="white" style={{ transform: 'translateZ(0)' }}>
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                  </svg>
                                  <span style={{ fontWeight: 500 }}>{Math.floor(Math.random() * 900) + 100}</span>
                                </div>
                                {i === 2 && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/40 w-full h-full flex items-center justify-center">
                                      <div className="text-white text-xs font-bold" style={hdTextStyles}>JUST BECAUSE</div>
                                    </div>
                                  </div>
                                )}
                                {i === 5 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1 px-2">
                                    <div className="text-white text-[7px] font-bold" style={hdTextStyles}>What is the biggest lie about flying private?</div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Engagement Banner */}
                  <div className="bg-red-900/20 py-1 px-2 text-center mt-auto">
                    <p className="text-[10px] font-medium text-red-400" style={hdTextStyles}>
                      Engagement Rate: {getProfileSimulation(currentStory).before.engagement}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* СЛЕД Instagram with identical fixed dimensions */}
              <div className="relative w-[280px] h-[490px] mx-auto md:ml-3">
                {/* Label */}
                <div 
                  className="bg-emerald-100 text-emerald-800 p-2 text-center font-bold text-sm rounded-t-2xl"
                  style={hdTextStyles}
                >
                  СЛЕД
                </div>
                
                {/* Instagram frame with fixed height */}
                <div 
                  className="rounded-b-2xl shadow-xl overflow-hidden border-4 border-t-0 border-emerald-200 h-[460px] flex flex-col bg-black text-white rounded-b-2xl"
                  style={{ 
                    ...hdTextStyles,
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-2 py-1 text-[10px]" style={hdTextStyles}>
                    <span style={{ fontWeight: 500 }}>9:51</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="white" style={{ transform: 'translateZ(0)' }}>
                        <path d="M3,7 L17,7 L17,14 L3,14 L3,7 Z M6,10 L14,10 L14,12 L6,12 L6,10 Z" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="white" style={{ transform: 'translateZ(0)' }}>
                        <path d="M10,3 C12.5,3 14.5,4 16,6 C17.5,8 17.5,12 16,14 C14.5,16 12.5,17 10,17 C7.5,17 5.5,16 4,14 C2.5,12 2.5,8 4,6 C5.5,4 7.5,3 10,3 Z" />
                      </svg>
                      <span className="bg-white text-black font-bold px-1 text-[8px] rounded-sm" style={{ fontWeight: 600 }}>55</span>
                    </div>
                  </div>
                  
                  {/* Instagram Header */}
                  <div className="flex items-center justify-between px-2 py-1 border-b border-gray-800">
                    <div className="flex items-center">
                      <ArrowLeft className="w-3 h-3 mr-1" style={{ transform: 'translateZ(0)' }} />
                      <span className="text-xs font-semibold" style={hdTextStyles}>@{getProfileSimulation(currentStory).after.username}</span>
                    </div>
                    <div className="flex gap-2">
                      <Bell className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                      <MoreHorizontal className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                    </div>
                  </div>
                  
                  {/* Profile content - static screenshot style */}
                  <div className="flex-none">
                    <div className="p-3">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          {/* Profile Image */}
                          <div className={`w-16 h-16 ${afterBorder}`} style={{ transform: 'translateZ(0)' }}>
                            <img 
                              src={getProfileSimulation(currentStory).after.profileImage} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              style={{ transform: 'translateZ(0)' }}
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150/262626/ffffff?text=Profile";
                              }}
                            />
                          </div>
                          
                          {/* Name and Stats */}
                          <div className="flex-1 pl-3">
                            <p className="text-xs font-semibold mb-1" style={hdTextStyles}>
                              {getProfileSimulation(currentStory).after.displayName}
                            </p>
                            <div className="flex justify-between">
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).after.posts}</div>
                                <div className="text-[10px]" style={hdTextStyles}>posts</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).after.followers}</div>
                                <div className="text-[10px]" style={hdTextStyles}>followers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold" style={hdTextStyles}>{getProfileSimulation(currentStory).after.following}</div>
                                <div className="text-[10px]" style={hdTextStyles}>following</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        {/* Bio section */}
                        <div>
                          <p 
                            className="text-[10px] leading-snug px-[0.5px]" 
                            style={ultraCrispSmallTextStyles}
                          >{getProfileSimulation(currentStory).after.bio}</p>
                          <p 
                            className="text-[10px] text-blue-400 mt-0.5 px-[0.5px]" 
                            style={{
                              ...ultraCrispSmallTextStyles,
                              color: 'rgba(96, 165, 250, 0.98)',
                              WebkitTextStroke: '0.01px rgba(96, 165, 250, 0.3)',
                              textShadow: '0 0 0.01px rgba(96, 165, 250, 0.3)'
                            }}
                          >www.direct2.aero</p>
                        </div>
                      
                        {/* Button row */}
                        <div className="flex gap-1 mt-2">
                          <div 
                            className="flex-1 bg-blue-600 text-white text-[10px] font-medium py-1 rounded text-center"
                            style={crispButtonStyles}
                          >
                            Follow
                          </div>
                          <div 
                            className="flex-1 bg-gray-800 text-white text-[10px] font-medium py-1 rounded text-center"
                            style={crispButtonStyles}
                          >
                            Message
                          </div>
                          <div 
                            className="bg-gray-800 text-white px-1 py-1 rounded flex items-center justify-center"
                            style={{ transform: 'translateZ(0)' }}
                          >
                            <User className="w-3 h-3" style={{ transform: 'translateZ(0)' }} />
                          </div>
                        </div>
                      
                        {/* Tab navigation - Modern Instagram */}
                        <div className="flex mt-3 border-t border-gray-800">
                          <div className="flex-1 flex justify-center py-1.5">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ transform: 'translateZ(0)' }}>
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                            </svg>
                          </div>
                          <div className="flex-1 flex justify-center py-1.5 border-b border-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ transform: 'translateZ(0)' }}>
                              <path d="M5 5v14a1 1 0 001 1h3a1 1 0 001-1v-7h4v7a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1h-3a1 1 0 00-1 1v7h-4V5a1 1 0 00-1-1H6a1 1 0 00-1 1z" />
                            </svg>
                          </div>
                          <div className="flex-1 flex justify-center py-1.5">
                            <User className="w-5 h-5 text-gray-500" style={{ transform: 'translateZ(0)' }} />
                          </div>
                        </div>
                      
                        {/* Reels Layout - 9:16 aspect ratio with 3 cols, 3 rows (bottom row cut) */}
                        <div className="flex flex-col mt-2">
                          <div className="grid grid-cols-3 gap-[1px]">
                            {[1,2,3,4,5,6,7,8,9].map((i) => (
                              <div key={i} className={`bg-gray-800 relative overflow-hidden ${i > 6 ? 'h-6' : ''}`} style={{ aspectRatio: '9/16', transform: 'translateZ(0)' }}>
                                <img 
                                  src={i % 3 === 0 
                                    ? "https://via.placeholder.com/150x267/262626/ffffff?text=Premium" 
                                    : "https://via.placeholder.com/150x267/1c1c1c/ffffff?text=Video"}
                                  alt={`Post ${i}`} 
                                  className="w-full h-full object-cover"
                                  loading="eager"
                                  style={{ transform: 'translateZ(0)' }}
                                />
                                <div className="absolute bottom-1 left-1 text-white text-[8px] flex items-center" style={hdTextStyles}>
                                  <svg className="w-2 h-2 mr-0.5" viewBox="0 0 24 24" fill="white" style={{ transform: 'translateZ(0)' }}>
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                  </svg>
                                  <span style={{ fontWeight: 500 }}>{Math.floor(Math.random() * 2000) + 500}</span>
                                </div>
                                {i === 3 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1 px-2">
                                    <div className="text-white text-[7px] font-bold" style={hdTextStyles}>CLIENT: Yeah man</div>
                                  </div>
                                )}
                                {i === 4 && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/40 w-full h-full flex items-center justify-center">
                                      <div className="text-white text-[8px] font-bold text-center p-1" style={hdTextStyles}>
                                        POV:<br />The runway you landed<br />on has a yellow line
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Engagement Banner */}
                  <div className="bg-green-900/20 py-1 px-2 text-center mt-auto">
                    <p className="text-[10px] font-medium text-green-400" style={hdTextStyles}>
                      Engagement Rate: {getProfileSimulation(currentStory).after.engagement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Слайдер навигация и индикатори */}
          <div className="flex justify-center items-center mt-4">
            <div className="flex space-x-2 items-center">
              {transformationStories.map((story, index) => (
                <button 
                  key={index}
                  className={`flex flex-col items-center transition-all duration-300 ${index === activeStory ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-90'}`}
                  onClick={() => setActiveStory(index)}
                  aria-label={`${story.name} Story`}
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${index === activeStory ? 'border-blue-500' : 'border-gray-300'} mb-1`}>
                    <img 
                      src={story.avatarUrl || "/default-avatar.png"} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                      style={{ transform: 'translateZ(0)' }}
                    />
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeStory ? 'bg-blue-600 w-6' : 'bg-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Трансформация инфо с детайли за индустрията */}
          <div className="text-center mt-2 mb-4">
            <p className="text-sm text-purple-700 font-medium" style={hdTextStyles}>
              Трансформация за {currentStory.transformationTime} в индустрия <span className="font-semibold">{currentStory.industry.charAt(0).toUpperCase() + currentStory.industry.slice(1)}</span> <span className="text-slate-600">({activeStory + 1} от {transformationStories.length})</span>
            </p>
          </div>
          
          {/* CTA бутони с връзка към case study */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-md transition-all duration-300 hover:shadow-lg text-sm font-medium py-2"
              style={hdTextStyles}
            >
              Искам подобна трансформация
            </Button>
            
            <a href={`/case-studies/${currentStory.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full bg-white/90 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-1 transition-all duration-300 text-sm font-medium py-2"
                style={hdTextStyles}
              >
                <span>Виж пълен case study</span>
                <ExternalLink className="w-3 h-3 ml-1" style={{ transform: 'translateZ(0)' }} />
              </Button>
            </a>
          </div>
          
        </div>
      </div>
    </BackgroundSection2>
  );
};
