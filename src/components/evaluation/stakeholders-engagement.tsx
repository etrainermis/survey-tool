import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EvaluationItemWithWeights from "./evaluation-item";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";

interface StakeholdersEngagementProps {
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
  // 4.1 Partnership Development
  mous: EvaluationField;
  employersFeedback: EvaluationField;
  trainingAdjustments: EvaluationField;

  // 4.2 Community and Alumni engagement
  stakeholderMeetings: EvaluationField;
  planningSessions: EvaluationField;
  graduateFiling: EvaluationField;
  alumniRecords: EvaluationField;

  // 4.3 Adaptability to Trends
  industryEngagement: EvaluationField;
  trainingRelevance: EvaluationField;
  staffTraining: EvaluationField;

  // 4.4 Relationship with Subordinates
  subordinateFeedback: EvaluationField;
  conflictResolution: EvaluationField;

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

export default function StakeholdersEngagement({
  formData,
  updateFormData,
  updateSectionMarks,
}: StakeholdersEngagementProps) {
  const defaultData = {
    // 4.1 Partnership Development
    mous: {
      ...defaultEvaluation,
      quality: EvaluationItemWeights.NOT_APPLICABLE,
      label: "At Least 3 MoUs With Relevant Private Companies Per Each Trade",
    },
    employersFeedback: {
      ...defaultEvaluation,
      label: "Employers feedback/ satisfaction survey results",
    },
    trainingAdjustments: {
      ...defaultEvaluation,
      label: "Training adjustments evidence based on feedback",
    },

    // 4.2 Community and Alumni engagement
    stakeholderMeetings: {
      ...defaultEvaluation,
      label: "Records of meetings and planning sessions with stakeholders",
    },
    planningSessions: {
      ...defaultEvaluation,
      label: "Minutes of meeting and records of planning sessions Evidence of partnerships with local organizations",
    },
    graduateFiling: {
      ...defaultEvaluation,
      label: "Graduate Filing System for atleast previous 4 years",
    },
    alumniRecords: {
      ...defaultEvaluation,
      label: "Records of alumni meetings, events, and or other communications",
    },

    // 4.3 Adaptability to Trends
    industryEngagement: {
      ...defaultEvaluation,
      label: "Industry engagement in training (contract, MoUs...)",
    },
    trainingRelevance: {
      ...defaultEvaluation,
      label: "Feedback on training relevance",
      marksAllocated: 0.5,
    },
    staffTraining: {
      ...defaultEvaluation,
      label: "Staff training sessions held",
      marksAllocated: 0.5,
    },

    // 4.4 Relationship with Subordinates
    subordinateFeedback: {
      ...defaultEvaluation,
      label: "Feedback from subordinates",
      marksAllocated: 0.5,
    },
    conflictResolution: {
      ...defaultEvaluation,
      label: "Records of conflict resolution",
      marksAllocated: 0.5,
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
      if (!parsedData || !parsedData.stakeholdersEngagement || Object.keys(parsedData.stakeholdersEngagement).length === 0) {
        return defaultData;
      }

      return parsedData.stakeholdersEngagement;
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
      <Tabs defaultValue="partnership" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="partnership">4.1 Partnership</TabsTrigger>
          <TabsTrigger value="community">4.2 Community</TabsTrigger>
          <TabsTrigger value="adaptability">4.3 Adaptability</TabsTrigger>
          <TabsTrigger value="relationship">4.4 Relationship</TabsTrigger>
        </TabsList>

        <TabsContent value="partnership">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.1 Partnership Development (3 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(0, 3)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                4.2 Community and Alumni engagement (4 marks)
              </h3>
              <div className="space-y-4">
                {renderEvaluationItems(3, 7)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adaptability">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.3 Adaptability to Trends (2 marks)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(7, 10)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationship">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">4.4 Relationship with Subordinates (1 mark)</h3>
              <div className="space-y-4">
                {renderEvaluationItems(10, 12)}
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
            Total marks for Stakeholders' Engagement:
          </span>
          <span className="text-xl font-bold text-blue-800">
            {calculateTotalMarks(localData).toFixed(1)} / 10
          </span>
        </div>
      </div>
    </div>
  );
}