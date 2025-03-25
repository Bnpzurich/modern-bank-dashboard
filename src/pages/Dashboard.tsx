
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AccountCard } from '@/components/AccountCard';
import { TransactionItem } from '@/components/TransactionItem';
import { QuickAction } from '@/components/QuickAction';
import { StatCard } from '@/components/StatCard';
import { Link } from 'react-router-dom';
import { CreditCard, BarChart3, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { accounts, getRecentTransactions, getCurrentMonthStats } from '@/lib/mockData';

export default function Dashboard() {
  const recentTransactions = getRecentTransactions();
  const { income, expenses } = getCurrentMonthStats();
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-900">Bonjour, AUBRETTE THERRIEN</h1>
        <p className="text-muted-foreground">Voici un aperçu de vos finances aujourd'hui</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Solde total" 
          value={accounts.reduce((sum, acc) => sum + acc.balance, 0)}
          change={2.4} 
          trend="up" 
          currency="EUR"
          icon={<DollarSign size={20} />}
        />
        <StatCard 
          title="Revenus (ce mois)" 
          value={income}
          change={0} 
          trend="neutral" 
          currency="EUR"
          icon={<BarChart3 size={20} />}
        />
        <StatCard 
          title="Dépenses (ce mois)" 
          value={expenses}
          change={-5.2} 
          trend="down" 
          currency="EUR"
          icon={<PieChart size={20} />}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-green-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <QuickAction title="Nouveau virement" icon="transfer" />
          <QuickAction title="Bénéficiaires" icon="beneficiary" />
          <QuickAction title="Mes analyses" icon="analytics" />
          <QuickAction title="Télécharger" icon="download" />
          <QuickAction title="Relevés" icon="statement" />
          <QuickAction title="Contact" icon="contact" />
        </div>
      </div>
      
      {/* Main Content - Accounts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-green-900">Mes comptes</h2>
            <Link to="/accounts">
              <Button variant="outline" size="sm">Voir tous les comptes</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                type={account.type}
                name={account.name}
                balance={account.balance}
                currency={account.currency}
                cardNumber={account.cardNumber}
                interestRate={account.interestRate}
                availableCredit={account.availableCredit}
              />
            ))}
          </div>
        </div>
        
        {/* Transactions Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transactions récentes</CardTitle>
                  <CardDescription>
                    Les 5 dernières opérations
                  </CardDescription>
                </div>
                <Link to="/transactions">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    id={transaction.id}
                    type={transaction.type}
                    title={transaction.title}
                    date={transaction.date}
                    amount={transaction.amount}
                    currency={transaction.currency}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Carte Visa Premier</CardTitle>
              <CardDescription>
                Détails de votre carte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 bank-card p-5">
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-1">
                      Visa Premier
                    </p>
                  </div>
                  <div className="text-white text-lg font-semibold">VISA</div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white/70 text-xs mb-1">Numéro de carte</p>
                  <p className="text-lg font-medium font-mono">4916 •••• •••• 3824</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Titulaire</p>
                    <p className="text-sm font-medium">AUBRETTE THERRIEN</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Expire</p>
                    <p className="text-sm font-medium">09/27</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plafond mensuel</span>
                  <span className="font-medium">5 000,00 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Disponible ce mois</span>
                  <span className="font-medium">4 642,18 €</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm" className="w-full mr-2">
                    <CreditCard size={16} className="mr-2" />
                    Paramètres
                  </Button>
                  <Button variant="outline" size="sm" className="w-full ml-2">
                    Verrouiller
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
