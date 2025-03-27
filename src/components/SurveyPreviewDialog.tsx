"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOneSurvey } from "@/hooks/useOneSurvey"

interface Survey {
  id: string
  school: {
    id: string;
    name: string
  }
  createdAt: string
  data: any
  strategicPlanning: any
  operationalManagement: any
  teachingAndLearning: any
  stakeholdersEngagement: any
  continuousImprovement: any
  infrastructureAndEnvironment: any
  
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
  console.log("Section marks:", sectionMarks);
  console.log("Total marks:", totalMarks);

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
        ].map((section, index) => {
          // Access totalMarks from the data directly for each section
          const score = Number(sectionMarks[section.key]?.totalMarks) || 0; // Convert to number and default to 0 if NaN or undefined
          return (
            <div key={section.key}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {index + 1}. {section.name}
                </span>
                <span className="font-semibold">
                  {score.toFixed(2)} / {section.max}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(score / section.max) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
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

    // Use the hook to fetch survey data based on schoolId
    const { survey: fetchedSurvey, fetchingSurvey, errorFetchingSurvey } = useOneSurvey(survey?.school.id || "");

    // If survey is not available or is still loading, render loading or error states
    if (fetchingSurvey) return <div>Loading...</div>;
    if (errorFetchingSurvey) return <div>Error loading survey data.</div>;
  
    // Handle case where survey or fetchedSurvey is null or undefined
    if (!fetchedSurvey) return null;

  // Parse the survey data
  const surveyData = fetchedSurvey?.data
  ? typeof fetchedSurvey.data === "string"
    ? JSON.parse(fetchedSurvey.data)
    : fetchedSurvey.data
  : {}

    

  // Get the general information data - handle both string and object formats
  const generalInfo = surveyData?.generalInformation
    ? typeof surveyData.generalInformation === "string"
      ? JSON.parse(surveyData.generalInformation)
      : surveyData.generalInformation
    : {}

    //

  // Add a console log to help debug
  console.log("Survey data:", surveyData)
  console.log("General information:", generalInfo)
  



  const evaluationData = surveyData?.strategicPlanning
  ? typeof surveyData.strategicPlanning === "string"
    ? JSON.parse(surveyData.strategicPlanning)
    : surveyData.strategicPlanning
  : {}
  
  console.log("Evaluation data:", evaluationData)

  const evaluationDataOne = surveyData?.operationalManagement
  ? typeof surveyData.operationalManagement === "string"
    ? JSON.parse(surveyData.operationalManagement)
    : surveyData.operationalManagement
  : {}

  console.log("Evaluation data one:", evaluationDataOne)

  const evaluationDataTwo = surveyData?.teachingAndLearning
  ? typeof surveyData.teachingAndLearning === "string"
    ? JSON.parse(surveyData.teachingAndLearning)
    : surveyData.teachingAndLearning
  : {}
  
  console.log("Evaluation data one:", evaluationDataTwo)

    const evaluationDataThree = surveyData?.stakeholdersEngagement
  ? typeof surveyData.stakeholdersEngagement === "string"
    ? JSON.parse(surveyData.stakeholdersEngagement)
    : surveyData.stakeholdersEngagement
  : {}
  
  console.log("Evaluation data one:", evaluationDataThree)

  const evaluationDataFour = surveyData?.continuousImprovement
  ? typeof surveyData.continuousImprovement === "string"
    ? JSON.parse(surveyData.continuousImprovement)
    : surveyData.continuousImprovement
  : {}
  
  console.log("Evaluation data one:", evaluationDataFour)

  const evaluationDataFive = surveyData?.infrastructureAndEnvironment
  ? typeof surveyData.infrastructureAndEnvironment === "string"
    ? { ...JSON.parse(surveyData.infrastructureAndEnvironment), schoolCategory: generalInfo?.school?.category || "" }
    : { ...surveyData.infrastructureAndEnvironment, schoolCategory: generalInfo?.school?.category || "" }
  : {};
  
  console.log("Evaluation data one:", evaluationDataFive)

  // Extract school type for the summary
  const schoolCategory = generalInfo?.school?.category || ""
  const schoolType =
    schoolCategory.toLowerCase().includes("boarding") || schoolCategory.toLowerCase().includes("mixed")
      ? "boarding"
      : "day"

  // Calculate section marks for the summary
  const sectionMarks = {
    strategicPlanning: evaluationData.sectionMarks || 0,
    operationalManagement: evaluationDataOne.sectionMarks  || 0,
    teachingLearning: evaluationDataTwo.sectionMarks  || 0,
    stakeholdersEngagement: evaluationDataThree.sectionMarks  || 0,
    continuousImprovement: evaluationDataFour.sectionMarks  || 0,
    infrastructure: evaluationDataFive.sectionMarks  || 0,
  }

// Calculate total marks
const totalMarks = Object.values(sectionMarks).reduce((sum: number, mark: any) => {
  // Ensure we're adding the actual number of marks (not the whole object)
  return sum + (mark.totalMarks ? Number(mark.totalMarks) : 0);
}, 0);

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
      content: renderStrategicPlanning(evaluationData),
    },
    {
      title: "2. School Operational Management",
      content: renderOperationalManagement(evaluationDataOne),
    },
    {
      title: "3. Leading Teaching and Learning",
      content: renderTeachingAndLearning(evaluationDataTwo),
    },
    {
      title: "4. Stakeholders' Engagement",
      content: renderStakeholdersEngagement(evaluationDataThree),
    },
    {
      title: "5. Continuous Improvement",
      content: renderContinuousImprovement(evaluationDataFour),
    },
    {
      title: "6. Infrastructure and Environment",
      content: renderInfrastructureAndEnvironment(evaluationDataFive),
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
  const school = data?.school || data || {};
  const generalInfo= data?.generalInformation || data || {};
 

  // Debug what we're getting
  console.log("School data:", school);

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
              <span className="font-medium">Email:</span> {school.contact.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {school.contact.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Head Teacher:</span> {school.contact.headteacher || "N/A"}
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

const renderEvaluationTable = (data, items) => {
  const calculateTableTotal = (items, data) => {
    return items.reduce((total, item) => {
      if (item.isHeader) return total; // Skip header rows

      const availability = (data?.[item.key]?.availability ?? item.availability) === -1 
        ? 0 
        : (data?.[item.key]?.availability ?? item.availability);

      const quality = (data?.[item.key]?.quality ?? item.quality) === -1 
        ? 0 
        : (data?.[item.key]?.quality ?? item.quality);

      return total + availability + quality;
    }, 0);
  };

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
                {item.isHeader ? "" : ((data?.[item.key]?.availability ?? item.availability) === -1 ? "N/A" : (data?.[item.key]?.availability ?? item.availability))}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : ((data?.[item.key]?.quality ?? item.quality) === -1 ? "N/A" : (data?.[item.key]?.quality ?? item.quality))}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : (data?.[item.key]?.marksAllocated ?? item.marksAllocated)}
              </TableCell>
              <TableCell className="border border-gray-200 text-center">
                {item.isHeader ? "" : 
                  ((data?.[item.key]?.availability ?? item.availability) === -1 ? 0 : (data?.[item.key]?.availability ?? item.availability)) +
                  ((data?.[item.key]?.quality ?? item.quality) === -1 ? 0 : (data?.[item.key]?.quality ?? item.quality))
                }
              </TableCell>
              <TableCell className="border border-gray-200">
                {item.isHeader ? "" : (data?.[item.key]?.observation?.trim() || "No Observations made")}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-blue-50">
            <TableCell colSpan={5} className="border border-gray-200 text-right font-bold">
              Total Marks:
            </TableCell>
            <TableCell className="border border-gray-200 text-center font-bold">
              {calculateTableTotal(items, data) || "0"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};



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
const renderStrategicPlanning = (data: any = {}) => {

  const strategicPlan = data?.strategicPlanning || data || {};
  console.log("strategic planning:", strategicPlan)
  console.log("strategic planning Annual Budget Availability:", strategicPlan.annualBudgetPlan.availability)
  console.log("availability",strategicPlan.tenderCommittee.availability)
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
      availability: strategicPlan.strategicPlan.availability || "N/A",
      quality: strategicPlan.strategicPlan.quality || "N/A",
      marksAllocated: strategicPlan.strategicPlan.marksAllocated|| "N/A",
    },
    { key: "schoolVision", 
      indicator: "School vision", 
      availability: strategicPlan.schoolVision.availability || "N/A", 
      quality: strategicPlan.schoolVision.quality || "N/A", 
      marksAllocated: strategicPlan.schoolVision.marksAllocated },
      { key: "schoolMission", 
        indicator: "School mission", 
        availability: strategicPlan.schoolMission.availability || "N/A", 
        quality: strategicPlan.schoolMission.quality || "N/A", 
        marksAllocated: strategicPlan.schoolMission.marksAllocated },
    {
      key: "organizationalStructure",
      indicator: "Organizational structure",
      availability: strategicPlan.organizationalStructure.availability || "N/A", 
      quality: strategicPlan.organizationalStructure.quality || "N/A", 
      marksAllocated: strategicPlan.organizationalStructure.marksAllocated || "N/A",
    },
    {
      key: "operationalBudget",
      indicator: "Operational budget",
      availability: strategicPlan.operationalBudget.availability || "N/A", 
      quality: strategicPlan.operationalBudget.quality || "N/A", 
      marksAllocated: strategicPlan.operationalBudget.marksAllocated || "N/A",
    },
    {
      key: "annualBudgetHeader",
      indicator: "1.2 Annual budget and Procurement plan (4 marks)",
      isHeader: true,
      marksAllocated: "",
    },
    {
      key: "annualBudgetPlan",
      indicator: "Approved Strategic plan (Signed by the right authority)",
      availability: strategicPlan.annualBudgetPlan.availability || "N/A",
      quality: strategicPlan.annualBudgetPlan.quality || "N/A",
      marksAllocated: strategicPlan.annualBudgetPlan.marksAllocated|| "N/A",
    },
    
    {
      key: "procurementPlan",
      indicator: "Approved procurement plan",
      availability: strategicPlan.procurementPlan.availability || "N/A",
      quality: strategicPlan.procurementPlan.quality || "N/A",
      marksAllocated: strategicPlan.procurementPlan.marksAllocated|| "N/A",
    },
  
    

    {
      key: "businessPlan",
      indicator: "Business Plan for production unit",
      availability: strategicPlan.businessPlan.availability || "N/A",
      quality: strategicPlan.businessPlan.quality || "N/A",
      marksAllocated: strategicPlan.businessPlan.marksAllocated || "N/A",
    },
    {
      key: "tenderCommittee",
      indicator: "Tender and receiving committee appointed (Valid appointment letter)",
      availability: strategicPlan.tenderCommittee.availability || "N/A",
      quality: strategicPlan.tenderCommittee.quality || "N/A",
      marksAllocated: strategicPlan.tenderCommittee.marksAllocated || "N/A",
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
const renderOperationalManagement = (data: any = {}) => {
  const operationalManagement = data?.operationalManagement || data || {};
  console.log("operationalManagement", operationalManagement)
  console.log("operationalManagementSec", operationalManagement.sec)

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
      availability: operationalManagement.sec.availability ?? "N/A",
      quality: operationalManagement.sec.quality ?? "N/A",
      marksAllocated: operationalManagement.sec.marksAllocated ?? "0.5",
    },
    {
      key: "feedingCommittee",
      indicator: "Availablity Of School Feeding Committee",
      availability: operationalManagement.feedingCommittee.availability ?? "N/A",
      quality: operationalManagement.feedingCommittee.quality ?? "N/A",
      marksAllocated: operationalManagement.feedingCommittee.marksAllocated ?? "0.5",
    },
    {
      key: "executiveMinutes",
      indicator: "At least 1 minutes Of School Executive Committee meeting per term",
      availability: operationalManagement.secMinutes.availability ?? "N/A",
      quality: operationalManagement.secMinutes.quality ?? "N/A",
      marksAllocated: operationalManagement.secMinutes.marksAllocated ?? "0.5",
    },
    {
      key: "generalAssembly",
      indicator: "One minutes Of School General Assembly (SGA) meeting per year",
      availability: operationalManagement.sgaMinutes.availability ?? "N/A",
      quality: operationalManagement.sgaMinutes.quality ?? "N/A",
      marksAllocated: operationalManagement.sgaMinutes.marksAllocated ?? "0.5",
    },

    { key: "proceduresHeader", indicator: "2.2 Procedures and Communication", isHeader: true, marksAllocated: "" },

    {
      key: "organigram",
      indicator: "School organigram available and published",
      availability: operationalManagement.organigram.availability ?? "N/A",
      quality: operationalManagement.organigram.quality ?? "N/A",
      marksAllocated: operationalManagement.organigram.marksAllocated ?? "0.5",
    },
    {
      key: "managementMeeting",
      indicator: "School Management Meeting per month (At least one minutes)",
      availability: operationalManagement.managementMeeting.availability ?? "N/A",
      quality: operationalManagement.managementMeeting.quality ?? "N/A",
      marksAllocated: operationalManagement.managementMeeting.marksAllocated ?? "0.5",
    },
    {
      key: "pedagogicalMeeting",
      indicator: "At least 6 Minutes Of School Pedagogical Meeting Per Year (two each term)",
      availability: operationalManagement.pedagogicalMeeting.availability ?? "N/A",
      quality: operationalManagement.pedagogicalMeeting.quality ?? "N/A",
      marksAllocated: operationalManagement.pedagogicalMeeting.marksAllocated ?? "0.5",
    },
    {
      key: "studentsMeeting",
      indicator: "At least 1 minutes of meetings Between School Administration And Students Per Term",
      availability: operationalManagement.studentsMeeting.availability ?? "N/A",
      quality: operationalManagement.studentsMeeting.quality ?? "N/A",
      marksAllocated: operationalManagement.studentsMeeting.marksAllocated ?? "0.5",
    },
    {
      key: "staffMeeting",
      indicator: "At Least 2 Minutes Of Meeting Between School Administration And Supporting Staff Per Month",
      availability: operationalManagement.staffMeeting.availability ?? "N/A",
      quality: operationalManagement.staffMeeting.quality ?? "N/A",
      marksAllocated: operationalManagement.staffMeeting.marksAllocated ?? "0.5",
    },
    { key: "suggestionBox", 
      indicator: "Suggestion Box", 
      availability: operationalManagement.suggestionBox.availability ?? "N/A",
      quality: operationalManagement.suggestionBox.quality ?? "N/A",
      marksAllocated: operationalManagement.suggestionBox.marksAllocated ?? "0.5",
     },

    { key: "staffManagementHeader", indicator: "2.3 Staff Management", isHeader: true, marksAllocated: "" },
    {
      key: "workPerformance",
      indicator: "Work Performance Contract",
      availability: operationalManagement.workPerformance.availability ?? "N/A",
      quality: operationalManagement.workPerformance.quality ?? "N/A",
      marksAllocated: operationalManagement.workPerformance.marksAllocated ?? "0.5",
    },
    {
      key: "performanceEvaluation",
      indicator: "Performance Evaluation Report",
      availability: operationalManagement.performanceEvaluation.availability ?? "N/A",
      quality: operationalManagement.performanceEvaluation.quality ?? "N/A",
      marksAllocated: operationalManagement.performanceEvaluation.marksAllocated ?? "0.5",
    },
    { key: "staffFile", 
      indicator: "Staff File", 
      availability: operationalManagement.staffFile.availability ?? "N/A",
      quality: operationalManagement.staffFile.quality ?? "N/A",
      marksAllocated: operationalManagement.staffFile.marksAllocated ?? "0.5",
    },
    {
      key: "tmiRegistration",
      indicator: "Registration of all staff in TMIS",
      availability: operationalManagement.tmiRegistration.availability ?? "N/A",
      quality: operationalManagement.tmiRegistration.quality ?? "N/A",
      marksAllocated: operationalManagement.tmiRegistration.marksAllocated ?? "0.5",
    },
    {
      key: "sdmsRecord",
      indicator: "Record of staff information in SDMS",
      availability: operationalManagement.sdmsRecord.availability ?? "N/A",
      quality: operationalManagement.sdmsRecord.quality ?? "N/A",
      marksAllocated: operationalManagement.sdmsRecord.marksAllocated ?? "0.5",
    },
    {
      key: "staffAttendance",
      indicator: "Staff Attendance Records",
      availability: operationalManagement.staffAttendance.availability ?? "N/A",
      quality: operationalManagement.staffAttendance.quality ?? "N/A",
      marksAllocated: operationalManagement.staffAttendance.marksAllocated ?? "0.5",
    },
    { 
      key: "monthlyPayroll", 
      indicator: "Monthly Payroll", 
      availability: operationalManagement.monthlyPayroll.availability ?? "N/A",
      quality: operationalManagement.monthlyPayroll.quality ?? "N/A",
      marksAllocated: operationalManagement.monthlyPayroll.marksAllocated ?? "0.5",
     },

    {
      key: "capacityBuildingPlan",
      indicator: "Staff Capacity Building Plan",
      availability: operationalManagement.capacityBuildingPlan.availability ?? "N/A",
      quality: operationalManagement.capacityBuildingPlan.quality ?? "N/A",
      marksAllocated: operationalManagement.capacityBuildingPlan.marksAllocated ?? "0.5",
    },
    {
      key: "capacityBuildingReport",
      indicator: "Implementation Report Of Staff Capacity Building",
      availability: operationalManagement.capacityBuildingReport.availability ?? "N/A",
      quality: operationalManagement.capacityBuildingReport.quality ?? "N/A",
      marksAllocated: operationalManagement.capacityBuildingReport.marksAllocated ?? "0.5",
    },
    {
      key: "disciplinaryCommittee",
      indicator: "Staff Disciplinary Committee / Reports",
      availability: operationalManagement.disciplinaryCommittee.availability ?? "N/A",
      quality: operationalManagement.disciplinaryCommittee.quality ?? "N/A",
      marksAllocated: operationalManagement.disciplinaryCommittee.marksAllocated ?? "0.5",
    },

    { key: "financialManagementHeader", indicator: "2.4 Financial management", isHeader: true, marksAllocated: "" },
    {
      key: "operationalBudget",
      indicator: "Operational Budget Plan",
      availability: operationalManagement.operationalBudget.availability ?? "N/A",
      quality: operationalManagement.operationalBudget.quality ?? "N/A",
      marksAllocated: operationalManagement.operationalBudget.marksAllocated ?? "0.5",
    },
    {
      key: "financialReports",
      indicator: "Monthly, Termly Financial Report and Annual Financial Report",
      availability: operationalManagement.financialReports.availability ?? "N/A",
      quality: operationalManagement.financialReports.quality ?? "N/A",
      marksAllocated: operationalManagement.financialReports.marksAllocated ?? "0.5",
    },
    {
      key: "auditReports",
      indicator: "Internal Audit Reports (Reports of school audit committee)",
      availability: operationalManagement.auditReports.availability ?? "N/A",
      quality: operationalManagement.auditReports.quality ?? "N/A",
      marksAllocated: operationalManagement.auditReports.marksAllocated ?? "0.5",
    },

    { key: "procurementHeader", indicator: "2.5 Procurement Management", isHeader: true, marksAllocated: "" },
    { key: "procurementPlan", 
      indicator: "Procurement Plan", 
      availability: operationalManagement.procurementPlan.availability ?? "N/A",
      quality: operationalManagement.procurementPlan.quality ?? "N/A",
      marksAllocated: operationalManagement.procurementPlan.marksAllocated ?? "0.5",
    },
    {
      key: "tenderCommitteeReports",
      indicator: "Tender Committee reports",
      availability: operationalManagement.tenderCommitteeReports.availability ?? "N/A",
      quality: operationalManagement.tenderCommitteeReports.quality ?? "N/A",
      marksAllocated: operationalManagement.tenderCommitteeReports.marksAllocated ?? "0.5",
    },
    { key: "tenderDocuments", 
      indicator: "Tender Documents", 
      availability: operationalManagement.tenderDocuments.availability ?? "N/A",
      quality: operationalManagement.tenderDocuments.quality ?? "N/A",
      marksAllocated: operationalManagement.tenderDocuments.marksAllocated ?? "0.5",
    },

    { key: "estateManagementHeader", indicator: "2.6 Estate Management", isHeader: true, marksAllocated: "" },
    {
      key: "infrastructureInventory",
      indicator: "Annual-Based Inventory Reports For Infrastructure",
      availability: operationalManagement.infrastructureInventory.availability ?? "N/A",
      quality: operationalManagement.infrastructureInventory.quality ?? "N/A",
      marksAllocated: operationalManagement.infrastructureInventory.marksAllocated ?? "0.5",
    },
    {
      key: "infrastructureMaintenance",
      indicator: "Annual Maintenance And Safety Report of Infrastructure",
      availability: operationalManagement.infrastructureMaintenance.availability ?? "N/A",
      quality: operationalManagement.infrastructureMaintenance.quality ?? "N/A",
      marksAllocated: operationalManagement.infrastructureMaintenance.marksAllocated ?? "0.5",
    },
    {
      key: "wasteManagement",
      indicator: "Waste Management Mechanism Including Bio Degradable And Non-Bio Degradable Waste",
      availability: operationalManagement.wasteManagement.availability ?? "N/A",
      quality: operationalManagement.wasteManagement.quality ?? "N/A",
      marksAllocated: operationalManagement.wasteManagement.marksAllocated ?? "0.5",
    },

    { key: "assetManagementHeader", indicator: "2.7 Asset Management", isHeader: true, marksAllocated: "" },
    { key: "storeCards", 
      indicator: "Store Cards", 
      availability: operationalManagement.storeCards.availability ?? "N/A",
      quality: operationalManagement.storeCards.quality ?? "N/A",
      marksAllocated: operationalManagement.storeCards.marksAllocated ?? "0.5",
    },
    {
      key: "requisitionForms",
      indicator: "Store Requisition Forms",
      availability: operationalManagement.requisitionForms.availability ?? "N/A",
      quality: operationalManagement.requisitionForms.quality ?? "N/A",
      marksAllocated: operationalManagement.requisitionForms.marksAllocated ?? "0.5",
    },
    {
      key: "equipmentInventory",
      indicator: "Term-Based Inventory Reports Of Equipment And Materials",
      availability: operationalManagement.equipmentInventory.availability ?? "N/A",
      quality: operationalManagement.equipmentInventory.quality ?? "N/A",
      marksAllocated: operationalManagement.equipmentInventory.marksAllocated ?? "0.5",
    },
    {
      key: "maintenancePlan",
      indicator: "Term-Based Maintenance And Safety Plan",
      availability: operationalManagement.maintenancePlan.availability ?? "N/A",
      quality: operationalManagement.maintenancePlan.quality ?? "N/A",
      marksAllocated: operationalManagement.maintenancePlan.marksAllocated ?? "0.5",
    },
    {
      key: "maintenanceReport",
      indicator: "Term-Based Maintenance And Safety Report",
      availability: operationalManagement.maintenanceReport.availability ?? "N/A",
      quality: operationalManagement.maintenanceReport.quality ?? "N/A",
      marksAllocated: operationalManagement.maintenanceReport.marksAllocated ?? "0.5",
    },

    { key: "studentManagementHeader", indicator: "2.8 Student Management", isHeader: true, marksAllocated: "" },

    { key: "enrolmentPlan", 
      indicator: "Enrolment Plan",  
      availability: operationalManagement.enrolmentPlan.availability ?? "N/A",
      quality: operationalManagement.enrolmentPlan.quality ?? "N/A",
      marksAllocated: operationalManagement.enrolmentPlan.marksAllocated ?? "0.5",
    },
    {
      key: "traineeFiling",
      indicator: "Trainee Filing System (Consider SDMS)",
      availability: operationalManagement.traineeFiling.availability ?? "N/A",
      quality: operationalManagement.traineeFiling.quality ?? "N/A",
      marksAllocated: operationalManagement.traineeFiling.marksAllocated ?? "0.5",
    },
    {
      key: "feedingProgram",
      indicator: "Implementation report Of School Feeding Program",
      availability: operationalManagement.feedingProgram.availability ?? "N/A",
      quality: operationalManagement.feedingProgram.quality ?? "N/A",
      marksAllocated: operationalManagement.feedingProgram.marksAllocated ?? "0.5",
    },
    {
      key: "femaleRoom",
      indicator: "Operational Female Learner Room (Girls'room) and the sickbay for boarding schools",
      availability: operationalManagement.femaleRoom.availability ?? "N/A",
      quality: operationalManagement.femaleRoom.quality ?? "N/A",
      marksAllocated: operationalManagement.femaleRoom.marksAllocated ?? "0.5",
    },
    {
      key: "sportsRecreationPlan",
      indicator: "Operational Plan For Sports and Recreation",
      availability: operationalManagement.sportsRecreationPlan.availability ?? "N/A",
      quality: operationalManagement.sportsRecreationPlan.quality ?? "N/A",
      marksAllocated: operationalManagement.sportsRecreationPlan.marksAllocated ?? "0.5",
    },
    {
      key: "sportsRecreationReport",
      indicator: "Implementation Report On Sports And Recreation",
      availability: operationalManagement.sportsRecreationReport.availability ?? "N/A",
      quality: operationalManagement.sportsRecreationReport.quality ?? "N/A",
      marksAllocated: operationalManagement.sportsRecreationReport.marksAllocated ?? "0.5",
    },

    { key: "consumablesHeader", indicator: "2.9 Training consumables management", isHeader: true, marksAllocated: "" },
    {
      key: "consumableFunds",
      indicator: "Consumable funds requests",
      availability: operationalManagement.consumableFunds.availability ?? "N/A",
      quality: operationalManagement.consumableFunds.quality ?? "N/A",
      marksAllocated: operationalManagement.consumableFunds.marksAllocated ?? "0.5",
    },
    {
      key: "consumableTender",
      indicator: "Consumable tender committee (Appointment letter not exceeding 2 years)",
      availability: operationalManagement.consumableTender.availability ?? "N/A",
      quality: operationalManagement.consumableTender.quality ?? "N/A",
      marksAllocated: operationalManagement.consumableTender.marksAllocated ?? "0.5",
    },
    {
      key: "marketSurvey",
      indicator: "Consumable Market survey report",
      availability: operationalManagement.marketSurvey.availability ?? "N/A",
      quality: operationalManagement.marketSurvey.quality ?? "N/A",
      marksAllocated: operationalManagement.marketSurvey.marksAllocated ?? "0.5",
    },
    {
      key: "consumableProcurement",
      indicator: "Consumable procurement plan",
      availability: operationalManagement.consumableProcurement.availability ?? "N/A",
      quality: operationalManagement.consumableProcurement.quality ?? "N/A",
      marksAllocated: operationalManagement.consumableProcurement.marksAllocated ?? "0.5",
    },
    {
      key: "tenderPublication",
      indicator: "Publication of tender",
      availability: operationalManagement.tenderPublication.availability ?? "N/A",
      quality: operationalManagement.tenderPublication.quality ?? "N/A",
      marksAllocated: operationalManagement.tenderPublication.marksAllocated ?? "0.5",
    },
    {
      key: "tenderEvaluation",
      indicator: "Tender evaluation report",
      availability: operationalManagement.tenderEvaluation.availability ?? "N/A",
      quality: operationalManagement.tenderEvaluation.quality ?? "N/A",
      marksAllocated: operationalManagement.tenderEvaluation.marksAllocated ?? "0.5",
    },
    { key: "contracts", 
      indicator: "Contracts", 
      availability: operationalManagement.contracts.availability ?? "N/A",
      quality: operationalManagement.contracts.quality ?? "N/A",
      marksAllocated: operationalManagement.contracts.marksAllocated ?? "0.5",
     },
    { key: "purchaseOrders",
      indicator: "Purchase orders", 
      availability: operationalManagement.purchaseOrders.availability ?? "N/A",
      quality: operationalManagement.purchaseOrders.quality ?? "N/A",
      marksAllocated: operationalManagement.purchaseOrders.marksAllocated ?? "0.5",
    },
    {
      key: "receivingCommittee",
      indicator: "Receiving committee (Appointment letter)",
      availability: operationalManagement.receivingCommittee.availability ?? "N/A",
      quality: operationalManagement.receivingCommittee.quality ?? "N/A",
      marksAllocated: operationalManagement.receivingCommittee.marksAllocated ?? "0.5",
    },
    { key: "deliveryNote", 
      indicator: "Delivery note", 
      availability: operationalManagement.deliveryNote.availability ?? "N/A",
      quality: operationalManagement.deliveryNote.quality ?? "N/A",
      marksAllocated: operationalManagement.deliveryNote.marksAllocated ?? "0.5",
    },
    { key: "goodsReceivedNote", 
      indicator: "Good received note", 
      availability: operationalManagement.goodsReceivedNote.availability ?? "N/A",
      quality: operationalManagement.goodsReceivedNote.quality ?? "N/A",
      marksAllocated: operationalManagement.goodsReceivedNote.marksAllocated ?? "0.5",
     },
    { key: "consumableStoreCards", 
      indicator: "Store cards", 
      availability: operationalManagement.consumableStoreCards.availability ?? "N/A",
      quality: operationalManagement.consumableStoreCards.quality ?? "N/A",
      marksAllocated: operationalManagement.consumableStoreCards.marksAllocated ?? "0.5",
    },
    {
      key: "mainStoreRequisition",
      indicator: "Consumables requisition form for the main store",
      availability: operationalManagement.mainStoreRequisition.availability ?? "N/A",
      quality: operationalManagement.mainStoreRequisition.quality ?? "N/A",
      marksAllocated: operationalManagement.mainStoreRequisition.marksAllocated ?? "0.5",
    },
    {
      key: "miniStoreRequisition",
      indicator: "Consumables requisition form for the mini store",
      availability: operationalManagement.miniStoreRequisition.availability ?? "N/A",
      quality: operationalManagement.miniStoreRequisition.quality ?? "N/A",
      marksAllocated: operationalManagement.miniStoreRequisition.marksAllocated ?? "0.5",
    },
    {
      key: "monthlyInventory",
      indicator: "Monthly inventory report",
      availability: operationalManagement.monthlyInventory.availability ?? "N/A",
      quality: operationalManagement.monthlyInventory.quality ?? "N/A",
      marksAllocated: operationalManagement.monthlyInventory.marksAllocated ?? "0.5",
    },
    {
      key: "utilizationReport",
      indicator: "Consumables Utilization report",
      availability: operationalManagement.utilizationReport.availability ?? "N/A",
      quality: operationalManagement.utilizationReport.quality ?? "N/A",
      marksAllocated: operationalManagement.utilizationReport.marksAllocated ?? "0.5",
    },
    {
      key: "remainingBalance",
      indicator: "Availability of remaining balance from 2023/2024",
      availability: operationalManagement.remainingBalance.availability ?? "N/A",
      quality: operationalManagement.remainingBalance.quality ?? "N/A",
      marksAllocated: operationalManagement.remainingBalance.marksAllocated ?? "0.5",
    },
    {
      key: "bestPractices",
      indicator: "Availability of consumable best practices",
      availability: operationalManagement.bestPractices.availability ?? "N/A",
      quality: operationalManagement.bestPractices.quality ?? "N/A",
      marksAllocated: operationalManagement.bestPractices.marksAllocated ?? "0.5",
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
const renderTeachingAndLearning = (data: any = {}) => {
  const teachingAndLearning = data?.teachingAndLearning || data || {};
  console.log("teachingAndLearning", teachingAndLearning)
  const teachingItems = [
    { key: "cbtHeader", indicator: "3.1 CBT/CBA", isHeader: true, marksAllocated: "" },
    {
      key: "curriculum",
      indicator: "validated Competence Based Curriculum (CBC)",
      availability: teachingAndLearning.cbc.availability ?? "N/A",
      quality: teachingAndLearning.cbc.quality ?? "N/A",
      marksAllocated: teachingAndLearning.cbc.marksAllocated ?? "0.5",
    },
    {
      key: "guidingDocuments",
      indicator: "Guiding Documents regarding CBT/CBA Implementation",
      availability: teachingAndLearning.guidingDocuments.availability ?? "N/A",
      quality: teachingAndLearning.guidingDocuments.quality ?? "N/A",
      marksAllocated: teachingAndLearning.guidingDocuments.marksAllocated ?? "0.5",
    },
    {
      key: "trainingPlanningHeader",
      indicator: "3.2 Training planning and delivery",
      isHeader: true,
      marksAllocated: "",
    },
    { key: "chronogram", 
      indicator: "Validated Chronogram", 
      availability: teachingAndLearning.chronogram.availability ?? "N/A",
      quality: teachingAndLearning.chronogram.quality ?? "N/A",
      marksAllocated: teachingAndLearning.chronogram.marksAllocated ?? "0.5",
    },
    { key: "timetable", 
      indicator: "Training Timetable", 
      availability: teachingAndLearning.timetable.availability ?? "N/A",
      quality: teachingAndLearning.timetable.quality ?? "N/A",
      marksAllocated: teachingAndLearning.timetable.marksAllocated ?? "0.5", 
    },
    { key: "trainerPortfolios", 
      indicator: "Trainer Portfolios", 
      availability: teachingAndLearning.trainerPortfolios.availability ?? "N/A",
      quality: teachingAndLearning.trainerPortfolios.quality ?? "N/A",
      marksAllocated: teachingAndLearning.trainerPortfolios.marksAllocated ?? "0.5", 
    },
    {
      key: "pedagogicalDocuments",
      indicator: "Pedagogical documents (Scheme of Works, Handouts/notes, Session Plans), aligned with the overall curriculum and learning objectives",
      availability: teachingAndLearning.pedagogicalDocuments.availability ?? "N/A",
      quality: teachingAndLearning.pedagogicalDocuments.quality ?? "N/A",
      marksAllocated: teachingAndLearning.pedagogicalDocuments.marksAllocated ?? "0.5", 
    },
    {
      key: "iapPlan",
      indicator: "Industrial Attachment Program (IAP) Plan",
      availability: teachingAndLearning.iapPlan.availability ?? "N/A",
      quality: teachingAndLearning.iapPlan.quality ?? "N/A",
      marksAllocated: teachingAndLearning.iapPlan.marksAllocated ?? "0.5", 
    },
    { key: "iapReports", 
      indicator: "IAP Completion Reports", 
      availability: teachingAndLearning.iapReports.availability ?? "N/A",
      quality: teachingAndLearning.iapReports.quality ?? "N/A",
      marksAllocated: teachingAndLearning.iapReports.marksAllocated ?? "0.5", 
    },
    { key: "cbaImplementationHeader", indicator: "3.3 CBA implementation", isHeader: true, marksAllocated: "" },

    { key: "assessmentPlans", 
      indicator: "Assessment Plans", 
      availability: teachingAndLearning.assessmentPlans.availability ?? "N/A",
      quality: teachingAndLearning.assessmentPlans.quality ?? "N/A",
      marksAllocated: teachingAndLearning.assessmentPlans.marksAllocated ?? "0.5",
    },
    { key: "traineePortfolio", 
      indicator: "Trainee Portfolio", 
      availability: teachingAndLearning.traineePortfolio.availability ?? "N/A",
      quality: teachingAndLearning.traineePortfolio.quality ?? "N/A",
      marksAllocated: teachingAndLearning.traineePortfolio.marksAllocated ?? "0.5",
    },
    { key: "attendanceReports", 
      indicator: "Attendance Reports", 
      availability: teachingAndLearning.attendanceReports.availability ?? "N/A",
      quality: teachingAndLearning.attendanceReports.quality ?? "N/A",
      marksAllocated: teachingAndLearning.attendanceReports.marksAllocated ?? "0.5",
    },
    {
      key: "deliveryMonitoring",
      indicator: "Session Delivery Monitoring Reports",
      availability: teachingAndLearning.deliveryMonitoring.availability ?? "N/A",
      quality: teachingAndLearning.deliveryMonitoring.quality ?? "N/A",
      marksAllocated: teachingAndLearning.deliveryMonitoring.marksAllocated ?? "0.5",
    },
    {
      key: "portfolioVerification",
      indicator: "Portfolio Verification Reports",
      availability: teachingAndLearning.portfolioVerification.availability ?? "N/A",
      quality: teachingAndLearning.portfolioVerification.quality ?? "N/A",
      marksAllocated: teachingAndLearning.portfolioVerification.marksAllocated ?? "0.5",
    },
    {
      key: "assessmentMonitoring",
      indicator: "Assessment Monitoring Reports",
      availability: teachingAndLearning.assessmentMonitoring.availability ?? "N/A",
      quality: teachingAndLearning.assessmentMonitoring.quality ?? "N/A",
      marksAllocated: teachingAndLearning.assessmentMonitoring.marksAllocated ?? "0.5",
    },
    {
      key: "technologicalToolsHeader",
      indicator: "3.4 Use of technological tools",
      isHeader: true,
      marksAllocated: "",
    },
    { key: "digitalTools", 
      indicator: "Digital tools", 
      availability: teachingAndLearning.digitalTools.availability ?? "N/A",
      quality: teachingAndLearning.digitalTools.quality ?? "N/A",
      marksAllocated: teachingAndLearning.digitalTools.marksAllocated ?? "0.5",
    },
    {
      key: "techFeedback",
      indicator: "Feedback from staff and students on technology use",
      availability: teachingAndLearning.techFeedback.availability ?? "N/A",
      quality: teachingAndLearning.techFeedback.quality ?? "N/A",
      marksAllocated: teachingAndLearning.techFeedback.marksAllocated ?? "0.5",
    },
    {
      key: "efficiencyEvidence",
      indicator: "Evidence of improved efficiency",
      availability: teachingAndLearning.efficiencyEvidence.availability ?? "N/A",
      quality: teachingAndLearning.efficiencyEvidence.quality ?? "N/A",
      marksAllocated: teachingAndLearning.efficiencyEvidence.marksAllocated ?? "0.5",
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
const renderStakeholdersEngagement = (data: any = {}) => {
  const stakeholdersEngagement = data?.stakeholdersEngagement || data || {};
  console.log("stakeholdersEngagement", stakeholdersEngagement)

  const stakeholdersItems = [
    { key: "partnershipDevHeader", indicator: "4.1 Partnership Development", isHeader: true, marksAllocated: "" },
    {
      key: "mous",
      indicator: "At Least 3 MoUs With Relevant Private Companies Per Each Trade",
      availability: stakeholdersEngagement.mous.availability ?? "N/A",
      quality: stakeholdersEngagement.mous.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.mous.marksAllocated ?? "0.5",
    },
    {
      key: "employersFeedback",
      indicator: "Employers feedback/ satisfaction survey results",
      availability: stakeholdersEngagement.employersFeedback.availability ?? "N/A",
      quality: stakeholdersEngagement.employersFeedback.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.employersFeedback.marksAllocated ?? "0.5",
    },
    {
      key: "trainingAdjustments",
      indicator: "Training adjustments evidence based on feedback",
      availability: stakeholdersEngagement.trainingAdjustments.availability ?? "N/A",
      quality: stakeholdersEngagement.trainingAdjustments.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.trainingAdjustments.marksAllocated ?? "0.5",
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
      availability: stakeholdersEngagement.stakeholderMeetings.availability ?? "N/A",
      quality: stakeholdersEngagement.stakeholderMeetings.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.stakeholderMeetings.marksAllocated ?? "0.5",
    },
    {
      key: "planningSessions",
      indicator:
        "Minutes of meeting and records of planning sessions Evidence of partnerships with local organizations",
        availability: stakeholdersEngagement.planningSessions.availability ?? "N/A",
        quality: stakeholdersEngagement.planningSessions.quality ?? "N/A",
        marksAllocated: stakeholdersEngagement.planningSessions.marksAllocated ?? "0.5",
    },
    {
      key: "graduateFiling",
      indicator: "Graduate Filing System for atleast previous 4 years",
      availability: stakeholdersEngagement.graduateFiling.availability ?? "N/A",
      quality: stakeholdersEngagement.graduateFiling.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.graduateFiling.marksAllocated ?? "0.5",
    },
    {
      key: "alumniRecords",
      indicator: "Records of alumni meetings, events, and or other communications",
      availability: stakeholdersEngagement.alumniRecords.availability ?? "N/A",
      quality: stakeholdersEngagement.alumniRecords.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.alumniRecords.marksAllocated ?? "0.5",
    },
    { key: "adaptabilityHeader", indicator: "4.3 Adaptability to Trends", isHeader: true, marksAllocated: "" },
    {
      key: "industryEngagement",
      indicator: "Industry engagement in training (contract, MoUs…)",
      availability: stakeholdersEngagement.industryEngagement.availability ?? "N/A",
      quality: stakeholdersEngagement.industryEngagement.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.industryEngagement.marksAllocated ?? "0.5",
    },
    {
      key: "trainingRelevance",
      indicator: "Feedback on training relevance",
      availability: stakeholdersEngagement.trainingRelevance.availability ?? "N/A",
      quality: stakeholdersEngagement.trainingRelevance.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.trainingRelevance.marksAllocated ?? "0.5",
    },
    {
      key: "staffTraining",
      indicator: "Staff training sessions held",
      availability: stakeholdersEngagement.staffTraining.availability ?? "N/A",
      quality: stakeholdersEngagement.staffTraining.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.staffTraining.marksAllocated ?? "0.5",
    },
    { key: "relationshipHeader", indicator: "4.4 Relationship with Subordinates", isHeader: true, marksAllocated: "" },
    {
      key: "subordinateFeedback",
      indicator: "Feedback from subordinates",
      availability: stakeholdersEngagement.subordinateFeedback.availability ?? "N/A",
      quality: stakeholdersEngagement.subordinateFeedback.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.subordinateFeedback.marksAllocated ?? "0.5",
    },
    {
      key: "conflictResolution",
      indicator: "Records of conflict resolution",
      availability: stakeholdersEngagement.conflictResolution.availability ?? "N/A",
      quality: stakeholdersEngagement.conflictResolution.quality ?? "N/A",
      marksAllocated: stakeholdersEngagement.conflictResolution.marksAllocated ?? "0.5",
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
const renderContinuousImprovement = (data: any = {}) => {
  const continuousImprovement = data?.continuousImprovement || data || {};
  console.log("Continuous Improvement: ", continuousImprovement)

  const improvementItems = [
    { key: "professionalismHeader", indicator: "5.1 Professionalism", isHeader: true, marksAllocated: "" },
    { key: "cpdPlan", 
      indicator: "CPD plan", 
      availability: continuousImprovement.cpdPlan.availability ?? "N/A",
      quality: continuousImprovement.cpdPlan.quality ?? "N/A",
      marksAllocated: continuousImprovement.cpdPlan.marksAllocated ?? "0.5",
    },
    {
      key: "cpdReports",
      indicator: "CPD implementation reports",
      availability: continuousImprovement.cpdReports.availability ?? "N/A",
      quality: continuousImprovement.cpdReports.quality ?? "N/A",
      marksAllocated: continuousImprovement.cpdReports.marksAllocated ?? "0.5",
    },
    { key: "ethicalRecord", 
      indicator: "Free ethical record", 
      availability: continuousImprovement.ethicalRecord.availability ?? "N/A",
      quality: continuousImprovement.ethicalRecord.quality ?? "N/A",
      marksAllocated: continuousImprovement.ethicalRecord.marksAllocated ?? "0.5",
    },
    {
      key: "roleModeling",
      indicator: "Positive role modeling in professional settings",
      availability: continuousImprovement.roleModeling.availability ?? "N/A",
      quality: continuousImprovement.roleModeling.quality ?? "N/A",
      marksAllocated: continuousImprovement.roleModeling.marksAllocated ?? "0.5",
    },
    {
      key: "feedbackMechanisms",
      indicator: "Staff feedback mechanisms",
      availability: continuousImprovement.feedbackMechanisms.availability ?? "N/A",
      quality: continuousImprovement.feedbackMechanisms.quality ?? "N/A",
      marksAllocated: continuousImprovement.feedbackMechanisms.marksAllocated ?? "0.5",
    },
    {
      key: "actionPlans",
      indicator: "Action plans based on feedback",
      availability: continuousImprovement.actionPlans.availability ?? "N/A",
      quality: continuousImprovement.actionPlans.quality ?? "N/A",
      marksAllocated: continuousImprovement.actionPlans.marksAllocated ?? "0.5",
    },
    {
      key: "implementedImprovements",
      indicator: "Implemented improvements",
      availability: continuousImprovement.implementedImprovements.availability ?? "N/A",
      quality: continuousImprovement.implementedImprovements.quality ?? "N/A",
      marksAllocated: continuousImprovement.implementedImprovements.marksAllocated ?? "0.5",
    },
    { key: "performanceMetricsHeader", indicator: "5.2 Performance Metrics", isHeader: true, marksAllocated: "" },
    {
      key: "kpis",
      indicator: "Documented KPIs or Performance review",
      availability: continuousImprovement.kpis.availability ?? "N/A",
      quality: continuousImprovement.kpis.quality ?? "N/A",
      marksAllocated: continuousImprovement.kpis.marksAllocated ?? "0.5",
    },
    {
      key: "dataDecisions",
      indicator: "Evidence of data-driven decisions",
      availability: continuousImprovement.dataDecisions.availability ?? "N/A",
      quality: continuousImprovement.dataDecisions.quality ?? "N/A",
      marksAllocated: continuousImprovement.dataDecisions.marksAllocated ?? "0.5",
    },
    {
      key: "improvementRecords",
      indicator: "Records of implemented improvements",
      availability: continuousImprovement.improvementRecords.availability ?? "N/A",
      quality: continuousImprovement.improvementRecords.quality ?? "N/A",
      marksAllocated: continuousImprovement.improvementRecords.marksAllocated ?? "0.5",
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
  const schoolCategory = data?.schoolCategory || "";
  console.log("School Category: ", schoolCategory);
  const infrastructureAndEnvironment = data?.infrastructureAndEnvironment || data || {};
  console.log("infrastructureAndEnvironment: ", infrastructureAndEnvironment)

  
  const isBoardingSchool =
    schoolCategory.toLowerCase().includes("boarding") ||
    schoolCategory.toLowerCase().includes("mixed");
  const isDaySchool =
    schoolCategory.toLowerCase().includes("day") ||
    (!isBoardingSchool && schoolCategory !== "");

  // Common infrastructure items that appear regardless of school type
  const commonInfrastructureItems = [
    { key: "adminBlockHeader", indicator: "6.1 Administration Block", isHeader: true, marksAllocated: "" },
    { key: "offices", 
      indicator: "Offices of all staff", 
      availability: infrastructureAndEnvironment.offices.availability ?? "N/A",
      quality: infrastructureAndEnvironment.offices.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.offices.marksAllocated ?? "0.5",
      },
    { key: "meetingRooms", 
      indicator: "Meeting rooms", 
      availability: infrastructureAndEnvironment.meetingRooms.availability ?? "N/A",
      quality: infrastructureAndEnvironment.meetingRooms.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.meetingRooms.marksAllocated ?? "0.5",
    },
    { key: "emergencyExits", 
      indicator: "Emergency exits", 
      availability: infrastructureAndEnvironment.classEmergencyExits.availability ?? "N/A",
      quality: infrastructureAndEnvironment.classEmergencyExits.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.classEmergencyExits.marksAllocated ?? "0.5",
    },
    { key: "ventilation", 
      indicator: "Ventilation and lighting", 
      availability: infrastructureAndEnvironment.classVentilation.availability ?? "N/A",
      quality: infrastructureAndEnvironment.classVentilation.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.classVentilation.marksAllocated ?? "0.5", 
    },
    { key: "classroomBlockHeader", indicator: "6.2 Classroom Block", isHeader: true, marksAllocated: "" },
    {
      key: "capacity",
      indicator: "Capacity to accommodate students comfortably",
      availability: infrastructureAndEnvironment.classCapacity.availability ?? "N/A",
      quality: infrastructureAndEnvironment.classCapacity.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.classCapacity.marksAllocated ?? "0.5", 
    },
    { key: "desks", 
      indicator: "Desks and chairs", 
      availability: infrastructureAndEnvironment.desksChairs.availability ?? "N/A",
      quality: infrastructureAndEnvironment.desksChairs.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.desksChairs.marksAllocated ?? "0.5", 
    },
    {
      key: "classVentilation",
      indicator: "ventilation and lighting",
      availability: infrastructureAndEnvironment.classVentilation.availability ?? "N/A",
      quality: infrastructureAndEnvironment.classVentilation.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.classVentilation.marksAllocated ?? "0.5",
    },
    { key: "emergencyExits", 
      indicator: "Emergency exits", 
      availability: infrastructureAndEnvironment.classEmergencyExits.availability ?? "N/A",
      quality: infrastructureAndEnvironment.classEmergencyExits.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.classEmergencyExits.marksAllocated ?? "0.5",
    },
    { key: "computerLabHeader", indicator: "6.3 Computer Lab", isHeader: true, marksAllocated: "" },
    {
      key: "computers",
      indicator: "Functional computers related to the number of students",
      availability: infrastructureAndEnvironment.computers.availability ?? "N/A",
      quality: infrastructureAndEnvironment.computers.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.computers.marksAllocated ?? "0.5",
    },
    { key: "internet", 
      indicator: "internet access", 
      availability: infrastructureAndEnvironment.internet.availability ?? "N/A",
      quality: infrastructureAndEnvironment.internet.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.internet.marksAllocated ?? "0.5",
    },
    { key: "workstations", 
      indicator: "setup of workstations", 
      availability: infrastructureAndEnvironment.workstations.availability ?? "N/A",
      quality: infrastructureAndEnvironment.workstations.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.workstations.marksAllocated ?? "0.5", 
    },
    {
      key: "studyAreas",
      indicator: "Accessibility and quiet study areas",
      availability: infrastructureAndEnvironment.studyAreas.availability ?? "N/A",
      quality: infrastructureAndEnvironment.studyAreas.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.studyAreas.marksAllocated ?? "0.5", 
    },
    { key: "libraryHeader", indicator: "6.4 Library", isHeader: true, marksAllocated: "" },
    { key: "books", 
      indicator: "Books and other resources", 
      availability: infrastructureAndEnvironment.books.availability ?? "N/A",
      quality: infrastructureAndEnvironment.books.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.books.marksAllocated ?? "0.5", 
    },
    { key: "studyArea", 
      indicator: "Study area", 
      availability: infrastructureAndEnvironment.studyAreas.availability ?? "N/A",
      quality: infrastructureAndEnvironment.studyAreas.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.studyAreas.marksAllocated ?? "0.5",  
    },
    {
      key: "booksCondition",
      indicator: "Condition of books and resources",
      availability: infrastructureAndEnvironment.bookCondition.availability ?? "N/A",
      quality: infrastructureAndEnvironment.bookCondition.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.bookCondition.marksAllocated ?? "0.5",
    },
    { key: "libraryComputers", 
      indicator: "Computers", 
      availability: infrastructureAndEnvironment.libraryComputers.availability ?? "N/A",
      quality: infrastructureAndEnvironment.libraryComputers.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.libraryComputers.marksAllocated ?? "0.5", 
    },
    { key: "kitchenHeader", indicator: "6.5 Kitchen", isHeader: true, marksAllocated: "" },
    {
      key: "healthSafety",
      indicator: "Compliance with health and safety regulations",
      availability: infrastructureAndEnvironment.healthSafety.availability ?? "N/A",
      quality: infrastructureAndEnvironment.healthSafety.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.healthSafety.marksAllocated ?? "0.5",
    },
    {
      key: "foodStorage",
      indicator: "Cleanliness and organization of food storage",
      availability: infrastructureAndEnvironment.foodStorage.availability ?? "N/A",
      quality: infrastructureAndEnvironment.foodStorage.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.foodStorage.marksAllocated ?? "0.5",
    },
    {
      key: "sanitation",
      indicator: "Proper sanitation facilities for food preparation",
      availability: infrastructureAndEnvironment.sanitation.availability ?? "N/A",
      quality: infrastructureAndEnvironment.sanitation.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.sanitation.marksAllocated ?? "0.5",
    },
    { key: "refectoryHeader", indicator: "6.6 Refectory", isHeader: true, marksAllocated: "" },
    {
      key: "tablesSeating",
      indicator: "Condition of tables and seating arrangements",
      availability: infrastructureAndEnvironment.tablesSeating.availability ?? "N/A",
      quality: infrastructureAndEnvironment.tablesSeating.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.tablesSeating.marksAllocated ?? "0.5",
    },
    {
      key: "hygiene",
      indicator: "Cleanliness and hygiene practices",
      availability: infrastructureAndEnvironment.hygiene.availability ?? "N/A",
      quality: infrastructureAndEnvironment.hygiene.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.hygiene.marksAllocated ?? "0.5",
    },
    { key: "refectoryVentilation", 
      indicator: "Ventilation", 
      availability: infrastructureAndEnvironment.refectoryVentilation.availability ?? "N/A",
      quality: infrastructureAndEnvironment.refectoryVentilation.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.refectoryVentilation.marksAllocated ?? "0.5",
     },
    { key: "wasteDisposal", 
      indicator: "Waste disposal systems", 
      availability: infrastructureAndEnvironment.wasteDisposal.availability ?? "N/A",
      quality: infrastructureAndEnvironment.wasteDisposal.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.wasteDisposal.marksAllocated ?? "0.5",
    },
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
      availability: infrastructureAndEnvironment.separateChangingRooms.availability ?? "N/A",
      quality: infrastructureAndEnvironment.separateChangingRooms.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.separateChangingRooms.marksAllocated ?? "0.5",
    },
    {
      key: "girlsChangingCleanliness",
      indicator: "Cleanliness of girls' changing room",
      availability: infrastructureAndEnvironment.girlsChangingCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.girlsChangingCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.girlsChangingCleanliness.marksAllocated ?? "0.5",
    },
    {
      key: "boysChangingCleanliness",
      indicator: "Cleanliness of boys' changing room",
      availability: infrastructureAndEnvironment.boysChangingCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.boysChangingCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.boysChangingCleanliness.marksAllocated ?? "0.5",
    },
  ]

  // Items specific to boarding schools
  const boardingSchoolItems = [
    { key: "dormitoriesHeader", indicator: "6.8 Dormitories", isHeader: true, marksAllocated: "" },
    {
      key: "separateDormitories",
      indicator: "Separate dormitories for girls and boys",
      availability: infrastructureAndEnvironment.separateDormitories.availability ?? "N/A",
      quality: infrastructureAndEnvironment.separateDormitories.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.separateDormitories.marksAllocated ?? "0.5",
    },
    {
      key: "girlsDormCleanliness",
      indicator: "Cleanliness of girls' dormitories",
      availability: infrastructureAndEnvironment.girlsDormCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.girlsDormCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.girlsDormCleanliness.marksAllocated ?? "0.5",
    },
    {
      key: "boysDormCleanliness",
      indicator: "Cleanliness of boys' dormitories",
      availability: infrastructureAndEnvironment.boysDormCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.boysDormCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.boysDormCleanliness.marksAllocated ?? "0.5",
    },
  ]

  // Items that appear after the conditional sections
  const remainingInfrastructureItems = [
    { key: "washroomsHeader", indicator: "6.9 Washrooms", isHeader: true, marksAllocated: "" },
    {
      key: "separateWashrooms",
      indicator: "Separate washrooms for girls and boys",
      availability: infrastructureAndEnvironment.separateWashrooms.availability ?? "N/A",
      quality: infrastructureAndEnvironment.separateWashrooms.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.separateWashrooms.marksAllocated ?? "0.5",
    },
    {
      key: "girlsWashroomCleanliness",
      indicator: "Cleanliness of girls' washrooms",
      availability: infrastructureAndEnvironment.girlsWashroomCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.girlsWashroomCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.girlsWashroomCleanliness.marksAllocated ?? "0.5",
    },
    {
      key: "boysWashroomCleanliness",
      indicator: "Cleanliness of boys' washrooms",
      availability: infrastructureAndEnvironment.boysWashroomCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.boysWashroomCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.boysWashroomCleanliness.marksAllocated ?? "0.5",
    },
    { key: "toiletsHeader", indicator: "6.10 Toilets", isHeader: true, marksAllocated: "" },
    {
      key: "separateToilets",
      indicator: "Separate toilets for girls and boys",
      availability: infrastructureAndEnvironment.separateToilets.availability ?? "N/A",
      quality: infrastructureAndEnvironment.separateToilets.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.separateToilets.marksAllocated ?? "0.5",
    },
    {
      key: "girlsToiletCleanliness",
      indicator: "Cleanliness of girls' toilets",
      availability: infrastructureAndEnvironment.girlsToiletCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.girlsToiletCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.girlsToiletCleanliness.marksAllocated ?? "0.5",
    },
    {
      key: "boysToiletCleanliness",
      indicator: "Cleanliness of boys' toilets",
      availability: infrastructureAndEnvironment.boysToiletCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.boysToiletCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.boysToiletCleanliness.marksAllocated ?? "0.5",
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
      availability: infrastructureAndEnvironment.playground.availability ?? "N/A",
      quality: infrastructureAndEnvironment.playground.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.playground.marksAllocated ?? "0.5",
    },
    {
      key: "sportsFacilities",
      indicator: "Sports facilities (balls and kits)",
      availability: infrastructureAndEnvironment.sportsFacilities.availability ?? "N/A",
      quality: infrastructureAndEnvironment.sportsFacilities.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.sportsFacilities.marksAllocated ?? "0.5",
    },
    { key: "schoolGardenHeader", indicator: "6.12 School Garden", isHeader: true, marksAllocated: "" },
    {
      key: "plants",
      indicator: "Health and safety of plants (non-toxic)",
      availability: infrastructureAndEnvironment.plants.availability ?? "N/A",
      quality: infrastructureAndEnvironment.plants.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.plants.marksAllocated ?? "0.5",
    },
    { key: "educationalGarden", 
      indicator: "Educational garden", 
      availability: infrastructureAndEnvironment.educationalGarden.availability ?? "N/A",
      quality: infrastructureAndEnvironment.educationalGarden.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.educationalGarden.marksAllocated ?? "0.5",
    },
    { key: "workshopsHeader", indicator: "6.13 Workshops", isHeader: true, marksAllocated: "" },
    {
      key: "tools",
      indicator: "Condition of tools and machinery",
      availability: infrastructureAndEnvironment.tools.availability ?? "N/A",
      quality: infrastructureAndEnvironment.tools.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.tools.marksAllocated ?? "0.5",
    },
    {
      key: "workshopVentilation",
      indicator: "Proper ventilation and safety measures",
      availability: infrastructureAndEnvironment.workshopVentilation.availability ?? "N/A",
      quality: infrastructureAndEnvironment.workshopVentilation.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.workshopVentilation.marksAllocated ?? "0.5",
    },
    { key: "storeArrangement", 
      indicator: "Store arrangement", 
      availability: infrastructureAndEnvironment.storeArrangement.availability ?? "N/A",
      quality: infrastructureAndEnvironment.storeArrangement.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.storeArrangement.marksAllocated ?? "0.5", 
    },
    { key: "workshopCleanliness", 
      indicator: "Cleanliness", 
      availability: infrastructureAndEnvironment.workshopCleanliness.availability ?? "N/A",
      quality: infrastructureAndEnvironment.workshopCleanliness.quality ?? "N/A",
      marksAllocated: infrastructureAndEnvironment.workshopCleanliness.marksAllocated ?? "0.5", 
    },
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

