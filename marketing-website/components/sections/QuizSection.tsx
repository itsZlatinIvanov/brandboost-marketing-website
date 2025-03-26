import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, Clock, Award, TrendingUp, Users, Instagram, Loader2, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export const QuizSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [socialHandles, setSocialHandles] = useState({
    instagram: '',
    tiktok: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  
  // Quiz questions and possible answers
  const questions = [
    {
      id: 'timeInvestment',
      question: 'How many hours per week do you personally spend creating social media content?',
      options: [
        { value: 0, label: 'Less than 1 hour' },
        { value: 1, label: '1-3 hours' },
        { value: 2, label: '4-8 hours' },
        { value: 3, label: '8+ hours' }
      ],
      icon: <Clock className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'contentStrategy',
      question: 'Do you have a documented content strategy with specific goals?',
      options: [
        { value: 0, label: 'No strategy at all' },
        { value: 1, label: 'Basic idea but not documented' },
        { value: 2, label: 'Documented but not consistently followed' },
        { value: 3, label: 'Fully documented and executed strategy' }
      ],
      icon: <Award className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'audienceGrowth',
      question: 'How has your social audience grown in the last 3 months?',
      options: [
        { value: 0, label: 'Decreased or stagnant' },
        { value: 1, label: 'Slight growth (1-5%)' },
        { value: 2, label: 'Moderate growth (6-15%)' },
        { value: 3, label: 'Significant growth (15%+)' }
      ],
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'conversionRate',
      question: 'What percentage of your social followers convert to paying clients?',
      options: [
        { value: 0, label: 'Not sure/Don\'t track' },
        { value: 1, label: 'Less than 0.5%' },
        { value: 2, label: '0.5% - 2%' },
        { value: 3, label: 'More than 2%' }
      ],
      icon: <Users className="w-8 h-8 text-primary-600" />
    },
    {
      id: 'biggestChallenge',
      question: 'What\'s your biggest challenge with social media right now?',
      options: [
        { value: 'time', label: 'Finding time to create content' },
        { value: 'strategy', label: 'Knowing what content will work' },
        { value: 'consistency', label: 'Maintaining consistency' },
        { value: 'conversion', label: 'Converting followers to clients' }
      ],
      icon: <CheckCircle className="w-8 h-8 text-primary-600" />
    }
  ];
  
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Move to next question or to social handles input if finished with questions
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(questions.length); // Move to social handles step
    }
  };
  
  const handleSocialSubmit = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
      
      // Show results after another short delay
      setTimeout(() => {
        setShowResults(true);
      }, 1000);
    }, 3000);
  };
  
  const calculateScore = () => {
    // Only calculate for numeric values (first 4 questions)
    let score = 0;
    let maxPossible = 0;
    
    // For first 4 questions that have numeric values
    for (let i = 0; i < 4; i++) {
      const questionId = questions[i].id;
      if (typeof answers[questionId] === 'number') {
        score += answers[questionId];
        maxPossible += 3; // Max value per question
      }
    }
    
    // Convert to percentage
    return Math.round((score / maxPossible) * 100);
  };
  
  const getRecommendations = () => {
    const score = calculateScore();
    const challenge = answers.biggestChallenge;
    
    // Base recommendations on score ranges
    if (score < 33) {
      return {
        title: "Significant Growth Opportunity",
        description: "Your current approach is leaving substantial revenue on the table. Based on our analysis of 67 similar professionals, you could be missing out on $5,000-$15,000+ monthly by not optimizing your social media strategy.",
        potentialGrowth: "300-400%"
      };
    } else if (score < 66) {
      return {
        title: "Targeted Improvement Needed",
        description: "You've built some foundation, but strategic gaps are limiting your growth. Our data shows coaches at your level typically double their results within 90 days with the right AI-powered approach.",
        potentialGrowth: "150-200%"
      };
    } else {
      return {
        title: "Optimization Opportunity",
        description: "You're ahead of most coaches, but still have untapped potential. Our system can help you maintain your results while reducing your time investment by up to 80%.",
        potentialGrowth: "50-100%"
      };
    }
  };

  // Social handles step
  const renderSocialHandlesStep = () => {
    return (
      <div className="p-6 md:p-8">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Final Step</span>
            <span>Almost Done!</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-300 ease-out"
              style={{ width: '90%' }}
            ></div>
          </div>
        </div>
        
        {/* Social media handles input */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Instagram className="w-8 h-8 text-primary-600" />
            <h3 className="text-xl md:text-2xl font-bold text-white">Connect your accounts for personalized analysis</h3>
          </div>
          
          <p className="text-slate-300 mb-6">
            To provide the most accurate assessment, we'll analyze your current social media presence. Your data remains 100% private and secure.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Instagram Handle</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">@</span>
                <Input
                  type="text"
                  placeholder="yourhandle"
                  className="pl-8 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  value={socialHandles.instagram}
                  onChange={(e) => setSocialHandles({...socialHandles, instagram: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">TikTok Handle (optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">@</span>
                <Input
                  type="text"
                  placeholder="yourhandle"
                  className="pl-8 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  value={socialHandles.tiktok}
                  onChange={(e) => setSocialHandles({...socialHandles, tiktok: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(questions.length - 1)}
            className="text-slate-300 border-slate-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button
            onClick={handleSocialSubmit}
            disabled={!socialHandles.instagram || isAnalyzing}
            className={cn(
              "bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-all",
              (!socialHandles.instagram || isAnalyzing) && "opacity-70 cursor-not-allowed"
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Your Profile
              </>
            ) : (
              <>
                Complete Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        <div className="text-center text-sm text-slate-400 mt-4">
          Your data is 100% secure and private
        </div>
      </div>
    );
  };
  
  // Analysis animation step
  const renderAnalysisStep = () => {
    return (
      <div className="p-6 md:p-8 text-center">
        <div className="py-12">
          {analysisDone ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <BadgeCheck className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analysis Complete!</h3>
              <p className="text-slate-300 mb-6">Your personalized report is ready.</p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-1000 ease-out w-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Your Social Media</h3>
              <p className="text-slate-300 mb-6">Please wait while we process your data...</p>
              <div className="space-y-3 w-full max-w-md">
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 animate-pulse w-full"></div>
                  </div>
                  <span className="text-xs text-slate-400 min-w-[90px]">Engagement Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 animate-pulse w-4/5"></div>
                  </div>
                  <span className="text-xs text-slate-400 min-w-[90px]">Content Strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 animate-pulse w-2/3"></div>
                  </div>
                  <span className="text-xs text-slate-400 min-w-[90px]">Growth Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 animate-pulse w-1/2"></div>
                  </div>
                  <span className="text-xs text-slate-400 min-w-[90px]">Conversion Opt.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="quiz-section" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Social Media Growth Assessment</h2>
            <p className="mt-4 text-slate-300">Answer 5 quick questions to discover your personalized growth potential</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden"
          >
            {/* The questions step */}
            {currentStep < questions.length && (
              <div className="p-6 md:p-8">
                {/* Progress indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Question {currentStep + 1} of {questions.length}</span>
                    <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 transition-all duration-300 ease-out"
                      style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Current question */}
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    {questions[currentStep].icon}
                    <h3 className="text-xl md:text-2xl font-bold text-white">{questions[currentStep].question}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {questions[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-4 rounded-lg border border-slate-600 hover:border-primary-500 bg-slate-800/60 hover:bg-slate-700/60 text-white transition-all duration-200"
                        onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between">
                  {currentStep > 0 ? (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="text-slate-300 border-slate-600"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                  ) : <div></div>}
                  
                  <div className="text-sm text-slate-400">
                    Your data is 100% secure and private
                  </div>
                </div>
              </div>
            )}
            
            {/* Social handles input step */}
            {currentStep === questions.length && !isAnalyzing && !analysisDone && !showResults && (
              renderSocialHandlesStep()
            )}
            
            {/* Analysis animation step */}
            {(isAnalyzing || analysisDone) && !showResults && (
              renderAnalysisStep()
            )}
            
            {/* Results section */}
            {showResults && (
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl font-bold text-primary-400">{calculateScore()}%</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Social Media Growth Score</h3>
                  <p className="text-slate-300">Based on industry benchmarks for coaches & consultants</p>
                </div>
                
                {socialHandles.instagram && (
                  <div className="bg-slate-800/80 rounded-lg p-4 mb-8 flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-primary-400" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Analysis for <span className="text-white font-semibold">@{socialHandles.instagram}</span>
                        {socialHandles.tiktok && <span> and <span className="text-white font-semibold">@{socialHandles.tiktok}</span> (TikTok)</span>}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-bold text-primary-400 mb-3">{getRecommendations().title}</h4>
                  <p className="text-slate-300 mb-4">{getRecommendations().description}</p>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg">
                    <span className="text-sm font-medium text-slate-300">Your Potential Growth:</span>
                    <span className="text-lg font-bold text-primary-400">{getRecommendations().potentialGrowth}</span>
                  </div>
                </div>
                
                <div className="bg-primary-900/30 border border-primary-800/50 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-bold text-white mb-3">Get Your Detailed Growth Plan</h4>
                  <p className="text-slate-300 mb-4">Book a free 30-minute strategy call to receive:</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Personalized content strategy based on your assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">Custom AI avatar demo tailored to your business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">90-day growth projection with specific metrics</span>
                    </li>
                  </ul>
                  
                  <Button
                    size="lg"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-lg font-bold"
                    onClick={() => document.getElementById('book-call')?.scrollIntoView({behavior: 'smooth'})}
                  >
                    BOOK YOUR FREE STRATEGY CALL <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="text-center text-sm text-slate-400">
                  <p>Limited availability - Only 3 strategy calls available this week</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 