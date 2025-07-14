
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
=======
>>>>>>> 664e4f0ea749cdc9d4fe805b846ac7fda3596722
import Home from "./pages/Home";
import ASLTranslator from "./pages/ASLTranslator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Landing />} />    
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/asl-translator" element={<ASLTranslator />} /> 
=======
          <Route path="/" element={<Home />} />
          <Route path="/asl-translator" element={<ASLTranslator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
>>>>>>> 664e4f0ea749cdc9d4fe805b846ac7fda3596722
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
