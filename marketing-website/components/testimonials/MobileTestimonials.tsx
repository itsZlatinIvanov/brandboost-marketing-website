
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TestimonialCard } from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo: boolean;
  videoLength?: string;
}

interface MobileTestimonialsProps {
  testimonials: Testimonial[];
  openVideoModal: (id: number) => void;
}

export const MobileTestimonials = ({ testimonials, openVideoModal }: MobileTestimonialsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // Update button states based on carousel position
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={`mobile-${testimonial.id}`}
              className="flex-[0_0_auto] min-w-0 pl-4 pr-4"
              style={{ width: '320px' }} // Fixed width instead of percentage
            >
              <TestimonialCard
                testimonial={testimonial}
                openVideoModal={openVideoModal}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <Button
          onClick={scrollPrev}
          variant="outline"
          size="icon"
          className={`rounded-full ${prevBtnEnabled ? 'hover:bg-primary-100 hover:text-primary-700' : 'opacity-50'}`}
          aria-label="Previous slide"
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          onClick={scrollNext}
          variant="outline"
          size="icon"
          className={`rounded-full ${nextBtnEnabled ? 'hover:bg-primary-100 hover:text-primary-700' : 'opacity-50'}`}
          aria-label="Next slide"
          disabled={!nextBtnEnabled}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
