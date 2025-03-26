import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Check, Star, TrendingUp, Clock, Users, Instagram, Youtube, MessageCircle, Heart, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BackgroundSection } from '../BackgroundSection';
import Image from 'next/image';
import Link from 'next/link';
import { SocialProofItem } from '../SocialProofItem';
import StatisticCard from '../StatisticCard';

interface HeroSectionProps {
  className?: string;
}

// Type for bubble animations
interface BubbleAnimation {
  x: number[];
  y: number[];
}

// Social media results showcase data
const socialMediaResults = [
  {
    image: "/results/result1.png",
    views: "280.2K",
    position: "top-24 -right-20",
    scale: "scale-100",
    zIndex: "z-30",
    borderColor: "from-purple-500 to-pink-500",
    icon: "play",
    name: "Torino",
    label: ""
  },
  {
    image: "/results/result2.png",
    views: "2.6M",
    position: "top-8 right-48",
    scale: "scale-100", 
    zIndex: "z-30",
    borderColor: "from-blue-400 to-cyan-400",
    icon: "eye",
    name: "NikFit",
    label: ""
  },
  {
    image: "/results/result3.png",
    views: "230K",
    position: "bottom-24 left-16",
    scale: "scale-125",
    zIndex: "z-30",
    borderColor: "from-purple-500 to-pink-500",
    icon: "play",
    name: "Ventsislav Zisov",
    label: ""
  },
  {
    image: "/results/result4.png",
    views: "673.1K",
    position: "bottom-8 right-16",
    scale: "scale-100",
    zIndex: "z-30",
    borderColor: "from-blue-400 to-cyan-400",
    icon: "play",
    name: "TonyInk",
    label: ""
  },
];

