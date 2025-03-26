
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  isVideo: boolean;
  videoLength?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  openVideoModal: (id: number) => void;
}

export const TestimonialCard = ({ testimonial, openVideoModal }: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-[300px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300",
        "hover:shadow-lg hover:border-primary-200 hover:bg-primary-50/30",
        "focus-within:shadow-lg focus-within:border-primary-200"
      )}
      style={{
        minWidth: '300px',
        maxWidth: '350px',
        minHeight: testimonial.isVideo ? '320px' : '280px',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
      
      {testimonial.isVideo && (
        <div className="mt-auto">
          <Button
            onClick={() => openVideoModal(testimonial.id)}
            variant="secondary"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-100 text-primary-700 hover:bg-primary-200"
          >
            <Play size={16} /> Watch Video ({testimonial.videoLength})
          </Button>
        </div>
      )}
    </div>
  );
};
