
import { useRef, useEffect } from 'react';

interface ProgressLineProps {
  completeAnimation: boolean;
  progressLineRef: React.RefObject<HTMLDivElement>;
  currentStepIndex: number;
  onStepReached: (index: number) => void;
}

export const ProgressLine = ({ 
  completeAnimation, 
  progressLineRef, 
  currentStepIndex, 
  onStepReached 
}: ProgressLineProps) => {
  const lastStepRef = useRef<number>(-1);
  
  // This effect monitors scroll position directly and updates step activation
  useEffect(() => {
    const progressLine = progressLineRef.current;
    if (!progressLine) return;

    const checkStepActivation = () => {
      const lineRect = progressLine.getBoundingClientRect();
      const lineHeight = lineRect.height;
      const totalHeight = progressLine.parentElement?.clientHeight || 0;
      
      if (totalHeight === 0) return;
      
      const progress = (lineHeight / totalHeight) * 100;
      
      // Define step thresholds (percentage of progress when steps should activate)
      const stepThresholds = [15, 32, 49, 66, 83];
      
      // Find the highest threshold that's been crossed
      for (let i = stepThresholds.length - 1; i >= 0; i--) {
        if (progress >= stepThresholds[i] && i > lastStepRef.current) {
          lastStepRef.current = i;
          onStepReached(i);
          break;
        }
      }
    };

    // Create an Intersection Observer for the progress line
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          checkStepActivation();
        }
      });
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    
    observer.observe(progressLine);

    // Also listen for scroll events for smoother updates
    const handleScroll = () => {
      requestAnimationFrame(checkStepActivation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onStepReached, progressLineRef]);

  return (
    <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-200 shadow-sm">
      <div 
        ref={progressLineRef}
        className={`absolute left-0 top-0 w-full transition-all duration-300 ease-out ${
          completeAnimation ? 'animate-glow' : ''
        }`}
        style={{ 
          height: "0%",
          background: 'linear-gradient(to bottom, #33C3F0, #0B7A9E)',
          boxShadow: completeAnimation 
            ? '0 0 12px rgba(30, 174, 219, 0.7)' 
            : '0 0 8px rgba(30, 174, 219, 0.5)',
          opacity: 0.9,
          willChange: 'height',
        }}
      />
    </div>
  );
};

export default ProgressLine;

