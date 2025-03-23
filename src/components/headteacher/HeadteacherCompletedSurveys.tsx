"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, FileEdit, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import HeadteacherSurveyPreviewDialog from "./HeadteacherSurveyPreviewDialog"

// Dummy data for completed headteacher evaluations
const dummyCompletedSurveys = [
  {
    id: "ht1",
    headteacherName: "John Smith",
    schoolName: "VTC Kigali",
    district: "Kigali",
    completedDate: "2023-10-15",
    overallScore: 85,
    status: "completed",
  },
  {
    id: "ht2",
    headteacherName: "Mary Johnson",
    schoolName: "VTC Musanze",
    district: "Musanze",
    completedDate: "2023-10-12",
    overallScore: 92,
    status: "completed",
  },
  {
    id: "ht3",
    headteacherName: "Robert Williams",
    schoolName: "VTC Huye",
    district: "Huye",
    completedDate: "2023-10-10",
    overallScore: 78,
    status: "completed",
  },
  {
    id: "ht4",
    headteacherName: "Sarah Brown",
    schoolName: "VTC Rubavu",
    district: "Rubavu",
    completedDate: "2023-10-05",
    overallScore: 88,
    status: "completed",
  },
  {
    id: "ht5",
    headteacherName: "Michael Davis",
    schoolName: "VTC Nyagatare",
    district: "Nyagatare",
    completedDate: "2023-10-01",
    overallScore: 81,
    status: "completed",
  },
]

export default function HeadteacherCompletedEvaluations() {
  const navigate = useNavigate()
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleViewDetails = (survey: any) => {
    setSelectedSurvey(survey)
    setIsPreviewOpen(true)
  }

  const handleEdit = (id: string) => {
    navigate(`/headteacher/evaluation/${id}`)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/headteacher/dashboard")}
            className="mb-4 border-blue-300 text-blue-700 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-400 shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {dummyCompletedSurveys.length}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-blue-800">Completed Evaluations</h1>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-blue-200">
          <div className="grid gap-6">
            {dummyCompletedSurveys.map((survey) => (
              <Card key={survey.id} className="border-blue-200 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-semibold text-blue-700 text-lg">{survey.headteacherName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {survey.schoolName}, {survey.district}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Completed on: {survey.completedDate}</p>
                      <p className="text-xs text-gray-500">Completed by: Iris</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <div className="text-right mr-3">
                          <p className="text-xs text-gray-500">Overall Score</p>
                          <p className="font-bold text-blue-700">{survey.overallScore}/100</p>
                        </div>
                        <div
                          className="h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{
                            backgroundColor:
                              survey.overallScore >= 90
                                ? "#10b981"
                                : survey.overallScore >= 80
                                  ? "#3b82f6"
                                  : survey.overallScore >= 70
                                    ? "#f59e0b"
                                    : survey.overallScore >= 60
                                      ? "#f97316"
                                      : "#ef4444",
                          }}
                        >
                          {survey.overallScore}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(survey)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 px-4"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(survey.id)}
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 px-4"
                        >
                          <FileEdit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedSurvey && (
        <HeadteacherSurveyPreviewDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen} survey={selectedSurvey} />
      )}
    </div>
  )
}

