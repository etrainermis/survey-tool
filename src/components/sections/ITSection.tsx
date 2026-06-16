"use client"

import React from "react"
import { Doughnut, Bar, Pie } from "react-chartjs-2"

interface ITSectionProps {
  data: any[]
}

const ITSection: React.FC<ITSectionProps> = ({ data }) => {
  const isAffirmative = (value: unknown): boolean => {
    if (typeof value === "boolean") return value
    if (typeof value === "string") return ["yes", "true", "1"].includes(value.toLowerCase())
    return false
  }

  const processedData = React.useMemo(() => {
    if (!data?.length) return null

    const computerStats = {
      working: 0,
      notWorking: 0,
    }
    const connectivityStats = {
      internetYes: 0,
      internetNo: 0,
      projectorsYes: 0,
      projectorsNo: 0,
      serverYes: 0,
      serverNo: 0,
    }

    const energySources = new Map()

    data.forEach((survey) => {
      const it = survey.processedData?.it

      // Skip if it doesn't have the expected structure
      if (!it) return

      // Computer stats
      computerStats.working += Number.parseInt(it.computerLab?.workingComputers) || 0
      computerStats.notWorking += Number.parseInt(it.computerLab?.nonWorkingComputers) || 0

      // Connectivity stats
      const hasInternet = isAffirmative(it.internet?.exists) || isAffirmative(it.computerLab?.hasLAN)
      const hasProjectors = isAffirmative(it.computerLab?.hasProjectors)
      const hasServer = isAffirmative(it.server?.exists)

      if (hasInternet) connectivityStats.internetYes++
      else connectivityStats.internetNo++

      if (hasProjectors) connectivityStats.projectorsYes++
      else connectivityStats.projectorsNo++

      if (hasServer) connectivityStats.serverYes++
      else connectivityStats.serverNo++

      // Energy sources - Check if energySources exists and is an array
      if (Array.isArray(it.energySources)) {
        it.energySources.forEach((source: string) => {
          energySources.set(source, (energySources.get(source) || 0) + 1)
        })
      }
    })

    return {
      computerStats,
      connectivityStats,
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
        data: [
          processedData?.connectivityStats.internetYes || 0,
          processedData?.connectivityStats.projectorsYes || 0,
          processedData?.connectivityStats.serverYes || 0,
        ],
        backgroundColor: "rgba(66, 133, 244, 0.6)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 1,
      },
      {
        label: "No",
        data: [
          processedData?.connectivityStats.internetNo || 0,
          processedData?.connectivityStats.projectorsNo || 0,
          processedData?.connectivityStats.serverNo || 0,
        ],
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

