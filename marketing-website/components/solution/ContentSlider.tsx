
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ContentSliderProps {
  position: number;
  onPositionChange: (position: number) => void;
}

export const ContentSlider = ({ position, onPositionChange }: ContentSliderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mt-8">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gray-200 to-primary-100 transition-all duration-300"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="p-4">
          <p className="font-bold text-gray-800">Traditional Content</p>
          <ul className="text-sm font-medium text-gray-700">
            <li>• Hours of filming</li>
            <li>• Complex editing</li>
            <li>• Script writing</li>
          </ul>
        </div>
      </div>
      {/* Updated gradient to use brand colors with better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-600 pointer-events-none shadow-lg">
        <div className="p-4">
          <p className="font-bold text-white text-xl tracking-tight">Clyc.io AI Content</p>
          <ul className="text-sm font-medium text-white">
            <li>• Zero filming needed</li>
            <li>• Automated editing</li>
            <li>• AI-generated scripts</li>
          </ul>
        </div>
      </div>
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent to-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute -top-8 right-1/4 flex items-center gap-2 text-primary animate-bounce">
        <span className="font-medium">Slide Me</span>
        <ArrowRight className="w-5 h-5" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        defaultValue="75"
        onChange={(e) => onPositionChange(Number(e.target.value))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '90%',
          marginLeft: '5%',
          marginRight: '5%'
        }}
        className="absolute top-2/3 left-0 -translate-y-1/2 cursor-pointer z-10 appearance-none bg-transparent h-2 rounded-full transition-all duration-300 ease-in-out [&::-webkit-slider-runnable-track]:bg-gray-300 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-primary/50 [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:hover:shadow-[0_0_10px_rgba(45,137,255,0.5)] [&::-moz-range-track]:bg-gray-300 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-300 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-primary/50 [&::-moz-range-thumb]:-mt-2 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:hover:shadow-[0_0_10px_rgba(45,137,255,0.5)]"
      />
    </div>
  );
};
