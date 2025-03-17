"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeachingLearningProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
}

export default function TeachingLearning({ formData, updateFormData, updateSectionMarks }: TeachingLearningProps) {
  const [localData, setLocalData] = useState({
    // 3.1 CBT/CBA
    cbcAvailability: "",
    cbcQuality: "na", // N/A
    guidingDocumentsAvailability: "",
    guidingDocumentsQuality: "na", // N/A

    // 3.2 Training planning and delivery
    chronogramAvailability: "",
    chronogramQuality: "na", // N/A
    timetableAvailability: "",
    timetableQuality: "",
    trainerPortfoliosAvailability: "",
    trainerPortfoliosQuality: "",
    pedagogicalDocumentsAvailability: "",
    pedagogicalDocumentsQuality: "",
    iapPlanAvailability: "",
    iapPlanQuality: "",
    iapReportsAvailability: "",
    iapReportsQuality: "",

    // 3.3 CBA implementation
    assessmentPlansAvailability: "",
    assessmentPlansQuality: "",
    traineePortfolioAvailability: "",
    traineePortfolioQuality: "",
    attendanceReportsAvailability: "",
    attendanceReportsQuality: "",
    deliveryMonitoringAvailability: "",
    deliveryMonitoringQuality: "",
    portfolioVerificationAvailability: "",
    portfolioVerificationQuality: "",
    assessmentMonitoringAvailability: "",
    assessmentMonitoringQuality: "",

    // 3.4 Use of technological tools
    digitalToolsAvailability: "",
    digitalToolsQuality: "",
    techFeedbackAvailability: "",
    techFeedbackQuality: "",
    efficiencyEvidenceAvailability: "",
    efficiencyEvidenceQuality: "",

    // Add observation fields for each item
    cbcObservation: "",
    guidingDocumentsObservation: "",
    chronogramObservation: "",
    timetableObservation: "",
    trainerPortfoliosObservation: "",
    pedagogicalDocumentsObservation: "",
    iapPlanObservation: "",
    iapReportsObservation: "",
    assessmentPlansObservation: "",
    traineePortfolioObservation: "",
    attendanceReportsObservation: "",
    deliveryMonitoringObservation: "",
    portfolioVerificationObservation: "",
    assessmentMonitoringObservation: "",
    digitalToolsObservation: "",
    techFeedbackObservation: "",
    efficiencyEvidenceObservation: "",

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

    // 3.1 CBT/CBA (2 marks)
    total += calculateItemMarks("cbc", 1)
    total += calculateItemMarks("guidingDocuments", 1)

    // 3.2 Training planning and delivery (8 marks)
    total += calculateItemMarks("chronogram", 1)
    total += calculateItemMarks("timetable", 2)
    total += calculateItemMarks("trainerPortfolios", 1)
    total += calculateItemMarks("pedagogicalDocuments", 1)
    total += calculateItemMarks("iapPlan", 2)
    total += calculateItemMarks("iapReports", 1)

    // 3.3 CBA implementation (7 marks)
    total += calculateItemMarks("assessmentPlans", 2)
    total += calculateItemMarks("traineePortfolio", 1)
    total += calculateItemMarks("attendanceReports", 1)
    total += calculateItemMarks("deliveryMonitoring", 1)
    total += calculateItemMarks("portfolioVerification", 1)
    total += calculateItemMarks("assessmentMonitoring", 1)

    // 3.4 Use of technological tools (3 marks)
    total += calculateItemMarks("digitalTools", 1)
    total += calculateItemMarks("techFeedback", 1)
    total += calculateItemMarks("efficiencyEvidence", 1)

    // Cap at 20 marks maximum
    return Math.min(total, 20)
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
      <Tabs defaultValue="cbt" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="cbt">3.1 CBT/CBA</TabsTrigger>
          <TabsTrigger value="training">3.2 Training</TabsTrigger>
          <TabsTrigger value="implementation">3.3 Implementation</TabsTrigger>
          <TabsTrigger value="technology">3.4 Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="cbt">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.1 CBT/CBA (2 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="cbc"
                  label="Validated Competence Based Curriculum (CBC)"
                  availabilityValue={localData.cbcAvailability}
                  qualityValue={localData.cbcQuality}
                  onAvailabilityChange={(value) => handleChange("cbcAvailability", value)}
                  onQualityChange={(value) => handleChange("cbcQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.cbcObservation}
                  onObservationChange={(value) => handleChange("cbcObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="guidingDocuments"
                  label="Guiding Documents regarding CBT/CBA Implementation"
                  availabilityValue={localData.guidingDocumentsAvailability}
                  qualityValue={localData.guidingDocumentsQuality}
                  onAvailabilityChange={(value) => handleChange("guidingDocumentsAvailability", value)}
                  onQualityChange={(value) => handleChange("guidingDocumentsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.guidingDocumentsObservation}
                  onObservationChange={(value) => handleChange("guidingDocumentsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.2 Training planning and delivery (8 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="chronogram"
                  label="Validated Chronogram"
                  availabilityValue={localData.chronogramAvailability}
                  qualityValue={localData.chronogramQuality}
                  onAvailabilityChange={(value) => handleChange("chronogramAvailability", value)}
                  onQualityChange={(value) => handleChange("chronogramQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.chronogramObservation}
                  onObservationChange={(value) => handleChange("chronogramObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="timetable"
                  label="Training Timetable"
                  availabilityValue={localData.timetableAvailability}
                  qualityValue={localData.timetableQuality}
                  onAvailabilityChange={(value) => handleChange("timetableAvailability", value)}
                  onQualityChange={(value) => handleChange("timetableQuality", value)}
                  marksAllocated={2}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.timetableObservation}
                  onObservationChange={(value) => handleChange("timetableObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="trainerPortfolios"
                  label="Trainer Portfolios"
                  availabilityValue={localData.trainerPortfoliosAvailability}
                  qualityValue={localData.trainerPortfoliosQuality}
                  onAvailabilityChange={(value) => handleChange("trainerPortfoliosAvailability", value)}
                  onQualityChange={(value) => handleChange("trainerPortfoliosQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.trainerPortfoliosObservation}
                  onObservationChange={(value) => handleChange("trainerPortfoliosObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="pedagogicalDocuments"
                  label="Pedagogical documents (Scheme of Works, Handouts/notes, Session Plans), aligned with the overall curriculum and learning objectives"
                  availabilityValue={localData.pedagogicalDocumentsAvailability}
                  qualityValue={localData.pedagogicalDocumentsQuality}
                  onAvailabilityChange={(value) => handleChange("pedagogicalDocumentsAvailability", value)}
                  onQualityChange={(value) => handleChange("pedagogicalDocumentsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.pedagogicalDocumentsObservation}
                  onObservationChange={(value) => handleChange("pedagogicalDocumentsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="iapPlan"
                  label="Industrial Attachment Program (IAP) Plan"
                  availabilityValue={localData.iapPlanAvailability}
                  qualityValue={localData.iapPlanQuality}
                  onAvailabilityChange={(value) => handleChange("iapPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("iapPlanQuality", value)}
                  marksAllocated={2}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.iapPlanObservation}
                  onObservationChange={(value) => handleChange("iapPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="iapReports"
                  label="IAP Completion Reports"
                  availabilityValue={localData.iapReportsAvailability}
                  qualityValue={localData.iapReportsQuality}
                  onAvailabilityChange={(value) => handleChange("iapReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("iapReportsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.iapReportsObservation}
                  onObservationChange={(value) => handleChange("iapReportsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.3 CBA implementation (7 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="assessmentPlans"
                  label="Assessment Plans"
                  availabilityValue={localData.assessmentPlansAvailability}
                  qualityValue={localData.assessmentPlansQuality}
                  onAvailabilityChange={(value) => handleChange("assessmentPlansAvailability", value)}
                  onQualityChange={(value) => handleChange("assessmentPlansQuality", value)}
                  marksAllocated={2}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.assessmentPlansObservation}
                  onObservationChange={(value) => handleChange("assessmentPlansObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="traineePortfolio"
                  label="Trainee Portfolio"
                  availabilityValue={localData.traineePortfolioAvailability}
                  qualityValue={localData.traineePortfolioQuality}
                  onAvailabilityChange={(value) => handleChange("traineePortfolioAvailability", value)}
                  onQualityChange={(value) => handleChange("traineePortfolioQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.traineePortfolioObservation}
                  onObservationChange={(value) => handleChange("traineePortfolioObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="attendanceReports"
                  label="Attendance Reports"
                  availabilityValue={localData.attendanceReportsAvailability}
                  qualityValue={localData.attendanceReportsQuality}
                  onAvailabilityChange={(value) => handleChange("attendanceReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("attendanceReportsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.attendanceReportsObservation}
                  onObservationChange={(value) => handleChange("attendanceReportsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="deliveryMonitoring"
                  label="Session Delivery Monitoring Reports"
                  availabilityValue={localData.deliveryMonitoringAvailability}
                  qualityValue={localData.deliveryMonitoringQuality}
                  onAvailabilityChange={(value) => handleChange("deliveryMonitoringAvailability", value)}
                  onQualityChange={(value) => handleChange("deliveryMonitoringQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.deliveryMonitoringObservation}
                  onObservationChange={(value) => handleChange("deliveryMonitoringObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="portfolioVerification"
                  label="Portfolio Verification Reports"
                  availabilityValue={localData.portfolioVerificationAvailability}
                  qualityValue={localData.portfolioVerificationQuality}
                  onAvailabilityChange={(value) => handleChange("portfolioVerificationAvailability", value)}
                  onQualityChange={(value) => handleChange("portfolioVerificationQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.portfolioVerificationObservation}
                  onObservationChange={(value) => handleChange("portfolioVerificationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="assessmentMonitoring"
                  label="Assessment Monitoring Reports"
                  availabilityValue={localData.assessmentMonitoringAvailability}
                  qualityValue={localData.assessmentMonitoringQuality}
                  onAvailabilityChange={(value) => handleChange("assessmentMonitoringAvailability", value)}
                  onQualityChange={(value) => handleChange("assessmentMonitoringQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.assessmentMonitoringObservation}
                  onObservationChange={(value) => handleChange("assessmentMonitoringObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.4 Use of technological tools (3 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="digitalTools"
                  label="Digital tools"
                  availabilityValue={localData.digitalToolsAvailability}
                  qualityValue={localData.digitalToolsQuality}
                  onAvailabilityChange={(value) => handleChange("digitalToolsAvailability", value)}
                  onQualityChange={(value) => handleChange("digitalToolsQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.digitalToolsObservation}
                  onObservationChange={(value) => handleChange("digitalToolsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="techFeedback"
                  label="Feedback from staff and students on technology use"
                  availabilityValue={localData.techFeedbackAvailability}
                  qualityValue={localData.techFeedbackQuality}
                  onAvailabilityChange={(value) => handleChange("techFeedbackAvailability", value)}
                  onQualityChange={(value) => handleChange("techFeedbackQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.techFeedbackObservation}
                  onObservationChange={(value) => handleChange("techFeedbackObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="efficiencyEvidence"
                  label="Evidence of improved efficiency"
                  availabilityValue={localData.efficiencyEvidenceAvailability}
                  qualityValue={localData.efficiencyEvidenceQuality}
                  onAvailabilityChange={(value) => handleChange("efficiencyEvidenceAvailability", value)}
                  onQualityChange={(value) => handleChange("efficiencyEvidenceQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.efficiencyEvidenceObservation}
                  onObservationChange={(value) => handleChange("efficiencyEvidenceObservation", value)}
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
          <span className="font-medium text-blue-800">Total marks for Teaching and Learning:</span>
          <span className="text-xl font-bold text-blue-800">{calculateMarks().toFixed(1)} / 20</span>
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
  observation: string
  onObservationChange: (value: string) => void
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
  observation,
  onObservationChange,
}: EvaluationItemWithWeightsProps) {
  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    if (isQualityNA) {
      return availabilityValue === "yes" ? marksAllocated : 0
    }

    if (qualityValue === "na") {
      return availabilityValue === "yes" ? marksAllocated : 0
    }

    let marks = 0
    if (availabilityValue === "yes") {
      marks += marksAllocated * 0.4
    }
    if (qualityValue === "yes") {
      marks += marksAllocated * 0.6
    }
    return marks
  }

  useEffect(() => {
    if (isQualityNA && qualityValue !== "na") {
      onQualityChange("na")
    }
  }, [isQualityNA, qualityValue, onQualityChange])

  return (
    <div className="grid grid-cols-1 gap-2 p-2 rounded-md hover:bg-blue-50">
      <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 items-start">
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

