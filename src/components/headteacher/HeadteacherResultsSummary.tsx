"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeadteacherResultsSummaryProps {
  data: any;
  onDataChange: (data: any) => void;
}

export default function HeadteacherResultsSummary({
  data,
  onDataChange,
}: HeadteacherResultsSummaryProps) {
  const [totalMarks, setTotalMarks] = useState(0);
  const [strategicPlanningMarks, setStrategicPlanningMarks] = useState(0);
  const [operationalManagementMarks, setOperationalManagementMarks] =
    useState(0);
  const [teachingLearningMarks, setTeachingLearningMarks] = useState(0);
  const [stakeholdersEngagementMarks, setStakeholdersEngagementMarks] =
    useState(0);
  const [continuousImprovementMarks, setContinuousImprovementMarks] =
    useState(0);
  const [hygieneAndSafetyMarks, setHygieneAndSafetyMarks] = useState(0);
  const [qualityLevel, setQualityLevel] = useState("");
  const [percentageScore, setPercentageScore] = useState(0);
  const [resultsSummary, setResultsSummary] = useState({
    headteacherComment: "",
    headteacherSignature: "",
    evaluatorComment: "",
    evaluatorSignature: "",
  });

  // Maximum possible marks for each section
  const maxMarks = {
    strategicPlanning: 10,
    operationalManagement: 30,
    teachingLearning: 20,
    stakeholdersEngagement: 10,
    continuousImprovement: 10,
    hygieneAndSafety: 20,
    total: 100,
  };

  useEffect(() => {
    // Calculate marks for each section
    const spMarks = data?.strategicPlanning?.totalMarks || 0;
    const omMarks = data?.operationalManagement?.totalMarks || 0;
    const tlMarks = data?.teachingLearning?.totalMarks || 0;
    const seMarks = data?.stakeholdersEngagement?.totalMarks || 0;
    const ciMarks = data?.continuousImprovement?.totalMarks || 0;
    const hsMarks = data?.hygieneAndSafety?.totalMarks || 0;

    // Set state for individual section marks
    setStrategicPlanningMarks(spMarks);
    setOperationalManagementMarks(omMarks);
    setTeachingLearningMarks(tlMarks);
    setStakeholdersEngagementMarks(seMarks);
    setContinuousImprovementMarks(ciMarks);
    setHygieneAndSafetyMarks(hsMarks);

    // Calculate total marks
    const total = spMarks + omMarks + tlMarks + seMarks + ciMarks + hsMarks;
    setTotalMarks(total);

    // Calculate percentage score
    const percentage = (total / maxMarks.total) * 100;
    setPercentageScore(percentage);

    // Determine quality level
    if (percentage >= 90) {
      setQualityLevel("Excellent");
    } else if (percentage >= 70) {
      setQualityLevel("Good");
    } else if (percentage >= 50) {
      setQualityLevel("Satisfactory");
    } else {
      setQualityLevel("Unsatisfactory");
    }

    if (data?.resultsSummary) {
      setResultsSummary(data.resultsSummary);
    }
  }, [data]);

  // Get color based on quality level
  const getQualityColor = (level: string) => {
    switch (level) {
      case "Excellent":
        return "text-green-600";
      case "Good":
        return "text-blue-600";
      case "Satisfactory":
        return "text-yellow-600";
      case "Unsatisfactory":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Get progress bar color CSS variable based on percentage
  const getProgressColorVar = (percentage: number) => {
    if (percentage >= 90) return "hsl(142, 76%, 36%)"; // green-600
    if (percentage >= 70) return "hsl(214, 100%, 51%)"; // blue-600
    if (percentage >= 50) return "hsl(48, 96%, 53%)"; // yellow-600
    return "hsl(0, 84%, 60%)"; // red-600
  };

  // Calculate section quality level
  const getSectionQualityLevel = (marks: number, maxMark: number) => {
    const percentage = (marks / maxMark) * 100;

    if (percentage >= 90) return "Excellent";
    if (percentage >= 70) return "Good";
    if (percentage >= 50) return "Satisfactory";
    return "Unsatisfactory";
  };

  // Handle changes to form fields
  const handleChange = (field: string, value: string) => {
    const updatedData = {
      ...resultsSummary,
      [field]: value,
    };

    setResultsSummary(updatedData);
    onDataChange({ resultsSummary: updatedData });
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">
            Evaluation Results Summary
          </h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-blue-600">
                Overall Score
              </h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-800">
                  {totalMarks.toFixed(1)} / {maxMarks.total}
                </p>
                <p
                  className={`text-lg font-semibold ${getQualityColor(
                    qualityLevel
                  )}`}
                >
                  {qualityLevel}
                </p>
              </div>
            </div>

            <Progress
              value={percentageScore}
              className="h-3 mt-2"
              style={
                {
                  "--progress-foreground": getProgressColorVar(percentageScore),
                } as React.CSSProperties
              }
            />

            <div className="mt-4 text-sm text-gray-600">
              <p>Weight of Availability: 40%</p>
              <p>Weight of Quality: 60%</p>
              <p>Total Percentage Score: {percentageScore.toFixed(1)}%</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Strategic Planning Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  1. Strategic Planning
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {strategicPlanningMarks.toFixed(1)} /{" "}
                    {maxMarks.strategicPlanning}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        strategicPlanningMarks,
                        maxMarks.strategicPlanning
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      strategicPlanningMarks,
                      maxMarks.strategicPlanning
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (strategicPlanningMarks / maxMarks.strategicPlanning) * 100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (strategicPlanningMarks / maxMarks.strategicPlanning) *
                        100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Operational Management Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  2. Operational Management
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {operationalManagementMarks.toFixed(1)} /{" "}
                    {maxMarks.operationalManagement}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        operationalManagementMarks,
                        maxMarks.operationalManagement
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      operationalManagementMarks,
                      maxMarks.operationalManagement
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (operationalManagementMarks /
                    maxMarks.operationalManagement) *
                  100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (operationalManagementMarks /
                        maxMarks.operationalManagement) *
                        100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Teaching and Learning Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  3. Teaching and Learning
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {teachingLearningMarks.toFixed(1)} /{" "}
                    {maxMarks.teachingLearning}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        teachingLearningMarks,
                        maxMarks.teachingLearning
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      teachingLearningMarks,
                      maxMarks.teachingLearning
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (teachingLearningMarks / maxMarks.teachingLearning) * 100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (teachingLearningMarks / maxMarks.teachingLearning) * 100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Stakeholders Engagement Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  4. Stakeholders Engagement
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {stakeholdersEngagementMarks.toFixed(1)} /{" "}
                    {maxMarks.stakeholdersEngagement}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        stakeholdersEngagementMarks,
                        maxMarks.stakeholdersEngagement
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      stakeholdersEngagementMarks,
                      maxMarks.stakeholdersEngagement
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (stakeholdersEngagementMarks /
                    maxMarks.stakeholdersEngagement) *
                  100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (stakeholdersEngagementMarks /
                        maxMarks.stakeholdersEngagement) *
                        100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Continuous Improvement Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  5. Continuous Improvement
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {continuousImprovementMarks.toFixed(1)} /{" "}
                    {maxMarks.continuousImprovement}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        continuousImprovementMarks,
                        maxMarks.continuousImprovement
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      continuousImprovementMarks,
                      maxMarks.continuousImprovement
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (continuousImprovementMarks /
                    maxMarks.continuousImprovement) *
                  100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (continuousImprovementMarks /
                        maxMarks.continuousImprovement) *
                        100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Hygiene and Safety Section */}
            <div className="border-t border-blue-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-blue-600">
                  6. Hygiene and Safety
                </h3>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {hygieneAndSafetyMarks.toFixed(1)} /{" "}
                    {maxMarks.hygieneAndSafety}
                  </p>
                  <p
                    className={`text-sm font-medium ${getQualityColor(
                      getSectionQualityLevel(
                        hygieneAndSafetyMarks,
                        maxMarks.hygieneAndSafety
                      )
                    )}`}
                  >
                    {getSectionQualityLevel(
                      hygieneAndSafetyMarks,
                      maxMarks.hygieneAndSafety
                    )}
                  </p>
                </div>
              </div>

              <Progress
                value={
                  (hygieneAndSafetyMarks / maxMarks.hygieneAndSafety) * 100
                }
                className="h-2 mt-1"
                style={
                  {
                    "--progress-foreground": getProgressColorVar(
                      (hygieneAndSafetyMarks / maxMarks.hygieneAndSafety) * 100
                    ),
                  } as React.CSSProperties
                }
              />
            </div>
          </div>

          <div className="mt-8 border-t border-blue-100 pt-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">
              Quality Level Explanation
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="w-24 font-medium text-green-600">Excellent</div>
                <div>
                  Total Weight on % of Availability and Quality between 90-100:
                  Exceeds expectations; demonstrates exceptional leadership and
                  outcomes.
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-24 font-medium text-blue-600">Good</div>
                <div>
                  Total Weight on % of Availability and Quality between 70-89:
                  Meets expectations; shows consistent and effective
                  performance.
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-24 font-medium text-yellow-600">
                  Satisfactory
                </div>
                <div>
                  Total Weight on % of Availability and Quality between 50-69:
                  Partially meets expectations; some areas require improvement.
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-24 font-medium text-red-600">
                  Unsatisfactory
                </div>
                <div>
                  Total Weight on % of Availability and Quality &lt;50: Does not
                  meet expectations; significant improvement needed.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-8 border-t border-blue-100 pt-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-6">
              Results Summary
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-600">
                  Headteacher Comments and Signature
                </h3>

                <div>
                  <Label htmlFor="headteacherComment">Comments</Label>
                  <Textarea
                    id="headteacherComment"
                    value={resultsSummary.headteacherComment}
                    onChange={(e) =>
                      handleChange("headteacherComment", e.target.value)
                    }
                    placeholder="Enter headteacher comments..."
                    className="min-h-[150px]"
                  />
                </div>

                <div>
                  <Label htmlFor="headteacherSignature">Signature</Label>
                  <Input
                    id="headteacherSignature"
                    value={resultsSummary.headteacherSignature}
                    onChange={(e) =>
                      handleChange("headteacherSignature", e.target.value)
                    }
                    placeholder="Enter headteacher signature..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-600">
                  Evaluator Comments and Signature
                </h3>

                <div>
                  <Label htmlFor="evaluatorComment">Comments</Label>
                  <Textarea
                    id="evaluatorComment"
                    value={resultsSummary.evaluatorComment}
                    onChange={(e) =>
                      handleChange("evaluatorComment", e.target.value)
                    }
                    placeholder="Enter evaluator comments..."
                    className="min-h-[150px]"
                  />
                </div>

                <div>
                  <Label htmlFor="evaluatorSignature">Signature</Label>
                  <Input
                    id="evaluatorSignature"
                    value={resultsSummary.evaluatorSignature}
                    onChange={(e) =>
                      handleChange("evaluatorSignature", e.target.value)
                    }
                    placeholder="Enter evaluator signature..."
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
