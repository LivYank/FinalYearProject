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
import Medical from "./pages/Medical";
import GSLAlgorithm from "./pages/GSLAlgorithm";
import ISpeak from "./pages/iSPEAKDataset";

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
          <Route path="/medical" element={<Medical />} />
          <Route path="/VideoPage/:id" element={<VideoPageSingle />} />
          <Route path="/gsl-algorithm" element={<GSLAlgorithm />} />
          <Route path="/iSPEAK-Dataset" element={<ISpeak />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
