
import React from 'react';
import { MoreHorizontal, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type AccountType = 'current' | 'savings' | 'credit';

export interface AccountCardProps {
  type: AccountType;
  name: string;
  balance: number;
  currency?: string;
  cardNumber?: string;
  interestRate?: number;
  availableCredit?: number;
}

export function AccountCard({
  type,
  name,
  balance,
  currency = "EUR",
  cardNumber,
  interestRate,
  availableCredit,
}: AccountCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'current':
        return 'Compte courant';
      case 'savings':
        return 'Compte épargne';
      case 'credit':
        return 'Carte de crédit';
      default:
        return 'Compte';
    }
  };

  const getCardClasses = () => {
    switch (type) {
      case 'current':
        return 'from-bank-700 to-bank-900';
      case 'savings':
        return 'from-green-700 to-green-900';
      case 'credit':
        return 'from-purple-700 to-purple-900';
      default:
        return 'from-bank-700 to-bank-900';
    }
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl card-hover`}>
      <div className={`bg-gradient-to-br ${getCardClasses()} text-white p-5`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-1">
              {getTypeLabel()}
            </p>
            <h3 className="font-bold text-lg">{name}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Voir les détails</DropdownMenuItem>
              <DropdownMenuItem>Historique des transactions</DropdownMenuItem>
              <DropdownMenuItem>Exporter (PDF)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Paramètres du compte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-4">
          <p className="text-white/70 text-xs mb-1">Solde disponible</p>
          <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
        
        {cardNumber && (
          <div className="flex items-center gap-2 mt-4">
            <CreditCard size={16} className="text-white/70" />
            <p className="text-sm font-medium">{formatCardNumber(cardNumber)}</p>
          </div>
        )}
        
        {interestRate !== undefined && (
          <div className="mt-2">
            <p className="text-white/70 text-xs mb-1">Taux d'intérêt</p>
            <p className="text-sm font-medium">{interestRate}%</p>
          </div>
        )}
        
        {availableCredit !== undefined && (
          <div className="mt-2">
            <p className="text-white/70 text-xs mb-1">Crédit disponible</p>
            <p className="text-sm font-medium">{formatCurrency(availableCredit)}</p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 flex items-center justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          Voir les détails
        </Button>
        <Button variant="ghost" size="sm" className="text-xs text-bank-700">
          Effectuer un virement
        </Button>
      </div>
    </div>
  );
}
