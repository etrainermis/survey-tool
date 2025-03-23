"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { School, UserRound, ArrowRight, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

export default function SurveyTypeSelection() {
  const [selectedType, setSelectedType] = useState<"school" | "headteacher" | null>(null)
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleContinue = () => {
    if (selectedType === "school") {
      navigate("/dashboard")
    } else if (selectedType === "headteacher") {
      navigate("/headteacher/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout()
              navigate("/login")
            }}
            className="text-blue-700 hover:bg-blue-100 hover:text-blue-800"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Welcome to the VTC Evaluation System</h1>
          <p className="text-blue-600">Please select the type of survey you want to conduct</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedType === "school" ? "border-blue-500 bg-blue-50" : "border-blue-200 hover:border-blue-400"
            }`}
            onClick={() => setSelectedType("school")}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-700">School Survey</CardTitle>
                <div
                  className={`p-2 rounded-full ${selectedType === "school" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"}`}
                >
                  <School className="h-6 w-6" />
                </div>
              </div>
              <CardDescription>Evaluate VTC schools and infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Conduct comprehensive evaluations of VTC schools, including infrastructure, teaching quality,
                management, and resources.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-blue-600">Recommended for school inspectors and evaluators</p>
            </CardFooter>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedType === "headteacher" ? "border-blue-500 bg-blue-50" : "border-blue-200 hover:border-blue-400"
            }`}
            onClick={() => setSelectedType("headteacher")}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-700">Headteacher Survey</CardTitle>
                <div
                  className={`p-2 rounded-full ${selectedType === "headteacher" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"}`}
                >
                  <UserRound className="h-6 w-6" />
                </div>
              </div>
              <CardDescription>Comprehensive leadership assessment tool</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Assess headteacher performance, leadership skills, management capabilities, and their impact on school
                development.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-blue-600">For evaluating leadership and management effectiveness</p>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

