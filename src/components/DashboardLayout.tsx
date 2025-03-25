
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Sidebar collapsed={sidebarCollapsed} />}
      
      <div 
        className={`transition-all duration-300 ${
          isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-20' : 'ml-64')
        }`}
      >
        <Navbar />
        
        {!isMobile && (
          <Button
            variant="outline"
            size="icon"
            className="fixed left-0 bottom-4 bg-white z-40 rounded-r-xl rounded-l-none border-l-0 shadow-md"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ left: sidebarCollapsed ? '72px' : '256px' }}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        )}
        
        <main className="pt-20 px-4 pb-12 md:px-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
