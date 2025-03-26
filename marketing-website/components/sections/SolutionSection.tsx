import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Calendar, Video, Users, Award, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Journey stages represent the transformation path
interface JourneyStage {
  id: "struggle" | "solution" | "outcome";
  title: string;
  description: string;
  icon: React.ReactNode;
  challenges?: string[];
  benefits?: string[];
  results?: string[];
  color: string;
}

const journeyStages: JourneyStage[] = [
  {
    id: "struggle",
    title: "Проблемът",
    description: "Публикуваш съдържание в социалните мрежи, но не получаваш желаните резултати. Твоята експертиза е ценна, но твоето онлайн присъствие не успява да я отрази напълно.",
    icon: <Video className="h-6 w-6" />,
    color: "text-red-600",
    challenges: [
      "Часове в създаване на съдържание, което не води до конверсии",
      "Непоследователно публикуване, което води до наказания от алгоритъма",
      "Липса на ясна стратегия за превръщане на последователите в клиенти",
      "Фрустрация от наблюдението как по-малко квалифицирани експерти набират популярност"
    ]
  },
  {
    id: "solution",
    title: "Решението",
    description: "Цялостна, професионална и персонализирана стратегия за социални медии, която се управлява изцяло от нас.",
    icon: <Calendar className="h-6 w-6" />,
    color: "text-yellow-600",
    benefits: [
      "Стратегически календар за съдържание с всички необходими формати",
      "Оптимизиране на профила за привличане на идеалните ти клиенти",
      "Подход, фокусиран върху конверсии във всяко съдържание",
      "Комбинация от органично и таргетирано съдържание за максимален ефект"
    ]
  },
  {
    id: "outcome",
    title: "Резултатът",
    description: "Процъфтяващо присъствие в социалните мрежи, което привлича квалифицирани лийдове, докато ти се концентрираш върху основния си бизнес и обслужването на клиенти.",
    icon: <Users className="h-6 w-6" />,
    color: "text-green-600",
    results: [
      "Постоянен растеж на последователи, които отговарят на профила на идеалния ти клиент",
      "Редовни запитвания от предварително квалифицирани потенциални клиенти",
      "Позициониране като авторитет в твоята ниша",
      "Устойчив бизнес растеж без необходимост от безкрайно създаване на съдържание"
    ]
  }
];

// Testimonial data
const testimonials = [
  {
    quote: "В началото не вярвах, че стратегията за социални мрежи може да промени толкова бизнеса ми, но след 3 месеца работа с Brand Boost удвоих броя на клиентите си.",
    author: "Михаил Х., Бизнес коуч",
    imageSrc: "/testimonials/michael.jpg" // You'll need to add these images
  },
  {
    quote: "След години непоследователно публикуване, най-накрая имам стратегия, която работи. Моето съдържание достига до хората, които наистина се нуждаят от моите услуги.",
    author: "Рая Д., Консултант по взаимоотношения",
    imageSrc: "/testimonials/rachel.jpg"
  }
];

