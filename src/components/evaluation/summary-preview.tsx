"use client"

import { Card, CardContent } from "@/components/ui/card"

interface SummaryPreviewProps {
  formData: any
  sectionMarks: any
  totalMarks: number
  schoolType: "day" | "boarding" | null
}

export default function SummaryPreview({ formData, sectionMarks, totalMarks, schoolType }: SummaryPreviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-blue-700">School Type:</p>
            <p className="text-lg font-semibold">{schoolType === "day" ? "Day School" : "Boarding School"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-blue-700">Total Score:</p>
            <p className="text-2xl font-bold text-blue-800">{totalMarks.toFixed(2)} / 100</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">1. Strategic Planning</span>
            <span className="font-semibold">{sectionMarks.strategicPlanning.toFixed(2)} / 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.strategicPlanning / 10) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">2. School Operational Management</span>
            <span className="font-semibold">{sectionMarks.operationalManagement.toFixed(2)} / 30</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.operationalManagement / 30) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">3. Leading Teaching and Learning</span>
            <span className="font-semibold">{sectionMarks.teachingLearning.toFixed(2)} / 20</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.teachingLearning / 20) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">4. Stakeholders' Engagement</span>
            <span className="font-semibold">{sectionMarks.stakeholdersEngagement.toFixed(2)} / 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.stakeholdersEngagement / 10) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">5. Continuous Improvement</span>
            <span className="font-semibold">{sectionMarks.continuousImprovement.toFixed(2)} / 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.continuousImprovement / 10) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">6. Infrastructure and Environment</span>
            <span className="font-semibold">{sectionMarks.infrastructure.toFixed(2)} / 20</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(sectionMarks.infrastructure / 20) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Evaluation Summary</h3>
          <p className="text-sm text-blue-800">
            This evaluation tool has assessed your institution across six key areas. Your total score is{" "}
            {totalMarks.toFixed(2)} out of 100.
            {totalMarks >= 80
              ? " Your institution demonstrates excellent performance across most evaluation criteria."
              : totalMarks >= 60
                ? " Your institution demonstrates good performance with some areas for improvement."
                : totalMarks >= 40
                  ? " Your institution meets basic requirements but has significant areas for improvement."
                  : " Your institution requires substantial improvements across multiple evaluation criteria."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

