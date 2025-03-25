"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SchoolTypeSelection from "./school-type-selection";
import StrategicPlanning from "./strategic-planning";
import OperationalManagement from "./operational-management";
import TeachingLearning from "./teaching-learning";
import StakeholdersEngagement from "./stakeholders-engagement";
import ContinuousImprovement from "./continuous-improvement";
import Infrastructure from "./infrastructure";
import SummaryPreview from "./summary-preview";
import { AuthApi } from "@/lib/config/axios.config";
import { ESchoolSurveyDataType } from "@/common/enums/SchoolSurveyDataType";
import { toast } from "sonner";
import { escape } from "querystring";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [schoolType, setSchoolType] = useState<"day" | "boarding" | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    strategicPlanning: {},
    operationalManagement: {},
    teachingLearning: {},
    stakeholdersEngagement: {},
    continuousImprovement: {},
    infrastructure: {},
  });
  const [sectionMarks, setSectionMarks] = useState({
    strategicPlanning: 0,
    operationalManagement: 0,
    teachingLearning: 0,
    stakeholdersEngagement: 0,
    continuousImprovement: 0,
    infrastructure: 0,
  });
  const [totalMarks, setTotalMarks] = useState(0);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setSchoolType(localStorage.getItem("schoolType") as "day" | "boarding");
  }, []);

  // Calculate overall total marks whenever individual section marks change
  useEffect(() => {
    const overall =
      sectionMarks.strategicPlanning +
      sectionMarks.operationalManagement +
      sectionMarks.teachingLearning +
      sectionMarks.stakeholdersEngagement +
      sectionMarks.continuousImprovement +
      sectionMarks.infrastructure;

    setTotalMarks(overall);
  }, [sectionMarks]);

  const steps = [
    {
      id: "strategic-planning",
      title: "1. Strategic Planning",
      type: ESchoolSurveyDataType.STRATEGIC_PLANNING,
    },
    {
      id: "operational-management",
      title: "2. School Operational Management",
      type: ESchoolSurveyDataType.OPERATIONAL_MANAGEMENT,
    },
    {
      id: "teaching-learning",
      title: "3. Leading Teaching and Learning",
      type: ESchoolSurveyDataType.TEACHING_AND_LEARNING,
    },
    {
      id: "stakeholders-engagement",
      title: "4. Stakeholders' Engagement",
      type: ESchoolSurveyDataType.STAKEHOLDERS_ENGAGEMENT,
    },
    {
      id: "continuous-improvement",
      title: "5. Continuous Improvement",
      type: ESchoolSurveyDataType.CONTINOUS_IMPROVEMENT,
    },
    {
      id: "infrastructure",
      title: "6. Infrastructure and Environment",
      type: ESchoolSurveyDataType.INFRASTRUCTURE_AND_ENVIRONMENT,
    },
    { id: "summary", title: "Summary and Preview" },
  ];

  const updateFormData = async (type, section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
    //  await saveSectionData(data, type);
  };
  const saveSectionData = async (payload) => {
    try {
      const response = await AuthApi.post(`/school-survey/add`, {...payload, schoolId : localStorage.getItem("currentEvaluationSchool")});
    } catch (error) {
      console.log(error);
    }
  };
  const updateSectionMarks = (section, marks) => {
    setSectionMarks((prev) => {
      // Only update if the value has changed
      if (prev[section] !== marks) {
        return {
          ...prev,
          [section]: marks,
        };
      }
      return prev;
    });
  };

  const validateCurrentStep = () => {
    // For other steps, check if all required fields are filled
    const currentStepId = steps[currentStep].id;

    if (currentStepId === "summary") {
      return true; // No validation needed for summary
    }

    if (currentStepId !== "school-type") {
      const currentFormData = formData[currentStepId.replace(/-/g, "")];

      // Skip validation if the form data is empty (this shouldn't happen in normal use)
      if (!currentFormData || Object.keys(currentFormData).length === 0) {
        return true;
      }

      // Only check fields that end with "Availability" or "Quality" or are not overview fields
      const fieldsToCheck = Object.keys(currentFormData).filter(
        (key) =>
          (key.endsWith("Availability") || key.endsWith("Quality")) &&
          !["strength", "weakness", "improvement"].includes(key)
      );

      // If there are no fields to check, allow proceeding
      if (fieldsToCheck.length === 0) {
        return true;
      }

      // Check if all required fields have been answered
      const allFieldsAnswered = fieldsToCheck.every((key) => {
        const value = currentFormData[key];
        // Consider a field answered if it has a value of yes, no, or na
        return value === "yes" || value === "no" || value === "na";
      });

      // if (!allFieldsAnswered) {
      //   setValidationError("Please answer all questions before proceeding.")
      //   return false
      // }
    }

    setValidationError("");
    return true;
  };
  const saveProgress = (data) => {
    if (user?.id) {
      localStorage.setItem(`survey_draft_${localStorage.getItem("currentEvaluationSchool")}`, JSON.stringify(data));
      toast({ description: "Progress saved", duration: 1000 });
    }
  };
  const handleNext = async () => {
    saveProgress(formData);
    switch (steps[currentStep].type) {
      case ESchoolSurveyDataType.STRATEGIC_PLANNING:
        await saveSectionData({
          strategicPlanning: JSON.stringify(formData.strategicPlanning)
        });
        break;
      case ESchoolSurveyDataType.OPERATIONAL_MANAGEMENT:
        await saveSectionData({
          operationalManagement: JSON.stringify(formData.operationalManagement)
        });
        break;
      case ESchoolSurveyDataType.INFRASTRUCTURE_AND_ENVIRONMENT:
        await saveSectionData({
          infrastructureAndEnvironment: JSON.stringify(formData.infrastructure)
        });
        break;
      case ESchoolSurveyDataType.STAKEHOLDERS_ENGAGEMENT:
        await saveSectionData({
          stakeholdersEngagement: JSON.stringify(formData.stakeholdersEngagement)
        });
        break;
      case ESchoolSurveyDataType.CONTINOUS_IMPROVEMENT:
        await saveSectionData({
          continuousImprovement: JSON.stringify(formData.continuousImprovement)
        });
        break;
      case ESchoolSurveyDataType.TEACHING_AND_LEARNING:
        await saveSectionData({
          teachingAndLearning: JSON.stringify(formData.teachingLearning)
        });
        break;

      default:
        break;
    }
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setValidationError("");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setValidationError("");
    }
  };

  const handleSubmit = async () => {
    // Here you would typically send the data to a server
    const surveyPayload = {
      schoolId: localStorage.getItem("currentEvaluationSchool"),
      strategicPlanning: JSON.stringify(formData.strategicPlanning),
      operationalManagement: JSON.stringify(formData.operationalManagement),
      teachingAndLearning: JSON.stringify(formData.teachingLearning),
      continuousImprovement: JSON.stringify(formData.continuousImprovement),
      infrastructureAndEnvironment: JSON.stringify(formData.infrastructure),
      stakeholdersEngagement: JSON.stringify(formData.stakeholdersEngagement),
    };

    // Submit to API
    const response = await AuthApi.post(`/school-survey/add`, surveyPayload);

    // Handle successful submission
    toast({
      title: `Evaluation submitted successfully! Total marks: ${totalMarks.toFixed(
        2
      )} out of 100`,
      description: "Your survey has been successfully submitted.",
    });
    localStorage.removeItem(
      `survey_draft_${localStorage.getItem("currentEvaluationSchool")}`
    );
    // Reset form or redirect as needed
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "strategic-planning":
        return (
          <StrategicPlanning
            formData={formData.strategicPlanning}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.STRATEGIC_PLANNING,
                "strategicPlanning",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("strategicPlanning", marks)
            }
          />
        );
      case "operational-management":
        return (
          <OperationalManagement
            formData={formData.operationalManagement}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.OPERATIONAL_MANAGEMENT,
                "operationalManagement",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("operationalManagement", marks)
            }
            schoolType={schoolType}
          />
        );
      case "teaching-learning":
        return (
          <TeachingLearning
            formData={formData.teachingLearning}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.TEACHING_AND_LEARNING,
                "teachingLearning",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("teachingLearning", marks)
            }
          />
        );
      case "stakeholders-engagement":
        return (
          <StakeholdersEngagement
            formData={formData.stakeholdersEngagement}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.STAKEHOLDERS_ENGAGEMENT,
                "stakeholdersEngagement",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("stakeholdersEngagement", marks)
            }
          />
        );
      case "continuous-improvement":
        return (
          <ContinuousImprovement
            formData={formData.continuousImprovement}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.CONTINOUS_IMPROVEMENT,
                "continuousImprovement",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("continuousImprovement", marks)
            }
          />
        );
      case "infrastructure":
        return (
          <Infrastructure
            formData={formData.infrastructure}
            updateFormData={(data) =>
              updateFormData(
                ESchoolSurveyDataType.INFRASTRUCTURE_AND_ENVIRONMENT,
                "infrastructure",
                data
              )
            }
            updateSectionMarks={(marks) =>
              updateSectionMarks("infrastructure", marks)
            }
            schoolType={schoolType}
          />
        );
      case "summary":
        return (
          <SummaryPreview
            formData={formData}
            sectionMarks={sectionMarks}
            totalMarks={totalMarks}
            schoolType={schoolType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800">
            TSS & VTC MONITORING AND EVALUATION TOOL
          </h1>
          <div className="w-full bg-blue-100 rounded-full h-2.5 mt-6">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-blue-600">
            <span>Start</span>
            <span>Complete</span>
          </div>
        </header>

        <Card className="border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 border-b pb-2">
              {steps[currentStep].title}
            </h2>

            {renderStep()}

            {validationError && (
              <Alert
                variant="destructive"
                className="mt-4 bg-red-50 border-red-200 text-red-800"
              >
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit Evaluation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {currentStep > 0 && (
          <div className="mt-4 text-center text-blue-700 font-medium">
            Total marks so far: {totalMarks.toFixed(2)} / 100
          </div>
        )}
      </div>
      <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mb-6 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
      
    </div>
  );
}
