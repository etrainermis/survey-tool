"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EvaluationItemWithWeights from "./evaluation-item"

interface StakeholdersEngagementProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
}

export default function StakeholdersEngagement({
  formData,
  updateFormData,
  updateSectionMarks,
}: StakeholdersEngagementProps) {
  const [localData, setLocalData] = useState({
    // 4.1 Partnership Development
    mousAvailability: "",
    mousQuality: "na", // N/A
    employersFeedbackAvailability: "",
    employersFeedbackQuality: "",
    trainingAdjustmentsAvailability: "",
    trainingAdjustmentsQuality: "",

    // 4.2 Community and Alumni engagement
    stakeholderMeetingsAvailability: "",
    stakeholderMeetingsQuality: "",
    planningSessionsAvailability: "",
    planningSessionsQuality: "",
    graduateFilingAvailability: "",
    graduateFilingQuality: "",
    alumniRecordsAvailability: "",
    alumniRecordsQuality: "",

    // 4.3 Adaptability to Trends
    industryEngagementAvailability: "",
    industryEngagementQuality: "",
    trainingRelevanceAvailability: "",
    trainingRelevanceQuality: "",
    staffTrainingAvailability: "",
    staffTrainingQuality: "",

    // 4.4 Relationship with Subordinates
    subordinateFeedbackAvailability: "",
    subordinateFeedbackQuality: "",
    conflictResolutionAvailability: "",
    conflictResolutionQuality: "",

    // Add observation fields for each item
    mousObservation: "",
    employersFeedbackObservation: "",
    trainingAdjustmentsObservation: "",
    stakeholderMeetingsObservation: "",
    planningSessionsObservation: "",
    graduateFilingObservation: "",
    alumniRecordsObservation: "",
    industryEngagementObservation: "",
    trainingRelevanceObservation: "",
    staffTrainingObservation: "",
    subordinateFeedbackObservation: "",
    conflictResolutionObservation: "",

    // Overview
    strength: "",
    weakness: "",
    improvement: "",
    totalMarks : 0,
    weight : 10,
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

    // 4.1 Partnership Development (3 marks)
    total += calculateItemMarks("mous", 1)
    total += calculateItemMarks("employersFeedback", 1)
    total += calculateItemMarks("trainingAdjustments", 1)

    // 4.2 Community and Alumni engagement (4 marks)
    total += calculateItemMarks("stakeholderMeetings", 1)
    total += calculateItemMarks("planningSessions", 1)
    total += calculateItemMarks("graduateFiling", 1)
    total += calculateItemMarks("alumniRecords", 1)

    // 4.3 Adaptability to Trends (2 marks)
    total += calculateItemMarks("industryEngagement", 1)
    total += calculateItemMarks("trainingRelevance", 0.5)
    total += calculateItemMarks("staffTraining", 0.5)

    // 4.4 Relationship with Subordinates (1 mark)
    total += calculateItemMarks("subordinateFeedback", 0.5)
    total += calculateItemMarks("conflictResolution", 0.5)

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
      <Tabs defaultValue="partnership" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="partnership">4.1 Partnership</TabsTrigger>
          <TabsTrigger value="community">4.2 Community</TabsTrigger>
          <TabsTrigger value="adaptability">4.3 Adaptability</TabsTrigger>
          <TabsTrigger value="relationship">4.4 Relationship</TabsTrigger>
        </TabsList>

        <TabsContent value="partnership">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.1 Partnership Development (3 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="mous"
                  label="At Least 3 MoUs With Relevant Private Companies Per Each Trade"
                  availabilityValue={localData.mousAvailability}
                  qualityValue={localData.mousQuality}
                  onAvailabilityChange={(value) => handleChange("mousAvailability", value)}
                  onQualityChange={(value) => handleChange("mousQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.mousObservation}
                  onObservationChange={(value) => handleChange("mousObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="employersFeedback"
                  label="Employers feedback/ satisfaction survey results"
                  availabilityValue={localData.employersFeedbackAvailability}
                  qualityValue={localData.employersFeedbackQuality}
                  onAvailabilityChange={(value) => handleChange("employersFeedbackAvailability", value)}
                  onQualityChange={(value) => handleChange("employersFeedbackQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.employersFeedbackObservation}
                  onObservationChange={(value) => handleChange("employersFeedbackObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="trainingAdjustments"
                  label="Training adjustments evidence based on feedback"
                  availabilityValue={localData.trainingAdjustmentsAvailability}
                  qualityValue={localData.trainingAdjustmentsQuality}
                  onAvailabilityChange={(value) => handleChange("trainingAdjustmentsAvailability", value)}
                  onQualityChange={(value) => handleChange("trainingAdjustmentsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.trainingAdjustmentsObservation}
                  onObservationChange={(value) => handleChange("trainingAdjustmentsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                4.2 Community and Alumni engagement (4 marks)
              </h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="stakeholderMeetings"
                  label="Records of meetings and planning sessions with stakeholders"
                  availabilityValue={localData.stakeholderMeetingsAvailability}
                  qualityValue={localData.stakeholderMeetingsQuality}
                  onAvailabilityChange={(value) => handleChange("stakeholderMeetingsAvailability", value)}
                  onQualityChange={(value) => handleChange("stakeholderMeetingsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.stakeholderMeetingsObservation}
                  onObservationChange={(value) => handleChange("stakeholderMeetingsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="planningSessions"
                  label="Minutes of meeting and records of planning sessions Evidence of partnerships with local organizations"
                  availabilityValue={localData.planningSessionsAvailability}
                  qualityValue={localData.planningSessionsQuality}
                  onAvailabilityChange={(value) => handleChange("planningSessionsAvailability", value)}
                  onQualityChange={(value) => handleChange("planningSessionsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.planningSessionsObservation}
                  onObservationChange={(value) => handleChange("planningSessionsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="graduateFiling"
                  label="Graduate Filing System for atleast previous 4 years"
                  availabilityValue={localData.graduateFilingAvailability}
                  qualityValue={localData.graduateFilingQuality}
                  onAvailabilityChange={(value) => handleChange("graduateFilingAvailability", value)}
                  onQualityChange={(value) => handleChange("graduateFilingQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.graduateFilingObservation}
                  onObservationChange={(value) => handleChange("graduateFilingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="alumniRecords"
                  label="Records of alumni meetings, events, and or other communications"
                  availabilityValue={localData.alumniRecordsAvailability}
                  qualityValue={localData.alumniRecordsQuality}
                  onAvailabilityChange={(value) => handleChange("alumniRecordsAvailability", value)}
                  onQualityChange={(value) => handleChange("alumniRecordsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.alumniRecordsObservation}
                  onObservationChange={(value) => handleChange("alumniRecordsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adaptability">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.3 Adaptability to Trends (2 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="industryEngagement"
                  label="Industry engagement in training (contract, MoUs...)"
                  availabilityValue={localData.industryEngagementAvailability}
                  qualityValue={localData.industryEngagementQuality}
                  onAvailabilityChange={(value) => handleChange("industryEngagementAvailability", value)}
                  onQualityChange={(value) => handleChange("industryEngagementQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.industryEngagementObservation}
                  onObservationChange={(value) => handleChange("industryEngagementObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="trainingRelevance"
                  label="Feedback on training relevance"
                  availabilityValue={localData.trainingRelevanceAvailability}
                  qualityValue={localData.trainingRelevanceQuality}
                  onAvailabilityChange={(value) => handleChange("trainingRelevanceAvailability", value)}
                  onQualityChange={(value) => handleChange("trainingRelevanceQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.trainingRelevanceObservation}
                  onObservationChange={(value) => handleChange("trainingRelevanceObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="staffTraining"
                  label="Staff training sessions held"
                  availabilityValue={localData.staffTrainingAvailability}
                  qualityValue={localData.staffTrainingQuality}
                  onAvailabilityChange={(value) => handleChange("staffTrainingAvailability", value)}
                  onQualityChange={(value) => handleChange("staffTrainingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.staffTrainingObservation}
                  onObservationChange={(value) => handleChange("staffTrainingObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationship">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.4 Relationship with Subordinates (1 mark)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="subordinateFeedback"
                  label="Feedback from subordinates"
                  availabilityValue={localData.subordinateFeedbackAvailability}
                  qualityValue={localData.subordinateFeedbackQuality}
                  onAvailabilityChange={(value) => handleChange("subordinateFeedbackAvailability", value)}
                  onQualityChange={(value) => handleChange("subordinateFeedbackQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.subordinateFeedbackObservation}
                  onObservationChange={(value) => handleChange("subordinateFeedbackObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="conflictResolution"
                  label="Records of conflict resolution"
                  availabilityValue={localData.conflictResolutionAvailability}
                  qualityValue={localData.conflictResolutionQuality}
                  onAvailabilityChange={(value) => handleChange("conflictResolutionAvailability", value)}
                  onQualityChange={(value) => handleChange("conflictResolutionQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.conflictResolutionObservation}
                  onObservationChange={(value) => handleChange("conflictResolutionObservation", value)}
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
          <span className="font-medium text-blue-800">Total marks for Stakeholders' Engagement:</span>
          <span className="text-xl font-bold text-blue-800">{calculateMarks().toFixed(1)} / 10</span>
        </div>
      </div>
    </div>
  )
}

