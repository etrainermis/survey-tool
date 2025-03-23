"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EvaluationItemWithWeights from "./evaluation-item"
import { EvaluationItemWeights } from "./common/evaluation-item-weights"

interface InfrastructureProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
  schoolType: string
}

interface EvaluationField {
  availability: number
  quality: number
  observation: string
  label: string
  marksAllocated: number
}

interface LocalData {
  // 6.1 Administration Block
  offices: EvaluationField
  meetingRooms: EvaluationField
  adminEmergencyExits: EvaluationField
  adminVentilation: EvaluationField

  // 6.2 Classroom Block
  classCapacity: EvaluationField
  desksChairs: EvaluationField
  classVentilation: EvaluationField
  classEmergencyExits: EvaluationField

  // 6.3 Computer Lab
  computers: EvaluationField
  internet: EvaluationField
  workstations: EvaluationField
  studyAreas: EvaluationField

  // 6.4 Library
  books: EvaluationField
  libraryStudyArea: EvaluationField
  bookCondition: EvaluationField
  libraryComputers: EvaluationField

  // 6.5 Kitchen
  healthSafety: EvaluationField
  foodStorage: EvaluationField
  sanitation: EvaluationField

  // 6.6 Refectory
  tablesSeating: EvaluationField
  hygiene: EvaluationField
  refectoryVentilation: EvaluationField
  wasteDisposal: EvaluationField

  // 6.7 Changing rooms
  separateChangingRooms: EvaluationField
  girlsChangingCleanliness: EvaluationField
  boysChangingCleanliness: EvaluationField

  // 6.8 Dormitories
  separateDormitories: EvaluationField
  girlsDormCleanliness: EvaluationField
  boysDormCleanliness: EvaluationField

  // 6.9 Washrooms
  separateWashrooms: EvaluationField
  girlsWashroomCleanliness: EvaluationField
  boysWashroomCleanliness: EvaluationField

  // 6.10 Toilets
  separateToilets: EvaluationField
  girlsToiletCleanliness: EvaluationField
  boysToiletCleanliness: EvaluationField

  // 6.11 Playgrounds
  playground: EvaluationField
  sportsFacilities: EvaluationField

  // 6.12 School Garden
  plants: EvaluationField
  educationalGarden: EvaluationField

  // 6.13 Workshops
  tools: EvaluationField
  workshopVentilation: EvaluationField
  storeArrangement: EvaluationField
  workshopCleanliness: EvaluationField

  overview: {
    strength: string
    weakness: string
    improvement: string
  }
  sectionMarks: {
    totalMarks: number
    weight: number
  }
  [key: string]: any
}

const defaultEvaluation: EvaluationField = {
  availability: EvaluationItemWeights.NOT_SELECTED,
  quality: EvaluationItemWeights.NOT_SELECTED,
  observation: "",
  label: "",
  marksAllocated: 0.5,
}

