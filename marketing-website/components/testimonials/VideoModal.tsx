
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo: boolean;
  videoLength?: string;
}

interface VideoModalProps {
  activeVideoIndex: number | null;
  testimonials: Testimonial[];
  closeVideoModal: () => void;
}

export const VideoModal = ({ activeVideoIndex, testimonials, closeVideoModal }: VideoModalProps) => {
  if (activeVideoIndex === null) return null;
  
  const activeTestimonial = testimonials.find(t => t.id === activeVideoIndex);
  if (!activeTestimonial) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={closeVideoModal}
    >
      <div 
        className="bg-white rounded-lg overflow-hidden w-full max-w-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <h3 className="font-semibold">
            {activeTestimonial.name}'s Testimonial
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={closeVideoModal}
            className="hover:bg-gray-200"
          >
            ✕
          </Button>
        </div>
        
        <div className="aspect-video bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-sm">Video testimonial would play here</p>
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-medium">
            {activeTestimonial.role}
          </h4>
          <p className="text-gray-600 mt-2">
            {activeTestimonial.content}
          </p>
        </div>
      </div>
    </div>
  );
};
