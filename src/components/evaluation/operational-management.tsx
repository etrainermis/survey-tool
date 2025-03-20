"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface OperationalManagementProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
  schoolType: "day" | "boarding" | null
}

export default function OperationalManagement({
  formData,
  updateFormData,
  updateSectionMarks,
  schoolType,
}: OperationalManagementProps) {
  const [localData, setLocalData] = useState({
    // School Committee Governance
    secAvailability: "na",
    secQuality: "",
    feedingCommitteeAvailability: "na",
    feedingCommitteeQuality: "",
    secMinutesAvailability: "na",
    secMinutesQuality: "",
    sgaMinutesAvailability: "na",
    sgaMinutesQuality: "",

    // Procedures and Communication
    organigramAvailability: "",
    organigramQuality: "",
    managementMeetingAvailability: "na",
    managementMeetingQuality: "",
    pedagogicalMeetingAvailability: "na",
    pedagogicalMeetingQuality: "",
    studentsMeetingAvailability: "na",
    studentsMeetingQuality: "",
    staffMeetingAvailability: "na",
    staffMeetingQuality: "",
    suggestionBoxAvailability: "na",
    suggestionBoxQuality: "",

    // Staff Management
    workPerformanceAvailability: "",
    workPerformanceQuality: "",
    performanceEvaluationAvailability: "",
    performanceEvaluationQuality: "",
    staffFileAvailability: "",
    staffFileQuality: "",
    tmiRegistrationAvailability: "",
    tmiRegistrationQuality: "",
    sdmsRecordAvailability: "",
    sdmsRecordQuality: "",
    staffAttendanceAvailability: "",
    staffAttendanceQuality: "",
    monthlyPayrollAvailability: "na",
    monthlyPayrollQuality: "",
    capacityBuildingPlanAvailability: "",
    capacityBuildingPlanQuality: "",
    capacityBuildingReportAvailability: "",
    capacityBuildingReportQuality: "",
    disciplinaryCommitteeAvailability: "",
    disciplinaryCommitteeQuality: "",

    // Financial Management
    operationalBudgetAvailability: "",
    operationalBudgetQuality: "",
    financialReportsAvailability: "",
    financialReportsQuality: "",
    auditReportsAvailability: "",
    auditReportsQuality: "",

    // Procurement Management
    procurementPlanAvailability: "",
    procurementPlanQuality: "",
    tenderCommitteeReportsAvailability: "",
    tenderCommitteeReportsQuality: "",
    tenderDocumentsAvailability: "",
    tenderDocumentsQuality: "",

    // Estate Management
    infrastructureInventoryAvailability: "",
    infrastructureInventoryQuality: "",
    infrastructureMaintenanceAvailability: "",
    infrastructureMaintenanceQuality: "",
    wasteManagementAvailability: "",
    wasteManagementQuality: "",

    // Asset Management
    storeCardsAvailability: "",
    storeCardsQuality: "",
    requisitionFormsAvailability: "",
    requisitionFormsQuality: "",
    equipmentInventoryAvailability: "",
    equipmentInventoryQuality: "",
    maintenancePlanAvailability: "",
    maintenancePlanQuality: "",
    maintenanceReportAvailability: "",
    maintenanceReportQuality: "",

    // Student Management
    enrolmentPlanAvailability: "na",
    enrolmentPlanQuality: "",
    traineeFilingAvailability: "",
    traineeFilingQuality: "",
    feedingProgramAvailability: "",
    feedingProgramQuality: "",
    femaleRoomAvailability: "",
    femaleRoomQuality: "",
    sportsRecreationPlanAvailability: "",
    sportsRecreationPlanQuality: "",
    sportsRecreationReportAvailability: "",
    sportsRecreationReportQuality: "",

    // Training Consumables Management
    consumableFundsAvailability: "na",
    consumableFundsQuality: "",
    consumableTenderAvailability: "",
    consumableTenderQuality: "",
    marketSurveyAvailability: "na",
    marketSurveyQuality: "",
    consumableProcurementAvailability: "",
    consumableProcurementQuality: "",
    tenderPublicationAvailability: "",
    tenderPublicationQuality: "",
    tenderEvaluationAvailability: "",
    tenderEvaluationQuality: "",
    contractsAvailability: "",
    contractsQuality: "",
    purchaseOrdersAvailability: "",
    purchaseOrdersQuality: "",
    receivingCommitteeAvailability: "",
    receivingCommitteeQuality: "",
    deliveryNoteAvailability: "",
    deliveryNoteQuality: "",
    goodsReceivedNoteAvailability: "",
    goodsReceivedNoteQuality: "",
    consumableStoreCardsAvailability: "",
    consumableStoreCardsQuality: "",
    mainStoreRequisitionAvailability: "",
    mainStoreRequisitionQuality: "",
    miniStoreRequisitionAvailability: "",
    miniStoreRequisitionQuality: "",
    monthlyInventoryAvailability: "",
    monthlyInventoryQuality: "",
    utilizationReportAvailability: "",
    utilizationReportQuality: "",
    remainingBalanceAvailability: "na",
    remainingBalanceQuality: "",
    bestPracticesAvailability: "",
    bestPracticesQuality: "",

    // Add observation fields for all items
    secObservation: "",
    feedingCommitteeObservation: "",
    secMinutesObservation: "",
    sgaMinutesObservation: "",
    organigramObservation: "",
    managementMeetingObservation: "",
    pedagogicalMeetingObservation: "",
    studentsMeetingObservation: "",
    staffMeetingObservation: "",
    suggestionBoxObservation: "",
    workPerformanceObservation: "",
    performanceEvaluationObservation: "",
    staffFileObservation: "",
    tmiRegistrationObservation: "",
    sdmsRecordObservation: "",
    staffAttendanceObservation: "",
    monthlyPayrollObservation: "",
    capacityBuildingPlanObservation: "",
    capacityBuildingReportObservation: "",
    disciplinaryCommitteeObservation: "",
    operationalBudgetObservation: "",
    financialReportsObservation: "",
    auditReportsObservation: "",
    procurementPlanObservation: "",
    tenderCommitteeReportsObservation: "",
    tenderDocumentsObservation: "",
    infrastructureInventoryObservation: "",
    infrastructureMaintenanceObservation: "",
    wasteManagementObservation: "",
    storeCardsObservation: "",
    requisitionFormsObservation: "",
    equipmentInventoryObservation: "",
    maintenancePlanObservation: "",
    maintenanceReportObservation: "",
    enrolmentPlanObservation: "",
    traineeFilingObservation: "",
    feedingProgramObservation: "",
    femaleRoomObservation: "",
    sportsRecreationPlanObservation: "",
    sportsRecreationReportObservation: "",
    consumableFundsObservation: "",
    consumableTenderObservation: "",
    marketSurveyObservation: "",
    consumableProcurementObservation: "",
    tenderPublicationObservation: "",
    tenderEvaluationObservation: "",
    contractsObservation: "",
    purchaseOrdersObservation: "",
    receivingCommitteeObservation: "",
    deliveryNoteObservation: "",
    goodsReceivedNoteObservation: "",
    consumableStoreCardsObservation: "",
    mainStoreRequisitionObservation: "",
    miniStoreRequisitionObservation: "",
    monthlyInventoryObservation: "",
    utilizationReportObservation: "",
    remainingBalanceObservation: "",
    bestPracticesObservation: "",

    // Overview
    strength: "",
    weakness: "",
    improvement: "",

    totalMarks : 0,
    weight : 30,
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

      // If availability is N/A, only consider quality (100% of marks)
      if (availabilityValue === "na") {
        return qualityValue === "yes" ? marksAllocated : 0
      }

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

    // School Committee Governance (2 marks)
    total += calculateItemMarks("sec", 0.5)
    total += calculateItemMarks("feedingCommittee", 0.5)
    total += calculateItemMarks("secMinutes", 0.5)
    total += calculateItemMarks("sgaMinutes", 0.5)

    // Procedures and Communication (3 marks)
    total += calculateItemMarks("organigram", 0.5)
    total += calculateItemMarks("managementMeeting", 0.5)
    total += calculateItemMarks("pedagogicalMeeting", 0.5)
    total += calculateItemMarks("studentsMeeting", 0.5)
    total += calculateItemMarks("staffMeeting", 0.5)
    total += calculateItemMarks("suggestionBox", 0.5)

    // Staff Management (5 marks)
    total += calculateItemMarks("workPerformance", 0.5)
    total += calculateItemMarks("performanceEvaluation", 0.5)
    total += calculateItemMarks("staffFile", 0.5)
    total += calculateItemMarks("tmiRegistration", 0.5)
    total += calculateItemMarks("sdmsRecord", 0.5)
    total += calculateItemMarks("staffAttendance", 0.5)
    total += calculateItemMarks("monthlyPayroll", 0.5)
    total += calculateItemMarks("capacityBuildingPlan", 0.5)
    total += calculateItemMarks("capacityBuildingReport", 0.5)
    total += calculateItemMarks("disciplinaryCommittee", 0.5)

    // Financial Management (1.5 marks)
    total += calculateItemMarks("operationalBudget", 0.5)
    total += calculateItemMarks("financialReports", 0.5)
    total += calculateItemMarks("auditReports", 0.5)

    // Procurement Management (1.5 marks)
    total += calculateItemMarks("procurementPlan", 0.5)
    total += calculateItemMarks("tenderCommitteeReports", 0.5)
    total += calculateItemMarks("tenderDocuments", 0.5)

    // Estate Management (1.5 marks)
    total += calculateItemMarks("infrastructureInventory", 0.5)
    total += calculateItemMarks("infrastructureMaintenance", 0.5)
    total += calculateItemMarks("wasteManagement", 0.5)

    // Asset Management (2.5 marks)
    total += calculateItemMarks("storeCards", 0.5)
    total += calculateItemMarks("requisitionForms", 0.5)
    total += calculateItemMarks("equipmentInventory", 0.5)
    total += calculateItemMarks("maintenancePlan", 0.5)
    total += calculateItemMarks("maintenanceReport", 0.5)

    // Student Management (3 marks)
    total += calculateItemMarks("enrolmentPlan", 0.5)
    total += calculateItemMarks("traineeFiling", 0.5)
    total += calculateItemMarks("feedingProgram", 0.5)
    total += calculateItemMarks("femaleRoom", 0.5)
    total += calculateItemMarks("sportsRecreationPlan", 0.5)
    total += calculateItemMarks("sportsRecreationReport", 0.5)

    // Training Consumables Management (10 marks)
    total += calculateItemMarks("consumableFunds", 0.5)
    total += calculateItemMarks("consumableTender", 0.5)
    total += calculateItemMarks("marketSurvey", 0.5)
    total += calculateItemMarks("consumableProcurement", 1)
    total += calculateItemMarks("tenderPublication", 0.5)
    total += calculateItemMarks("tenderEvaluation", 0.5)
    total += calculateItemMarks("contracts", 0.5)
    total += calculateItemMarks("purchaseOrders", 0.5)
    total += calculateItemMarks("receivingCommittee", 0.5)
    total += calculateItemMarks("deliveryNote", 0.5)
    total += calculateItemMarks("goodsReceivedNote", 0.5)
    total += calculateItemMarks("consumableStoreCards", 0.5)
    total += calculateItemMarks("mainStoreRequisition", 0.5)
    total += calculateItemMarks("miniStoreRequisition", 0.5)
    total += calculateItemMarks("monthlyInventory", 1)
    total += calculateItemMarks("utilizationReport", 0.5)
    total += calculateItemMarks("remainingBalance", 0.5)
    total += calculateItemMarks("bestPractices", 0.5)

    // Cap at 30 marks maximum
    return Math.min(total, 30)
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
      <Tabs defaultValue="governance" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 mb-4">
          <TabsTrigger value="governance">2.1 Governance</TabsTrigger>
          <TabsTrigger value="procedures">2.2 Procedures</TabsTrigger>
          <TabsTrigger value="staff">2.3 Staff</TabsTrigger>
          <TabsTrigger value="financial">2.4 Financial</TabsTrigger>
          <TabsTrigger value="procurement">2.5 Procurement</TabsTrigger>
          <TabsTrigger value="estate">2.6 Estate</TabsTrigger>
          <TabsTrigger value="asset">2.7 Asset</TabsTrigger>
          <TabsTrigger value="student">2.8 Student</TabsTrigger>
          <TabsTrigger value="consumables">2.9 Consumables</TabsTrigger>
        </TabsList>

        <TabsContent value="governance">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.1 School Committee Governance (2 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="sec"
                  label="Availability Of School Executive Committee (SEC)"
                  availabilityValue={localData.secAvailability}
                  qualityValue={localData.secQuality}
                  onAvailabilityChange={(value) => handleChange("secAvailability", value)}
                  onQualityChange={(value) => handleChange("secQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.secObservation}
                  onObservationChange={(value) => handleChange("secObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="feedingCommittee"
                  label="Availablity Of School Feeding Committee"
                  availabilityValue={localData.feedingCommitteeAvailability}
                  qualityValue={localData.feedingCommitteeQuality}
                  onAvailabilityChange={(value) => handleChange("feedingCommitteeAvailability", value)}
                  onQualityChange={(value) => handleChange("feedingCommitteeQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.feedingCommitteeObservation}
                  onObservationChange={(value) => handleChange("feedingCommitteeObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="secMinutes"
                  label="At least 1 minutes Of School Executive Committee meeting per term"
                  availabilityValue={localData.secMinutesAvailability}
                  qualityValue={localData.secMinutesQuality}
                  onAvailabilityChange={(value) => handleChange("secMinutesAvailability", value)}
                  onQualityChange={(value) => handleChange("secMinutesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.secMinutesObservation}
                  onObservationChange={(value) => handleChange("secMinutesObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sgaMinutes"
                  label="One minutes Of School General Assembly (SGA) meeting per year"
                  availabilityValue={localData.sgaMinutesAvailability}
                  qualityValue={localData.sgaMinutesQuality}
                  onAvailabilityChange={(value) => handleChange("sgaMinutesAvailability", value)}
                  onQualityChange={(value) => handleChange("sgaMinutesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.sgaMinutesObservation}
                  onObservationChange={(value) => handleChange("sgaMinutesObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.2 Procedures and Communication (3 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="organigram"
                  label="School organigram available and published"
                  availabilityValue={localData.organigramAvailability}
                  qualityValue={localData.organigramQuality}
                  onAvailabilityChange={(value) => handleChange("organigramAvailability", value)}
                  onQualityChange={(value) => handleChange("organigramQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.organigramObservation}
                  onObservationChange={(value) => handleChange("organigramObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="managementMeeting"
                  label="School Management Meeting per month (At least one minutes)"
                  availabilityValue={localData.managementMeetingAvailability}
                  qualityValue={localData.managementMeetingQuality}
                  onAvailabilityChange={(value) => handleChange("managementMeetingAvailability", value)}
                  onQualityChange={(value) => handleChange("managementMeetingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.managementMeetingObservation}
                  onObservationChange={(value) => handleChange("managementMeetingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="pedagogicalMeeting"
                  label="At least 6 Minutes Of School Pedagogical Meeting Per Year (two each term)"
                  availabilityValue={localData.pedagogicalMeetingAvailability}
                  qualityValue={localData.pedagogicalMeetingQuality}
                  onAvailabilityChange={(value) => handleChange("pedagogicalMeetingAvailability", value)}
                  onQualityChange={(value) => handleChange("pedagogicalMeetingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.pedagogicalMeetingObservation}
                  onObservationChange={(value) => handleChange("pedagogicalMeetingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="studentsMeeting"
                  label="At least 1 minutes of meetings Between School Administration And Students Per Term"
                  availabilityValue={localData.studentsMeetingAvailability}
                  qualityValue={localData.studentsMeetingQuality}
                  onAvailabilityChange={(value) => handleChange("studentsMeetingAvailability", value)}
                  onQualityChange={(value) => handleChange("studentsMeetingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.studentsMeetingObservation}
                  onObservationChange={(value) => handleChange("studentsMeetingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="staffMeeting"
                  label="At Least 2 Minutes Of Meeting Between School Administration And Supporting Staff Per Month"
                  availabilityValue={localData.staffMeetingAvailability}
                  qualityValue={localData.staffMeetingQuality}
                  onAvailabilityChange={(value) => handleChange("staffMeetingAvailability", value)}
                  onQualityChange={(value) => handleChange("staffMeetingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.staffMeetingObservation}
                  onObservationChange={(value) => handleChange("staffMeetingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="suggestionBox"
                  label="Suggestion Box"
                  availabilityValue={localData.suggestionBoxAvailability}
                  qualityValue={localData.suggestionBoxQuality}
                  onAvailabilityChange={(value) => handleChange("suggestionBoxAvailability", value)}
                  onQualityChange={(value) => handleChange("suggestionBoxQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.suggestionBoxObservation}
                  onObservationChange={(value) => handleChange("suggestionBoxObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.3 Staff Management (5 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="workPerformance"
                  label="Work Performance Contract"
                  availabilityValue={localData.workPerformanceAvailability}
                  qualityValue={localData.workPerformanceQuality}
                  onAvailabilityChange={(value) => handleChange("workPerformanceAvailability", value)}
                  onQualityChange={(value) => handleChange("workPerformanceQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.workPerformanceObservation}
                  onObservationChange={(value) => handleChange("workPerformanceObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="performanceEvaluation"
                  label="Performance Evaluation Report"
                  availabilityValue={localData.performanceEvaluationAvailability}
                  qualityValue={localData.performanceEvaluationQuality}
                  onAvailabilityChange={(value) => handleChange("performanceEvaluationAvailability", value)}
                  onQualityChange={(value) => handleChange("performanceEvaluationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.performanceEvaluationObservation}
                  onObservationChange={(value) => handleChange("performanceEvaluationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="staffFile"
                  label="Staff File"
                  availabilityValue={localData.staffFileAvailability}
                  qualityValue={localData.staffFileQuality}
                  onAvailabilityChange={(value) => handleChange("staffFileAvailability", value)}
                  onQualityChange={(value) => handleChange("staffFileQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.staffFileObservation}
                  onObservationChange={(value) => handleChange("staffFileObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="tmiRegistration"
                  label="Registration of all staff in TMIS"
                  availabilityValue={localData.tmiRegistrationAvailability}
                  qualityValue={localData.tmiRegistrationQuality}
                  onAvailabilityChange={(value) => handleChange("tmiRegistrationAvailability", value)}
                  onQualityChange={(value) => handleChange("tmiRegistrationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.tmiRegistrationObservation}
                  onObservationChange={(value) => handleChange("tmiRegistrationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sdmsRecord"
                  label="Record of all staff information in SDMS"
                  availabilityValue={localData.sdmsRecordAvailability}
                  qualityValue={localData.sdmsRecordQuality}
                  onAvailabilityChange={(value) => handleChange("sdmsRecordAvailability", value)}
                  onQualityChange={(value) => handleChange("sdmsRecordQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.sdmsRecordObservation}
                  onObservationChange={(value) => handleChange("sdmsRecordObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="staffAttendance"
                  label="Staff Attendance Records"
                  availabilityValue={localData.staffAttendanceAvailability}
                  qualityValue={localData.staffAttendanceQuality}
                  onAvailabilityChange={(value) => handleChange("staffAttendanceAvailability", value)}
                  onQualityChange={(value) => handleChange("staffAttendanceQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.staffAttendanceObservation}
                  onObservationChange={(value) => handleChange("staffAttendanceObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="monthlyPayroll"
                  label="Monthly Payroll"
                  availabilityValue={localData.monthlyPayrollAvailability}
                  qualityValue={localData.monthlyPayrollQuality}
                  onAvailabilityChange={(value) => handleChange("monthlyPayrollAvailability", value)}
                  onQualityChange={(value) => handleChange("monthlyPayrollQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.monthlyPayrollObservation}
                  onObservationChange={(value) => handleChange("monthlyPayrollObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="capacityBuildingPlan"
                  label="Staff Capacity Building Plan"
                  availabilityValue={localData.capacityBuildingPlanAvailability}
                  qualityValue={localData.capacityBuildingPlanQuality}
                  onAvailabilityChange={(value) => handleChange("capacityBuildingPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("capacityBuildingPlanQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.capacityBuildingPlanObservation}
                  onObservationChange={(value) => handleChange("capacityBuildingPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="capacityBuildingReport"
                  label="Implementation Report of Staff Capacity Building"
                  availabilityValue={localData.capacityBuildingReportAvailability}
                  qualityValue={localData.capacityBuildingReportQuality}
                  onAvailabilityChange={(value) => handleChange("capacityBuildingReportAvailability", value)}
                  onQualityChange={(value) => handleChange("capacityBuildingReportQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.capacityBuildingReportObservation}
                  onObservationChange={(value) => handleChange("capacityBuildingReportObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="disciplinaryCommittee"
                  label="Staff Disciplinary Committee/Reports"
                  availabilityValue={localData.disciplinaryCommitteeAvailability}
                  qualityValue={localData.disciplinaryCommitteeQuality}
                  onAvailabilityChange={(value) => handleChange("disciplinaryCommitteeAvailability", value)}
                  onQualityChange={(value) => handleChange("disciplinaryCommitteeQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.disciplinaryCommitteeObservation}
                  onObservationChange={(value) => handleChange("disciplinaryCommitteeObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.4 Financial Management (1.5 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="operationalBudget"
                  label="Operational Budget Plan"
                  availabilityValue={localData.operationalBudgetAvailability}
                  qualityValue={localData.operationalBudgetQuality}
                  onAvailabilityChange={(value) => handleChange("operationalBudgetAvailability", value)}
                  onQualityChange={(value) => handleChange("operationalBudgetQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.operationalBudgetObservation}
                  onObservationChange={(value) => handleChange("operationalBudgetObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="financialReports"
                  label="Monthly, Termly Financial Report and Annual Financial Report"
                  availabilityValue={localData.financialReportsAvailability}
                  qualityValue={localData.financialReportsQuality}
                  onAvailabilityChange={(value) => handleChange("financialReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("financialReportsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.financialReportsObservation}
                  onObservationChange={(value) => handleChange("financialReportsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="auditReports"
                  label="Internal Audit Reports (Reports of  school audit committee."
                  availabilityValue={localData.auditReportsAvailability}
                  qualityValue={localData.auditReportsQuality}
                  onAvailabilityChange={(value) => handleChange("auditReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("auditReportsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.auditReportsObservation}
                  onObservationChange={(value) => handleChange("auditReportsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procurement">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.5 Procurement Management (1.5 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="procurementPlan"
                  label="Procurement Plan"
                  availabilityValue={localData.procurementPlanAvailability}
                  qualityValue={localData.procurementPlanQuality}
                  onAvailabilityChange={(value) => handleChange("procurementPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("procurementPlanQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.procurementPlanObservation}
                  onObservationChange={(value) => handleChange("procurementPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="tenderCommitteeReports"
                  label="Tender Committee Reports"
                  availabilityValue={localData.tenderCommitteeReportsAvailability}
                  qualityValue={localData.tenderCommitteeReportsQuality}
                  onAvailabilityChange={(value) => handleChange("tenderCommitteeReportsAvailability", value)}
                  onQualityChange={(value) => handleChange("tenderCommitteeReportsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.tenderCommitteeReportsObservation}
                  onObservationChange={(value) => handleChange("tenderCommitteeReportsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="tenderDocuments"
                  label="Tender Documents"
                  availabilityValue={localData.tenderDocumentsAvailability}
                  qualityValue={localData.tenderDocumentsQuality}
                  onAvailabilityChange={(value) => handleChange("tenderDocumentsAvailability", value)}
                  onQualityChange={(value) => handleChange("tenderDocumentsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.tenderDocumentsObservation}
                  onObservationChange={(value) => handleChange("tenderDocumentsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estate">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.6 Estate Management (1.5 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="infrastructureInventory"
                  label="Annual-Based Inventory Reports For Infrastructure"
                  availabilityValue={localData.infrastructureInventoryAvailability}
                  qualityValue={localData.infrastructureInventoryQuality}
                  onAvailabilityChange={(value) => handleChange("infrastructureInventoryAvailability", value)}
                  onQualityChange={(value) => handleChange("infrastructureInventoryQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.infrastructureInventoryObservation}
                  onObservationChange={(value) => handleChange("infrastructureInventoryObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="infrastructureMaintenance"
                  label="Annual Maintenance And Safety Report of Infrastructure"
                  availabilityValue={localData.infrastructureMaintenanceAvailability}
                  qualityValue={localData.infrastructureMaintenanceQuality}
                  onAvailabilityChange={(value) => handleChange("infrastructureMaintenanceAvailability", value)}
                  onQualityChange={(value) => handleChange("infrastructureMaintenanceQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.infrastructureMaintenanceObservation}
                  onObservationChange={(value) => handleChange("infrastructureMaintenanceObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="wasteManagement"
                  label="Waste Management Mechanism Including Bio Degradable And Non-Bio Degradable Waste"
                  availabilityValue={localData.wasteManagementAvailability}
                  qualityValue={localData.wasteManagementQuality}
                  onAvailabilityChange={(value) => handleChange("wasteManagementAvailability", value)}
                  onQualityChange={(value) => handleChange("wasteManagementQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.wasteManagementObservation}
                  onObservationChange={(value) => handleChange("wasteManagementObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="asset">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.7 Asset Management (2.5 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="storeCards"
                  label="Store Cards"
                  availabilityValue={localData.storeCardsAvailability}
                  qualityValue={localData.storeCardsQuality}
                  onAvailabilityChange={(value) => handleChange("storeCardsAvailability", value)}
                  onQualityChange={(value) => handleChange("storeCardsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.storeCardsObservation}
                  onObservationChange={(value) => handleChange("storeCardsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="requisitionForms"
                  label="Store Requisition Forms"
                  availabilityValue={localData.requisitionFormsAvailability}
                  qualityValue={localData.requisitionFormsQuality}
                  onAvailabilityChange={(value) => handleChange("requisitionFormsAvailability", value)}
                  onQualityChange={(value) => handleChange("requisitionFormsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.requisitionFormsObservation}
                  onObservationChange={(value) => handleChange("requisitionFormsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="equipmentInventory"
                  label="Term-Based Inventory Reports Of Equipment And Materials"
                  availabilityValue={localData.equipmentInventoryAvailability}
                  qualityValue={localData.equipmentInventoryQuality}
                  onAvailabilityChange={(value) => handleChange("equipmentInventoryAvailability", value)}
                  onQualityChange={(value) => handleChange("equipmentInventoryQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.equipmentInventoryObservation}
                  onObservationChange={(value) => handleChange("equipmentInventoryObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="maintenancePlan"
                  label="Term-Based Maintenance And Safety Plan."
                  availabilityValue={localData.maintenancePlanAvailability}
                  qualityValue={localData.maintenancePlanQuality}
                  onAvailabilityChange={(value) => handleChange("maintenancePlanAvailability", value)}
                  onQualityChange={(value) => handleChange("maintenancePlanQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.maintenancePlanObservation}
                  onObservationChange={(value) => handleChange("maintenancePlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="maintenanceReport"
                  label="Term-Based Maintenance And Safety Report"
                  availabilityValue={localData.maintenanceReportAvailability}
                  qualityValue={localData.maintenanceReportQuality}
                  onAvailabilityChange={(value) => handleChange("maintenanceReportAvailability", value)}
                  onQualityChange={(value) => handleChange("maintenanceReportQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.maintenanceReportObservation}
                  onObservationChange={(value) => handleChange("maintenanceReportObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">2.8 Student Management (3 marks)</h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="enrolmentPlan"
                  label="Enrolment Plan"
                  availabilityValue={localData.enrolmentPlanAvailability}
                  qualityValue={localData.enrolmentPlanQuality}
                  onAvailabilityChange={(value) => handleChange("enrolmentPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("enrolmentPlanQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.enrolmentPlanObservation}
                  onObservationChange={(value) => handleChange("enrolmentPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="traineeFiling"
                  label="Trainee Filing System (Consider SDMS ) "
                  availabilityValue={localData.traineeFilingAvailability}
                  qualityValue={localData.traineeFilingQuality}
                  onAvailabilityChange={(value) => handleChange("traineeFilingAvailability", value)}
                  onQualityChange={(value) => handleChange("traineeFilingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.traineeFilingObservation}
                  onObservationChange={(value) => handleChange("traineeFilingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="feedingProgram"
                  label="Implementation report Of School Feeding Program "
                  availabilityValue={localData.feedingProgramAvailability}
                  qualityValue={localData.feedingProgramQuality}
                  onAvailabilityChange={(value) => handleChange("feedingProgramAvailability", value)}
                  onQualityChange={(value) => handleChange("feedingProgramQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.feedingProgramObservation}
                  onObservationChange={(value) => handleChange("feedingProgramObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="femaleRoom"
                  label="Operational Female Learner Room (Girls'room) and the sickbay for boarding schools "
                  availabilityValue={localData.femaleRoomAvailability}
                  qualityValue={localData.femaleRoomQuality}
                  onAvailabilityChange={(value) => handleChange("femaleRoomAvailability", value)}
                  onQualityChange={(value) => handleChange("femaleRoomQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.femaleRoomObservation}
                  onObservationChange={(value) => handleChange("femaleRoomObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sportsRecreationPlan"
                  label="Operational Plan for Sports and Recreation"
                  availabilityValue={localData.sportsRecreationPlanAvailability}
                  qualityValue={localData.sportsRecreationPlanQuality}
                  onAvailabilityChange={(value) => handleChange("sportsRecreationPlanAvailability", value)}
                  onQualityChange={(value) => handleChange("sportsRecreationPlanQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.sportsRecreationPlanObservation}
                  onObservationChange={(value) => handleChange("sportsRecreationPlanObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sportsRecreationReport"
                  label="Implementation Report On Sports And Recreation"
                  availabilityValue={localData.sportsRecreationReportAvailability}
                  qualityValue={localData.sportsRecreationReportQuality}
                  onAvailabilityChange={(value) => handleChange("sportsRecreationReportAvailability", value)}
                  onQualityChange={(value) => handleChange("sportsRecreationReportQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.sportsRecreationReportObservation}
                  onObservationChange={(value) => handleChange("sportsRecreationReportObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumables">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.9 Training Consumables Management (10 marks)
              </h3>

              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="consumableFunds"
                  label="Consumable Funds requests"
                  availabilityValue={localData.consumableFundsAvailability}
                  qualityValue={localData.consumableFundsQuality}
                  onAvailabilityChange={(value) => handleChange("consumableFundsAvailability", value)}
                  onQualityChange={(value) => handleChange("consumableFundsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.consumableFundsObservation}
                  onObservationChange={(value) => handleChange("consumableFundsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="consumableTender"
                  label="Consumable Tender committee(Appointment letter not exceeding 2 years"
                  availabilityValue={localData.consumableTenderAvailability}
                  qualityValue={localData.consumableTenderQuality}
                  onAvailabilityChange={(value) => handleChange("consumableTenderAvailability", value)}
                  onQualityChange={(value) => handleChange("consumableTenderQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.consumableTenderObservation}
                  onObservationChange={(value) => handleChange("consumableTenderObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="marketSurvey"
                  label="Consumable Market Survey report"
                  availabilityValue={localData.marketSurveyAvailability}
                  qualityValue={localData.marketSurveyQuality}
                  onAvailabilityChange={(value) => handleChange("marketSurveyAvailability", value)}
                  onQualityChange={(value) => handleChange("marketSurveyQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.marketSurveyObservation}
                  onObservationChange={(value) => handleChange("marketSurveyObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="consumableProcurement"
                  label="Consumable Procurement plan"
                  availabilityValue={localData.consumableProcurementAvailability}
                  qualityValue={localData.consumableProcurementQuality}
                  onAvailabilityChange={(value) => handleChange("consumableProcurementAvailability", value)}
                  onQualityChange={(value) => handleChange("consumableProcurementQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.consumableProcurementObservation}
                  onObservationChange={(value) => handleChange("consumableProcurementObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="tenderPublication"
                  label=" Publication of Tender"
                  availabilityValue={localData.tenderPublicationAvailability}
                  qualityValue={localData.tenderPublicationQuality}
                  onAvailabilityChange={(value) => handleChange("tenderPublicationAvailability", value)}
                  onQualityChange={(value) => handleChange("tenderPublicationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.tenderPublicationObservation}
                  onObservationChange={(value) => handleChange("tenderPublicationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="tenderEvaluation"
                  label="Tender Evaluation Report"
                  availabilityValue={localData.tenderEvaluationAvailability}
                  qualityValue={localData.tenderEvaluationQuality}
                  onAvailabilityChange={(value) => handleChange("tenderEvaluationAvailability", value)}
                  onQualityChange={(value) => handleChange("tenderEvaluationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.tenderEvaluationObservation}
                  onObservationChange={(value) => handleChange("tenderEvaluationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="contracts"
                  label="Contracts"
                  availabilityValue={localData.contractsAvailability}
                  qualityValue={localData.contractsQuality}
                  onAvailabilityChange={(value) => handleChange("contractsAvailability", value)}
                  onQualityChange={(value) => handleChange("contractsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.contractsObservation}
                  onObservationChange={(value) => handleChange("contractsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="purchaseOrders"
                  label="Purchase Orders"
                  availabilityValue={localData.purchaseOrdersAvailability}
                  qualityValue={localData.purchaseOrdersQuality}
                  onAvailabilityChange={(value) => handleChange("purchaseOrdersAvailability", value)}
                  onQualityChange={(value) => handleChange("purchaseOrdersQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.purchaseOrdersObservation}
                  onObservationChange={(value) => handleChange("purchaseOrdersObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="receivingCommittee"
                  label="Receiving Committee(Appoinment letter"
                  availabilityValue={localData.receivingCommitteeAvailability}
                  qualityValue={localData.receivingCommitteeQuality}
                  onAvailabilityChange={(value) => handleChange("receivingCommitteeAvailability", value)}
                  onQualityChange={(value) => handleChange("receivingCommitteeQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.receivingCommitteeObservation}
                  onObservationChange={(value) => handleChange("receivingCommitteeObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="deliveryNote"
                  label="Delivery Note"
                  availabilityValue={localData.deliveryNoteAvailability}
                  qualityValue={localData.deliveryNoteQuality}
                  onAvailabilityChange={(value) => handleChange("deliveryNoteAvailability", value)}
                  onQualityChange={(value) => handleChange("deliveryNoteQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.deliveryNoteObservation}
                  onObservationChange={(value) => handleChange("deliveryNoteObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="goodsReceivedNote"
                  label="Goods Received Note"
                  availabilityValue={localData.goodsReceivedNoteAvailability}
                  qualityValue={localData.goodsReceivedNoteQuality}
                  onAvailabilityChange={(value) => handleChange("goodsReceivedNoteAvailability", value)}
                  onQualityChange={(value) => handleChange("goodsReceivedNoteQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.goodsReceivedNoteObservation}
                  onObservationChange={(value) => handleChange("goodsReceivedNoteObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="consumableStoreCards"
                  label="Store Cards"
                  availabilityValue={localData.consumableStoreCardsAvailability}
                  qualityValue={localData.consumableStoreCardsQuality}
                  onAvailabilityChange={(value) => handleChange("consumableStoreCardsAvailability", value)}
                  onQualityChange={(value) => handleChange("consumableStoreCardsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.consumableStoreCardsObservation}
                  onObservationChange={(value) => handleChange("consumableStoreCardsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="mainStoreRequisition"
                  label="Consumables requisition form for the main store"
                  availabilityValue={localData.mainStoreRequisitionAvailability}
                  qualityValue={localData.mainStoreRequisitionQuality}
                  onAvailabilityChange={(value) => handleChange("mainStoreRequisitionAvailability", value)}
                  onQualityChange={(value) => handleChange("mainStoreRequisitionQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.mainStoreRequisitionObservation}
                  onObservationChange={(value) => handleChange("mainStoreRequisitionObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="miniStoreRequisition"
                  label="Consumables requisition form for the mini store"
                  availabilityValue={localData.miniStoreRequisitionAvailability}
                  qualityValue={localData.miniStoreRequisitionQuality}
                  onAvailabilityChange={(value) => handleChange("miniStoreRequisitionAvailability", value)}
                  onQualityChange={(value) => handleChange("miniStoreRequisitionQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.miniStoreRequisitionObservation}
                  onObservationChange={(value) => handleChange("miniStoreRequisitionObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="monthlyInventory"
                  label="Monthly Inventory report "
                  availabilityValue={localData.monthlyInventoryAvailability}
                  qualityValue={localData.monthlyInventoryQuality}
                  onAvailabilityChange={(value) => handleChange("monthlyInventoryAvailability", value)}
                  onQualityChange={(value) => handleChange("monthlyInventoryQuality", value)}
                  marksAllocated={1}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.monthlyInventoryObservation}
                  onObservationChange={(value) => handleChange("monthlyInventoryObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="utilizationReport"
                  label="Consumables Utilization report"
                  availabilityValue={localData.utilizationReportAvailability}
                  qualityValue={localData.utilizationReportQuality}
                  onAvailabilityChange={(value) => handleChange("utilizationReportAvailability", value)}
                  onQualityChange={(value) => handleChange("utilizationReportQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.utilizationReportObservation}
                  onObservationChange={(value) => handleChange("utilizationReportObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="remainingBalance"
                  label="Availability of remaining balance from 2023/2024"
                  availabilityValue={localData.remainingBalanceAvailability}
                  qualityValue={localData.remainingBalanceQuality}
                  onAvailabilityChange={(value) => handleChange("remainingBalanceAvailability", value)}
                  onQualityChange={(value) => handleChange("remainingBalanceQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.remainingBalanceObservation}
                  onObservationChange={(value) => handleChange("remainingBalanceObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="bestPractices"
                  label="Availability of consumable best practices"
                  availabilityValue={localData.bestPracticesAvailability}
                  qualityValue={localData.bestPracticesQuality}
                  onAvailabilityChange={(value) => handleChange("bestPracticesAvailability", value)}
                  onQualityChange={(value) => handleChange("bestPracticesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={false}
                  observation={localData.bestPracticesObservation}
                  onObservationChange={(value) => handleChange("bestPracticesObservation", value)}
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
          <span className="font-medium text-blue-800">Total marks for Operational Management:</span>
          <span className="text-xl font-bold text-blue-800">{calculateMarks().toFixed(1)} / 30</span>
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
    // If availability is N/A, only consider quality (100% of marks)
    if (availabilityValue === "na") {
      return qualityValue === "yes" ? marksAllocated : 0
    }

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



