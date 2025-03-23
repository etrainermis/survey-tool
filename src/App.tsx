"use client"

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateSurvey from "./pages/CreateSurvey"
import NotFound from "./pages/NotFound"
import CompletedSurveys from "./pages/CompleteSurvey"
import IncompleteSurveys from "./pages/UncompleteSurvey"
import Page from "@/components/evaluation/page"
import SurveyTypeSelection from "@/pages/SurveyTypeSelection"
import HeadteacherDashboard from "@/components/headteacher/HeadteacherDashboard"
import HeadteacherCompletedSurveys from "@/components/headteacher/HeadteacherCompletedSurveys"
import HeadteacherIncompleteSurveys from "@/components/headteacher/HeadteacherIncompleteSurveys"
import {HeadteacherCreateSurvey} from "@/components/headteacher/HeadteacherCreateSurvey"
import HeadteacherEvaluation from "@/components/headteacher/HeadteacherEvaluation"

const queryClient = new QueryClient()

const App = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Redirect authenticated users away from login */}
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/survey-type" replace />} />

            {/* Survey Type Selection */}
            <Route
              path="/survey-type"
              element={isAuthenticated ? <SurveyTypeSelection /> : <Navigate to="/login" replace />}
            />

            {/* School Survey Routes */}
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route
              path="/create-survey"
              element={isAuthenticated ? <CreateSurvey /> : <Navigate to="/login" replace />}
            />
            <Route path="/evaluation" element={<Page />} />
            <Route path="/completed-surveys" element={<CompletedSurveys />} />
            <Route path="/incomplete-surveys" element={<IncompleteSurveys />} />

            {/* Headteacher Survey Routes */}
            <Route
              path="/headteacher/dashboard"
              element={isAuthenticated ? <HeadteacherDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/headteacher/create-survey"
              element={isAuthenticated ? <HeadteacherCreateSurvey /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/headteacher/completed-surveys"
              element={isAuthenticated ? <HeadteacherCompletedSurveys /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/headteacher/incomplete-surveys"
              element={isAuthenticated ? <HeadteacherIncompleteSurveys /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/headteacher/evaluation/:id"
              element={isAuthenticated ? <HeadteacherEvaluation /> : <Navigate to="/login" replace />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App

