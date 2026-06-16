"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { useAllInCompletedSurveysByLoggedInUser } from "@/hooks/useAllSurveys"

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
  },
  strategicPlanning: any;
  operationalManagement: any;
  teachingAndLearning: any;
  stakeholdersEngagement: any;
  continuousImprovement: any;
  infrastructureAndEnvironment: any;
}

const IncompleteSurveys = () => {
  const navigate = useNavigate()
  const { surveys, fetchingSurveys } = useAllInCompletedSurveysByLoggedInUser()
  const [hiddenSchoolIds, setHiddenSchoolIds] = useState<string[]>([])

  const visibleSurveys = useMemo(() => {
    if (!surveys?.length) return []

    const uniqueBySchool = new Map<string, Survey>()
    surveys.forEach((survey) => {
      if (survey?.school?.id && !uniqueBySchool.has(survey.school.id)) {
        uniqueBySchool.set(survey.school.id, survey)
      }
    })

    return Array.from(uniqueBySchool.values()).filter(
      (survey) => !hiddenSchoolIds.includes(survey.school.id),
    )
  }, [surveys, hiddenSchoolIds])

  // useEffect(() => {
  //   const userString = localStorage.getItem("user")
  //   const user = userString ? JSON.parse(userString) : null // Parse user correctly
  //   const drafts: any[] = [];

  //   Object.keys(localStorage).forEach((key) => {
  //     if (key.startsWith("survey_draft_")) {
  //       console.log(key);
        
  //       const draft = JSON.parse(localStorage.getItem(key) || "null");
  //       if (draft) {
  //         drafts.push(draft);
  //       }
  //     }
  //   });
  //   setIncompleteSurveys(drafts);


  // }, [])

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
          {fetchingSurveys ? (
            <p className="text-blue-500 text-center py-8">Loading incomplete surveys...</p>
          ) : visibleSurveys.length > 0 ? (
            visibleSurveys.map((survey) => (
              <div
                key={survey.school.id}
                className="p-4 border-b border-blue-100 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium ">{survey.school.name}</h3>
                  <p className="text-sm text-blue-500">Draft</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setHiddenSchoolIds((prev) => [...prev, survey.school.id])
                    }}
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-400"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.setItem("currentEvaluationSchool", survey.school.id)
                      navigate(`/create-survey?schoolId=${survey.school.id}`)
                    }}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
                  >
                    Continue
                  </Button>
                </div>
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

