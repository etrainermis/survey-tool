"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { StrategicPlanningData, EvaluationField } from "./evaluation/EvaluationType"

// Create default evaluation field
const createDefaultField = (): EvaluationField => ({
  availability: 0,
  quality: 0,
  observation: "",
})

// Create initial form data
const createInitialData = (): StrategicPlanningData => ({
  // Strategic Planning
  strategicPlan: createDefaultField(),
  schoolVision: createDefaultField(),
  schoolMission: createDefaultField(),
  organizationalStructure: createDefaultField(),
  operationalBudget: createDefaultField(),

  // Annual budget and Procurement plan
  annualBudgetPlan: createDefaultField(),
  procurementPlan: createDefaultField(),
  businessPlan: createDefaultField(),
  tenderCommittee: createDefaultField(),

  // Overview
  overview: {
    strength: "",
    weakness: "",
    improvement: "",
  },

  // Section marks
  sectionMarks: {
    totalMarks: 0,
    weight: 10,
  },

  // Total marks
  totalMarks: 0,
})

interface HeadteacherStrategicPlanningProps {
  data?: any
  onDataChange?: (data: any) => void
}

export default function HeadteacherStrategicPlanning({
  data = {},
  onDataChange = () => {},
}: HeadteacherStrategicPlanningProps) {
  const [localData, setLocalData] = useState<StrategicPlanningData>(() => {
    const initialData = createInitialData()

    // If we have data from parent, merge it
    if (data?.strategicPlanning) {
      return {
        ...initialData,
        ...data.strategicPlanning,
        overview: {
          strength: data.strategicPlanning.overview?.strength || "",
          weakness: data.strategicPlanning.overview?.weakness || "",
          improvement: data.strategicPlanning.overview?.improvement || "",
        },
      }
    }

    return initialData
  })

  useEffect(() => {
    calculateTotalMarks()
  }, [
    localData.strategicPlan,
    localData.schoolVision,
    localData.schoolMission,
    localData.organizationalStructure,
    localData.operationalBudget,
    localData.annualBudgetPlan,
    localData.procurementPlan,
    localData.businessPlan,
    localData.tenderCommittee,
  ])

  const handleAvailabilityChange = (
    section: keyof Omit<StrategicPlanningData, "overview" | "sectionMarks" | "totalMarks">,
    value: number,
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        availability: value,
      },
    }))
  }

  const handleQualityChange = (
    section: keyof Omit<StrategicPlanningData, "overview" | "sectionMarks" | "totalMarks">,
    value: number,
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        quality: value,
      },
    }))
  }

  const handleObservationChange = (
    section: keyof Omit<StrategicPlanningData, "overview" | "sectionMarks" | "totalMarks">,
    value: string,
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        observation: value,
      },
    }))
  }

  const handleOverviewChange = (field: keyof StrategicPlanningData["overview"], value: string) => {
    setLocalData((prev) => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: value,
      },
    }))
  }

  // Helper function to calculate marks for a single item
  const calculateItemMarks = (
    item: EvaluationField,
    allocatedMarks: number,
    isQualityNA: boolean,
    isAvailabilityNA: boolean,
  ) => {
    if (isQualityNA) {
      // If quality is N/A, availability is 100% of the marks
      return item.availability === 1 ? allocatedMarks : 0
    } else if (isAvailabilityNA) {
      // If availability is N/A, quality is 100% of the marks
      return item.quality === 1 ? allocatedMarks : 0
    } else {
      // Normal calculation: 40% for availability, 60% for quality
      const availabilityMarks = item.availability === 1 ? allocatedMarks * 0.4 : 0
      const qualityMarks = item.quality === 1 ? allocatedMarks * 0.6 : 0
      return availabilityMarks + qualityMarks
    }
  }

  const calculateTotalMarks = () => {
    // Calculate total marks
    const strategicPlanMarks = calculateItemMarks(localData.strategicPlan, 2, true, false)
    const schoolVisionMarks = calculateItemMarks(localData.schoolVision, 1, false, true)
    const schoolMissionMarks = calculateItemMarks(localData.schoolMission, 1, false, true)
    const organizationalStructureMarks = calculateItemMarks(localData.organizationalStructure, 1, false, true)
    const operationalBudgetMarks = calculateItemMarks(localData.operationalBudget, 1, false, true)
    const annualBudgetPlanMarks = calculateItemMarks(localData.annualBudgetPlan, 1, true, false)
    const procurementPlanMarks = calculateItemMarks(localData.procurementPlan, 1, true, false)
    const businessPlanMarks = calculateItemMarks(localData.businessPlan, 1, true, false)
    const tenderCommitteeMarks = calculateItemMarks(localData.tenderCommittee, 1, true, false)

    const total =
      strategicPlanMarks +
      schoolVisionMarks +
      schoolMissionMarks +
      organizationalStructureMarks +
      operationalBudgetMarks +
      annualBudgetPlanMarks +
      procurementPlanMarks +
      businessPlanMarks +
      tenderCommitteeMarks

    // Update section marks and total marks
    const updatedData = {
      ...localData,
      sectionMarks: {
        ...localData.sectionMarks,
        totalMarks: total,
      },
      totalMarks: total,
    }

    setLocalData(updatedData)

    // Call onDataChange with the updated data
    onDataChange({ strategicPlanning: updatedData })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="strategic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="strategic">1.1 Strategic Planning</TabsTrigger>
          <TabsTrigger value="budget">1.2 Annual Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="strategic">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">1.1 Strategic Planning (6 marks)</h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="strategicPlan"
                  label="Approved Strategic plan (Signed by the right authority)"
                  availabilityValue={localData.strategicPlan.availability}
                  qualityValue={localData.strategicPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("strategicPlan", value)}
                  onQualityChange={(value) => handleQualityChange("strategicPlan", value)}
                  marksAllocated={2}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.strategicPlan.observation}
                  onObservationChange={(value) => handleObservationChange("strategicPlan", value)}
                />
                <EvaluationItem
                  id="schoolVision"
                  label="School vision"
                  availabilityValue={localData.schoolVision.availability}
                  qualityValue={localData.schoolVision.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolVision", value)}
                  onQualityChange={(value) => handleQualityChange("schoolVision", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.schoolVision.observation}
                  onObservationChange={(value) => handleObservationChange("schoolVision", value)}
                />
                <EvaluationItem
                  id="schoolMission"
                  label="School Mission"
                  availabilityValue={localData.schoolMission.availability}
                  qualityValue={localData.schoolMission.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolMission", value)}
                  onQualityChange={(value) => handleQualityChange("schoolMission", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.schoolMission.observation}
                  onObservationChange={(value) => handleObservationChange("schoolMission", value)}
                />
                <EvaluationItem
                  id="organizationalStructure"
                  label="Organizational structure"
                  availabilityValue={localData.organizationalStructure.availability}
                  qualityValue={localData.organizationalStructure.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("organizationalStructure", value)}
                  onQualityChange={(value) => handleQualityChange("organizationalStructure", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.organizationalStructure.observation}
                  onObservationChange={(value) => handleObservationChange("organizationalStructure", value)}
                />
                <EvaluationItem
                  id="operationalBudget"
                  label="Operational budget"
                  availabilityValue={localData.operationalBudget.availability}
                  qualityValue={localData.operationalBudget.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("operationalBudget", value)}
                  onQualityChange={(value) => handleQualityChange("operationalBudget", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.operationalBudget.observation}
                  onObservationChange={(value) => handleObservationChange("operationalBudget", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                1.2 Annual budget and Procurement plan (4 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="annualBudgetPlan"
                  label="Approved annual and budget plan"
                  availabilityValue={localData.annualBudgetPlan.availability}
                  qualityValue={localData.annualBudgetPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("annualBudgetPlan", value)}
                  onQualityChange={(value) => handleQualityChange("annualBudgetPlan", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.annualBudgetPlan.observation}
                  onObservationChange={(value) => handleObservationChange("annualBudgetPlan", value)}
                />
                <EvaluationItem
                  id="procurementPlan"
                  label="Approved procurement plan"
                  availabilityValue={localData.procurementPlan.availability}
                  qualityValue={localData.procurementPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("procurementPlan", value)}
                  onQualityChange={(value) => handleQualityChange("procurementPlan", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.procurementPlan.observation}
                  onObservationChange={(value) => handleObservationChange("procurementPlan", value)}
                />
                <EvaluationItem
                  id="businessPlan"
                  label="Business Plan for production unit"
                  availabilityValue={localData.businessPlan.availability}
                  qualityValue={localData.businessPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("businessPlan", value)}
                  onQualityChange={(value) => handleQualityChange("businessPlan", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.businessPlan.observation}
                  onObservationChange={(value) => handleObservationChange("businessPlan", value)}
                />
                <EvaluationItem
                  id="tenderCommittee"
                  label="Tender and receiving committee appointed (Valid appointment letter)"
                  availabilityValue={localData.tenderCommittee.availability}
                  qualityValue={localData.tenderCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tenderCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("tenderCommittee", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.tenderCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("tenderCommittee", value)}
                />
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
                value={localData.overview.strength}
                onChange={(e) => handleOverviewChange("strength", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weakness" className="text-sm font-medium">
                Weakness:
              </Label>
              <Textarea
                id="weakness"
                value={localData.overview.weakness}
                onChange={(e) => handleOverviewChange("weakness", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="improvement" className="text-sm font-medium">
                Area of improvement:
              </Label>
              <Textarea
                id="improvement"
                value={localData.overview.improvement}
                onChange={(e) => handleOverviewChange("improvement", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">Total marks for Strategic Planning:</span>
          <span className="text-xl font-bold text-blue-800">{localData.totalMarks.toFixed(1)} / 10</span>
        </div>
      </div>
    </div>
  )
}

