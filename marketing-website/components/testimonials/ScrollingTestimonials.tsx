
import { useRef, useState, useEffect } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { MobileTestimonials } from "./MobileTestimonials";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo: boolean;
  videoLength?: string;
}

interface ScrollingTestimonialsProps {
  testimonials: Testimonial[];
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  openVideoModal: (id: number) => void;
}

export const ScrollingTestimonials = ({ 
  testimonials, 
  isPaused, 
  setIsPaused, 
  openVideoModal 
}: ScrollingTestimonialsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);
  const transformCache = useRef('');
  const touchTimeout = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();
  
  // Slower scroll configuration with fixed speed
  const scrollConfig = useRef({
    scrollSpeed: 0.06, // Even slower speed in pixels per millisecond
    lastTime: 0,
    MAX_DELTA: 0.1, // 100ms max delta time (prevents huge jumps after tab switch)
  });
  
  const MOBILE_BREAKPOINT = 768;
  const shouldUseMobileLayout = isMobile || (typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT);

  // Touch handlers for mobile
  const handleTouch = (start: boolean) => {
    clearTimeout(touchTimeout.current);
    
    if (!start) {
      // Auto-resume scrolling after inactivity
      touchTimeout.current = setTimeout(() => {
        if (isPaused) {
          setIsPaused(false);
        }
      }, 3000);
    }
  };

  useEffect(() => {
    if (shouldUseMobileLayout) return;
    
    // Configure scroll speed for the current device
    if (isMobile) {
      scrollConfig.current.scrollSpeed = 0.04; // Even slower on mobile
    }
    
    // Animation using requestAnimationFrame for continuous scrolling
    let animationId: number | null = null;
    
    const animate = (timestamp: number) => {
      if (isPaused) {
        // Just stop immediately without any transitions
        scrollConfig.current.lastTime = timestamp; // Update time to prevent jumps on resume
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        return;
      }
      
      const container = scrollContainerRef.current;
      if (!container) return;
      
      // Calculate proper delta time
      let deltaTime = 0;
      if (scrollConfig.current.lastTime > 0) {
        deltaTime = Math.min(
          (timestamp - scrollConfig.current.lastTime) / 1000, // Convert to seconds
          scrollConfig.current.MAX_DELTA 
        );
      }
      scrollConfig.current.lastTime = timestamp;
      
      const maxScroll = container.scrollWidth / 3; // We have 3 copies of testimonials
      
      // Fixed speed scrolling (no velocity transitions)
      const scrollDelta = scrollConfig.current.scrollSpeed * (deltaTime * 1000); // Convert back to ms
      
      // Update scroll position for continuous looping
      scrollPosition.current += scrollDelta;
      
      // Reset position seamlessly when reaching end of first copy
      if (scrollPosition.current >= maxScroll) {
        scrollPosition.current -= maxScroll;
      }
      
      // Performance: only update DOM when transform actually changes
      const newTransform = `translateX(-${scrollPosition.current}px)`;
      if (newTransform !== transformCache.current) {
        container.style.transform = newTransform;
        transformCache.current = newTransform;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation if not paused
    if (!isPaused) {
      animationId = requestAnimationFrame(animate);
    }
    
    // Cleanup
    return () => {
      clearTimeout(touchTimeout.current);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, isMobile, shouldUseMobileLayout]);

  if (shouldUseMobileLayout) {
    return <MobileTestimonials testimonials={testimonials} openVideoModal={openVideoModal} />;
  }

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="mt-12 flex items-start gap-8 pb-4"
        style={{ 
          willChange: 'transform',
          transform: `translateX(-${scrollPosition.current}px)`,
        }}
        onTouchStart={() => handleTouch(true)}
        onTouchEnd={() => handleTouch(false)}
      >
        {/* Triplicate testimonials for seamless scrolling */}
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            openVideoModal={openVideoModal}
          />
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </div>
  );
};
