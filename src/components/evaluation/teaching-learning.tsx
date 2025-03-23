import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvaluationItemWithWeights from "./evaluation-item";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";

interface TeachingLearningProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateSectionMarks: (marks: number) => void;
}

interface EvaluationField {
  availability: number;
  quality: number;
  observation: string;
  label: string;
  marksAllocated: number;
}

interface LocalData {
  // 3.1 CBT/CBA
  cbc: EvaluationField;
  guidingDocuments: EvaluationField;

  // 3.2 Training planning and delivery
  chronogram: EvaluationField;
  timetable: EvaluationField;
  trainerPortfolios: EvaluationField;
  pedagogicalDocuments: EvaluationField;
  iapPlan: EvaluationField;
  iapReports: EvaluationField;

  // 3.3 CBA implementation
  assessmentPlans: EvaluationField;
  traineePortfolio: EvaluationField;
  attendanceReports: EvaluationField;
  deliveryMonitoring: EvaluationField;
  portfolioVerification: EvaluationField;
  assessmentMonitoring: EvaluationField;

  // 3.4 Use of technological tools
  digitalTools: EvaluationField;
  techFeedback: EvaluationField;
  efficiencyEvidence: EvaluationField;

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
  marksAllocated: 1,
};

export default function TeachingLearning({
  formData,
  updateFormData,
  updateSectionMarks,
}: TeachingLearningProps) {
  const defaultData = {
    // 3.1 CBT/CBA
    cbc: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "Validated Competence Based Curriculum (CBC)",
    },
    guidingDocuments: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "Guiding Documents regarding CBT/CBA Implementation",
    },

    // 3.2 Training planning and delivery
    chronogram: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "Validated Chronogram",
    },
    timetable: {
      ...defaultEvaluation,
      label: "Training Timetable",
      marksAllocated: 2,
    },
    trainerPortfolios: {
      ...defaultEvaluation,
      label: "Trainer Portfolios",
    },
    pedagogicalDocuments: {
      ...defaultEvaluation,
      label: "Pedagogical documents",
    },
    iapPlan: {
      ...defaultEvaluation,
      label: "Industrial Attachment Program (IAP) Plan",
      marksAllocated: 2,
    },
    iapReports: {
      ...defaultEvaluation,
      label: "IAP Completion Reports",
    },

    // 3.3 CBA implementation
    assessmentPlans: {
      ...defaultEvaluation,
      label: "Assessment Plans",
      marksAllocated: 2,
    },
    traineePortfolio: {
      ...defaultEvaluation,
      label: "Trainee Portfolio",
    },
    attendanceReports: {
      ...defaultEvaluation,
      label: "Attendance Reports",
    },
    deliveryMonitoring: {
      ...defaultEvaluation,
      label: "Session Delivery Monitoring Reports",
    },
    portfolioVerification: {
      ...defaultEvaluation,
      label: "Portfolio Verification Reports",
    },
    assessmentMonitoring: {
      ...defaultEvaluation,
      label: "Assessment Monitoring Reports",
    },

    // 3.4 Use of technological tools
    digitalTools: {
      ...defaultEvaluation,
      label: "Digital tools",
    },
    techFeedback: {
      ...defaultEvaluation,
      label: "Feedback from staff and students on technology use",
    },
    efficiencyEvidence: {
      ...defaultEvaluation,
      label: "Evidence of improved efficiency",
    },

    overview: {
      strength: "",
      weakness: "",
      improvement: "",
    },
    sectionMarks: {
      totalMarks: 0,
      weight: 20,
    },
  };

  const getInitialData = (): LocalData => {
    try {
      const storedData = localStorage.getItem("survey_draft");
      if (!storedData) return defaultData;

      const parsedData = JSON.parse(storedData);
      if (!parsedData || !parsedData.teachingLearning || Object.keys(parsedData.teachingLearning).length === 0) {
        return defaultData;
      }

      return parsedData.teachingLearning;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return defaultData;
    }
  };

  const [localData, setLocalData] = useState<LocalData>(getInitialData());
  const initialRender = useRef(true);
  const prevMarks = useRef(0);

  const calculateTotalMarks = (data: LocalData): number => {
    let totalMarks = 0;

    Object.keys(data).forEach((key) => {
      const item = data[key as keyof LocalData];
      
      if (typeof item === "object" && "marksAllocated" in item) {
        if (item.quality !== EvaluationItemWeights.NOT_APPLICABLE) {
          totalMarks += item.quality ?? 0;
        } 
        if (item.availability !== EvaluationItemWeights.NOT_APPLICABLE) {
          totalMarks += item.availability ?? 0;
        }
      }
    });

    return Math.min(totalMarks, 20);
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

  const handleAvailabilityChange = (baseId: keyof LocalData, availabilityValue: number) => {
    setLocalData((prevData) => ({
      ...prevData,
      [baseId]: {
        ...prevData[baseId],
        availability: availabilityValue,
      },
    }));
  };

  const handleQualityChange = (baseId: keyof LocalData, qualityValue: number) => {
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
                {renderEvaluationItems(0, 2)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.2 Training planning and delivery (8 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(2, 8)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.3 CBA implementation (7 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(8, 14)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">3.4 Use of technological tools (3 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(14, 17)}
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
                value={localData.overview.strength ?? ""}
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
                value={localData.overview.weakness ?? ""}
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
                value={localData.overview.improvement ?? ""}
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
            Total marks for Teaching and Learning:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 20
          </span>
        </div>
      </div>
    </div>
  );
}