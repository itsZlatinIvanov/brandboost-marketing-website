
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProgressLine from './ProgressLine';

export interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
  activeStep: number;
  prevActiveStep: number;
  completeAnimation: boolean;
  progressLineRef: React.RefObject<HTMLDivElement>;
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const ProcessSteps = ({
  steps,
  activeStep,
  prevActiveStep,
  completeAnimation,
  progressLineRef,
  stepRefs
}: ProcessStepsProps) => {
  const { ref: step1Ref, inView: step1InView } = useInView({ threshold: 0.4, triggerOnce: false });
  const { ref: step2Ref, inView: step2InView } = useInView({ threshold: 0.4, triggerOnce: false });
  const { ref: step3Ref, inView: step3InView } = useInView({ threshold: 0.4, triggerOnce: false });
  const { ref: step4Ref, inView: step4InView } = useInView({ threshold: 0.4, triggerOnce: false });

  const getStepRef = (index: number) => {
    switch (index) {
      case 0: return step1Ref;
      case 1: return step2Ref;
      case 2: return step3Ref;
      case 3: return step4Ref;
      default: return step1Ref;
    }
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <ProgressLine 
        completeAnimation={completeAnimation} 
        progressLineRef={progressLineRef}
        currentStepIndex={activeStep}
        onStepReached={(index) => {
          // This function will be called by ProgressLine when a step is reached
          // We don't need to do anything here as the parent component (ProcessSection)
          // is already handling the activeStep state
        }}
      />

      <div className="space-y-28 md:space-y-40">
        {steps.map((step, index) => {
          const stepRef = getStepRef(index);
          const isNewlyActive = activeStep === index && prevActiveStep !== index;
          
          return (
            <div 
              key={index} 
              ref={stepRef}
              className={`flex items-start transform transition-all duration-700 ${
                activeStep >= index ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-50'
              }`}
            >
              <div 
                ref={el => stepRefs.current[index] = el}
                className={`relative z-10 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full transition-all duration-1000 ${
                  activeStep >= index 
                    ? 'bg-primary-500 text-white ring-4 ring-primary-100' 
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                } ${
                  isNewlyActive ? 'animate-pulse-step' : ''
                }`}
                style={{
                  boxShadow: activeStep >= index 
                    ? '0 0 15px rgba(30, 174, 219, 0.3)' 
                    : 'none',
                  transition: 'all 1s ease-in-out'
                }}
              >
                <span className="text-lg md:text-xl font-bold">{step.number}</span>
              </div>
              
              <div className={`ml-6 pt-3 transition-all duration-1000 ${
                activeStep >= index ? 'opacity-100' : 'opacity-50'
              }`}>
                <h3 className={`text-xl md:text-2xl font-semibold mb-3 transition-colors duration-1000 ${
                  activeStep >= index ? 'text-primary-500' : 'text-gray-700'
                }`}>
                  {step.title}
                </h3>
                <p className={`max-w-xl text-base md:text-lg transition-colors duration-1000 ${
                  activeStep >= index ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessSteps;
