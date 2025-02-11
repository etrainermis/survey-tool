import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";

interface Survey {
  id: string;
  school: {
    name: string;
  };
  createdAt: string;
  collectedData?: any; // Assuming surveys have collected data
}

const CompletedSurveys = () => {
  const navigate = useNavigate();
  const [completedSurveys, setCompletedSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem("completed_surveys") || "[]");
    setCompletedSurveys(completed);
  }, []);

  const handlePreviewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Completed Surveys</h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        <div className="bg-white rounded-lg shadow">
          {completedSurveys.length > 0 ? (
            completedSurveys.map((survey, index) => (
              <div key={index} className="p-4 border-b last:border-b-0 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{survey.school.name}</h3>
                  <p className="text-sm text-gray-500">
                    Completed on {new Date(survey.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" onClick={() => handlePreviewSurvey(survey)}>
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No completed surveys yet.</p>
          )}
        </div>
      </div>

      {/* Survey Preview Popup */}
      <SurveyPreviewDialog
        survey={selectedSurvey}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
};

export default CompletedSurveys;
