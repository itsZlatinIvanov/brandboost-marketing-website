import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ProgressCelebrationProps {
  progress: number;
  showSuccess: boolean;
  isStuck?: boolean;
}

export const ProgressCelebration = ({ progress, showSuccess, isStuck = false }: ProgressCelebrationProps) => {
  const [displayValue, setDisplayValue] = useState(3);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stuckAnimationRef = useRef<NodeJS.Timeout | null>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  // Special "stuck" animation that shows the struggle
  useEffect(() => {
    if (!isStuck || !inView) return;
    
    // Clear any existing animations
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (stuckAnimationRef.current) {
      clearTimeout(stuckAnimationRef.current);
    }
    
    let phase = 'growing'; // 'growing', 'plateau', 'struggling', 'setback'
    let currentValue = 3;
    const maxValue = 25; // Will never reach higher than this
    
    const animateStuckProgress = () => {
      if (phase === 'growing' && currentValue < 14) {
        // Initial growth phase - slow but steady
        currentValue += 0.5;
        setDisplayValue(currentValue);
        
        if (currentValue >= 14) {
          phase = 'plateau';
        }
        
        stuckAnimationRef.current = setTimeout(animateStuckProgress, 120);
      } 
      else if (phase === 'plateau') {
        // Plateau phase - stuck at the same level for a while
        stuckAnimationRef.current = setTimeout(() => {
          phase = 'struggling';
          animateStuckProgress();
        }, 1000);
      } 
      else if (phase === 'struggling') {
        // Struggling phase - try to grow but only by tiny amounts
        if (currentValue < 18) {
          currentValue += 0.2;
          setDisplayValue(currentValue);
          stuckAnimationRef.current = setTimeout(animateStuckProgress, 200);
        } else {
          phase = 'setback';
          stuckAnimationRef.current = setTimeout(animateStuckProgress, 500);
        }
      } 
      else if (phase === 'setback') {
        // Setback phase - lose some progress
        currentValue -= 3;
        setDisplayValue(currentValue);
        
        // After setback, try again from struggling
        phase = 'struggling';
        stuckAnimationRef.current = setTimeout(animateStuckProgress, 800);
      }
    };
    
    // Start the stuck animation
    stuckAnimationRef.current = setTimeout(animateStuckProgress, 300);
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (stuckAnimationRef.current) {
        clearTimeout(stuckAnimationRef.current);
      }
    };
  }, [inView, isStuck]);
  
  // Regular progress animation (used when not stuck)
  useEffect(() => {
    if (isStuck || !inView) return;
    
    // Clear any existing animation
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    
    let currentValue = 3;
    // If showSuccess is true, always animate to 100% regardless of progress prop
    const targetValue = showSuccess ? 100 : (progress || 100);
    const step = 1;
    const baseDelay = 80;
    
    const animateStep = () => {
      if (currentValue < targetValue) {
        currentValue += step;
        setDisplayValue(currentValue);
        
        const progressPercent = currentValue / targetValue;
        const delay = baseDelay + (progressPercent > 0.7 ? 20 : 0) + (progressPercent > 0.9 ? 40 : 0);
        
        animationTimeoutRef.current = setTimeout(animateStep, delay);
      }
    };
    
    // Start the animation
    animationTimeoutRef.current = setTimeout(animateStep, 100);
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [inView, progress, isStuck, showSuccess]);
  
  // Frustration indicators - show more as value gets stuck
  const renderFrustrationIndicators = () => {
    if (!isStuck) return null;
    
    const frustrationLevel = Math.floor(displayValue / 5);
    
    return (
      <div className="absolute right-0 -top-6 flex gap-1">
        {Array.from({ length: frustrationLevel }).map((_, i) => (
          <div 
            key={i} 
            className={`h-5 w-5 text-red-500 animate-bounce`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            ❌
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={inViewRef}
      className={cn(
        "progress-celebration mb-8 transition-all duration-500 text-center",
        showSuccess && "scale-110"
      )}
    >
      {/* Explicitly controlled progress bar with stuck styling */}
      <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
        <div 
          className={cn(
            "h-full transition-[width] duration-100 ease-linear absolute left-0 top-0 bottom-0",
            isStuck ? "bg-red-500" : "bg-primary-500"
          )}
          style={{ width: `${displayValue}%` }}
        />
        
        {/* Growth barriers - visual representation of invisible walls */}
        {isStuck && (
          <>
            <div className="absolute left-[25%] top-0 bottom-0 w-0.5 bg-red-800/50 z-10"></div>
            <div className="absolute left-[25%] top-[-4px] bottom-[-4px] w-8 bg-red-800/10 z-5"></div>
          </>
        )}
        
        {renderFrustrationIndicators()}
      </div>
      
      <div className="border border-gray-200 rounded-lg py-2 px-4 mt-4 inline-flex items-center gap-4 mx-auto">
        <span className={cn(
          "text-sm",
          isStuck ? "text-red-600 font-medium" : "text-gray-600"
        )}>
          Current Growth: {Math.round(displayValue)}%
        </span>
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-sm text-primary">Target: 100%</span>
      </div>
      
      {isStuck && (
        <div className="mt-3 text-sm text-red-600 animate-pulse text-center">
          Growth stalled despite consistent effort...
        </div>
      )}
      
      {showSuccess && (
        <div className="mt-4 animate-fade-in text-xl font-semibold text-primary text-center mx-auto">
          Your Brand is Now Scaling! 🚀
        </div>
      )}
    </div>
  );
};
