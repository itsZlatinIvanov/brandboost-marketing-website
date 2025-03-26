import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import CaseStudies from "@/pages/CaseStudies";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Coaches from "@/pages/solutions/Coaches";
import AiAdCreation from "@/pages/solutions/AiAdCreation";
import Admin from "@/pages/Admin";
import ThemeTemplate from "@/pages/ThemeTemplate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        {/* Admin Shortcut - For development only */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-4 right-4 z-50">
            <Link 
              to="/admin" 
              className="bg-black text-white px-3 py-2 rounded-md font-medium text-sm shadow-lg hover:bg-gray-800 transition-colors"
            >
              Admin
            </Link>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions/ai-ad-creation" element={<AiAdCreation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/theme-template" element={<ThemeTemplate />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
