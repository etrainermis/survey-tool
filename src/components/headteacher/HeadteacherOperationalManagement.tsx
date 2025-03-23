"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { OperationalManagementData, EvaluationField } from "./evaluation/EvaluationType"

// Create default evaluation field
const createDefaultField = (): EvaluationField => ({
  availability: 0,
  quality: 0,
  observation: "",
})

// Create initial form data
const createInitialData = (): OperationalManagementData => ({
  // 2.1 School Committee Governance
  schoolExecutiveCommittee: createDefaultField(),
  schoolFeedingCommittee: createDefaultField(),
  minutesOfSEC: createDefaultField(),
  minutesOfSGA: createDefaultField(),

  // 2.2 Procedures and Communication
  schoolOrganigram: createDefaultField(),
  minutesOfSMC: createDefaultField(),
  minutesOfPedagogical: createDefaultField(),
  minutesWithStudents: createDefaultField(),
  minutesWithStaff: createDefaultField(),
  suggestionBox: createDefaultField(),

  // 2.3 Staff Management
  workPerformanceContract: createDefaultField(),
  performanceEvaluation: createDefaultField(),
  staffFile: createDefaultField(),
  tmisRegistration: createDefaultField(),
  sdmsRecord: createDefaultField(),
  staffAttendance: createDefaultField(),
  monthlyPayroll: createDefaultField(),
  staffCapacityPlan: createDefaultField(),
  capacityBuildingReport: createDefaultField(),
  disciplinaryCommittee: createDefaultField(),

  // 2.4 Financial management
  operationalBudgetPlan: createDefaultField(),
  financialReports: createDefaultField(),
  internalAuditReports: createDefaultField(),

  // 2.5 Procurement Management
  procurementPlan: createDefaultField(),
  tenderCommitteeReports: createDefaultField(),
  tenderDocuments: createDefaultField(),

  // 2.6 Estate Management
  infrastructureInventory: createDefaultField(),
  infrastructureMaintenance: createDefaultField(),
  wasteManagement: createDefaultField(),

  // 2.7 Asset Management
  storeCards: createDefaultField(),
  storeRequisitionForms: createDefaultField(),
  equipmentInventory: createDefaultField(),
  maintenancePlan: createDefaultField(),
  maintenanceReport: createDefaultField(),

  // 2.8 Student Management
  enrolmentPlan: createDefaultField(),
  traineeFilingSystem: createDefaultField(),
  schoolFeedingReport: createDefaultField(),
  femaleRoom: createDefaultField(),
  sportsRecreationPlan: createDefaultField(),
  sportsRecreationReport: createDefaultField(),

  // 2.9 Training consumables management
  consumableFundsRequests: createDefaultField(),
  consumableTenderCommittee: createDefaultField(),
  marketSurveyReport: createDefaultField(),
  consumableProcurementPlan: createDefaultField(),
  tenderPublication: createDefaultField(),
  tenderEvaluationReport: createDefaultField(),
  contracts: createDefaultField(),
  purchaseOrders: createDefaultField(),
  receivingCommittee: createDefaultField(),
  deliveryNote: createDefaultField(),
  goodReceivedNote: createDefaultField(),
  storeCardsConsumables: createDefaultField(),
  mainStoreRequisition: createDefaultField(),
  miniStoreRequisition: createDefaultField(),
  monthlyInventoryReport: createDefaultField(),
  consumablesUtilizationReport: createDefaultField(),
  remainingBalance: createDefaultField(),
  bestPractices: createDefaultField(),

  // Section totals
  sectionTotals: {
    governance: 0,
    procedures: 0,
    staffManagement: 0,
    financialManagement: 0,
    procurementManagement: 0,
    estateManagement: 0,
    assetManagement: 0,
    studentManagement: 0,
    consumablesManagement: 0,
  },

  // Total marks
  totalMarks: 0,

  // Overview
  overview: {
    strength: "",
    weakness: "",
    improvement: "",
  },
})

interface HeadteacherOperationalManagementProps {
  data?: any
  onDataChange?: (data: any) => void
}

