import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectHunt from "./pages/ProjectHunt";
import CompanyAnalysis from "./pages/CompanyAnalysis";
import EmailOutreach from "./pages/EmailOutreach";
import Bookmarks from "./pages/Bookmarks";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/hunt" element={<Layout><ProjectHunt /></Layout>} />
          <Route path="/analysis" element={<Layout><CompanyAnalysis /></Layout>} />
          <Route path="/email" element={<Layout><EmailOutreach /></Layout>} />
          <Route path="/bookmarks" element={<Layout><Bookmarks /></Layout>} />
          <Route path="/chat" element={<Layout><AIAssistant /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
