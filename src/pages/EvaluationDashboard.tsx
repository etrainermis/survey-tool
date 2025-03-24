"use client"

import type React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

interface EvaluationDashboardProps {
  evaluationData: any
}

const EvaluationDashboard: React.FC<EvaluationDashboardProps> = ({ evaluationData }) => {
  // Prepare data for section scores chart
  const sectionScoresData = {
    labels: [
      "Strategic Planning",
      "Operational Management",
      "Teaching & Learning",
      "Stakeholders Engagement",
      "Continuous Improvement",
      "Infrastructure",
    ],
    datasets: [
      {
        label: "Score",
        data: [
          evaluationData.strategicPlanning?.totalMarks || 0,
          evaluationData.operationalManagement?.totalMarks || 0,
          evaluationData.teachingAndLearning?.totalMarks || 0,
          evaluationData.stakeholdersEngagement?.totalMarks || 0,
          evaluationData.continuousImprovement?.totalMarks || 0,
          evaluationData.infrastructureAndEnvironment?.totalMarks || 0,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(46, 204, 113, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(46, 204, 113, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Maximum Score",
        data: [10, 30, 20, 10, 10, 20],
        backgroundColor: "rgba(220, 220, 220, 0.5)",
        borderColor: "rgba(220, 220, 220, 1)",
        borderWidth: 1,
      },
    ],
  }

  // Calculate percentage scores for each section
  const calculatePercentage = (score: number, maxScore: number) => {
    return (score / maxScore) * 100
  }

  const percentageScores = {
    strategicPlanning: calculatePercentage(evaluationData.strategicPlanning?.totalMarks || 0, 10),
    operationalManagement: calculatePercentage(evaluationData.operationalManagement?.totalMarks || 0, 30),
    teachingAndLearning: calculatePercentage(evaluationData.teachingAndLearning?.totalMarks || 0, 20),
    stakeholdersEngagement: calculatePercentage(evaluationData.stakeholdersEngagement?.totalMarks || 0, 10),
    continuousImprovement: calculatePercentage(evaluationData.continuousImprovement?.totalMarks || 0, 10),
    infrastructureAndEnvironment: calculatePercentage(evaluationData.infrastructureAndEnvironment?.totalMarks || 0, 20),
  }

  // Prepare data for performance distribution chart
  const performanceDistributionData = {
    labels: ["Excellent (80-100%)", "Good (60-79%)", "Average (40-59%)", "Poor (0-39%)"],
    datasets: [
      {
        data: [
          Object.values(percentageScores).filter((score) => score >= 80).length,
          Object.values(percentageScores).filter((score) => score >= 60 && score < 80).length,
          Object.values(percentageScores).filter((score) => score >= 40 && score < 60).length,
          Object.values(percentageScores).filter((score) => score < 40).length,
        ],
        backgroundColor: [
          "rgba(46, 204, 113, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(46, 204, 113, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Calculate total score
  const totalScore = Object.values(percentageScores).reduce((sum, score) => sum + score, 0) / 6
  const scoreCategory =
    totalScore >= 80 ? "Excellent" : totalScore >= 60 ? "Good" : totalScore >= 40 ? "Average" : "Poor"
  const scoreColor =
    totalScore >= 80
      ? "text-green-600"
      : totalScore >= 60
        ? "text-blue-600"
        : totalScore >= 40
          ? "text-orange-500"
          : "text-red-500"

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">Evaluation Dashboard</h3>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="text-blue-700 text-sm">Overall Score</h3>
          <p className={`text-3xl font-bold mt-1 ${scoreColor}`}>{totalScore.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 mt-1">Performance: {scoreCategory}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="text-blue-700 text-sm">Highest Scoring Area</h3>
          <p className="text-xl font-bold mt-1">
            {Object.entries(percentageScores)
              .sort((a, b) => b[1] - a[1])[0][0]
              .replace(/([A-Z])/g, " $1")
              .trim()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {Object.entries(percentageScores)
              .sort((a, b) => b[1] - a[1])[0][1]
              .toFixed(1)}
            %
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="text-blue-700 text-sm">Improvement Needed</h3>
          <p className="text-xl font-bold mt-1">
            {Object.entries(percentageScores)
              .sort((a, b) => a[1] - b[1])[0][0]
              .replace(/([A-Z])/g, " $1")
              .trim()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {Object.entries(percentageScores)
              .sort((a, b) => a[1] - b[1])[0][1]
              .toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Scores */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Section Scores</h3>
          <Bar
            data={sectionScoresData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Score",
                  },
                },
              },
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

        {/* Performance Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Performance Distribution</h3>
          <Doughnut
            data={performanceDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Detailed Section Scores</h3>
        <div className="space-y-3">
          {Object.entries(percentageScores).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-semibold">{value.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    value >= 80
                      ? "bg-green-600"
                      : value >= 60
                        ? "bg-blue-600"
                        : value >= 40
                          ? "bg-orange-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EvaluationDashboard

