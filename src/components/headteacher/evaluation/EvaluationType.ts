// Shared types for evaluation components

export interface EvaluationField {
  availability: number
  quality: number
  observation: string
}

export interface SectionMarks {
  totalMarks: number
  weight: number
}

export interface OverviewData {
  strength: string
  weakness: string
  improvement: string
}

// Strategic Planning data structure
export interface StrategicPlanningData {
  strategicPlan: EvaluationField
  schoolVision: EvaluationField
  schoolMission: EvaluationField
  organizationalStructure: EvaluationField
  operationalBudget: EvaluationField
  annualBudgetPlan: EvaluationField
  procurementPlan: EvaluationField
  businessPlan: EvaluationField
  tenderCommittee: EvaluationField
  overview: OverviewData
  sectionMarks: SectionMarks
  totalMarks: number
}

// Operational Management data structure
export interface OperationalManagementData {
  // 2.1 School Committee Governance
  schoolExecutiveCommittee: EvaluationField
  schoolFeedingCommittee: EvaluationField
  minutesOfSEC: EvaluationField
  minutesOfSGA: EvaluationField

  // 2.2 Procedures and Communication
  schoolOrganigram: EvaluationField
  minutesOfSMC: EvaluationField
  minutesOfPedagogical: EvaluationField
  minutesWithStudents: EvaluationField
  minutesWithStaff: EvaluationField
  suggestionBox: EvaluationField

  // 2.3 Staff Management
  workPerformanceContract: EvaluationField
  performanceEvaluation: EvaluationField
  staffFile: EvaluationField
  tmisRegistration: EvaluationField
  sdmsRecord: EvaluationField
  staffAttendance: EvaluationField
  monthlyPayroll: EvaluationField
  staffCapacityPlan: EvaluationField
  capacityBuildingReport: EvaluationField
  disciplinaryCommittee: EvaluationField

  // 2.4 Financial management
  operationalBudgetPlan: EvaluationField
  financialReports: EvaluationField
  internalAuditReports: EvaluationField

  // 2.5 Procurement Management
  procurementPlan: EvaluationField
  tenderCommitteeReports: EvaluationField
  tenderDocuments: EvaluationField

  // 2.6 Estate Management
  infrastructureInventory: EvaluationField
  infrastructureMaintenance: EvaluationField
  wasteManagement: EvaluationField

  // 2.7 Asset Management
  storeCards: EvaluationField
  storeRequisitionForms: EvaluationField
  equipmentInventory: EvaluationField
  maintenancePlan: EvaluationField
  maintenanceReport: EvaluationField

  // 2.8 Student Management
  enrolmentPlan: EvaluationField
  traineeFilingSystem: EvaluationField
  schoolFeedingReport: EvaluationField
  femaleRoom: EvaluationField
  sportsRecreationPlan: EvaluationField
  sportsRecreationReport: EvaluationField

  // 2.9 Training consumables management
  consumableFundsRequests: EvaluationField
  consumableTenderCommittee: EvaluationField
  marketSurveyReport: EvaluationField
  consumableProcurementPlan: EvaluationField
  tenderPublication: EvaluationField
  tenderEvaluationReport: EvaluationField
  contracts: EvaluationField
  purchaseOrders: EvaluationField
  receivingCommittee: EvaluationField
  deliveryNote: EvaluationField
  goodReceivedNote: EvaluationField
  storeCardsConsumables: EvaluationField
  mainStoreRequisition: EvaluationField
  miniStoreRequisition: EvaluationField
  monthlyInventoryReport: EvaluationField
  consumablesUtilizationReport: EvaluationField
  remainingBalance: EvaluationField
  bestPractices: EvaluationField

  // Section totals
  sectionTotals: {
    governance: number
    procedures: number
    staffManagement: number
    financialManagement: number
    procurementManagement: number
    estateManagement: number
    assetManagement: number
    studentManagement: number
    consumablesManagement: number
  }

  // Total marks
  totalMarks: number

  // Overview
  overview: OverviewData
}

// Form data structure for the entire survey
export interface HeadteacherSurveyData {
  school: {
    name: string
    district: string
    sector: string
    category: string
  }
  headteacher: {
    name: string
    contact: string
    email: string
    experienceEducation: string
    experienceCurrentSchool: string
  }
  strategicPlanning: StrategicPlanningData
  operationalManagement: OperationalManagementData
  // Other sections will be added here
  teachingLearning: TeachingLearningData
  stakeholdersEngagement: StakeholdersEngagementData
  continuousImprovement: ContinuousImprovementData
  hygieneAndSafety: HygieneAndSafetyData
}

