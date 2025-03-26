import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, BarChart2, PenTool, Video, User, Share2, TrendingUp, Users, Activity, Network, ChartPie, MessageSquare, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookCallSection } from '@/components/sections/BookCallSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { cn } from '@/lib/utils';

const Coaches = () => {
  useEffect(() => {
    document.title = "Solutions for Coaches - Clyc.io";
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  
  // Premium hero section references for parallax
  const heroRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  const { ref: heroContentRef, inView: heroInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        {/* Premium Hero section with AboutSection styling */}
        <section ref={heroRef} className="pt-32 pb-24 relative overflow-hidden">
          {/* Premium background with subtle animation */}
          <motion.div 
            style={{ y: backgroundY, opacity }}
            className="absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-gray-100"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1)_0%,rgba(255,255,255,0)_60%)]"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
          </motion.div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-40 right-[10%] w-64 h-64 rounded-full bg-primary-200 blur-[100px] opacity-20"></div>
          <div className="absolute bottom-40 left-[10%] w-80 h-80 rounded-full bg-blue-200 blur-[120px] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div ref={heroContentRef} className="max-w-4xl mx-auto">
              {/* Premium content container */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Highlight badge */}
                <motion.div 
                  className={cn(
                    "transition-all duration-1000",
                    heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <span className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium backdrop-blur-sm mb-6 border border-primary-100">
                    <Video className="h-4 w-4 mr-2 text-primary-500" /> Advanced AI Avatar Technology
                  </span>
                </motion.div>
                
                {/* Main heading with premium styling */}
                <h1 className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight transition-all duration-1000",
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Transform Your 
                  <span className="relative ml-2 text-primary-600">
                    Coaching Business
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary-500/60 rounded-full"></div>
                  </span>
                </h1>
                
                {/* Subtitle with premium styling */}
                <p className={cn(
                  "text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000",
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  Create premium content with AI Avatars while saving hours of filming time. Build an audience that converts into clients.
                </p>
                
                {/* CTA area with primary button */}
                <div className={cn(
                  "flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 transition-all duration-1000",
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
                    <a href="#book-call">
                      Book a Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  
                  <a href="#how-it-works" className="text-primary-600 font-medium hover:text-primary-700 flex items-center transition-colors">
                    See our process <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
                
                {/* Premium features highlights - checklist style */}
                <div className={cn(
                  "flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-3xl mx-auto mt-8 transition-all duration-1000",
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-lg">Data-Driven Strategy</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-lg">Professional Scriptwriting</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="text-gray-700 text-lg">AI Avatar Generation</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Comprehensive Process section with improved visuals */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Data-Driven Process</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  A comprehensive approach that delivers results, not just content
                </p>
              </div>

              {/* Tab navigation */}
              <div className="flex flex-wrap justify-center items-center mb-8 gap-3">
                <button 
                  onClick={() => setActiveStep(0)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeStep === 0 
                      ? "bg-primary-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <BarChart2 className="h-4 w-4" />
                  <span className="font-medium">Market Analysis</span>
                </button>
                
                <button 
                  onClick={() => setActiveStep(1)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeStep === 1 
                      ? "bg-primary-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <PenTool className="h-4 w-4" />
                  <span className="font-medium">Content Creation</span>
                </button>
                
                <button 
                  onClick={() => setActiveStep(2)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeStep === 2 
                      ? "bg-primary-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">Profile Optimization</span>
                </button>
                
                <button 
                  onClick={() => setActiveStep(3)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeStep === 3 
                      ? "bg-primary-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="font-medium">Distribution</span>
                </button>
                
                <button 
                  onClick={() => setActiveStep(4)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    activeStep === 4 
                      ? "bg-primary-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  <span className="font-medium">Constant Analysis</span>
                </button>
              </div>

              {/* Step content with enhanced visuals */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep === 0 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Market Analysis</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We conduct an in-depth analysis of your coaching niche to understand what content works and what doesn't before creating your strategy.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Competitor content performance analysis</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Audience demographics and preferences</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Strategy development based on real data</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Enhanced Market Analysis Visualization */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64">
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
                        <div className="w-full h-full flex items-center justify-center">
                          {/* Graph visualization */}
                          <div className="relative w-4/5 h-4/5">
                            {/* Horizontal axis */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-400 dark:bg-gray-500"></div>
                            
                            {/* Vertical axis */}
                            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gray-400 dark:bg-gray-500"></div>
                            
                            {/* Data bars */}
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '20%' }}
                              transition={{ duration: 0.7, delay: 0.1 }}
                              className="absolute bottom-0 left-[15%] w-6 bg-blue-200 dark:bg-blue-900 rounded-t"
                            ></motion.div>
                            
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '60%' }}
                              transition={{ duration: 0.7, delay: 0.2 }}
                              className="absolute bottom-0 left-[30%] w-6 bg-primary-500/70 dark:bg-primary-600/70 rounded-t"
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-700 dark:text-primary-300">
                                60%
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '30%' }}
                              transition={{ duration: 0.7, delay: 0.3 }}
                              className="absolute bottom-0 left-[45%] w-6 bg-blue-200 dark:bg-blue-900 rounded-t"
                            ></motion.div>
                            
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '75%' }}
                              transition={{ duration: 0.7, delay: 0.4 }}
                              className="absolute bottom-0 left-[60%] w-6 bg-primary-500/70 dark:bg-primary-600/70 rounded-t"
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-700 dark:text-primary-300">
                                75%
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: '40%' }}
                              transition={{ duration: 0.7, delay: 0.5 }}
                              className="absolute bottom-0 left-[75%] w-6 bg-blue-200 dark:bg-blue-900 rounded-t"
                            ></motion.div>
                            
                            {/* Labels */}
                            <div className="absolute top-2 left-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                              Engagement %
                            </div>
                            <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                              Content Type
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Content Creation</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We create engaging scripts using our filmmaking expertise, then use AI Avatars to generate videos without requiring your time for filming.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Professional scriptwriting by filmmaking experts</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">AI Avatar generation that looks and sounds like you</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Engaging editing techniques that maintain viewer attention</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Enhanced Content Creation Visualization */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden h-64">
                      <div className="absolute inset-0 flex flex-col">
                        {/* Script to Video Process Visualization */}
                        <div className="h-full w-full flex items-center">
                          <div className="w-full grid grid-cols-3 gap-2 px-4">
                            {/* Script */}
                            <div className="flex flex-col items-center justify-center">
                              <div className="mb-2 relative w-full aspect-[3/4] bg-white dark:bg-gray-800 rounded shadow-sm flex flex-col p-2">
                                <div className="h-2 w-2/3 bg-gray-400 dark:bg-gray-600 rounded mb-1"></div>
                                <div className="h-2 w-full bg-gray-400 dark:bg-gray-600 rounded mb-1"></div>
                                <div className="h-2 w-full bg-gray-400 dark:bg-gray-600 rounded mb-1"></div>
                                <div className="h-2 w-2/3 bg-gray-400 dark:bg-gray-600 rounded mb-1"></div>
                                <div className="h-2 w-full bg-gray-400 dark:bg-gray-600 rounded"></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Script</span>
                            </div>
                            
                            {/* Arrow Animation */}
                            <div className="flex items-center justify-center">
                              <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                <ArrowRight className="h-8 w-8 text-primary-500 dark:text-primary-400" />
                              </motion.div>
                            </div>
                            
                            {/* AI Video */}
                            <div className="flex flex-col items-center justify-center">
                              <div className="mb-2 relative w-full aspect-video bg-primary-900 dark:bg-primary-950 rounded shadow-sm overflow-hidden">
                                {/* Avatar placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-300"></div>
                                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>
                                
                                {/* Video controls */}
                                <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                                  <div className="h-1 w-3/4 bg-white/50 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-primary-500"
                                      animate={{ width: ["0%", "100%"] }}
                                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    ></motion.div>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Video</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Profile Optimization</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We transform your social media profiles into high-converting landing pages that showcase your expertise and attract ideal clients.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Strategic bio optimization with clear value proposition</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Curated highlights that showcase your expertise</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Pinned content strategy to maximize conversions</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Enhanced Profile Optimization Visualization */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-md">
                          {/* Mobile phone frame with profile visualization */}
                          <div className="relative mx-auto" style={{ width: "220px", height: "380px" }}>
                            {/* Phone frame */}
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 border-[10px] border-gray-800 dark:border-gray-700 rounded-3xl shadow-lg bg-white dark:bg-gray-800"
                            >
                              {/* Screen content */}
                              <div className="relative h-full overflow-hidden rounded-2xl">
                                {/* Header */}
                                <div className="h-14 bg-primary-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                    <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="h-2.5 w-20 bg-primary-200 dark:bg-primary-800 rounded-full"></div>
                                    <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mt-1"></div>
                                  </div>
                                </div>
                                
                                {/* Profile image and stats */}
                                <div className="px-4 pt-4">
                                  <div className="flex items-end mb-3">
                                    <motion.div 
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ delay: 0.2, duration: 0.5 }}
                                      className="w-16 h-16 rounded-full bg-primary-500 border-2 border-white dark:border-gray-800 shadow-sm"
                                    ></motion.div>
                                    <div className="flex ml-auto space-x-4">
                                      <motion.div 
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-center"
                                      >
                                        <div className="text-sm font-bold">84</div>
                                        <div className="text-xs text-gray-500">Posts</div>
                                      </motion.div>
                                      <motion.div 
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="text-center"
                                      >
                                        <div className="text-sm font-bold">15k</div>
                                        <div className="text-xs text-gray-500">Followers</div>
                                      </motion.div>
                                    </div>
                                  </div>
                                  
                                  {/* Bio */}
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                  >
                                    <div className="h-2.5 w-36 bg-gray-800 dark:bg-gray-200 rounded-full mb-1.5"></div>
                                    <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded-full mb-1"></div>
                                    <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-full mb-1"></div>
                                    <div className="h-2 w-5/6 bg-gray-300 dark:bg-gray-600 rounded-full mb-3"></div>
                                    
                                    {/* CTA button */}
                                    <motion.div 
                                      whileHover={{ scale: 1.03 }}
                                      className="h-6 w-full bg-primary-500 dark:bg-primary-600 rounded-md shadow-sm mb-4"
                                    ></motion.div>
                                  </motion.div>
                                  
                                  {/* Story highlights */}
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="flex space-x-4 mb-4 overflow-x-auto pb-2 no-scrollbar"
                                  >
                                    {[...Array(4)].map((_, i) => (
                                      <div key={i} className="flex-shrink-0 flex flex-col items-center">
                                        <motion.div 
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
                                          className={`w-12 h-12 rounded-full border-2 ${
                                            i === 0 ? 'bg-primary-100 border-primary-300 dark:bg-primary-900 dark:border-primary-700' :
                                            i === 1 ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700' :
                                            i === 2 ? 'bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700' :
                                            'bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-700'
                                          }`}
                                        ></motion.div>
                                        <div className="h-1.5 w-10 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></div>
                                      </div>
                                    ))}
                                  </motion.div>
                                  
                                  {/* Posts grid */}
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="grid grid-cols-3 gap-1"
                                  >
                                    {[...Array(6)].map((_, i) => (
                                      <motion.div 
                                        key={i}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.9 + (i * 0.05), duration: 0.3 }}
                                        className={`aspect-square rounded-sm ${
                                          i % 3 === 0 ? 'bg-primary-200 dark:bg-primary-900' :
                                          i % 3 === 1 ? 'bg-blue-200 dark:bg-blue-900' :
                                          'bg-purple-200 dark:bg-purple-900'
                                        }`}
                                      ></motion.div>
                                    ))}
                                  </motion.div>
                                </div>
                                
                                {/* "Before/After" indicators */}
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1.2, duration: 0.5 }}
                                  className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold py-1 px-2 rounded shadow-sm"
                                >
                                  OPTIMIZED
                                </motion.div>
                                
                                {/* Optimization highlights */}
                                <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1, duration: 0.5 }}
                                  className="absolute -right-20 top-1/4 bg-white dark:bg-gray-800 shadow-lg py-1 px-2 rounded text-xs border border-primary-100 dark:border-primary-900"
                                >
                                  <span className="text-primary-600 dark:text-primary-400">✓</span> Clear CTA
                                </motion.div>
                                
                                <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.1, duration: 0.5 }}
                                  className="absolute -right-24 top-2/4 bg-white dark:bg-gray-800 shadow-lg py-1 px-2 rounded text-xs border border-primary-100 dark:border-primary-900"
                                >
                                  <span className="text-primary-600 dark:text-primary-400">✓</span> Strategic Highlights
                                </motion.div>
                              </div>
                            </motion.div>
                            
                            {/* Animated optimization indicators */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ delay: 1.3, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg z-10"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Strategic Distribution</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We deploy proprietary systems to ensure your content reaches the right audience, no matter where you or your target clients are located.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Multi-platform distribution strategy</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Location-specific targeting for maximum reach</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Custom distribution systems for each channel</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Enhanced Distribution Visualization */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Hub and spoke visualization */}
                        <div className="relative">
                          {/* Central hub */}
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="h-16 w-16 rounded-full bg-primary-600 shadow-lg flex items-center justify-center z-20 relative"
                          >
                            <Share2 className="h-8 w-8 text-white" />
                          </motion.div>
                          
                          {/* Radiating pulse effect */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0.8 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                              className="h-16 w-16 rounded-full border-2 border-primary-500 dark:border-primary-400"
                            ></motion.div>
                          </div>
                          
                          {/* Distribution spokes and platforms */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: 260, height: 260 }}>
                            {/* Platform nodes positioned in a circle */}
                            {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                              const radian = (angle * Math.PI) / 180;
                              const x = 110 * Math.cos(radian);
                              const y = 110 * Math.sin(radian);
                              const platforms = ["FB", "IG", "TW", "YT", "LI", "TT"];
                              const colors = [
                                "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
                                "text-pink-600 bg-pink-100 dark:bg-pink-900 dark:text-pink-300",
                                "text-cyan-600 bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-300",
                                "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
                                "text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300",
                                "text-black bg-gray-100 dark:bg-gray-900 dark:text-white"
                              ];
                              
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                                  className={`absolute h-10 w-10 rounded-full shadow-md flex items-center justify-center ${colors[index]}`}
                                  style={{ 
                                    left: `calc(50% + ${x}px - 20px)`, 
                                    top: `calc(50% + ${y}px - 20px)`
                                  }}
                                >
                                  <span className="text-xs font-bold">{platforms[index]}</span>
                                </motion.div>
                              );
                            })}
                            
                            {/* Connecting lines */}
                            {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                              const radian = (angle * Math.PI) / 180;
                              const x2 = 110 * Math.cos(radian);
                              const y2 = 110 * Math.sin(radian);
                              
                              // Calculate the angle for the line
                              const lineAngle = Math.atan2(y2, x2) * (180 / Math.PI);
                              
                              return (
                                <motion.div
                                  key={`line-${index}`}
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                                  className="absolute bg-primary-400/70 dark:bg-primary-600/70 h-0.5 origin-left"
                                  style={{ 
                                    left: '50%', 
                                    top: '50%',
                                    width: '110px',
                                    transformOrigin: '0 0',
                                    transform: `rotate(${lineAngle}deg)`
                                  }}
                                ></motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Constant Analysis</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our work doesn't stop at implementation. We continuously analyze performance to refine your strategy and ensure optimal results.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Ongoing performance tracking across all platforms</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Content strategy refinement based on real-time data</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">Double down on successful formats for maximum ROI</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Enhanced Analytics Dashboard Visualization */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg p-6 h-64">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <ChartPie className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                              <span className="text-sm font-semibold">Performance Dashboard</span>
                            </div>
                            <div className="text-xs text-gray-500">Last 30 days</div>
                          </div>
                          
                          {/* Analytics charts */}
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Engagement</span>
                                <span className="text-green-600 dark:text-green-400">+28%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '65%' }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-green-500 rounded-full"
                                ></motion.div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Followers</span>
                                <span className="text-primary-600 dark:text-primary-400">+42%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '78%' }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full bg-primary-500 rounded-full"
                                ></motion.div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Conversions</span>
                                <span className="text-blue-600 dark:text-blue-400">+35%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: '52%' }}
                                  transition={{ duration: 1, delay: 0.4 }}
                                  className="h-full bg-blue-500 rounded-full"
                                ></motion.div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Best performing content */}
                          <div className="mt-4">
                            <div className="text-xs font-medium mb-2">Top Performing Content</div>
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-750 p-2 rounded">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded flex items-center justify-center">
                                  <Video className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="text-xs truncate">How to scale your coaching...</div>
                              </div>
                              <div className="flex items-center text-xs gap-1 text-green-600 dark:text-green-400">
                                <TrendingUp className="h-3 w-3" />
                                <span>248%</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Avatar Showcase Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Avatar Technology</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Save hours of filming time while creating premium content that looks and sounds just like you.
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-gray-900 to-primary-900 rounded-xl overflow-hidden aspect-video">
                {/* Video showcase placeholder with enhanced visuals */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative z-10 text-center px-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Video className="h-20 w-20 text-primary-400 mx-auto mb-6" />
                      <h3 className="text-white text-2xl font-medium mb-2">AI Avatar Demo</h3>
                      <p className="text-gray-300 mb-6">See how our technology creates lifelike videos without filming</p>
                      <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                        Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
                
                {/* Visual elements */}
                <div className="absolute inset-0">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3">Perfect Representation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI avatars precisely match your appearance and voice, ensuring authentic representation.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3">Time Efficiency</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create weeks of content without spending hours in front of the camera, saving you valuable time.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Professional-grade video and audio quality that establishes you as an authority in your niche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom testimonials section with title/subtitle */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Coaching Clients Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Hear from coaches who have transformed their business with Clyc.io.
              </p>
            </div>
            
            {/* Use TestimonialsSection without props */}
            <TestimonialsSection />
          </div>
        </section>

        {/* Use BookCallSection without props */}
        <BookCallSection />
      </main>
      <Footer />
    </div>
  );
};

export default Coaches; 