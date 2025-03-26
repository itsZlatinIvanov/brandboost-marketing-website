import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Film, User, ChevronRight, MessageSquare, BarChart, Sparkles } from 'lucide-react';

interface AnimatedCirclesProps {
  count?: number;
  color?: string;
  secondaryColor?: string;
  accentColor?: string;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
  className?: string;
  interactive?: boolean;
  mouseSensitivity?: number;
  showIcons?: boolean;
  patternStyle?: 'circles' | 'network' | 'particles';
}

export const AnimatedCircles = ({
  count = 5,
  color = 'rgba(59, 130, 246, 0.7)', // More vibrant blue
  secondaryColor = 'rgba(99, 102, 241, 0.7)', // Secondary color
  accentColor = 'rgba(236, 72, 153, 0.5)', // Accent (pink)
  minSize = 100,
  maxSize = 300,
  opacity = 0.3, // Increased base opacity
  className = '',
  interactive = true,
  mouseSensitivity = 12,
  showIcons = true,
  patternStyle = 'circles',
}: AnimatedCirclesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeBubble, setActiveBubble] = useState<number | null>(null);
  
  // Generate circles with enhanced visual appeal
  const circleProps = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
      const left = Math.floor(Math.random() * 100);
      const top = Math.floor(Math.random() * 100);
      const initialDelay = Math.floor(Math.random() * 3);
      const isLarge = size > (minSize + maxSize) / 2;
      
      // Different speeds based on size (larger = slower)
      const duration = isLarge ? 35 + Math.random() * 15 : 20 + Math.random() * 10;
      
      // Different blur and visual effects based on size
      const blurAmount = Math.random() * 5 + (isLarge ? 3 : 1);
      const baseOpacity = opacity * (1 + Math.random() * 0.7) * (isLarge ? 1.2 : 0.9);
      
      // Color theme - alternate between primary, secondary, and occasionally accent
      const colorTheme = i % 5 === 0 
        ? accentColor 
        : i % 2 === 0 
          ? color 
          : secondaryColor;
      
      // Custom icon for each circle
      const icon = [<Film key={i} />, <User key={i} />, <MessageSquare key={i} />, <BarChart key={i} />, <Sparkles key={i} />][i % 5];
      
      // Different motion patterns 
      const pattern = i % 4;
      let animationPattern;
      
      switch(pattern) {
        case 0:
          animationPattern = {
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 70, -30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 7, -7, 4, 0]
          };
          break;
        case 1:
          animationPattern = {
            x: [0, -70, 35, -25, 0],
            y: [0, 60, -40, 20, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
            rotate: [0, -5, 8, -3, 0]
          };
          break;
        case 2:
          animationPattern = {
            x: [0, 40, -60, 20, 0],
            y: [0, 30, 60, -40, 0],
            scale: [1, 1.05, 0.95, 1.1, 1],
            rotate: [0, 3, -6, 2, 0]
          };
          break;
        default:
          animationPattern = {
            x: [0, -50, -20, 40, 0],
            y: [0, -40, 60, 20, 0],
            scale: [1, 1.02, 0.98, 1.04, 1],
            rotate: [0, -4, 3, -5, 0]
          };
      }
      
      return {
        id: i,
        size,
        left,
        top,
        initialDelay,
        duration,
        blurAmount,
        baseOpacity,
        animationPattern,
        colorTheme,
        icon
      };
    });
  }, [count, minSize, maxSize, opacity, color, secondaryColor, accentColor]);
  
  // Connection lines for network pattern
  const connections = useMemo(() => {
    if (patternStyle !== 'network') return [];
    
    const lines = [];
    // Create connections between circles
    for (let i = 0; i < circleProps.length; i++) {
      for (let j = i + 1; j < circleProps.length; j++) {
        // Only connect some points to avoid too many lines
        if (Math.random() > 0.7) continue;
        
        lines.push({
          id: `${i}-${j}`,
          start: i,
          end: j,
          opacity: Math.random() * 0.5 + 0.1,
          duration: Math.random() * 5 + 5
        });
      }
    }
    return lines;
  }, [circleProps, patternStyle]);
  
  // Pre-generate particle props
  const particleProps = useMemo(() => {
    return Array.from({ length: count * 3 }, (_, i) => {
      const size = Math.floor(Math.random() * 12) + 3;
      const left = Math.floor(Math.random() * 100);
      const top = Math.floor(Math.random() * 100);
      const duration = 15 + Math.random() * 25;
      const delay = Math.random() * 5;
      
      // Create more dynamic movement patterns
      const waypoints = 4 + Math.floor(Math.random() * 3);
      const xMoves = Array.from({ length: waypoints }, () => Math.random() * 120 - 60);
      const yMoves = Array.from({ length: waypoints }, () => Math.random() * 120 - 60);
      
      // Add randomness to visibility/opacity
      const opacityPattern = [
        opacity * (0.4 + Math.random() * 0.4),
        opacity * (0.7 + Math.random() * 0.3),
        opacity * (0.3 + Math.random() * 0.3),
        opacity * (0.6 + Math.random() * 0.4)
      ];
      
      // Choose colors with some randomness
      const colorChoice = Math.random();
      const particleColor = colorChoice > 0.9 
        ? accentColor 
        : colorChoice > 0.5 
          ? secondaryColor 
          : color;
          
      const blurAmount = Math.random() * 2;
      
      return { 
        id: i,
        size, left, top, duration, delay, 
        xMoves, yMoves, opacityPattern,
        particleColor, blurAmount
      };
    });
  }, [count, opacity, color, secondaryColor, accentColor]);
  
  // Track mouse position for interactive effects
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setActiveBubble(null);
    };
    
    const elem = containerRef.current;
    if (elem) {
      elem.addEventListener('mouseenter', handleMouseEnter);
      elem.addEventListener('mouseleave', handleMouseLeave);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (elem) {
        elem.removeEventListener('mouseenter', handleMouseEnter);
        elem.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
    >
      {/* Draw lines between circles for network pattern */}
      {patternStyle === 'network' && connections.map(connection => {
        const startCircle = circleProps[connection.start];
        const endCircle = circleProps[connection.end];
        
        // Calculate positions (center of each circle)
        const x1 = startCircle.left + startCircle.size / 2 / maxSize * 50;
        const y1 = startCircle.top + startCircle.size / 2 / maxSize * 50;
        const x2 = endCircle.left + endCircle.size / 2 / maxSize * 50;
        const y2 = endCircle.top + endCircle.size / 2 / maxSize * 50;
        
        return (
          <motion.div
            key={connection.id}
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: '100%',
              height: '100%',
              opacity: connection.opacity,
            }}
            animate={{
              opacity: [connection.opacity, connection.opacity * 1.5, connection.opacity * 0.7, connection.opacity],
            }}
            transition={{
              duration: connection.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg width="100%" height="100%" className="absolute top-0 left-0">
              <line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="5,5"
                className="origin-center"
              />
            </svg>
          </motion.div>
        );
      })}
      
      {/* Main circles */}
      {circleProps.map((props, index) => {
        const { 
          id, size, left, top, initialDelay, duration, 
          blurAmount, baseOpacity, animationPattern, colorTheme, icon
        } = props;
        
        // Calculate distance from mouse for interactive effects
        const distX = mousePosition.x * 100 - left;
        const distY = mousePosition.y * 100 - top;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const isClose = distance < 30;
        
        return (
          <motion.div
            key={id}
            className="absolute rounded-full overflow-hidden backdrop-blur-sm"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity: baseOpacity,
              background: `radial-gradient(circle at 30% 30%, 
                ${colorTheme.replace(/[^,]+(?=\))/, '0.8')}, 
                ${colorTheme.replace(/[^,]+(?=\))/, '0.4')})`,
              boxShadow: `0 0 40px ${colorTheme}`,
              border: activeBubble === id ? `2px solid white` : undefined,
              zIndex: activeBubble === id ? 10 : undefined,
              filter: `blur(${blurAmount - (isClose && isHovering ? blurAmount * 0.7 : 0)}px)`,
              cursor: 'pointer',
            }}
            onClick={() => setActiveBubble(activeBubble === id ? null : id)}
            whileHover={{ 
              scale: 1.05, 
              opacity: baseOpacity * 1.3,
              filter: `blur(${blurAmount * 0.3}px)`,
              boxShadow: `0 0 60px ${colorTheme}`,
            }}
            animate={animationPattern}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: initialDelay,
            }}
          >
            {/* Interactive response to mouse */}
            {interactive && (
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{
                  x: isHovering ? (mousePosition.x - 0.5) * mouseSensitivity * (index % 2 === 0 ? 1 : -1) : 0, 
                  y: isHovering ? (mousePosition.y - 0.5) * mouseSensitivity * (index % 3 === 0 ? 1 : -1) : 0,
                  scale: isClose && isHovering ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
              >
                {/* Icon inside the circle */}
                {showIcons && (
                  <motion.div 
                    className="text-white opacity-80" 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ 
                      width: size / 4, 
                      height: size / 4,
                      opacity: isClose || activeBubble === id ? 0.9 : 0.3,
                    }}
                  >
                    {icon}
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Show popup content when active */}
            <AnimatePresence>
              {activeBubble === id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center"
                >
                  <div className="text-primary-700 mb-2">{icon}</div>
                  <h5 className="text-xs font-medium text-primary-900">
                    {index % 5 === 0 ? "AI Avatars" : 
                     index % 5 === 1 ? "Content Strategy" :
                     index % 5 === 2 ? "Engagement" :
                     index % 5 === 3 ? "Analytics" : "Results"}
                  </h5>
                  <p className="text-[8px] text-gray-600 mt-1 line-clamp-2">
                    {index % 5 === 0 ? "Create content without being on camera" : 
                     index % 5 === 1 ? "Data-driven content planning" :
                     index % 5 === 2 ? "Higher audience interaction" :
                     index % 5 === 3 ? "Track your performance" : "Grow your business"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      
      {/* Small particles animation */}
      {patternStyle !== 'network' && particleProps.map((props) => {
        const { 
          id, size, left, top, duration, delay, 
          xMoves, yMoves, opacityPattern, particleColor, blurAmount
        } = props;
        
        return (
          <motion.div
            key={`particle-${id}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: particleColor,
              opacity: opacityPattern[0],
              filter: `blur(${blurAmount}px)`,
              boxShadow: `0 0 ${size}px ${particleColor}`,
            }}
            animate={{
              x: xMoves,
              y: yMoves,
              opacity: opacityPattern,
              scale: [1, 1.2, 0.9, 1.1, 1]
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
      
      {/* Special interactive pulse effect when hovering */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 100,
            height: 100,
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            x: "-50%",
            y: "-50%",
            backgroundColor: "transparent",
            border: `2px solid ${color}`,
            opacity: 0.6,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
}; 