
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AccountCard } from '@/components/AccountCard';
import { TransactionItem } from '@/components/TransactionItem';
import { getAccountById, getRecentTransactions, accounts } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Download, 
  FilePlus, 
  Filter, 
  Printer, 
  Share2 
} from 'lucide-react';

export default function Accounts() {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id);
  
  const selectedAccount = getAccountById(selectedAccountId);
  const accountTransactions = getRecentTransactions(selectedAccountId, 10);
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-bank-900">Mes comptes</h1>
        <p className="text-muted-foreground">Gérez tous vos comptes et accédez à leurs détails</p>
      </div>
      
      <Tabs defaultValue="accounts" className="mb-6">
        <TabsList>
          <TabsTrigger value="accounts">Tous les comptes</TabsTrigger>
          <TabsTrigger value="cards">Cartes bancaires</TabsTrigger>
          <TabsTrigger value="investments">Placements</TabsTrigger>
          <TabsTrigger value="loans">Prêts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {accounts.map((account) => (
              <div 
                key={account.id} 
                onClick={() => setSelectedAccountId(account.id)}
                className={`cursor-pointer transition-all ${selectedAccountId === account.id ? 'ring-2 ring-bank-500 rounded-xl' : ''}`}
              >
                <AccountCard
                  type={account.type}
                  name={account.name}
                  balance={account.balance}
                  currency={account.currency}
                  cardNumber={account.cardNumber}
                  interestRate={account.interestRate}
                  availableCredit={account.availableCredit}
                />
              </div>
            ))}
          </div>
          
          {selectedAccount && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Détails du compte</CardTitle>
                      <CardDescription>
                        {selectedAccount.name}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-2" />
                        Exporter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer size={16} className="mr-2" />
                        Imprimer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 size={16} className="mr-2" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500 mb-1">Solde actuel</p>
                        <p className="text-2xl font-bold">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: selectedAccount.currency,
                          }).format(selectedAccount.balance)}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500 mb-1">Type de compte</p>
                        <p className="text-lg font-semibold">
                          {selectedAccount.type === 'current' ? 'Compte courant' : 
                           selectedAccount.type === 'savings' ? 'Compte épargne' : 'Carte de crédit'}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500 mb-1">Numéro de compte</p>
                        <p className="text-lg font-semibold font-mono">
                          FR76 **** **** **** 3421
                        </p>
                      </div>
                    </div>
                    
                    {selectedAccount.type === 'savings' && (
                      <div className="p-4 rounded-lg bg-bank-50">
                        <div className="flex items-start space-x-3">
                          <FilePlus className="h-5 w-5 text-bank-600 mt-1" />
                          <div>
                            <p className="font-medium">Intérêts prévisionnels pour cette année</p>
                            <p className="text-sm mt-1">
                              Avec un taux de {selectedAccount.interestRate}%, vous pourriez gagner environ 
                              <span className="font-medium text-bank-700"> 
                                {new Intl.NumberFormat('fr-FR', {
                                  style: 'currency',
                                  currency: selectedAccount.currency,
                                }).format(selectedAccount.balance * (selectedAccount.interestRate || 0) / 100)}
                              </span> d'intérêts cette année.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Transactions récentes</CardTitle>
                      <CardDescription>
                        Historique des dernières opérations sur ce compte
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter size={16} className="mr-2" />
                        Filtrer
                      </Button>
                      <Link to="/transactions">
                        <Button variant="default" size="sm">
                          Voir tout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {accountTransactions.length > 0 ? (
                      accountTransactions.map((transaction) => (
                        <TransactionItem
                          key={transaction.id}
                          id={transaction.id}
                          type={transaction.type}
                          title={transaction.title}
                          date={transaction.date}
                          amount={transaction.amount}
                          currency={transaction.currency}
                        />
                      ))
                    ) : (
                      <p className="text-center py-6 text-gray-500">Aucune transaction récente pour ce compte</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cards">
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500">Vos cartes bancaires apparaîtront ici</p>
              <Button variant="outline" className="mt-2">
                Ajouter une carte
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="investments">
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500">Vos placements apparaîtront ici</p>
              <Button variant="outline" className="mt-2">
                Découvrir nos placements
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="loans">
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500">Vos prêts apparaîtront ici</p>
              <Button variant="outline" className="mt-2">
                Simuler un prêt
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
