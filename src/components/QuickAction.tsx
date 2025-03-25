
import React from 'react';
import { ArrowRightLeft, Users, BarChart3, Download, FileText, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuickActionProps = {
  title: string;
  icon: 'transfer' | 'beneficiary' | 'analytics' | 'download' | 'statement' | 'contact';
  onClick?: () => void;
  variant?: 'default' | 'outline';
};

const iconMap = {
  transfer: ArrowRightLeft,
  beneficiary: Users,
  analytics: BarChart3,
  download: Download,
  statement: FileText,
  contact: Phone,
};

export function QuickAction({ title, icon, onClick, variant = 'default' }: QuickActionProps) {
  const Icon = iconMap[icon];
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl btn-hover",
        variant === 'default' 
          ? "bg-bank-50 hover:bg-bank-100 text-bank-900" 
          : "bg-white border border-gray-200 hover:border-bank-200 text-bank-900"
      )}
    >
      <div className="w-12 h-12 rounded-full bg-bank-700 text-white flex items-center justify-center">
        <Icon size={20} />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}
