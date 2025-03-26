import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, FileCheck, Key, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackgroundSection } from '../BackgroundSection';

interface ProcessStep {
  id: string;
  title: string;
  highlight: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const ProcessSection = () => {
  const pathProgress = useMotionValue(0);

  const processSteps: ProcessStep[] = [
    {
      id: "discovery",
      title: "Безплатна консултация",
      highlight: "96% успеваемост",
      icon: <Phone className="w-6 h-6 text-white" />,
      iconColor: "from-purple-600 to-indigo-600"
    },
    {
      id: "strategy",
      title: "Персонализирана стратегия",
      highlight: "3.2x ROI",
      icon: <FileCheck className="w-6 h-6 text-white" />,
      iconColor: "from-indigo-600 to-blue-600"
    },
    {
      id: "onboarding",
      title: "Достъп до системи",
      highlight: "12ч спестени",
      icon: <Key className="w-6 h-6 text-white" />,
      iconColor: "from-blue-600 to-cyan-600"
    },
    {
      id: "launch",
      title: "Започваме",
      highlight: "+127% ръст",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconColor: "from-cyan-600 to-purple-600"
    }
  ];

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      pathProgress.set(1);
    }
  }, [inView, pathProgress]);

  return (
    <BackgroundSection className="relative overflow-hidden" noPadding>
      <section className="py-16 md:py-20" ref={ref}>
        <div className="container px-4 md:px-6 mx-auto">
          {/* Title section - updated for dark theme */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">Стъпки</p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Как да станете <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">наш клиент</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Опростен процес от 4 стъпки за започване на вашата трансформация
            </p>
          </div>
          
          {/* Roadmap Container - updated for dark theme */}
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
              {/* Rest of SVG elements remain mostly unchanged */}
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
              
              {/* Background Path Layers - updated colors for dark theme */}
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
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                filter="url(#glow)"
              />
              
              {/* Animated Glow Effect */}
              <motion.line 
                x1="10%" 
                y1="50%" 
                x2="90%" 
                y2="50%" 
                stroke="url(#roadmapGradient)" 
                strokeWidth="14"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: inView ? 1 : 0, opacity: 0.25 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                filter="url(#glow)"
              />
              
              {/* Animated Particles Along Path */}
              {[...Array(3)].map((_, i) => {
                // Calculate initial position based on index
                const initialPosition = 10 + (i * 5);
                
                return (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={`${initialPosition}%`}
                    cy="50%"
                    r="3"
                    fill="white"
                    filter="url(#glow)"
                    opacity="0.7"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      cx: ["10%", "90%"],
                    }}
                    transition={{
                      duration: 3,
                      delay: 1.5 + (i * 0.8),
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  />
                );
              })}

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

            {/* Step Points - text colors updated for dark theme */}
            <div className="absolute inset-0">
              {processSteps.map((step, index) => {
                const position = 10 + (index * (80 / (processSteps.length - 1)));
                const isTop = index % 2 === 0;
                
                return (
                  <div 
                    key={step.id} 
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${position}%` }}
                  >
                    {/* Node Circle */}
                    <motion.div 
                      className="relative z-20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
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
          
          {/* Mobile version for small screens only */}
          <div className="md:hidden mt-16 space-y-6">
            {processSteps.map((step, index) => (
              <div key={`mobile-${step.id}`} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-purple-100/80 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br ${step.iconColor} shadow-md`}>
                      {React.cloneElement(step.icon as React.ReactElement, { className: 'w-5 h-5 text-white' })}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {step.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            className="relative mt-16 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.4 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md">
              <div className="p-4 relative overflow-hidden flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium mb-0.5">
                    Готов ли си да започнеш твоята трансформация?
                  </p>
                  <p className="text-blue-100 text-xs">
                    30-минутен разговор • Без обвързване
                  </p>
                </div>
                <Button
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 text-sm font-medium rounded-lg border border-white/20 backdrop-blur-sm"
                  onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
                >
                  <span className="relative z-10">Запазете час</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </BackgroundSection>
  );
};
