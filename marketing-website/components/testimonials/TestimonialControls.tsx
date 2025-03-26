
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TestimonialControlsProps {
  isPaused: boolean;
  togglePause: () => void;
}

export const TestimonialControls = ({ isPaused, togglePause }: TestimonialControlsProps) => {
  const isMobile = useIsMobile();
  
  // Hide controls on mobile
  if (isMobile) {
    return null;
  }
  
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={togglePause}
        className="flex items-center gap-2"
        aria-label={isPaused ? "Resume Auto-scroll" : "Pause Scrolling"}
      >
        {isPaused ? (
          <>
            <Play size={16} /> Resume Auto-scroll
          </>
        ) : (
          <>
            <Pause size={16} /> Pause Scrolling
          </>
        )}
      </Button>
    </div>
  );
};
