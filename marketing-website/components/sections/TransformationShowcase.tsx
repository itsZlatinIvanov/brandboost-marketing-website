import React from 'react';
import { ArrowRight, Instagram, Youtube, Users, Clock, TrendingUp, Target, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Types for the transformation showcase
type ContentType = 'instagram' | 'youtube' | 'tiktok' | 'linkedin' | 'website';

interface TransformationMetric {
  label: string;
  beforeValue: string;
  afterValue: string;
}

interface TransformationFactor {
  icon: React.ReactNode;
  text: string;
}

interface ContentExample {
  type: ContentType;
  thumbnail: string;
  caption?: string;
}

export interface TransformationShowcaseProps {
  clientName: string;
  clientRole: string;
  clientImage?: string;
  clientInitial: string;
  quote: string;
  transformationTimeMonths: number;
  metrics: TransformationMetric[];
  contentExamples: ContentExample[];
  transformationFactors: TransformationFactor[];
  onActionClick?: () => void;
}

export const TransformationShowcase: React.FC<TransformationShowcaseProps> = ({
  clientName,
  clientRole,
  clientImage,
  clientInitial,
  quote,
  transformationTimeMonths,
  metrics,
  contentExamples,
  transformationFactors,
  onActionClick,
}) => {
  // Helper function to render content type icon
  const renderContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-white" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-white" />;
      case 'tiktok':
        return <span className="text-white text-xs font-bold">TT</span>;
      case 'linkedin':
        return <span className="text-white text-xs font-bold">in</span>;
      case 'website':
        return <BarChart className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row md:min-h-[30rem]">
        {/* Left section with client info */}
        <div className="w-full md:w-2/5 p-8 bg-gradient-to-br from-blue-50 to-white flex flex-col">
          <div className="flex items-center mb-6">
            {clientImage ? (
              <img 
                src={clientImage} 
                alt={clientName} 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-600 text-xl font-bold">
                {clientInitial}
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900">{clientName}</h3>
              <p className="text-gray-600">{clientRole}</p>
            </div>
          </div>
          
          <blockquote className="mb-6 text-gray-800 italic">
            <div className="text-4xl text-blue-400 mb-2">"</div>
            <p>{quote}</p>
          </blockquote>
          
          <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">Transformation Time:</p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (transformationTimeMonths / 12) * 100)}%` }}
              ></div>
            </div>
            <p className="text-right text-blue-600 font-semibold">{transformationTimeMonths} months</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
              <h4 className="text-red-500 font-semibold uppercase text-xs mb-3">BEFORE</h4>
              {metrics.map((metric, idx) => (
                <div key={`before-${idx}`} className="mb-2 last:mb-0">
                  <p className="text-xs text-gray-500">{metric.label}:</p>
                  <p className="font-semibold">{metric.beforeValue}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg border border-green-200 p-4 shadow-sm">
              <h4 className="text-green-600 font-semibold uppercase text-xs mb-3">AFTER</h4>
              {metrics.map((metric, idx) => (
                <div key={`after-${idx}`} className="mb-2 last:mb-0">
                  <p className="text-xs text-gray-500">{metric.label}:</p>
                  <p className="font-semibold text-green-700">{metric.afterValue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right section with transformation */}
        <div className="w-full md:w-3/5 flex flex-col">
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Their Content Transformation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contentExamples.map((example, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm relative border border-gray-200 aspect-[4/3]">
                  <img 
                    src={example.thumbnail} 
                    alt={`${clientName}'s content`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 top-3 bg-gray-900/70 rounded-full w-8 h-8 flex items-center justify-center">
                    {renderContentTypeIcon(example.type)}
                  </div>
                  {example.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white text-sm">{example.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Transformation Factors</h3>
            <div className="space-y-4 mb-6">
              {transformationFactors.map((factor, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3 text-blue-600">
                    {factor.icon}
                  </div>
                  <p className="text-gray-700">{factor.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-4">
              <Button 
                onClick={onActionClick} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Start your transformation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Examples for automatic content type icons
export const ContentTypeIcons = {
  Instagram: <Instagram className="w-4 h-4" />,
  Youtube: <Youtube className="w-4 h-4" />,
  TikTok: <span className="font-bold">TT</span>,
  LinkedIn: <span className="font-bold">in</span>
};

// Examples for transformation factors
export const TransformationFactorIcons = {
  Audience: <Users className="w-4 h-4" />,
  ContentQuality: <Target className="w-4 h-4" />,
  Strategy: <BarChart className="w-4 h-4" />,
  Time: <Clock className="w-4 h-4" />,
  Growth: <TrendingUp className="w-4 h-4" />
}; 