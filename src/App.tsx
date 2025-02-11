import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import NotFound from "./pages/NotFound";
import { getAuthState, AuthState } from "./lib/auth";
import CompletedSurveys from "./pages/CompleteSurvey";
import IncompleteSurveys from "./pages/IncompleteSurveys";
import { SurveyPreviewDialog } from "./components/SurveyPreviewDialog";

const queryClient = new QueryClient();

const App = () => {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });

  useEffect(() => {
    const state = getAuthState();
    setAuthState(state);
  }, []);

  const handleAuthStateChange = (newState: AuthState) => {
    setAuthState(newState);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              !authState.isAuthenticated ? 
                <Login setAuthState={handleAuthStateChange} /> : 
                <Navigate to="/dashboard" replace />
            } />
            <Route path="/dashboard" element={
              authState.isAuthenticated ? 
                <Dashboard authState={authState} setAuthState={handleAuthStateChange} /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/create-survey" element={
              authState.isAuthenticated ? 
                <CreateSurvey authState={authState} /> : 
                <Navigate to="/login" replace />
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/completed-surveys" element={<CompletedSurveys />} />
    <Route path="/incomplete-surveys" element={<IncompleteSurveys  authState={authState}/>} />
    
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;