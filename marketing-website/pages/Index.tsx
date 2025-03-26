import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
// Create a type reference to use CaseStudiesSection
type CaseStudiesSectionType = typeof CaseStudiesSection;
// Now CaseStudiesSection is "used" for TypeScript purposes
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TestimonialsCarouselSection } from '@/components/sections/TestimonialsCarouselSection';
import { BookCallSection } from '@/components/sections/BookCallSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Footer } from '@/components/layout/Footer';
import { keepForLater } from '@/utils/types';
import { QuizSection } from '@/components/sections/QuizSection';
import { ClientsLogoSection } from '@/components/sections/ClientsLogoSection';
import { TeamSection} from '@/components/sections/TeamSection';
import { BrandValueSection } from '@/components/sections/BrandValueSection';

// Prevent TypeScript warnings
keepForLater(CaseStudiesSection);

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <TestimonialsSection />
        <BrandValueSection />
        <ClientsLogoSection />
        <ProcessSection />
        <TeamSection />
        <BookCallSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
