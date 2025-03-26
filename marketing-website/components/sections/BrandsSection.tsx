import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const BrandsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Sample logos (replace with your actual brand logos)
  const brands = [
    { name: 'Microsoft', logo: '/placeholder-microsoft.svg' },
    { name: 'Google', logo: '/placeholder-google.svg' },
    { name: 'Amazon', logo: '/placeholder-amazon.svg' },
    { name: 'Meta', logo: '/placeholder-meta.svg' },
    { name: 'Apple', logo: '/placeholder-apple.svg' },
    { name: 'IBM', logo: '/placeholder-ibm.svg' }
  ];

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,transparent_0%,#f8fafc_70%)] opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-screen-xl mx-auto">
          <div className={cn(
            "text-center mb-10 transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Trusted by Industry Leaders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI technology and content strategies are trusted by coaches who have worked with leading companies
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-12 items-center"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100",
                  "flex items-center justify-center h-24"
                )}
              >
                {/* This would normally be an image, using a placeholder text for now */}
                <div className="text-gray-400 font-medium">{brand.name} Logo</div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className={cn(
            "mt-12 text-center text-sm text-gray-500 transition-all duration-1000 delay-200",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}>
            <p>*Some of our clients have coached executives and teams at these companies</p>
          </div>
        </div>
      </div>
    </section>
  );
};
