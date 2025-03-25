
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Receipt, ArrowRightLeft, Users, HelpCircle, Settings, LogOut, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Comptes', href: '/accounts', icon: Wallet },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Virements', href: '/transfers', icon: ArrowRightLeft },
  { label: 'Bénéficiaires', href: '/beneficiaries', icon: Users },
  { label: 'Support', href: '/support', icon: HelpCircle },
];

const bottomNavItems: NavItem[] = [
  { label: 'Paramètres', href: '/settings', icon: Settings },
  { label: 'Déconnexion', href: '/logout', icon: LogOut },
];

export function Sidebar({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const location = useLocation();
  
  return (
    <aside className={cn(
      "fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-sidebar h-screen transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed ? (
          <Link to="/dashboard" className="flex-1">
            <Logo />
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <div className="rounded bg-gradient-to-r from-bank-500 to-bank-700 w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center h-10 mt-2">
        <div className="security-badge bg-sidebar-accent border border-sidebar-accent/30">
          <Lock size={12} />
          <span>Session sécurisée</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-none">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "sidebar-link flex justify-center",
                            isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                          )}
                        >
                          <item.icon size={20} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "sidebar-link",
                        isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                      )}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className="p-3 border-t border-sidebar-border">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.href}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className="sidebar-link sidebar-link-inactive flex justify-center"
                      >
                        <item.icon size={20} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    to={item.href}
                    className="sidebar-link sidebar-link-inactive"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </div>
    </aside>
  );
}
