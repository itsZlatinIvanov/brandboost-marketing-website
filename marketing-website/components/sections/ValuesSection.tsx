import { motion } from 'framer-motion';
import { Heart, Users, Target, Lightbulb, Zap, CheckCircle } from 'lucide-react';

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const ValueCard = ({ icon, title, description, delay }: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4 text-primary-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const ValuesSection = () => {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Authenticity",
      description: "I believe that coaching should amplify, not replace, your authentic voice. Every solution I create preserves what makes you unique."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Empowerment",
      description: "My goal is to give coaches the tools to expand their impact without sacrificing their limited time and energy."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Excellence",
      description: "I'm committed to building tools that exceed expectations and deliver measurable results for your coaching business."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "I constantly explore the cutting edge of AI to ensure coaches have access to the most effective content creation tools."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Efficiency",
      description: "Everything I build is designed to save you time while maximizing your impact, helping you work smarter, not harder."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Integrity",
      description: "I believe in responsible AI use that maintains the trust between you and your audience through transparency and quality."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
              My Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              The Principles That Guide My <span className="text-primary-600">Vision</span>
            </h2>
            <p className="text-lg text-gray-600">
              These values represent my commitment to you and form the foundation of everything I create.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-100 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">My Personal Promise</h3>
          <p className="text-gray-600 mb-6 text-center">
            "I will never sacrifice the human element that makes coaching powerful. My AI solutions enhance your coaching business while preserving the authentic connection you've built with your audience."
          </p>
          <div className="text-center font-semibold text-primary-600">
            — Zane
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 