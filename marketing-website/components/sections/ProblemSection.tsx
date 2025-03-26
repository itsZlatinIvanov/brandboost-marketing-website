import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ProgressCelebration } from '../solution/ProgressCelebration';
import { Clock, Target, Users, DollarSign, Activity } from 'lucide-react';
import { AnimatedCircles } from '@/components/ui/AnimatedCircles';

export const ProblemSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Add the animated circles as a background */}
      <AnimatedCircles count={4} color="rgba(59, 130, 246, 0.2)" />
      
      {/* Gradient overlay above circles (optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/90 to-white -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="space-y-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              The <span className="text-primary-600 relative">
                Critical Barriers
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C50.3333 4.83333 119.2 -3.6 202 10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span> Between Coaches<br/>And Social Media Success
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
              Most coaches struggle to grow on social media despite having valuable expertise. Here's why your social presence isn't matching your real-world impact:
            </p>
          </div>

          {/* Problems Grid - Visual presentation of all problems */}
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}>
            {/* Problem 1: Time Drain */}
            <div className="problem-card rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-1">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-48 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full bg-gradient-to-br from-red-400 to-red-600 bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-white/80 text-sm uppercase tracking-wider font-semibold">Problem 1</span>
                      <h3 className="text-white text-2xl font-bold">The Time Trap</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="bg-red-50 text-red-800 text-sm font-medium px-4 py-2 rounded-full inline-block mb-4">
                  94% of coaches lack time for content creation
                </div>
                <p className="text-slate-600 mb-4">
                  You're spending <span className="font-semibold">10+ hours weekly</span> on content that doesn't convert. Every hour wasted on low-performing content costs you <span className="text-red-600 font-semibold">$150-300</span> in potential client revenue.
                </p>
                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Impact on Revenue:</span>
                    <span className="text-red-600 font-semibold">High</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Problem 2: Inconsistency */}
            <div className="problem-card rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-1">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-48 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full bg-gradient-to-br from-amber-400 to-orange-600 bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-white/80 text-sm uppercase tracking-wider font-semibold">Problem 2</span>
                      <h3 className="text-white text-2xl font-bold">The Algorithm Penalty</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="bg-amber-50 text-amber-800 text-sm font-medium px-4 py-2 rounded-full inline-block mb-4">
                  68% drop in reach with inconsistent posting
                </div>
                <p className="text-slate-600 mb-4">
                  When life gets busy, your social media goes silent. Each gap in posting <span className="font-semibold">reduces your reach by 40-60%</span>, forcing you to rebuild momentum from scratch.
                </p>
                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Impact on Growth:</span>
                    <span className="text-amber-600 font-semibold">Severe</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Problem 3: Strategy */}
            <div className="problem-card rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 transform transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-1">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-48 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <span className="text-white/80 text-sm uppercase tracking-wider font-semibold">Problem 3</span>
                      <h3 className="text-white text-2xl font-bold">The Conversion Gap</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="bg-blue-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-full inline-block mb-4">
                  Only 3% of followers convert without strategy
                </div>
                <p className="text-slate-600 mb-4">
                  You're posting content with no strategic framework to convert viewers into clients. Your effort creates awareness but <span className="font-semibold">fails to drive revenue</span>.
                </p>
                <div className="mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Impact on Conversion:</span>
                    <span className="text-blue-600 font-semibold">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Growth trajectory visualization */}
          <div className={cn(
            "max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 border border-gray-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Your Current Social Media Growth Trajectory</h3>
              <p className="text-center text-gray-600 mb-6">Without a proper strategy, most coaches hit an invisible wall that prevents growth</p>
              
              {/* Using the stuck mode for the progress bar */}
              <ProgressCelebration progress={25} showSuccess={false} isStuck={true} />
              
              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-red-50">
                  <h4 className="font-semibold text-gray-800 mb-2">Time Investment</h4>
                  <p className="text-3xl font-bold text-red-600">10+ hrs/week</p>
                  <p className="text-sm text-gray-500 mt-1">wasted on ineffective content</p>
                </div>
                
                <div className="p-4 rounded-lg bg-amber-50">
                  <h4 className="font-semibold text-gray-800 mb-2">Reach</h4>
                  <p className="text-3xl font-bold text-amber-600">12%</p>
                  <p className="text-sm text-gray-500 mt-1">of potential audience</p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-gray-800 mb-2">ROI</h4>
                  <p className="text-3xl font-bold text-blue-600">-40%</p>
                  <p className="text-sm text-gray-500 mt-1">negative return on time invested</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <a 
              href="#solution" 
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-500 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              See How We Transform These Problems
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
