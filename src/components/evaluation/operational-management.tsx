"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvaluationItemWithWeights from "./evaluation-item";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";
import useAuth from "@/hooks/useAuth";

interface OperationalManagementProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateSectionMarks: (marks: number) => void;
  schoolType: "day" | "boarding" | null;
}

interface EvaluationField {
  availability: number;
  quality: number;
  observation: string;
  label: string;
  marksAllocated: number;
}

interface LocalData {
  // School Committee Governance
  sec: EvaluationField;
  feedingCommittee: EvaluationField;
  secMinutes: EvaluationField;
  sgaMinutes: EvaluationField;

  // Procedures and Communication
  organigram: EvaluationField;
  managementMeeting: EvaluationField;
  pedagogicalMeeting: EvaluationField;
  studentsMeeting: EvaluationField;
  staffMeeting: EvaluationField;
  suggestionBox: EvaluationField;

  // Staff Management
  workPerformance: EvaluationField;
  performanceEvaluation: EvaluationField;
  staffFile: EvaluationField;
  tmiRegistration: EvaluationField;
  sdmsRecord: EvaluationField;
  staffAttendance: EvaluationField;
  monthlyPayroll: EvaluationField;
  capacityBuildingPlan: EvaluationField;
  capacityBuildingReport: EvaluationField;
  disciplinaryCommittee: EvaluationField;

  // Financial Management
  operationalBudget: EvaluationField;
  financialReports: EvaluationField;
  auditReports: EvaluationField;

  // Procurement Management
  procurementPlan: EvaluationField;
  tenderCommitteeReports: EvaluationField;
  tenderDocuments: EvaluationField;

  // Estate Management
  infrastructureInventory: EvaluationField;
  infrastructureMaintenance: EvaluationField;
  wasteManagement: EvaluationField;

  // Asset Management
  storeCards: EvaluationField;
  requisitionForms: EvaluationField;
  equipmentInventory: EvaluationField;
  maintenancePlan: EvaluationField;
  maintenanceReport: EvaluationField;

  // Student Management
  enrolmentPlan: EvaluationField;
  traineeFiling: EvaluationField;
  feedingProgram: EvaluationField;
  femaleRoom: EvaluationField;
  sportsRecreationPlan: EvaluationField;
  sportsRecreationReport: EvaluationField;

  // Training Consumables Management
  consumableFunds: EvaluationField;
  consumableTender: EvaluationField;
  marketSurvey: EvaluationField;
  consumableProcurement: EvaluationField;
  tenderPublication: EvaluationField;
  tenderEvaluation: EvaluationField;
  contracts: EvaluationField;
  purchaseOrders: EvaluationField;
  receivingCommittee: EvaluationField;
  deliveryNote: EvaluationField;
  goodsReceivedNote: EvaluationField;
  consumableStoreCards: EvaluationField;
  mainStoreRequisition: EvaluationField;
  miniStoreRequisition: EvaluationField;
  monthlyInventory: EvaluationField;
  utilizationReport: EvaluationField;
  remainingBalance: EvaluationField;
  bestPractices: EvaluationField;

  overview: {
    strength: string;
    weakness: string;
    improvement: string;
  };
  sectionMarks: {
    totalMarks: number;
    weight: number;
  };
  [key: string]: any;
}

const defaultEvaluation: EvaluationField = {
  availability: EvaluationItemWeights.NOT_SELECTED,
  quality: EvaluationItemWeights.NOT_SELECTED,
  observation: "",
  label: "",
  marksAllocated: 0.5,
};

