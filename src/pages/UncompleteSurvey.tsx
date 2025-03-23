"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface Survey {
  school: {
    id: string
    name: string
    status: string
    category: string
    location: {
      province: string
      district: string
      sector: string
      cell: string
      village: string
    }
    stats: {
      trades: number
      students: number
      teachers: number
      maleTeachers?: number
      femaleTeachers?: number
    }
    contact: {
      phone: string
      email: string
      headteacher: string
      owner: string
    }
    trades: Array<{
      id: string
      name: string
      levels: Array<{
        level: number
        classrooms: number
        students: {
          male: number
          female: number
        }
      }>
    }>
  }
}

const IncompleteSurveys = () => {
  const navigate = useNavigate()
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([])

  useEffect(() => {
    const userString = localStorage.getItem("user")
    const user = userString ? JSON.parse(userString) : null // Parse user correctly

    if (user && user.id) {
      const draft = JSON.parse(localStorage.getItem(`survey_draft_${localStorage.getItem('currentEvaluationSchool')}`) || "null")
      if (draft) {
        setIncompleteSurveys([draft])
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Incomplete Surveys</h1>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
        >
          Back
        </Button>
        <div className="bg-white rounded-lg shadow border border-blue-200">
          {incompleteSurveys.length > 0 ? (
            incompleteSurveys.map((survey, index) => (
              <div
                key={index}
                className="p-4 border-b border-blue-100 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-blue-700">{survey.school.name}</h3>
                  <p className="text-sm text-blue-500">Draft</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/create-survey")}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
                >
                  Continue
                </Button>
              </div>
            ))
          ) : (
            <p className="text-blue-500 text-center py-8">No incomplete surveys found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default IncompleteSurveys

