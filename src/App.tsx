import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import VideoPageSingle from "./pages/VideoPage/VideoPageSingle";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ASLTranslator from "./pages/ASLTranslator";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Medical from './pages/Medical/Index';
import General from './pages/Medical/General';
import Vision from './pages/Medical/Vision';
import Prescriptions from './pages/Medical/Prescriptions';
import Emergency from './pages/Medical/Emergency';
import Pharmacy from './pages/Medical/Pharmacy';
import Treatment from './pages/Medical/Treatment';
import GSLAlgorithm from "./pages/GSLAlgorithm";
import ISpeak from "./pages/iSPEAKDataset";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/asl-translator" element={<ASLTranslator />} />
          <Route path="/settings" element={<Settings />} />

          {/* Medical main and subpages */}
          <Route path="/medical" element={<Medical />} />
          <Route path="/medical/general" element={<General />} />
          <Route path="/medical/vision" element={<Vision />} />
          <Route path="/medical/prescriptions" element={<Prescriptions />} />
          <Route path="/medical/emergency" element={<Emergency />} />
          <Route path="/medical/pharmacy" element={<Pharmacy />} />
          <Route path="/medical/treatment" element={<Treatment />} />

          {/* Other pages */}
          <Route path="/VideoPage/:id" element={<VideoPageSingle />} />
          <Route path="/gsl-algorithm" element={<GSLAlgorithm />} />
          <Route path="/iSPEAK-Dataset" element={<ISpeak />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

