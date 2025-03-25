
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TransactionItem } from '@/components/TransactionItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Download, 
  Filter, 
  List, 
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { transactions } from '@/lib/mockData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search term
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by date if selected
    const matchesDate = !selectedDate || transaction.date.includes(selectedDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
    
    return matchesSearch && matchesDate;
  });
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-bank-900">Historique des transactions</h1>
        <p className="text-muted-foreground">Consultez et gérez l'ensemble de vos opérations</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Rechercher une transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      selectedDate.toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    ) : (
                      "Sélectionner une date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="border-t p-3 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedDate(undefined)}
                      >
                        Effacer
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtres avancés
              </Button>
              
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              
              <div className="flex rounded-md border">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className="rounded-l-none"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          <TabsTrigger value="income">Revenus</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Transactions</CardTitle>
            <Button variant="ghost" size="sm">
              <SlidersHorizontal size={16} className="mr-2" />
              Trier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'list' ? (
            <div className="space-y-1">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
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
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune transaction ne correspond à votre recherche</p>
                  {searchTerm && (
                    <Button 
                      variant="ghost" 
                      className="mt-2"
                      onClick={() => setSearchTerm('')}
                    >
                      Effacer la recherche
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">La vue calendrier sera bientôt disponible</p>
                <Button variant="outline" onClick={() => setViewMode('list')}>
                  Revenir à la liste
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
