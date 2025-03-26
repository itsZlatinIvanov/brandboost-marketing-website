import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface StarryBackgroundProps {
  className?: string;
  starCount?: number;
  glowIntensity?: number;
  colorTheme?: 'blue' | 'purple' | 'cyan';
  connectionDensity?: number;
  performanceMode?: boolean;
}

export const StarryBackground = ({
  className = '',
  starCount = 150,
  glowIntensity = 1,
  colorTheme = 'blue',
  connectionDensity = 0.3,
  performanceMode = true, // Enable performance optimizations by default
}: StarryBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [activePaths, setActivePaths] = useState<string[]>([]);
  
  // Color theme configuration
  const colors = {
    blue: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      glow: 'rgba(59, 130, 246, 0.6)',
      connection: 'rgba(59, 130, 246, 0.3)',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      glow: 'rgba(139, 92, 246, 0.6)',
      connection: 'rgba(139, 92, 246, 0.3)',
    },
    cyan: {
      primary: '#06b6d4',
      secondary: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.6)',
      connection: 'rgba(6, 182, 212, 0.3)',
    }
  }[colorTheme];

  // Update dimensions on mount and resize with throttling
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
    
    // Throttle the resize event
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 100);
    };
    
    updateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Adjust counts based on performance mode
  const adjustedStarCount = performanceMode ? Math.floor(starCount * 0.6) : starCount;
  const adjustedGlowIntensity = performanceMode ? glowIntensity * 0.5 : glowIntensity;
  
  // Update the stars generation for better neural network nodes
  const stars = useMemo(() => {
    // Create star clusters to simulate neural network patterns
    const result = [];
    
    // Create 5-8 neural clusters
    const clusterCount = performanceMode ? 5 : 8;
    const clusters = Array.from({ length: clusterCount }, () => ({
      x: Math.random() * 80 + 10, // Keep clusters away from edges
      y: Math.random() * 80 + 10,
      radius: Math.random() * 15 + 10, // Cluster radius
      nodeCount: Math.floor(Math.random() * 6) + 3 // Nodes per cluster
    }));
    
    // Generate regular stars
    const baseStars = Array.from({ length: Math.floor(adjustedStarCount * 0.7) }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      pulseDuration: Math.random() * 3 + 2,
      pulseDelay: Math.random() * 5,
      brightness: Math.random() * 0.5, // Regular stars aren't very bright
      isNode: false
    }));
    
    result.push(...baseStars);
    
    // Generate neural nodes in clusters
    let nodeId = baseStars.length;
    clusters.forEach(cluster => {
      for (let i = 0; i < cluster.nodeCount; i++) {
        // Random point within the cluster radius
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * cluster.radius;
        const x = Math.max(0, Math.min(100, cluster.x + Math.cos(angle) * distance));
        const y = Math.max(0, Math.min(100, cluster.y + Math.sin(angle) * distance));
        
        result.push({
          id: nodeId++,
          size: Math.random() * 3 + 2.5, // Larger nodes
          x,
          y,
          opacity: Math.random() * 0.2 + 0.8, // Brighter
          pulseDuration: Math.random() * 2 + 1.5,
          pulseDelay: Math.random() * 3,
          brightness: Math.random() * 0.3 + 0.7, // Much brighter
          isNode: true,
          cluster: cluster
        });
      }
    });
    
    return result;
  }, [adjustedStarCount, performanceMode]);

  // Generate a few larger glow orbs
  const glowOrbs = useMemo(() => 
    Array.from({ length: Math.max(2, Math.floor(3 * adjustedGlowIntensity)) }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: i % 2 === 0 ? colors.primary : colors.secondary,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })),
  [adjustedGlowIntensity, colors]);

  // Optimize connection generation to focus on neural mesh
  const connections = useMemo(() => {
    const result = [];
    
    // Filter nodes (larger, brighter stars)
    const nodes = stars.filter(star => star.isNode);
    const maxConnections = performanceMode ? 80 : 120;
    
    // 1. Connect stars within the same cluster (intra-cluster) 
    const clusterMap = new Map();
    nodes.forEach(node => {
      if (!node.cluster) return;
      
      const clusterId = `${node.cluster.x}-${node.cluster.y}`;
      if (!clusterMap.has(clusterId)) {
        clusterMap.set(clusterId, []);
      }
      clusterMap.get(clusterId).push(node);
    });
    
    // For each cluster, connect most nodes to each other
    clusterMap.forEach(clusterNodes => {
      for (let i = 0; i < clusterNodes.length; i++) {
        const node = clusterNodes[i];
        // Connect to 1-3 other nodes in same cluster
        const connectCount = Math.min(Math.floor(Math.random() * 3) + 1, clusterNodes.length - 1);
        
        for (let j = 0; j < connectCount; j++) {
          // Get a random index different from i
          let targetIdx;
          do {
            targetIdx = Math.floor(Math.random() * clusterNodes.length);
          } while (targetIdx === i);
          
          const target = clusterNodes[targetIdx];
          
          // Calculate distance
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          result.push({
            id: `${node.id}-${target.id}`,
            from: node,
            to: target,
            distance,
            opacity: (Math.random() * 0.4 + 0.2) * (1 - distance / 20),
            pulseSpeed: Math.random() * 3 + 2,
            delay: Math.random() * 3,
            isClusterConnection: true
          });
          
          if (result.length >= maxConnections) return result;
        }
      }
    });
    
    // 2. Connect between clusters (inter-cluster) - fewer connections
    const clusterNodeArray = Array.from(clusterMap.values());
    for (let i = 0; i < clusterNodeArray.length; i++) {
      for (let j = i + 1; j < clusterNodeArray.length; j++) {
        // Connect each pair of clusters with 1-2 connections
        const connectionCount = Math.floor(Math.random() * 2) + 1;
        
        for (let k = 0; k < connectionCount; k++) {
          if (result.length >= maxConnections) return result;
          
          const nodeA = clusterNodeArray[i][Math.floor(Math.random() * clusterNodeArray[i].length)];
          const nodeB = clusterNodeArray[j][Math.floor(Math.random() * clusterNodeArray[j].length)];
          
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          result.push({
            id: `${nodeA.id}-${nodeB.id}`,
            from: nodeA,
            to: nodeB,
            distance,
            opacity: (Math.random() * 0.3 + 0.15) * (1 - distance / 80),
            pulseSpeed: Math.random() * 4 + 3,
            delay: Math.random() * 4,
            isLongConnection: true
          });
        }
      }
    }
    
    return result;
  }, [stars, performanceMode]);

  // Simplified animation variants to reduce CPU usage
  const starAnimationVariants = {
    pulse: (star: any) => ({
      opacity: [star.opacity, star.opacity * 1.5, star.opacity],
      scale: [1, 1.2, 1],
      transition: {
        duration: star.pulseDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: star.pulseDelay,
      }
    })
  };

  const connectionAnimationVariants = {
    pulse: (connection: any) => ({
      opacity: [
        connection.opacity * 1.5,
        connection.opacity * 2.5,
        connection.opacity * 1.5
      ],
      transition: {
        duration: connection.pulseSpeed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: connection.delay,
      }
    })
  };

  // Add this useEffect to simulate neural network activations
  useEffect(() => {
    if (performanceMode) return; // Skip in performance mode
    
    // Find a path through the network - sequence of connected nodes
    const activateRandomPath = () => {
      if (connections.length === 0) return;
      
      // Start with a random connection
      const startConnection = connections[Math.floor(Math.random() * connections.length)];
      let currentNode = Math.random() > 0.5 ? startConnection.from : startConnection.to;
      
      // Find a path of 3-5 connections
      const pathLength = Math.floor(Math.random() * 3) + 3;
      const path = [startConnection.id];
      
      for (let i = 1; i < pathLength; i++) {
        // Find connections that include the current node
        const possibleNext = connections.filter(c => 
          (c.from.id === currentNode.id || c.to.id === currentNode.id) && 
          !path.includes(c.id)
        );
        
        if (possibleNext.length === 0) break;
        
        // Pick a random next connection
        const nextConnection = possibleNext[Math.floor(Math.random() * possibleNext.length)];
        path.push(nextConnection.id);
        
        // Update current node to the other end of this connection
        currentNode = nextConnection.from.id === currentNode.id ? 
          nextConnection.to : nextConnection.from;
      }
      
      setActivePaths(path);
      
      // Clear after animation
      setTimeout(() => {
        setActivePaths([]);
      }, 2000);
    };
    
    const interval = setInterval(activateRandomPath, 5000);
    return () => clearInterval(interval);
  }, [connections, performanceMode]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
      }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '30px 30px' 
        }}
      />
      
      {/* Glow orbs - large, blurred circles that create atmosphere */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {glowOrbs.map((orb) => (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute rounded-full blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${orb.color}20 0%, transparent 70%)`,
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.15,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Neural network connections between stars */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {connections.map((connection) => {
          const x1 = connection.from.x;
          const y1 = connection.from.y;
          const x2 = connection.to.x;
          const y2 = connection.to.y;
          
          // Check if this connection is in an active path
          const isActive = activePaths.includes(connection.id);
          
          return (
            <motion.line
              key={connection.id}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke={isActive ? colors.primary : 
                     (connection.isLongConnection ? colors.secondary : colors.connection)}
              strokeWidth={isActive ? 2 : (connection.isClusterConnection ? 1.2 : 0.8)}
              strokeLinecap="round"
              filter={performanceMode ? undefined : (isActive ? "url(#activeGlow)" : "url(#glow)")}
              initial={{ opacity: 0 }}
              animate={isActive ? {
                opacity: [0.7, 1, 0.7],
                strokeDashoffset: [30, 0, 30],
              } : connectionAnimationVariants.pulse(connection)}
              transition={isActive ? {
                duration: 2,
                ease: "easeInOut"
              } : undefined}
            />
          );
        })}
      </svg>

      {/* Data flow particles along connections - only show in high performance mode */}
      {!performanceMode && (
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
          {connections.filter(c => c.from.size > 2.2 || c.to.size > 2.2).slice(0, 8).map((connection) => {
            // Only add data particles to a few connections
            if (Math.random() > 0.4) return null;
            
            const x1 = connection.from.x;
            const y1 = connection.from.y;
            const x2 = connection.to.x;
            const y2 = connection.to.y;
            
            return (
              <motion.circle
                key={`particle-${connection.id}`}
                r={1.5}
                fill={colors.secondary}
                initial={{ 
                  opacity: 0,
                  cx: `${x1}%`,
                  cy: `${y1}%`
                }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  cx: [`${x1}%`, `${x2}%`],
                  cy: [`${y1}%`, `${y2}%`],
                }}
                transition={{
                  duration: connection.distance / 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: connection.delay,
                  repeatDelay: Math.random() * 4 + 2,
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${star.isNode ? 'z-10' : 'z-3'}`}
          style={{
            width: star.size,
            height: star.size,
            backgroundColor: star.isNode ? colors.secondary : 'white',
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            boxShadow: star.isNode 
              ? `0 0 ${star.size * 3}px ${colors.glow}`
              : (star.size > 2 ? `0 0 ${star.size * 2}px ${colors.glow}` : 'none'),
          }}
          variants={starAnimationVariants}
          animate="pulse"
          custom={star}
        />
      ))}

      {/* A few shooting stars - fewer in performance mode */}
      {Array.from({ length: performanceMode ? 1 : 3 }, (_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const angle = Math.random() * 45 + 20;
        const distance = Math.random() * 30 + 20;
        
        return (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute h-px rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              left: `${startX}%`,
              top: `${startY}%`,
              opacity: 0,
              zIndex: 4,
              transform: `rotate(${angle}deg)`,
              transformOrigin: 'left center',
            }}
            animate={{
              opacity: [0, 0.7, 0],
              x: [0, distance * 3],
              y: [0, distance * 3 * Math.tan(angle * Math.PI / 180)],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: Math.random() * (performanceMode ? 25 : 15) + 10,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
}; 