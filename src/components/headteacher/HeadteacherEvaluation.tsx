"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileEdit } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Dummy data for a completed headteacher evaluation
const dummyEvaluation = {
  id: "ht1",
  school: {
    name: "VTC Kigali",
    district: "Kigali",
    sector: "Nyarugenge",
    category: "vtc",
  },
  headteacher: {
    name: "John Smith",
    contact: "+250 789 123 456",
    email: "john.smith@example.com",
    experienceEducation: "11-15",
    experienceCurrentSchool: "6-10",
  },
  components: {
    strategicPlanning: {
      score: 85,
      items: [
        { name: "School Vision", score: 4 },
        { name: "Strategic Goals", score: 5 },
        { name: "Action Plans", score: 4 },
        { name: "Resource Allocation", score: 3 },
        { name: "Monitoring Mechanisms", score: 5 },
      ],
    },
    operationalManagement: {
      score: 80,
      items: [
        { name: "Financial Management", score: 4 },
        { name: "Human Resources", score: 4 },
        { name: "Administrative Procedures", score: 3 },
        { name: "Time Management", score: 5 },
        { name: "Record Keeping", score: 4 },
      ],
    },
    teachingLearning: {
      score: 88,
      items: [
        { name: "Curriculum Implementation", score: 5 },
        { name: "Teaching Quality", score: 4 },
        { name: "Student Assessment", score: 5 },
        { name: "Learning Resources", score: 4 },
        { name: "Innovation in Teaching", score: 4 },
      ],
    },
    stakeholdersEngagement: {
      score: 75,
      items: [
        { name: "Parent Involvement", score: 3 },
        { name: "Community Partnerships", score: 4 },
        { name: "Industry Collaboration", score: 4 },
        { name: "Alumni Relations", score: 3 },
        { name: "Government Relations", score: 4 },
      ],
    },
    continuousImprovement: {
      score: 82,
      items: [
        { name: "Self-Evaluation", score: 4 },
        { name: "Professional Development", score: 5 },
        { name: "Feedback Mechanisms", score: 4 },
        { name: "Quality Assurance", score: 3 },
        { name: "Innovation Culture", score: 4 },
      ],
    },
    infrastructure: {
      score: 78,
      items: [
        { name: "Facilities Management", score: 4 },
        { name: "Equipment Maintenance", score: 3 },
        { name: "Safety Standards", score: 5 },
        { name: "Learning Environment", score: 4 },
        { name: "Resource Utilization", score: 3 },
      ],
    },
  },
  overallScore: 81,
  completedAt: "2023-10-05",
  evaluator: "Jane Doe",
}

export default function HeadteacherEvaluation() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [evaluation, setEvaluation] = useState(dummyEvaluation)
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch the evaluation data based on the ID
  useEffect(() => {
    console.log(`Fetching evaluation with ID: ${id}`)
    // For demo purposes, we're using dummy data
  }, [id])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-amber-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-600"
    if (score >= 80) return "bg-blue-600"
    if (score >= 70) return "bg-amber-600"
    if (score >= 60) return "bg-orange-600"
    return "bg-red-600"
  }

  const getRatingText = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Very Good"
    if (score >= 70) return "Good"
    if (score >= 60) return "Fair"
    return "Poor"
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/headteacher/dashboard")}
            className="mr-4 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-blue-800">Headteacher Evaluation Results</h1>
        </div>

        <Card className="bg-white shadow-sm border-blue-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-700">{evaluation.school.name}</h2>
                <p className="text-gray-600">
                  {evaluation.school.district}, {evaluation.school.sector}
                </p>
                <p className="text-gray-600">Headteacher: {evaluation.headteacher.name}</p>
                <p className="text-sm text-gray-500">Completed on: {evaluation.completedAt}</p>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Overall Score</p>
                  <p className={`text-4xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                    {evaluation.overallScore}%
                  </p>
                  <p className={`text-sm font-medium ${getScoreColor(evaluation.overallScore)}`}>
                    {getRatingText(evaluation.overallScore)}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/headteacher/edit-evaluation/${id}`)}
                  className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Evaluation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-blue-100 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Detailed Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Component Scores</h3>

            <div className="space-y-6">
              {Object.entries(evaluation.components).map(([key, component]) => {
                const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{formattedKey}</p>
                      <p className={`font-bold ${getScoreColor(component.score)}`}>{component.score}%</p>
                    </div>
                    <Progress value={component.score} className={`h-2 ${getProgressColor(component.score)}`} />
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {Object.entries(evaluation.components).map(([key, component]) => {
              const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
              return (
                <Card key={key} className="bg-white shadow-sm border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blue-700">{formattedKey}</h3>
                      <div className="flex items-center">
                        <p className={`font-bold ${getScoreColor(component.score)} mr-2`}>{component.score}%</p>
                        <p className={`text-sm ${getScoreColor(component.score)}`}>
                          ({getRatingText(component.score)})
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {component.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <p>{item.name}</p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${
                                    star <= item.score ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {star}
                                </div>
                              ))}
                            </div>
                            <p className="ml-2 font-medium">{item.score}/5</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

