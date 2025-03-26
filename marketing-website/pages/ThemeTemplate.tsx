import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, TrendingUp, Clock, Users, Instagram, Youtube, MessageCircle, Heart, Share2, Target, BarChart2, CheckCircle, Phone, FileCheck, Key, Rocket, ChevronRight, ChevronLeft, ExternalLink, ArrowLeft, Bell, MoreHorizontal, User, Bookmark, Video, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundSection } from '@/components/BackgroundSection';
import { BackgroundSection2 } from '@/components/BackgroundSection2';
import { 
  brandColors, 
  typography, 
  spacing, 
  shadows,
  buttons, 
  cards, 
  patterns,
  socialElements,
  iconStyles,
  backgroundElements,
  common,
  animations,
  hdTextRendering,
  instagramUI,
  processAnimations
} from '@/lib/themeGuide';
import { useInView } from 'react-intersection-observer';

// Custom TikTok icon component (extracted from BrandValueSection)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/**
 * ThemeTemplate
 * 
 * This page serves as a template and documentation for creating new pages
 * that adhere to the BrandBoost design system. Copy this file as a starting
 * point when creating new pages to ensure consistency.
 */
const ThemeTemplate = () => {
  // State for interactive elements
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div className="min-h-screen bg-white">
      {/* Standard Header Component - Always include this */}
      <Header />
      
      <div className="pt-20">
        {/* Hero Section - Following the exact pattern from HeroSection.tsx */}
        <BackgroundSection className="min-h-[90vh] flex items-center justify-center" noPadding>
          <div className="max-w-screen-xl w-full relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left column: Value proposition & CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-xl"
              >
                {/* Personalized headline - following the HeroSection pattern */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-12 bg-blue-500"></div>
                    <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">ТЕМА</p>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">BrandBoost Theme</span> Система
                  </h1>
                  
                  <h2 className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                    Официална документация на дизайн системата на BrandBoost, с всички елементи, използвани на сайта
                  </h2>
                </div>
                
                {/* Primary and secondary CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-6 px-8 text-base font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1"
                  >
                    Основен бутон
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/10 rounded-lg py-6 px-8 text-base font-medium shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-1"
                  >
                    Вторичен бутон
                  </Button>
                </div>
                
                {/* Trust indicator - exactly as in HeroSection */}
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p>Избор на <span className="text-white font-medium">над 150 локални бизнеса и инфлуенсъри</span></p>
                </div>
              </motion.div>
              
              {/* Right column: Social Media Engagement Bubbles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="relative h-[550px] w-full"
              >
                <div className="absolute inset-0">
                  {/* Decorative gradient circles - as in HeroSection */}
                  <div className="absolute top-64 right-64 w-32 h-32 bg-blue-500 rounded-full opacity-30 filter blur-xl"></div>
                  <div className="absolute top-20 -right-10 w-24 h-24 bg-blue-600 rounded-full opacity-30 filter blur-xl"></div>
                  <div className="absolute bottom-40 -left-10 w-24 h-24 bg-purple-500 rounded-full opacity-30 filter blur-xl"></div>
                  <div className="absolute bottom-20 right-32 w-32 h-32 bg-purple-500 rounded-full opacity-30 filter blur-xl"></div>
                  
                  {/* Floating engagement metric bubbles - as in HeroSection */}
                  <motion.div
                    className="absolute top-1/4 right-1/3 flex items-center gap-1.5 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full px-3 py-1.5 shadow-lg z-20"
                    animate={{ 
                      y: [0, -5, 0, 5, 0],
                      opacity: [0.85, 0.9, 0.85],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="h-3 w-3" />
                    <span className="text-xs font-semibold">15.2K</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-full px-3 py-1.5 shadow-lg z-20"
                    animate={{ 
                      y: [0, -7, 0, 7, 0],
                      opacity: [0.85, 0.9, 0.85],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span className="text-xs font-semibold">2.8K</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/3 left-1/4 flex items-center gap-1.5 bg-gradient-to-br from-green-500 to-emerald-400 text-white rounded-full px-3 py-1.5 shadow-lg z-20"
                    animate={{ 
                      y: [0, -9, 0, 9, 0],
                      opacity: [0.85, 0.9, 0.85],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                    <span className="text-xs font-semibold">5.6K</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </BackgroundSection>

        {/* Brand Value Section - Following the BrandValueSection.tsx pattern */}
        <BackgroundSection className="py-16 relative overflow-hidden" noPadding>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjMDAwMDAwMDUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgZmlsbD0iIzAwMDAwMDA1Ii8+PC9nPjwvc3ZnPg==')] opacity-25 bg-[size:30px_30px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section header - from BrandValueSection */}
              <motion.div 
                className="text-center mb-12"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-12 bg-blue-500"></div>
                  <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">Компоненти</p>
                  <div className="h-px w-12 bg-blue-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Социални Медийни
                  </span>
                  <br />
                  Елементи
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Компоненти, използвани за показване на социални мрежи и ангажираност
                </p>
              </motion.div>

              {/* Platform logos with floating animation from BrandValueSection */}
              <motion.div
                className="flex justify-center items-center gap-10 mb-16"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[
                  { icon: <Instagram className="h-8 w-8" />, label: "Instagram", color: "text-rose-400" },
                  { icon: <TikTokIcon className="h-8 w-8" />, label: "TikTok", color: "text-slate-200" },
                  { icon: <Youtube className="h-8 w-8" />, label: "YouTube", color: "text-red-500" }
                ].map((platform, index) => (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5 }
                      }
                    }}
                  >
                    <motion.div 
                      className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-800/70 backdrop-blur-sm border border-slate-700 mb-2 shadow-lg"
                      animate={{ 
                        y: [0, -5, 0, 5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4 + index,
                        ease: "easeInOut",
                      }}
                    >
                      <span className={platform.color}>{platform.icon}</span>
                    </motion.div>
                    <span className="text-sm font-medium text-slate-300">{platform.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Core benefits cards from BrandValueSection */}
              <motion.div
                className="grid md:grid-cols-3 gap-6 mb-16"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[
                  {
                    id: 'reach',
                    title: 'Органичен обхват',
                    description: 'Достигаме до точно таргетирана аудитория, която наистина се интересува от вашия бизнес',
                    metric: '10-50K',
                    metricLabel: 'месечен органичен обхват',
                    icon: <Target className="h-6 w-6 text-white" />,
                    color: 'from-blue-500 to-purple-600',
                  },
                  {
                    id: 'engagement',
                    title: 'Висока ангажираност',
                    description: 'Създаваме съдържание, което резонира и задържа вниманието по-дълго от средното',
                    metric: '3-5x',
                    metricLabel: 'над средното за индустрията',
                    icon: <BarChart2 className="h-6 w-6 text-white" />,
                    color: 'from-purple-500 to-indigo-600',
                  },
                  {
                    id: 'conversion',
                    title: 'Повече клиенти',
                    description: 'Превръщаме последователи в клиенти с активни призиви към действие',
                    metric: '47%',
                    metricLabel: 'по-висока конверсия',
                    icon: <Users className="h-6 w-6 text-white" />,
                    color: 'from-indigo-500 to-blue-600',
                  }
                ].map((benefit) => (
                  <motion.div
                    key={benefit.id}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 transform transition-all hover:-translate-y-1 hover:border-blue-500/50"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5 }
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Card header with icon */}
                    <div className={`h-1.5 bg-gradient-to-r ${benefit.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${benefit.color} shadow-md`}>
                          {benefit.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                          <p className="text-sm text-slate-300">{benefit.description}</p>
                        </div>
                      </div>
                      
                      {/* Metrics */}
                      <div className="bg-slate-900/70 rounded-lg p-3 flex items-center">
                        <div className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${benefit.color}`}>
                          {benefit.metric}
                        </div>
                        <div className="text-xs text-slate-400 ml-2">
                          {benefit.metricLabel}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </BackgroundSection>

        {/* Team Section - Based on TeamSection.tsx pattern */}
        <BackgroundSection2 className="relative overflow-hidden" noPadding>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px w-12 bg-blue-500"></div>
                  <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Светли Компоненти</p>
                  <div className="h-px w-12 bg-blue-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  Компоненти на <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">светъл</span> фон
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Примери на компоненти, стилизирани за светъл фон
                </p>
              </div>
              
              {/* Card examples on light background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-xl border border-slate-200/50 overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Карта с градиент</h3>
                    <p className="text-slate-600 mb-4">Основен компонент с градиентен акцент, използван във всички светли секции.</p>
                    <div className="flex items-center mb-3 text-sm text-purple-700 font-medium">
                      <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                      <span>Включва стилизиран border-top</span>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                    >
                      Действие
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-purple-100/50 shadow-md"
                >
                  <div className="bg-white rounded-lg p-6 border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Карта с фонов градиент</h3>
                    <p className="text-slate-600 mb-4">Компонент с градиентен фон и бяла карта отгоре, използва се за feature highlights.</p>
                    <div className="flex flex-col gap-2">
                      {['Бърз старт', 'Лесна интеграция', 'Пълна поддръжка'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Example of button styles */}
              <div className="mt-12 bg-white rounded-xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Бутони</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                  >
                    Основен
                  </Button>
                  <Button 
                    className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 shadow-sm"
                  >
                    Вторичен
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    Blue
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                  >
                    Purple
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                  >
                    С икона <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </BackgroundSection2>

        {/* Advanced Animations Section - Showcasing animations from index page sections */}
        <BackgroundSection className="py-16 relative overflow-hidden" noPadding>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section header - keep this the same */}
              <motion.div 
                className="text-center mb-12"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px w-12 bg-blue-500"></div>
                  <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">Анимации</p>
                  <div className="h-px w-12 bg-blue-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Напреднали
                  </span>
                  <br />
                  Анимации
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Специално проектирани анимации и интерактивни елементи за по-добро потребителско изживяване
                </p>
              </motion.div>

              {/* Process Section Animation */}
              <div className="mb-16">
                <h3 className="text-xl text-white font-semibold mb-6 text-center">Етапи на процеса</h3>
                
                {/* Animated roadmap from ProcessSection */}
                <div className="relative max-w-5xl mx-auto h-[300px] md:h-[320px]">
                  {/* Background Container with Grid */}
                  <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700">
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)',
                      backgroundSize: '20px 20px' 
                    }}></div>
                  </div>
                  
                  {/* SVG Roadmap Path */}
                  <svg 
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    {/* Gradient Floating Circles */}
                    {[...Array(15)].map((_, i) => (
                      <motion.circle 
                        key={`float-${i}`}
                        cx={10 + (i * 5.5)}
                        cy="50%"
                        r={1 + Math.random() * 1.5}
                        fill={`rgba(${139 - (i * 3)}, ${92 + (i * 5)}, 246, ${0.2 + (Math.random() * 0.15)})`}
                        animate={{
                          y: [-(3 + Math.random() * 8), (3 + Math.random() * 8), -(3 + Math.random() * 8)],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 1
                        }}
                      />
                    ))}
                    
                    {/* Background Path Layers */}
                    <g>
                      {/* Wider background track */}
                      <line 
                        x1="10%" 
                        y1="50%" 
                        x2="90%" 
                        y2="50%" 
                        stroke="#334155" 
                        strokeWidth="10"
                        strokeLinecap="round"
                        opacity="0.4"
                      />
                      
                      {/* Dotted line */}
                      <line 
                        x1="10%" 
                        y1="50%" 
                        x2="90%" 
                        y2="50%" 
                        stroke="#93C5FD" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="2 6"
                        opacity="0.4"
                      />
                    </g>
                    
                    {/* Animated Progress Line */}
                    <motion.line 
                      x1="10%" 
                      y1="50%" 
                      x2="90%" 
                      y2="50%" 
                      stroke="url(#roadmapGradient)" 
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      filter="url(#glow)"
                    />
                    
                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="roadmapGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="33%" stopColor="#6366F1" />
                        <stop offset="66%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                  </svg>

                  {/* Process Steps Icons */}
                  <div className="absolute inset-0">
                    {[
                      {
                        title: "Безплатна консултация",
                        highlight: "96% успеваемост",
                        icon: <Phone className="w-6 h-6 text-white" />,
                        iconColor: "from-purple-600 to-indigo-600"
                      },
                      {
                        title: "Персонализирана стратегия",
                        highlight: "3.2x ROI",
                        icon: <FileCheck className="w-6 h-6 text-white" />,
                        iconColor: "from-indigo-600 to-blue-600"
                      },
                      {
                        title: "Достъп до системи",
                        highlight: "12ч спестени",
                        icon: <Key className="w-6 h-6 text-white" />,
                        iconColor: "from-blue-600 to-cyan-600"
                      },
                      {
                        title: "Започваме",
                        highlight: "+127% ръст",
                        icon: <Rocket className="w-6 h-6 text-white" />,
                        iconColor: "from-cyan-600 to-purple-600"
                      }
                    ].map((step, index) => {
                      const position = 10 + (index * (80 / 3));
                      const isTop = index % 2 === 0;
                      
                      return (
                        <div 
                          key={`process-step-${index}`} 
                          className="absolute top-1/2 -translate-y-1/2"
                          style={{ left: `${position}%` }}
                        >
                          {/* Node Circle */}
                          <motion.div 
                            className="relative z-20"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
                          >
                            {/* Outer Glow Rings */}
                            {[...Array(2)].map((_, i) => (
                              <motion.div 
                                key={`ring-${i}`}
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: `linear-gradient(to right bottom, ${i === 0 ? '#8B5CF6' : '#4F46E5'}, transparent)`,
                                }}
                                animate={{ 
                                  scale: [1, 2, 1],
                                  opacity: [0.4, 0, 0.4],
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity,
                                  delay: index * 0.3 + i * 1.5,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          
                            {/* Main Node */}
                            <div className="relative">
                              {/* Main circle with gradient */}
                              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.iconColor} shadow-lg flex items-center justify-center`}>
                                {step.icon}
                              </div>
                              
                              {/* Step content - topside or bottomside based on even/odd position */}
                              <div className={`absolute ${isTop ? 'bottom-full mb-3' : 'top-full mt-3'} left-1/2 -translate-x-1/2 w-[140px] text-center`}>
                                <div className="mb-1">
                                  <div className="font-semibold text-white text-sm">{step.title}</div>
                                  {/* Highlight badge */}
                                  <div className="inline-block mt-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">
                                    {step.highlight}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Brand Value Section Animation - Platform Icons */}
              <div className="mb-16">
                <h3 className="text-xl text-white font-semibold mb-8 text-center">Платформени икони</h3>
                
                <div className="flex justify-center items-center gap-10">
                  {[
                    { icon: <Instagram className="h-8 w-8" />, label: "Instagram", color: "text-rose-400" },
                    { icon: <TikTokIcon className="h-8 w-8" />, label: "TikTok", color: "text-slate-200" },
                    { icon: <Youtube className="h-8 w-8" />, label: "YouTube", color: "text-red-500" }
                  ].map((platform, index) => (
                    <motion.div 
                      key={`platform-${index}`}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                    >
                      <motion.div 
                        className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-800/70 backdrop-blur-sm border border-slate-700 mb-2 shadow-lg"
                        animate={{ 
                          y: [0, -5, 0, 5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4 + index,
                          ease: "easeInOut",
                        }}
                      >
                        <span className={platform.color}>{platform.icon}</span>
                      </motion.div>
                      <span className="text-sm font-medium text-slate-300">{platform.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Testimonials Section Animation - Before/After Transformation */}
              <div className="mb-16">
                <h3 className="text-xl text-white font-semibold mb-8 text-center">Трансформация Преди/След</h3>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  {/* Client Profile Card - Simple version without TypeScript errors */}
                  <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden p-6 max-w-[280px] w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-700 ring-1 ring-gray-800 mr-4">
                        <img 
                          src="https://via.placeholder.com/150/262626/ffffff?text=Profile"
                          alt="Before Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-1">Преди</p>
                        <div className="flex items-center text-sm text-slate-400">
                          <span className="mr-3">850 последователи</span>
                          <span>0.9% ангажираност</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 mb-2">
                      Business Coach. Опитвам се да развия онлайн присъствие.
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-600 text-white text-xs font-medium py-1 rounded text-center">
                        Follow
                      </div>
                      <div className="flex-1 bg-gray-800 text-white text-xs font-medium py-1 rounded text-center">
                        Message
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Arrow Animation */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut" 
                    }}
                    className="flex-shrink-0"
                  >
                    <ArrowRight className="h-8 w-8 text-blue-400" />
                  </motion.div>
                  
                  {/* Client Profile Card - After */}
                  <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-500/50 overflow-hidden p-6 max-w-[280px] w-full"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 ring-1 ring-blue-600 mr-4">
                        <img 
                          src="https://via.placeholder.com/150/262626/ffffff?text=Profile"
                          alt="After Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-1">След</p>
                        <div className="flex items-center text-sm text-slate-400">
                          <span className="mr-3">18.5K последователи</span>
                          <span className="text-green-400">3.8% ангажираност</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300 mb-1">
                      Business Coach | Професионални решения и експертиза
                    </div>
                    <div className="text-xs text-blue-400 mb-2">www.johnsmith.com</div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-600 text-white text-xs font-medium py-1 rounded text-center">
                        Follow
                      </div>
                      <div className="flex-1 bg-gray-800 text-white text-xs font-medium py-1 rounded text-center">
                        Message
                      </div>
                    </div>
                    
                    {/* Floating engagement bubbles */}
                    <div className="relative mt-4 h-12">
                      <motion.div
                        className="absolute left-0 top-0 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1"
                        animate={{ 
                          y: [0, -5, 0, 5, 0],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Heart className="h-3 w-3" />
                        <span>3.2K</span>
                      </motion.div>
                      
                      <motion.div
                        className="absolute left-1/4 top-1/2 bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1"
                        animate={{ 
                          y: [0, -7, 0],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>856</span>
                      </motion.div>
                      
                      <motion.div
                        className="absolute right-0 top-0 bg-gradient-to-br from-green-500 to-emerald-400 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1"
                        animate={{ 
                          y: [0, -5, 0],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        <Share2 className="h-3 w-3" />
                        <span>1.4K</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundSection>

        {/* Documentation Section - Using BackgroundSection for dark theme */}
        <BackgroundSection className="py-16" noPadding>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-blue-500"></div>
                <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">Документация</p>
                <div className="h-px w-12 bg-blue-500"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Как да <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">използвате</span> темата
              </h2>
              <p className="text-slate-300 mb-8">
                Следвайте тези насоки за създаване на нови страници, използвайки BrandBoost дизайн системата:
              </p>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden mb-8">
                <div className="border-b border-slate-700 px-6 py-3 flex items-center justify-between">
                  <span className="text-white font-medium">Структура на страница</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="text-slate-300 text-sm overflow-auto">
{`<div className="min-h-screen bg-white">
  <Header />
  <div className="pt-20">
    {/* Sections go here */}
    <BackgroundSection>...</BackgroundSection>
    <BackgroundSection2>...</BackgroundSection2>
    <BackgroundSection>...</BackgroundSection>
  </div>
  <Footer />
</div>`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden mb-8">
                <div className="border-b border-slate-700 px-6 py-3">
                  <span className="text-white font-medium">Примерна секция</span>
                </div>
                <div className="p-6">
                  <pre className="text-slate-300 text-sm overflow-auto">
{`<BackgroundSection className="py-16 relative overflow-hidden" noPadding>
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 bg-blue-500"></div>
          <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">
            Секция
          </p>
          <div className="h-px w-12 bg-blue-500"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Заглавие
          </span>
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Описание на секцията
        </p>
      </div>
      
      {/* Section content */}
      <div>
        {/* Your content here */}
      </div>
    </div>
  </div>
</BackgroundSection>`}
                  </pre>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-5 px-8 text-base font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1">
                  Започнете с темата
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </BackgroundSection>
      </div>

      {/* Standard Footer Component - Always include this */}
      <Footer />
    </div>
  );
};

export default ThemeTemplate; 