"use client"

import React from "react"
import { Doughnut, Bar, Pie } from "react-chartjs-2"

interface ITSectionProps {
  data: any[]
}

const ITSection: React.FC<ITSectionProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    if (!data?.length) return null

    const computerStats = {
      working: 0,
      notWorking: 0,
    }

    const energySources = new Map()

    data.forEach((survey) => {
      const it = survey.processedData?.it

      // Skip if it doesn't have the expected structure
      if (!it) return

      // Computer stats
      computerStats.working += Number.parseInt(it.computerLab?.workingComputers) || 0
      computerStats.notWorking += Number.parseInt(it.computerLab?.nonWorkingComputers) || 0

      // Energy sources - Check if energySources exists and is an array
      if (Array.isArray(it.energySources)) {
        it.energySources.forEach((source: string) => {
          energySources.set(source, (energySources.get(source) || 0) + 1)
        })
      }
    })

    return {
      computerStats,
      energySources: Array.from(energySources.entries()),
    }
  }, [data])

  const computerStatus = {
    labels: ["Working", "Not Working"],
    datasets: [
      {
        data: [processedData?.computerStats.working || 0, processedData?.computerStats.notWorking || 0],
        backgroundColor: ["rgba(66, 133, 244, 0.6)", "rgba(234, 67, 53, 0.6)"],
        borderColor: ["rgba(66, 133, 244, 1)", "rgba(234, 67, 53, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const connectivityData = {
    labels: ["Internet", "Projectors", "Server"],
    datasets: [
      {
        label: "Yes",
        data: [15, 12, 8],
        backgroundColor: "rgba(66, 133, 244, 0.6)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 1,
      },
      {
        label: "No",
        data: [5, 8, 12],
        backgroundColor: "rgba(234, 67, 53, 0.6)",
        borderColor: "rgba(234, 67, 53, 1)",
        borderWidth: 1,
      },
    ],
  }

  const energySourceData = {
    labels: processedData?.energySources.map(([source]) => source) || [],
    datasets: [
      {
        data: processedData?.energySources.map(([, count]) => count) || [],
        backgroundColor: ["rgba(251, 188, 5, 0.6)", "rgba(66, 133, 244, 0.6)", "rgba(52, 168, 83, 0.6)"],
        borderColor: ["rgba(251, 188, 5, 1)", "rgba(66, 133, 244, 1)", "rgba(52, 168, 83, 1)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Computer Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Computer Status</h3>
          <Doughnut
            data={computerStatus}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

        {/* Connectivity Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Connectivity Status</h3>
          <Bar
            data={connectivityData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        {/* Energy Sources */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Energy Sources</h3>
          <Pie
            data={energySourceData}
            options={{
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ITSection

