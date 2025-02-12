import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Survey {
  school: {
    name: string;
  };
}

const IncompleteSurveys = () => {
  const navigate = useNavigate();
  const [incompleteSurveys, setIncompleteSurveys] = useState<Survey[]>([]);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null; // Parse user correctly

    if (user && user.id) {
      const draft = JSON.parse(
        localStorage.getItem(`survey_draft_${user.id}`) || "null"
      );
      if (draft) {
        setIncompleteSurveys([draft]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Incomplete Surveys
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Back
        </Button>
        <div className="bg-white rounded-lg shadow">
          {incompleteSurveys.length > 0 ? (
            incompleteSurveys.map((survey, index) => (
              <div
                key={index}
                className="p-4 border-b last:border-b-0 flex justify-between"
              >
                <div>
                  <h3 className="font-medium">{survey.school.name}</h3>
                  <p className="text-sm text-gray-500">Draft</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/create-survey")}
                >
                  Continue
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No incomplete surveys found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncompleteSurveys;
