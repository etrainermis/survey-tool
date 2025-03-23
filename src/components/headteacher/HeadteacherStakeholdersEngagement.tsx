"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { StakeholdersEngagementData } from "./evaluation/EvaluationType"

interface HeadteacherStakeholdersEngagementProps {
  data: any
  onDataChange: (data: any) => void
}

export default function HeadteacherStakeholdersEngagement({
  data,
  onDataChange,
}: HeadteacherStakeholdersEngagementProps) {
  // Initialize state with data from parent or default values
  const [stakeholdersEngagementData, setStakeholdersEngagementData] = useState<StakeholdersEngagementData>({
    partnershipDevelopment: {
      mous: { availability: 0, quality: 0, observation: "" },
      employersFeedback: { availability: 0, quality: 0, observation: "" },
      trainingAdjustments: { availability: 0, quality: 0, observation: "" },
    },
    communityAlumniEngagement: {
      meetingRecords: { availability: 0, quality: 0, observation: "" },
      minutesOfMeeting: { availability: 0, quality: 0, observation: "" },
      graduateFilingSystem: { availability: 0, quality: 0, observation: "" },
      alumniRecords: { availability: 0, quality: 0, observation: "" },
    },
    adaptabilityToTrends: {
      industryEngagement: { availability: 0, quality: 0, observation: "" },
      trainingRelevanceFeedback: { availability: 0, quality: 0, observation: "" },
      staffTrainingSessions: { availability: 0, quality: 0, observation: "" },
    },
    relationshipWithSubordinates: {
      subordinatesFeedback: { availability: 0, quality: 0, observation: "" },
      conflictResolutionRecords: { availability: 0, quality: 0, observation: "" },
    },
    overview: {
      strengths: "",
      weaknesses: "",
      areasOfImprovement: "",
    },
    totalMarks: 0,
  })

  // Load data from parent component if available
  useEffect(() => {
    if (data?.stakeholdersEngagement) {
      // Ensure all required properties exist by merging with default state
      const mergedData = {
        partnershipDevelopment: {
          mous: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.partnershipDevelopment?.mous,
          },
          employersFeedback: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.partnershipDevelopment?.employersFeedback,
          },
          trainingAdjustments: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.partnershipDevelopment?.trainingAdjustments,
          },
        },
        communityAlumniEngagement: {
          meetingRecords: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.communityAlumniEngagement?.meetingRecords,
          },
          minutesOfMeeting: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.communityAlumniEngagement?.minutesOfMeeting,
          },
          graduateFilingSystem: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.communityAlumniEngagement?.graduateFilingSystem,
          },
          alumniRecords: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.communityAlumniEngagement?.alumniRecords,
          },
        },
        adaptabilityToTrends: {
          industryEngagement: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.adaptabilityToTrends?.industryEngagement,
          },
          trainingRelevanceFeedback: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.adaptabilityToTrends?.trainingRelevanceFeedback,
          },
          staffTrainingSessions: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.adaptabilityToTrends?.staffTrainingSessions,
          },
        },
        relationshipWithSubordinates: {
          subordinatesFeedback: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.relationshipWithSubordinates?.subordinatesFeedback,
          },
          conflictResolutionRecords: {
            availability: 0,
            quality: 0,
            observation: "",
            ...data.stakeholdersEngagement.relationshipWithSubordinates?.conflictResolutionRecords,
          },
        },
        overview: {
          strengths: data.stakeholdersEngagement.overview?.strengths || "",
          weaknesses: data.stakeholdersEngagement.overview?.weaknesses || "",
          areasOfImprovement: data.stakeholdersEngagement.overview?.areasOfImprovement || "",
        },
        totalMarks: data.stakeholdersEngagement.totalMarks || 0,
      }

      setStakeholdersEngagementData(mergedData)
    }
  }, [data])

  // Calculate total marks whenever data changes
  useEffect(() => {
    calculateTotalMarks()
  }, [stakeholdersEngagementData])

  // Update parent component with changes
  const updateParent = (updatedData: StakeholdersEngagementData) => {
    onDataChange({
      stakeholdersEngagement: updatedData,
    })
  }

  // Handle changes to evaluation items
  const handleEvaluationChange = (
    section: keyof Omit<StakeholdersEngagementData, "overview" | "totalMarks">,
    field: string,
    type: "availability" | "quality",
    value: number,
  ) => {
    setStakeholdersEngagementData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: {
            ...prev[section][field],
            [type]: value,
          },
        },
      }
      return updated
    })
  }

  // Handle changes to observations
  const handleObservationChange = (
    section: keyof Omit<StakeholdersEngagementData, "overview" | "totalMarks">,
    field: string,
    value: string,
  ) => {
    setStakeholdersEngagementData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: {
            ...prev[section][field],
            observation: value,
          },
        },
      }
      return updated
    })
  }

  // Handle changes to overview fields
  const handleOverviewChange = (field: keyof StakeholdersEngagementData["overview"], value: string) => {
    setStakeholdersEngagementData((prev) => {
      const updated = {
        ...prev,
        overview: {
          ...prev.overview,
          [field]: value,
        },
      }
      return updated
    })
  }

  // Calculate total marks for all sections
  const calculateTotalMarks = () => {
    // Define marks allocation for each item
    const marksAllocation = {
      partnershipDevelopment: {
        mous: 1,
        employersFeedback: 1,
        trainingAdjustments: 1,
      },
      communityAlumniEngagement: {
        meetingRecords: 1,
        minutesOfMeeting: 1,
        graduateFilingSystem: 1,
        alumniRecords: 1,
      },
      adaptabilityToTrends: {
        industryEngagement: 1,
        trainingRelevanceFeedback: 0.5,
        staffTrainingSessions: 0.5,
      },
      relationshipWithSubordinates: {
        subordinatesFeedback: 0.5,
        conflictResolutionRecords: 0.5,
      },
    }

    let totalMarks = 0

    // Calculate marks for Partnership Development section
    Object.entries(marksAllocation.partnershipDevelopment).forEach(([key, marks]) => {
      const item =
        stakeholdersEngagementData.partnershipDevelopment[
          key as keyof typeof stakeholdersEngagementData.partnershipDevelopment
        ]
      if (item) {
        if (key === "mous") {
          // Quality is N/A
          if (item.availability === 1) {
            totalMarks += marks
          }
        } else {
          // Availability is N/A for employersFeedback and trainingAdjustments
          if (item.quality === 1) {
            totalMarks += marks
          }
        }
      }
    })

    // Calculate marks for Community and Alumni Engagement section
    Object.entries(marksAllocation.communityAlumniEngagement).forEach(([key, marks]) => {
      const item =
        stakeholdersEngagementData.communityAlumniEngagement[
          key as keyof typeof stakeholdersEngagementData.communityAlumniEngagement
        ]
      if (item && item.quality === 1) {
        // Quality is evaluated for all items in this section
        totalMarks += marks
      }
    })

    // Calculate marks for Adaptability to Trends section
    Object.entries(marksAllocation.adaptabilityToTrends).forEach(([key, marks]) => {
      const item =
        stakeholdersEngagementData.adaptabilityToTrends[
          key as keyof typeof stakeholdersEngagementData.adaptabilityToTrends
        ]
      if (item) {
        if (key === "industryEngagement") {
          // Quality is evaluated
          if (item.quality === 1) {
            totalMarks += marks
          }
        } else {
          // Availability is N/A for trainingRelevanceFeedback and staffTrainingSessions
          if (item.quality === 1) {
            totalMarks += marks
          }
        }
      }
    })

    // Calculate marks for Relationship with Subordinates section
    Object.entries(marksAllocation.relationshipWithSubordinates).forEach(([key, marks]) => {
      const item =
        stakeholdersEngagementData.relationshipWithSubordinates[
          key as keyof typeof stakeholdersEngagementData.relationshipWithSubordinates
        ]
      if (item && item.quality === 1) {
        // Availability is N/A for all items in this section
        totalMarks += marks
      }
    })

    // Update state without calling updateParent inside setState
    setStakeholdersEngagementData((prev) => ({
      ...prev,
      totalMarks,
    }))
  }

  // Add a separate useEffect to update the parent when totalMarks changes
  useEffect(() => {
    updateParent(stakeholdersEngagementData)
  }, [stakeholdersEngagementData])

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">4. Stakeholders' Engagement (10 Marks)</h2>

          <Tabs defaultValue="partnershipDevelopment" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="partnershipDevelopment">4.1 Partnership Development</TabsTrigger>
              <TabsTrigger value="communityAlumniEngagement">4.2 Community & Alumni</TabsTrigger>
              <TabsTrigger value="adaptabilityToTrends">4.3 Adaptability to Trends</TabsTrigger>
              <TabsTrigger value="relationshipWithSubordinates">4.4 Relationship with Subordinates</TabsTrigger>
            </TabsList>

            {/* 4.1 Partnership Development */}
            <TabsContent value="partnershipDevelopment" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="mous"
                label="At Least 3 MoUs With Relevant Private Companies Per Each Trade"
                availabilityValue={stakeholdersEngagementData.partnershipDevelopment.mous.availability}
                qualityValue={stakeholdersEngagementData.partnershipDevelopment.mous.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("partnershipDevelopment", "mous", "availability", value)
                }
                onQualityChange={(value) => handleEvaluationChange("partnershipDevelopment", "mous", "quality", value)}
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.partnershipDevelopment.mous.observation}
                onObservationChange={(value) => handleObservationChange("partnershipDevelopment", "mous", value)}
              />

              <EvaluationItem
                id="employersFeedback"
                label="Employers feedback/ satisfaction survey results"
                availabilityValue={stakeholdersEngagementData.partnershipDevelopment.employersFeedback.availability}
                qualityValue={stakeholdersEngagementData.partnershipDevelopment.employersFeedback.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("partnershipDevelopment", "employersFeedback", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("partnershipDevelopment", "employersFeedback", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={stakeholdersEngagementData.partnershipDevelopment.employersFeedback.observation}
                onObservationChange={(value) =>
                  handleObservationChange("partnershipDevelopment", "employersFeedback", value)
                }
              />

              <EvaluationItem
                id="trainingAdjustments"
                label="Training adjustments evidence based on feedback"
                availabilityValue={stakeholdersEngagementData.partnershipDevelopment.trainingAdjustments.availability}
                qualityValue={stakeholdersEngagementData.partnershipDevelopment.trainingAdjustments.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("partnershipDevelopment", "trainingAdjustments", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("partnershipDevelopment", "trainingAdjustments", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={stakeholdersEngagementData.partnershipDevelopment.trainingAdjustments.observation}
                onObservationChange={(value) =>
                  handleObservationChange("partnershipDevelopment", "trainingAdjustments", value)
                }
              />
            </TabsContent>

            {/* 4.2 Community and Alumni Engagement */}
            <TabsContent value="communityAlumniEngagement" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="meetingRecords"
                label="Records of meetings and planning sessions with stakeholders"
                availabilityValue={stakeholdersEngagementData.communityAlumniEngagement.meetingRecords.availability}
                qualityValue={stakeholdersEngagementData.communityAlumniEngagement.meetingRecords.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "meetingRecords", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "meetingRecords", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.communityAlumniEngagement.meetingRecords.observation}
                onObservationChange={(value) =>
                  handleObservationChange("communityAlumniEngagement", "meetingRecords", value)
                }
              />

              <EvaluationItem
                id="minutesOfMeeting"
                label="Minutes of meeting and records of planning sessions Evidence of partnerships with local organizations"
                availabilityValue={stakeholdersEngagementData.communityAlumniEngagement.minutesOfMeeting.availability}
                qualityValue={stakeholdersEngagementData.communityAlumniEngagement.minutesOfMeeting.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "minutesOfMeeting", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "minutesOfMeeting", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.communityAlumniEngagement.minutesOfMeeting.observation}
                onObservationChange={(value) =>
                  handleObservationChange("communityAlumniEngagement", "minutesOfMeeting", value)
                }
              />

              <EvaluationItem
                id="graduateFilingSystem"
                label="Graduate Filing System for at least previous 4 years"
                availabilityValue={
                  stakeholdersEngagementData.communityAlumniEngagement.graduateFilingSystem.availability
                }
                qualityValue={stakeholdersEngagementData.communityAlumniEngagement.graduateFilingSystem.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "graduateFilingSystem", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "graduateFilingSystem", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.communityAlumniEngagement.graduateFilingSystem.observation}
                onObservationChange={(value) =>
                  handleObservationChange("communityAlumniEngagement", "graduateFilingSystem", value)
                }
              />

              <EvaluationItem
                id="alumniRecords"
                label="Records of alumni meetings, events, and or other communications"
                availabilityValue={stakeholdersEngagementData.communityAlumniEngagement.alumniRecords.availability}
                qualityValue={stakeholdersEngagementData.communityAlumniEngagement.alumniRecords.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "alumniRecords", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("communityAlumniEngagement", "alumniRecords", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.communityAlumniEngagement.alumniRecords.observation}
                onObservationChange={(value) =>
                  handleObservationChange("communityAlumniEngagement", "alumniRecords", value)
                }
              />
            </TabsContent>

            {/* 4.3 Adaptability to Trends */}
            <TabsContent value="adaptabilityToTrends" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="industryEngagement"
                label="Industry engagement in training (contract, MoUs…)"
                availabilityValue={stakeholdersEngagementData.adaptabilityToTrends.industryEngagement.availability}
                qualityValue={stakeholdersEngagementData.adaptabilityToTrends.industryEngagement.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "industryEngagement", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "industryEngagement", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={stakeholdersEngagementData.adaptabilityToTrends.industryEngagement.observation}
                onObservationChange={(value) =>
                  handleObservationChange("adaptabilityToTrends", "industryEngagement", value)
                }
              />

              <EvaluationItem
                id="trainingRelevanceFeedback"
                label="Feedback on training relevance"
                availabilityValue={
                  stakeholdersEngagementData.adaptabilityToTrends.trainingRelevanceFeedback.availability
                }
                qualityValue={stakeholdersEngagementData.adaptabilityToTrends.trainingRelevanceFeedback.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "trainingRelevanceFeedback", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "trainingRelevanceFeedback", "quality", value)
                }
                marksAllocated={0.5}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={stakeholdersEngagementData.adaptabilityToTrends.trainingRelevanceFeedback.observation}
                onObservationChange={(value) =>
                  handleObservationChange("adaptabilityToTrends", "trainingRelevanceFeedback", value)
                }
              />

              <EvaluationItem
                id="staffTrainingSessions"
                label="Staff training sessions held"
                availabilityValue={stakeholdersEngagementData.adaptabilityToTrends.staffTrainingSessions.availability}
                qualityValue={stakeholdersEngagementData.adaptabilityToTrends.staffTrainingSessions.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "staffTrainingSessions", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("adaptabilityToTrends", "staffTrainingSessions", "quality", value)
                }
                marksAllocated={0.5}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={stakeholdersEngagementData.adaptabilityToTrends.staffTrainingSessions.observation}
                onObservationChange={(value) =>
                  handleObservationChange("adaptabilityToTrends", "staffTrainingSessions", value)
                }
              />
            </TabsContent>

            {/* 4.4 Relationship with Subordinates */}
            <TabsContent value="relationshipWithSubordinates" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="subordinatesFeedback"
                label="Feedback from subordinates"
                availabilityValue={
                  stakeholdersEngagementData.relationshipWithSubordinates.subordinatesFeedback.availability
                }
                qualityValue={stakeholdersEngagementData.relationshipWithSubordinates.subordinatesFeedback.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("relationshipWithSubordinates", "subordinatesFeedback", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("relationshipWithSubordinates", "subordinatesFeedback", "quality", value)
                }
                marksAllocated={0.5}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={stakeholdersEngagementData.relationshipWithSubordinates.subordinatesFeedback.observation}
                onObservationChange={(value) =>
                  handleObservationChange("relationshipWithSubordinates", "subordinatesFeedback", value)
                }
              />

              <EvaluationItem
                id="conflictResolutionRecords"
                label="Records of conflict resolution"
                availabilityValue={
                  stakeholdersEngagementData.relationshipWithSubordinates.conflictResolutionRecords.availability
                }
                qualityValue={stakeholdersEngagementData.relationshipWithSubordinates.conflictResolutionRecords.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange(
                    "relationshipWithSubordinates",
                    "conflictResolutionRecords",
                    "availability",
                    value,
                  )
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("relationshipWithSubordinates", "conflictResolutionRecords", "quality", value)
                }
                marksAllocated={0.5}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={
                  stakeholdersEngagementData.relationshipWithSubordinates.conflictResolutionRecords.observation
                }
                onObservationChange={(value) =>
                  handleObservationChange("relationshipWithSubordinates", "conflictResolutionRecords", value)
                }
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Overview Section */}
      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">Overview of the findings</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Strengths:</h4>
              <Textarea
                value={stakeholdersEngagementData.overview.strengths}
                onChange={(e) => handleOverviewChange("strengths", e.target.value)}
                placeholder="Enter strengths..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Weaknesses:</h4>
              <Textarea
                value={stakeholdersEngagementData.overview.weaknesses}
                onChange={(e) => handleOverviewChange("weaknesses", e.target.value)}
                placeholder="Enter weaknesses..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Areas of improvement:</h4>
              <Textarea
                value={stakeholdersEngagementData.overview.areasOfImprovement}
                onChange={(e) => handleOverviewChange("areasOfImprovement", e.target.value)}
                placeholder="Enter areas of improvement..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <p className="text-sm text-blue-600">Total Marks for Stakeholders' Engagement</p>
            <p className="text-xl font-bold text-blue-800">{stakeholdersEngagementData.totalMarks.toFixed(1)} / 10</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

