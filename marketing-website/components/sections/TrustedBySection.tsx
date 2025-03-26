import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const TrustedBySection = () => {
  // Case studies data
  const caseStudiesData = [
    {
      name: "Sarah Johnson",
      title: "Life Coach & Bestselling Author",
      image: "/case-studies/sarah.jpg",
      result: "3.5x audience growth",
      quote: "Working with Zane transformed my online presence. I'm reaching more people than ever while spending less time on content creation."
    },
    {
      name: "Marcus Fernandez",
      title: "Business Coach",
      image: "/case-studies/marcus.jpg",
      result: "12 hrs/week saved",
      quote: "The AI solution allowed me to double my client roster because I wasn't spending all my time creating content."
    },
    {
      name: "Elena Chen",
      title: "Health & Wellness Coach",
      image: "/case-studies/elena.jpg",
      result: "248% engagement increase",
      quote: "My audience connects with my content more than ever, and it perfectly captures my voice and expertise."
    }
  ];
  
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
      <div className="absolute top-1/3 left-20 w-72 h-72 bg-primary-200/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium backdrop-blur-sm mb-6 border border-amber-100">
              <Star className="w-4 h-4 mr-2 text-amber-500" />
              Trusted by Industry Leaders
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Coaches Who Have Transformed Their <span className="text-primary-600">Digital Presence</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These successful coaches have leveraged our AI solutions to expand their reach while reclaiming their time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudiesData.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.6 }}
                className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {/* Placeholder for case study image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200 text-gray-400">
                    {study.name} Photo
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-amber-500 text-white font-semibold py-1 px-3 rounded-full text-sm shadow-md">
                      {study.result}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{study.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mb-4">{study.title}</p>
                  
                  <div className="relative mb-6 pl-4">
                    <div className="absolute left-0 top-0 h-full w-1 bg-primary-200 rounded-full"></div>
                    <p className="text-gray-600 italic text-sm">"{study.quote}"</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to="/case-studies" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                      Read Full Case Study
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button asChild className="bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
              <Link to="/case-studies">
                View All Success Stories
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 