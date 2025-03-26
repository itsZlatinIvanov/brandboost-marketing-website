import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play, Quote, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/caseStudies';

interface TestimonialProps {
  id: number | string;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo?: boolean;
  videoLength?: string;
}

export const TestimonialsCarouselSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    skipSnaps: false,
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayInterval = 5000; // 5 seconds between slides
  const autoplayResumeDelay = 8000; // 8 seconds after interaction before resuming autoplay
  const userInteractionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    handleUserInteraction();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    handleUserInteraction();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Handle any user interaction with the carousel
  const handleUserInteraction = useCallback(() => {
    // Stop autoplay when user interacts
    setAutoplayActive(false);
    
    // Clear any existing timers
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    if (userInteractionTimerRef.current) clearTimeout(userInteractionTimerRef.current);
    
    // Set a timer to resume autoplay after delay
    userInteractionTimerRef.current = setTimeout(() => {
      setAutoplayActive(true);
    }, autoplayResumeDelay);
  }, [autoplayResumeDelay]);

  // Manually toggle autoplay - separate from handleUserInteraction
  const toggleAutoplay = useCallback(() => {
    // Toggle autoplay state directly without triggering auto-resume
    setAutoplayActive(prev => !prev);
    
    // Clear any auto-resume timers when manually toggling
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current);
      userInteractionTimerRef.current = null;
    }
    
    // Clear autoplay timer as well to prevent glitches
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  // Set up autoplay
  useEffect(() => {
    if (!emblaApi) return;
    
    // Clear any existing timer to prevent multiple timers running
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    
    if (autoplayActive) {
      // Using setTimeout instead of setInterval for more control
      const startTimer = () => {
        autoplayTimerRef.current = setTimeout(() => {
          if (emblaApi && emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
          } else if (emblaApi) {
            emblaApi.scrollTo(0); // Reset to first slide if at the end
          }
          // Start the next timer
          if (autoplayActive) {
            startTimer();
          }
        }, autoplayInterval);
      };
      
      startTimer();
    }
    
    // Cleanup function
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      if (userInteractionTimerRef.current) {
        clearTimeout(userInteractionTimerRef.current);
        userInteractionTimerRef.current = null;
      }
    };
  }, [emblaApi, autoplayActive, autoplayInterval]);

  // Set up event listeners for carousel
  useEffect(() => {
    if (!emblaApi) return;
    
    // Listen for select events
    onSelect();
    emblaApi.on('select', onSelect);
    
    // Listen for interaction events and pause autoplay
    const handlePointerDown = () => handleUserInteraction();
    emblaApi.on('pointerDown', handlePointerDown);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', handlePointerDown);
    };
  }, [emblaApi, onSelect, handleUserInteraction]);

  const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => (
    <div className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-6 mx-4 transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/20" 
      style={{ 
        width: 'calc(100vw - 100px)',
        maxWidth: '340px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="relative flex-grow">
        <Quote className="absolute -top-1 -left-2 w-5 h-5 text-blue-400 opacity-40" />
        <p className="text-gray-700 mb-6 relative z-10 pl-4">"{testimonial.content}"</p>
      </div>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      
      {testimonial.isVideo && (
        <Button
          variant="secondary"
          className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200"
          onClick={handleUserInteraction}
        >
          <Play size={16} /> Гледай видео {testimonial.videoLength && `(${testimonial.videoLength})`}
        </Button>
      )}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-slate-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Какво казват нашите клиенти</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Чуйте от бизнеси, които трансформираха своето онлайн присъствие с помощта на нашата стратегия за социални медии
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex py-8">
              {testimonials.map((testimonial, index) => (
                <div key={`testimonial-${testimonial.id}-${index}`} className="flex-shrink-0 min-w-0 flex items-stretch">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons - hidden on small screens */}
          <div className="hidden sm:block absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 border-slate-200 bg-white shadow-md hover:bg-blue-50"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
          
          <div className="hidden sm:block absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 border-slate-200 bg-white shadow-md hover:bg-blue-50"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </Button>
          </div>
          
          {/* Controls row with dots and autoplay toggle */}
          <div className="flex justify-center mt-8 gap-2 items-center">
            {/* Dots navigation */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-blue-500 w-6' : 'bg-slate-300'
                  }`}
                  onClick={() => {
                    emblaApi?.scrollTo(index);
                    handleUserInteraction();
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Autoplay toggle button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoplay}
              className="ml-4 text-slate-500 hover:text-blue-600"
              aria-label={autoplayActive ? "Pause autoplay" : "Start autoplay"}
            >
              {autoplayActive ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 