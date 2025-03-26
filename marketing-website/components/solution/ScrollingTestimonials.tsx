
import { useState, useEffect, useRef, useCallback } from 'react';

export const ScrollingTestimonials = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scanningPhase, setScanningPhase] = useState(0);
  const [realtimeUpdate, setRealtimeUpdate] = useState('');
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateOpacity, setUpdateOpacity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scanningMessages = [
    'Analyzing trending content...',
    'Processing trending patterns...',
    'Optimizing content strategy...',
    'Finalizing recommendations...'
  ];

  const realtimeUpdates = [
    '+250 new followers detected',
    'Viral trend detected',
    'Engagement spike: +180%',
    'Content optimization complete',
    'New audience segment identified'
  ];

  // Neural mesh canvas implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    let animationFrameId: number;
    let velocity = 0.5;
    let targetVelocity = 0.5;
    const acceleration = 0.015; // Adjusted for delta time calculation
    
    // Last timestamp for delta time calculation
    let lastTimestamp = performance.now();

    // Track hover state internally instead of relying on React state
    // This avoids any potential lag from state updates
    let isHovering = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Reduced the number of particles for less density
      const numParticles = 40;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const drawMesh = (timestamp: number) => {
      // Calculate delta time in milliseconds
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Normalize delta time to 16ms (assumes 60fps as baseline)
      const normalizedDelta = delta / 16;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply velocity transition with delta time for frame-rate independent smoothing
      velocity += (targetVelocity - velocity) * acceleration * normalizedDelta;
      
      // Update particle positions with current velocity
      particles.forEach(particle => {
        particle.x += particle.vx * velocity;
        particle.y += particle.vy * velocity;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
      ctx.lineWidth = 0.8;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles (smaller size now - reduced from 2 to 1.5)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawMesh);
    };

    // Handle mouse enter/leave for smoother velocity changes
    // Now attached to the container instead of the canvas
    const handleMouseEnter = () => {
      isHovering = true;
      // Less dramatic slowdown (20% reduction instead of 40%)
      targetVelocity = 0.4;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetVelocity = 0.5; // Return to normal speed
    };

    // Attach event listeners to the container instead of the canvas
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    resize();
    window.addEventListener('resize', resize);
    animationFrameId = requestAnimationFrame(drawMesh);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Function to show a realtime update with smooth animation
  const showRealtimeUpdate = () => {
    if (updateVisible) return; // Don't show if one is already visible
    
    // Show updates sequentially instead of randomly
    const nextIndex = (currentMessageIndex + 1) % realtimeUpdates.length;
    setRealtimeUpdate(realtimeUpdates[nextIndex]);
    setUpdateVisible(true);
    
    // Fade in animation
    setUpdateOpacity(0);
    const fadeInInterval = setInterval(() => {
      setUpdateOpacity(prev => {
        if (prev >= 1) {
          clearInterval(fadeInInterval);
          return 1;
        }
        return prev + 0.1;
      });
    }, 30);
    
    // Start fade out after delay
    setTimeout(() => {
      const fadeOutInterval = setInterval(() => {
        setUpdateOpacity(prev => {
          if (prev <= 0) {
            clearInterval(fadeOutInterval);
            setUpdateVisible(false);
            // Additional delay before allowing next update
            setTimeout(() => {
              setRealtimeUpdate('');
            }, 300);
            return 0;
          }
          return prev - 0.08;
        });
      }, 30);
    }, 3000); // Start fade out after 3 seconds
  };

  // Scanning phase and message cycling
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setScanningPhase(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(phaseInterval);
  }, []);

  // Message cycling based on phase
  useEffect(() => {
    if (scanningPhase === 3) {
      setCurrentMessageIndex(prev => (prev + 1) % scanningMessages.length);
      
      // Show update when message changes (no randomness)
      if (!updateVisible) {
        showRealtimeUpdate();
      }
    }
  }, [scanningPhase, scanningMessages.length, updateVisible]);

  // Fixed interval for updates (no randomness)
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (!updateVisible) {
        showRealtimeUpdate();
      }
    }, 3500); // Fixed 3.5 second interval

    return () => clearInterval(updateInterval);
  }, [updateVisible]);

  return (
    <div className="space-y-4">
      {/* Enhanced AI Scanning Effect */}
      <div className="relative h-12 flex items-center justify-center overflow-hidden">
        {/* Scanning line animation */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className={`h-1 bg-[#0EA5E9] opacity-20 transform transition-transform duration-1000 
            ${scanningPhase === 0 ? 'translate-y-0' : 
              scanningPhase === 1 ? 'translate-y-4' :
              scanningPhase === 2 ? 'translate-y-8' : 'translate-y-12'}`}
          />
        </div>
        
        {/* Main scanning message */}
        <p className={`text-sm font-medium text-[#0EA5E9] transition-opacity duration-300
          animate-pulse shadow-glow relative z-10
          ${scanningPhase === 3 ? 'opacity-50' : 'opacity-100'}`}>
          {scanningMessages[currentMessageIndex]}
        </p>
      </div>

      {/* Neural Mesh Background with Real-time Updates */}
      <div 
        ref={containerRef}
        className="relative h-32 rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-white/5"
      >
        {/* Canvas for neural mesh */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />

        {/* Container for real-time updates - with pointer-events: none */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {/* Real-time update overlay with smooth opacity transition */}
          {updateVisible && (
            <div 
              className="px-4 py-2 bg-[#0EA5E9]/80 text-white rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 ease-in-out pointer-events-none"
              style={{ 
                opacity: updateOpacity,
                transform: `scale(${0.95 + (updateOpacity * 0.05)})`,
                boxShadow: `0 4px 12px rgba(14, 165, 233, ${updateOpacity * 0.5})`
              }}
            >
              {realtimeUpdate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
