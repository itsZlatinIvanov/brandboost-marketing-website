import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Film, User, MessageSquare, BarChart, Sparkles, Zap, BrainCircuit, Code, Target } from 'lucide-react';

interface AnimatedBackdropProps {
  className?: string;
  particleCount?: number;
  nodeCount?: number;
  flowIntensity?: number;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'multi';
  interactive?: boolean;
}

export const AnimatedBackdrop = ({
  className = '',
  particleCount = 150,
  nodeCount = 8,
  flowIntensity = 1,
  colorScheme = 'blue',
  interactive = true,
}: AnimatedBackdropProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [dataFlowActive, setDataFlowActive] = useState(false);
  
  // Color configurations
  const colors = useMemo(() => {
    switch(colorScheme) {
      case 'purple':
        return {
          primary: 'rgba(124, 58, 237, 0.8)',
          secondary: 'rgba(139, 92, 246, 0.7)',
          accent: 'rgba(167, 139, 250, 0.6)',
          particle: 'rgba(124, 58, 237, 0.5)',
          glow: '#7c3aed',
          highlight: '#9333ea'
        };
      case 'cyan':
        return {
          primary: 'rgba(6, 182, 212, 0.8)',
          secondary: 'rgba(34, 211, 238, 0.7)',
          accent: 'rgba(103, 232, 249, 0.6)',
          particle: 'rgba(6, 182, 212, 0.5)',
          glow: '#06b6d4',
          highlight: '#0891b2'
        };
      case 'multi':
        return {
          primary: 'rgba(6, 182, 212, 0.8)',
          secondary: 'rgba(79, 70, 229, 0.7)',
          accent: 'rgba(236, 72, 153, 0.6)',
          particle: 'rgba(16, 185, 129, 0.5)',
          glow: '#8b5cf6',
          highlight: '#ec4899'
        };
      default: // blue
        return {
          primary: 'rgba(37, 99, 235, 0.8)',
          secondary: 'rgba(59, 130, 246, 0.7)',
          accent: 'rgba(96, 165, 250, 0.6)',
          particle: 'rgba(37, 99, 235, 0.5)',
          glow: '#3b82f6',
          highlight: '#2563eb'
        };
    }
  }, [colorScheme]);

  // Generate nodes (connection points)
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      // Strategic positioning - nodes form a loose oval around the center
      let xFactor, yFactor;
      
      if (i < nodeCount/4) { // Top quadrant
        xFactor = 0.3 + Math.random() * 0.4; // 0.3-0.7
        yFactor = 0.1 + Math.random() * 0.25; // 0.1-0.35
      } else if (i < nodeCount/2) { // Right quadrant
        xFactor = 0.65 + Math.random() * 0.25; // 0.65-0.9
        yFactor = 0.3 + Math.random() * 0.4; // 0.3-0.7
      } else if (i < 3*nodeCount/4) { // Bottom quadrant
        xFactor = 0.3 + Math.random() * 0.4; // 0.3-0.7
        yFactor = 0.65 + Math.random() * 0.25; // 0.65-0.9
      } else { // Left quadrant
        xFactor = 0.1 + Math.random() * 0.25; // 0.1-0.35
        yFactor = 0.3 + Math.random() * 0.4; // 0.3-0.7
      }
      
      // Center node for special placement
      if (i === 0) {
        xFactor = 0.5;
        yFactor = 0.5;
      }
      
      // Decide which icon to use
      const iconOptions = [
        <BrainCircuit key={i} />, 
        <Film key={i} />, 
        <BarChart key={i} />, 
        <Target key={i} />, 
        <User key={i} />, 
        <Zap key={i} />,
        <Code key={i} />,
        <MessageSquare key={i} />,
        <Sparkles key={i} />
      ];
      
      return {
        id: i,
        x: xFactor, 
        y: yFactor,
        size: i === 0 ? 60 : 30 + Math.random() * 15, // Size varies, center node is larger
        pulseSpeed: 1 + Math.random(),
        icon: iconOptions[i % iconOptions.length],
        label: i === 0 ? "AI Core" : 
               i % 5 === 1 ? "Content" :
               i % 5 === 2 ? "Analytics" :
               i % 5 === 3 ? "Audience" : "Strategy",
        description: i === 0 ? "Intelligent content system" :
                    i % 5 === 1 ? "Professional content creation" :
                    i % 5 === 2 ? "Performance tracking" :
                    i % 5 === 3 ? "Audience targeting" : "Growth framework",
        connections: [] as number[]
      };
    });
  }, [nodeCount]);
  
  // Create connection network between nodes
  const connections = useMemo(() => {
    const results = [];
    
    // For each node, create 1-3 connections to other nodes
    for (let i = 0; i < nodes.length; i++) {
      // Center node connects to all
      if (i === 0) {
        for (let j = 1; j < nodes.length; j++) {
          results.push({
            id: `0-${j}`,
            from: 0,
            to: j,
            strength: 0.7 + Math.random() * 0.3,
            animationDuration: 2 + Math.random() * 2,
            pulseDelay: Math.random() * 2
          });
          nodes[i].connections.push(j);
          nodes[j].connections.push(0);
        }
        continue;
      }
      
      // Other nodes connect to 1-3 nodes (excluding already connected ones)
      const connectionsCount = 1 + Math.floor(Math.random() * 2);
      const alreadyConnected = new Set(nodes[i].connections);
      
      for (let c = 0; c < connectionsCount; c++) {
        // Find a node to connect to
        let attempts = 0;
        let targetNode;
        
        do {
          targetNode = Math.floor(Math.random() * nodes.length);
          attempts++;
        } while ((targetNode === i || alreadyConnected.has(targetNode)) && attempts < 10);
        
        if (attempts < 10) {
          results.push({
            id: `${i}-${targetNode}`,
            from: i,
            to: targetNode,
            strength: 0.5 + Math.random() * 0.5,
            animationDuration: 2 + Math.random() * 3,
            pulseDelay: Math.random() * 4
          });
          nodes[i].connections.push(targetNode);
          nodes[targetNode].connections.push(i);
          alreadyConnected.add(targetNode);
        }
      }
    }
    
    return results;
  }, [nodes]);
  
  // Generate data particles that flow along connections
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // Choose a random connection for this particle to travel along
      const connectionIdx = Math.floor(Math.random() * connections.length);
      const connection = connections[connectionIdx];
      
      // Speed and delay
      const speed = (1 + Math.random() * 3) * flowIntensity;
      const delay = Math.random() * 10;
      
      // Size and color variation
      const size = 2 + Math.random() * 4;
      
      return {
        id: i,
        connectionIdx,
        from: connection.from,
        to: connection.to,
        speed,
        delay,
        size,
        active: Math.random() > 0.3 // Some particles start active
      };
    });
  }, [particleCount, connections, flowIntensity]);
  
  // Update dimensions when window resizes
  useEffect(() => {
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
    
    // Start data flow animation after initial render
    const timer = setTimeout(() => {
      setDataFlowActive(true);
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);
  
  // Track mouse for interactive effects
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
      setActiveNode(null);
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
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px' 
      }} />
      
      {/* Add a subtle glow in the center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${colors.primary} 0%, rgba(0,0,0,0) 70%)`,
          opacity: 0.15
        }} 
      />
      
      {/* Connection lines */}
      <svg width="100%" height="100%" className="absolute top-0 left-0 pointer-events-none">
        {connections.map(connection => {
          const fromNode = nodes[connection.from];
          const toNode = nodes[connection.to];
          
          // Calculate absolute positions
          const x1 = fromNode.x * dimensions.width;
          const y1 = fromNode.y * dimensions.height;
          const x2 = toNode.x * dimensions.width;
          const y2 = toNode.y * dimensions.height;
          
          // Determine if this connection should be highlighted
          const isActiveConnection = 
            (activeNode !== null && (activeNode === connection.from || activeNode === connection.to));
          
          return (
            <g key={connection.id}>
              {/* Base connection line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActiveConnection ? colors.highlight : colors.secondary}
                strokeWidth={isActiveConnection ? 2 : 1}
                strokeOpacity={connection.strength}
                strokeDasharray={isActiveConnection ? "none" : "4,4"}
              />
              
              {/* Animated pulse along connection */}
              {dataFlowActive && (
                <motion.circle
                  r={isActiveConnection ? 4 : 3}
                  fill={isActiveConnection ? colors.highlight : colors.primary}
                  initial={{ 
                    cx: x1, 
                    cy: y1,
                    opacity: 0 
                  }}
                  animate={{ 
                    cx: [x1, x2], 
                    cy: [y1, y2],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: connection.animationDuration / flowIntensity,
                    ease: "linear",
                    repeat: Infinity,
                    delay: connection.pulseDelay
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Data particles flowing along connections */}
      {dataFlowActive && particles.map(particle => {
        if (!particle.active) return null;
        
        const connection = connections[particle.connectionIdx];
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        // Calculate absolute positions
        const x1 = fromNode.x * dimensions.width;
        const y1 = fromNode.y * dimensions.height;
        const x2 = toNode.x * dimensions.width;
        const y2 = toNode.y * dimensions.height;
        
        // Determine if this particle is on an active connection
        const isOnActiveConnection = 
          (activeNode !== null && (activeNode === connection.from || activeNode === connection.to));
        
        return (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: isOnActiveConnection ? particle.size * 1.5 : particle.size,
              height: isOnActiveConnection ? particle.size * 1.5 : particle.size,
              backgroundColor: isOnActiveConnection ? colors.highlight : colors.particle,
              boxShadow: `0 0 ${particle.size * 2}px ${isOnActiveConnection ? colors.highlight : colors.glow}`,
            }}
            initial={{ 
              x: x1 - (particle.size / 2), 
              y: y1 - (particle.size / 2),
              opacity: 0 
            }}
            animate={{ 
              x: [x1 - (particle.size / 2), x2 - (particle.size / 2)], 
              y: [y1 - (particle.size / 2), y2 - (particle.size / 2)],
              opacity: [0, 0.9, 0]
            }}
            transition={{
              duration: 3 / (particle.speed * flowIntensity),
              ease: "linear",
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        );
      })}
      
      {/* Network nodes */}
      {nodes.map((node, index) => {
        // Calculate absolute position
        const x = node.x * dimensions.width;
        const y = node.y * dimensions.height;
        
        // Scale based on importance
        const isCenter = index === 0;
        const isActive = activeNode === index;
        const isConnectedToActive = activeNode !== null && node.connections.includes(activeNode);
        
        // Boost size for center node or active nodes
        const sizeMultiplier = isCenter ? 1.2 : isActive ? 1.3 : isConnectedToActive ? 1.1 : 1;
        
        return (
          <motion.div
            key={`node-${node.id}`}
            className="absolute rounded-full flex items-center justify-center cursor-pointer"
            style={{
              width: node.size * sizeMultiplier,
              height: node.size * sizeMultiplier,
              x: x - ((node.size * sizeMultiplier) / 2),
              y: y - ((node.size * sizeMultiplier) / 2),
              background: `radial-gradient(circle at 30% 30%, 
                ${isCenter || isActive ? colors.highlight : colors.primary} 0%, 
                ${isCenter || isActive ? colors.primary : colors.secondary} 80%)`,
              boxShadow: `0 0 ${isActive ? 30 : 15}px ${isActive ? colors.highlight : colors.glow}`,
              zIndex: isActive ? 40 : isCenter ? 30 : 20,
            }}
            onClick={() => setActiveNode(activeNode === index ? null : index)}
            whileHover={{ 
              scale: 1.1,
              boxShadow: `0 0 30px ${colors.highlight}`,
            }}
            animate={{
              scale: [1, 1 + (0.05 * node.pulseSpeed), 1],
              boxShadow: [
                `0 0 ${isActive ? 25 : 15}px ${isActive ? colors.highlight : colors.glow}`,
                `0 0 ${isActive ? 35 : 20}px ${isActive ? colors.highlight : colors.glow}`,
                `0 0 ${isActive ? 25 : 15}px ${isActive ? colors.highlight : colors.glow}`
              ]
            }}
            transition={{
              duration: 2 / node.pulseSpeed,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {/* Node icon */}
            <motion.div 
              className="text-white opacity-90" 
              style={{ width: node.size / 2.5, height: node.size / 2.5 }}
            >
              {node.icon}
            </motion.div>
            
            {/* Info popup for active node */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute top-full mt-2 bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg text-left w-48 z-50 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-primary-700 mb-1 flex items-center">
                    <span className="mr-2">{node.icon}</span>
                    <h5 className="font-bold text-sm">{node.label}</h5>
                  </div>
                  <p className="text-xs text-gray-700">{node.description}</p>
                  
                  {/* Connected services */}
                  {node.connections.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-[10px] text-gray-500 mb-1">Connected services:</p>
                      <div className="flex flex-wrap gap-1">
                        {node.connections.map(connId => (
                          <span key={connId} className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            {nodes[connId].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      
      {/* Mouse interaction effects */}
      {isHovering && interactive && (
        <motion.div
          className="absolute rounded-full pointer-events-none mix-blend-screen"
          style={{
            width: 150,
            height: 150,
            left: mousePosition.x * dimensions.width,
            top: mousePosition.y * dimensions.height,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, ${colors.highlight}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
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