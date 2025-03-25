
import React from 'react';
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Home, Coffee, Car, Smartphone, Gift, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TransactionType = 'deposit' | 'withdrawal' | 'shopping' | 'rent' | 'food' | 'transport' | 'utilities' | 'gift' | 'card';

export interface TransactionItemProps {
  id: string;
  type: TransactionType;
  title: string;
  date: string;
  amount: number;
  currency?: string;
}

const iconMap: Record<TransactionType, React.ElementType> = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  shopping: ShoppingBag,
  rent: Home,
  food: Coffee,
  transport: Car,
  utilities: Smartphone,
  gift: Gift,
  card: CreditCard,
};

const categoryColorMap: Record<TransactionType, string> = {
  deposit: 'bg-green-100 text-green-700',
  withdrawal: 'bg-red-100 text-red-700',
  shopping: 'bg-purple-100 text-purple-700',
  rent: 'bg-blue-100 text-blue-700',
  food: 'bg-yellow-100 text-yellow-700',
  transport: 'bg-indigo-100 text-indigo-700',
  utilities: 'bg-cyan-100 text-cyan-700',
  gift: 'bg-pink-100 text-pink-700',
  card: 'bg-gray-100 text-gray-700',
};

export function TransactionItem({
  type,
  title,
  date,
  amount,
  currency = 'EUR',
}: TransactionItemProps) {
  const Icon = iconMap[type];
  const isPositive = type === 'deposit';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="transaction-row">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", categoryColorMap[type])}>
        <Icon size={18} />
      </div>
      
      <div className="flex-1">
        <p className="font-medium text-bank-900">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      
      <div className={cn(
        "font-medium",
        isPositive ? "text-green-600" : "text-bank-900"
      )}>
        {isPositive ? '+' : ''}{formatCurrency(amount)}
      </div>
    </div>
  );
}
