
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "@/lib/auth";

interface CreateSurveyProps {
  authState: AuthState;
}

const CreateSurvey = ({ authState }: CreateSurveyProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

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
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* We'll implement the actual form steps in the next iteration */}
          <div className="text-center py-12">
            <p className="text-gray-500">Survey form coming in next iteration</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateSurvey;
