"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, LogOut, BarChart3, ClipboardList } from "lucide-react"
import { useEffect, useState } from "react"
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog"
import useAuth from "@/hooks/useAuth"
import DashboardLayout from "@/components/DashboardLayout"
import { useAllSurveys } from "@/hooks/useAllSurveys"

interface Survey {
  school: {
    name: string
    id: string
  }
  status: string
  createdAt: string
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([])
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const { logout, user } = useAuth()
  const { surveys, fetchingSurveys } = useAllSurveys()

  useEffect(() => {
    // Load draft surveys for current user
    const draftKey = `survey_draft_${localStorage.getItem('currentEvaluationSchool')}`
    const draft = localStorage.getItem(draftKey)
    if (draft) {
      setIncompleteSurveys([JSON.parse(draft)])
    }
  }, [user?.id])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handlePreviewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey)
    setPreviewOpen(true)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-blue-200">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 rounded-full">
              <img
                src="https://tvetmanagement.rtb.gov.rw/assets/logo-e1ac7bbe.png"
                alt="RTB Logo"
                className="h-12 w-auto"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-800">Survey Dashboard</h1>
              <p className="text-blue-600">Welcome back, {user?.name || "User"}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/create-survey")}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Survey
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLogout()}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-10">
          <Card
            className="cursor-pointer transition-all hover:shadow-md border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white to-blue-50"
            onClick={() => navigate("/incomplete-surveys")}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-700">Incomplete Surveys</CardTitle>
                <div className="p-2 bg-blue-100 rounded-full">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-800">{incompleteSurveys.length}</p>
              <p className="text-sm text-blue-600 mt-1">Surveys awaiting completion</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-md border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white to-blue-50"
            onClick={() => navigate("/completed-surveys")}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-700">Completed Surveys</CardTitle>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-800">
                {fetchingSurveys ? <span className="text-blue-400">Loading...</span> : surveys?.length || 0}
              </p>
              <p className="text-sm text-blue-600 mt-1">Surveys ready for analysis</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Survey Analytics</h2>
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-6"></div>
          <DashboardLayout />
        </div>
      </div>

      {previewOpen && selectedSurvey && (
        <SurveyPreviewDialog open={previewOpen} onOpenChange={(open) => setPreviewOpen(open)} survey={selectedSurvey} />
      )}
    </div>
  )
}

export default Dashboard

