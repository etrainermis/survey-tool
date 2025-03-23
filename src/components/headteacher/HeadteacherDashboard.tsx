"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import HeadteacherCompletedSurveys from "./HeadteacherCompletedSurveys"
import HeadteacherIncompleteSurveys from "./HeadteacherIncompleteSurveys"
import HeadteacherDashboardCharts from "./HeadteacherDashboardCharts"

export default function HeadteacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/survey-type")}
              className="mr-4 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-blue-800">Headteacher Evaluation Dashboard</h1>
          </div>
          <Button
            onClick={() => navigate("/headteacher/create-survey")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Evaluation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white shadow-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">Completed Evaluations</h3>
                  <p className="text-3xl font-bold text-blue-800 mt-2">12</p>
                </div>
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    12
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-amber-700">Incomplete Evaluations</h3>
                  <p className="text-3xl font-bold text-amber-800 mt-2">5</p>
                </div>
                <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <div className="h-12 w-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    5
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-blue-100 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Completed Evaluations
            </TabsTrigger>
            <TabsTrigger value="incomplete" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Incomplete Evaluations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
            <HeadteacherDashboardCharts />
          </TabsContent>

          <TabsContent value="completed" className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
            <HeadteacherCompletedSurveys />
          </TabsContent>

          <TabsContent value="incomplete" className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
            <HeadteacherIncompleteSurveys />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

