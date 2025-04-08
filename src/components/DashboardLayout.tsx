"use client"

import React, { useState, useEffect } from "react"
import TradesSection from "./sections/TradesSection"
import InfrastructureSection from "./sections/InfrastructureSection"
import ITSection from "./sections/ITSection"
import { useAllSurveys } from "@/hooks/useAllSurveys"
import { Provinces, Districts } from "rwanda"
import { Radar } from "react-chartjs-2"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

// Register the required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const DashboardLayout = () => {
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedSchool, setSelectedSchool] = useState("")
  const [filteredSurveys, setFilteredSurveys] = useState<any[]>([])
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [availableSchools, setAvailableSchools] = useState<any[]>([])

  const { surveys, fetchingSurveys } = useAllSurveys()

  // Process surveys to get unique locations with data
  useEffect(() => {
    if (surveys) {
      console.log(surveys)
      const processed = surveys.map((survey: any) => {
        const data = JSON.parse(survey.generalInformation)
        return {
          ...survey,
          processedData: data,
          //TODO : uncomment
          isComplete: data.school && data.school.districtId && data.school.id && data.school.name,
        }
      })
      setFilteredSurveys(processed.filter((survey: any) => survey.isComplete))
    }
  }, [surveys])

  // Get unique provinces that have data
  const availableProvinces = React.useMemo(() => {
    if (!filteredSurveys?.length) return []
    const uniqueProvinces = new Set()
    const allProvinces = Provinces()

    filteredSurveys.forEach((survey) => {
      // Find which province contains this district
      allProvinces.forEach((province) => {
        const districtsInProvince = Districts(province)
        if (districtsInProvince.includes(survey.processedData.school.districtId.name)) {
          uniqueProvinces.add(province)
        }
      })
    })

    return Array.from(uniqueProvinces) as string[]
  }, [filteredSurveys])

  // Update available districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districtsInProvince = Districts(selectedProvince)
      const districtsWithData = filteredSurveys
        .filter((survey) => survey.processedData.school.districtId)
        .filter((survey) => districtsInProvince.includes(survey.processedData.school.districtId.name))
        .map((survey) => survey.processedData.school.districtId.name)

      setAvailableDistricts([...new Set(districtsWithData)])
    } else {
      setAvailableDistricts([])
    }
    setSelectedDistrict("")
    setSelectedSchool("")
  }, [selectedProvince, filteredSurveys])

  // Update available schools when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const schoolsInDistrict = filteredSurveys
        .filter((survey) => survey.processedData.school.districtId.name === selectedDistrict)
        .map((survey) => ({
          id: survey.processedData.school.id,
          name: survey.processedData.school.name,
        }))

      setAvailableSchools(schoolsInDistrict)
    } else {
      setAvailableSchools([])
    }
    setSelectedSchool("")
  }, [selectedDistrict, filteredSurveys])

  // Filter surveys based on selection
  const getFilteredData = React.useMemo(() => {
    if (selectedSchool) {
      return filteredSurveys.filter((s) => s.processedData.school.id === selectedSchool)
    }
    if (selectedDistrict) {
      return filteredSurveys.filter((s) => s.processedData.school.districtId.name === selectedDistrict)
    }
    if (selectedProvince) {
      const districtsInProvince = Districts(selectedProvince)
      return filteredSurveys.filter((s) => districtsInProvince.includes(s.processedData.school.districtId.name))
    }
    return filteredSurveys
  }, [selectedProvince, selectedDistrict, selectedSchool, filteredSurveys])

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
        data: [85, 23, 88, 65, 82, 98],
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
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Location Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Province Filter */}
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-blue-600 mb-1">
                Province
              </label>
              <select
                id="province"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full rounded-md border border-blue-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Province</option>
                {availableProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            {selectedProvince && (
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-blue-600 mb-1">
                  District
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full rounded-md border border-blue-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* School Filter */}
            {selectedDistrict && (
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-blue-600 mb-1">
                  School
                </label>
                <select
                  id="school"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full rounded-md border border-blue-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select School</option>
                  {availableSchools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-6">
          <h2 className="font-bold text-[30px] text-blue-700">Infrastructure section</h2>
          <InfrastructureSection data={getFilteredData} />
          <h2 className="font-bold text-[30px] text-blue-700">IT section</h2>
          <ITSection data={getFilteredData} />
          <h2 className="font-semibold text-[30px] text-blue-700">Statistics per trade</h2>
          <TradesSection data={getFilteredData} />

          {/* Add the Evaluation Spider Chart Section */}
          <h2 className="font-semibold text-[30px] text-blue-700">School Evaluation Performance</h2>
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
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

