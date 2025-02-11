import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthState } from "@/lib/auth";

interface Survey {
  school: {
    name: string;
    id: string;
  };
  status: string;
  createdAt: string;
}

interface IncompleteSurveysProps {
  authState: AuthState;
}

const IncompleteSurveys = ({ authState }: IncompleteSurveysProps) => {
  const navigate = useNavigate();
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    // Load draft surveys for current user
    const draftKey = `survey_draft_${authState.user?.id}`;
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      setIncompleteSurveys([JSON.parse(draft)]);
    }
  }, [authState.user?.id]);

  const handleDeleteDraft = () => {
    const draftKey = `survey_draft_${authState.user?.id}`;
    localStorage.removeItem(draftKey);
    setIncompleteSurveys([]);
  };

  const handleContinueDraft = () => {
    navigate("/create-survey");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Incomplete Surveys</h1>
        </div>

        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle>Draft Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            {incompleteSurveys.length > 0 ? (
              incompleteSurveys.map((survey, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">
                      {survey.school?.name || "Untitled Survey"}
                    </h3>
                    <p className="text-sm text-gray-500">Draft</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleContinueDraft}
                      className="text-[#1d5fad] hover:text-[#1d5fad]/90"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteDraft}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No incomplete surveys found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncompleteSurveys;