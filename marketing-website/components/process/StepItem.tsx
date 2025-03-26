
import { useRef } from 'react';

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  isNewlyActive: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export const StepItem = ({
  number,
  title,
  description,
  isActive,
  isNewlyActive,
  ref
}: StepItemProps) => {
  const stepRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={ref}
      className={`flex items-start transform transition-all duration-700 ${
        isActive ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-50'
      }`}
    >
      <div 
        ref={stepRef}
        className={`relative z-10 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full transition-all duration-1000 ${
          isActive 
            ? 'bg-primary-500 text-white ring-4 ring-primary-100' 
            : 'bg-white text-gray-400 border-2 border-gray-200'
        } ${
          isNewlyActive ? 'animate-pulse-step' : ''
        }`}
        style={{
          boxShadow: isActive 
            ? '0 0 15px rgba(30, 174, 219, 0.3)' 
            : 'none',
          transition: 'all 1s ease-in-out'
        }}
      >
        <span className="text-lg md:text-xl font-bold">{number}</span>
      </div>
      
      <div className={`ml-6 pt-3 transition-all duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-50'
      }`}>
        <h3 className={`text-xl md:text-2xl font-semibold mb-3 transition-colors duration-1000 ${
          isActive ? 'text-primary-500' : 'text-gray-700'
        }`}>
          {title}
        </h3>
        <p className={`max-w-xl text-base md:text-lg transition-colors duration-1000 ${
          isActive ? 'text-gray-700' : 'text-gray-400'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepItem;