export default function OperationalManagement({
  formData,
  updateFormData,
  updateSectionMarks,
  schoolType,
}: OperationalManagementProps) {
  const defaultData = 
  {
   // School Committee Governance
   sec: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Availability Of School Executive Committee (SEC)",
   },
   feedingCommittee: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Availablity Of School Feeding Committee",
   },
   secMinutes: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "At least 1 minutes Of School Executive Committee meeting per term",
   },
   sgaMinutes: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "One minutes Of School General Assembly (SGA) meeting per year",
   },

   // Procedures and Communication
   organigram: {
     ...defaultEvaluation,
     label: "School organigram available and published",
   },
   managementMeeting: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "School Management Meeting per month (At least one minutes)",
   },
   pedagogicalMeeting: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "At least 6 Minutes Of School Pedagogical Meeting Per Year",
   },
   studentsMeeting: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "At least 1 minutes of meetings Between School Administration And Students Per Term",
   },
   staffMeeting: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "At Least 2 Minutes Of Meeting Between School Administration And Supporting Staff Per Month",
   },
   suggestionBox: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Suggestion Box",
   },

   // Staff Management
   workPerformance: {
     ...defaultEvaluation,
     label: "Work Performance Contract",
   },
   performanceEvaluation: {
     ...defaultEvaluation,
     label: "Performance Evaluation Report",
   },
   staffFile: {
     ...defaultEvaluation,
     label: "Staff File",
   },
   tmiRegistration: {
     ...defaultEvaluation,
     label: "Registration of all staff in TMIS",
   },
   sdmsRecord: {
     ...defaultEvaluation,
     label: "Record of all staff information in SDMS",
   },
   staffAttendance: {
     ...defaultEvaluation,
     label: "Staff Attendance Records",
   },
   monthlyPayroll: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Monthly Payroll",
   },
   capacityBuildingPlan: {
     ...defaultEvaluation,
     label: "Staff Capacity Building Plan",
   },
   capacityBuildingReport: {
     ...defaultEvaluation,
     label: "Implementation Report of Staff Capacity Building",
   },
   disciplinaryCommittee: {
     ...defaultEvaluation,
     label: "Staff Disciplinary Committee/Reports",
   },

   // Financial Management
   operationalBudget: {
     ...defaultEvaluation,
     label: "Operational Budget Plan",
   },
   financialReports: {
     ...defaultEvaluation,
     label: "Monthly, Termly Financial Report and Annual Financial Report",
   },
   auditReports: {
     ...defaultEvaluation,
     label: "Internal Audit Reports",
   },

   // Procurement Management
   procurementPlan: {
     ...defaultEvaluation,
     label: "Procurement Plan",
   },
   tenderCommitteeReports: {
     ...defaultEvaluation,
     label: "Tender Committee Reports",
   },
   tenderDocuments: {
     ...defaultEvaluation,
     label: "Tender Documents",
   },

   // Estate Management
   infrastructureInventory: {
     ...defaultEvaluation,
     label: "Annual-Based Inventory Reports For Infrastructure",
   },
   infrastructureMaintenance: {
     ...defaultEvaluation,
     label: "Annual Maintenance And Safety Report of Infrastructure",
   },
   wasteManagement: {
     ...defaultEvaluation,
     label: "Waste Management Mechanism",
   },

   // Asset Management
   storeCards: {
     ...defaultEvaluation,
     label: "Store Cards",
   },
   requisitionForms: {
     ...defaultEvaluation,
     label: "Store Requisition Forms",
   },
   equipmentInventory: {
     ...defaultEvaluation,
     label: "Term-Based Inventory Reports Of Equipment And Materials",
   },
   maintenancePlan: {
     ...defaultEvaluation,
     label: "Term-Based Maintenance And Safety Plan",
   },
   maintenanceReport: {
     ...defaultEvaluation,
     label: "Term-Based Maintenance And Safety Report",
   },

   // Student Management
   enrolmentPlan: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Enrolment Plan",
   },
   traineeFiling: {
     ...defaultEvaluation,
     label: "Trainee Filing System (Consider SDMS)",
   },
   feedingProgram: {
     ...defaultEvaluation,
     label: "Implementation report Of School Feeding Program",
   },
   femaleRoom: {
     ...defaultEvaluation,
     label: "Operational Female Learner Room",
   },
   sportsRecreationPlan: {
     ...defaultEvaluation,
     label: "Operational Plan for Sports and Recreation",
   },
   sportsRecreationReport: {
     ...defaultEvaluation,
     label: "Implementation Report On Sports And Recreation",
   },

   // Training Consumables Management
   consumableFunds: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Consumable Funds requests",
     marksAllocated: 0.5,
   },
   consumableTender: {
     ...defaultEvaluation,
     label: "Consumable Tender committee",
   },
   marketSurvey: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Consumable Market Survey report",
   },
   consumableProcurement: {
     ...defaultEvaluation,
     label: "Consumable Procurement plan",
     marksAllocated: 1,
   },
   tenderPublication: {
     ...defaultEvaluation,
     label: "Publication of Tender",
   },
   tenderEvaluation: {
     ...defaultEvaluation,
     label: "Tender Evaluation Report",
   },
   contracts: {
     ...defaultEvaluation,
     label: "Contracts",
   },
   purchaseOrders: {
     ...defaultEvaluation,
     label: "Purchase Orders",
   },
   receivingCommittee: {
     ...defaultEvaluation,
     label: "Receiving Committee",
   },
   deliveryNote: {
     ...defaultEvaluation,
     label: "Delivery Note",
   },
   goodsReceivedNote: {
     ...defaultEvaluation,
     label: "Goods Received Note",
   },
   consumableStoreCards: {
     ...defaultEvaluation,
     label: "Store Cards",
   },
   mainStoreRequisition: {
     ...defaultEvaluation,
     label: "Consumables requisition form for the main store",
   },
   miniStoreRequisition: {
     ...defaultEvaluation,
     label: "Consumables requisition form for the mini store",
   },
   monthlyInventory: {
     ...defaultEvaluation,
     label: "Monthly Inventory report",
     marksAllocated: 1,
   },
   utilizationReport: {
     ...defaultEvaluation,
     label: "Consumables Utilization report",
   },
   remainingBalance: {
     ...defaultEvaluation,
     quality: EvaluationItemWeights.NOT_APPLICABLE,
     label: "Availability of remaining balance from 2023/2024",
   },
   bestPractices: {
     ...defaultEvaluation,
     label: "Availability of consumable best practices",
   },

   overview: {
     strength: "",
     weakness: "",
     improvement: "",
   },
   sectionMarks: {
     totalMarks: 0,
     weight: 30,
   },
 };
  const getInitialData = (): LocalData => {
    try {
      const storedData = localStorage.getItem(`survey_draft_${localStorage.getItem('currentEvaluationSchool')}`);
      if (!storedData) return defaultData;

      const parsedData = JSON.parse(storedData);
      if (!parsedData || !parsedData.operationalManagement || Object.keys(parsedData.operationalManagement).length === 0) {
        return defaultData;
      }

      return parsedData.operationalManagement;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return defaultData;
    }
  };

  const [localData, setLocalData] = useState<LocalData>(getInitialData());
  const initialRender = useRef(true);
  const prevMarks = useRef(0);
  const { user } = useAuth();

  const calculateTotalMarks = (data: LocalData): number => {
    let totalMarks = 0;

     Object.keys(data).forEach((key) => {
          const item = data[key as keyof LocalData];
      
          if (typeof item === "object" && "marksAllocated" in item) {
            if (item.quality !== EvaluationItemWeights.NOT_APPLICABLE) {
              totalMarks += item.quality ?? 0; // Ensure undefined doesn't cause issues
            } 
            if (item.availability !== EvaluationItemWeights.NOT_APPLICABLE) { 
              totalMarks += item.availability ?? 0; // Correctly add availability when applicable
            }
          }
        });

    return Math.min(totalMarks, 30);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const currentMarks = calculateTotalMarks(localData);
    setLocalData((prevData) => ({
      ...prevData,
      sectionMarks: {
        ...prevData.sectionMarks,
        totalMarks : currentMarks
      },
    }));
    if (currentMarks !== prevMarks.current) {
      prevMarks.current = currentMarks;
      updateSectionMarks(currentMarks);
    }
   
    updateFormData(localData);
  }, [localData, updateFormData, updateSectionMarks]);

  // useEffect(() => {
  //   const localData = localStorage.getItem(`survey_draft`);
  //   console.log(JSON.parse(localData));
  // }, []);

  const handleAvailabilityChange = (baseId: keyof LocalData, availabilityValue: any) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        availability: availabilityValue,
      },
    }));
  };

  const handleQualityChange = (baseId: keyof LocalData, qualityValue: any) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        quality: qualityValue,
      },
    }));
  };

  const handleObservationChange = (baseId: keyof LocalData, observationValue: string) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        observation: observationValue,
      },
    }));
  };

  const renderEvaluationItems = (startIndex: number, endIndex: number) => {
    return Object.entries(localData)
      .filter(([_, value]) => typeof value === "object" && value !== null && "label" in value)
      .slice(startIndex, endIndex)
      .map(([key, value]) => (
        <EvaluationItemWithWeights
          key={key}
          id={key}
          label={value.label}
          availabilityValue={value.availability}
          qualityValue={value.quality}
          onAvailabilityChange={handleAvailabilityChange}
          onQualityChange={handleQualityChange}
          isAvailabilityNA={value.availability === EvaluationItemWeights.NOT_APPLICABLE}
          isQualityNA={value.quality === EvaluationItemWeights.NOT_APPLICABLE}
          marksAllocated={value.marksAllocated}
          qualityWeight="60%"
          availabilityWeight="40%"
          observation={value.observation}
          onObservationChange={(value) => handleObservationChange(key, value)}
        />
      ));
  };

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
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.1 School Committee Governance (2 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(0, 4)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.2 Procedures and Communication (3 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(4, 10)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.3 Staff Management (5 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(10, 20)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.4 Financial Management (1.5 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(20, 23)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procurement">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.5 Procurement Management (1.5 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(23, 26)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estate">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.6 Estate Management (1.5 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(26, 29)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="asset">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.7 Asset Management (2.5 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(29, 34)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                2.8 Student Management (3 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(34, 40)}
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
                {renderEvaluationItems(40, 58)}
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
                value={localData.overview.strength}
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, strength: e.target.value },
                  }))
                }
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
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, weakness: e.target.value },
                  }))
                }
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
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    overview: { ...prev.overview, improvement: e.target.value },
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">
            Total marks for Operational Management:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 30
          </span>
        </div>
      </div>
    </div>
  );
}