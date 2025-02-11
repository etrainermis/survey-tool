import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";
import { AuthApi } from "@/lib/config/axios.config";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";

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
          <Card
            className="cursor-pointer transition-all hover:ring-2 ring-[#1d5fad]"
            onClick={() => navigate("/incomplete-surveys")}
          >
            <CardHeader>
              <CardTitle>Incomplete Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-2xl font-bold">{incompleteSurveys}</p> */}
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer transition-all hover:ring-2 ring-[#1d5fad]"
            onClick={() => navigate("/completed-surveys")}
          >
            <CardHeader>
              <CardTitle>Completed Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-2xl font-bold">{completedSurveys}</p> */}
            </CardContent>
          </Card>
        </div>
      </div>
      <DashboardLayout />
    </div>
  );
};

export default Dashboard;
