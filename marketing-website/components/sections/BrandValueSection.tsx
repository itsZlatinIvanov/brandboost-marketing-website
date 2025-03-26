import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Youtube, ChevronRight, BarChart2, Users, Target, Star, ArrowRight } from 'lucide-react';
import { BackgroundSection } from '../BackgroundSection';

// Custom TikTok icon component that accepts className prop
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
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

export const BrandValueSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Core benefits with icons and metrics - updated with consistent blue/purple colors
  const coreBenefits = [
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
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <BackgroundSection className="py-16 relative overflow-hidden" noPadding>
      {/* Background gradient pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjMDAwMDAwMDUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgZmlsbD0iIzAwMDAwMDA1Ii8+PC9nPjwvc3ZnPg==')] opacity-25 bg-[size:30px_30px]" />

      {/* Decorative elements similar to HeroSection */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-10 filter blur-xl"></div>
      <div className="absolute bottom-40 -left-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 filter blur-xl"></div>
      <div className="absolute bottom-20 right-32 w-40 h-40 bg-indigo-500 rounded-full opacity-10 filter blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Section header - updated with brand consistent styling */}
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">Наша методология</p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Трансформираме социални мрежи
              </span>
              <br />
              в машини за продажби
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Не просто управляваме профили, а изграждаме цялостни системи за привличане на клиенти и генериране на реални бизнес резултати
            </p>
          </motion.div>

          {/* Platform logos with floating animation */}
          <motion.div
            className="flex justify-center items-center gap-10 mb-16"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            {[
              { icon: <Instagram className="h-8 w-8" />, label: "Instagram", color: "text-rose-400" },
              { icon: <TikTokIcon className="h-8 w-8" />, label: "TikTok", color: "text-slate-200" },
              { icon: <Youtube className="h-8 w-8" />, label: "YouTube", color: "text-red-500" }
            ].map((platform, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                variants={fadeInUp}
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

          {/* Core benefits cards with brand-aligned styling */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            {coreBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 transform transition-all hover:-translate-y-1 hover:border-blue-500/50"
                variants={fadeInUp}
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

          {/* Improved visual representation of our content strategy */}
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 mb-16 overflow-hidden relative border border-slate-700"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold text-white mb-8 text-center">
              Нашата стратегия за <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">успешно дигитално присъствие</span>
            </h3>
            
            {/* Flow diagram with improved animated connection */}
            <div className="relative">
              {/* Connection line with gradient */}
              <motion.div 
                className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 -z-10"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              
              <div className="grid grid-cols-3 gap-8">
                {[
                  { 
                    title: "Привличане", 
                    desc: "Висококачествено съдържание, което таргетира точната аудитория",
                    icon: <Target className="h-5 w-5" />,
                    color: "from-blue-500 to-purple-600"
                  },
                  { 
                    title: "Ангажиране", 
                    desc: "Изграждане на връзка и доверие чрез стойностни взаимодействия",
                    icon: <Star className="h-5 w-5" />,
                    color: "from-purple-500 to-indigo-600"
                  },
                  { 
                    title: "Конвертиране", 
                    desc: "Превръщане на последователи в клиенти чрез целеви призиви",
                    icon: <Users className="h-5 w-5" />,
                    color: "from-indigo-500 to-blue-600" 
                  }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + (i * 0.2) }}
                  >
                    <div className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-br ${step.color} shadow-lg flex items-center justify-center mb-4`}>
                      <span className="text-white">{step.icon}</span>
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-300 text-center">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trust indicator - mirroring the hero section */}
          <motion.div
            className="flex items-center justify-center gap-3 text-sm text-slate-400 mb-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p>Избор на <span className="text-white font-medium">над 150 локални бизнеса и инфлуенсъри</span></p>
          </motion.div>

          {/* CTA - matched to hero section */}
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-4 px-8 text-base font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 inline-flex items-center gap-2"
              onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
            >
              <span>Вземи безплатна консултация</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </BackgroundSection>
  );
};
