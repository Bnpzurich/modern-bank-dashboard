
import React from 'react';
import { Logo } from './Logo';
import { Lock, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Branding & Information */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-800 to-green-950 text-white p-8 flex-col justify-between">
        <div>
          <Logo />
          <h1 className="mt-16 text-4xl font-heading font-bold">Votre banque, <br />plus moderne que jamais</h1>
          <p className="mt-4 text-white/80 max-w-md">
            Accédez à tous vos services bancaires avec une simplicité remarquable et une sécurité inégalée.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Sécurité de pointe</h3>
              <p className="text-sm text-white/70">Protection par chiffrement AES-256 pour toutes vos données</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Confidentialité garantie</h3>
              <p className="text-sm text-white/70">Aucune information partagée avec des tiers sans votre consentement</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white md:px-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="md:hidden mb-6">
              <Logo color="dark" />
            </div>
            <h2 className="text-2xl font-bold text-green-900">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          
          {children}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-xs bg-green-50 text-green-700 px-3 py-2 rounded-full">
            <ShieldCheck size={14} />
            <span>Connexion sécurisée (SSL/TLS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
