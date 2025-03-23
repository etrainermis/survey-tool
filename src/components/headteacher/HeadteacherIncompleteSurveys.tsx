"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileEdit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Dummy data for incomplete headteacher evaluations
const dummyIncompleteSurveys = [
  {
    id: "ht6",
    headteacherName: "James Wilson",
    schoolName: "VTC Karongi",
    district: "Karongi",
    lastUpdated: "2023-10-14",
    progress: 65,
    status: "incomplete",
  },
  {
    id: "ht7",
    headteacherName: "Patricia Moore",
    schoolName: "VTC Nyamasheke",
    district: "Nyamasheke",
    lastUpdated: "2023-10-13",
    progress: 40,
    status: "incomplete",
  },
  {
    id: "ht8",
    headteacherName: "Thomas Taylor",
    schoolName: "VTC Ngoma",
    district: "Ngoma",
    lastUpdated: "2023-10-11",
    progress: 85,
    status: "incomplete",
  },
  {
    id: "ht9",
    headteacherName: "Jennifer Anderson",
    schoolName: "VTC Bugesera",
    district: "Bugesera",
    lastUpdated: "2023-10-09",
    progress: 25,
    status: "incomplete",
  },
  {
    id: "ht10",
    headteacherName: "Charles Martin",
    schoolName: "VTC Nyabihu",
    district: "Nyabihu",
    lastUpdated: "2023-10-07",
    progress: 50,
    status: "incomplete",
  },
]

export default function HeadteacherIncompleteSurveys() {
  const navigate = useNavigate()

  const handleContinue = (id: string) => {
    navigate(`/headteacher/evaluation/${id}`)
  }

  const handleDelete = (id: string) => {
    // This would be an API call in a real application
    console.log(`Delete survey ${id}`)
    // Then refresh the list
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Incomplete Headteacher Evaluations</h2>

      <div className="grid gap-4">
        {dummyIncompleteSurveys.map((survey) => (
          <Card key={survey.id} className="border-amber-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold text-amber-700">{survey.headteacherName}</h3>
                  <p className="text-sm text-gray-600">
                    {survey.schoolName}, {survey.district}
                  </p>
                  <p className="text-xs text-gray-500">Last updated: {survey.lastUpdated}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="text-right mr-2">
                      <p className="text-xs text-gray-500">Progress</p>
                      <p className="font-bold text-amber-700">{survey.progress}%</p>
                    </div>
                    <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${survey.progress}%`,
                          backgroundColor:
                            survey.progress >= 80
                              ? "#10b981"
                              : survey.progress >= 60
                                ? "#3b82f6"
                                : survey.progress >= 40
                                  ? "#f59e0b"
                                  : survey.progress >= 20
                                    ? "#f97316"
                                    : "#ef4444",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContinue(survey.id)}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <FileEdit className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(survey.id)}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