export default function Infrastructure({
  formData,
  updateFormData,
  updateSectionMarks,
  schoolType,
}: InfrastructureProps) {
  const defaultData = {
    // 6.1 Administration Block
    offices: {
      ...defaultEvaluation,
      label: "Offices of all staff",
    },
    meetingRooms: {
      ...defaultEvaluation,
      label: "Meeting rooms",
    },
    adminEmergencyExits: {
      ...defaultEvaluation,
      label: "Emergency exits",
    },
    adminVentilation: {
      ...defaultEvaluation,
      label: "Ventilation and lighting",
    },

    // 6.2 Classroom Block
    classCapacity: {
      ...defaultEvaluation,
      label: "Capacity to accommodate students comfortably",
    },
    desksChairs: {
      ...defaultEvaluation,
      label: "Desks and chairs",
    },
    classVentilation: {
      ...defaultEvaluation,
      label: "Ventilation and lighting",
    },
    classEmergencyExits: {
      ...defaultEvaluation,
      label: "Emergency exits",
    },

    // 6.3 Computer Lab
    computers: {
      ...defaultEvaluation,
      label: "Functional computers related to the number of students",
    },
    internet: {
      ...defaultEvaluation,
      label: "Internet access",
    },
    workstations: {
      ...defaultEvaluation,
      label: "Setup of workstations",
    },
    studyAreas: {
      ...defaultEvaluation,
      label: "Accessibility and quiet study areas",
    },

    // 6.4 Library
    books: {
      ...defaultEvaluation,
      label: "Books and other resources",
    },
    libraryStudyArea: {
      ...defaultEvaluation,
      label: "Study area",
    },
    bookCondition: {
      ...defaultEvaluation,
      label: "Condition of books and resources",
    },
    libraryComputers: {
      ...defaultEvaluation,
      label: "Computers",
    },

    // 6.5 Kitchen
    healthSafety: {
      ...defaultEvaluation,
      label: "Compliance with health and safety regulations",
    },
    foodStorage: {
      ...defaultEvaluation,
      label: "Cleanliness and organization of food storage",
    },
    sanitation: {
      ...defaultEvaluation,
      label: "Proper sanitation facilities for food preparation",
    },

    // 6.6 Refectory
    tablesSeating: {
      ...defaultEvaluation,
      label: "Condition of tables and seating arrangements",
    },
    hygiene: {
      ...defaultEvaluation,
      label: "Cleanliness and hygiene practices",
    },
    refectoryVentilation: {
      ...defaultEvaluation,
      label: "Ventilation",
    },
    wasteDisposal: {
      ...defaultEvaluation,
      label: "Waste disposal systems",
    },

    // 6.7 Changing rooms
    separateChangingRooms: {
      ...defaultEvaluation,
      label: "Separate changing rooms for girls and boys",
    },
    girlsChangingCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of girls' changing room",
    },
    boysChangingCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of boys' changing room",
    },

    // 6.8 Dormitories
    separateDormitories: {
      ...defaultEvaluation,
      label: "Separate dormitories for girls and boys",
    },
    girlsDormCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of girls' dormitories",
    },
    boysDormCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of boys' dormitories",
    },

    // 6.9 Washrooms
    separateWashrooms: {
      ...defaultEvaluation,
      label: "Separate washrooms for girls and boys",
    },
    girlsWashroomCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of girls' washrooms",
    },
    boysWashroomCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of boys' washrooms",
    },

    // 6.10 Toilets
    separateToilets: {
      ...defaultEvaluation,
      label: "Separate toilets for girls and boys",
    },
    girlsToiletCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of girls' toilets",
    },
    boysToiletCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness of boys' toilets",
    },

    // 6.11 Playgrounds
    playground: {
      ...defaultEvaluation,
      label: "At least one playground among football, volleyball and basketball",
    },
    sportsFacilities: {
      ...defaultEvaluation,
      label: "Sports facilities (balls and kits)",
    },

    // 6.12 School Garden
    plants: {
      ...defaultEvaluation,
      label: "Health and safety of plants (non-toxic)",
    },
    educationalGarden: {
      ...defaultEvaluation,
      label: "Educational garden",
    },

    // 6.13 Workshops
    tools: {
      ...defaultEvaluation,
      label: "Condition of tools and machinery",
    },
    workshopVentilation: {
      ...defaultEvaluation,
      label: "Proper ventilation and safety measures",
    },
    storeArrangement: {
      ...defaultEvaluation,
      label: "Store arrangement",
    },
    workshopCleanliness: {
      ...defaultEvaluation,
      label: "Cleanliness",
    },

    overview: {
      strength: "",
      weakness: "",
      improvement: "",
    },
    sectionMarks: {
      totalMarks: 0,
      weight: 20,
    },
  }

  const getInitialData = (): LocalData => {
    try {
      const storedData = localStorage.getItem("survey_draft")
      if (!storedData) return defaultData

      const parsedData = JSON.parse(storedData)
      if (!parsedData || !parsedData.infrastructure || Object.keys(parsedData.infrastructure).length === 0) {
        return defaultData
      }

      return parsedData.infrastructure
    } catch (error) {
      console.error("Error parsing stored data:", error)
      return defaultData
    }
  }

  const [localData, setLocalData] = useState<LocalData>(getInitialData())
  const initialRender = useRef(true)
  const prevMarks = useRef(0)

  const calculateTotalMarks = (data: LocalData): number => {
    let totalMarks = 0

    Object.keys(data).forEach((key) => {
      const item = data[key as keyof LocalData]
      
      if (typeof item === "object" && "marksAllocated" in item) {
        if (item.quality !== EvaluationItemWeights.NOT_APPLICABLE) {
          totalMarks += item.quality ?? 0
        } 
        if (item.availability !== EvaluationItemWeights.NOT_APPLICABLE) {
          totalMarks += item.availability ?? 0
        }
      }
    })

    return Math.min(totalMarks, 20)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const currentMarks = calculateTotalMarks(localData)
    if (currentMarks !== prevMarks.current) {
      prevMarks.current = currentMarks
      updateSectionMarks(currentMarks)
    }

    updateFormData(localData)
  }, [localData, updateFormData, updateSectionMarks])

  const handleAvailabilityChange = (baseId: keyof LocalData, availabilityValue: number) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        availability: availabilityValue,
      },
    }))
  }

  const handleQualityChange = (baseId: keyof LocalData, qualityValue: number) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        quality: qualityValue,
      },
    }))
  }

  const handleObservationChange = (baseId: keyof LocalData, observationValue: string) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        observation: observationValue,
      },
    }))
  }

  const renderEvaluationItems = (startIndex: number, endIndex: number) => {
    return Object.entries(localData)
      .filter(([_, value]) => typeof value === "object" && value !== null && "label" in value)
      .slice(startIndex, endIndex)
      .map(([key, value]) => (
        <EvaluationItemWithWeights
          key={key}
          id={key}
          label={value.label}
          availabilityValue={value.availability}
          qualityValue={value.quality}
          onAvailabilityChange={handleAvailabilityChange}
          onQualityChange={handleQualityChange}
          isAvailabilityNA={value.availability === EvaluationItemWeights.NOT_APPLICABLE}
          isQualityNA={value.quality === EvaluationItemWeights.NOT_APPLICABLE}
          marksAllocated={value.marksAllocated}
          qualityWeight="60%"
          availabilityWeight="40%"
          observation={value.observation}
          onObservationChange={(value) => handleObservationChange(key, value)}
        />
      ))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-4">
          <TabsTrigger value="admin">6.1-6.2</TabsTrigger>
          <TabsTrigger value="facilities">6.3-6.4</TabsTrigger>
          <TabsTrigger value="dining">6.5-6.6</TabsTrigger>
          {schoolType === "day" ? (
            <TabsTrigger value="changing">6.7 Changing</TabsTrigger>
          ) : (
            <TabsTrigger value="dormitories">6.8 Dormitories</TabsTrigger>
          )}
          <TabsTrigger value="sanitation">6.9-6.10</TabsTrigger>
          <TabsTrigger value="recreation">6.11-6.12</TabsTrigger>
          <TabsTrigger value="workshop">6.13 Workshop</TabsTrigger>
        </TabsList>

        <TabsContent value="admin">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.1 Administration Block</h3>
              <div className="space-y-4">
                {renderEvaluationItems(0, 4)}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.2 Classroom Block</h3>
              <div className="space-y-4">
                {renderEvaluationItems(4, 8)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.3 Computer Lab</h3>
              <div className="space-y-4">
                {renderEvaluationItems(8, 12)}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.4 Library</h3>
              <div className="space-y-4">
                {renderEvaluationItems(12, 16)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dining">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.5 Kitchen</h3>
              <div className="space-y-4">
                {renderEvaluationItems(16, 19)}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.6 Refectory</h3>
              <div className="space-y-4">
                {renderEvaluationItems(19, 23)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changing">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.7 Changing rooms (for day school only)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(23, 26)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormitories">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.8 Dormitories</h3>
              <div className="space-y-4">
                {renderEvaluationItems(26, 29)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sanitation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.9 Washrooms</h3>
              <div className="space-y-4">
                {renderEvaluationItems(29, 32)}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.10 Toilets</h3>
              <div className="space-y-4">
                {renderEvaluationItems(32, 35)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recreation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.11 Playgrounds and other sports facilities</h3>
              <div className="space-y-4">
                {renderEvaluationItems(35, 37)}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.12 School Garden</h3>
              <div className="space-y-4">
                {renderEvaluationItems(37, 39)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshop">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.13 Workshops</h3>
              <div className="space-y-4">
                {renderEvaluationItems(39, 43)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Overview of the findings (kindly be brief and specific)
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="strength" className="text-sm font-medium">
                Strength:
              </Label>
              <Textarea
                id="strength"
                value={localData.overview.strength ?? ""}
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, strength: e.target.value },
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weakness" className="text-sm font-medium">
                Weakness:
              </Label>
              <Textarea
                id="weakness"
                value={localData.overview.weakness ?? ""}
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, weakness: e.target.value },
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="improvement" className="text-sm font-medium">
                Area of improvement:
              </Label>
              <Textarea
                id="improvement"
                value={localData.overview.improvement ?? ""}
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, improvement: e.target.value },
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">
            Total marks for Infrastructure and Environment:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 20
          </span>
        </div>
      </div>
    </div>
  )
}