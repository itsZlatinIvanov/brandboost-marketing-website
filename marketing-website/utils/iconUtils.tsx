import React from 'react';
import { Users, Clock, TrendingUp, Award, BarChart } from 'lucide-react';
import { IconType } from '@/data/caseStudies';

interface IconProps {
  icon: IconType;
  className?: string;
}

export const renderIcon = ({ icon, className = "w-4 h-4" }: IconProps) => {
  switch (icon) {
    case 'users':
      return <Users className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'trending-up':
      return <TrendingUp className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'bar-chart':
      return <BarChart className={className} />;
    default:
      return <div className={className}></div>;
  }
};

export default renderIcon; 