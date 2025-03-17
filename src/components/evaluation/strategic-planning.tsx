"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StrategicPlanningProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
}

export default function StrategicPlanning({ formData, updateFormData, updateSectionMarks }: StrategicPlanningProps) {
  const [localData, setLocalData] = useState({
    // Strategic Planning
    strategicPlanAvailability: "", // Change from "na" to ""
    strategicPlanQuality: "na", // Change from "" to "na"
    schoolVisionAvailability: "na", // Keep as is
    schoolVisionQuality: "",
    schoolMissionAvailability: "na", // Keep as is
    schoolMissionQuality: "",
    organizationalStructureAvailability: "na", // Keep as is
    organizationalStructureQuality: "",
    operationalBudgetAvailability: "na", // Keep as is
    operationalBudgetQuality: "",

    // Annual budget and Procurement plan
    annualBudgetPlanAvailability: "",
    annualBudgetPlanQuality: "",
    procurementPlanAvailability: "",
    procurementPlanQuality: "",
    businessPlanAvailability: "",
    businessPlanQuality: "",
    tenderCommitteeAvailability: "",
    tenderCommitteeQuality: "",

    // Add observation fields
    strategicPlanObservation: "",
    schoolVisionObservation: "",
    schoolMissionObservation: "",
    organizationalStructureObservation: "",
    operationalBudgetObservation: "",
    annualBudgetPlanObservation: "",
    procurementPlanObservation: "",
    businessPlanObservation: "",
    tenderCommitteeObservation: "",

    // Overview
    strength: "",
    weakness: "",
    improvement: "",
    ...formData,
  })

  const initialRender = useRef(true)
  const prevMarks = useRef(0)

  const calculateMarks = () => {
    let total = 0

    // Helper function to calculate marks for an item
    const calculateItemMarks = (baseId, marksAllocated) => {
      const availabilityValue = localData[`${baseId}Availability`]
      const qualityValue = localData[`${baseId}Quality`]

      // If quality is N/A, only consider availability
      if (qualityValue === "na") {
        return availabilityValue === "yes" ? marksAllocated : 0
      }

      // If availability is N/A, only consider quality
      if (availabilityValue === "na") {
        return qualityValue === "yes" ? marksAllocated : 0
      }

      // Calculate partial marks based on availability (40%) and quality (60%)
      let marks = 0
      if (availabilityValue === "yes") {
        marks += marksAllocated * 0.4
      }
      if (qualityValue === "yes") {
        marks += marksAllocated * 0.6
      }

      return marks
    }

    // Strategic Planning (6 marks)
    total += calculateItemMarks("strategicPlan", 2)
    total += calculateItemMarks("schoolVision", 1)
    total += calculateItemMarks("schoolMission", 1)
    total += calculateItemMarks("organizationalStructure", 1)
    total += calculateItemMarks("operationalBudget", 1)

    // Annual budget and Procurement plan (4 marks)
    total += calculateItemMarks("annualBudgetPlan", 1)
    total += calculateItemMarks("procurementPlan", 1)
    total += calculateItemMarks("businessPlan", 1)
    total += calculateItemMarks("tenderCommittee", 1)

    // Cap at 10 marks maximum
    return Math.min(total, 10)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const currentMarks = calculateMarks()
    if (currentMarks !== prevMarks.current) {
      prevMarks.current = currentMarks
      updateSectionMarks(currentMarks)
    }

    updateFormData(localData)
  }, [localData, updateFormData, updateSectionMarks])

  const handleChange = (field: string, value: string) => {
    setLocalData((prev) => {
      if (prev[field] !== value) {
        return { ...prev, [field]: value }
      }
      return prev
    })
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
                <EvaluationItemWithWeights
                  id="strategicPlan"
                  label="Approved Strategic plan (Signed by the right authority)"
                  availabilityValue={localData.strategicPlanAvailability}
                  qualityValue={localData.strategicPlanQuality}
                  onAvailabilityChange={(value) => handleChange("strategicPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("strategicPlanQuality", value)}
                  marksAllocated={2}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.strategicPlanObservation}
                  onObservationChange={(value) => handleChange("strategicPlanObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="schoolVision"
                  label="School vision"
                  availabilityValue={localData.schoolVisionAvailability}
                  qualityValue={localData.schoolVisionQuality}
                  onAvailabilityChange={(value) => handleChange("schoolVisionAvailability", value)}
                  onQualityChange={(value) => handleChange("schoolVisionQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.schoolVisionObservation}
                  onObservationChange={(value) => handleChange("schoolVisionObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="schoolMission"
                  label="School Mission"
                  availabilityValue={localData.schoolMissionAvailability}
                  qualityValue={localData.schoolMissionQuality}
                  onAvailabilityChange={(value) => handleChange("schoolMissionAvailability", value)}
                  onQualityChange={(value) => handleChange("schoolMissionQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.schoolMissionObservation}
                  onObservationChange={(value) => handleChange("schoolMissionObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="organizationalStructure"
                  label="Organizational structure"
                  availabilityValue={localData.organizationalStructureAvailability}
                  qualityValue={localData.organizationalStructureQuality}
                  onAvailabilityChange={(value) => handleChange("organizationalStructureAvailability", value)}
                  onQualityChange={(value) => handleChange("organizationalStructureQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.organizationalStructureObservation}
                  onObservationChange={(value) => handleChange("organizationalStructureObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="operationalBudget"
                  label="Operational budget"
                  availabilityValue={localData.operationalBudgetAvailability}
                  qualityValue={localData.operationalBudgetQuality}
                  onAvailabilityChange={(value) => handleChange("operationalBudgetAvailability", value)}
                  onQualityChange={(value) => handleChange("operationalBudgetQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.operationalBudgetObservation}
                  onObservationChange={(value) => handleChange("operationalBudgetObservation", value)}
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
                <EvaluationItemWithWeights
                  id="annualBudgetPlan"
                  label="Approved annual and budget plan"
                  availabilityValue={localData.annualBudgetPlanAvailability}
                  qualityValue={localData.annualBudgetPlanQuality}
                  onAvailabilityChange={(value) => handleChange("annualBudgetPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("annualBudgetPlanQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.annualBudgetPlanObservation}
                  onObservationChange={(value) => handleChange("annualBudgetPlanObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="procurementPlan"
                  label="Approved procurement plan"
                  availabilityValue={localData.procurementPlanAvailability}
                  qualityValue={localData.procurementPlanQuality}
                  onAvailabilityChange={(value) => handleChange("procurementPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("procurementPlanQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.procurementPlanObservation}
                  onObservationChange={(value) => handleChange("procurementPlanObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="businessPlan"
                  label="Business Plan for production unit"
                  availabilityValue={localData.businessPlanAvailability}
                  qualityValue={localData.businessPlanQuality}
                  onAvailabilityChange={(value) => handleChange("businessPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("businessPlanQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.businessPlanObservation}
                  onObservationChange={(value) => handleChange("businessPlanObservation", value)}
                />
                <EvaluationItemWithWeights
                  id="tenderCommittee"
                  label="Tender and receiving committee appointed (Valid appointment letter)"
                  availabilityValue={localData.tenderCommitteeAvailability}
                  qualityValue={localData.tenderCommitteeQuality}
                  onAvailabilityChange={(value) => handleChange("tenderCommitteeAvailability", value)}
                  onQualityChange={(value) => handleChange("tenderCommitteeQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.tenderCommitteeObservation}
                  onObservationChange={(value) => handleChange("tenderCommitteeObservation", value)}
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
                value={localData.strength}
                onChange={(e) => handleChange("strength", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weakness" className="text-sm font-medium">
                Weakness:
              </Label>
              <Textarea
                id="weakness"
                value={localData.weakness}
                onChange={(e) => handleChange("weakness", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="improvement" className="text-sm font-medium">
                Area of improvement:
              </Label>
              <Textarea
                id="improvement"
                value={localData.improvement}
                onChange={(e) => handleChange("improvement", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">Total marks for Strategic Planning:</span>
          <span className="text-xl font-bold text-blue-800">{calculateMarks().toFixed(1)} / 10</span>
        </div>
      </div>
    </div>
  )
}

interface EvaluationItemWithWeightsProps {
  id: string
  label: string
  availabilityValue: string
  qualityValue: string
  onAvailabilityChange: (value: string) => void
  onQualityChange: (value: string) => void
  marksAllocated: number
  qualityWeight: string
  availabilityWeight: string
  isAvailabilityNA?: boolean
  isQualityNA?: boolean
  observation?: string
  onObservationChange?: (value: string) => void
}

function EvaluationItemWithWeights({
  id,
  label,
  availabilityValue,
  qualityValue,
  onAvailabilityChange,
  onQualityChange,
  marksAllocated,
  qualityWeight,
  availabilityWeight,
  isAvailabilityNA = false,
  isQualityNA = false,
  observation = "",
  onObservationChange = () => {},
}: EvaluationItemWithWeightsProps) {
  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    // If quality is N/A, only consider availability
    if (qualityValue === "na") {
      return availabilityValue === "yes" ? marksAllocated : 0
    }

    // If availability is N/A, only consider quality
    if (availabilityValue === "na") {
      return qualityValue === "yes" ? marksAllocated : 0
    }

    // Calculate partial marks based on availability (40%) and quality (60%)
    let marks = 0
    if (availabilityValue === "yes") {
      marks += marksAllocated * 0.4
    }
    if (qualityValue === "yes") {
      marks += marksAllocated * 0.6
    }

    return marks
  }

  return (
    <div className="grid grid-cols-1 gap-2 p-2 rounded-md hover:bg-blue-50">
      <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 items-start">
        <div className="text-sm font-medium">{label}</div>

        <div className="flex flex-col">
          <div className="text-center text-xs text-gray-500 mb-1">
            <div>Availability ({availabilityWeight})</div>
          </div>
          {isAvailabilityNA ? (
            <div className="flex justify-center">
              <span className="text-sm font-medium text-gray-600">N/A</span>
            </div>
          ) : (
            <RadioGroup
              value={availabilityValue}
              onValueChange={onAvailabilityChange}
              className="flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="yes" id={`${id}-availability-yes`} />
                <Label htmlFor={`${id}-availability-yes`} className="text-sm">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="no" id={`${id}-availability-no`} />
                <Label htmlFor={`${id}-availability-no`} className="text-sm">
                  No
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="flex flex-col">
          <div className="text-center text-xs text-gray-500 mb-1">
            <div>Quality ({qualityWeight})</div>
          </div>
          {isQualityNA ? (
            <div className="flex justify-center">
              <span className="text-sm font-medium text-gray-600">N/A</span>
            </div>
          ) : (
            <RadioGroup value={qualityValue} onValueChange={onQualityChange} className="flex justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="yes" id={`${id}-quality-yes`} />
                <Label htmlFor={`${id}-quality-yes`} className="text-sm">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="no" id={`${id}-quality-no`} />
                <Label htmlFor={`${id}-quality-no`} className="text-sm">
                  No
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="text-center text-sm font-medium">{marksAllocated}</div>

        <div className="text-center text-sm font-medium">{calculateMarksObtained().toFixed(1)}</div>

        <div>
          <Textarea
            value={observation}
            onChange={(e) => onObservationChange(e.target.value)}
            placeholder="Add observation..."
            className="min-h-[60px] text-sm"
          />
        </div>
      </div>
    </div>
  )
}

