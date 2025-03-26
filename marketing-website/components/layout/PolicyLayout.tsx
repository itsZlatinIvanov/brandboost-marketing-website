import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUp, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundSection2 } from "@/components/BackgroundSection2";

interface Section {
  id: string;
  title: string;
  number?: string;
  subsections?: { id: string; title: string }[];
}

interface PolicyLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}

export const PolicyLayout = ({ title, subtitle, lastUpdated, sections, children }: PolicyLayoutProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Get all section headings
    const sectionElements = contentRef.current?.querySelectorAll('[id]') || [];
    
    // Setup intersection observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section elements
    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    // Track scroll progress
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      
      const totalHeight = wrapperRef.current.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = Math.min(scrollPosition / totalHeight, 1);
      
      setScrollProgress(progress * 100);
      setShowBackToTop(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Get header height (assuming fixed header)
      const headerHeight = 100; // approximate header height in pixels
      
      // Calculate position
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update active section
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div ref={wrapperRef} className="min-h-screen">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50 transition-all duration-300 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Header />
      
      <BackgroundSection2 className="pt-24 relative" noPadding>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-blue-500"></div>
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Документи</p>
              <div className="h-px w-12 bg-blue-500"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 text-center">
              {title}
            </h1>
            <p className="text-xl text-slate-600 text-center">{subtitle}</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Left sidebar - Table of Contents */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 p-5 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100/50">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white inline-flex items-center justify-center mr-2">
                    <Circle className="w-3.5 h-3.5 fill-current" />
                  </span>
                  Съдържание
                </h2>
                
                <div className="overflow-y-auto max-h-[calc(100vh-250px)] pr-2 -mr-2">
                  <ul className="space-y-3">
                    {sections.map((section) => (
                      <li 
                        key={section.id} 
                        className={cn(
                          "rounded-lg transition-all duration-200",
                          activeSection === section.id 
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm" 
                            : "hover:bg-slate-50"
                        )}
                      >
                        <a 
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(section.id);
                          }}
                          className={cn(
                            "block px-4 py-2 rounded-lg transition-colors relative",
                            activeSection === section.id 
                              ? "text-blue-800 font-medium" 
                              : "text-slate-700 hover:text-blue-700"
                          )}
                        >
                          {activeSection === section.id && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                          )}
                          <span className="flex items-center">
                            {section.number && (
                              <span className={cn(
                                "mr-2 w-6 h-6 rounded-full inline-flex items-center justify-center text-sm",
                                activeSection === section.id
                                  ? "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800"
                                  : "bg-slate-100 text-slate-600"
                              )}>
                                {section.number}
                              </span>
                            )}
                            {section.title}
                          </span>
                        </a>
                        
                        {section.subsections && section.subsections.length > 0 && (
                          <ul className={cn(
                            "space-y-1 px-4 pb-2",
                            activeSection === section.id || section.subsections.some(sub => activeSection === sub.id)
                              ? "block"
                              : "hidden lg:block"
                          )}>
                            {section.subsections.map((subsection) => (
                              <li key={subsection.id}>
                                <a 
                                  href={`#${subsection.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(subsection.id);
                                  }}
                                  className={cn(
                                    "block py-1 pl-8 border-l text-sm transition-colors",
                                    activeSection === subsection.id 
                                      ? "border-blue-500 text-blue-700 font-medium" 
                                      : "border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300"
                                  )}
                                >
                                  {subsection.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right side - Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100/50 overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex items-center mb-10 pb-4 border-b border-slate-100">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-auto"></div>
                    <p className="text-sm text-slate-500">Последна актуализация: <span className="font-medium">{lastUpdated}</span></p>
                  </div>
                  
                  <div 
                    ref={contentRef} 
                    className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-lead:text-slate-600 prose-p:text-slate-600 prose-strong:text-slate-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-hr:my-8"
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundSection2>
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/20 focus:outline-none",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Нагоре"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      
      <Footer />
    </div>
  );
}; 