export const SolutionSection = () => {
  const [activeStage, setActiveStage] = useState("struggle");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Find the currently active stage object
  const currentStage = journeyStages.find(stage => stage.id === activeStage) || journeyStages[0];
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800" id="solution-section">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-screen-xl mx-auto">
          {/* Section intro */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-400 font-medium mb-3">ТРАНСФОРМАЦИЯТА</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              От стандартен профил до <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">магнит за клиенти</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Твоето пътуване от борбата със създаването на съдържание до безпроблемното привличане на идеални клиенти чрез стратегическо присъствие в социалните мрежи.
            </p>
          </div>
          
          {/* Journey Navigation */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            {journeyStages.map((stage, index) => (
              <button
                key={stage.id}
                className={`relative px-6 py-4 rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
                  activeStage === stage.id 
                    ? `border-2 border-${stage.id === "struggle" ? "purple" : stage.id === "solution" ? "blue" : "cyan"}-500 bg-${stage.id === "struggle" ? "purple" : stage.id === "solution" ? "blue" : "cyan"}-500/10 shadow-lg shadow-${stage.id === "struggle" ? "purple" : stage.id === "solution" ? "blue" : "cyan"}-500/20 scale-105` 
                    : 'border border-slate-700 text-slate-400 hover:border-slate-600 bg-slate-800/50'
                }`}
                onClick={() => setActiveStage(stage.id)}
              >
                <div className={`p-2 rounded-full mb-2 ${activeStage === stage.id ? `bg-${stage.id === "struggle" ? "purple" : stage.id === "solution" ? "blue" : "cyan"}-500/20` : 'bg-slate-700'}`}>
                  {React.cloneElement(stage.icon as React.ReactElement, { 
                    className: `h-6 w-6 ${activeStage === stage.id ? `text-${stage.id === "struggle" ? "purple" : stage.id === "solution" ? "blue" : "cyan"}-400` : 'text-slate-400'}`
                  })}
                </div>
                <h3 className={`font-medium ${activeStage === stage.id ? 'text-white' : 'text-slate-300'}`}>{stage.title}</h3>
                
                {/* Connection line between stages */}
                {index < journeyStages.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className={`h-6 w-6 ${activeStage === stage.id ? 'text-blue-400' : 'text-slate-700'}`} />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Current Stage Content */}
          <motion.div 
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-5 gap-8 items-center mb-16"
          >
            {/* Content column */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold text-white mb-4">{currentStage.title}</h3>
              <p className="text-lg text-slate-300 mb-6">{currentStage.description}</p>
              
              <div className="space-y-3">
                {currentStage.id === "struggle" && currentStage.challenges?.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="text-purple-400 mt-1">×</div>
                    <p className="text-slate-300">{challenge}</p>
                  </div>
                ))}
                
                {currentStage.id === "solution" && currentStage.benefits?.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-slate-900" />
                    </div>
                    <p className="text-slate-300">{benefit}</p>
                  </div>
                ))}
                
                {currentStage.id === "outcome" && currentStage.results?.map((result, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-slate-900" />
                    </div>
                    <p className="text-slate-300">{result}</p>
                  </div>
                ))}
              </div>
              
              {activeStage === "solution" && (
                <div className="mt-8">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 shadow-lg shadow-blue-900/20"
                    onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
                  >
                    Получи персонализирана стратегия
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Visual representation column */}
            <div className="md:col-span-2">
              {activeStage === "struggle" && (
                <div className="rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <div className="relative pb-[56.25%] bg-slate-900">
                    <img 
                      src="/illustrations/content-struggle.jpg" 
                      alt="Човек, който се бори със създаването на съдържание" 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-700">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <span>Непоследователно публикуване</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>Ниско ангажиране</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeStage === "solution" && (
                <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100">
                  <div className="p-5 bg-blue-50 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-3 rounded-full bg-blue-100">
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h4 className="text-xl font-medium text-slate-900 mb-2">Нашият 3-стъпков подход</h4>
                    <div className="space-y-4 mt-6 text-left">
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">1</div>
                        <div>
                          <p className="font-medium text-slate-900">Проучване и Стратегия</p>
                          <p className="text-sm text-slate-600">Детайлен анализ на твоя бизнес и целева аудитория</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">2</div>
                        <div>
                          <p className="font-medium text-slate-900">Създаване на съдържание</p>
                          <p className="text-sm text-slate-600">Висококачествени видеа и постове за всички формати</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">3</div>
                        <div>
                          <p className="font-medium text-slate-900">Изпълнение и Оптимизация</p>
                          <p className="text-sm text-slate-600">Управление на всичко от публикуването до анализа</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeStage === "outcome" && (
                <div className="rounded-xl overflow-hidden shadow-lg border border-green-100">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 p-1">
                    <div className="bg-white p-5">
                      <div className="text-center mb-6">
                        <div className="inline-block p-3 mb-2 rounded-full bg-green-100">
                          <Award className="h-8 w-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-medium text-slate-900">Твоите бизнес резултати</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="text-green-600 font-bold text-2xl">+85%</div>
                          <p className="text-slate-700">Увеличение на ангажираността</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="text-green-600 font-bold text-2xl">100%</div>
                          <p className="text-slate-700">Обхват на аудиторията</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="text-green-600 font-bold text-2xl">8x</div>
                          <p className="text-slate-700">Повишена лоялност на клиентите</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Final CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Ready to transform your social media presence?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
                onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
              >
                Book your free discovery call
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => document.getElementById('growth-calculator')?.scrollIntoView({behavior: 'smooth'})}
              >
                Calculate your growth potential
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
