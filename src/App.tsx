import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import NotFound from "./pages/NotFound";
import CompletedSurveys from "./pages/CompleteSurvey";
import IncompleteSurveys from "./pages/UncompleteSurvey";
import Page from "@/components/evaluation/page"

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* Redirect authenticated users away from login */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/create-survey"
              element={
                isAuthenticated ? (
                  <CreateSurvey />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />     

            <Route
              path="/incomplete-surveys"
              element={
                isAuthenticated ? (
                  <IncompleteSurveys />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />       
            <Route
              path="/completed-surveys"
              element={
                isAuthenticated ? (
                  <CompletedSurveys />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />     
            <Route
              path="/evaluation"
              element={
                isAuthenticated ? (
                  <Page />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Default redirect to dashboard if authenticated */}
            <Route
              path="/"
              element={
                <Navigate
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  replace
                />
              }
            />

            <Route path="*" element={<NotFound />} />
            <Route path="/evaluation" element={<Page />} />
            <Route path="/completed-surveys" element={<CompletedSurveys />} />
            <Route path="/incomplete-surveys" element={<IncompleteSurveys />} />
            <Route path="/completed-surveys" element={<CompletedSurveys />} />
            <Route path="/incomplete-surveys" element={<IncompleteSurveys />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
