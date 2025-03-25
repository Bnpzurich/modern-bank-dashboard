
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="mb-8">
          <div className="text-9xl font-bold text-bank-700">404</div>
          <h1 className="text-3xl font-bold text-bank-900 mt-4">Page introuvable</h1>
          <p className="text-lg text-gray-600 mt-2">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-bank-700 hover:bg-bank-800 flex items-center"
          >
            <Home size={16} className="mr-2" />
            Retour à l'accueil
          </Button>
        </div>
        
        <div className="pt-8 text-gray-500 text-sm mt-8">
          <p>Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre service client.</p>
          <p className="mt-1">support@bankmodern.fr | 01 23 45 67 89</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