// Teaching and Learning data structure
export interface TeachingLearningData {
  cbtCba: {
    validatedCBC: EvaluationField
    guidingDocuments: EvaluationField
  }
  trainingPlanning: {
    validatedChronogram: EvaluationField
    trainingTimetable: EvaluationField
    trainerPortfolios: EvaluationField
    pedagogicalDocuments: EvaluationField
    iapPlan: EvaluationField
    iapCompletionReports: EvaluationField
  }
  cbaImplementation: {
    assessmentPlans: EvaluationField
    traineePortfolio: EvaluationField
    attendanceReports: EvaluationField
    sessionDeliveryReports: EvaluationField
    portfolioVerificationReports: EvaluationField
    assessmentMonitoringReports: EvaluationField
  }
  technologicalTools: {
    digitalTools: EvaluationField
    feedbackOnTechnology: EvaluationField
    evidenceOfImprovedEfficiency: EvaluationField
  }
  overview: {
    strengths: string
    weaknesses: string
    areasOfImprovement: string
  }
  totalMarks: number
}

// Stakeholders Engagement data structure
export interface StakeholdersEngagementData {
  partnershipDevelopment: {
    mous: EvaluationField
    employersFeedback: EvaluationField
    trainingAdjustments: EvaluationField
  }
  communityAlumniEngagement: {
    meetingRecords: EvaluationField
    minutesOfMeeting: EvaluationField
    graduateFilingSystem: EvaluationField
    alumniRecords: EvaluationField
  }
  adaptabilityToTrends: {
    industryEngagement: EvaluationField
    trainingRelevanceFeedback: EvaluationField
    staffTrainingSessions: EvaluationField
  }
  relationshipWithSubordinates: {
    subordinatesFeedback: EvaluationField
    conflictResolutionRecords: EvaluationField
  }
  overview: {
    strengths: string
    weaknesses: string
    areasOfImprovement: string
  }
  totalMarks: number
}

// Continuous Improvement data structure
export interface ContinuousImprovementData {
  professionalism: {
    cpdPlan: EvaluationField
    cpdImplementationReports: EvaluationField
    freeEthicalRecord: EvaluationField
    positiveRoleModeling: EvaluationField
    staffFeedbackMechanisms: EvaluationField
    actionPlansBasedOnFeedback: EvaluationField
    implementedImprovements: EvaluationField
  }
  performanceMetrics: {
    documentedKPIs: EvaluationField
    evidenceOfDataDrivenDecisions: EvaluationField
    recordsOfImplementedImprovements: EvaluationField
  }
  overview: {
    strengths: string
    weaknesses: string
    areasOfImprovement: string
  }
  totalMarks: number
}

// Hygiene and Safety data structure
export interface HygieneAndSafetyData {
  administrationBlock: {
    staffOffices: EvaluationField
    meetingRooms: EvaluationField
    accessibility: EvaluationField
    emergencyExits: EvaluationField
    ventilationLighting: EvaluationField
  }
  classroomBlock: {
    capacity: EvaluationField
    desksChairs: EvaluationField
    ventilationLighting: EvaluationField
    emergencyExits: EvaluationField
  }
  computerLab: {
    functionalComputers: EvaluationField
    internetAccess: EvaluationField
    workstationSetup: EvaluationField
    accessibility: EvaluationField
  }
  library: {
    booksResources: EvaluationField
    studyArea: EvaluationField
    conditionOfBooks: EvaluationField
    computers: EvaluationField
  }
  kitchen: {
    healthSafetyCompliance: EvaluationField
    foodStorage: EvaluationField
    sanitationFacilities: EvaluationField
  }
  refectory: {
    tablesSeating: EvaluationField
    cleanlinessHygiene: EvaluationField
    ventilation: EvaluationField
    wasteDisposal: EvaluationField
  }
  dormitories: {
    spacePrivacy: EvaluationField
    cleanlinessArrangement: EvaluationField
    fireSafety: EvaluationField
  }
  washrooms: {
    cleanlinessSupplies: EvaluationField
    privacySafety: EvaluationField
    accessibility: EvaluationField
  }
  playgrounds: {
    safetyOfEquipment: EvaluationField
    shadedAreas: EvaluationField
  }
  schoolGarden: {
    healthSafetyOfPlants: EvaluationField
    accessibility: EvaluationField
    educationalUse: EvaluationField
  }
  workshops: {
    toolsMachinery: EvaluationField
    ventilationSafety: EvaluationField
    storeArrangement: EvaluationField
    cleanliness: EvaluationField
  }
  overview: {
    strengths: string
    weaknesses: string
    areasOfImprovement: string
  }
  totalMarks: number
}

// Results summary data structure
export interface ResultsSummaryData {
  strategicPlanning: {
    marks: number
    qualityLevel: string
  }
  operationalManagement: {
    marks: number
    qualityLevel: string
  }
  teachingLearning: {
    marks: number
    qualityLevel: string
  }
  stakeholdersEngagement: {
    marks: number
    qualityLevel: string
  }
  continuousImprovement: {
    marks: number
    qualityLevel: string
  }
  hygieneAndSafety: {
    marks: number
    qualityLevel: string
  }
  totalMarksObtained: number
  weightOfAvailability: number
  weightOfQuality: number
  totalWeight: number
  overallQualityLevel: string
}

