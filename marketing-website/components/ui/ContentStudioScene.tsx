import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Film, User, MessageSquare, BarChart, Sparkles, Zap, Play, VideoIcon, Edit, Brain, Bot, Settings, Check } from 'lucide-react';

interface ContentStudioSceneProps {
  className?: string;
  autoPlay?: boolean;
  colorTheme?: 'blue' | 'purple' | 'cyan' | 'dark';
  speedFactor?: number;
}

export const ContentStudioScene = ({
  className = '',
  autoPlay = true,
  colorTheme = 'blue',
  speedFactor = 1,
}: ContentStudioSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentStep, setCurrentStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  
  const contentPreviewRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Color theme configuration
  const colors = {
    blue: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      text: '#eff6ff',
      dark: '#1e40af',
      light: '#93c5fd',
      background: 'from-slate-900 to-blue-900',
      glow: 'rgba(59, 130, 246, 0.5)',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      text: '#f5f3ff',
      dark: '#5b21b6',
      light: '#c4b5fd',
      background: 'from-slate-900 to-purple-900',
      glow: 'rgba(139, 92, 246, 0.5)',
    },
    cyan: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#67e8f9',
      text: '#ecfeff',
      dark: '#0e7490',
      light: '#a5f3fc',
      background: 'from-slate-900 to-cyan-900',
      glow: 'rgba(6, 182, 212, 0.5)',
    },
    dark: {
      primary: '#64748b',
      secondary: '#475569',
      accent: '#94a3b8',
      text: '#f1f5f9',
      dark: '#334155',
      light: '#cbd5e1',
      background: 'from-slate-900 to-slate-800',
      glow: 'rgba(100, 116, 139, 0.5)',
    }
  }[colorTheme];
  
  // Define the content creation process steps
  const steps = [
    { 
      id: 'ideation', 
      title: 'Content Analysis',
      icon: <Brain className="w-8 h-8" />,
      description: 'AI analyzes your niche and audience to identify optimal content',
    },
    { 
      id: 'script', 
      title: 'Script Generation',
      icon: <Edit className="w-8 h-8" />,
      description: 'Professional scripts are created and refined',
    },
    { 
      id: 'avatar', 
      title: 'Avatar Creation',
      icon: <User className="w-8 h-8" />,
      description: 'Your digital twin speaks and moves naturally',
    },
    { 
      id: 'production', 
      title: 'Video Production',
      icon: <Film className="w-8 h-8" />,
      description: 'Complete videos with professional editing',
    },
    { 
      id: 'analytics', 
      title: 'Performance Tracking',
      icon: <BarChart className="w-8 h-8" />,
      description: 'Measure engagement and conversion metrics',
    }
  ];
  
  // Content preview variations
  const contentVariations = [
    { 
      title: "5 Mindset Shifts for Success",
      thumbnail: "/content-preview-1.jpg",
      views: "32.4K",
      engagement: "89%",
      conversion: "4.7%",
    },
    { 
      title: "How to Double Your Results",
      thumbnail: "/content-preview-2.jpg",
      views: "18.7K",
      engagement: "92%",
      conversion: "5.2%",
    },
    { 
      title: "Transform Your Business",
      thumbnail: "/content-preview-3.jpg",
      views: "42.3K",
      engagement: "86%",
      conversion: "3.9%",
    }
  ];
  
  // Text for script generation visualization
  const scriptContent = [
    "Opening hook: 'Are you struggling to see results from your coaching business?'",
    "Problem statement: 'Most coaches waste 10+ hours weekly on content that doesn't convert'",
    "Solution intro: 'Here are 5 mindset shifts that transformed my business...'",
    "Point 1: 'First, stop creating random content. Instead...'",
    "Point 2: 'Second, focus on transformation, not information'",
    "Call to action: 'Download my free guide to learn all 5 shifts'"
  ];
  
  // Update dimensions on mount and resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Auto-advance steps when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 4000 / speedFactor);
    
    return () => clearInterval(interval);
  }, [isPlaying, speedFactor, steps.length]);
  
  // Run animation for current step
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    });
    
    return () => {
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.3, ease: "easeIn" }
      });
    };
  }, [currentStep, controls]);
  
  // Calculate element positions
  const getStepPosition = (index: number) => {
    const totalSteps = steps.length;
    const angleIncrement = (2 * Math.PI) / totalSteps;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
    
    const angle = angleIncrement * index - Math.PI / 2;
    const x = dimensions.width / 2 + radius * Math.cos(angle);
    const y = dimensions.height / 2 + radius * Math.sin(angle);
    
    return { x, y };
  };
  
  // Simulated avatar recording state
  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    if (currentStep === 2) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  }, [currentStep]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${colors.background} ${className}`}
      style={{ minHeight: '500px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
        backgroundSize: '40px 40px' 
      }}></div>
      
      {/* Moving light effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle at center, ${colors.primary}80, transparent 70%)`,
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Central content preview area */}
      <div 
        ref={contentPreviewRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] aspect-video bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl"
      >
        {/* Content preview visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {currentStep === 0 && (
              <div className="absolute inset-0 flex flex-col">
                <div className="p-3 bg-gray-900 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-3.5 h-3.5" />
                      <span>Audience Analysis</span>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2 p-3 bg-gray-800 text-white text-xs">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Trending topic identified</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Audience pain points analyzed</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Competitor content gaps found</span>
                  </div>
                  <div className="mt-auto p-2 bg-gray-700 rounded text-center">
                    <span className="text-green-400">AI suggests: "5 Mindset Shifts"</span>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="absolute inset-0 flex flex-col">
                <div className="p-3 bg-gray-900 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Edit className="w-3.5 h-3.5" />
                      <span>Script Generation</span>
                    </div>
                    <div className="animate-pulse text-green-400 font-mono text-xs">Writing...</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-0.5 p-3 bg-gray-800 text-white text-[8px] leading-tight font-mono">
                  {scriptContent.map((line, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.5 }}
                      className="flex gap-1"
                    >
                      <span className="text-gray-400">{idx + 1}.</span>
                      <span>{line}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="absolute inset-0 flex flex-col">
                <div className="p-3 bg-gray-900 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Avatar Creation</span>
                    </div>
                    {isRecording && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px]">RECORDING</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-end justify-center overflow-hidden border-2 border-gray-600">
                      {/* Simplified avatar face */}
                      <div className="w-12 h-10 bg-[#e2bb9b] rounded-t-full relative">
                        <div className="absolute top-2 left-2 w-2 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-2 right-2 w-2 h-1 bg-gray-800 rounded-full"></div>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                    {/* Audio waveform visualization */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5">
                      {Array.from({ length: 9 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-green-400"
                          animate={{ 
                            height: isRecording 
                              ? [2, 4 + i * 2, 10, 4 + i * 2, 2] 
                              : 2
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Processing indicators */}
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 rounded-full px-2 py-0.5 text-[8px] text-white"
                      animate={{ opacity: isRecording ? [0, 1, 0] : 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Lip sync processing
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="absolute inset-0 flex flex-col">
                <div className="p-3 bg-gray-900 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      <span>Video Production</span>
                    </div>
                    <div className="text-[8px] text-blue-400">RENDERING</div>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-3">
                  {/* Video timeline visualization */}
                  <div className="absolute bottom-12 left-0 right-0 h-20 px-3">
                    <div className="bg-gray-700 h-full rounded-md overflow-hidden flex flex-col">
                      <div className="flex h-14 gap-1 p-1">
                        <div className="w-1/4 h-full bg-purple-500/40 rounded-sm flex items-center justify-center text-white text-[8px]">Intro</div>
                        <div className="w-2/4 h-full bg-blue-500/40 rounded-sm flex items-center justify-center text-white text-[8px]">Main Points</div>
                        <div className="w-1/4 h-full bg-green-500/40 rounded-sm flex items-center justify-center text-white text-[8px]">CTA</div>
                      </div>
                      
                      <div className="h-6 bg-gray-800 flex items-center px-2">
                        <motion.div 
                          className="h-3 w-1 bg-red-500 rounded-full"
                          animate={{ left: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          style={{ position: 'relative' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-4 left-3 right-3">
                    <div className="text-[8px] text-white mb-1 flex justify-between">
                      <span>Rendering video...</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        animate={{ width: ['0%', '72%'] }}
                        transition={{ duration: 5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="absolute inset-0 flex flex-col">
                <div className="p-3 bg-gray-900 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-3.5 h-3.5" />
                      <span>Performance</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[8px]">LIVE</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-3 text-[8px] text-white">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-gray-700/60 rounded-md p-2 flex flex-col items-center">
                      <span className="text-gray-400">Views</span>
                      <span className="text-lg font-bold">38.2K</span>
                    </div>
                    <div className="bg-gray-700/60 rounded-md p-2 flex flex-col items-center">
                      <span className="text-gray-400">Engagement</span>
                      <span className="text-lg font-bold text-green-400">89%</span>
                    </div>
                    <div className="bg-gray-700/60 rounded-md p-2 flex flex-col items-center">
                      <span className="text-gray-400">Conv. Rate</span>
                      <span className="text-lg font-bold text-blue-400">4.3%</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-2">Growth Trajectory</div>
                  
                  {/* Simple graph */}
                  <div className="h-16 bg-gray-700/30 rounded-md p-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path 
                        d="M0,40 L10,38 L20,35 L30,33 L40,30 L50,25 L60,20 L70,15 L80,10 L90,5 L100,0" 
                        fill="none" 
                        stroke={colors.accent} 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Playback controls */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Settings className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
      
      {/* Process steps around the center */}
      {steps.map((step, index) => {
        const pos = getStepPosition(index);
        const isActive = currentStep === index;
        
        return (
          <motion.div
            key={step.id}
            className={`absolute flex items-center justify-center ${isActive ? 'z-10' : 'z-0'}`}
            style={{ 
              left: pos.x, 
              top: pos.y, 
              transform: 'translate(-50%, -50%)' 
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setCurrentStep(index);
              setIsPlaying(false);
            }}
          >
            <motion.div 
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-colors cursor-pointer relative ${isActive ? 'bg-opacity-100' : 'bg-opacity-50'}`}
              animate={{ 
                backgroundColor: isActive ? `${colors.primary}90` : `${colors.primary}30`,
                boxShadow: isActive ? `0 0 30px ${colors.glow}` : 'none'
              }}
            >
              {/* Connect to center with line */}
              {isActive && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2={dimensions.width / 2 - pos.x + 12}
                      y2={dimensions.height / 2 - pos.y + 12}
                      stroke={colors.accent}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.div>
              )}
              
              <div className={`text-white ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {step.icon}
              </div>
              
              <motion.div 
                className={`absolute -bottom-10 text-center w-32 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
              >
                <p className="text-white text-sm font-medium">{step.title}</p>
                <p className="text-gray-400 text-xs mt-1">{step.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Content results floating at the right */}
      <div className="absolute top-6 right-6 pointer-events-none">
        <AnimatePresence>
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 20, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden w-44 border border-white/20 shadow-xl"
            >
              <div className="p-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white">
                <div className="text-xs font-medium">Content Performance</div>
              </div>
              
              <div className="p-2">
                {contentVariations.map((content, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 mb-2 last:mb-0"
                  >
                    <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center">
                      <VideoIcon className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-xs truncate w-24">{content.title}</div>
                      <div className="flex gap-2 text-[8px]">
                        <span className="text-gray-400">{content.views} views</span>
                        <span className="text-green-400">{content.conversion} conv</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Progress dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentStep === index ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => {
              setCurrentStep(index);
              setIsPlaying(false);
            }}
          />
        ))}
      </div>
      
      {/* Play/pause button */}
      <button
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/20"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <div className="w-3 h-3 border-l-2 border-r-2 border-white"></div>
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>
    </div>
  );
}; 