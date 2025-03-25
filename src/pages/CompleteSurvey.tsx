"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SurveyPreviewDialog } from "@/components/SurveyPreviewDialog";
import { useAllSurveys } from "@/hooks/useAllSurveys";
import dayjs from "dayjs";

interface Survey {
  id: string;
  school: {
    id: string;
    name: string;
    status: string;
    category: string;
    location?: {
      province: string;
      district: string;
      sector: string;
      cell: string;
      village: string;
    };
    stats?: {
      trades: number;
      students: number;
      teachers: number;
      maleTeachers?: number;
      femaleTeachers?: number;
    };
    contact?: {
      phone: string;
      email: string;
      headteacher: string;
      owner: string;
    };
    trades?: Array<{
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
  completedBy?: any;
  createdAt: string;
  status: string;
  collectedData?: any;
}

const CompletedSurveys = () => {
  const navigate = useNavigate();
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewSurvey = (survey: Survey) => {
    if (!survey.school || !survey.school.id) {
      console.error("School ID is missing in the selected survey:", survey);
      return;
    }
    setSelectedSurvey(survey);
    setPreviewOpen(true);
  };

  const { surveys, fetchingSurveys, errorFetchingSurveys } = useAllSurveys();

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Completed Surveys</h1>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
        >
          Back
        </Button>

        {errorFetchingSurveys && (
          <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
            <p className="text-gray-700 text-center">Error loading surveys. Please try again.</p>
          </div>
        )}

        {fetchingSurveys ? (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-blue-200">
            {surveys?.length > 0 ? (
              surveys.map((survey: Survey, index: number) => (
                <div
                  key={index}
                  className="p-4 border-b border-blue-100 last:border-b-0 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{survey.school.name}</h3>
                    <div className="flex gap-4">
                    <p className="text-sm text-gray-600">Completed on {dayjs(survey.createdAt).format("DD/MM/YYYY")}</p>
                    <p className="text-sm text-gray-600">Completed By {(survey.completedBy?.firstName || "") + " "+  survey.completedBy?.lastName || ""}</p>

                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePreviewSurvey(survey)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
                  >
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No completed surveys yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Survey Preview Popup */}
      {selectedSurvey && (
        <SurveyPreviewDialog
          survey={selectedSurvey}// Passing school ID here
          open={previewOpen}
          onOpenChange={setPreviewOpen}
        />
      )}
    </div>
  );
};

export default CompletedSurveys;
