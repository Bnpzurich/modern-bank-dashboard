
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Textarea 
} from '@/components/ui/textarea';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Search, 
  Send, 
  MessageCircle,
  HelpCircle,
  FileText,
  User,
  Shield,
  CreditCard,
  Settings,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Support() {
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage('');
      toast({
        title: "Message envoyé",
        description: "Notre équipe vous répondra dans les plus brefs délais.",
      });
    }, 1500);
  };
  
  const faqs = [
    {
      question: "Comment modifier mon adresse postale ?",
      answer: "Vous pouvez modifier votre adresse postale depuis votre profil. Accédez à 'Mon Profil' > 'Informations personnelles' > 'Modifier mon adresse'. N'oubliez pas de joindre un justificatif de domicile récent."
    },
    {
      question: "Comment contester une opération ?",
      answer: "Pour contester une opération, rendez-vous dans l'historique de vos transactions, sélectionnez l'opération concernée et cliquez sur 'Contester cette opération'. Remplissez ensuite le formulaire en expliquant les raisons de votre contestation."
    },
    {
      question: "Comment commander une nouvelle carte bancaire ?",
      answer: "Pour commander une nouvelle carte bancaire, rendez-vous dans la section 'Mes Cartes' et cliquez sur 'Commander une carte'. Vous pourrez alors choisir le type de carte souhaité et suivre les instructions pour finaliser votre commande."
    },
    {
      question: "Quels sont les frais pour les virements internationaux ?",
      answer: "Les frais pour les virements internationaux varient selon la destination et le montant. Pour les virements en euros au sein de l'UE, les frais sont les mêmes que pour les virements nationaux. Pour les autres destinations, consultez notre grille tarifaire dans la section 'Tarifs'."
    },
    {
      question: "Comment activer les notifications push ?",
      answer: "Pour activer les notifications push, accédez à 'Paramètres' > 'Notifications' et activez l'option 'Notifications push'. Vous pourrez ensuite personnaliser les types de notifications que vous souhaitez recevoir."
    },
  ];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-bank-900">Support client</h1>
        <p className="text-muted-foreground">Nous sommes là pour vous aider avec toutes vos questions</p>
      </div>
      
      <Tabs defaultValue="chat" className="mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat en direct
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Chat avec un conseiller</CardTitle>
                      <CardDescription>
                        Notre équipe est disponible pour vous aider
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-800 font-medium">En ligne</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4 space-y-4 border-y">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-bank-700 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="bg-bank-50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">Bonjour, comment puis-je vous aider aujourd'hui ?</p>
                      <p className="text-xs text-gray-500 mt-1">10:30</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
                    <Textarea 
                      placeholder="Écrivez votre message ici..." 
                      className="resize-none flex-1 min-h-[60px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
                      {isLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Send size={16} />
                      )}
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nos conseillers</CardTitle>
                  <CardDescription>
                    Disponibilité et horaires
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-bank-700 mt-0.5" />
                    <div>
                      <p className="font-medium">Horaires du chat</p>
                      <p className="text-sm text-gray-600">
                        Du lundi au vendredi : 8h30 - 19h00<br />
                        Samedi : 9h00 - 17h00
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-bank-700 mt-0.5" />
                    <div>
                      <p className="font-medium">Service téléphonique</p>
                      <p className="text-sm text-gray-600">
                        01 23 45 67 89<br />
                        Appel non surtaxé
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-bank-700 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">
                        support@bankmodern.fr<br />
                        Réponse sous 24h ouvrées
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'aide rapidement ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Guides pratiques</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Opérations cartes</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Sécurité</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Paramètres compte</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Foire aux questions</CardTitle>
                  <CardDescription>
                    Trouvez rapidement des réponses à vos questions
                  </CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans la FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-10">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Aucun résultat trouvé pour "{searchTerm}"</p>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    Effacer la recherche
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-center text-muted-foreground">
                Vous ne trouvez pas de réponse à votre question ?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-medium"
                  onClick={() => document.querySelector('button[value="chat"]')?.click()}
                >
                  Contactez nos conseillers
                </Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contactez-nous</CardTitle>
                  <CardDescription>
                    Envoyez-nous un message et nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Nom</label>
                        <Input id="name" placeholder="Votre nom" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="votre.email@exemple.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                      <Input id="subject" placeholder="Sujet de votre message" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="Décrivez votre demande en détail..." 
                        className="min-h-[150px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading || !message.trim()}>
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            Envoi en cours...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Envoyer le message
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Autres moyens de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="h-5 w-5 text-bank-700" />
                      <h3 className="font-medium">Par téléphone</h3>
                    </div>
                    <p className="text-sm pl-7">
                      01 23 45 67 89<br />
                      Du lundi au vendredi : 8h30 - 19h00<br />
                      Samedi : 9h00 - 17h00<br />
                      <span className="text-xs text-muted-foreground">Appel non surtaxé</span>
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="h-5 w-5 text-bank-700" />
                      <h3 className="font-medium">Par email</h3>
                    </div>
                    <p className="text-sm pl-7">
                      support@bankmodern.fr<br />
                      <span className="text-xs text-muted-foreground">Réponse sous 24h ouvrées</span>
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-bank-700" />
                      <h3 className="font-medium">Chat en direct</h3>
                    </div>
                    <p className="text-sm pl-7">
                      Discutez immédiatement avec un conseiller<br />
                      <Button 
                        variant="link" 
                        className="p-0 h-auto"
                        onClick={() => document.querySelector('button[value="chat"]')?.click()}
                      >
                        Démarrer un chat
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Support d'urgence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h3 className="font-medium text-red-800 mb-2">Pour les urgences :</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-800 mr-2">•</span>
                        <span><strong>Carte perdue ou volée :</strong> 0123456789 (24h/24)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-800 mr-2">•</span>
                        <span><strong>Fraude détectée :</strong> 0123456789 (24h/24)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-800 mr-2">•</span>
                        <span><strong>Accès compte bloqué :</strong> 0123456789 (24h/24)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