export default function HeadteacherOperationalManagement({
  data = {},
  onDataChange = () => {},
}: HeadteacherOperationalManagementProps) {
  const [localData, setLocalData] = useState<OperationalManagementData>({
    ...createInitialData(),
    ...data.operationalManagement,
    overview: {
      strength: data.operationalManagement?.overview?.strength || "",
      weakness: data.operationalManagement?.overview?.weakness || "",
      improvement: data.operationalManagement?.overview?.improvement || "",
    },
    sectionTotals: {
      governance: data.operationalManagement?.sectionTotals?.governance || 0,
      procedures: data.operationalManagement?.sectionTotals?.procedures || 0,
      staffManagement: data.operationalManagement?.sectionTotals?.staffManagement || 0,
      financialManagement: data.operationalManagement?.sectionTotals?.financialManagement || 0,
      procurementManagement: data.operationalManagement?.sectionTotals?.procurementManagement || 0,
      estateManagement: data.operationalManagement?.sectionTotals?.estateManagement || 0,
      assetManagement: data.operationalManagement?.sectionTotals?.assetManagement || 0,
      studentManagement: data.operationalManagement?.sectionTotals?.studentManagement || 0,
      consumablesManagement: data.operationalManagement?.sectionTotals?.consumablesManagement || 0,
    },
  })

  useEffect(() => {
    calculateAllMarks()
  }, [localData])

  const handleAvailabilityChange = (
    section: keyof Omit<OperationalManagementData, "sectionTotals" | "totalMarks" | "overview">,
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
    section: keyof Omit<OperationalManagementData, "sectionTotals" | "totalMarks" | "overview">,
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
    section: keyof Omit<OperationalManagementData, "sectionTotals" | "totalMarks" | "overview">,
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

  const handleOverviewChange = (field: keyof OperationalManagementData["overview"], value: string) => {
    setLocalData((prev) => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: value,
      },
    }))
  }

  // Helper function to calculate marks for an item based on whether quality is N/A
  const calculateItemMarks = (
    item: EvaluationField,
    marksAllocated: number,
    isQualityNA: boolean,
    isAvailabilityNA = false,
  ) => {
    if (isQualityNA) {
      // If quality is N/A, availability is worth 100% of marks
      return item.availability === 1 ? marksAllocated : 0
    } else if (isAvailabilityNA) {
      // If availability is N/A, quality is worth 100% of marks
      return item.quality === 1 ? marksAllocated : 0
    } else {
      // Otherwise, calculate based on weights
      const availabilityMarks = item.availability === 1 ? marksAllocated * 0.4 : 0
      const qualityMarks = item.quality === 1 ? marksAllocated * 0.6 : 0
      return availabilityMarks + qualityMarks
    }
  }

  const calculateAllMarks = () => {
    // Calculate marks for each section
    const governance =
      calculateItemMarks(localData.schoolExecutiveCommittee, 0.5, true) +
      calculateItemMarks(localData.schoolFeedingCommittee, 0.5, true) +
      calculateItemMarks(localData.minutesOfSEC, 0.5, true) +
      calculateItemMarks(localData.minutesOfSGA, 0.5, true)

    const procedures =
      calculateItemMarks(localData.schoolOrganigram, 0.5, true) +
      calculateItemMarks(localData.minutesOfSMC, 0.5, true) +
      calculateItemMarks(localData.minutesOfPedagogical, 0.5, true) +
      calculateItemMarks(localData.minutesWithStudents, 0.5, true) +
      calculateItemMarks(localData.minutesWithStaff, 0.5, true) +
      calculateItemMarks(localData.suggestionBox, 0.5, true)

    const staffManagement =
      calculateItemMarks(localData.workPerformanceContract, 0.5, true) +
      calculateItemMarks(localData.performanceEvaluation, 0.5, true) +
      calculateItemMarks(localData.staffFile, 0.5, true) +
      calculateItemMarks(localData.tmisRegistration, 0.5, false, true) +
      calculateItemMarks(localData.sdmsRecord, 0.5, false, true) +
      calculateItemMarks(localData.staffAttendance, 0.5, true) +
      calculateItemMarks(localData.monthlyPayroll, 0.5, true) +
      calculateItemMarks(localData.staffCapacityPlan, 0.5, true) +
      calculateItemMarks(localData.capacityBuildingReport, 0.5, true) +
      calculateItemMarks(localData.disciplinaryCommittee, 0.5, true)

    const financialManagement =
      calculateItemMarks(localData.operationalBudgetPlan, 0.5, true) +
      calculateItemMarks(localData.financialReports, 0.5, true) +
      calculateItemMarks(localData.internalAuditReports, 0.5, true)

    const procurementManagement =
      calculateItemMarks(localData.procurementPlan, 0.5, true) +
      calculateItemMarks(localData.tenderCommitteeReports, 0.5, true) +
      calculateItemMarks(localData.tenderDocuments, 0.5, true)

    const estateManagement =
      calculateItemMarks(localData.infrastructureInventory, 0.5, true) +
      calculateItemMarks(localData.infrastructureMaintenance, 0.5, true) +
      calculateItemMarks(localData.wasteManagement, 0.5, false, true)

    const assetManagement =
      calculateItemMarks(localData.storeCards, 0.5, true) +
      calculateItemMarks(localData.storeRequisitionForms, 0.5, true) +
      calculateItemMarks(localData.equipmentInventory, 0.5, true) +
      calculateItemMarks(localData.maintenancePlan, 0.5, true) +
      calculateItemMarks(localData.maintenanceReport, 0.5, true)

    const studentManagement =
      calculateItemMarks(localData.enrolmentPlan, 0.5, true) +
      calculateItemMarks(localData.traineeFilingSystem, 0.5, false, true) +
      calculateItemMarks(localData.schoolFeedingReport, 0.5, true) +
      calculateItemMarks(localData.femaleRoom, 0.5, false, true) +
      calculateItemMarks(localData.sportsRecreationPlan, 0.5, true) +
      calculateItemMarks(localData.sportsRecreationReport, 0.5, true)

    const consumablesManagement =
      calculateItemMarks(localData.consumableFundsRequests, 0.5, true) +
      calculateItemMarks(localData.consumableTenderCommittee, 0.5, true) +
      calculateItemMarks(localData.marketSurveyReport, 0.5, true) +
      calculateItemMarks(localData.consumableProcurementPlan, 1.0, true) +
      calculateItemMarks(localData.tenderPublication, 0.5, true) +
      calculateItemMarks(localData.tenderEvaluationReport, 0.5, true) +
      calculateItemMarks(localData.contracts, 0.5, true) +
      calculateItemMarks(localData.purchaseOrders, 0.5, true) +
      calculateItemMarks(localData.receivingCommittee, 0.5, true) +
      calculateItemMarks(localData.deliveryNote, 0.5, true) +
      calculateItemMarks(localData.goodReceivedNote, 0.5, true) +
      calculateItemMarks(localData.storeCardsConsumables, 0.5, false, true) +
      calculateItemMarks(localData.mainStoreRequisition, 0.5, false, true) +
      calculateItemMarks(localData.miniStoreRequisition, 0.5, false, true) +
      calculateItemMarks(localData.monthlyInventoryReport, 1.0, false, true) +
      calculateItemMarks(localData.consumablesUtilizationReport, 0.5, false, true) +
      calculateItemMarks(localData.remainingBalance, 0.5, true) +
      calculateItemMarks(localData.bestPractices, 0.5, false, true)

    // Calculate total marks
    const totalMarks =
      governance +
      procedures +
      staffManagement +
      financialManagement +
      procurementManagement +
      estateManagement +
      assetManagement +
      studentManagement +
      consumablesManagement

    // Update the data with section totals and total marks
    const updatedData = {
      ...localData,
      sectionTotals: {
        governance,
        procedures,
        staffManagement,
        financialManagement,
        procurementManagement,
        estateManagement,
        assetManagement,
        studentManagement,
        consumablesManagement,
      },
      totalMarks,
    }

    setLocalData(updatedData)

    // Call onDataChange with the updated data
    onDataChange({ operationalManagement: updatedData })
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 shadow-sm">
        <CardHeader className="">
          <CardTitle className="text-blue-600">2. School Operational Management (30 Marks)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="governance" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-9 mb-4 p-0 h-auto">
              <TabsTrigger value="governance" className="text-xs py-2">
                2.1 Governance
              </TabsTrigger>
              <TabsTrigger value="procedures" className="text-xs py-2">
                2.2 Procedures
              </TabsTrigger>
              <TabsTrigger value="staff" className="text-xs py-2">
                2.3 Staff
              </TabsTrigger>
              <TabsTrigger value="financial" className="text-xs py-2">
                2.4 Financial
              </TabsTrigger>
              <TabsTrigger value="procurement" className="text-xs py-2">
                2.5 Procurement
              </TabsTrigger>
              <TabsTrigger value="estate" className="text-xs py-2">
                2.6 Estate
              </TabsTrigger>
              <TabsTrigger value="asset" className="text-xs py-2">
                2.7 Asset
              </TabsTrigger>
              <TabsTrigger value="student" className="text-xs py-2">
                2.8 Student
              </TabsTrigger>
              <TabsTrigger value="consumables" className="text-xs py-2">
                2.9 Consumables
              </TabsTrigger>
            </TabsList>

            {/* 2.1 School Committee Governance */}
            <TabsContent value="governance" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.1 School Committee Governance ({localData.sectionTotals.governance.toFixed(1)}/2 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="schoolExecutiveCommittee"
                  label="School Executive Committee (SEC)"
                  availabilityValue={localData.schoolExecutiveCommittee.availability}
                  qualityValue={localData.schoolExecutiveCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolExecutiveCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("schoolExecutiveCommittee", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.schoolExecutiveCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("schoolExecutiveCommittee", value)}
                />
                <EvaluationItem
                  id="schoolFeedingCommittee"
                  label="School Feeding Committee"
                  availabilityValue={localData.schoolFeedingCommittee.availability}
                  qualityValue={localData.schoolFeedingCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolFeedingCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("schoolFeedingCommittee", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.schoolFeedingCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("schoolFeedingCommittee", value)}
                />
                <EvaluationItem
                  id="minutesOfSEC"
                  label="At least 1 minutes Of School Executive Committee meeting per term"
                  availabilityValue={localData.minutesOfSEC.availability}
                  qualityValue={localData.minutesOfSEC.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesOfSEC", value)}
                  onQualityChange={(value) => handleQualityChange("minutesOfSEC", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesOfSEC.observation}
                  onObservationChange={(value) => handleObservationChange("minutesOfSEC", value)}
                />
                <EvaluationItem
                  id="minutesOfSGA"
                  label="One minutes Of School General Assembly (SGA) meeting per year"
                  availabilityValue={localData.minutesOfSGA.availability}
                  qualityValue={localData.minutesOfSGA.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesOfSGA", value)}
                  onQualityChange={(value) => handleQualityChange("minutesOfSGA", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesOfSGA.observation}
                  onObservationChange={(value) => handleObservationChange("minutesOfSGA", value)}
                />
              </div>
            </TabsContent>

            {/* 2.2 Procedures and Communication */}
            <TabsContent value="procedures" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.2 Procedures and Communication ({localData.sectionTotals.procedures.toFixed(1)}/3 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="schoolOrganigram"
                  label="School organigram available and published"
                  availabilityValue={localData.schoolOrganigram.availability}
                  qualityValue={localData.schoolOrganigram.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolOrganigram", value)}
                  onQualityChange={(value) => handleQualityChange("schoolOrganigram", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.schoolOrganigram.observation}
                  onObservationChange={(value) => handleObservationChange("schoolOrganigram", value)}
                />
                <EvaluationItem
                  id="minutesOfSMC"
                  label="At least one minutes Of School Management commetee Meeting per month"
                  availabilityValue={localData.minutesOfSMC.availability}
                  qualityValue={localData.minutesOfSMC.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesOfSMC", value)}
                  onQualityChange={(value) => handleQualityChange("minutesOfSMC", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesOfSMC.observation}
                  onObservationChange={(value) => handleObservationChange("minutesOfSMC", value)}
                />
                <EvaluationItem
                  id="minutesOfPedagogical"
                  label="At least 6 Minutes of School Pedagogical Meeting Per Year (two each term)"
                  availabilityValue={localData.minutesOfPedagogical.availability}
                  qualityValue={localData.minutesOfPedagogical.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesOfPedagogical", value)}
                  onQualityChange={(value) => handleQualityChange("minutesOfPedagogical", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesOfPedagogical.observation}
                  onObservationChange={(value) => handleObservationChange("minutesOfPedagogical", value)}
                />
                <EvaluationItem
                  id="minutesWithStudents"
                  label="At least 1 minutes of meetings Between School Administration and Students Per Term"
                  availabilityValue={localData.minutesWithStudents.availability}
                  qualityValue={localData.minutesWithStudents.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesWithStudents", value)}
                  onQualityChange={(value) => handleQualityChange("minutesWithStudents", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesWithStudents.observation}
                  onObservationChange={(value) => handleObservationChange("minutesWithStudents", value)}
                />
                <EvaluationItem
                  id="minutesWithStaff"
                  label="At Least 2 Minutes of Meeting Between School Administration and Supporting Staff Per Month"
                  availabilityValue={localData.minutesWithStaff.availability}
                  qualityValue={localData.minutesWithStaff.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("minutesWithStaff", value)}
                  onQualityChange={(value) => handleQualityChange("minutesWithStaff", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.minutesWithStaff.observation}
                  onObservationChange={(value) => handleObservationChange("minutesWithStaff", value)}
                />
                <EvaluationItem
                  id="suggestionBox"
                  label="Suggestion Box"
                  availabilityValue={localData.suggestionBox.availability}
                  qualityValue={localData.suggestionBox.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("suggestionBox", value)}
                  onQualityChange={(value) => handleQualityChange("suggestionBox", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.suggestionBox.observation}
                  onObservationChange={(value) => handleObservationChange("suggestionBox", value)}
                />
              </div>
            </TabsContent>

            {/* 2.3 Staff Management */}
            <TabsContent value="staff" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.3 Staff Management ({localData.sectionTotals.staffManagement.toFixed(1)}/5 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="workPerformanceContract"
                  label="Work Performance Contract"
                  availabilityValue={localData.workPerformanceContract.availability}
                  qualityValue={localData.workPerformanceContract.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("workPerformanceContract", value)}
                  onQualityChange={(value) => handleQualityChange("workPerformanceContract", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.workPerformanceContract.observation}
                  onObservationChange={(value) => handleObservationChange("workPerformanceContract", value)}
                />
                <EvaluationItem
                  id="performanceEvaluation"
                  label="Performance Evaluation Report"
                  availabilityValue={localData.performanceEvaluation.availability}
                  qualityValue={localData.performanceEvaluation.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("performanceEvaluation", value)}
                  onQualityChange={(value) => handleQualityChange("performanceEvaluation", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.performanceEvaluation.observation}
                  onObservationChange={(value) => handleObservationChange("performanceEvaluation", value)}
                />
                <EvaluationItem
                  id="staffFile"
                  label="Staff File"
                  availabilityValue={localData.staffFile.availability}
                  qualityValue={localData.staffFile.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("staffFile", value)}
                  onQualityChange={(value) => handleQualityChange("staffFile", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.staffFile.observation}
                  onObservationChange={(value) => handleObservationChange("staffFile", value)}
                />
                <EvaluationItem
                  id="tmisRegistration"
                  label="Regristartion of all staff in TMIS"
                  availabilityValue={localData.tmisRegistration.availability}
                  qualityValue={localData.tmisRegistration.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tmisRegistration", value)}
                  onQualityChange={(value) => handleQualityChange("tmisRegistration", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.tmisRegistration.observation}
                  onObservationChange={(value) => handleObservationChange("tmisRegistration", value)}
                />
                <EvaluationItem
                  id="sdmsRecord"
                  label="Record of staff information in SDMS"
                  availabilityValue={localData.sdmsRecord.availability}
                  qualityValue={localData.sdmsRecord.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("sdmsRecord", value)}
                  onQualityChange={(value) => handleQualityChange("sdmsRecord", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.sdmsRecord.observation}
                  onObservationChange={(value) => handleObservationChange("sdmsRecord", value)}
                />
                <EvaluationItem
                  id="staffAttendance"
                  label="Staff Attendance Records"
                  availabilityValue={localData.staffAttendance.availability}
                  qualityValue={localData.staffAttendance.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("staffAttendance", value)}
                  onQualityChange={(value) => handleQualityChange("staffAttendance", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.staffAttendance.observation}
                  onObservationChange={(value) => handleObservationChange("staffAttendance", value)}
                />
                <EvaluationItem
                  id="monthlyPayroll"
                  label="Monthly Payroll"
                  availabilityValue={localData.monthlyPayroll.availability}
                  qualityValue={localData.monthlyPayroll.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("monthlyPayroll", value)}
                  onQualityChange={(value) => handleQualityChange("monthlyPayroll", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.monthlyPayroll.observation}
                  onObservationChange={(value) => handleObservationChange("monthlyPayroll", value)}
                />
                <EvaluationItem
                  id="staffCapacityPlan"
                  label="Staff Capacity Building Plan"
                  availabilityValue={localData.staffCapacityPlan.availability}
                  qualityValue={localData.staffCapacityPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("staffCapacityPlan", value)}
                  onQualityChange={(value) => handleQualityChange("staffCapacityPlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.staffCapacityPlan.observation}
                  onObservationChange={(value) => handleObservationChange("staffCapacityPlan", value)}
                />
                <EvaluationItem
                  id="capacityBuildingReport"
                  label="Implementation Report Of Staff Capacity Building"
                  availabilityValue={localData.capacityBuildingReport.availability}
                  qualityValue={localData.capacityBuildingReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("capacityBuildingReport", value)}
                  onQualityChange={(value) => handleQualityChange("capacityBuildingReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.capacityBuildingReport.observation}
                  onObservationChange={(value) => handleObservationChange("capacityBuildingReport", value)}
                />
                <EvaluationItem
                  id="disciplinaryCommittee"
                  label="Staff Disciplinary Committee / Reports"
                  availabilityValue={localData.disciplinaryCommittee.availability}
                  qualityValue={localData.disciplinaryCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("disciplinaryCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("disciplinaryCommittee", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.disciplinaryCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("disciplinaryCommittee", value)}
                />
              </div>
            </TabsContent>

            {/* 2.4 Financial Management */}
            <TabsContent value="financial" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.4 Financial Management ({localData.sectionTotals.financialManagement.toFixed(1)}/1.5 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="operationalBudgetPlan"
                  label="Operational Budget Plan"
                  availabilityValue={localData.operationalBudgetPlan.availability}
                  qualityValue={localData.operationalBudgetPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("operationalBudgetPlan", value)}
                  onQualityChange={(value) => handleQualityChange("operationalBudgetPlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.operationalBudgetPlan.observation}
                  onObservationChange={(value) => handleObservationChange("operationalBudgetPlan", value)}
                />
                <EvaluationItem
                  id="financialReports"
                  label="Monthly, Termly Financial Report and Annual Financial Report"
                  availabilityValue={localData.financialReports.availability}
                  qualityValue={localData.financialReports.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("financialReports", value)}
                  onQualityChange={(value) => handleQualityChange("financialReports", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.financialReports.observation}
                  onObservationChange={(value) => handleObservationChange("financialReports", value)}
                />
                <EvaluationItem
                  id="internalAuditReports"
                  label="Internal Audit Reports (Reports of school audit committee)"
                  availabilityValue={localData.internalAuditReports.availability}
                  qualityValue={localData.internalAuditReports.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("internalAuditReports", value)}
                  onQualityChange={(value) => handleQualityChange("internalAuditReports", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.internalAuditReports.observation}
                  onObservationChange={(value) => handleObservationChange("internalAuditReports", value)}
                />
              </div>
            </TabsContent>

            {/* 2.5 Procurement Management */}
            <TabsContent value="procurement" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.5 Procurement Management ({localData.sectionTotals.procurementManagement.toFixed(1)}/1.5 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="procurementPlan"
                  label="Procurement Plan"
                  availabilityValue={localData.procurementPlan.availability}
                  qualityValue={localData.procurementPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("procurementPlan", value)}
                  onQualityChange={(value) => handleQualityChange("procurementPlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.procurementPlan.observation}
                  onObservationChange={(value) => handleObservationChange("procurementPlan", value)}
                />
                <EvaluationItem
                  id="tenderCommitteeReports"
                  label="Tender Committee reports"
                  availabilityValue={localData.tenderCommitteeReports.availability}
                  qualityValue={localData.tenderCommitteeReports.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tenderCommitteeReports", value)}
                  onQualityChange={(value) => handleQualityChange("tenderCommitteeReports", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.tenderCommitteeReports.observation}
                  onObservationChange={(value) => handleObservationChange("tenderCommitteeReports", value)}
                />
                <EvaluationItem
                  id="tenderDocuments"
                  label="Tender Documents"
                  availabilityValue={localData.tenderDocuments.availability}
                  qualityValue={localData.tenderDocuments.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tenderDocuments", value)}
                  onQualityChange={(value) => handleQualityChange("tenderDocuments", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.tenderDocuments.observation}
                  onObservationChange={(value) => handleObservationChange("tenderDocuments", value)}
                />
              </div>
            </TabsContent>

            {/* 2.6 Estate Management */}
            <TabsContent value="estate" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.6 Estate Management ({localData.sectionTotals.estateManagement.toFixed(1)}/1.5 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="infrastructureInventory"
                  label="Annual-Based Inventory Reports For Infrastructure"
                  availabilityValue={localData.infrastructureInventory.availability}
                  qualityValue={localData.infrastructureInventory.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("infrastructureInventory", value)}
                  onQualityChange={(value) => handleQualityChange("infrastructureInventory", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.infrastructureInventory.observation}
                  onObservationChange={(value) => handleObservationChange("infrastructureInventory", value)}
                />
                <EvaluationItem
                  id="infrastructureMaintenance"
                  label="Annual Maintenance And Safety Report of Infrastructure"
                  availabilityValue={localData.infrastructureMaintenance.availability}
                  qualityValue={localData.infrastructureMaintenance.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("infrastructureMaintenance", value)}
                  onQualityChange={(value) => handleQualityChange("infrastructureMaintenance", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.infrastructureMaintenance.observation}
                  onObservationChange={(value) => handleObservationChange("infrastructureMaintenance", value)}
                />
                <EvaluationItem
                  id="wasteManagement"
                  label="Waste Management Mechanism Including Bio Degradable And Non-Bio Degradable Waste"
                  availabilityValue={localData.wasteManagement.availability}
                  qualityValue={localData.wasteManagement.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("wasteManagement", value)}
                  onQualityChange={(value) => handleQualityChange("wasteManagement", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.wasteManagement.observation}
                  onObservationChange={(value) => handleObservationChange("wasteManagement", value)}
                />
              </div>
            </TabsContent>

            {/* 2.7 Asset Management */}
            <TabsContent value="asset" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.7 Asset Management ({localData.sectionTotals.assetManagement.toFixed(1)}/2.5 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="storeCards"
                  label="Store Cards"
                  availabilityValue={localData.storeCards.availability}
                  qualityValue={localData.storeCards.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("storeCards", value)}
                  onQualityChange={(value) => handleQualityChange("storeCards", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.storeCards.observation}
                  onObservationChange={(value) => handleObservationChange("storeCards", value)}
                />
                <EvaluationItem
                  id="storeRequisitionForms"
                  label="Store Requisition Forms"
                  availabilityValue={localData.storeRequisitionForms.availability}
                  qualityValue={localData.storeRequisitionForms.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("storeRequisitionForms", value)}
                  onQualityChange={(value) => handleQualityChange("storeRequisitionForms", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.storeRequisitionForms.observation}
                  onObservationChange={(value) => handleObservationChange("storeRequisitionForms", value)}
                />
                <EvaluationItem
                  id="equipmentInventory"
                  label="Term-Based Inventory Reports Of Equipment And Materials"
                  availabilityValue={localData.equipmentInventory.availability}
                  qualityValue={localData.equipmentInventory.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("equipmentInventory", value)}
                  onQualityChange={(value) => handleQualityChange("equipmentInventory", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.equipmentInventory.observation}
                  onObservationChange={(value) => handleObservationChange("equipmentInventory", value)}
                />
                <EvaluationItem
                  id="maintenancePlan"
                  label="Term-Based Maintenance And Safety Plan"
                  availabilityValue={localData.maintenancePlan.availability}
                  qualityValue={localData.maintenancePlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("maintenancePlan", value)}
                  onQualityChange={(value) => handleQualityChange("maintenancePlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.maintenancePlan.observation}
                  onObservationChange={(value) => handleObservationChange("maintenancePlan", value)}
                />
                <EvaluationItem
                  id="maintenanceReport"
                  label="Term-Based Maintenance And Safety Report"
                  availabilityValue={localData.maintenanceReport.availability}
                  qualityValue={localData.maintenanceReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("maintenanceReport", value)}
                  onQualityChange={(value) => handleQualityChange("maintenanceReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.maintenanceReport.observation}
                  onObservationChange={(value) => handleObservationChange("maintenanceReport", value)}
                />
              </div>
            </TabsContent>

            {/* 2.8 Student Management */}
            <TabsContent value="student" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.8 Student Management ({localData.sectionTotals.studentManagement.toFixed(1)}/3 marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="enrolmentPlan"
                  label="Enrolment Plan"
                  availabilityValue={localData.enrolmentPlan.availability}
                  qualityValue={localData.enrolmentPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("enrolmentPlan", value)}
                  onQualityChange={(value) => handleQualityChange("enrolmentPlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.enrolmentPlan.observation}
                  onObservationChange={(value) => handleObservationChange("enrolmentPlan", value)}
                />
                <EvaluationItem
                  id="traineeFilingSystem"
                  label="Trainee Filing System (Consider SDMS)"
                  availabilityValue={localData.traineeFilingSystem.availability}
                  qualityValue={localData.traineeFilingSystem.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("traineeFilingSystem", value)}
                  onQualityChange={(value) => handleQualityChange("traineeFilingSystem", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.traineeFilingSystem.observation}
                  onObservationChange={(value) => handleObservationChange("traineeFilingSystem", value)}
                />
                <EvaluationItem
                  id="schoolFeedingReport"
                  label="Implementation report Of School Feeding Program"
                  availabilityValue={localData.schoolFeedingReport.availability}
                  qualityValue={localData.schoolFeedingReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("schoolFeedingReport", value)}
                  onQualityChange={(value) => handleQualityChange("schoolFeedingReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.schoolFeedingReport.observation}
                  onObservationChange={(value) => handleObservationChange("schoolFeedingReport", value)}
                />
                <EvaluationItem
                  id="femaleRoom"
                  label="Operational Female Learner Room (Girls'room) and the sickbay for boarding schools"
                  availabilityValue={localData.femaleRoom.availability}
                  qualityValue={localData.femaleRoom.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("femaleRoom", value)}
                  onQualityChange={(value) => handleQualityChange("femaleRoom", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.femaleRoom.observation}
                  onObservationChange={(value) => handleObservationChange("femaleRoom", value)}
                />
                <EvaluationItem
                  id="sportsRecreationPlan"
                  label="Operational Plan For Sports and Recreation"
                  availabilityValue={localData.sportsRecreationPlan.availability}
                  qualityValue={localData.sportsRecreationPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("sportsRecreationPlan", value)}
                  onQualityChange={(value) => handleQualityChange("sportsRecreationPlan", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.sportsRecreationPlan.observation}
                  onObservationChange={(value) => handleObservationChange("sportsRecreationPlan", value)}
                />
                <EvaluationItem
                  id="sportsRecreationReport"
                  label="Implementation Report On Sports And Recreation"
                  availabilityValue={localData.sportsRecreationReport.availability}
                  qualityValue={localData.sportsRecreationReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("sportsRecreationReport", value)}
                  onQualityChange={(value) => handleQualityChange("sportsRecreationReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.sportsRecreationReport.observation}
                  onObservationChange={(value) => handleObservationChange("sportsRecreationReport", value)}
                />
              </div>
            </TabsContent>

            {/* 2.9 Training consumables management */}
            <TabsContent value="consumables" className="p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.9 Training consumables management ({localData.sectionTotals.consumablesManagement.toFixed(1)}/10
                marks)
              </h3>
              <div className="space-y-4">
                <EvaluationItem
                  id="consumableFundsRequests"
                  label="Consumable funds requests"
                  availabilityValue={localData.consumableFundsRequests.availability}
                  qualityValue={localData.consumableFundsRequests.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("consumableFundsRequests", value)}
                  onQualityChange={(value) => handleQualityChange("consumableFundsRequests", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.consumableFundsRequests.observation}
                  onObservationChange={(value) => handleObservationChange("consumableFundsRequests", value)}
                />
                <EvaluationItem
                  id="consumableTenderCommittee"
                  label="Consumable tender committee (Appointment letter)"
                  availabilityValue={localData.consumableTenderCommittee.availability}
                  qualityValue={localData.consumableTenderCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("consumableTenderCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("consumableTenderCommittee", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.consumableTenderCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("consumableTenderCommittee", value)}
                />
                <EvaluationItem
                  id="marketSurveyReport"
                  label="Consumable Market survey report"
                  availabilityValue={localData.marketSurveyReport.availability}
                  qualityValue={localData.marketSurveyReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("marketSurveyReport", value)}
                  onQualityChange={(value) => handleQualityChange("marketSurveyReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.marketSurveyReport.observation}
                  onObservationChange={(value) => handleObservationChange("marketSurveyReport", value)}
                />
                <EvaluationItem
                  id="consumableProcurementPlan"
                  label="Consumable procurement plan"
                  availabilityValue={localData.consumableProcurementPlan.availability}
                  qualityValue={localData.consumableProcurementPlan.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("consumableProcurementPlan", value)}
                  onQualityChange={(value) => handleQualityChange("consumableProcurementPlan", value)}
                  marksAllocated={1.0}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.consumableProcurementPlan.observation}
                  onObservationChange={(value) => handleObservationChange("consumableProcurementPlan", value)}
                />
                <EvaluationItem
                  id="tenderPublication"
                  label="Publication of tender"
                  availabilityValue={localData.tenderPublication.availability}
                  qualityValue={localData.tenderPublication.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tenderPublication", value)}
                  onQualityChange={(value) => handleQualityChange("tenderPublication", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.tenderPublication.observation}
                  onObservationChange={(value) => handleObservationChange("tenderPublication", value)}
                />
                <EvaluationItem
                  id="tenderEvaluationReport"
                  label="Tender evaluation report"
                  availabilityValue={localData.tenderEvaluationReport.availability}
                  qualityValue={localData.tenderEvaluationReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("tenderEvaluationReport", value)}
                  onQualityChange={(value) => handleQualityChange("tenderEvaluationReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.tenderEvaluationReport.observation}
                  onObservationChange={(value) => handleObservationChange("tenderEvaluationReport", value)}
                />
                <EvaluationItem
                  id="contracts"
                  label="Contracts"
                  availabilityValue={localData.contracts.availability}
                  qualityValue={localData.contracts.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("contracts", value)}
                  onQualityChange={(value) => handleQualityChange("contracts", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.contracts.observation}
                  onObservationChange={(value) => handleObservationChange("contracts", value)}
                />
                <EvaluationItem
                  id="purchaseOrders"
                  label="Purchase orders"
                  availabilityValue={localData.purchaseOrders.availability}
                  qualityValue={localData.purchaseOrders.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("purchaseOrders", value)}
                  onQualityChange={(value) => handleQualityChange("purchaseOrders", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.purchaseOrders.observation}
                  onObservationChange={(value) => handleObservationChange("purchaseOrders", value)}
                />
                <EvaluationItem
                  id="receivingCommittee"
                  label="Receiving committee (Appointment letter)"
                  availabilityValue={localData.receivingCommittee.availability}
                  qualityValue={localData.receivingCommittee.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("receivingCommittee", value)}
                  onQualityChange={(value) => handleQualityChange("receivingCommittee", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.receivingCommittee.observation}
                  onObservationChange={(value) => handleObservationChange("receivingCommittee", value)}
                />
                <EvaluationItem
                  id="deliveryNote"
                  label="Delivery note"
                  availabilityValue={localData.deliveryNote.availability}
                  qualityValue={localData.deliveryNote.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("deliveryNote", value)}
                  onQualityChange={(value) => handleQualityChange("deliveryNote", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.deliveryNote.observation}
                  onObservationChange={(value) => handleObservationChange("deliveryNote", value)}
                />
                <EvaluationItem
                  id="goodReceivedNote"
                  label="Good received note"
                  availabilityValue={localData.goodReceivedNote.availability}
                  qualityValue={localData.goodReceivedNote.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("goodReceivedNote", value)}
                  onQualityChange={(value) => handleQualityChange("goodReceivedNote", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.goodReceivedNote.observation}
                  onObservationChange={(value) => handleObservationChange("goodReceivedNote", value)}
                />
                <EvaluationItem
                  id="storeCardsConsumables"
                  label="Store cards"
                  availabilityValue={localData.storeCardsConsumables.availability}
                  qualityValue={localData.storeCardsConsumables.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("storeCardsConsumables", value)}
                  onQualityChange={(value) => handleQualityChange("storeCardsConsumables", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.storeCardsConsumables.observation}
                  onObservationChange={(value) => handleObservationChange("storeCardsConsumables", value)}
                />
                <EvaluationItem
                  id="mainStoreRequisition"
                  label="Consumables requisition form for the main store"
                  availabilityValue={localData.mainStoreRequisition.availability}
                  qualityValue={localData.mainStoreRequisition.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("mainStoreRequisition", value)}
                  onQualityChange={(value) => handleQualityChange("mainStoreRequisition", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.mainStoreRequisition.observation}
                  onObservationChange={(value) => handleObservationChange("mainStoreRequisition", value)}
                />
                <EvaluationItem
                  id="miniStoreRequisition"
                  label="Consumables requisition form for the mini store"
                  availabilityValue={localData.miniStoreRequisition.availability}
                  qualityValue={localData.miniStoreRequisition.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("miniStoreRequisition", value)}
                  onQualityChange={(value) => handleQualityChange("miniStoreRequisition", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.miniStoreRequisition.observation}
                  onObservationChange={(value) => handleObservationChange("miniStoreRequisition", value)}
                />
                <EvaluationItem
                  id="monthlyInventoryReport"
                  label="Monthly inventory report"
                  availabilityValue={localData.monthlyInventoryReport.availability}
                  qualityValue={localData.monthlyInventoryReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("monthlyInventoryReport", value)}
                  onQualityChange={(value) => handleQualityChange("monthlyInventoryReport", value)}
                  marksAllocated={1.0}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.monthlyInventoryReport.observation}
                  onObservationChange={(value) => handleObservationChange("monthlyInventoryReport", value)}
                />
                <EvaluationItem
                  id="consumablesUtilizationReport"
                  label="Consumables Utilization report"
                  availabilityValue={localData.consumablesUtilizationReport.availability}
                  qualityValue={localData.consumablesUtilizationReport.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("consumablesUtilizationReport", value)}
                  onQualityChange={(value) => handleQualityChange("consumablesUtilizationReport", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.consumablesUtilizationReport.observation}
                  onObservationChange={(value) => handleObservationChange("consumablesUtilizationReport", value)}
                />
                <EvaluationItem
                  id="remainingBalance"
                  label="Availability of remaining balance from 2023/2024"
                  availabilityValue={localData.remainingBalance.availability}
                  qualityValue={localData.remainingBalance.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("remainingBalance", value)}
                  onQualityChange={(value) => handleQualityChange("remainingBalance", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isQualityNA={true}
                  observation={localData.remainingBalance.observation}
                  onObservationChange={(value) => handleObservationChange("remainingBalance", value)}
                />
                <EvaluationItem
                  id="bestPractices"
                  label="Availability of consumable best practices"
                  availabilityValue={localData.bestPractices.availability}
                  qualityValue={localData.bestPractices.quality}
                  onAvailabilityChange={(value) => handleAvailabilityChange("bestPractices", value)}
                  onQualityChange={(value) => handleQualityChange("bestPractices", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  isAvailabilityNA={true}
                  observation={localData.bestPractices.observation}
                  onObservationChange={(value) => handleObservationChange("bestPractices", value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">Total marks for School Operational Management:</span>
          <span className="text-xl font-bold text-blue-800">{localData.totalMarks.toFixed(1)} / 30</span>
        </div>
      </div>
    </div>
  )
}

