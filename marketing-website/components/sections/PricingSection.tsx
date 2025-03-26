import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle, CalendarCheck, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingSection = () => {
  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [monthlyContent, setMonthlyContent] = useState(12);
  const [avgClientValue, setAvgClientValue] = useState(3000);
  
  // Estimated followers gained in 90 days based on content volume
  const estimateFollowers = (contentPieces: number) => {
    const baseFollowers = 5000;
    const multiplier = contentPieces / 12;
    return Math.round(baseFollowers * multiplier);
  };
  
  // Estimated client acquisition based on followers
  const estimateNewClients = (followers: number) => {
    const conversionRate = 0.01; // 1% conversion rate
    return Math.round((followers * conversionRate) * 10) / 10;
  };
  
  // Calculate ROI
  const calculateROI = () => {
    const investment = 2500; // Average monthly package price
    const followers = estimateFollowers(monthlyContent);
    const newClients = estimateNewClients(followers);
    const revenue = newClients * avgClientValue;
    const roi = ((revenue - investment) / investment) * 100;
    return Math.round(roi * 10) / 10;
  };
  
  return (
    <section id="investment" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-blue-600 font-medium mb-3">INVESTMENT & RETURNS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
              An Investment in Your Business Growth
            </h2>
            <p className="text-slate-600 text-lg">
              Our premium service delivers measurable ROI by transforming your social media presence into a client acquisition channel.
            </p>
          </div>
          
          {/* Value proposition cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Time saved card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Save 40+ Hours Monthly</h3>
              <p className="text-slate-600 mb-4">
                Focus on serving clients while we handle your entire content creation pipeline.
              </p>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Hours saved per month</span>
                  <span className="font-medium text-slate-900">40-60 hours</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
            
            {/* Growth card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Grow a Qualified Audience</h3>
              <p className="text-slate-600 mb-4">
                Build a following of 10K+ potential clients who value your expertise.
              </p>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Average follower growth</span>
                  <span className="font-medium text-slate-900">5-15K in 90 days</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            
            {/* ROI card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Generate Positive ROI</h3>
              <p className="text-slate-600 mb-4">
                Our clients typically see a 3-5x return on their investment within 6 months.
              </p>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Average ROI</span>
                  <span className="font-medium text-slate-900">300-500%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Investment overview + ROI calculator */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Investment details */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-5">Premium Service Package</h3>
              <p className="text-slate-600 mb-6">
                Our comprehensive service is designed for coaches and consultants who want to leverage social media for business growth without the time investment.
              </p>
              
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900">All-Inclusive Package</h4>
                  <div className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-6">
                  Complete done-for-you social media content strategy and management
                </p>
                
                <div className="mb-6">
                  <div className="flex gap-2 items-baseline mb-1">
                    <span className="text-3xl font-bold text-slate-900">$2,000-3,000</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <p className="text-sm text-slate-500">3-month minimum commitment for optimal results</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Custom AI avatar creation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">3-5 pieces of content per week</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Full content calendar management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Professional editing and optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Profile optimization for conversion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Weekly performance reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-700">Dedicated strategy specialist</span>
                  </li>
                </ul>
                
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Schedule a consultation
                </Button>
              </div>
              
              <p className="text-sm text-slate-500 italic">
                * Custom packages available for specific needs. Pricing is determined after understanding your unique business goals during your discovery call.
              </p>
            </div>
            
            {/* ROI Calculator */}
            <div>
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">ROI Calculator</h3>
                  <p className="text-slate-300 text-sm">
                    Estimate your potential return based on your specific business metrics
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Monthly content pieces
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="20"
                      value={monthlyContent}
                      onChange={(e) => setMonthlyContent(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>4 pieces</span>
                      <span>{monthlyContent} pieces</span>
                      <span>20 pieces</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Average client value ($)
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      step="500"
                      value={avgClientValue}
                      onChange={(e) => setAvgClientValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>$1,000</span>
                      <span>${avgClientValue.toLocaleString()}</span>
                      <span>$10,000</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-sm text-slate-500 mb-1">Est. followers in 90 days</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {estimateFollowers(monthlyContent).toLocaleString()}+
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-sm text-slate-500 mb-1">Est. new clients</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {estimateNewClients(estimateFollowers(monthlyContent))}+
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-green-50 rounded-lg border border-green-100 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Potential ROI</p>
                        <p className="text-3xl font-bold text-green-600">{calculateROI()}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-1">Potential revenue</p>
                        <p className="text-xl font-bold text-slate-800">
                          ${(estimateNewClients(estimateFollowers(monthlyContent)) * avgClientValue).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => document.getElementById('discovery-call')?.scrollIntoView({behavior: 'smooth'})}
                  >
                    Discuss your custom ROI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 