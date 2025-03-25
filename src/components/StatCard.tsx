
import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  currency?: string;
  icon?: React.ReactNode;
};

export function StatCard({ title, value, change, trend = 'neutral', currency, icon }: StatCardProps) {
  const formatCurrency = (value: number | string) => {
    if (typeof value === 'string') return value;
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency || 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const displayValue = currency ? formatCurrency(value) : value;
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 card-hover">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-bank-700">{icon}</div>}
      </div>
      
      <div className="mt-2">
        <p className="text-2xl font-bold text-bank-900">{displayValue}</p>
        
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {trend === 'up' && (
              <ArrowUp size={16} className="text-green-500 mr-1" />
            )}
            {trend === 'down' && (
              <ArrowDown size={16} className="text-red-500 mr-1" />
            )}
            {trend === 'neutral' && (
              <TrendingUp size={16} className="text-blue-500 mr-1" />
            )}
            
            <span className={cn(
              "text-sm font-medium",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600", 
              trend === 'neutral' && "text-blue-600"
            )}>
              {change > 0 && '+'}
              {change}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs. mois dernier</span>
          </div>
        )}
      </div>
    </div>
  );
}
