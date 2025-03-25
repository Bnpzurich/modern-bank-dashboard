
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { beneficiaries, accounts } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CalendarCheck, Upload, CreditCard, Users, ArrowRightLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Transfers() {
  const [amount, setAmount] = useState('');
  const [transferDate, setTransferDate] = useState<Date | undefined>(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Virement effectué",
        description: `Votre virement de ${amount}€ a été programmé avec succès.`,
      });
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-bank-900">Virements</h1>
        <p className="text-muted-foreground">Effectuez et gérez vos virements en toute simplicité</p>
      </div>
      
      <Tabs defaultValue="new-transfer" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="new-transfer">Nouveau virement</TabsTrigger>
          <TabsTrigger value="scheduled">Virements programmés</TabsTrigger>
          <TabsTrigger value="recurring">Virements permanents</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new-transfer" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Nouveau virement</CardTitle>
                  <CardDescription>Effectuez un virement ponctuel ou permanent</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTransfer} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="transfer-type">Type de virement</Label>
                        <RadioGroup defaultValue="standard" className="flex flex-col space-y-1 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal">Virement standard (1-2 jours ouvrés)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="instant" id="instant" />
                            <Label htmlFor="instant" className="font-normal">Virement instantané (supplément de 0,80€)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="from-account">Compte à débiter</Label>
                          <Select defaultValue="acc-1">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un compte" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name} - {new Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency: account.currency,
                                  }).format(account.balance)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="to-account">Bénéficiaire</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un bénéficiaire" />
                            </SelectTrigger>
                            <SelectContent>
                              {beneficiaries.map((beneficiary) => (
                                <SelectItem key={beneficiary.id} value={beneficiary.id}>
                                  {beneficiary.name} - {beneficiary.bank}
                                </SelectItem>
                              ))}
                              <SelectItem value="new">+ Ajouter un bénéficiaire</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="amount">Montant (EUR)</Label>
                        <div className="relative">
                          <Input
                            id="amount"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0,00"
                            className="pl-8"
                            required
                          />
                          <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date du virement</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {transferDate ? (
                                  transferDate.toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={transferDate}
                                onSelect={setTransferDate}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reference">Référence</Label>
                          <Input id="reference" placeholder="Ex: Loyer Avril 2024" />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox 
                          id="recurring" 
                          checked={isRecurring}
                          onCheckedChange={(checked) => setIsRecurring(!!checked)}
                        />
                        <Label htmlFor="recurring" className="font-normal">Mettre en place un virement permanent</Label>
                      </div>
                      
                      {isRecurring && (
                        <div className="p-4 border rounded-md bg-gray-50 space-y-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="frequency">Fréquence</Label>
                            <Select defaultValue="monthly">
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une fréquence" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                                <SelectItem value="biweekly">Toutes les deux semaines</SelectItem>
                                <SelectItem value="monthly">Mensuelle</SelectItem>
                                <SelectItem value="quarterly">Trimestrielle</SelectItem>
                                <SelectItem value="yearly">Annuelle</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="start-date">Date de début</Label>
                              <Input type="date" id="start-date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="end-date">Date de fin (optionnel)</Label>
                              <Input type="date" id="end-date" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardFooter className="flex justify-between px-0 pt-4">
                      <Button type="button" variant="outline">
                        Annuler
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Traitement en cours...
                          </div>
                        ) : (
                          "Valider le virement"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      <span>Scanner un IBAN</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Virement par carte</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Gérer les bénéficiaires</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      <span>Historique des virements</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm">Consultez notre guide sur les virements :</p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Comment effectuer un virement instantané</li>
                      <li>Virements internationaux et frais</li>
                      <li>Limites de virements et sécurité</li>
                    </ul>
                  </div>
                  <Button variant="ghost" className="w-full">
                    Accéder à l'aide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Virements programmés</CardTitle>
              <CardDescription>
                Consultez et gérez vos virements à venir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-10">
                <div className="text-center">
                  <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="mb-2 text-muted-foreground">Vous n'avez aucun virement programmé actuellement</p>
                  <Button variant="outline" onClick={() => document.querySelector('button[value="new-transfer"]')?.click()}>
                    Créer un virement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recurring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Virements permanents</CardTitle>
              <CardDescription>
                Consultez et gérez vos virements permanents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-10">
                <div className="text-center">
                  <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="mb-2 text-muted-foreground">Vous n'avez aucun virement permanent actuellement</p>
                  <Button variant="outline" onClick={() => document.querySelector('button[value="new-transfer"]')?.click()}>
                    Créer un virement permanent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des virements</CardTitle>
              <CardDescription>
                Consultez l'historique de vos virements effectués
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-10">
                <div className="text-center">
                  <p className="mb-2 text-muted-foreground">L'historique sera disponible ici</p>
                  <Button variant="outline" onClick={() => document.querySelector('button[value="new-transfer"]')?.click()}>
                    Créer un virement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
