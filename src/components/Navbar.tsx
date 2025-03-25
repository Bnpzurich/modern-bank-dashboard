
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Bell, ChevronDown, HelpCircle, Menu, Search, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 py-2 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          <Link to="/dashboard" className="mr-6">
            <Logo color="dark" />
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-50 rounded-md transition-colors">
                Accueil
              </Link>
              <Link to="/accounts" className="px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-50 rounded-md transition-colors">
                Comptes
              </Link>
              <Link to="/transactions" className="px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-50 rounded-md transition-colors">
                Transactions
              </Link>
              <Link to="/transfers" className="px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-50 rounded-md transition-colors">
                Virements
              </Link>
              <Link to="/support" className="px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-50 rounded-md transition-colors">
                Support
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-green-700">
            <Search size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-green-700 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm font-medium">Paiement confirmé</p>
                  <p className="text-xs text-muted-foreground">Votre paiement de 42,00 € à EDF a été effectué</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
                </div>
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm font-medium">Nouveau relevé disponible</p>
                  <p className="text-xs text-muted-foreground">Votre relevé de compte du mois d'avril est disponible</p>
                  <p className="text-xs text-muted-foreground mt-1">Hier</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">Tout marquer comme lu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="text-green-700">
            <HelpCircle size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <User size={16} className="text-green-700" />
                </div>
                {!isMobile && <span className="text-sm font-medium">AUBRETTE THERRIEN</span>}
                {!isMobile && <ChevronDown size={16} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Mon Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/logout">Déconnexion</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-white pt-20 animate-fade-in">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              to="/dashboard" 
              className="px-4 py-3 text-green-900 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/accounts" 
              className="px-4 py-3 text-green-900 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comptes
            </Link>
            <Link 
              to="/transactions" 
              className="px-4 py-3 text-green-900 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Transactions
            </Link>
            <Link 
              to="/transfers" 
              className="px-4 py-3 text-green-900 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Virements
            </Link>
            <Link 
              to="/support" 
              className="px-4 py-3 text-green-900 hover:bg-green-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
