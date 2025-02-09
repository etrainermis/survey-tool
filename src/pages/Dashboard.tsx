import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, LogOut, Edit, Trash2 } from "lucide-react";
import { AuthState, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";

interface DashboardProps {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
}

interface Survey {
  school: {
    name: string;
    id: string;
  };
  status: string;
  createdAt: string;
}

const Dashboard = ({ authState, setAuthState }: DashboardProps) => {
  const navigate = useNavigate();
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([]);
  const [completedSurveys, setCompletedSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    // Load completed surveys
    const completed = JSON.parse(localStorage.getItem("completed_surveys") || "[]");
    setCompletedSurveys(completed);

    // Load draft surveys for current user
    const draftKey = `survey_draft_${authState.user?.id}`;
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      setIncompleteSurveys([JSON.parse(draft)]);
    }
  }, [authState.user?.id]);

  const handleLogout = () => {
    logout();
    setAuthState({ user: null, isAuthenticated: false });
    navigate("/login");
  };

  const handleDeleteDraft = () => {
    const draftKey = `survey_draft_${authState.user?.id}`;
    localStorage.removeItem(draftKey);
    setIncompleteSurveys([]);
  };

  const handleContinueDraft = () => {
    navigate("/create-survey");
  };

  const handlePreviewSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="https://tvetmanagement.rtb.gov.rw/assets/logo-e1ac7bbe.png" 
              alt="RTB Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900">Survey Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/create-survey")}
              className="bg-[#1d5fad] hover:bg-[#1d5fad]/90 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Survey
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Incomplete Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{incompleteSurveys.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{completedSurveys.length}</p>
            </CardContent>
          </Card>
        </div>

        {incompleteSurveys.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Incomplete Surveys</h2>
            <div className="bg-white rounded-lg shadow">
              {incompleteSurveys.map((survey, index) => (
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
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Completed Surveys</h2>
          <div className="bg-white rounded-lg shadow">
            {completedSurveys.length > 0 ? (
              completedSurveys.map((survey, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{survey.school.name}</h3>
                    <p className="text-sm text-gray-500">
                      Completed on{" "}
                      {new Date(survey.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewSurvey(survey)}
                    className="text-[#1d5fad] hover:text-[#1d5fad]/90"
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
      </div>

      <SurveyPreviewDialog
        survey={selectedSurvey}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
};

export default Dashboard;