"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { TeachingLearningData } from "./evaluation/EvaluationType"

interface HeadteacherTeachingLearningProps {
  data: any
  onDataChange: (data: any) => void
}

export default function HeadteacherTeachingLearning({ data, onDataChange }: HeadteacherTeachingLearningProps) {
  // Initialize state with data from parent or default values
  const [teachingLearningData, setTeachingLearningData] = useState<TeachingLearningData>({
    cbtCba: {
      validatedCBC: { availability: 0, quality: 0, observation: "" },
      guidingDocuments: { availability: 0, quality: 0, observation: "" },
    },
    trainingPlanning: {
      validatedChronogram: { availability: 0, quality: 0, observation: "" },
      trainingTimetable: { availability: 0, quality: 0, observation: "" },
      trainerPortfolios: { availability: 0, quality: 0, observation: "" },
      pedagogicalDocuments: { availability: 0, quality: 0, observation: "" },
      iapPlan: { availability: 0, quality: 0, observation: "" },
      iapCompletionReports: { availability: 0, quality: 0, observation: "" },
    },
    cbaImplementation: {
      assessmentPlans: { availability: 0, quality: 0, observation: "" },
      traineePortfolio: { availability: 0, quality: 0, observation: "" },
      attendanceReports: { availability: 0, quality: 0, observation: "" },
      sessionDeliveryReports: { availability: 0, quality: 0, observation: "" },
      portfolioVerificationReports: { availability: 0, quality: 0, observation: "" },
      assessmentMonitoringReports: { availability: 0, quality: 0, observation: "" },
    },
    technologicalTools: {
      digitalTools: { availability: 0, quality: 0, observation: "" },
      feedbackOnTechnology: { availability: 0, quality: 0, observation: "" },
      evidenceOfImprovedEfficiency: { availability: 0, quality: 0, observation: "" },
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
    if (data?.teachingLearning) {
      const mergedData = {
        ...teachingLearningData,
        cbtCba: {
          validatedCBC: {
            ...teachingLearningData.cbtCba.validatedCBC,
            ...data.teachingLearning.cbtCba?.validatedCBC,
          },
          guidingDocuments: {
            ...teachingLearningData.cbtCba.guidingDocuments,
            ...data.teachingLearning.cbtCba?.guidingDocuments,
          },
        },
        trainingPlanning: {
          validatedChronogram: {
            ...teachingLearningData.trainingPlanning.validatedChronogram,
            ...data.teachingLearning.trainingPlanning?.validatedChronogram,
          },
          trainingTimetable: {
            ...teachingLearningData.trainingPlanning.trainingTimetable,
            ...data.teachingLearning.trainingPlanning?.trainingTimetable,
          },
          trainerPortfolios: {
            ...teachingLearningData.trainingPlanning.trainerPortfolios,
            ...data.teachingLearning.trainingPlanning?.trainerPortfolios,
          },
          pedagogicalDocuments: {
            ...teachingLearningData.trainingPlanning.pedagogicalDocuments,
            ...data.teachingLearning.trainingPlanning?.pedagogicalDocuments,
          },
          iapPlan: {
            ...teachingLearningData.trainingPlanning.iapPlan,
            ...data.teachingLearning.trainingPlanning?.iapPlan,
          },
          iapCompletionReports: {
            ...teachingLearningData.trainingPlanning.iapCompletionReports,
            ...data.teachingLearning.trainingPlanning?.iapCompletionReports,
          },
        },
        cbaImplementation: {
          assessmentPlans: {
            ...teachingLearningData.cbaImplementation.assessmentPlans,
            ...data.teachingLearning.cbaImplementation?.assessmentPlans,
          },
          traineePortfolio: {
            ...teachingLearningData.cbaImplementation.traineePortfolio,
            ...data.teachingLearning.cbaImplementation?.traineePortfolio,
          },
          attendanceReports: {
            ...teachingLearningData.cbaImplementation.attendanceReports,
            ...data.teachingLearning.cbaImplementation?.attendanceReports,
          },
          sessionDeliveryReports: {
            ...teachingLearningData.cbaImplementation.sessionDeliveryReports,
            ...data.teachingLearning.cbaImplementation?.sessionDeliveryReports,
          },
          portfolioVerificationReports: {
            ...teachingLearningData.cbaImplementation.portfolioVerificationReports,
            ...data.teachingLearning.cbaImplementation?.portfolioVerificationReports,
          },
          assessmentMonitoringReports: {
            ...teachingLearningData.cbaImplementation.assessmentMonitoringReports,
            ...data.teachingLearning.cbaImplementation?.assessmentMonitoringReports,
          },
        },
        technologicalTools: {
          digitalTools: {
            ...teachingLearningData.technologicalTools.digitalTools,
            ...data.teachingLearning.technologicalTools?.digitalTools,
          },
          feedbackOnTechnology: {
            ...teachingLearningData.technologicalTools.feedbackOnTechnology,
            ...data.teachingLearning.technologicalTools?.feedbackOnTechnology,
          },
          evidenceOfImprovedEfficiency: {
            ...teachingLearningData.technologicalTools.evidenceOfImprovedEfficiency,
            ...data.teachingLearning.technologicalTools?.evidenceOfImprovedEfficiency,
          },
        },
        overview: {
          strengths: data.teachingLearning.overview?.strengths || teachingLearningData.overview.strengths,
          weaknesses: data.teachingLearning.overview?.weaknesses || teachingLearningData.overview.weaknesses,
          areasOfImprovement:
            data.teachingLearning.overview?.areasOfImprovement || teachingLearningData.overview.areasOfImprovement,
        },
        totalMarks: data.teachingLearning.totalMarks || teachingLearningData.totalMarks,
      }

      setTeachingLearningData(mergedData)
    }
  }, [data])

  // Calculate total marks
  const calculateTotalMarks = useCallback(() => {
    // Define marks allocation for each item
    const marksAllocation = {
      cbtCba: {
        validatedCBC: 1,
        guidingDocuments: 1,
      },
      trainingPlanning: {
        validatedChronogram: 1,
        trainingTimetable: 2,
        trainerPortfolios: 1,
        pedagogicalDocuments: 1,
        iapPlan: 2,
        iapCompletionReports: 1,
      },
      cbaImplementation: {
        assessmentPlans: 2,
        traineePortfolio: 1,
        attendanceReports: 1,
        sessionDeliveryReports: 1,
        portfolioVerificationReports: 1,
        assessmentMonitoringReports: 1,
      },
      technologicalTools: {
        digitalTools: 1,
        feedbackOnTechnology: 1,
        evidenceOfImprovedEfficiency: 1,
      },
    }

    let totalMarks = 0

    // Calculate marks for CBT/CBA section
    Object.entries(marksAllocation.cbtCba).forEach(([key, marks]) => {
      const item = teachingLearningData.cbtCba[key as keyof typeof teachingLearningData.cbtCba]
      if (item && item.availability === 1) {
        totalMarks += marks
      }
    })

    // Calculate marks for Training Planning section
    Object.entries(marksAllocation.trainingPlanning).forEach(([key, marks]) => {
      const item = teachingLearningData.trainingPlanning[key as keyof typeof teachingLearningData.trainingPlanning]
      if (item && item.availability === 1) {
        totalMarks += marks
      }
    })

    // Calculate marks for CBA Implementation section
    Object.entries(marksAllocation.cbaImplementation).forEach(([key, marks]) => {
      const item = teachingLearningData.cbaImplementation[key as keyof typeof teachingLearningData.cbaImplementation]
      if (item && item.quality === 1) {
        totalMarks += marks
      }
    })

    // Calculate marks for Technological Tools section
    Object.entries(marksAllocation.technologicalTools).forEach(([key, marks]) => {
      const item = teachingLearningData.technologicalTools[key as keyof typeof teachingLearningData.technologicalTools]

      if (item) {
        // For digitalTools and feedbackOnTechnology, availability is N/A
        if (key === "digitalTools" || key === "feedbackOnTechnology") {
          if (item.quality === 1) {
            totalMarks += marks
          }
        }
        // For evidenceOfImprovedEfficiency, quality is N/A
        else if (key === "evidenceOfImprovedEfficiency") {
          if (item.availability === 1) {
            totalMarks += marks
          }
        }
      }
    })

    return totalMarks
  }, [teachingLearningData])

  // Update total marks whenever data changes
  useEffect(() => {
    const newTotalMarks = calculateTotalMarks()

    setTeachingLearningData((prev) => ({
      ...prev,
      totalMarks: newTotalMarks,
    }))

    // Update parent component with changes
    onDataChange({
      teachingLearning: {
        ...teachingLearningData,
        totalMarks: newTotalMarks,
      },
    })
  }, [
    teachingLearningData.cbtCba,
    teachingLearningData.trainingPlanning,
    teachingLearningData.cbaImplementation,
    teachingLearningData.technologicalTools,
    calculateTotalMarks,
    onDataChange,
    teachingLearningData.overview,
  ])

  // Handle changes to evaluation items
  const handleEvaluationChange = (
    section: keyof Omit<TeachingLearningData, "overview" | "totalMarks">,
    field: string,
    type: "availability" | "quality",
    value: number,
  ) => {
    setTeachingLearningData((prev) => {
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
    section: keyof Omit<TeachingLearningData, "overview" | "totalMarks">,
    field: string,
    value: string,
  ) => {
    setTeachingLearningData((prev) => {
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
  const handleOverviewChange = (field: keyof TeachingLearningData["overview"], value: string) => {
    setTeachingLearningData((prev) => {
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
          <h2 className="text-xl font-semibold text-blue-700 mb-4">3. Leading Teaching and Learning (20 Marks)</h2>

          <Tabs defaultValue="cbtCba" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="cbtCba">3.1 CBT/CBA</TabsTrigger>
              <TabsTrigger value="trainingPlanning">3.2 Training Planning</TabsTrigger>
              <TabsTrigger value="cbaImplementation">3.3 CBA Implementation</TabsTrigger>
              <TabsTrigger value="technologicalTools">3.4 Technological Tools</TabsTrigger>
            </TabsList>

            {/* 3.1 CBT/CBA */}
            <TabsContent value="cbtCba" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="validatedCBC"
                label="Validated Competence Based Curriculum (CBC)"
                availabilityValue={teachingLearningData.cbtCba.validatedCBC.availability}
                qualityValue={teachingLearningData.cbtCba.validatedCBC.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbtCba", "validatedCBC", "availability", value)
                }
                onQualityChange={(value) => handleEvaluationChange("cbtCba", "validatedCBC", "quality", value)}
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.cbtCba.validatedCBC.observation}
                onObservationChange={(value) => handleObservationChange("cbtCba", "validatedCBC", value)}
              />

              <EvaluationItem
                id="guidingDocuments"
                label="Guiding Documents regarding CBT/CBA Implementation"
                availabilityValue={teachingLearningData.cbtCba.guidingDocuments.availability}
                qualityValue={teachingLearningData.cbtCba.guidingDocuments.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbtCba", "guidingDocuments", "availability", value)
                }
                onQualityChange={(value) => handleEvaluationChange("cbtCba", "guidingDocuments", "quality", value)}
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.cbtCba.guidingDocuments.observation}
                onObservationChange={(value) => handleObservationChange("cbtCba", "guidingDocuments", value)}
              />
            </TabsContent>

            {/* 3.2 Training Planning */}
            <TabsContent value="trainingPlanning" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="validatedChronogram"
                label="Validated Chronogram"
                availabilityValue={teachingLearningData.trainingPlanning.validatedChronogram.availability}
                qualityValue={teachingLearningData.trainingPlanning.validatedChronogram.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "validatedChronogram", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "validatedChronogram", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.validatedChronogram.observation}
                onObservationChange={(value) =>
                  handleObservationChange("trainingPlanning", "validatedChronogram", value)
                }
              />

              <EvaluationItem
                id="trainingTimetable"
                label="Training Timetable"
                availabilityValue={teachingLearningData.trainingPlanning.trainingTimetable.availability}
                qualityValue={teachingLearningData.trainingPlanning.trainingTimetable.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "trainingTimetable", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "trainingTimetable", "quality", value)
                }
                marksAllocated={2}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.trainingTimetable.observation}
                onObservationChange={(value) => handleObservationChange("trainingPlanning", "trainingTimetable", value)}
              />

              <EvaluationItem
                id="trainerPortfolios"
                label="Trainer Portfolios"
                availabilityValue={teachingLearningData.trainingPlanning.trainerPortfolios.availability}
                qualityValue={teachingLearningData.trainingPlanning.trainerPortfolios.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "trainerPortfolios", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "trainerPortfolios", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.trainerPortfolios.observation}
                onObservationChange={(value) => handleObservationChange("trainingPlanning", "trainerPortfolios", value)}
              />

              <EvaluationItem
                id="pedagogicalDocuments"
                label="Pedagogical documents (Scheme of Works, Handouts/notes, Session Plans), aligned with the overall curriculum and learning objectives"
                availabilityValue={teachingLearningData.trainingPlanning.pedagogicalDocuments.availability}
                qualityValue={teachingLearningData.trainingPlanning.pedagogicalDocuments.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "pedagogicalDocuments", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "pedagogicalDocuments", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.pedagogicalDocuments.observation}
                onObservationChange={(value) =>
                  handleObservationChange("trainingPlanning", "pedagogicalDocuments", value)
                }
              />

              <EvaluationItem
                id="iapPlan"
                label="Industrial Attachment Program (IAP) Plan"
                availabilityValue={teachingLearningData.trainingPlanning.iapPlan.availability}
                qualityValue={teachingLearningData.trainingPlanning.iapPlan.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "iapPlan", "availability", value)
                }
                onQualityChange={(value) => handleEvaluationChange("trainingPlanning", "iapPlan", "quality", value)}
                marksAllocated={2}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.iapPlan.observation}
                onObservationChange={(value) => handleObservationChange("trainingPlanning", "iapPlan", value)}
              />

              <EvaluationItem
                id="iapCompletionReports"
                label="IAP Completion Reports"
                availabilityValue={teachingLearningData.trainingPlanning.iapCompletionReports.availability}
                qualityValue={teachingLearningData.trainingPlanning.iapCompletionReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "iapCompletionReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("trainingPlanning", "iapCompletionReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.trainingPlanning.iapCompletionReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("trainingPlanning", "iapCompletionReports", value)
                }
              />
            </TabsContent>

            {/* 3.3 CBA Implementation */}
            <TabsContent value="cbaImplementation" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="assessmentPlans"
                label="Assessment Plans"
                availabilityValue={teachingLearningData.cbaImplementation.assessmentPlans.availability}
                qualityValue={teachingLearningData.cbaImplementation.assessmentPlans.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "assessmentPlans", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "assessmentPlans", "quality", value)
                }
                marksAllocated={2}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.cbaImplementation.assessmentPlans.observation}
                onObservationChange={(value) => handleObservationChange("cbaImplementation", "assessmentPlans", value)}
              />

              <EvaluationItem
                id="traineePortfolio"
                label="Trainee Portfolio"
                availabilityValue={teachingLearningData.cbaImplementation.traineePortfolio.availability}
                qualityValue={teachingLearningData.cbaImplementation.traineePortfolio.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "traineePortfolio", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "traineePortfolio", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.cbaImplementation.traineePortfolio.observation}
                onObservationChange={(value) => handleObservationChange("cbaImplementation", "traineePortfolio", value)}
              />

              <EvaluationItem
                id="attendanceReports"
                label="Attendance Reports"
                availabilityValue={teachingLearningData.cbaImplementation.attendanceReports.availability}
                qualityValue={teachingLearningData.cbaImplementation.attendanceReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "attendanceReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "attendanceReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.cbaImplementation.attendanceReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("cbaImplementation", "attendanceReports", value)
                }
              />

              <EvaluationItem
                id="sessionDeliveryReports"
                label="Session Delivery Monitoring Reports"
                availabilityValue={teachingLearningData.cbaImplementation.sessionDeliveryReports.availability}
                qualityValue={teachingLearningData.cbaImplementation.sessionDeliveryReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "sessionDeliveryReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "sessionDeliveryReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.cbaImplementation.sessionDeliveryReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("cbaImplementation", "sessionDeliveryReports", value)
                }
              />

              <EvaluationItem
                id="portfolioVerificationReports"
                label="Portfolio Verification Reports"
                availabilityValue={teachingLearningData.cbaImplementation.portfolioVerificationReports.availability}
                qualityValue={teachingLearningData.cbaImplementation.portfolioVerificationReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "portfolioVerificationReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "portfolioVerificationReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.cbaImplementation.portfolioVerificationReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("cbaImplementation", "portfolioVerificationReports", value)
                }
              />

              <EvaluationItem
                id="assessmentMonitoringReports"
                label="Assessment Monitoring Reports"
                availabilityValue={teachingLearningData.cbaImplementation.assessmentMonitoringReports.availability}
                qualityValue={teachingLearningData.cbaImplementation.assessmentMonitoringReports.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "assessmentMonitoringReports", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("cbaImplementation", "assessmentMonitoringReports", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.cbaImplementation.assessmentMonitoringReports.observation}
                onObservationChange={(value) =>
                  handleObservationChange("cbaImplementation", "assessmentMonitoringReports", value)
                }
              />
            </TabsContent>

            {/* 3.4 Technological Tools */}
            <TabsContent value="technologicalTools" className="space-y-4">
              <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 p-2 bg-blue-50 rounded-md">
                <div className="font-medium">Evaluation Item</div>
                <div className="text-center text-sm font-medium">Availability (40%)</div>
                <div className="text-center text-sm font-medium">Quality (60%)</div>
                <div className="text-center text-sm font-medium">Marks Allocated</div>
                <div className="text-center text-sm font-medium">Marks Obtained</div>
                <div className="text-center text-sm font-medium">Observation</div>
              </div>

              <EvaluationItem
                id="digitalTools"
                label="Digital Tools"
                availabilityValue={teachingLearningData.technologicalTools.digitalTools.availability}
                qualityValue={teachingLearningData.technologicalTools.digitalTools.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "digitalTools", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "digitalTools", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.technologicalTools.digitalTools.observation}
                onObservationChange={(value) => handleObservationChange("technologicalTools", "digitalTools", value)}
              />

              <EvaluationItem
                id="feedbackOnTechnology"
                label="Feedback from staff and students on technology use"
                availabilityValue={teachingLearningData.technologicalTools.feedbackOnTechnology.availability}
                qualityValue={teachingLearningData.technologicalTools.feedbackOnTechnology.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "feedbackOnTechnology", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "feedbackOnTechnology", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isAvailabilityNA={true}
                observation={teachingLearningData.technologicalTools.feedbackOnTechnology.observation}
                onObservationChange={(value) =>
                  handleObservationChange("technologicalTools", "feedbackOnTechnology", value)
                }
              />

              <EvaluationItem
                id="evidenceOfImprovedEfficiency"
                label="Evidence of improved efficiency"
                availabilityValue={teachingLearningData.technologicalTools.evidenceOfImprovedEfficiency.availability}
                qualityValue={teachingLearningData.technologicalTools.evidenceOfImprovedEfficiency.quality}
                onAvailabilityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "evidenceOfImprovedEfficiency", "availability", value)
                }
                onQualityChange={(value) =>
                  handleEvaluationChange("technologicalTools", "evidenceOfImprovedEfficiency", "quality", value)
                }
                marksAllocated={1}
                qualityWeight="60%"
                availabilityWeight="40%"
                isQualityNA={true}
                observation={teachingLearningData.technologicalTools.evidenceOfImprovedEfficiency.observation}
                onObservationChange={(value) =>
                  handleObservationChange("technologicalTools", "evidenceOfImprovedEfficiency", value)
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
                value={teachingLearningData.overview.strengths}
                onChange={(e) => handleOverviewChange("strengths", e.target.value)}
                placeholder="Enter strengths..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Weaknesses:</h4>
              <Textarea
                value={teachingLearningData.overview.weaknesses}
                onChange={(e) => handleOverviewChange("weaknesses", e.target.value)}
                placeholder="Enter weaknesses..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Areas of improvement:</h4>
              <Textarea
                value={teachingLearningData.overview.areasOfImprovement}
                onChange={(e) => handleOverviewChange("areasOfImprovement", e.target.value)}
                placeholder="Enter areas of improvement..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <p className="text-sm text-blue-600">Total Marks for Teaching and Learning</p>
            <p className="text-xl font-bold text-blue-800">{teachingLearningData.totalMarks.toFixed(1)} / 20</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

