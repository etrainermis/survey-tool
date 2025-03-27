"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { School } from "lucide-react"
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
  }
}

const IncompleteSurveys = () => {
  const navigate = useNavigate()
  const { surveys , fetchingSurveys, errorFetchingSurveys } = useAllInCompletedSurveysByLoggedInUser();

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
  useEffect(()=>{
    console.log(surveys);
    
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
          {surveys?.length > 0 ? (
            surveys?.map((survey, index) => (
              <div
                key={index}
                className="p-4 border-b border-blue-100 last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium ">{survey.school.name}</h3>
                  <p className="text-sm text-blue-500">Draft</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/create-survey?schoolId=${survey.school.id}`)}
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

