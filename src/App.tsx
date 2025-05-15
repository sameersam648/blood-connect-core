import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DonorProvider } from "./contexts/DonorContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DonorForm from "./pages/DonorForm";
import DonorsList from "./pages/DonorsList";
import DonorDetails from "./pages/DonorDetails";
import Donations from "./pages/Donations";
import Calendar from "./pages/Calendar";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DonorProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="donors" element={<DonorsList />} />
              <Route path="donors/:id" element={<DonorDetails />} />
              <Route path="add-donor" element={<DonorForm />} />
              <Route path="donations" element={<Donations />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DonorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
