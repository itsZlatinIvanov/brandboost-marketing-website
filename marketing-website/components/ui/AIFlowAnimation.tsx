import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, User, Sparkles, BrainCircuit } from 'lucide-react';

interface AIFlowAnimationProps {
  className?: string;
  intensity?: number;
  colorTheme?: 'blue' | 'purple' | 'cyan';
}

export const AIFlowAnimation = ({
  className = '',
  intensity = 1,
  colorTheme = 'blue',
}: AIFlowAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Color theme configuration
  const colors = {
    blue: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      tertiary: '#93c5fd',
      glow: 'rgba(59, 130, 246, 0.6)',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      tertiary: '#c4b5fd',
      glow: 'rgba(139, 92, 246, 0.6)',
    },
    cyan: {
      primary: '#06b6d4',
      secondary: '#67e8f9',
      tertiary: '#a5f3fc',
      glow: 'rgba(6, 182, 212, 0.6)',
    }
  }[colorTheme];

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

  // Generate some random particles
  const particles = Array.from({ length: 75 * intensity }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: (Math.random() * 20 + 15) / intensity,
    delay: Math.random() * 10,
  }));

  // Icons representing different stages of content creation
  const icons = [
    { icon: <BrainCircuit className="w-full h-full" />, position: { x: 20, y: 30 }, delay: 0 },
    { icon: <Film className="w-full h-full" />, position: { x: 40, y: 60 }, delay: 0.5 },
    { icon: <User className="w-full h-full" />, position: { x: 60, y: 35 }, delay: 1 },
    { icon: <Sparkles className="w-full h-full" />, position: { x: 80, y: 55 }, delay: 1.5 },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 ${className}`}
      style={{ minHeight: '400px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}
      />
      
      {/* Flow streams - these create curved paths for particles to follow */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {/* Don't actually render these paths - they're just for reference */}
        <defs>
          <path
            id="flow-path-1"
            d={`M ${dimensions.width * 0.1},${dimensions.height * 0.3} 
                C ${dimensions.width * 0.3},${dimensions.height * 0.1} 
                  ${dimensions.width * 0.6},${dimensions.height * 0.8} 
                  ${dimensions.width * 0.9},${dimensions.height * 0.5}`}
          />
          <path
            id="flow-path-2"
            d={`M ${dimensions.width * 0.1},${dimensions.height * 0.7} 
                C ${dimensions.width * 0.4},${dimensions.height * 0.9} 
                  ${dimensions.width * 0.6},${dimensions.height * 0.2} 
                  ${dimensions.width * 0.9},${dimensions.height * 0.4}`}
          />
        </defs>
      </svg>

      {/* Glow orbs - large, blurred circles that create atmosphere */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            width: dimensions.width * 0.6,
            height: dimensions.width * 0.6,
            top: dimensions.height * 0.3,
            left: dimensions.width * 0.2,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
            width: dimensions.width * 0.4,
            height: dimensions.width * 0.4,
            top: dimensions.height * 0.7,
            left: dimensions.width * 0.8,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Flowing particles */}
      {particles.map((particle) => {
        // Determine which path to follow
        const pathId = particle.id % 2 === 0 ? "flow-path-1" : "flow-path-2";
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.id % 3 === 0 
                ? colors.primary 
                : particle.id % 3 === 1 
                  ? colors.secondary 
                  : colors.tertiary,
              boxShadow: `0 0 ${particle.size * 2}px ${colors.glow}`,
              zIndex: 2,
            }}
            initial={{ 
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                opacity: [0, 0.9, 0],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          </motion.div>
        );
      })}

      {/* Content creation icons */}
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute flex items-center justify-center"
          style={{
            width: '60px',
            height: '60px',
            left: `${item.position.x}%`,
            top: `${item.position.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.1, 1],
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: item.delay + 0.5,
            ease: "backOut",
          }}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center p-3"
            style={{
              backgroundColor: `${colors.primary}40`,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${colors.primary}70`,
              boxShadow: `0 0 20px ${colors.glow}`,
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${colors.glow}`, 
                `0 0 30px ${colors.glow}`, 
                `0 0 20px ${colors.glow}`
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <motion.div 
              className="text-white"
              animate={{
                opacity: [0.7, 1, 0.7],
                rotateY: [0, 360],
              }}
              transition={{
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
            >
              {item.icon}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Connection lines between icons - they pulsate and glow */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        {icons.map((start, startIndex) => 
          icons.map((end, endIndex) => {
            if (startIndex >= endIndex) return null;
            
            const startX = dimensions.width * (start.position.x / 100);
            const startY = dimensions.height * (start.position.y / 100);
            const endX = dimensions.width * (end.position.x / 100);
            const endY = dimensions.height * (end.position.y / 100);
            
            return (
              <motion.line
                key={`${startIndex}-${endIndex}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={colors.secondary}
                strokeWidth="1"
                strokeDasharray="6,4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0.6, 0.4],
                  strokeDashoffset: [0, -20],
                }}
                transition={{
                  opacity: { 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (startIndex + endIndex) * 0.5 + 1
                  },
                  strokeDashoffset: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            );
          })
        )}
      </svg>

      {/* Mouse interaction effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}; 