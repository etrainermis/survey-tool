"use client"

import { Card, CardContent } from "@/components/ui/card";

interface SummaryPreviewProps {
  formData: any;
  sectionMarks: any;
  totalMarks: number;
  schoolType: "day" | "boarding" | null;
}

export default function SummaryPreview({
  formData,
  sectionMarks,
  totalMarks,
  schoolType,
}: SummaryPreviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-blue-700">School Type:</p>
            <p className="text-lg font-semibold">
              {schoolType === "day" ? "Day School" : "Boarding School"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-blue-700">Total Score:</p>
            <p className="text-2xl font-bold text-blue-800">
              {totalMarks.toFixed(2)} / 100
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {["strategicPlanning", "operationalManagement", "teachingLearning", "stakeholdersEngagement", "continuousImprovement", "infrastructure"].map((key, index) => (
            <div key={key}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {index + 1}. {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-semibold">
                  {sectionMarks[key].toFixed(2)} / {
                    key === "operationalManagement" || key === "infrastructure"
                      ? 30
                      : key === "teachingLearning"
                      ? 20
                      : 10
                  }
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (sectionMarks[key] /
                        (key === "operationalManagement" || key === "infrastructure"
                          ? 30
                          : key === "teachingLearning"
                          ? 20
                          : 10)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Evaluation Summary</h3>
          <p className="text-sm text-blue-800">
            This evaluation tool has assessed your institution across six key
            areas. Your total score is {totalMarks.toFixed(2)} out of 100.
            {totalMarks >= 80
              ? " Your institution demonstrates excellent performance across most evaluation criteria."
              : totalMarks >= 60
              ? " Your institution demonstrates good performance with some areas for improvement."
              : totalMarks >= 40
              ? " Your institution meets basic requirements but has significant areas for improvement."
              : " Your institution requires substantial improvements across multiple evaluation criteria."}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Evaluator's Comments</h3>
          <textarea
            className="w-full border rounded-lg p-7 text-sm"
            placeholder="Comment from the evaluator..."
          ></textarea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium text-blue-700">Evaluator's Signature 1</p>
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Signature..."
              />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Evaluator's Signature 2</p>
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Signature..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Headteacher's Comments</h3>
          <textarea
            className="w-full border rounded-lg p-7 text-sm"
            placeholder="Comment from the headteacher..."
          ></textarea>

          <div className="mt-4">
            <p className="text-sm font-medium text-blue-700">Headteacher's Signature</p>
            <input
              type="text"
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Signature..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
