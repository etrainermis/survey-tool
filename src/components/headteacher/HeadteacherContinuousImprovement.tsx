"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { ContinuousImprovementData } from "./evaluation/EvaluationType"

interface HeadteacherContinuousImprovementProps {
  data: any
  onDataChange: (data: any) => void
}

export default function HeadteacherContinuousImprovement({
  data,
  onDataChange,
}: HeadteacherContinuousImprovementProps) {
  // Initialize state with data from parent or default values
  const [continuousImprovementData, setContinuousImprovementData] = useState<ContinuousImprovementData>({
    professionalism: {
      cpdPlan: { availability: 0, quality: 0, observation: "" },
      cpdImplementationReports: { availability: 0, quality: 0, observation: "" },
      freeEthicalRecord: { availability: 0, quality: 0, observation: "" },
      positiveRoleModeling: { availability: 0, quality: 0, observation: "" },
      staffFeedbackMechanisms: { availability: 0, quality: 0, observation: "" },
      actionPlansBasedOnFeedback: { availability: 0, quality: 0, observation: "" },
      implementedImprovements: { availability: 0, quality: 0, observation: "" },
    },
    performanceMetrics: {
      documentedKPIs: { availability: 0, quality: 0, observation: "" },
      evidenceOfDataDrivenDecisions: { availability: 0, quality: 0, observation: "" },
      recordsOfImplementedImprovements: { availability: 0, quality: 0, observation: "" },
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
    if (data?.continuousImprovement) {
      const mergedData = {
        ...continuousImprovementData,
        professionalism: {
          cpdPlan: {
            ...continuousImprovementData.professionalism.cpdPlan,
            ...data.continuousImprovement.professionalism?.cpdPlan,
          },
          cpdImplementationReports: {
            ...continuousImprovementData.professionalism.cpdImplementationReports,
            ...data.continuousImprovement.professionalism?.cpdImplementationReports,
          },
          freeEthicalRecord: {
            ...continuousImprovementData.professionalism.freeEthicalRecord,
            ...data.continuousImprovement.professionalism?.freeEthicalRecord,
          },
          positiveRoleModeling: {
            ...continuousImprovementData.professionalism.positiveRoleModeling,
            ...data.continuousImprovement.professionalism?.positiveRoleModeling,
          },
          staffFeedbackMechanisms: {
            ...continuousImprovementData.professionalism.staffFeedbackMechanisms,
            ...data.continuousImprovement.professionalism?.staffFeedbackMechanisms,
          },
          actionPlansBasedOnFeedback: {
            ...continuousImprovementData.professionalism.actionPlansBasedOnFeedback,
            ...data.continuousImprovement.professionalism?.actionPlansBasedOnFeedback,
          },
          implementedImprovements: {
            ...continuousImprovementData.professionalism.implementedImprovements,
            ...data.continuousImprovement.professionalism?.implementedImprovements,
          },
        },
        performanceMetrics: {
          documentedKPIs: {
            ...continuousImprovementData.performanceMetrics.documentedKPIs,
            ...data.continuousImprovement.performanceMetrics?.documentedKPIs,
          },
          evidenceOfDataDrivenDecisions: {
            ...continuousImprovementData.performanceMetrics.evidenceOfDataDrivenDecisions,
            ...data.continuousImprovement.performanceMetrics?.evidenceOfDataDrivenDecisions,
          },
          recordsOfImplementedImprovements: {
            ...continuousImprovementData.performanceMetrics.recordsOfImplementedImprovements,
            ...data.continuousImprovement.performanceMetrics?.recordsOfImplementedImprovements,
          },
        },
        overview: {
          strengths: data.continuousImprovement.overview?.strengths || continuousImprovementData.overview.strengths,
          weaknesses: data.continuousImprovement.overview?.weaknesses || continuousImprovementData.overview.weaknesses,
          areasOfImprovement:
            data.continuousImprovement.overview?.areasOfImprovement ||
            continuousImprovementData.overview.areasOfImprovement,
        },
        totalMarks: data.continuousImprovement.totalMarks || continuousImprovementData.totalMarks,
      }

      setContinuousImprovementData(mergedData)
    }
  }, [data])

  // Calculate total marks
  const calculateTotalMarks = useCallback(() => {
    // Define marks allocation for each item
    const marksAllocation = {
      professionalism: {
        cpdPlan: 1,
        cpdImplementationReports: 1,
        freeEthicalRecord: 1,
        positiveRoleModeling: 1,
        staffFeedbackMechanisms: 1,
        actionPlansBasedOnFeedback: 1,
        implementedImprovements: 1,
      },
      performanceMetrics: {
        documentedKPIs: 1,
        evidenceOfDataDrivenDecisions: 1,
        recordsOfImplementedImprovements: 1,
      },
    }

    let totalMarks = 0

    // Calculate marks for Professionalism section
    Object.entries(marksAllocation.professionalism).forEach(([key, marks]) => {
      const item =
        continuousImprovementData.professionalism[key as keyof typeof continuousImprovementData.professionalism]
      if (item) {
        if (key === "cpdPlan" || key === "cpdImplementationReports") {
          // Quality is evaluated, Availability is N/A
          if (item.quality === 1) {
            totalMarks += marks
          }
        } else {
          // Availability is evaluated, Quality is N/A
          if (item.availability === 1) {
            totalMarks += marks
          }
        }
      }
    })

    // Calculate marks for Performance Metrics section
    Object.entries(marksAllocation.performanceMetrics).forEach(([key, marks]) => {
      const item =
        continuousImprovementData.performanceMetrics[key as keyof typeof continuousImprovementData.performanceMetrics]
      if (item) {
        if (key === "documentedKPIs" || key === "recordsOfImplementedImprovements") {
          // Quality is evaluated, Availability is N/A
          if (item.quality === 1) {
            totalMarks += marks
          }
        } else if (key === "evidenceOfDataDrivenDecisions") {
          // Availability is evaluated, Quality is N/A
          if (item.availability === 1) {
            totalMarks += marks
          }
        }
      }
    })

    return totalMarks
  }, [continuousImprovementData])

  // Update total marks whenever data changes
  useEffect(() => {
    const newTotalMarks = calculateTotalMarks()

    setContinuousImprovementData((prev) => ({
      ...prev,
      totalMarks: newTotalMarks,
    }))

    // Update parent component with changes
    onDataChange({
      continuousImprovement: {
        ...continuousImprovementData,
        totalMarks: newTotalMarks,
      },
    })
  }, [
    continuousImprovementData.professionalism,
    continuousImprovementData.performanceMetrics,
    calculateTotalMarks,
    onDataChange,
  ])

  // Handle changes to evaluation items
  const handleEvaluationChange = (
    section: keyof Omit<ContinuousImprovementData, "overview" | "totalMarks">,
    field: string,
    type: "availability" | "quality",
    value: number,
  ) => {
    setContinuousImprovementData((prev) => {
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
    section: keyof Omit<ContinuousImprovementData, "overview" | "totalMarks">,
    field: string,
    value: string,
  ) => {
    setContinuousImprovementData((prev) => {
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
  const handleOverviewChange = (field: keyof ContinuousImprovementData["overview"], value: string) => {
    setContinuousImprovementData((prev) => {
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

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">5. Continuous Improvement (10 Marks)</h2>

          <Tabs defaultValue="professionalism" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="professionalism">5.1 Professionalism</TabsTrigger>
              <TabsTrigger value="performanceMetrics">5.2 Performance Metrics</TabsTrigger>
            </TabsList>

            {/* 5.1 Professionalism */}
            <TabsContent value="professionalism" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="cpdPlan"
                label="CPD plan"
                availabilityValue={continuousImprovementData.professionalism.cpdPlan.availability}
                qualityValue={continuousImprovementData.professionalism.cpdPlan.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "cpdPlan", "availability", value)
                }
                onQualityChange={(value) => handleEvaluationChange("professionalism", "cpdPlan", "quality", value)}
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={continuousImprovementData.professionalism.cpdPlan.observation}
                onObservationChange={(value) => handleObservationChange("professionalism", "cpdPlan", value)}
              />

              <EvaluationItem
                id="cpdImplementationReports"
                label="CPD implementation reports"
                availabilityValue={continuousImprovementData.professionalism.cpdImplementationReports.availability}
                qualityValue={continuousImprovementData.professionalism.cpdImplementationReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "cpdImplementationReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "cpdImplementationReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={continuousImprovementData.professionalism.cpdImplementationReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("professionalism", "cpdImplementationReports", value)
                }
              />

              <EvaluationItem
                id="freeEthicalRecord"
                label="Free ethical record"
                availabilityValue={continuousImprovementData.professionalism.freeEthicalRecord.availability}
                qualityValue={continuousImprovementData.professionalism.freeEthicalRecord.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "freeEthicalRecord", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "freeEthicalRecord", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.professionalism.freeEthicalRecord.observation}
                onObservationChange={(value) => handleObservationChange("professionalism", "freeEthicalRecord", value)}
              />

              <EvaluationItem
                id="positiveRoleModeling"
                label="Positive role modeling in professional settings"
                availabilityValue={continuousImprovementData.professionalism.positiveRoleModeling.availability}
                qualityValue={continuousImprovementData.professionalism.positiveRoleModeling.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "positiveRoleModeling", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "positiveRoleModeling", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.professionalism.positiveRoleModeling.observation}
                onObservationChange={(value) =>
                  handleObservationChange("professionalism", "positiveRoleModeling", value)
                }
              />

              <EvaluationItem
                id="staffFeedbackMechanisms"
                label="Staff feedback mechanisms"
                availabilityValue={continuousImprovementData.professionalism.staffFeedbackMechanisms.availability}
                qualityValue={continuousImprovementData.professionalism.staffFeedbackMechanisms.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "staffFeedbackMechanisms", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "staffFeedbackMechanisms", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.professionalism.staffFeedbackMechanisms.observation}
                onObservationChange={(value) =>
                  handleObservationChange("professionalism", "staffFeedbackMechanisms", value)
                }
              />

              <EvaluationItem
                id="actionPlansBasedOnFeedback"
                label="Action plans based on feedback"
                availabilityValue={continuousImprovementData.professionalism.actionPlansBasedOnFeedback.availability}
                qualityValue={continuousImprovementData.professionalism.actionPlansBasedOnFeedback.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "actionPlansBasedOnFeedback", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "actionPlansBasedOnFeedback", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.professionalism.actionPlansBasedOnFeedback.observation}
                onObservationChange={(value) =>
                  handleObservationChange("professionalism", "actionPlansBasedOnFeedback", value)
                }
              />

              <EvaluationItem
                id="implementedImprovements"
                label="Implemented improvements"
                availabilityValue={continuousImprovementData.professionalism.implementedImprovements.availability}
                qualityValue={continuousImprovementData.professionalism.implementedImprovements.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("professionalism", "implementedImprovements", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("professionalism", "implementedImprovements", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.professionalism.implementedImprovements.observation}
                onObservationChange={(value) =>
                  handleObservationChange("professionalism", "implementedImprovements", value)
                }
              />
            </TabsContent>

            {/* 5.2 Performance Metrics */}
            <TabsContent value="performanceMetrics" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="documentedKPIs"
                label="Documented KPIs or Performance review"
                availabilityValue={continuousImprovementData.performanceMetrics.documentedKPIs.availability}
                qualityValue={continuousImprovementData.performanceMetrics.documentedKPIs.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("performanceMetrics", "documentedKPIs", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("performanceMetrics", "documentedKPIs", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={continuousImprovementData.performanceMetrics.documentedKPIs.observation}
                onObservationChange={(value) => handleObservationChange("performanceMetrics", "documentedKPIs", value)}
              />

              <EvaluationItem
                id="evidenceOfDataDrivenDecisions"
                label="Evidence of data-driven decisions"
                availabilityValue={
                  continuousImprovementData.performanceMetrics.evidenceOfDataDrivenDecisions.availability
                }
                qualityValue={continuousImprovementData.performanceMetrics.evidenceOfDataDrivenDecisions.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("performanceMetrics", "evidenceOfDataDrivenDecisions", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("performanceMetrics", "evidenceOfDataDrivenDecisions", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={continuousImprovementData.performanceMetrics.evidenceOfDataDrivenDecisions.observation}
                onObservationChange={(value) =>
                  handleObservationChange("performanceMetrics", "evidenceOfDataDrivenDecisions", value)
                }
              />

              <EvaluationItem
                id="recordsOfImplementedImprovements"
                label="Records of implemented improvements"
                availabilityValue={
                  continuousImprovementData.performanceMetrics.recordsOfImplementedImprovements.availability
                }
                qualityValue={continuousImprovementData.performanceMetrics.recordsOfImplementedImprovements.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange(
                    "performanceMetrics",
                    "recordsOfImplementedImprovements",
                    "availability",
                    value,
                  )
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("performanceMetrics", "recordsOfImplementedImprovements", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={continuousImprovementData.performanceMetrics.recordsOfImplementedImprovements.observation}
                onObservationChange={(value) =>
                  handleObservationChange("performanceMetrics", "recordsOfImplementedImprovements", value)
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
                value={continuousImprovementData.overview.strengths}
                onChange={(e) => handleOverviewChange("strengths", e.target.value)}
                placeholder="Enter strengths..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Weaknesses:</h4>
              <Textarea
                value={continuousImprovementData.overview.weaknesses}
                onChange={(e) => handleOverviewChange("weaknesses", e.target.value)}
                placeholder="Enter weaknesses..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Areas of improvement:</h4>
              <Textarea
                value={continuousImprovementData.overview.areasOfImprovement}
                onChange={(e) => handleOverviewChange("areasOfImprovement", e.target.value)}
                placeholder="Enter areas of improvement..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <p className="text-sm text-blue-600">Total Marks for Continuous Improvement</p>
            <p className="text-xl font-bold text-blue-800">{continuousImprovementData.totalMarks.toFixed(1)} / 10</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

