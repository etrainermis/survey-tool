"use client"

import React from "react"
import { Bar, Doughnut } from "react-chartjs-2"

interface InfrastructureSectionProps {
  data: any[]
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    if (!data?.length) return null

    const infrastructureStatusMap = new Map()
    const materialsCountMap = new Map()

    data.forEach((survey) => {
      const infrastructure = survey.processedData.infrastructure
      infrastructure.forEach((item: any) => {
        // Count infrastructure by status
        if (!infrastructureStatusMap.has(item.type)) {
          infrastructureStatusMap.set(item.type, {
            good: 0,
            moderate: 0,
            poor: 0,
          })
        }
        infrastructureStatusMap.get(item.type)[item.status]++

        // Count materials usage
        item.materials.forEach((material: string) => {
          materialsCountMap.set(material, (materialsCountMap.get(material) || 0) + 1)
        })
      })
    })

    return {
      infrastructureStatus: Array.from(infrastructureStatusMap.entries()),
      materialsCount: Array.from(materialsCountMap.entries()),
    }
  }, [data])

  const infrastructureStatus = {
    labels: processedData?.infrastructureStatus.map(([type]) => type) || [],
    datasets: [
      {
        label: "Good",
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.good) || [],
        backgroundColor: "rgba(66, 133, 244, 0.6)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 1,
      },
      {
        label: "Moderate",
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.moderate) || [],
        backgroundColor: "rgba(52, 168, 83, 0.6)",
        borderColor: "rgba(52, 168, 83, 1)",
        borderWidth: 1,
      },
      {
        label: "Poor",
        data: processedData?.infrastructureStatus.map(([, counts]) => counts.poor) || [],
        backgroundColor: "rgba(234, 67, 53, 0.6)",
        borderColor: "rgba(234, 67, 53, 1)",
        borderWidth: 1,
      },
    ],
  }

  const constructionMaterials = {
    labels: processedData?.materialsCount.map(([material]) => material) || [],
    datasets: [
      {
        data: processedData?.materialsCount.map(([, count]) => count) || [],
        backgroundColor: [
          "rgba(66, 133, 244, 0.6)",
          "rgba(52, 168, 83, 0.6)",
          "rgba(251, 188, 5, 0.6)",
          "rgba(234, 67, 53, 0.6)",
          "rgba(128, 0, 128, 0.6)",
          "rgba(0, 128, 128, 0.6)",
          "rgba(128, 128, 0, 0.6)",
          "rgba(0, 0, 128, 0.6)",
          "rgba(128, 0, 0, 0.6)",
          "rgba(0, 128, 0, 0.6)",
        ],
        borderColor: [
          "rgba(66, 133, 244, 1)",
          "rgba(52, 168, 83, 1)",
          "rgba(251, 188, 5, 1)",
          "rgba(234, 67, 53, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 128, 1)",
          "rgba(128, 128, 0, 1)",
          "rgba(0, 0, 128, 1)",
          "rgba(128, 0, 0, 1)",
          "rgba(0, 128, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infrastructure Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Infrastructure Status</h3>
          <Bar
            data={infrastructureStatus}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true },
              },
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>

        {/* Construction Materials */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Construction Materials Distribution</h3>
          <Doughnut
            data={constructionMaterials}
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

export default InfrastructureSection

