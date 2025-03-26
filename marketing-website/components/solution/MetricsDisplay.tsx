
import { Progress } from '@/components/ui/progress';

interface Metrics {
  [key: string]: number;
}

interface MetricsDisplayProps {
  metrics: Metrics;
}

export const MetricsDisplay = ({ metrics }: MetricsDisplayProps) => {
  return (
    <div className="space-y-4">
      {Object.entries(metrics).map(([metric, value]) => (
        <div key={metric} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{metric}</span>
            <span className={value >= 50 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(value)}%
            </span>
          </div>
          <Progress 
            value={Math.abs(value)} 
            className={`h-2 ${value >= 50 ? 'bg-green-100' : 'bg-red-100'}`}
          />
        </div>
      ))}
    </div>
  );
};
