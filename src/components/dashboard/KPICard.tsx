
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';

interface KPICardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'currency' | 'number' | 'percentage';
  icon?: React.ReactNode;
  subtitle?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  icon,
  subtitle
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      default:
        return formatNumber(val);
    }
  };

  const growth = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = growth >= 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-red-400">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        </div>
        {previousValue && (
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-xs font-medium">{Math.abs(growth).toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-white">{formatValue(value)}</div>
        {subtitle && <div className="text-sm text-gray-400 mt-1">{subtitle}</div>}
      </div>
      
      {previousValue && (
        <div className="text-xs text-gray-500">
          vs. previous: {formatValue(previousValue)}
        </div>
      )}
    </div>
  );
};

export default KPICard;
