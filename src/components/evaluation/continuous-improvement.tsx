import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvaluationItemWithWeights from "./evaluation-item";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";

interface ContinuousImprovementProps {
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
  // 5.1 Professionalism
  cpdPlan: EvaluationField;
  cpdReports: EvaluationField;
  ethicalRecord: EvaluationField;
  roleModeling: EvaluationField;
  feedbackMechanisms: EvaluationField;
  actionPlans: EvaluationField;
  implementedImprovements: EvaluationField;

  // 5.2 Performance Metrics
  kpis: EvaluationField;
  dataDecisions: EvaluationField;
  improvementRecords: EvaluationField;
  
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

export default function ContinuousImprovement({
  formData,
  updateFormData,
  updateSectionMarks,
}: ContinuousImprovementProps) {
  const defaultData = {
    // 5.1 Professionalism
    cpdPlan: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "CPD plan",
    },
    cpdReports: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "CPD implementation reports",
    },
    ethicalRecord: {
      ...defaultEvaluation,
      label: "Free ethical record",
    },
    roleModeling: {
      ...defaultEvaluation,
      label: "Positive role modeling in professional settings",
    },
    feedbackMechanisms: {
      ...defaultEvaluation,
      label: "Staff feedback mechanisms",
    },
    actionPlans: {
      ...defaultEvaluation,
      label: "Action plans based on feedback",
    },
    implementedImprovements: {
      ...defaultEvaluation,
      label: "Implemented improvements",
    },

    // 5.2 Performance Metrics
    kpis: {
      ...defaultEvaluation,
      label: "Documented KPIs or Performance review",
    },
    dataDecisions: {
      ...defaultEvaluation,
      label: "Evidence of data-driven decisions",
    },
    improvementRecords: {
      ...defaultEvaluation,
      label: "Records of implemented improvements",
    },

    overview: {
      strength: "",
      weakness: "",
      improvement: "",
    },
    sectionMarks: {
      totalMarks: 0,
      weight: 10,
    },
  };

  const getInitialData = (): LocalData => {
    try {
      const storedData = localStorage.getItem("survey_draft");
      if (!storedData) return defaultData;

      const parsedData = JSON.parse(storedData);
      if (!parsedData || !parsedData.continuousImprovement || Object.keys(parsedData.continuousImprovement).length === 0) {
        return defaultData;
      }

      return parsedData.continuousImprovement;
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

    return Math.min(totalMarks, 10);
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
      <Tabs defaultValue="professionalism" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="professionalism">5.1 Professionalism</TabsTrigger>
          <TabsTrigger value="metrics">5.2 Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="professionalism">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">5.1 Professionalism (7 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(0, 7)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">5.2 Performance Metrics (3 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(7, 10)}
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
            Total marks for Continuous Improvement:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 10
          </span>
        </div>
      </div>
    </div>
  );
}