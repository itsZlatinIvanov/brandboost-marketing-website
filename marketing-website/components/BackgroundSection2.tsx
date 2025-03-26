import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BackgroundSection2Props {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const BackgroundSection2: React.FC<BackgroundSection2Props> = ({ 
  children, 
  className = "",
  noPadding = false
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Values for different 3D transformations
  const glowX = useTransform(mouseX, [-100, 100], [0, 100]);
  const glowY = useTransform(mouseY, [-100, 100], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  // Animations for the section
  const sectionControls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      sectionControls.start("visible");
    } else {
      sectionControls.start("hidden");
    }
  }, [inView, sectionControls]);

  // Determine appropriate padding class
  const paddingClass = noPadding ? '' : 'py-16 md:py-20';

  return (
    <section 
      className={`overflow-hidden relative isolate bg-gradient-to-b from-white via-slate-50/90 to-purple-50/30 ${paddingClass} ${className}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-200/60 via-transparent to-blue-100/40 bg-[length:200%_200%]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'], 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "mirror", 
          ease: "linear" 
        }}
      />
      
      {/* Enhanced glow effects */}
      <motion.div 
        className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full opacity-70"
        style={{ 
          background: `radial-gradient(circle at ${50 + glowX.get() * 0.1}% ${50 + glowY.get() * 0.1}%, rgba(168, 85, 247, 0.25), transparent 70%)`
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 rounded-full opacity-60"
        style={{ 
          background: `radial-gradient(circle at ${50 - glowX.get() * 0.1}% ${50 - glowY.get() * 0.1}%, rgba(59, 130, 246, 0.2), transparent 70%)`
        }}
      />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-gradient-to-br from-purple-300 to-blue-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 1.2 + 0.3,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Star trails */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Enhanced particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 1.5 + 0.5,
            }}
            animate={{
              y: [0, -Math.random() * 80 - 40],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0, 0.4, 0],
              scale: [0, Math.random() * 1.5 + 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern with purple tint */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjNjE2MEZGMDgiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgZmlsbD0iIzYxNjBGRjA4Ii8+PC9nPjwvc3ZnPg==')] opacity-20 bg-[size:30px_30px]" />
      
      {/* Content */}
      <div ref={ref} className="relative z-10">
        {children}
      </div>
      
      {/* Existing animations */}
      <style>
        {`
        @keyframes shine {
          0% { left: -100px; }
          100% { left: 200%; }
        }
        
        .group:hover .group-hover\\:animate-shine {
          animation: shine 0.8s ease-in-out;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .animate-slow-pulse {
          animation: slow-pulse 4s ease-in-out infinite;
        }
        
        .animate-slow-pulse-delay {
          animation: slow-pulse 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .perspective-\\[1200px\\] {
          perspective: 1200px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        `}
      </style>
    </section>
  );
}; 