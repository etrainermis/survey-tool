"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContinuousImprovementProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
}

export default function ContinuousImprovement({
  formData,
  updateFormData,
  updateSectionMarks,
}: ContinuousImprovementProps) {
  const [localData, setLocalData] = useState({
    // 5.1 Professionalism
    cpdPlanAvailability: "",
    cpdPlanQuality: "na", // N/A
    cpdReportsAvailability: "",
    cpdReportsQuality: "na", // N/A
    ethicalRecordAvailability: "",
    ethicalRecordQuality: "",
    roleModelingAvailability: "",
    roleModelingQuality: "",
    feedbackMechanismsAvailability: "",
    feedbackMechanismsQuality: "",
    actionPlansAvailability: "",
    actionPlansQuality: "",
    implementedImprovementsAvailability: "",
    implementedImprovementsQuality: "",

    // 5.2 Performance Metrics
    kpisAvailability: "",
    kpisQuality: "",
    dataDecisionsAvailability: "",
    dataDecisionsQuality: "",
    improvementRecordsAvailability: "",
    improvementRecordsQuality: "",

    // Add observation fields for each item
    cpdPlanObservation: "",
    cpdReportsObservation: "",
    ethicalRecordObservation: "",
    roleModelingObservation: "",
    feedbackMechanismsObservation: "",
    actionPlansObservation: "",
    implementedImprovementsObservation: "",
    kpisObservation: "",
    dataDecisionsObservation: "",
    improvementRecordsObservation: "",

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

      // If quality is N/A, only consider availability (100% of marks)
      if (qualityValue === "na") {
        return availabilityValue === "yes" ? marksAllocated : 0
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

    // 5.1 Professionalism (7 marks)
    total += calculateItemMarks("cpdPlan", 1)
    total += calculateItemMarks("cpdReports", 1)
    total += calculateItemMarks("ethicalRecord", 1)
    total += calculateItemMarks("roleModeling", 1)
    total += calculateItemMarks("feedbackMechanisms", 1)
    total += calculateItemMarks("actionPlans", 1)
    total += calculateItemMarks("implementedImprovements", 1)

    // 5.2 Performance Metrics (3 marks)
    total += calculateItemMarks("kpis", 1)
    total += calculateItemMarks("dataDecisions", 1)
    total += calculateItemMarks("improvementRecords", 1)

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
      <Tabs defaultValue="professionalism" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="professionalism">5.1 Professionalism</TabsTrigger>
          <TabsTrigger value="metrics">5.2 Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="professionalism">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">5.1 Professionalism (7 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="cpdPlan"
                  label="CPD plan"
                  availabilityValue={localData.cpdPlanAvailability}
                  qualityValue={localData.cpdPlanQuality}
                  onAvailabilityChange={(value) => handleChange("cpdPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("cpdPlanQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.cpdPlanObservation}
                  onObservationChange={(value) => handleChange("cpdPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="cpdReports"
                  label="CPD implementation reports"
                  availabilityValue={localData.cpdReportsAvailability}
                  qualityValue={localData.cpdReportsQuality}
                  onAvailabilityChange={(value) => handleChange("cpdReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("cpdReportsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.cpdReportsObservation}
                  onObservationChange={(value) => handleChange("cpdReportsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="ethicalRecord"
                  label="Free ethical record"
                  availabilityValue={localData.ethicalRecordAvailability}
                  qualityValue={localData.ethicalRecordQuality}
                  onAvailabilityChange={(value) => handleChange("ethicalRecordAvailability", value)}
                  onQualityChange={(value) => handleChange("ethicalRecordQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.ethicalRecordObservation}
                  onObservationChange={(value) => handleChange("ethicalRecordObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="roleModeling"
                  label="Positive role modeling in professional settings"
                  availabilityValue={localData.roleModelingAvailability}
                  qualityValue={localData.roleModelingQuality}
                  onAvailabilityChange={(value) => handleChange("roleModelingAvailability", value)}
                  onQualityChange={(value) => handleChange("roleModelingQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.roleModelingObservation}
                  onObservationChange={(value) => handleChange("roleModelingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="feedbackMechanisms"
                  label="Staff feedback mechanisms"
                  availabilityValue={localData.feedbackMechanismsAvailability}
                  qualityValue={localData.feedbackMechanismsQuality}
                  onAvailabilityChange={(value) => handleChange("feedbackMechanismsAvailability", value)}
                  onQualityChange={(value) => handleChange("feedbackMechanismsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.feedbackMechanismsObservation}
                  onObservationChange={(value) => handleChange("feedbackMechanismsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="actionPlans"
                  label="Action plans based on feedback"
                  availabilityValue={localData.actionPlansAvailability}
                  qualityValue={localData.actionPlansQuality}
                  onAvailabilityChange={(value) => handleChange("actionPlansAvailability", value)}
                  onQualityChange={(value) => handleChange("actionPlansQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.actionPlansObservation}
                  onObservationChange={(value) => handleChange("actionPlansObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="implementedImprovements"
                  label="Implemented improvements"
                  availabilityValue={localData.implementedImprovementsAvailability}
                  qualityValue={localData.implementedImprovementsQuality}
                  onAvailabilityChange={(value) => handleChange("implementedImprovementsAvailability", value)}
                  onQualityChange={(value) => handleChange("implementedImprovementsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.implementedImprovementsObservation}
                  onObservationChange={(value) => handleChange("implementedImprovementsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">5.2 Performance Metrics (3 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="kpis"
                  label="Documented KPIs or Performance review"
                  availabilityValue={localData.kpisAvailability}
                  qualityValue={localData.kpisQuality}
                  onAvailabilityChange={(value) => handleChange("kpisAvailability", value)}
                  onQualityChange={(value) => handleChange("kpisQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.kpisObservation}
                  onObservationChange={(value) => handleChange("kpisObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="dataDecisions"
                  label="Evidence of data-driven decisions"
                  availabilityValue={localData.dataDecisionsAvailability}
                  qualityValue={localData.dataDecisionsQuality}
                  onAvailabilityChange={(value) => handleChange("dataDecisionsAvailability", value)}
                  onQualityChange={(value) => handleChange("dataDecisionsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.dataDecisionsObservation}
                  onObservationChange={(value) => handleChange("dataDecisionsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="improvementRecords"
                  label="Records of implemented improvements"
                  availabilityValue={localData.improvementRecordsAvailability}
                  qualityValue={localData.improvementRecordsQuality}
                  onAvailabilityChange={(value) => handleChange("improvementRecordsAvailability", value)}
                  onQualityChange={(value) => handleChange("improvementRecordsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.improvementRecordsObservation}
                  onObservationChange={(value) => handleChange("improvementRecordsObservation", value)}
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
          <span className="font-medium text-blue-800">Total marks for Continuous Improvement:</span>
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
  isQualityNA = false,
  observation = "",
  onObservationChange = () => {},
}: EvaluationItemWithWeightsProps) {
  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    // If quality is N/A, only consider availability (100% of marks)
    if (qualityValue === "na") {
      return availabilityValue === "yes" ? marksAllocated : 0
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

  // Add useEffect to ensure quality value is set to "na" when isQualityNA is true
  useEffect(() => {
    if (isQualityNA && qualityValue !== "na") {
      onQualityChange("na")
    }
  }, [isQualityNA, qualityValue, onQualityChange])

  return (
    <div className="grid grid-cols-1 gap-2 p-2 rounded-md hover:bg-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 items-start">
        <div className="text-sm font-medium">{label}</div>

        <div className="flex flex-col">
          <div className="text-center text-xs text-gray-500 mb-1">
            <div>Availability ({availabilityWeight})</div>
          </div>
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



