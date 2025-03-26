import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Users, Target, BarChart, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransformationShowcase, TransformationShowcaseProps, TransformationFactorIcons } from './TransformationShowcase';
import { motion } from 'framer-motion';

// Sample data for transformation showcases
const showcaseData: TransformationShowcaseProps[] = [
  {
    clientName: 'Sarah Johnson',
    clientRole: 'Life Coach',
    clientInitial: 'S',
    quote: "I went from struggling to post once a week to having a consistent content strategy that brings in 3-5 qualified leads every single day.",
    transformationTimeMonths: 4,
    metrics: [
      { label: 'Followers', beforeValue: '850', afterValue: '18.5K' },
      { label: 'Engagement', beforeValue: '1.2%', afterValue: '4.7%' },
      { label: 'Lead Gen', beforeValue: '2-3/month', afterValue: '15-20/week' },
      { label: 'Time Spent', beforeValue: '8 hrs/week', afterValue: '1 hr/week' },
    ],
    contentExamples: [
      {
        type: 'instagram',
        thumbnail: '/case-studies/sarah-instagram.jpg',
      },
      {
        type: 'youtube',
        thumbnail: '/case-studies/sarah-youtube.jpg',
      }
    ],
    transformationFactors: [
      { 
        icon: TransformationFactorIcons.Audience, 
        text: 'Built a highly targeted audience in their niche' 
      },
      { 
        icon: TransformationFactorIcons.ContentQuality, 
        text: 'Created consistent, professional content without filming' 
      },
      { 
        icon: TransformationFactorIcons.Strategy, 
        text: 'Optimized strategy across multiple platforms' 
      }
    ]
  },
  {
    clientName: 'Jason Miller',
    clientRole: 'Fitness Expert',
    clientInitial: 'J',
    clientImage: '/case-studies/jason-miller.jpg',
    quote: "Your team's strategy completely transformed my social media presence. My following has doubled in 3 months, and I've been able to launch a high-ticket coaching program that sold out immediately.",
    transformationTimeMonths: 3,
    metrics: [
      { label: 'Followers', beforeValue: '5.2K', afterValue: '12.5K' },
      { label: 'Engagement', beforeValue: '2.3%', afterValue: '8.7%' },
      { label: 'Revenue', beforeValue: '$2,500/mo', afterValue: '$20K/mo' },
      { label: 'Content', beforeValue: '2 posts/week', afterValue: '10 posts/week' },
    ],
    contentExamples: [
      {
        type: 'instagram',
        thumbnail: '/case-studies/jason-fitness-post.jpg',
      },
      {
        type: 'tiktok',
        thumbnail: '/case-studies/jason-tiktok.jpg',
      }
    ],
    transformationFactors: [
      { 
        icon: TransformationFactorIcons.ContentQuality, 
        text: 'Created high-converting workout demonstrations' 
      },
      { 
        icon: TransformationFactorIcons.Strategy, 
        text: 'Developed a content mix showcasing client transformations' 
      },
      { 
        icon: TransformationFactorIcons.Growth, 
        text: 'Launched a premium program with a 100% sell-out rate' 
      }
    ]
  },
  {
    clientName: 'Emily Roberts',
    clientRole: 'Business Coach',
    clientInitial: 'E',
    quote: "From posting sporadically to having a complete content system that generates consistent leads while I sleep. My calendar is now fully booked 3 weeks in advance.",
    transformationTimeMonths: 5,
    metrics: [
      { label: 'Followers', beforeValue: '3.7K', afterValue: '24.8K' },
      { label: 'Bookings', beforeValue: '3-4/month', afterValue: '15-20/month' },
      { label: 'Revenue', beforeValue: '$5K/mo', afterValue: '$35K/mo' },
      { label: 'Time Spent', beforeValue: '10 hrs/week', afterValue: '2 hrs/week' },
    ],
    contentExamples: [
      {
        type: 'linkedin',
        thumbnail: '/case-studies/emily-linkedin.jpg',
      },
      {
        type: 'website',
        thumbnail: '/case-studies/emily-website.jpg',
      }
    ],
    transformationFactors: [
      { 
        icon: TransformationFactorIcons.Audience, 
        text: 'Targeted high-value business owners looking for growth' 
      },
      { 
        icon: TransformationFactorIcons.Time, 
        text: 'Reduced content creation time by 80% with AI systems' 
      },
      { 
        icon: TransformationFactorIcons.Strategy, 
        text: 'Implemented multi-platform funnel driving to sales calls' 
      }
    ]
  },
  {
    clientName: 'Michael Chen',
    clientRole: 'Real Estate Agent',
    clientInitial: 'M',
    quote: "Your AI-powered content strategy revolutionized my business. I went from cold-calling to having clients reach out to me directly after seeing my content online.",
    transformationTimeMonths: 3,
    metrics: [
      { label: 'Followers', beforeValue: '720', afterValue: '14.3K' },
      { label: 'Inquiries', beforeValue: '1-2/week', afterValue: '8-10/day' },
      { label: 'Listings', beforeValue: '2/month', afterValue: '8-10/month' },
      { label: 'Commissions', beforeValue: '$15K/mo', afterValue: '$85K/mo' },
    ],
    contentExamples: [
      {
        type: 'instagram',
        thumbnail: '/case-studies/michael-instagram.jpg',
      },
      {
        type: 'youtube',
        thumbnail: '/case-studies/michael-youtube.jpg',
      }
    ],
    transformationFactors: [
      { 
        icon: TransformationFactorIcons.ContentQuality, 
        text: 'Showcased properties through high-quality digital tours' 
      },
      { 
        icon: TransformationFactorIcons.Audience, 
        text: 'Built targeted following of local homebuyers and sellers' 
      },
      { 
        icon: TransformationFactorIcons.Growth, 
        text: 'Established reputation as the go-to luxury property expert' 
      }
    ]
  },
  {
    clientName: 'Sophia Martinez',
    clientRole: 'Digital Product Creator',
    clientInitial: 'S',
    quote: "I went from $3,000 to $27,000 monthly revenue in just 90 days. Your team's content strategy and AI avatar saved me countless hours while driving incredible sales.",
    transformationTimeMonths: 3,
    metrics: [
      { label: 'Followers', beforeValue: '2.8K', afterValue: '31.5K' },
      { label: 'Sales', beforeValue: '$3K/mo', afterValue: '$27K/mo' },
      { label: 'Conv. Rate', beforeValue: '1.2%', afterValue: '4.8%' },
      { label: 'Content', beforeValue: '1-2/week', afterValue: 'Daily' },
    ],
    contentExamples: [
      {
        type: 'tiktok',
        thumbnail: '/case-studies/sophia-tiktok.jpg',
      },
      {
        type: 'instagram',
        thumbnail: '/case-studies/sophia-instagram.jpg',
      }
    ],
    transformationFactors: [
      { 
        icon: TransformationFactorIcons.Strategy, 
        text: 'Created a multi-platform sales funnel with clear CTAs' 
      },
      { 
        icon: TransformationFactorIcons.Time, 
        text: 'Used AI avatars to create consistent, engaging content' 
      },
      { 
        icon: TransformationFactorIcons.Growth, 
        text: 'Scaled digital product business with automated systems' 
      }
    ]
  }
];

interface TransformationShowcaseSectionProps {
  title?: string;
  subtitle?: string;
  ctaUrl?: string;
}

export const TransformationShowcaseSection: React.FC<TransformationShowcaseSectionProps> = ({
  title = "Real Results, Real Growth",
  subtitle = "See how our clients transformed their social media presence and grew their business",
  ctaUrl = "https://calendly.com/clycio/discovery"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === showcaseData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? showcaseData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleActionClick = () => {
    window.open(ctaUrl, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Navigation arrows */}
          <div className="hidden md:block">
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Carousel container */}
          <div className="overflow-hidden">
            <motion.div 
              ref={carouselRef}
              className="flex"
              animate={{ x: -currentIndex * 100 + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {showcaseData.map((showcase, index) => (
                <div key={index} className="w-full min-w-full px-4">
                  <TransformationShowcase 
                    {...showcase} 
                    onActionClick={handleActionClick}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {showcaseData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex justify-center mt-6 md:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevSlide}
            className="mr-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextSlide}
          >
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary-600 hover:bg-primary-700"
            onClick={handleActionClick}
          >
            Transform your social media strategy <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}; 