// Engagement metrics bubbles data
const engagementBubbles = [
  {
    type: "likes",
    value: "15.2K",
    position: "top-1/4 right-1/3",
    sourceCard: 0,
    delay: 0,
    duration: 8,
    icon: <Heart className="h-3 w-3" />,
    color: "bg-gradient-to-br from-pink-500 to-rose-500"
  },
  {
    type: "comments",
    value: "2.8K",
    position: "bottom-1/3 right-1/4",
    sourceCard: 1,
    delay: 1.5,
    duration: 7,
    icon: <MessageSquare className="h-3 w-3" />,
    color: "bg-gradient-to-br from-blue-500 to-cyan-400"
  },
  {
    type: "shares",
    value: "5.6K",
    position: "top-1/3 left-1/4",
    sourceCard: 2,
    delay: 0.8,
    duration: 9,
    icon: <Share2 className="h-3 w-3" />,
    color: "bg-gradient-to-br from-green-500 to-emerald-400"
  },
  {
    type: "likes",
    value: "48K",
    position: "bottom-1/4 left-1/3",
    sourceCard: 3,
    delay: 2.2,
    duration: 10,
    icon: <Heart className="h-3 w-3" />,
    color: "bg-gradient-to-br from-pink-500 to-rose-500"
  },
  {
    type: "comments",
    value: "963",
    position: "top-1/2 right-20",
    sourceCard: 0,
    delay: 1.2,
    duration: 8.5,
    icon: <MessageSquare className="h-3 w-3" />,
    color: "bg-gradient-to-br from-blue-500 to-cyan-400"
  },
  {
    type: "shares",
    value: "1.2K",
    position: "bottom-40 right-1/2",
    sourceCard: 1,
    delay: 2.5,
    duration: 7.5,
    icon: <Share2 className="h-3 w-3" />,
    color: "bg-gradient-to-br from-green-500 to-emerald-400"
  },
  {
    type: "likes",
    value: "32K",
    position: "top-40 left-1/2",
    sourceCard: 2,
    delay: 3,
    duration: 9.5,
    icon: <Heart className="h-3 w-3" />,
    color: "bg-gradient-to-br from-pink-500 to-rose-500"
  },
  {
    type: "comments",
    value: "6.5K",
    position: "top-2/3 left-20",
    sourceCard: 3,
    delay: 1.8,
    duration: 8.2,
    icon: <MessageSquare className="h-3 w-3" />,
    color: "bg-gradient-to-br from-blue-500 to-cyan-400"
  },
];

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bubbleAnimations, setBubbleAnimations] = useState<BubbleAnimation[]>([]);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate bubble physics animation paths
  useEffect(() => {
    if (isLoaded) {
      const animations: BubbleAnimation[] = engagementBubbles.map((bubble) => {
        // Bubble physics parameters
        const baseSpeed = 8 + (Math.random() * 4); // Base rising speed
        const wobbleFrequency = 0.5 + (Math.random() * 0.3); // How frequently the bubble wobbles
        const wobbleAmplitude = 5 + (Math.random() * 15); // How far the bubble wobbles
        const accelerationFactor = 1.15; // Bubbles accelerate slightly as they rise
        
        // Create bubble path
        const xPoints: number[] = [];
        const yPoints: number[] = [];
        const steps = 8;
        
        // Starting horizontal drift direction (random)
        let horizontalDrift = Math.random() > 0.5 ? 1 : -1;
        
        for (let i = 0; i < steps; i++) {
          // Calculate vertical position (bubbles rise upward, so negative y values)
          // Apply acceleration factor to make bubbles rise faster as they go up
          const distance = Math.pow(i + 1, accelerationFactor) * baseSpeed;
          const yPosition = -distance;
          
          // Calculate horizontal wobble using sine wave for natural oscillation
          // More pronounced at the beginning, reduces as the bubble rises
          const wobbleEffect = Math.sin(i * wobbleFrequency) * wobbleAmplitude * (1 - i/steps/1.5);
          const xPosition = wobbleEffect * horizontalDrift;
          
          xPoints.push(xPosition);
          yPoints.push(yPosition);
        }
        
        return {
          x: xPoints,
          y: yPoints
        };
      });
      
      setBubbleAnimations(animations);
    }
  }, [isLoaded]);

  return (
    <BackgroundSection className="min-h-[90vh] flex items-center justify-center" noPadding>
      <div className="max-w-screen-xl w-full relative z-10 mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column: Value proposition & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Personalized headline */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-blue-500"></div>
                <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">За локални бизнеси и инфлуенсъри</p>
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Създаваме съдържание</span>, което се вижда от милиони
              </h1>
              
              <h2 className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                Стратегия за социални мрежи, която превръща профила ти в машина за клиенти и приходи
              </h2>
            </div>
            
            {/* Primary and secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-6 px-8 text-base font-medium shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1"
                onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
              >
                Вземи безплатна консултация
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Trust indicator */}
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p>Избор на <span className="text-white font-medium">над 150 локални бизнеса и инфлуенсъри</span></p>
            </div>
          </motion.div>
          
          {/* Right column: Social Media Results Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative h-[550px] w-full"
          >
            <div className="absolute inset-0">
              {/* Decorative gradient circles */}
              <div className="absolute top-64 right-64 w-32 h-32 bg-blue-500 rounded-full opacity-30 filter blur-xl"></div>
              <div className="absolute top-20 -right-10 w-24 h-24 bg-blue-600 rounded-full opacity-30 filter blur-xl"></div>
              <div className="absolute bottom-40 -left-10 w-24 h-24 bg-purple-500 rounded-full opacity-30 filter blur-xl"></div>
              <div className="absolute bottom-20 right-32 w-32 h-32 bg-purple-500 rounded-full opacity-30 filter blur-xl"></div>
              
              {/* Social media result cards */}
              {socialMediaResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.5 + (index * 0.2),
                    ease: "easeOut",
                  }}
                  className={`absolute ${result.position} ${result.zIndex} overflow-hidden rounded-2xl p-[2px] aspect-[9/16] w-44 ${result.scale}`}
                  style={{
                    background: `linear-gradient(to bottom right, ${result.borderColor.split(' ')[1].replace('to-', '')}, ${result.borderColor.split(' ')[0].replace('from-', '')})`
                  }}
                >
                  <motion.div 
                    className="relative h-full w-full overflow-hidden rounded-xl bg-slate-900"
                    animate={{ 
                      y: [0, -5, 0, 5, 0],
                      rotate: [0, 1, 0, -1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6 + index,
                      ease: "easeInOut",
                    }}
                  >
                    <img 
                      src={result.image}
                      alt="Social media content" 
                      className="h-full w-full object-cover"
                    />
                    
                    {/* View count badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-purple-500/50">
                      {result.icon === "play" ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                          <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
                        </svg>
                      )}
                      <span className="font-medium text-sm">{result.views}</span>
                    </div>
                    
                    {/* Name badge if available */}
                    {result.name && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded-sm text-xs font-medium">
                        {result.name}
                      </div>
                    )}
                    
                    {/* Optional top label */}
                    {result.label && (
                      <div className="absolute top-3 left-0 right-0 text-center text-white text-sm font-medium">
                        {result.label}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Floating engagement metric bubbles */}
              {engagementBubbles.map((bubble, index) => {
                // Get source card position
                const sourceCard = socialMediaResults[bubble.sourceCard];
                const sourceCardPositionClass = sourceCard.position;
                
                // Define bubble properties based on type
                const bubbleDuration = 3 + Math.random() * 2; // 3-5 seconds
                const bubbleDelay = bubble.delay * 0.8;
                
                // Set higher z-index for bubbles coming from result3, so they appear on top of it
                const zIndex = (bubble.sourceCard === 2 && bubble.position === "bottom-24 left-10") ? "z-40" : "z-20";
                
                return (
                  <motion.div
                    key={`bubble-${index}`}
                    className={`absolute ${sourceCardPositionClass} ${zIndex} flex items-center gap-1 rounded-full px-3 py-1.5 shadow-lg ${bubble.color} text-white text-xs font-semibold`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.2,
                      x: 0,
                      y: 0
                    }}
                    animate={isLoaded && bubbleAnimations.length > 0 ? { 
                      opacity: [0, 0.85, 0.9, 0.7, 0.5, 0.3, 0], 
                      scale: [0.3, 0.8, 1, 1.1, 1.05, 0.9, 0.7],
                      x: bubbleAnimations[index]?.x || [0, 5, -5, 7, -7, 3, -3, 0],
                      y: bubbleAnimations[index]?.y || [0, -20, -50, -90, -140, -200, -270, -350]
                    } : { opacity: 0 }}
                    transition={{
                      duration: bubbleDuration,
                      delay: bubbleDelay,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 1.5 + 0.5,
                      ease: [0.1, 0.3, 0.5, 0.7], // Custom ease curve for bubble-like movement
                    }}
                  >
                    {bubble.icon}
                    <span>{bubble.value}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundSection>
  );
};
