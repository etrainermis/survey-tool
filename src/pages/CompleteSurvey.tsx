import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";
import { useAllSurveys } from "@/hooks/useAllSurveys";
import dayjs from "dayjs";
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
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setPreviewOpen(true);
  };
  const { surveys, fetchingSurveys, errorFetchingSurveys, mutate } =
    useAllSurveys();
  console.log(surveys, "surveyyys");
  {
    errorFetchingSurveys && <p>No data found</p>;
  }
  {
    fetchingSurveys && (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Completed Surveys
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        <div className="bg-white rounded-lg shadow">
          {surveys?.length > 0 ? (
            surveys.map((survey: any, index: any) => (
              <div
                key={index}
                className="p-4 border-b last:border-b-0 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{survey.school.name}</h3>
                  <p className="text-sm text-gray-500">
                    Completed on {dayjs(survey.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handlePreviewSurvey(survey)}
                >
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No completed surveys yet.
            </p>
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
