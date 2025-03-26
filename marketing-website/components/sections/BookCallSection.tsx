import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Globe, CheckCircle, Upload, Camera, Info, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BackgroundSection } from '@/components/BackgroundSection';

export const BookCallSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const calendarLink = "https://meetings.hubspot.com/brand-boost/discovery";

  // Correct GHL Calendar Widget ID
  const calendarWidgetId = "oR4v8SecHaeW5tx1mwce";

  // Load the GHL calendar widget when component mounts
  useEffect(() => {
    if (!calendarContainerRef.current) return;
    
    // Clear any existing content
    calendarContainerRef.current.innerHTML = '';
    
    // Create the iframe exactly as provided in the embed code
    const iframe = document.createElement('iframe');
    iframe.src = `https://api.leadconnectorhq.com/widget/booking/${calendarWidgetId}`;
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.id = `${calendarWidgetId}_${Date.now()}`;
    
    // Append iframe to the container
    calendarContainerRef.current.appendChild(iframe);
    
    // Create line break
    const br = document.createElement('br');
    calendarContainerRef.current.appendChild(br);
    
    // Add the required script for form embedding
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    
    // Append script to the container
    calendarContainerRef.current.appendChild(script);
    
    // Clean up function
    return () => {
      if (calendarContainerRef.current) {
        calendarContainerRef.current.innerHTML = '';
      }
    };
  }, [calendarWidgetId]);

  // Add this state
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showPhotoInfo, setShowPhotoInfo] = useState(false);

  return (
    <BackgroundSection className="relative overflow-hidden" noPadding>
      <div id="book-call" className="container mx-auto px-4 py-20 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-blue-400"></div>
              <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Запази час</p>
              <div className="h-px w-12 bg-blue-400"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Готов ли си да трансформираш присъствието си <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">в социалните мрежи?</span>
            </h2>
            <p className="text-blue-300 text-lg md:text-xl font-medium">
              Запиши безплатна стратегическа консултация, за да разбереш как можем да ти помогнем да увеличиш аудиторията и приходите си.
            </p>
          </div>
          
          <div className={cn(
            "grid md:grid-cols-5 gap-6 lg:gap-12 transition-all duration-1000 delay-300",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {/* Calendar column - Wider on mobile for better visibility */}
            <div className="md:col-span-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl shadow-blue-900/20 border border-blue-100/30 overflow-hidden">
              <iframe 
                src={calendarLink}
                frameBorder="0" 
                width="100%" 
                height="100%" 
                className="min-h-[650px]"
              />
            </div>
            
            {/* Information column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg shadow-blue-900/20 border border-blue-500/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90">
                <h3 className="text-xl font-bold text-white mb-4">Какво да очакваш</h3>
                
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-white">45 минути</p>
                      <p className="text-slate-300 text-sm">Избери удобно за теб време. По време на тази среща ще ти разкажем за точната стратегия, която използваме за нашите клиенти, за да гарантираме резултати.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-white">Твоята локална часова зона</p>
                      <p className="text-slate-300 text-sm">Всички показани часове ще бъдат съобразени с твоята местна часова зона</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600/90 to-purple-700/90 backdrop-blur-sm p-6 rounded-xl border border-blue-400/20 shadow-lg shadow-blue-900/20">
                <h4 className="font-semibold mb-4 text-white">Какво ще научиш:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Как нашата стратегия за социални мрежи може да ти спести 10+ часа седмично</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Точната съдържателна стратегия, която работи успешно за бизнеси в момента</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Как можем да ти помогнем да изградиш стабилно присъствие с висока конверсия</span>
                  </li>
                </ul>
              </div>
                
              <Button 
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-900/20 group relative overflow-hidden"
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.scrollIntoView({behavior: 'smooth'});
                  }
                }}
              >
                <span className="relative z-10">Избери удобно време сега</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
};
