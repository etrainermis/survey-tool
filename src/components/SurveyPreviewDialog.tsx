"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Survey {
  id: string
  school: {
    name: string
  }
  createdAt: string
  collectedData?: any
}

interface SurveyPreviewDialogProps {
  survey: Survey | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Add this function at the top of the file, right after the SurveyPreviewDialogProps interface
const DataDebugger = ({ data }) => {
  return (
    <div className="mt-4 p-3 border border-gray-200 rounded-md bg-gray-50">
      <h4 className="font-medium text-gray-700 mb-2">Data Structure Preview</h4>
      <pre className="text-xs overflow-auto max-h-40 p-2 bg-white border border-gray-200 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

// Add the renderResultsSummary function
const renderResultsSummary = (schoolType, sectionMarks, totalMarks) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">Evaluation Results Summary</h3>
      </div>

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
        {[
          { key: "strategicPlanning", name: "Strategic Planning", max: 10 },
          { key: "operationalManagement", name: "School Operational Management", max: 30 },
          { key: "teachingLearning", name: "Leading Teaching and Learning", max: 20 },
          { key: "stakeholdersEngagement", name: "Stakeholders' Engagement", max: 10 },
          { key: "continuousImprovement", name: "Continuous Improvement", max: 10 },
          { key: "infrastructure", name: "Infrastructure and Environment", max: 20 },
        ].map((section, index) => (
          <div key={section.key}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {index + 1}. {section.name}
              </span>
              <span className="font-semibold">
                {sectionMarks[section.key].toFixed(2)} / {section.max}
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${(sectionMarks[section.key] / section.max) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Evaluator's Comments</h3>
        <textarea
          className="w-full border rounded-lg p-7 text-sm"
          placeholder="Comment from the evaluator..."
          readOnly
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm font-medium text-blue-700">Evaluator's Signature 1</p>
            <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="Signature..." readOnly />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Evaluator's Signature 2</p>
            <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="Signature..." readOnly />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Headteacher's Comments</h3>
        <textarea
          className="w-full border rounded-lg p-7 text-sm"
          placeholder="Comment from the headteacher..."
          readOnly
        ></textarea>

        <div className="mt-4">
          <p className="text-sm font-medium text-blue-700">Headteacher's Signature</p>
          <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="Signature..." readOnly />
        </div>
      </div>
    </div>
  )
}

export const SurveyPreviewDialog = ({ survey, open, onOpenChange }: SurveyPreviewDialogProps) => {
  const [step, setStep] = useState(0)

  if (!survey) return null

  // Parse the survey data
  const surveyData = survey.collectedData
    ? typeof survey.collectedData === "string"
      ? JSON.parse(survey.collectedData)
      : survey.collectedData
    : {}

  // Get the general information data - handle both string and object formats
  const generalInfo = surveyData.generalInformation
    ? typeof surveyData.generalInformation === "string"
      ? JSON.parse(surveyData.generalInformation)
      : surveyData.generalInformation
    : {}

  // Add a console log to help debug
  console.log("Survey data:", surveyData)
  console.log("General info:", generalInfo)

  // Get evaluation data
  const evaluationData = surveyData.evaluation || {}

  // Extract school type for the summary
  const schoolCategory = generalInfo?.school?.category || ""
  const schoolType =
    schoolCategory.toLowerCase().includes("boarding") || schoolCategory.toLowerCase().includes("mixed")
      ? "boarding"
      : "day"

  // Calculate section marks for the summary
  const sectionMarks = {
    strategicPlanning: evaluationData.strategicPlanning?.totalMarks || 0,
    operationalManagement: evaluationData.operationalManagement?.totalMarks || 0,
    teachingLearning: evaluationData.teachingAndLearning?.totalMarks || 0,
    stakeholdersEngagement: evaluationData.stakeholdersEngagement?.totalMarks || 0,
    continuousImprovement: evaluationData.continuousImprovement?.totalMarks || 0,
    infrastructure: evaluationData.infrastructureAndEnvironment?.totalMarks || 0,
  }

  // Calculate total marks
  const totalMarks = Object.values(sectionMarks).reduce((sum: number, mark: any) => sum + Number(mark), 0)

  // Define all steps including the original 5, the evaluation sections, and the final summary
  const steps = [
    {
      title: "School Information",
      content: renderSchoolInformation(generalInfo),
    },
    {
      title: "Company Information",
      content: renderCompanyInformation(generalInfo),
    },
    {
      title: "Trade Information",
      content: renderTradeInformation(generalInfo),
    },
    {
      title: "Infrastructure",
      content: renderInfrastructure(generalInfo),
    },
    {
      title: "IT Infrastructure",
      content: renderITInfrastructure(generalInfo),
    },
    // Evaluation sections
    {
      title: "1. Strategic Planning",
      content: renderStrategicPlanning(evaluationData.strategicPlanning),
    },
    {
      title: "2. School Operational Management",
      content: renderOperationalManagement(evaluationData.operationalManagement),
    },
    {
      title: "3. Leading Teaching and Learning",
      content: renderTeachingAndLearning(evaluationData.teachingAndLearning),
    },
    {
      title: "4. Stakeholders' Engagement",
      content: renderStakeholdersEngagement(evaluationData.stakeholdersEngagement),
    },
    {
      title: "5. Continuous Improvement",
      content: renderContinuousImprovement(evaluationData.continuousImprovement),
    },
    {
      title: "6. Infrastructure and Environment",
      content: renderInfrastructureAndEnvironment(evaluationData.infrastructureAndEnvironment),
    },
    // Final results summary
    {
      title: "Results Summary",
      content: renderResultsSummary(schoolType, sectionMarks, totalMarks),
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Determine if we're in the evaluation section
  const isEvaluationSection = step >= 5

  // Update the isEvaluationSection styling to use blue instead of yellow
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800">Survey Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                <span className="text-blue-700">School:</span> {survey.school.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Completed on:</span> {new Date(survey.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-sm bg-blue-100 px-3 py-1 rounded-full">
              Step {step + 1} of {steps.length}
            </div>
          </div>

          <div className="w-full bg-blue-100 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <Card className="p-4 border-blue-200">
            <h3 className="font-semibold text-blue-700 text-lg mb-3">
              {steps[step].title}
              {isEvaluationSection && <span className="text-sm font-normal ml-2">(Evaluation)</span>}
            </h3>
            <div className="bg-white p-4 rounded-md text-sm overflow-x-auto">{steps[step].content}</div>
          </Card>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-blue-300 text-blue-700">
            Close
          </Button>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 0}
            className="border-blue-300 text-blue-700 "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={step === steps.length - 1}
            className="border-blue-300 text-blue-700 "
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {/* <DataDebugger data={surveyData} /> */}
      </DialogContent>
    </Dialog>
  )
}

// Update the renderSchoolInformation function to better handle data
const renderSchoolInformation = (data: any) => {
  // Try to access school data from different possible structures
  const school = data?.school || data || {}

  // Debug what we're getting
  console.log("School data in render function:", school)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-blue-600 mb-2">Basic Information</h4>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {school.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span> {school.status || "N/A"}
            </p>
            <p>
              <span className="font-medium">Category:</span> {school.category || "N/A"}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-blue-600 mb-2">Contact Information</h4>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {school.contact?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {school.contact?.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Head Teacher:</span> {school.contact?.headteacher || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Staff Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Male Teachers:</span> {school.stats?.maleTeachers || "0"}
          </p>
          <p>
            <span className="font-medium">Female Teachers:</span> {school.stats?.femaleTeachers || "0"}
          </p>
          <p>
            <span className="font-medium">Total Teachers:</span>{" "}
            {Number(school.stats?.maleTeachers || 0) + Number(school.stats?.femaleTeachers || 0) || "0"}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Location</h4>
        <div className="grid grid-cols-2 gap-4">
          {school.location?.province && (
            <p>
              <span className="font-medium">Province:</span> {school.location.province}
            </p>
          )}
          {school.location?.district && (
            <p>
              <span className="font-medium">District:</span> {school.location.district}
            </p>
          )}
          {school.location?.sector && (
            <p>
              <span className="font-medium">Sector:</span> {school.location.sector}
            </p>
          )}
          {school.location?.cell && (
            <p>
              <span className="font-medium">Cell:</span> {school.location.cell}
            </p>
          )}
          {school.location?.village && (
            <p>
              <span className="font-medium">Village:</span> {school.location.village}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const renderCompanyInformation = (data: any) => {
  const companies = data?.companies || []

  if (companies.length === 0) {
    return <p className="text-gray-500 italic">No company information available</p>
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-blue-600 mb-2">Companies ({companies.length})</h4>

      {companies.map((company, index) => (
        <div key={index} className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <h5 className="font-medium text-blue-700 mb-2">Company {index + 1}</h5>
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium">Name:</span> {company.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Distance from School:</span> {company.distance || "N/A"} km
            </p>
          </div>

          <div className="mt-2">
            <p className="font-medium">Trades:</p>
            {company.trades && company.trades.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {company.trades.map((trade, tradeIndex) => (
                  <span key={tradeIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                    {trade}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No trades listed</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const renderTradeInformation = (data: any) => {
  const trades = data?.school?.trades || []

  if (trades.length === 0) {
    return <p className="text-gray-500 italic">No trade information available</p>
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-blue-600 mb-2">Trades ({trades.length})</h4>

      {trades.map((trade, index) => (
        <div key={index} className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-medium text-blue-700">{trade.name || `Trade ${index + 1}`}</h5>
            {trade.id && <span className="text-xs text-blue-600">ID: {trade.id}</span>}
          </div>

          {trade.levels && trade.levels.length > 0 ? (
            <div className="space-y-3">
              {trade.levels.map((level, levelIndex) => (
                <div key={levelIndex} className="border-t border-blue-100 pt-2">
                  <h6 className="font-medium">Level {level.level || levelIndex + 3}</h6>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <p>
                      <span className="font-medium">Virtual Classrooms:</span> {level.virtualClassrooms || "0"}
                    </p>
                    <p>
                      <span className="font-medium">Physical Classrooms:</span> {level.physicalClassrooms || "0"}
                    </p>
                    <p>
                      <span className="font-medium">Male Students:</span> {level.students?.male || "0"}
                    </p>
                    <p>
                      <span className="font-medium">Female Students:</span> {level.students?.female || "0"}
                    </p>
                    <p>
                      <span className="font-medium">Total Students:</span>{" "}
                      {Number.parseInt(level.students?.male || "0") + Number.parseInt(level.students?.female || "0") ||
                        "0"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">No level information available</p>
          )}
        </div>
      ))}
    </div>
  )
}

const renderInfrastructure = (data: any) => {
  const infrastructure = data?.infrastructure || []

  if (infrastructure.length === 0) {
    return <p className="text-gray-500 italic">No infrastructure information available</p>
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-blue-600 mb-2">Infrastructure ({infrastructure.length})</h4>

      {infrastructure.map((item, index) => (
        <div key={index} className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <h5 className="font-medium text-blue-700 capitalize mb-2">{item.type || `Infrastructure ${index + 1}`}</h5>

          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium">Size:</span> {item.size || "N/A"} sq. m
            </p>
            <p>
              <span className="font-medium">Capacity:</span> {item.capacity || "N/A"}
            </p>
            <p>
              <span className="font-medium">Construction Year:</span> {item.constructionYear || "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`capitalize ${
                  item.status === "good"
                    ? "text-green-600"
                    : item.status === "moderate"
                      ? "text-yellow-600"
                      : item.status === "poor"
                        ? "text-red-600"
                        : ""
                }`}
              >
                {item.status || "N/A"}
              </span>
            </p>
          </div>

          <div className="mt-2">
            <p className="font-medium">Construction Materials:</p>
            {item.materials && item.materials.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {item.materials.map((material, matIndex) => (
                  <span key={matIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                    {material}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-sm">No materials listed</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const renderITInfrastructure = (data: any) => {
  const it = data?.it || {}

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Computer Lab</h4>
        <div className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium">Total Computers:</span> {it.computerLab?.totalComputers || "0"}
            </p>
            <p>
              <span className="font-medium">Working Computers:</span> {it.computerLab?.workingComputers || "0"}
            </p>
            <p>
              <span className="font-medium">Non-Working Computers:</span> {it.computerLab?.nonWorkingComputers || "0"}
            </p>
            <p>
              <span className="font-medium">Connected with LAN:</span> {it.computerLab?.hasLAN ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Has Projectors:</span> {it.computerLab?.hasProjectors ? "Yes" : "No"}
            </p>

            {it.computerLab?.hasProjectors && (
              <>
                <p>
                  <span className="font-medium">Total Projectors:</span> {it.computerLab?.totalProjectors || "0"}
                </p>
                <p>
                  <span className="font-medium">Working Projectors:</span> {it.computerLab?.workingProjectors || "0"}
                </p>
                <p>
                  <span className="font-medium">Non-Working Projectors:</span>{" "}
                  {it.computerLab?.nonWorkingProjectors || "0"}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Internet & Server</h4>
        <div className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium">Internet Available:</span> {it.internet?.exists ? "Yes" : "No"}
            </p>
            {it.internet?.exists && (
              <p>
                <span className="font-medium">Internet Type:</span> {it.internet?.type || "N/A"}
              </p>
            )}
            <p>
              <span className="font-medium">Has Server:</span> {it.server?.exists ? "Yes" : "No"}
            </p>
            {it.server?.exists && (
              <p>
                <span className="font-medium">Server Specifications:</span> {it.server?.specifications || "N/A"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Energy Sources</h4>
        <div className="border border-blue-100 rounded-md p-3 bg-blue-50">
          {it.energySources && it.energySources.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {it.energySources.map((source, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                  {source}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No energy sources listed</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-blue-600 mb-2">Equipment Asset Register</h4>
        <div className="border border-blue-100 rounded-md p-3 bg-blue-50">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium">Has Asset Register:</span> {it.equipment?.hasAssetRegister ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`capitalize ${
                  it.equipment?.status === "good"
                    ? "text-green-600"
                    : it.equipment?.status === "moderate"
                      ? "text-yellow-600"
                      : it.equipment?.status === "poor"
                        ? "text-red-600"
                        : ""
                }`}
              >
                {it.equipment?.status || "N/A"}
              </span>
            </p>
            {/* <p>
              <span className="font-medium">Asset Register File:</span>{" "}
              {it.equipment?.assetRegisterFile ? "Uploaded" : "Not uploaded"}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the renderEvaluationTable function to remove the redundant "Total marks" column
const renderEvaluationTable = (data, items) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow className="bg-blue-50">
            <TableHead className="border border-gray-200 w-1/3">Evaluation area/Achievement indicators</TableHead>
            <TableHead className="border border-gray-200 w-1/6">Availability (Weight: 40%)</TableHead>
            <TableHead className="border border-gray-200 w-1/6">Quality (Weight: 60%)</TableHead>
            <TableHead className="border border-gray-200 w-1/12">Marks allocated</TableHead>
            <TableHead className="border border-gray-200 w-1/12">Marks Obtained</TableHead>
            <TableHead className="border border-gray-200">Observation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              className={item.isHeader ? "bg-blue-50 font-semibold" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <TableCell className="border border-gray-200 font-medium">{item.indicator}</TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : item.availability === "N/A" ? "N/A" : data?.[item.key]?.availability || ""}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : item.quality === "N/A" ? "N/A" : data?.[item.key]?.quality || ""}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : item.marksAllocated || ""}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : data?.[item.key]?.marksObtained || "0"}
              </TableCell>
              <TableCell className="border border-gray-200">
                {item.isHeader ? "" : data?.[item.key]?.observation || ""}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-blue-50">
            <TableCell colSpan={5} className="border border-gray-200 text-right font-bold">
              Total Marks:
            </TableCell>
            <TableCell className="border border-gray-200 text-center font-bold">{data?.totalMarks || "0"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

// Update the renderOverview function to use blue instead of yellow
const renderOverview = (data) => {
  return (
    <div className="mt-6 border border-gray-200 rounded-md p-4 bg-blue-50">
      <h4 className="font-semibold text-blue-700 mb-3">Overview of the findings</h4>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Strength:</p>
          <p className="bg-white p-2 rounded border border-gray-200">{data?.overview?.strength || "Not provided"}</p>
        </div>
        <div>
          <p className="font-medium">Weakness:</p>
          <p className="bg-white p-2 rounded border border-gray-200">{data?.overview?.weakness || "Not provided"}</p>
        </div>
        <div>
          <p className="font-medium">Area of improvement:</p>
          <p className="bg-white p-2 rounded border border-gray-200">{data?.overview?.improvement || "Not provided"}</p>
        </div>
      </div>
    </div>
  )
}

// Update the renderStrategicPlanning function to use a simpler header
const renderStrategicPlanning = (data = {}) => {
  const strategicPlanningItems = [
    {
      key: "strategicPlanningHeader",
      indicator: "1.1 Strategic Planning (6 marks)",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "strategicPlan",
      indicator: "Approved Strategic plan (Signed by the right authority)",
      availability: "",
      quality: "N/A",
      marksAllocated: "2",
    },
    { key: "schoolVision", indicator: "School vision", availability: "N/A", quality: "", marksAllocated: "1" },
    { key: "schoolMission", indicator: "School Mission", availability: "N/A", quality: "", marksAllocated: "1" },
    {
      key: "organizationalStructure",
      indicator: "Organizational structure",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "operationalBudget",
      indicator: "Operational budget",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "annualBudgetHeader",
      indicator: "1.2 Annual budget and Procurement plan (4 marks)",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "annualBudget",
      indicator: "Approved annual and budget plan",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "procurementPlan",
      indicator: "Approved procurement plan",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "businessPlan",
      indicator: "Business Plan for production unit",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "tenderCommittee",
      indicator: "Tender and receiving committee appointed (Valid appointment letter)",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">1. Strategic Planning (10 Marks)</h3>
      </div>

      {renderEvaluationTable(data, strategicPlanningItems)}
      {renderOverview(data)}
    </div>
  )
}

// Update the renderOperationalManagement function to include all components
const renderOperationalManagement = (data = {}) => {
  const operationalItems = [
    // Section headers should not have marks assigned
    {
      key: "schoolCommitteeHeader",
      indicator: "2.1 School Committee Governance (2 marks)",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "executiveCommittee",
      indicator: "Availability Of School Executive Committee (SEC)",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "feedingCommittee",
      indicator: "Availablity Of School Feeding Committee",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "executiveMinutes",
      indicator: "At least 1 minutes Of School Executive Committee meeting per term",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "generalAssembly",
      indicator: "One minutes Of School General Assembly (SGA) meeting per year",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "proceduresHeader", indicator: "2.2 Procedures and Communication", isHeader: true, marksAllocated: "" },

    {
      key: "organigram",
      indicator: "School organigram available and published",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "managementMeeting",
      indicator: "School Management Meeting per month (At least one minutes)",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "pedagogicalMeeting",
      indicator: "At least 6 Minutes Of School Pedagogical Meeting Per Year (two each term)",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "studentsMeeting",
      indicator: "At least 1 minutes of meetings Between School Administration And Students Per Term",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "staffMeeting",
      indicator: "At Least 2 Minutes Of Meeting Between School Administration And Supporting Staff Per Month",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "suggestionBox", indicator: "Suggestion Box", availability: "N/A", quality: "", marksAllocated: "0.5" },

    { key: "staffManagementHeader", indicator: "2.3 Staff Management", isHeader: true, marksAllocated: "" },
    {
      key: "workPerformance",
      indicator: "Work Performance Contract",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "performanceEvaluation",
      indicator: "Performance Evaluation Report",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "staffFile", indicator: "Staff File", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "tmisRegistration",
      indicator: "Registration of all staff in TMIS",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "sdmsRecord",
      indicator: "Record of staff information in SDMS",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "staffAttendance",
      indicator: "Staff Attendance Records",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "monthlyPayroll", indicator: "Monthly Payroll", availability: "N/A", quality: "", marksAllocated: "0.5" },
    {
      key: "capacityBuildingPlan",
      indicator: "Staff Capacity Building Plan",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "capacityBuildingReport",
      indicator: "Implementation Report Of Staff Capacity Building",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "disciplinaryCommittee",
      indicator: "Staff Disciplinary Committee / Reports",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "financialManagementHeader", indicator: "2.4 Financial management", isHeader: true, marksAllocated: "" },
    {
      key: "operationalBudget",
      indicator: "Operational Budget Plan",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "financialReport",
      indicator: "Monthly, Termly Financial Report and Annual Financial Report",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "auditReports",
      indicator: "Internal Audit Reports (Reports of school audit committee)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "procurementHeader", indicator: "2.5 Procurement Management", isHeader: true, marksAllocated: "" },
    { key: "procurementPlan", indicator: "Procurement Plan", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "tenderCommittee",
      indicator: "Tender Committee reports",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "tenderDocuments", indicator: "Tender Documents", availability: "", quality: "", marksAllocated: "0.5" },

    { key: "estateManagementHeader", indicator: "2.6 Estate Management", isHeader: true, marksAllocated: "" },
    {
      key: "infrastructureInventory",
      indicator: "Annual-Based Inventory Reports For Infrastructure",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "infrastructureMaintenance",
      indicator: "Annual Maintenance And Safety Report of Infrastructure",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "wasteManagement",
      indicator: "Waste Management Mechanism Including Bio Degradable And Non-Bio Degradable Waste",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "assetManagementHeader", indicator: "2.7 Asset Management", isHeader: true, marksAllocated: "" },
    { key: "storeCards", indicator: "Store Cards", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "requisitionForms",
      indicator: "Store Requisition Forms",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "equipmentInventory",
      indicator: "Term-Based Inventory Reports Of Equipment And Materials",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "maintenancePlan",
      indicator: "Term-Based Maintenance And Safety Plan",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "maintenanceReport",
      indicator: "Term-Based Maintenance And Safety Report",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "studentManagementHeader", indicator: "2.8 Student Management", isHeader: true, marksAllocated: "" },
    { key: "enrolmentPlan", indicator: "Enrolment Plan", availability: "N/A", quality: "", marksAllocated: "0.5" },
    {
      key: "traineeFilingSystem",
      indicator: "Trainee Filing System (Consider SDMS)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "feedingProgram",
      indicator: "Implementation report Of School Feeding Program",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "femaleRoom",
      indicator: "Operational Female Learner Room (Girls'room) and the sickbay for boarding schools",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "sportsRecreationPlan",
      indicator: "Operational Plan For Sports and Recreation",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "sportsRecreationReport",
      indicator: "Implementation Report On Sports And Recreation",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },

    { key: "consumablesHeader", indicator: "2.9 Training consumables management", isHeader: true, marksAllocated: "" },
    {
      key: "consumableFunds",
      indicator: "Consumable funds requests",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "consumableTenderCommittee",
      indicator: "Consumable tender committee (Appointment letter not exceeding 2 years)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "marketSurvey",
      indicator: "Consumable Market survey report",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "consumableProcurementPlan",
      indicator: "Consumable procurement plan",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "tenderPublication",
      indicator: "Publication of tender",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "tenderEvaluation",
      indicator: "Tender evaluation report",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "contracts", indicator: "Contracts", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "purchaseOrders", indicator: "Purchase orders", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "receivingCommittee",
      indicator: "Receiving committee (Appointment letter)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "deliveryNote", indicator: "Delivery note", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "goodsReceivedNote", indicator: "Good received note", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "storeCardsConsumables", indicator: "Store cards", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "mainStoreRequisition",
      indicator: "Consumables requisition form for the main store",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "miniStoreRequisition",
      indicator: "Consumables requisition form for the mini store",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "monthlyInventory",
      indicator: "Monthly inventory report",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "consumablesUtilization",
      indicator: "Consumables Utilization report",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "remainingBalance",
      indicator: "Availability of remaining balance from 2023/2024",
      availability: "N/A",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "bestPractices",
      indicator: "Availability of consumable best practices",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">2. School Operational Management (30 Marks)</h3>
      </div>

      {renderEvaluationTable(data, operationalItems)}
      {renderOverview(data)}
    </div>
  )
}

// Update the renderTeachingAndLearning function to mark section headers
const renderTeachingAndLearning = (data = {}) => {
  const teachingItems = [
    { key: "cbtHeader", indicator: "3.1 CBT/CBA", isHeader: true, marksAllocated: "" },
    {
      key: "curriculum",
      indicator: "validated Competence Based Curriculum (CBC)",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "guidingDocuments",
      indicator: "Guiding Documents regarding CBT/CBA Implementation",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "trainingPlanningHeader",
      indicator: "3.2 Training planning and delivery",
      isHeader: true,
      marksAllocated: "",
    },
    { key: "chronogram", indicator: "Validated Chronogram", availability: "N/A", quality: "", marksAllocated: "1" },
    { key: "timetable", indicator: "Training Timetable", availability: "", quality: "", marksAllocated: "2" },
    { key: "trainerPortfolios", indicator: "Trainer Portfolios", availability: "", quality: "", marksAllocated: "1" },
    {
      key: "pedagogicalDocuments",
      indicator:
        "Pedagogical documents (Scheme of Works, Handouts/notes, Session Plans), aligned with the overall curriculum and learning objectives",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "iapPlan",
      indicator: "Industrial Attachment Program (IAP) Plan",
      availability: "",
      quality: "",
      marksAllocated: "2",
    },
    { key: "iapReports", indicator: "IAP Completion Reports", availability: "", quality: "", marksAllocated: "1" },
    { key: "cbaImplementationHeader", indicator: "3.3 CBA implementation", isHeader: true, marksAllocated: "" },
    { key: "assessmentPlans", indicator: "Assessment Plans", availability: "", quality: "", marksAllocated: "2" },
    { key: "traineePortfolio", indicator: "Trainee Portfolio", availability: "", quality: "", marksAllocated: "1" },
    { key: "attendanceReports", indicator: "Attendance Reports", availability: "", quality: "", marksAllocated: "1" },
    {
      key: "sessionDelivery",
      indicator: "Session Delivery Monitoring Reports",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "portfolioVerification",
      indicator: "Portfolio Verification Reports",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "assessmentMonitoring",
      indicator: "Assessment Monitoring Reports",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "technologicalToolsHeader",
      indicator: "3.4 Use of technological tools",
      isHeader: true,
      marksAllocated: "",
    },
    { key: "digitalTools", indicator: "Digital tools", availability: "", quality: "", marksAllocated: "1" },
    {
      key: "feedbackTech",
      indicator: "Feedback from staff and students on technology use",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "efficiencyEvidence",
      indicator: "Evidence of improved efficiency",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">3. Leading Teaching and Learning (20 Marks)</h3>
      </div>

      {renderEvaluationTable(data, teachingItems)}
      {renderOverview(data)}
    </div>
  )
}

// Update the renderStakeholdersEngagement function to mark section headers
const renderStakeholdersEngagement = (data = {}) => {
  const stakeholdersItems = [
    { key: "partnershipDevHeader", indicator: "4.1 Partnership Development", isHeader: true, marksAllocated: "" },
    {
      key: "mous",
      indicator: "At Least 3 MoUs With Relevant Private Companies Per Each Trade",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "employersFeedback",
      indicator: "Employers feedback/ satisfaction survey results",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "trainingAdjustments",
      indicator: "Training adjustments evidence based on feedback",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "communityEngagementHeader",
      indicator: "4.2 Community and Alumni engagement",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "stakeholderMeetings",
      indicator: "Records of meetings and planning sessions with stakeholders",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "partnershipEvidence",
      indicator:
        "Minutes of meeting and records of planning sessions Evidence of partnerships with local organizations",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "graduateSystem",
      indicator: "Graduate Filing System for atleast previous 4 years",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "alumniRecords",
      indicator: "Records of alumni meetings, events, and or other communications",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    { key: "adaptabilityHeader", indicator: "4.3 Adaptability to Trends", isHeader: true, marksAllocated: "" },
    {
      key: "industryEngagement",
      indicator: "Industry engagement in training (contract, MoUs…)",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "trainingRelevance",
      indicator: "Feedback on training relevance",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "staffTraining",
      indicator: "Staff training sessions held",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "relationshipHeader", indicator: "4.4 Relationship with Subordinates", isHeader: true, marksAllocated: "" },
    {
      key: "subordinateFeedback",
      indicator: "Feedback from subordinates",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "conflictResolution",
      indicator: "Records of conflict resolution",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">4. Stakeholders' engagement (10 Marks)</h3>
      </div>

      {renderEvaluationTable(data, stakeholdersItems)}
      {renderOverview(data)}
    </div>
  )
}

// Update the renderContinuousImprovement function to mark section headers
const renderContinuousImprovement = (data = {}) => {
  const improvementItems = [
    { key: "professionalismHeader", indicator: "5.1 Professionalism", isHeader: true, marksAllocated: "" },
    { key: "cpdPlan", indicator: "CPD plan", availability: "N/A", quality: "", marksAllocated: "1" },
    {
      key: "cpdReports",
      indicator: "CPD implementation reports",
      availability: "N/A",
      quality: "",
      marksAllocated: "1",
    },
    { key: "ethicalRecord", indicator: "Free ethical record", availability: "", quality: "", marksAllocated: "1" },
    {
      key: "roleModeling",
      indicator: "Positive role modeling in professional settings",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "staffFeedback",
      indicator: "Staff feedback mechanisms",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "actionPlans",
      indicator: "Action plans based on feedback",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "implementedImprovements",
      indicator: "Implemented improvements",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    { key: "performanceMetricsHeader", indicator: "5.2 Performance Metrics", isHeader: true, marksAllocated: "" },
    {
      key: "kpis",
      indicator: "Documented KPIs or Performance review",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "dataDecisions",
      indicator: "Evidence of data-driven decisions",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
    {
      key: "recordsImprovements",
      indicator: "Records of implemented improvements",
      availability: "",
      quality: "",
      marksAllocated: "1",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">5. Continuous Improvement (10 Marks)</h3>
      </div>

      {renderEvaluationTable(data, improvementItems)}
      {renderOverview(data)}
    </div>
  )
}

// Fix the TypeScript error by adding proper type annotation
const renderInfrastructureAndEnvironment = (data: any = {}) => {
  // Extract school category from the data to determine if it's a day or boarding school
  const schoolCategory = data?.schoolCategory || data?.school?.category || ""
  const isBoardingSchool =
    schoolCategory.toLowerCase().includes("boarding") || schoolCategory.toLowerCase().includes("mixed")
  const isDaySchool = schoolCategory.toLowerCase().includes("day") || (!isBoardingSchool && schoolCategory !== "")

  // Common infrastructure items that appear regardless of school type
  const commonInfrastructureItems = [
    { key: "adminBlockHeader", indicator: "6.1 Administration Block", isHeader: true, marksAllocated: "" },
    { key: "offices", indicator: "Offices of all staff", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "meetingRooms", indicator: "Meeting rooms", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "emergencyExits", indicator: "Emergency exits", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "ventilation", indicator: "Ventilation and lighting", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "classroomBlockHeader", indicator: "6.2 Classroom Block", isHeader: true, marksAllocated: "" },
    {
      key: "capacity",
      indicator: "Capacity to accommodate students comfortably",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "desks", indicator: "Desks and chairs", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "classVentilation",
      indicator: "ventilation and lighting",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "classEmergency", indicator: "Emergency exits", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "computerLabHeader", indicator: "6.3 Computer Lab", isHeader: true, marksAllocated: "" },
    {
      key: "computers",
      indicator: "Functional computers related to the number of students",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "internet", indicator: "internet access", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "workstations", indicator: "setup of workstations", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "studyAreas",
      indicator: "Accessibility and quiet study areas",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "libraryHeader", indicator: "6.4 Library", isHeader: true, marksAllocated: "" },
    { key: "books", indicator: "Books and other resources", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "studyArea", indicator: "Study area", availability: "", quality: "", marksAllocated: "0.5" },
    {
      key: "booksCondition",
      indicator: "Condition of books and resources",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "libraryComputers", indicator: "Computers", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "kitchenHeader", indicator: "6.5 Kitchen", isHeader: true, marksAllocated: "" },
    {
      key: "healthSafety",
      indicator: "Compliance with health and safety regulations",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "foodStorage",
      indicator: "Cleanliness and organization of food storage",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "sanitationFacilities",
      indicator: "Proper sanitation facilities for food preparation",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "refectoryHeader", indicator: "6.6 Refectory", isHeader: true, marksAllocated: "" },
    {
      key: "tables",
      indicator: "Condition of tables and seating arrangements",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "cleanliness",
      indicator: "Cleanliness and hygiene practices",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "refectoryVentilation", indicator: "Ventilation", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "wasteDisposal", indicator: "Waste disposal systems", availability: "", quality: "", marksAllocated: "0.5" },
  ]

  // Items specific to day schools
  const daySchoolItems = [
    {
      key: "changingRoomsHeader",
      indicator: "6.7 Changing rooms (for day school only)",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "separateChangingRooms",
      indicator: "Separate changing rooms for girls and boys",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "girlsChangingRoom",
      indicator: "Cleanliness of girls' changing room",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "boysChangingRoom",
      indicator: "Cleanliness of boys' changing room",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
  ]

  // Items specific to boarding schools
  const boardingSchoolItems = [
    { key: "dormitoriesHeader", indicator: "6.8 Dormitories", isHeader: true, marksAllocated: "" },
    {
      key: "separateDormitories",
      indicator: "Separate dormitories for girls and boys",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "girlsDormitories",
      indicator: "Cleanliness of girls' dormitories",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "boysDormitories",
      indicator: "Cleanliness of boys' dormitories",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
  ]

  // Items that appear after the conditional sections
  const remainingInfrastructureItems = [
    { key: "washroomsHeader", indicator: "6.9 Washrooms", isHeader: true, marksAllocated: "" },
    {
      key: "separateWashrooms",
      indicator: "Separate washrooms for girls and boys",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "girlsWashrooms",
      indicator: "Cleanliness of girls' washrooms",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "boysWashrooms",
      indicator: "Cleanliness of boys' washrooms",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "toiletsHeader", indicator: "6.10 Toilets", isHeader: true, marksAllocated: "" },
    {
      key: "separateToilets",
      indicator: "Separate toilets for girls and boys",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "girlsToilets",
      indicator: "Cleanliness of girls' toilets",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "boysToilets",
      indicator: "Cleanliness of boys' toilets",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "playgroundsHeader",
      indicator: "6.11 Playgrounds and other sports facilities",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "playground",
      indicator: "Atleast one playground among football, volleyball and basketball",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "sportsFacilities",
      indicator: "Sports facilities (balls and kits)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "schoolGardenHeader", indicator: "6.12 School Garden", isHeader: true, marksAllocated: "" },
    {
      key: "plantsSafety",
      indicator: "Health and safety of plants (non-toxic)",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "educationalGarden", indicator: "Educational garden", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "workshopsHeader", indicator: "6.13 Workshops", isHeader: true, marksAllocated: "" },
    {
      key: "toolsCondition",
      indicator: "Condition of tools and machinery",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    {
      key: "workshopVentilation",
      indicator: "Proper ventilation and safety measures",
      availability: "",
      quality: "",
      marksAllocated: "0.5",
    },
    { key: "storeArrangement", indicator: "Store arrangement", availability: "", quality: "", marksAllocated: "0.5" },
    { key: "workshopCleanliness", indicator: "Cleanliness", availability: "", quality: "", marksAllocated: "0.5" },
  ]

  // Combine the appropriate items based on school type
  let infrastructureItems = [...commonInfrastructureItems]

  // INTEGRATION NOTE: This is where we conditionally add either day school or boarding school items
  if (isDaySchool) {
    infrastructureItems = [...infrastructureItems, ...daySchoolItems]
  } else if (isBoardingSchool) {
    infrastructureItems = [...infrastructureItems, ...boardingSchoolItems]
  } else {
    // If school type is unknown, include both sections but add a note
    infrastructureItems = [
      ...infrastructureItems,
      {
        key: "schoolTypeNote",
        indicator: "Note: Please specify if this is a day or boarding school",
        isHeader: true,
        marksAllocated: "",
      },
      ...daySchoolItems,
      ...boardingSchoolItems,
    ]
  }

  // Add the remaining items
  infrastructureItems = [...infrastructureItems, ...remainingInfrastructureItems]

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-3 rounded-md text-center">
        <h3 className="font-bold text-blue-800">6. Infrastructure and Environment (Hygiene and Safety) (20 Marks)</h3>
        {/* Display school type for clarity */}
        {isDaySchool && <p className="text-sm text-blue-600 mt-1">Day School</p>}
        {isBoardingSchool && <p className="text-sm text-blue-600 mt-1">Boarding School</p>}
      </div>

      {renderEvaluationTable(data, infrastructureItems)}
      {renderOverview(data)}
    </div>
  )
}

