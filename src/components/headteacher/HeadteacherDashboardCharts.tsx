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
        data: [85, 80, 88, 75, 82, 78],
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

  // Pie chart data for trades, students, and teachers
  const pieData = {
    labels: ["Trades", "Male Students", "Female Students", "Male Teachers", "Female Teachers"],
    datasets: [
      {
        data: [12, 450, 380, 35, 25],
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

  // Bar chart data for headmaster's experience ratings
  const barData = {
    labels: ["Leadership", "Management", "Teaching", "Communication", "Innovation"],
    datasets: [
      {
        label: "Experience Rating",
        data: [4.5, 4.2, 4.8, 3.9, 4.1],
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

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value: any) => {
            const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
            return labels[value]
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw
            let rating = "Poor"
            if (value >= 4.5) rating = "Excellent"
            else if (value >= 3.5) rating = "Very Good"
            else if (value >= 2.5) rating = "Good"
            else if (value >= 1.5) rating = "Fair"
            return `Rating: ${rating} (${value})`
          },
        },
      },
    },
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
            {radarData.labels.map((label, index) => (
              <div key={index} className="flex items-center p-2 bg-blue-50 rounded-md">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: radarData.datasets[0].borderColor as string }}
                ></div>
                <span className="text-sm font-medium">
                  {label}: {radarData.datasets[0].data[index]}%
                </span>
              </div>
            ))}
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-700">Headteacher Experience Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="mt-6 p-3 bg-gray-50 rounded-md">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span className="text-xs">Poor (1)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                <span className="text-xs">Fair (2)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-xs">Good (3)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">Very Good (4)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Excellent (5)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

