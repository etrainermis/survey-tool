"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HeadteacherStrategicPlanning from "./HeadteacherStrategicPlanning"
import HeadteacherOperationalManagement from "./HeadteacherOperationalManagement"
import HeadteacherTeachingLearning from "./HeadteacherTeachingLearning"
import HeadteacherStakeholdersEngagement from "./HeadteacherStakeholdersEngagement"
import HeadteacherContinuousImprovement from "./HeadteacherContinuousImprovement"
import HeadteacherHygieneAndSafety from "./HeadteacherHygieneAndSafety"
import HeadteacherResultsSummary from "./HeadteacherResultsSummary"
import { AuthApi } from "@/lib/config/axios.config"
import useAuth from "@/hooks/useAuth"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

interface HeadteacherCreateSurveyProps {
  schoolId?: string
  schoolName?: string
}

export function HeadteacherCreateSurvey({ schoolId, schoolName }: HeadteacherCreateSurveyProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    school: {
      name: schoolName || "",
      status: "",
      category: "",
      // province: "",
      // district: "",
      // sector: "",
      // cell: "",
      // village: "",
      ownerName: "",
      numTrades: "",
      maleStudents: "",
      femaleStudents: "",
      maleTeachers: "",
      femaleTeachers: "",
      contact: "",
      email: "",
    },
    headteacher: {
      name: "",
      contact: "",
      email: "",
      experienceEducation: "",
      experienceCurrentSchool: "",
    },
    strategicPlanning: {
      items: [],
      totalMarks: 0,
    },
    operationalManagement: {
      items: [],
      totalMarks: 0,
    },
    teachingLearning: {
      cbtCba: {},
      trainingPlanning: {},
      cbaImplementation: {},
      technologicalTools: {},
      overview: {
        strengths: "",
        weaknesses: "",
        areasOfImprovement: "",
      },
      totalMarks: 0,
    },
    stakeholdersEngagement: {
      partnershipDevelopment: {},
      communityAlumniEngagement: {},
      adaptabilityToTrends: {},
      relationshipWithSubordinates: {},
      overview: {
        strengths: "",
        weaknesses: "",
        areasOfImprovement: "",
      },
      totalMarks: 0,
    },
    continuousImprovement: {
      professionalism: {},
      performanceMetrics: {},
      overview: {
        strengths: "",
        weaknesses: "",
        areasOfImprovement: "",
      },
      totalMarks: 0,
    },
    hygieneAndSafety: {
      administrationBlock: {},
      classroomBlock: {},
      computerLab: {},
      library: {},
      kitchen: {},
      refectory: {},
      dormitories: {},
      washrooms: {},
      playgrounds: {},
      schoolGarden: {},
      workshops: {},
      overview: {
        strengths: "",
        weaknesses: "",
        areasOfImprovement: "",
      },
      totalMarks: 0,
    },
    comments: {
      generalComments: "",
      recommendations: "",
      headteacherComments: "",
      headteacherSignature: "",
      evaluatorName: "",
      evaluatorSignature: "",
      evaluationDate: new Date().toISOString().split("T")[0],
    },
    visitDate: new Date().toISOString().split("T")[0],
  })

  const { toast } = useToast()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalMarks, setTotalMarks] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Load saved data from localStorage on component mount
  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`headteacher_evaluation_${user.id}_${schoolId}`)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Merge saved data with default structure to ensure all fields exist
          setFormData((prev) => {
            const updatedData = { ...prev }

            // Merge each section carefully
            if (parsedData.school) updatedData.school = { ...prev.school, ...parsedData.school }
            if (parsedData.headteacher) updatedData.headteacher = { ...prev.headteacher, ...parsedData.headteacher }
            if (parsedData.strategicPlanning)
              updatedData.strategicPlanning = { ...prev.strategicPlanning, ...parsedData.strategicPlanning }
            if (parsedData.operationalManagement)
              updatedData.operationalManagement = { ...prev.operationalManagement, ...parsedData.operationalManagement }
            if (parsedData.teachingLearning)
              updatedData.teachingLearning = { ...prev.teachingLearning, ...parsedData.teachingLearning }
            if (parsedData.stakeholdersEngagement)
              updatedData.stakeholdersEngagement = {
                ...prev.stakeholdersEngagement,
                ...parsedData.stakeholdersEngagement,
              }
            if (parsedData.continuousImprovement)
              updatedData.continuousImprovement = { ...prev.continuousImprovement, ...parsedData.continuousImprovement }
            if (parsedData.hygieneAndSafety)
              updatedData.hygieneAndSafety = { ...prev.hygieneAndSafety, ...parsedData.hygieneAndSafety }
            if (parsedData.comments) updatedData.comments = { ...prev.comments, ...parsedData.comments }
            if (parsedData.visitDate) updatedData.visitDate = parsedData.visitDate

            return updatedData
          })
        } catch (error) {
          console.error("Error parsing saved data:", error)
        }
      }
    }
  }, [user, schoolId, schoolName])

  // Calculate total marks whenever formData changes
  useEffect(() => {
    let total = 0

    // Add marks from each section
    if (formData.strategicPlanning?.totalMarks) {
      total += formData.strategicPlanning.totalMarks
    }

    if (formData.operationalManagement?.totalMarks) {
      total += formData.operationalManagement.totalMarks
    }

    if (formData.teachingLearning?.totalMarks) {
      total += formData.teachingLearning.totalMarks
    }

    if (formData.stakeholdersEngagement?.totalMarks) {
      total += formData.stakeholdersEngagement.totalMarks
    }

    if (formData.continuousImprovement?.totalMarks) {
      total += formData.continuousImprovement.totalMarks
    }

    if (formData.hygieneAndSafety?.totalMarks) {
      total += formData.hygieneAndSafety.totalMarks
    }

    setTotalMarks(total)
  }, [formData])

  // Handle school data changes
  const handleSchoolChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      school: {
        ...prev.school,
        [field]: value,
      },
    }))
  }

  // Handle headteacher data changes
  const handleHeadteacherChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      headteacher: {
        ...prev.headteacher,
        [field]: value,
      },
    }))
  }

  // Handle comments data changes
  const handleCommentsChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [field]: value,
      },
    }))
  }

  // Handle visit date change
  const handleVisitDateChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      visitDate: value,
    }))
  }

  // Handle data changes from child components
  const handleDataChange = (data: any) => {
    setFormData((prev: any) => {
      const updated = { ...prev, ...data }

      // Save to localStorage
      if (user?.id) {
        localStorage.setItem(`headteacher_evaluation_${user.id}_${schoolId}`, JSON.stringify(updated))
      }

      return updated
    })
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Save progress
  const saveProgress = () => {
    // Save to localStorage
    if (user?.id) {
      localStorage.setItem(`headteacher_evaluation_${user.id}_${schoolId}`, JSON.stringify(formData))
    }

    toast({
      title: "Progress Saved",
      description: "Your evaluation progress has been saved.",
      duration: 3000,
    })
  }

  // Submit the evaluation
  const handleSubmit = async () => {
    if (!schoolId) {
      toast({
        title: "Error",
        description: "School ID is missing. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Prepare the payload
      const payload = {
        schoolId,
        evaluationData: JSON.stringify(formData),
        totalMarks,
        evaluationType: "HEADTEACHER",
      }

      // Submit to API
      await AuthApi.post("/evaluations/add", payload)

      // Clear localStorage
      if (user?.id) {
        localStorage.removeItem(`headteacher_evaluation_${user.id}_${schoolId}`)
      }

      // Show success message and set submitted state
      setIsSubmitted(true)

      toast({
        title: "Evaluation Submitted Successfully",
        description: "Your headteacher evaluation has been successfully submitted.",
        variant: "default",
      })

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate("/headteacher/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error submitting evaluation:", error)
      toast({
        title: "Submission Error",
        description: "Failed to submit evaluation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">School Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Name of the school</Label>
                  <Input
                    id="schoolName"
                    value={formData.school.name}
                    onChange={(e) => handleSchoolChange("name", e.target.value)}
                    placeholder="Enter school name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolStatus">School status</Label>
                    <Select
                      value={formData.school.status}
                      onValueChange={(value) => handleSchoolChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="government-aided">Government Aided</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolCategory">School Category</Label>
                    <Select
                      value={formData.school.category}
                      onValueChange={(value) => handleSchoolChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vtc">Day</SelectItem>
                        <SelectItem value="tss">Boarding</SelectItem>
                        <SelectItem value="polytechnic">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 

                <div className="space-y-2">
                  <Label htmlFor="ownerName">School owner name</Label>
                  <Input
                    id="ownerName"
                    value={formData.school.ownerName}
                    onChange={(e) => handleSchoolChange("ownerName", e.target.value)}
                    placeholder="Enter school owner name"
                  />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="numTrades">Number of trades</Label>
                    <Input
                      id="numTrades"
                      type="number"
                      value={formData.school.numTrades}
                      onChange={(e) => handleSchoolChange("numTrades", e.target.value)}
                      placeholder="Enter number of trades"
                    />
                  </div>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 

                  <div className="space-y-2">
                    <Label htmlFor="maleStudents">Male Number of students</Label>
                    <Input
                      id="maleStudents"
                      type="number"
                      value={formData.school.maleStudents}
                      onChange={(e) => handleSchoolChange("maleStudents", e.target.value)}
                      placeholder="Enter male students"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="femaleStudents">Female Number of students</Label>
                    <Input
                      id="femaleStudents"
                      type="number"
                      value={formData.school.femaleStudents}
                      onChange={(e) => handleSchoolChange("femaleStudents", e.target.value)}
                      placeholder="Enter female students"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maleTeachers">Male Number of teachers</Label>
                    <Input
                      id="maleTeachers"
                      type="number"
                      value={formData.school.maleTeachers}
                      onChange={(e) => handleSchoolChange("maleTeachers", e.target.value)}
                      placeholder="Enter male teachers"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="femaleTeachers">Female Number of teachers</Label>
                    <Input
                      id="femaleTeachers"
                      type="number"
                      value={formData.school.femaleTeachers}
                      onChange={(e) => handleSchoolChange("femaleTeachers", e.target.value)}
                      placeholder="Enter female teachers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolContact">School contact (phone number)</Label>
                    <Input
                      id="schoolContact"
                      value={formData.school.contact}
                      onChange={(e) => handleSchoolChange("contact", e.target.value)}
                      placeholder="Enter school contact"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolEmail">School Email</Label>
                    <Input
                      id="schoolEmail"
                      type="email"
                      value={formData.school.email}
                      onChange={(e) => handleSchoolChange("email", e.target.value)}
                      placeholder="Enter school email"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Headteacher Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headteacherName">Headteacher's name</Label>
                  <Input
                    id="headteacherName"
                    value={formData.headteacher.name}
                    onChange={(e) => handleHeadteacherChange("name", e.target.value)}
                    placeholder="Enter headteacher name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="headteacherContact">Headteacher's contact (phone number)</Label>
                    <Input
                      id="headteacherContact"
                      value={formData.headteacher.contact}
                      onChange={(e) => handleHeadteacherChange("contact", e.target.value)}
                      placeholder="Enter headteacher contact"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headteacherEmail">Headteacher's private email</Label>
                    <Input
                      id="headteacherEmail"
                      type="email"
                      value={formData.headteacher.email}
                      onChange={(e) => handleHeadteacherChange("email", e.target.value)}
                      placeholder="Enter headteacher email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experienceEducation">Headteacher's experience in Education</Label>
                    <Select
                      value={formData.headteacher.experienceEducation}
                      onValueChange={(value) => handleHeadteacherChange("experienceEducation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-5">0-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">More than 20 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceCurrentSchool">Headteacher's experience in current school</Label>
                    <Select
                      value={formData.headteacher.experienceCurrentSchool}
                      onValueChange={(value) => handleHeadteacherChange("experienceCurrentSchool", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years at current school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11+">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitDate">Date of visit</Label>
                  <Input
                    id="visitDate"
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => handleVisitDateChange(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 3:
        return <HeadteacherStrategicPlanning data={formData} onDataChange={handleDataChange} />
      case 4:
        return <HeadteacherOperationalManagement data={formData} onDataChange={handleDataChange} />
      case 5:
        return <HeadteacherTeachingLearning data={formData} onDataChange={handleDataChange} />
      case 6:
        return <HeadteacherStakeholdersEngagement data={formData} onDataChange={handleDataChange} />
      case 7:
        return <HeadteacherContinuousImprovement data={formData} onDataChange={handleDataChange} />
      case 8:
        return <HeadteacherHygieneAndSafety data={formData} onDataChange={handleDataChange} />
      case 9:
        return (
          <>
            <HeadteacherResultsSummary data={formData} onDataChange={function (data: any): void {
              throw new Error("Function not implemented.")
            } } />

        
          </>
        )
      default:
        return null
    }
  }

  // If evaluation is submitted, show success message
  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <Card className="border-green-200 shadow-md">
          <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Evaluation Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6 text-center">
              Your headteacher evaluation has been successfully submitted. You will be redirected to the dashboard
              shortly.
            </p>
            <Progress
              value={100}
              className="w-64 h-2 mb-6"
              style={{ "--progress-foreground": "hsl(142, 76%, 36%)" } as React.CSSProperties}
            />
            <Button
              onClick={() => navigate("/headteacher/dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/headteacher/dashboard")}
          className="mb-4 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Headteacher Evaluation</h1>
            {schoolName && <p className="text-blue-600">School: {schoolName}</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-600">Total Score</p>
            <p className="text-xl font-bold text-blue-800">{totalMarks.toFixed(1)} / 100</p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between mb-2 gap-y-2">
          {[
            "School ",
            "Headteacher ",
            "Strategic Planning",
            "Operational Management",
            "Teaching & Learning",
            "Stakeholders",
            "Continuous Improvement",
            "Hygiene & Safety",
            "Results & Comments",
          ].map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index + 1)}
              className={`text-xs md:text-sm font-medium px-1 ${currentStep === index + 1 ? "text-blue-700" : "text-gray-500"}`}
            >
              {index + 1}. {step}
            </button>
          ))}
        </div>
        <Progress
          value={(currentStep / 9) * 100}
          className="h-2"
          style={
            {
              "--progress-background": "hsl(214, 100%, 95%)",
              "--progress-foreground": "hsl(214, 100%, 51%)",
            } as React.CSSProperties
          }
        />
      </div>

      {/* Current step content */}
      {renderStep()}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={saveProgress}
          className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Progress
        </Button>

        {currentStep < 9 ? (
          <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Evaluation"}
          </Button>
        )}
      </div>
    </div>
  )
}

