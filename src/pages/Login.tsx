
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, Smartphone, User, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Default credentials check
    const defaultId = '30121990';
    const defaultPassword = 'Cesar@35';
    
    if (!showOtpForm) {
      // Check if using default credentials
      if (userId === defaultId && password === defaultPassword) {
        // Directly proceed to dashboard for default credentials
        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
          toast({
            title: "Connexion réussie",
            description: "Bienvenue dans votre espace personnel",
          });
        }, 1500);
      } else {
        // Normal flow - proceed to OTP
        setTimeout(() => {
          setIsLoading(false);
          setShowOtpForm(true);
          toast({
            title: "Code d'authentification envoyé",
            description: "Un code à 6 chiffres a été envoyé à votre téléphone",
          });
        }, 1500);
      }
    } else {
      // For demo purposes, accept any code with 6 digits
      if (otp.length === 6) {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
          toast({
            title: "Connexion réussie",
            description: "Bienvenue dans votre espace personnel",
          });
        }, 1500);
      } else {
        setIsLoading(false);
        toast({
          title: "Code incorrect",
          description: "Veuillez vérifier le code saisi",
          variant: "destructive",
        });
      }
    }
  };

  // Handle case when user didn't receive the code
  const handleUseDefaultCredentials = () => {
    setShowOtpForm(false);
    setUserId('30121990');
    setPassword('Cesar@35');
    toast({
      title: "Identifiants par défaut appliqués",
      description: "Vous pouvez maintenant vous connecter avec les identifiants par défaut",
    });
  };

  return (
    <AuthLayout 
      title="Connexion à votre espace client" 
      subtitle="Entrez vos identifiants pour accéder à vos comptes en toute sécurité"
    >
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        {!showOtpForm ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="userId">Identifiant</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="userId"
                  placeholder="Votre identifiant"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="/forgot-password" className="text-xs text-bank-700 hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                Se souvenir de moi
              </Label>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-bank-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-bank-700 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-bank-900">Authentification à deux facteurs</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Veuillez saisir le code à 6 chiffres envoyé au +2250779468820
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otp">Code de vérification</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Entrez le code à 6 chiffres"
                className="text-center font-mono text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>
            
            <div className="text-center space-y-2">
              <button 
                type="button" 
                className="text-sm text-bank-700 hover:underline"
                onClick={() => {
                  toast({
                    title: "Nouveau code envoyé",
                    description: "Un nouveau code a été envoyé à votre téléphone",
                  });
                }}
              >
                Renvoyer le code
              </button>
              <div>
                <button 
                  type="button" 
                  className="text-xs text-gray-500 hover:underline mt-2"
                  onClick={handleUseDefaultCredentials}
                >
                  Je ne reçois pas de code ? Utiliser les identifiants par défaut
                </button>
              </div>
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full bg-bank-700 hover:bg-bank-800" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              {showOtpForm ? "Vérification en cours..." : "Connexion en cours..."}
            </div>
          ) : (
            showOtpForm ? "Valider" : "Se connecter"
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Vous n'avez pas encore de compte?{" "}
          <a href="/signup" className="text-bank-700 hover:underline font-medium">
            Ouvrir un compte
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
