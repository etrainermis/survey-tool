import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";
import { AuthApi } from "@/lib/config/axios.config";
import useAuth from "@/hooks/useAuth";

interface Survey {
  school: {
    name: string;
    id: string;
  };
  status: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([]);
  const [completedSurveys, setCompletedSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await AuthApi.get("/surveys");
        const surveys = res?.data?.data || [];

        setIncompleteSurveys(
          surveys.filter((s: Survey) => s.status === "DRAFT")
        );
        setCompletedSurveys(
          surveys.filter((s: Survey) => s.status === "COMPLETED")
        );
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
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
            <h1 className="text-3xl font-bold text-gray-900">
              Survey Dashboard
            </h1>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/create-survey")}
              className="bg-[#1d5fad] hover:bg-[#1d5fad]/90 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Survey
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLogout()}
              type="button"
            >
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
