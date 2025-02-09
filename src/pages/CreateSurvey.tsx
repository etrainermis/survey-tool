
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "@/lib/auth";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface CreateSurveyProps {
  authState: AuthState;
}

interface SurveyData {
  school: {
    id: string;
    name: string;
    status: string;
    category: string;
    location: {
      province: string;
      district: string;
      sector: string;
      cell: string;
      village: string;
    };
    stats: {
      trades: number;
      students: number;
      teachers: number;
    };
    contact: {
      phone: string;
      email: string;
      headteacher: string;
    };
    trades: Array<{
      id: string;
      name: string;
      levels: Array<{
        level: number;
        classrooms: number;
        students: {
          male: number;
          female: number;
        };
      }>;
    }>;
  };
  infrastructure: Array<{
    type: string;
    size: string;
    capacity: string;
    constructionYear: number;
    materials: string[];
    status: string;
  }>;
  it: {
    computerLab: {
      totalComputers: number;
      hasLAN: boolean;
      workingComputers: number;
      nonWorkingComputers: number;
      hasProjectors: boolean;
      totalProjectors: number;
      workingProjectors: number;
      nonWorkingProjectors: number;
    };
    internet: boolean;
    server: {
      exists: boolean;
      specifications: string;
    };
    hasElearning: boolean;
    energySources: string[];
    equipment: {
      hasAssetRegister: boolean;
      status: string;
      isAvailable: boolean;
    };
  };
}

const CreateSurvey = ({ authState }: CreateSurveyProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const form = useForm<SurveyData>();

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`survey_draft_${authState.user?.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [authState.user?.id]);

  // Save progress to localStorage whenever form data changes
  const saveProgress = (data: Partial<SurveyData>) => {
    if (authState.user?.id) {
      localStorage.setItem(
        `survey_draft_${authState.user.id}`,
        JSON.stringify(data)
      );
      toast({
        title: "Progress saved",
        description: "Your survey progress has been saved automatically.",
      });
    }
  };

  const onSubmit = (data: SurveyData) => {
    // Save completed survey
    const surveyData = {
      ...data,
      status: "completed",
      createdBy: authState.user?.id,
      createdAt: new Date().toISOString(),
    };

    const savedSurveys = JSON.parse(localStorage.getItem("completed_surveys") || "[]");
    savedSurveys.push(surveyData);
    localStorage.setItem("completed_surveys", JSON.stringify(savedSurveys));

    // Clear draft
    localStorage.removeItem(`survey_draft_${authState.user?.id}`);

    toast({
      title: "Survey completed",
      description: "Your survey has been saved successfully.",
    });

    navigate("/dashboard");
  };

  const nextStep = () => {
    if (currentStep < 4) {
      saveProgress(form.getValues());
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">School Information</h2>
            <p className="text-gray-500">
              Select a school and verify its information
            </p>
            {/* School selection form will be implemented here */}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trade Information</h2>
            <p className="text-gray-500">
              Enter information about school trades and students
            </p>
            {/* Trade information form will be implemented here */}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Infrastructure</h2>
            <p className="text-gray-500">
              Enter details about school infrastructure
            </p>
            {/* Infrastructure form will be implemented here */}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">IT Infrastructure</h2>
            <p className="text-gray-500">
              Enter information about IT equipment and facilities
            </p>
            {/* IT infrastructure form will be implemented here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Survey</h1>
            <p className="text-gray-500">Step {currentStep} of 4</p>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">Submit Survey</Button>
                )}
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateSurvey;
