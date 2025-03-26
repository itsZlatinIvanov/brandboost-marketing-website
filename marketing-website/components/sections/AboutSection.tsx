import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Users, Sparkles, Award, ArrowRight, Clock, Target, Lightbulb, CheckCircle, Heart, TrendingUp, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { keepForLater } from '@/utils/types';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story'); // 'story', 'mission', 'values', 'team'
  const sectionRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };
  
  const tabVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { scale: 1, opacity: 1 }
  };

  // Timeline data - Updated to reflect Zane's personal journey
  const timelineData = [
    { 
      year: '2016', 
      title: 'Building My Brand', 
      description: 'I started my personal brand journey, focusing on digital marketing and business growth strategies that resonated in my local market.'
    },
    { 
      year: '2018', 
      title: 'Coaching Breakthrough', 
      description: 'I launched my coaching business, helping entrepreneurs apply my proven methods to scale their operations and improve efficiency.'
    },
    { 
      year: '2020', 
      title: 'Expanding My Impact', 
      description: 'I began implementing my coaching frameworks in other businesses, achieving remarkable growth even during challenging market conditions.'
    },
    { 
      year: '2021', 
      title: 'The AI Revelation', 
      description: 'I recognized how AI could transform content creation for coaches. This insight sparked my journey into combining coaching expertise with AI technology.'
    },
    { 
      year: '2023', 
      title: 'Vision Realized', 
      description: 'I launched this platform, bringing together my coaching background and AI knowledge to solve the biggest challenge coaches face: creating consistent, authentic content.'
    },
  ];

  // Team data - Featuring Zane prominently
  const teamData = [
    { 
      name: 'Zane', 
      role: 'Founder & CEO', 
      bio: 'After building a successful coaching business, I discovered how AI could solve the content creation challenges I personally faced. Now I\'m passionate about helping other coaches scale their impact without the burnout.',
      image: '/team/zane.jpg' 
    },
    { 
      name: 'Maya Chen', 
      role: 'Head of AI Development', 
      bio: 'Maya joined after seeing how my coaching methodology transformed businesses. She brings technical expertise to translate my coaching insights into AI solutions.',
      image: '/team/maya.jpg' 
    },
    { 
      name: 'Liam Davidson', 
      role: 'Client Success Director', 
      bio: 'Liam was one of my coaching clients who experienced such transformative results that he joined my team to help others achieve similar success with our AI platform.',
      image: '/team/liam.jpg' 
    },
  ];

  // Values data - More personally connected to Zane
  const valuesData = [
    { 
      icon: <Heart className="w-6 h-6" />, 
      title: 'Born from Experience', 
      description: 'Everything I build comes from my personal experience as a coach. I\'ve lived the challenges our platform solves.' 
    },
    { 
      icon: <Target className="w-6 h-6" />, 
      title: 'Client Transformation', 
      description: 'I judge our success by the tangible transformation our clients experience - in their business growth and personal freedom.' 
    },
    { 
      icon: <TrendingUp className="w-6 h-6" />, 
      title: 'Results-Driven', 
      description: 'I\'m obsessed with delivering measurable results. If it doesn\'t create real impact for coaches, it doesn\'t make the cut.' 
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: 'Practical Innovation', 
      description: 'I believe in pushing technological boundaries, but only in service of creating practical solutions that solve real coaching challenges.' 
    },
  ];

  // Industry leaders/case studies data
  const caseStudiesData = [
    {
      name: "Sarah Johnson",
      title: "Life Coach & Bestselling Author",
      image: "/case-studies/sarah.jpg",
      result: "3.5x audience growth",
      quote: "Working with Zane transformed my online presence. I'm reaching more people than ever while spending less time on content creation."
    },
    {
      name: "Marcus Fernandez",
      title: "Business Coach",
      image: "/case-studies/marcus.jpg",
      result: "12 hrs/week saved",
      quote: "The AI solution allowed me to double my client roster because I wasn't spending all my time creating content."
    },
    {
      name: "Elena Chen",
      title: "Health & Wellness Coach",
      image: "/case-studies/elena.jpg",
      result: "248% engagement increase",
      quote: "My audience connects with my content more than ever, and it perfectly captures my voice and expertise."
    }
  ];

  // Prevent TypeScript warnings - moved inside the component where variables are in scope
  keepForLater(Sparkles);
  keepForLater(Lightbulb);
  keepForLater(containerVariants);
  keepForLater(itemVariants);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
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
        <div ref={ref} className="max-w-screen-xl mx-auto">
          {/* Header with animated underline */}
          <div className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium backdrop-blur-sm mb-6 border border-primary-100">
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mr-2"
              ></motion.span>
              Meet Zane
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              My Journey from Coach to
              <span className="relative ml-2 text-primary-600">
                AI Innovator
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary-500/60 rounded-full"></div>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              How my experiences building a coaching business led me to create AI solutions that free coaches from content creation while amplifying their impact.
            </p>
          </div>
          
          {/* Premium tab navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/80 backdrop-blur p-1.5 rounded-xl shadow-md border border-gray-100">
              {[
                { id: 'story', label: 'My Story' },
                { id: 'mission', label: 'My Mission' },
                { id: 'values', label: 'My Values' },
                { id: 'team', label: 'Our Team' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative px-6 py-3 rounded-lg text-sm font-medium transition-all overflow-hidden",
                    activeTab === tab.id 
                      ? "text-primary-700" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? "active" : "inactive"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === tab.id && (
                    <motion.div 
                      className="absolute inset-0 bg-primary-50 rounded-lg border border-primary-100"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab content container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {/* Our Story Tab */}
              {activeTab === 'story' && (
                <motion.div
                  key="story-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">Zane's Story</h3>
                    
                    {/* Interactive timeline */}
                    <div className="relative">
                      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100 rounded-full"></div>
                      
                      {timelineData.map((item, index) => (
                        <div 
                          key={index} 
                          className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                        >
                          <motion.div 
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true, amount: 0.8 }}
                            className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
                          >
                            <div className={`${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1`}>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                  {item.year.substring(2)}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                              </div>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </motion.div>
                          
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary-500 rounded-full border-4 border-white shadow"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Personal story insight */}
                    <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-xl text-white">
                      <h4 className="text-xl font-bold mb-4">My Turning Point</h4>
                      <p className="mb-4">
                        After years of growing my coaching business and helping clients scale theirs, I kept seeing the same frustrating pattern: incredible experts with transformative knowledge were severely limited by their inability to create consistent content.
                      </p>
                      <p>
                        This realization was my "aha moment" - I could combine my coaching experience with AI technology to solve this universal problem. I knew firsthand how content creation was the biggest bottleneck for coaches, and I became obsessed with creating a solution that maintained authenticity while eliminating the time burden.
                      </p>
                    </div>
                    
                    {/* Results */}
                    <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-md"
                      >
                        <div className="text-primary-600 text-4xl font-bold mb-2">350+</div>
                        <div className="text-gray-700 font-medium">Coaches Empowered</div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-md"
                      >
                        <div className="text-blue-600 text-4xl font-bold mb-2">275%</div>
                        <div className="text-gray-700 font-medium">Average Engagement Increase</div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-md"
                      >
                        <div className="text-green-600 text-4xl font-bold mb-2">15hrs+</div>
                        <div className="text-gray-700 font-medium">Weekly Time Saved</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mission Tab */}
              {activeTab === 'mission' && (
                <motion.div
                  key="mission-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-8 rounded-xl shadow-lg mb-12">
                      <h3 className="text-2xl font-bold mb-4">My Mission</h3>
                      <p className="text-xl font-light italic">
                        "To free coaches from the content creation prison so they can focus on their zone of genius, while ensuring their authentic voice reaches and impacts more people than ever before."
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                        <h4 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                          <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-3">
                            <Target className="w-4 h-4" />
                          </span>
                          My Vision
                        </h4>
                        <p className="text-gray-600">
                          I envision a world where coaches impact millions through authentic digital presence, without sacrificing their precious time and energy on content creation.
                        </p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                        <h4 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                            <Award className="w-4 h-4" />
                          </span>
                          My Unique Approach
                        </h4>
                        <p className="text-gray-600">
                          Unlike purely technical solutions, I combine my lived coaching experience with AI expertise to create solutions that truly understand the nuances of coaching businesses.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <h4 className="text-xl font-bold mb-4 text-center">The Problems I Personally Faced</h4>
                      <p className="text-gray-600 text-center mb-6">
                        As I built my coaching business, these were the challenges that limited my growth and impact:
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                          <Clock className="w-8 h-8 text-red-500 mb-2" />
                          <p className="text-center text-sm">Countless hours lost to content creation instead of coaching my clients</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                          <Users className="w-8 h-8 text-amber-500 mb-2" />
                          <p className="text-center text-sm">My expertise wasn't reaching the people who needed it most</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                          <Target className="w-8 h-8 text-blue-500 mb-2" />
                          <p className="text-center text-sm">Inconsistent presence led to missed opportunities and slower growth</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Values Tab */}
              {activeTab === 'values' && (
                <motion.div
                  key="values-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">What I Stand For</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {valuesData.map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.8 }}
                          className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 hover:bg-primary-50 cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors">
                              {value.icon}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h4>
                              <p className="text-gray-600">{value.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-xl">
                      <h4 className="text-xl font-bold mb-4">My Personal Promise</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                          <p>I will never recommend a solution I haven't personally used and verified in my own coaching business.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                          <p>I guarantee your AI content will authentically represent you—maintaining your unique voice, expertise, and style.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                          <p>I'm committed to delivering measurable results you can see in both your calendar (time saved) and your metrics (audience growth).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Team Tab */}
              {activeTab === 'team' && (
                <motion.div
                  key="team-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">The People Behind The Vision</h3>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {teamData.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.8 }}
                          className="group"
                        >
                          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all group-hover:-translate-y-2">
                            <div className="h-56 bg-gray-200 relative overflow-hidden">
                              {/* Placeholder for team member image */}
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400">
                                {member.name}
                              </div>
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                <div className="p-4">
                                  <div className="flex gap-2 mb-2">
                                    <a href="#" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <h4 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h4>
                              <p className="text-primary-600 font-medium mb-3 pb-3 border-b border-gray-100">{member.role}</p>
                              <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white">
                      <h4 className="text-xl font-bold mb-6 text-center">Why We Work Together</h4>
                      <p className="text-gray-200 mb-6">
                        My team and I share a common passion: we believe that coaches and experts who can transform lives shouldn't be held back by technical limitations or time-consuming content creation. Together, we bring decades of combined experience in coaching, AI development, and content strategy.
                      </p>
                      <p className="text-gray-300 italic text-center">
                        "We're building what I desperately needed as a coach - a way to share my knowledge without spending all my time creating content."
                        <span className="block mt-2 font-semibold">- Zane</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* NEW SECTION: Trusted by Industry Leaders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto mt-24"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium backdrop-blur-sm mb-6 border border-amber-100">
                <Star className="w-4 h-4 mr-2 text-amber-500" />
                Trusted by Industry Leaders
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Coaches Who Have Transformed Their <span className="text-primary-600">Digital Presence</span>
              </h2>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These successful coaches have leveraged our AI solutions to expand their reach while reclaiming their time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudiesData.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true, amount: 0.6 }}
                  className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    {/* Placeholder for case study image */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400">
                      {study.name} Photo
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <div className="bg-amber-500 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md">
                        {study.result}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{study.name}</h3>
                    <p className="text-primary-600 text-sm font-medium mb-4">{study.title}</p>
                    
                    <div className="relative mb-6 pl-4">
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary-200 rounded-full"></div>
                      <p className="text-gray-600 italic text-sm">"{study.quote}"</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link to="/case-studies" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                        Read Full Case Study
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button asChild className="bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
                <Link to="/case-studies">
                  View All Success Stories
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 