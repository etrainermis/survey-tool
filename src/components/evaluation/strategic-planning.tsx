"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvaluationItemWithWeights from "./evaluation-item";
import { EvaluationType } from "./common/evaluation-item-type";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";
import useAuth from "@/hooks/useAuth";
import { parse } from "path";

interface StrategicPlanningProps {
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
  //strategic planning
  schoolVision: EvaluationField;
  schoolMission: EvaluationField;
  organizationalStructure: EvaluationField;
  operationalBudget: EvaluationField;
  //Annual budget
  annualBudgetPlan: EvaluationField;
  procurementPlan: EvaluationField;
  businessPlan: EvaluationField;
  tenderCommittee: EvaluationField;

  strategicPlan: EvaluationField;
  overview: {
    strength: string;
    weakness: string;
    improvement: string;
  };
  sectionMarks: {
    totalMarks: number;
    weight: number;
  };
  // Spread any additional data from formData if necessary
  [key: string]: any;
}

const defaultEvaluation: EvaluationField = {
  availability: EvaluationItemWeights.NOT_SELECTED,
  quality: EvaluationItemWeights.NOT_SELECTED,
  observation: "",
  label: "",
  marksAllocated: 1,
};

export default function StrategicPlanning({
  formData,
  updateFormData,
  updateSectionMarks,
}: StrategicPlanningProps) {
  const defaultData = 
  {
      strategicPlan: {
        availability: EvaluationItemWeights.NOT_SELECTED,
        quality: EvaluationItemWeights.NOT_APPLICABLE,
        observation: "",
        label: "Approved Strategic plan (Signed by the right authority)",
        marksAllocated: 2,
      },
      schoolVision: {
        availability: EvaluationItemWeights.NOT_APPLICABLE,
        quality: EvaluationItemWeights.NOT_SELECTED,
        observation: "",
        label: "School Vision",
        marksAllocated: 1,
      },
      schoolMission: {
        availability: EvaluationItemWeights.NOT_APPLICABLE,
        quality: EvaluationItemWeights.NOT_SELECTED,
        observation: "",
        label: "School mission",
        marksAllocated: 1,
      },
      organizationalStructure: {
        availability: EvaluationItemWeights.NOT_APPLICABLE,
        quality: EvaluationItemWeights.NOT_SELECTED,
        observation: "",
        label: "Organizational structure",
        marksAllocated: 1,
      },
      operationalBudget: {
        availability: EvaluationItemWeights.NOT_APPLICABLE,
        quality: EvaluationItemWeights.NOT_SELECTED,
        observation: "",
        label: "Operational budget",
        marksAllocated: 1,
      },
      annualBudgetPlan: {
        ...defaultEvaluation,
        label: "Approved annual budget and plan",
      },
      procurementPlan: {
        ...defaultEvaluation,
        label: "Approved procurement plan",
      },
      businessPlan: {
        ...defaultEvaluation,
        label: "Business Plan for production unit",
      },
      tenderCommittee: {
        ...defaultEvaluation,
        label:
          "Tender and receiving committee appointed (Valid appointment letter)",
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
      // console.log(parsedData);
      
      if (!parsedData || !parsedData.strategicPlanning || Object.keys(parsedData.strategicPlanning).length === 0) {
        return defaultData;
      }
      // console.log("heree");
      
      return parsedData.strategicPlanning;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return defaultData;
    }
  };
  

  // Initialize state with data from localStorage (if available)
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

    return totalMarks;
  };



  const calculateMarks = () => {
    let total = 0;

    // Helper function to calculate marks for an item
    const calculateItemMarks = (baseId, marksAllocated) => {
      const availabilityValue = localData[`${baseId}Availability`];
      const qualityValue = localData[`${baseId}Quality`];

      // If quality is N/A, only consider availability
      if (qualityValue === "na") {
        return availabilityValue === "yes" ? marksAllocated : 0;
      }

      // If availability is N/A, only consider quality
      if (availabilityValue === "na") {
        return qualityValue === "yes" ? marksAllocated : 0;
      }

      // Calculate partial marks based on availability (40%) and quality (60%)
      let marks = 0;
      if (availabilityValue === "yes") {
        marks += marksAllocated * 0.4;
      }
      if (qualityValue === "yes") {
        marks += marksAllocated * 0.6;
      }

      return marks;
    };

    // Strategic Planning (6 marks)
    total += calculateItemMarks("strategicPlan", 2);
    total += calculateItemMarks("schoolVision", 1);
    total += calculateItemMarks("schoolMission", 1);
    total += calculateItemMarks("organizationalStructure", 1);
    total += calculateItemMarks("operationalBudget", 1);

    // Annual budget and Procurement plan (4 marks)
    total += calculateItemMarks("annualBudgetPlan", 1);
    total += calculateItemMarks("procurementPlan", 1);
    total += calculateItemMarks("businessPlan", 1);
    total += calculateItemMarks("tenderCommittee", 1);

    // Cap at 10 marks maximum
    return Math.min(total, 10);
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

  const handleChange = (field: string, value: any) => {
    setLocalData((prev) => {
      if (prev[field] !== value) {
        return { ...prev, [field]: value };
      }
      return prev;
    });
  };
  const handleAvailabilityChange = (
    baseId: keyof LocalData,
    availabilityValue: any
  ) => {
    setLocalData((prevData) => {
      console.log(
        "Before update:",
        baseId,
        prevData[baseId]?.availability,
        availabilityValue
      );

      const updatedData = {
        ...prevData,
        [baseId]: {
          ...prevData[baseId],
          availability: availabilityValue,
        },
      };

      console.log(
        "After update:",
        baseId,
        updatedData[baseId]?.availability,
        availabilityValue
      );
      return updatedData;
    });
  };
  const handleObservationChange = (
    baseId: keyof LocalData,
    observationValue: string
  ) => {
    setLocalData((prevData) => {
      const updatedData = {
        ...prevData,
        [baseId]: {
          ...prevData[baseId],
          observation: observationValue,
        },
      };
      return updatedData;
    });
  };
  const handleQualityChange = (baseId: keyof LocalData, qualityValue: any) => {
    setLocalData((prevData) => {
      console.log(
        "Before update:",
        baseId,
        prevData[baseId]?.quality,
        qualityValue
      );

      const updatedData = {
        ...prevData,
        [baseId]: {
          ...prevData[baseId],
          quality: qualityValue,
        },
      };

      console.log(
        "After update:",
        baseId,
        updatedData[baseId]?.quality,
        qualityValue
      );
      return updatedData;
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="strategic" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="strategic">1.1 Strategic Planning</TabsTrigger>
          <TabsTrigger value="budget">1.2 Annual Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="strategic">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                1.1 Strategic Planning (6 marks)
              </h3>
              <div className="space-y-4">
                {Object.entries(localData)
                  .filter(
                    ([_, value]) =>
                      typeof value === "object" &&
                      value !== null &&
                      "label" in value
                  )
                  .slice(0, 5)
                  .map(([key, value]) => (
                    <EvaluationItemWithWeights
                      key={key} // Ensure each element has a unique key
                      id={key}
                      label={value.label}
                      availabilityValue={value.availability}
                      qualityValue={value.quality}
                      onAvailabilityChange={handleAvailabilityChange}
                      onQualityChange={handleQualityChange}
                      isAvailabilityNA={
                        value.availability ==
                        EvaluationItemWeights.NOT_APPLICABLE
                      }
                      isQualityNA={
                        value.quality == EvaluationItemWeights.NOT_APPLICABLE
                      }
                      marksAllocated={value.marksAllocated}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={value.observation}
                      onObservationChange={(value) =>
                        handleObservationChange(key, value)
                      }
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                1.2 Annual budget and Procurement plan (4 marks)
              </h3>
              <div className="space-y-4">
                {Object.entries(localData)
                  .filter(
                    ([_, value]) =>
                      typeof value === "object" &&
                      value !== null &&
                      "label" in value
                  )
                  .slice(5, 9)
                  .map(([key, value]) => (
                    <EvaluationItemWithWeights
                      key={key} // Ensure each element has a unique key
                      id={key}
                      label={value.label}
                      availabilityValue={value.availability}
                      qualityValue={value.quality}
                      onAvailabilityChange={handleAvailabilityChange}
                      onQualityChange={handleQualityChange}
                      marksAllocated={value.marksAllocated}
                      qualityWeight="60%"
                      isAvailabilityNA={
                        value.availability ==
                        EvaluationItemWeights.NOT_APPLICABLE
                      }
                      isQualityNA={
                        value.quality == EvaluationItemWeights.NOT_APPLICABLE
                      }
                      availabilityWeight="40%"
                      observation={value.observation}
                      onObservationChange={(value) =>
                        handleObservationChange(key, value)
                      }
                    />
                  ))}
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
          <span className="font-medium text-blue-800">
            Total marks for Strategic Planning:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 10
          </span>
        </div>
      </div>
    </div>
  );
}
