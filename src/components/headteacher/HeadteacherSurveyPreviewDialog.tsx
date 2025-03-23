"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileEdit, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface HeadteacherSurveyPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  survey: any
}

export default function HeadteacherSurveyPreviewDialog({
  open,
  onOpenChange,
  survey,
}: HeadteacherSurveyPreviewDialogProps) {
  const navigate = useNavigate()

  // Dummy data for the headteacher evaluation components
  const evaluationData = {
    strategicPlanning: {
      score: 18,
      maxScore: 20,
      items: [
        { name: "Vision and Mission", score: 4.5, maxScore: 5 },
        { name: "Strategic Goals", score: 4, maxScore: 5 },
        { name: "Action Plans", score: 4.5, maxScore: 5 },
        { name: "Resource Allocation", score: 5, maxScore: 5 },
      ],
    },
    operationalManagement: {
      score: 16,
      maxScore: 20,
      items: [
        { name: "Financial Management", score: 4, maxScore: 5 },
        { name: "Human Resources", score: 4, maxScore: 5 },
        { name: "Administrative Systems", score: 4, maxScore: 5 },
        { name: "Policy Implementation", score: 4, maxScore: 5 },
      ],
    },
    teachingLearning: {
      score: 17,
      maxScore: 20,
      items: [
        { name: "Curriculum Implementation", score: 4, maxScore: 5 },
        { name: "Teaching Quality", score: 4.5, maxScore: 5 },
        { name: "Student Assessment", score: 4.5, maxScore: 5 },
        { name: "Learning Environment", score: 4, maxScore: 5 },
      ],
    },
    stakeholdersEngagement: {
      score: 14,
      maxScore: 15,
      items: [
        { name: "Parent Involvement", score: 4.5, maxScore: 5 },
        { name: "Community Partnerships", score: 4.5, maxScore: 5 },
        { name: "Industry Collaboration", score: 5, maxScore: 5 },
      ],
    },
    continuousImprovement: {
      score: 12,
      maxScore: 15,
      items: [
        { name: "Data Analysis", score: 4, maxScore: 5 },
        { name: "Professional Development", score: 4, maxScore: 5 },
        { name: "Innovation", score: 4, maxScore: 5 },
      ],
    },
    infrastructure: {
      score: 8,
      maxScore: 10,
      items: [
        { name: "Facilities Management", score: 4, maxScore: 5 },
        { name: "Resource Utilization", score: 4, maxScore: 5 },
      ],
    },
  }

  const totalScore = Object.values(evaluationData).reduce((sum, component) => sum + component.score, 0)
  const maxTotalScore = Object.values(evaluationData).reduce((sum, component) => sum + component.maxScore, 0)
  const overallPercentage = Math.round((totalScore / maxTotalScore) * 100)

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getProgressBarColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 80) return "bg-blue-500"
    if (percentage >= 70) return "bg-yellow-500"
    if (percentage >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800">Headteacher Evaluation Details</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
            <div>
              <h3 className="text-lg font-semibold text-blue-700">{survey.headteacherName}</h3>
              <p className="text-sm text-gray-600">
                {survey.schoolName}, {survey.district}
              </p>
              <p className="text-xs text-gray-500">Completed on: {survey.completedDate}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="flex items-center">
                <div className="text-right mr-2">
                  <p className="text-xs text-gray-500">Overall Score</p>
                  <p className={`font-bold text-lg ${getScoreColor(totalScore, maxTotalScore)}`}>
                    {overallPercentage}/100
                  </p>
                </div>
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{
                    backgroundColor:
                      overallPercentage >= 90
                        ? "#10b981"
                        : overallPercentage >= 80
                          ? "#3b82f6"
                          : overallPercentage >= 70
                            ? "#f59e0b"
                            : overallPercentage >= 60
                              ? "#f97316"
                              : "#ef4444",
                  }}
                >
                  {overallPercentage}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/headteacher/evaluation/${survey.id}`)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <FileEdit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-blue-700">Component Scores</h4>

            {Object.entries(evaluationData).map(([key, component]) => {
              const componentName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
              const percentage = Math.round((component.score / component.maxScore) * 100)

              return (
                <div key={key} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{componentName}</span>
                    <span className={`text-sm font-medium ${getScoreColor(component.score, component.maxScore)}`}>
                      {component.score}/{component.maxScore} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getProgressBarColor(component.score, component.maxScore)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="mt-2 pl-4 border-l-2 border-gray-200">
                    {component.items.map((item, index) => {
                      const itemPercentage = Math.round((item.score / item.maxScore) * 100)
                      return (
                        <div key={index} className="flex justify-between items-center text-xs mt-1">
                          <span className="text-gray-600">{item.name}</span>
                          <span className={getScoreColor(item.score, item.maxScore)}>
                            {item.score}/{item.maxScore}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-4 border-t">
            <h4 className="font-semibold text-blue-700 mb-2">Evaluation Summary</h4>
            <p className="text-sm text-gray-600">
              This headteacher demonstrates strong leadership skills with particular strengths in strategic planning and
              teaching & learning leadership. Areas for improvement include stakeholder engagement and continuous
              improvement practices. Overall, the performance is rated as very good.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

