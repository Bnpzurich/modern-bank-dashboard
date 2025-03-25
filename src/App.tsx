
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Transfers from "./pages/Transfers";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

// Nouvelles pages Leboncoin
import LeboncoinLogin from "./pages/LeboncoinLogin";
import LeboncoinVerification from "./pages/LeboncoinVerification";
import LeboncoinTransaction from "./pages/LeboncoinTransaction";
import LeboncoinCompletion from "./pages/LeboncoinCompletion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages bancaires originales */}
          <Route path="/original-login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/support" element={<Support />} />
          
          {/* Nouvelles routes Leboncoin */}
          <Route path="/" element={<LeboncoinLogin />} />
          <Route path="/login" element={<LeboncoinLogin />} />
          <Route path="/verification" element={<LeboncoinVerification />} />
          <Route path="/transaction" element={<LeboncoinTransaction />} />
          <Route path="/completion" element={<LeboncoinCompletion />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
