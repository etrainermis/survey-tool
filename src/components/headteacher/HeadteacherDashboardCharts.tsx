"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Radar, Pie, Bar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
)

export default function HeadteacherDashboardCharts() {
  // Spider chart data for the 6 components
  const radarData = {
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
        label: "Average Score (%)",
        data: [25, 60, 88, 75, 82, 93],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(59, 130, 246, 1)",
      },
    ],
  }

  // Function to get color based on score
  const getColorForScore = (score: number) => {
    if (score < 60) return { bg: "rgba(239, 68, 68, 0.8)", border: "rgba(239, 68, 68, 1)" } // Red - Critical
    if (score < 70) return { bg: "rgba(249, 115, 22, 0.8)", border: "rgba(249, 115, 22, 1)" } // Orange - Poor
    if (score < 80) return { bg: "rgba(245, 158, 11, 0.8)", border: "rgba(245, 158, 11, 1)" } // Amber - Average
    if (score < 90) return { bg: "rgba(16, 185, 129, 0.8)", border: "rgba(16, 185, 129, 1)" } // Green - Good
    return { bg: "rgba(37, 99, 235, 0.8)", border: "rgba(37, 99, 235, 1)" } // Blue - Excellent
  }

  // Function to get status text based on score
  const getStatusForScore = (score: number) => {
    if (score < 60) return "Critical"
    if (score < 70) return "Poor"
    if (score < 80) return "Average"
    if (score < 90) return "Good"
    return "Excellent"
  }

  // Function to get background color class based on score
  const getBgClassForScore = (score: number) => {
    if (score < 60) return "bg-red-50"
    if (score < 70) return "bg-orange-50"
    if (score < 80) return "bg-amber-50"
    if (score < 90) return "bg-green-50"
    return "bg-blue-50"
  }

  // Function to get text color class based on score
  const getTextClassForScore = (score: number) => {
    if (score < 60) return "text-red-700"
    if (score < 70) return "text-orange-700"
    if (score < 80) return "text-amber-700"
    if (score < 90) return "text-green-700"
    return "text-blue-700"
  }

  // Pie chart data for trades, students, and teachers
  const pieData = {
    labels: ["Trades", "Male Students", "Female Students", "Male Teachers", "Female Teachers"],
    datasets: [
      {
        data: [60, 350, 380, 75, 25],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  
  

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-700">Performance by Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {radarData.labels.map((label, index) => {
              const score = radarData.datasets[0].data[index]
              const color = getColorForScore(score)
              const status = getStatusForScore(score)
              const bgClass = getBgClassForScore(score)
              const textClass = getTextClassForScore(score)

              return (
                <div key={index} className={`flex flex-col p-3 ${bgClass} rounded-md`}>
                  <div className="flex items-center mb-1">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.border }}></div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${textClass}`}>{score}%</span>
                    <span className={`text-xs font-medium ${textClass}`}>{status}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span className="text-xs">Critical (&lt;60%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                <span className="text-xs">Poor (60-69%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                <span className="text-xs">Average (70-79%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Good (80-89%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">Excellent (90-100%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-700">School Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <Pie data={pieData} />
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium">Total Trades</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-md">
              <p className="text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-green-600">830</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-md">
              <p className="text-sm font-medium">Total Teachers</p>
              <p className="text-2xl font-bold text-amber-600">60</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-md">
              <p className="text-sm font-medium">Student-Teacher Ratio</p>
              <p className="text-2xl font-bold text-orange-600">14:1</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-md">
              <p className="text-sm font-medium">Gender Ratio (Students)</p>
              <p className="text-2xl font-bold text-purple-600">1.2:1</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-md">
              <p className="text-sm font-medium">Gender Ratio (Teachers)</p>
              <p className="text-2xl font-bold text-red-600">1.4:1</p>
            </div>
          </div>
        </CardContent>
      </Card>

     
    </div>
  )
}

