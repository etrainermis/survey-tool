import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Survey {
  id: string;
  school: {
    name: string;
  };
  createdAt: string;
  collectedData?: any;
}

interface SurveyPreviewDialogProps {
  survey: Survey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SurveyPreviewDialog = ({
  survey,
  open,
  onOpenChange,
}: SurveyPreviewDialogProps) => {
  const [step, setStep] = useState(0);

  if (!survey) return null;

  const surveyData = survey.collectedData
    ? JSON.parse(survey.collectedData)
    : {};

  const steps = [
    {
      title: "General Information",
      content: renderGeneralInformation(surveyData.generalInformation),
    },
    {
      title: "Strategic Planning",
      content: renderStrategicPlanning(surveyData.strategicPlanning),
    },
    {
      title: "Operational Management",
      content: renderOperationalManagement(surveyData.operationalManagement),
    },
    {
      title: "Teaching and Learning",
      content: renderTeachingAndLearning(surveyData.teachingAndLearning),
    },
    {
      title: "Stakeholders Engagement",
      content: renderStakeholdersEngagement(surveyData.stakeholdersEngagement),
    },
    {
      title: "Continuous Improvement",
      content: renderContinuousImprovement(surveyData.continuousImprovement),
    },
    {
      title: "Infrastructure and Environment",
      content: renderInfrastructureAndEnvironment(
        surveyData.infrastructureAndEnvironment
      ),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Survey Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>School:</strong> {survey.school.name}
          </p>
          <p>
            <strong>Completed on:</strong>{" "}
            {new Date(survey.createdAt).toLocaleDateString()}
          </p>
          <div className="border-t pt-3">
            <h4 className="font-semibold">{steps[step].title}</h4>
            <div className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {steps[step].content}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={step === steps.length - 1}
          >
            Next
          </Button>
        </div>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const renderGeneralInformation = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>School Name:</strong> {parsedData.school.name}
      </p>
      <p>
        <strong>Email:</strong> {parsedData.school.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {parsedData.school.phoneNumber}
      </p>
      <p>
        <strong>Category:</strong> {parsedData.school.category}
      </p>
      <p>
        <strong>Total Number of Students:</strong>{" "}
        {parsedData.school.totalNumberOfStudents}
      </p>
      <p>
        <strong>Location:</strong> {parsedData.school.locationAddress.name}
      </p>
      <p>
        <strong>District:</strong> {parsedData.school.districtId.name}
      </p>
    </div>
  );
};

const renderStrategicPlanning = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>School Vision:</strong> {parsedData.schoolVision.observation}
      </p>
      <p>
        <strong>School Mission:</strong> {parsedData.schoolMission.observation}
      </p>
    </div>
  );
};

const renderOperationalManagement = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>Staff Attendance Records:</strong>{" "}
        {parsedData.staffAttendance.observation}
      </p>
      <p>
        <strong>Financial Reports:</strong>{" "}
        {parsedData.financialReports.observation}
      </p>
    </div>
  );
};

const renderTeachingAndLearning = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>Training Timetable:</strong> {parsedData.timetable.observation}
      </p>
      <p>
        <strong>Assessment Plans:</strong>{" "}
        {parsedData.assessmentPlans.observation}
      </p>
    </div>
  );
};

const renderStakeholdersEngagement = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>MoUs:</strong> {parsedData.mous.observation}
      </p>
      <p>
        <strong>Employers Feedback:</strong>{" "}
        {parsedData.employersFeedback.observation}
      </p>
    </div>
  );
};

const renderContinuousImprovement = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>CPD Plan:</strong> {parsedData.cpdPlan.observation}
      </p>
      <p>
        <strong>Action Plans:</strong> {parsedData.actionPlans.observation}
      </p>
    </div>
  );
};

const renderInfrastructureAndEnvironment = (data: any) => {
  const parsedData = JSON.parse(data);
  return (
    <div>
      <p>
        <strong>Strength:</strong> {parsedData.overview.strength}
      </p>
      <p>
        <strong>Weakness:</strong> {parsedData.overview.weakness}
      </p>
      <p>
        <strong>Improvement:</strong> {parsedData.overview.improvement}
      </p>
      <p>
        <strong>Books and Resources:</strong> {parsedData.books.observation}
      </p>
      <p>
        <strong>Condition of Tools and Machinery:</strong>{" "}
        {parsedData.tools.observation}
      </p>
    </div>
  );
};
