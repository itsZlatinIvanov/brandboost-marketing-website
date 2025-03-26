import React from 'react';
import { TrendingUp } from 'lucide-react';

export const CaseStudiesHeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Real Client Results
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Transforming Social Media Presence for Coaches & Consultants
          </h1>
          
          <p className="text-xl text-gray-600">
            See how our AI-powered content strategy has helped our clients grow their audience, 
            save time, and increase revenue.
          </p>
        </div>
      </div>
    </section>
  );
}; 