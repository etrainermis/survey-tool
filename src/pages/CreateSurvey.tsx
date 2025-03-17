"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { AuthState } from "@/lib/auth"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import useAuth from "@/hooks/useAuth"
import { useAllSchools } from "@/hooks/useSchools"
import { AuthApi } from "@/lib/config/axios.config"

interface CreateSurveyProps {
  authState: AuthState
}

interface SurveyData {
  school: {
    id: string
    name: string
    status: string
    category: string
    location: {
      province: string
      district: string
      sector: string
      cell: string
      village: string
    }
    stats: {
      trades: number
      students: number
      teachers: number
      maleTeachers?: number // Add this line
      femaleTeachers?: number // Add this line
    }
    contact: {
      phone: string
      email: string
      headteacher: string
      owner: string
    }
    trades: Array<{
      id: string
      name: string
      levels: Array<{
        level: number
        classrooms: number
        students: {
          male: number
          female: number
        }
      }>
    }>
  }
  infrastructure: Array<{
    type: string
    size: string
    capacity: string
    constructionYear: number
    materials: string[]
    status: string
  }>
  it: {
    computerLab: {
      totalComputers: number
      hasLAN: boolean
      workingComputers: number
      nonWorkingComputers: number
      hasProjectors: boolean
      totalProjectors: number
      workingProjectors: number
      nonWorkingProjectors: number
    }
    internet: {
      exists: boolean
      type?: "4G" | "Fiber" // Add this field
    }
    server: {
      exists: boolean
      specifications: string
    }
    hasElearning: boolean
    energySources: string[]
    equipment: {
      hasAssetRegister: boolean
      status: string
      isAvailable: boolean
    }
  }
}

const CreateSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [currentInfraType, setCurrentInfraType] = useState(0)
  const { toast } = useToast()
  const form = useForm<SurveyData>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedSchool, setSelectedSchool] = useState(null)
  const { schools, fetchingSchools, errorFetchingSchools, mutate } = useAllSchools()

  const infrastructureTypes = [
    "administration block",
    "classroom block",
    "computer lab",
    "library",
    "kitchen",
    "refectory",
    "smart classroom",
    "dormitories",
    "washrooms",
    "playgrounds",
    "school garden",
  ]

  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`survey_draft_${user.id}`)
      if (savedData) {
        form.reset(JSON.parse(savedData))
      }
    }
  }, [user, form])

  useEffect(() => {
    const currentData = form.getValues()
    if (!currentData.infrastructure) {
      currentData.infrastructure = []
    }
    if (!currentData.infrastructure[currentInfraType]) {
      currentData.infrastructure[currentInfraType] = {
        type: infrastructureTypes[currentInfraType],
        size: "",
        capacity: "",
        constructionYear: undefined,
        materials: [],
        status: "",
      }
      form.reset(currentData)
    }
  }, [currentInfraType, infrastructureTypes, form])

  const saveProgress = (data) => {
    if (user?.id) {
      localStorage.setItem(`survey_draft_${user.id}`, JSON.stringify(data))
      toast({ description: "Progress saved", duration: 1000 })
    }
  }

  const nextStep = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        saveProgress(form.getValues())
        setCurrentStep((prev) => prev + 1)
      }
    })
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const nextInfraType = () => {
    if (currentInfraType < infrastructureTypes.length - 1) {
      const currentData = form.getValues()
      currentData.infrastructure[currentInfraType + 1] = {
        type: infrastructureTypes[currentInfraType + 1],
        size: "",
        capacity: "",
        constructionYear: undefined,
        materials: [],
        status: "",
      }

      saveProgress(currentData)
      setCurrentInfraType(currentInfraType + 1)
    } else {
      nextStep()
    }
  }

  const prevInfraType = () => {
    if (currentInfraType > 0) {
      setCurrentInfraType(currentInfraType - 1)
    } else {
      prevStep()
    }
  }
  const onSubmit = async (data: any) => {
    try {
      // Validate that a school is selected
      if (!selectedSchool) {
        toast({
          title: "Error",
          description: "Please select a school first",
          variant: "destructive",
        })
        return
      }
      const surveyPayload = {
        schoolId: selectedSchool.id,
        schoolSurveyData: JSON.stringify(data),
      }

      // Submit to API
      const response = await AuthApi.post("/school-survey/add", surveyPayload)

      // Handle successful submission
      toast({
        title: "Survey Submitted",
        description: "Your survey has been successfully submitted.",
      })

      // Clear local storage and navigate
      localStorage.removeItem(`survey_draft_${user?.id}`)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)

      // Handle submission error
      toast({
        title: "Submission Error",
        description: error.response?.data?.message || "Failed to submit survey. Please try again.",
        variant: "destructive",
      })
    }
  }
  const renderSchoolSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="school-select" className="text-blue-700">
          Select School
        </Label>
        <select
          id="school-select"
          className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          {...form.register("school.id", {
            required: "Please select a school",
          })}
          onChange={(e) => {
            const school = schools.find((s) => s.id === e.target.value)
            if (school) {
              setSelectedSchool(school)
              form.reset({ school })
            }
          }}
        >
          <option value="">Select a school...</option>
          {fetchingSchools ? (
            <option disabled>Loading schools...</option>
          ) : errorFetchingSchools ? (
            <option disabled>Error fetching schools</option>
          ) : (
            schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))
          )}
        </select>
        {form.formState.errors.school?.id && <p className="text-red-500">{form.formState.errors.school.id.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-status" className="text-blue-700">
            Status
          </Label>
          <select
            id="school-status"
            className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...form.register("school.status", {
              required: "Status is required",
            })}
          >
            <option value="">Select status...</option>
            <option value="PUPLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="GOVERNMENT_AIDED">GOVERNMENT_AIDED</option>
          </select>
          {form.formState.errors.school?.status && (
            <p className="text-red-500">{form.formState.errors.school.status.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-category" className="text-blue-700">
            Category
          </Label>
          <select
            id="school-category"
            className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...form.register("school.category", {
              required: "school's category is required",
            })}
          >
            <option value="">Select Category...</option>
            <option value="public">Day</option>
            <option value="private">Boarding</option>
            <option value="private-govt">Mixed</option>
          </select>
          {form.formState.errors.school?.category && (
            <p className="text-red-500">{form.formState.errors.school.category.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-email" className="text-blue-700">
            School Email
          </Label>
          <Input
            id="school-email"
            type="email"
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            {...form.register("school.contact.email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {form.formState.errors.school?.contact?.email && (
            <p className="text-red-500">{form.formState.errors.school.contact.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="headTeacherName" className="text-blue-700">
            Head Teacher's Name
          </Label>
          <Input
            id="headTeacherName"
            type="text"
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            {...form.register("school.contact.headteacher", {
              required: "Head Teacher's name is required",
            })}
          />
          {form.formState.errors.school?.contact?.headteacher && (
            <p className="text-red-500">{form.formState.errors.school.contact.headteacher.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-phone" className="text-blue-700">
            Phone Number
          </Label>
          <Input
            id="school-phone"
            type="tel"
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            {...form.register("school.contact.phone", {
              required: "Phone number is required",
            })}
          />
          {form.formState.errors.school?.contact?.phone && (
            <p className="text-red-500">{form.formState.errors.school.contact.phone.message}</p>
          )}
        </div>

        <div className="space-x-4 py-2 flex">
          <div>
            <Label htmlFor="number-of-male-teachers" className="text-blue-700">
              N of Male Teachers
            </Label>
            <Input
              id="number-of-male-teachers"
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("school.stats.maleTeachers", {
                required: "Number of male teachers is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {form.formState.errors.school?.stats?.maleTeachers && (
              <p className="text-red-500">{form.formState.errors.school.stats.maleTeachers.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="number-of-female-teachers" className="text-blue-700">
              N of Female Teachers
            </Label>
            <Input
              id="number-of-female-teachers"
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("school.stats.femaleTeachers", {
                required: "Number of female teachers is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {form.formState.errors.school?.stats?.femaleTeachers && (
              <p className="text-red-500">{form.formState.errors.school.stats.femaleTeachers.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTradesSection = () => {
    const tradesData = selectedSchool?.trades || []

    const mappedTrades = tradesData.map((tradeItem) => ({
      id: tradeItem.id,
      name: tradeItem.trade.name,
      certificationCode: tradeItem.trade.certificationCode,
      totalStudents: tradeItem.totalNumberOfStudents,
      status: tradeItem.status,
    }))

    return (
      <div className="space-y-6">
        {mappedTrades.map((trade, tradeIndex) => (
          <Card key={trade.id} className="p-4 space-y-4 border-blue-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-blue-700">{trade.name}</h3>
              <span className="text-sm text-blue-600">Code: {trade.certificationCode}</span>
            </div>

            {[3, 4, 5].map((level, levelIndex) => (
              <div key={level} className="space-y-4 border-t border-blue-100 pt-4">
                <h4 className="font-medium text-blue-600">Level {level}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-blue-700">Classrooms</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(`school.trades.${tradeIndex}.levels.${levelIndex}.classrooms`, {
                        valueAsNumber: true,
                        required: "Number of classrooms is required",
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-700">Male Students</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(`school.trades.${tradeIndex}.levels.${levelIndex}.students.male`, {
                        valueAsNumber: true,
                        required: "Number of male students is required",
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-700">Female Students</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(`school.trades.${tradeIndex}.levels.${levelIndex}.students.female`, {
                        valueAsNumber: true,
                        required: "Number of female students is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-blue-100">
              <div className="flex justify-between text-sm text-blue-600">
                <span>Status: {trade.status}</span>
                <span>Total Students: {trade.totalStudents}</span>
              </div>
            </div>
          </Card>
        ))}

        {mappedTrades.length === 0 && (
          <div className="text-center p-8 text-blue-500 bg-blue-50 rounded-lg border border-blue-200">
            Please select a school to view its trades
          </div>
        )}
      </div>
    )
  }

  const renderInfrastructureSection = () => {
    const type = infrastructureTypes[currentInfraType]
    const infraIndex = currentInfraType

    return (
      <div className="space-y-6">
        <Card className="p-4 space-y-4 border-blue-200">
          <h3 className="font-semibold capitalize text-blue-700">{type}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-700">Size (sq. m)</Label>
              <RadioGroup
                onValueChange={(value) => form.setValue(`infrastructure.${infraIndex}.size`, value)}
                value={form.watch(`infrastructure.${infraIndex}.size`)}
              >
                {[
                  "1-20",
                  "20-50",
                  "50-100",
                  "100-150",
                  "150-200",
                  "200-250",
                  "250-300",
                  "300-400",
                  "400-600",
                  "600-more",
                ].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} className="text-blue-600" />
                    <Label htmlFor={`size-${size}`} className="text-blue-600">
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Construction Material</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Ruriba bricks",
                  "Burnt bricks",
                  "Block cement",
                  "Mud bricks",
                  "Mud & Wood walls",
                  "Metals",
                  "Iron sheets",
                  "Roof tiles",
                  "Tiles",
                  "Cement pavement",
                  "Wall paint",
                  "Steel trusses",
                  "Wood trusses",
                ].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      checked={form.watch(`infrastructure.${infraIndex}.materials`)?.includes(material)}
                      onCheckedChange={(checked) => {
                        const currentMaterials = form.watch(`infrastructure.${infraIndex}.materials`) || []
                        if (checked) {
                          form.setValue(`infrastructure.${infraIndex}.materials`, [...currentMaterials, material])
                        } else {
                          form.setValue(
                            `infrastructure.${infraIndex}.materials`,
                            currentMaterials.filter((m) => m !== material),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`material-${material}`} className="text-blue-600">
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-700">Construction Year</Label>
              <Input
                type="number"
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                {...form.register(`infrastructure.${infraIndex}.constructionYear` as const)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-700">Status</Label>
              <RadioGroup
                onValueChange={(value) => form.setValue(`infrastructure.${infraIndex}.status`, value)}
                value={form.watch(`infrastructure.${infraIndex}.status`)}
              >
                {["good", "moderate", "poor"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={`status-${status}`} className="text-blue-600" />
                    <Label htmlFor={`status-${status}`} className="text-blue-600">
                      {status}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevInfraType}
            className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button type="button" onClick={nextInfraType} className="bg-blue-600 hover:bg-blue-700 text-white">
            {currentInfraType < infrastructureTypes.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Infrastructure"
            )}
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-blue-600">
            Infrastructure {currentInfraType + 1} of {infrastructureTypes.length}
          </p>
          <div className="w-full bg-blue-100 h-2 rounded-full mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentInfraType + 1) / infrastructureTypes.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderITSection = () => (
    <div className="space-y-6">
      <Card className="p-4 space-y-4 border-blue-200">
        <h3 className="font-semibold text-blue-700">Computer Lab</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-blue-700">Total Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.totalComputers")}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-blue-700">Working Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.workingComputers")}
            />
          </div>
          {/* Not Working Computers */}
          <div className="space-y-2">
            <Label className="text-blue-700">Not Working Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.nonWorkingComputers")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-blue-700">Connected with LAN</Label>
            <RadioGroup
              onValueChange={(value) => form.setValue("it.computerLab.hasLAN", value === "yes")}
              defaultValue={form.watch("it.computerLab.hasLAN") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-lan-yes" className="text-blue-600" />
                <Label htmlFor="has-lan-yes" className="text-blue-600">
                  Yes
                </Label>
                <RadioGroupItem value="no" id="has-lan-no" className="text-blue-600" />
                <Label htmlFor="has-lan-no" className="text-blue-600">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-700">Do you have projectors?</Label>
            <RadioGroup
              onValueChange={(value) => form.setValue("it.computerLab.hasProjectors", value === "yes")}
              defaultValue={form.watch("it.computerLab.hasProjectors") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-projectors-yes" className="text-blue-600" />
                <Label htmlFor="has-projectors-yes" className="text-blue-600">
                  Yes
                </Label>
                <RadioGroupItem value="no" id="has-projectors-no" className="text-blue-600" />
                <Label htmlFor="has-projectors-no" className="text-blue-600">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Show only when "Yes" is selected */}
          {form.watch("it.computerLab.hasProjectors") === true && (
            <div className="grid grid-cols-2 gap-4">
              {/* Total Projectors */}
              <div className="space-y-2">
                <Label className="text-blue-700">Total Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.totalProjectors")}
                />
              </div>
              {/* Working Projectors */}
              <div className="space-y-2">
                <Label className="text-blue-700">Working Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.workingProjectors")}
                />
              </div>
              {/* Not Working Projectors */}
              <div className="space-y-2">
                <Label className="text-blue-700">Not Working Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.nonWorkingProjectors")}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 space-y-4 border-blue-200">
        <h3 className="font-semibold text-blue-700">Internet & Server</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-blue-700">Internet Available</Label>
            <RadioGroup
              onValueChange={(value) => form.setValue("it.internet.exists", value === "yes")}
              defaultValue={form.watch("it.internet.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-internet-yes" className="text-blue-600" />
                <Label htmlFor="has-internet-yes" className="text-blue-600">
                  Yes
                </Label>
                <RadioGroupItem value="no" id="has-internet-no" className="text-blue-600" />
                <Label htmlFor="has-internet-no" className="text-blue-600">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Show Internet Type dropdown only if "Yes" is selected */}
          {form.watch("it.internet.exists") === true && (
            <div className="space-y-2">
              <Label className="text-blue-700">Internet Type</Label>
              <select
                className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...form.register("it.internet.type")}
              >
                <option value="4G">4G</option>
                <option value="Fiber">Fiber</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-blue-700">Has Server</Label>
            <RadioGroup
              onValueChange={(value) => form.setValue("it.server.exists", value === "yes")}
              defaultValue={form.watch("it.server.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-server-yes" className="text-blue-600" />
                <Label htmlFor="has-server-yes" className="text-blue-600">
                  Yes
                </Label>
                <RadioGroupItem value="no" id="has-server-no" className="text-blue-600" />
                <Label htmlFor="has-server-no" className="text-blue-600">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {form.watch("it.server.exists") && (
          <div className="space-y-2">
            <Label className="text-blue-700">Server Specifications</Label>
            <textarea
              className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              {...form.register("it.server.specifications")}
            />
          </div>
        )}
      </Card>
      <Card className="p-4 space-y-4 border-blue-200">
        <h3 className="font-semibold text-blue-700">Additional Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-blue-700">Energy Sources</Label>
            <div className="grid grid-cols-3 gap-2">
              {["Solar", "Grid", "Renewable Energy"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={`energy-${source}`}
                    className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    onCheckedChange={(checked) => {
                      const currentSources = form.getValues("it.energySources") || []
                      if (checked) {
                        form.setValue("it.energySources", [...currentSources, source])
                      } else {
                        form.setValue(
                          "it.energySources",
                          currentSources.filter((s) => s !== source),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={`energy-${source}`} className="text-blue-600">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-blue-700">Equipment Status</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-asset-register"
                  className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  onCheckedChange={(checked) => form.setValue("it.equipment.hasAssetRegister", checked as boolean)}
                />
                <Label htmlFor="has-asset-register" className="text-blue-600">
                  Has Asset Register
                </Label>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-700">Status</Label>
                <RadioGroup onValueChange={(value) => form.setValue("it.equipment.status", value)}>
                  {["good", "moderate", "poor"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={`equipment-status-${status}`} className="text-blue-600" />
                      <Label htmlFor={`equipment-status-${status}`} className="text-blue-600">
                        {status}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">School Information</h2>
            <p className="text-blue-600">Select a school and verify its information</p>
            {renderSchoolSection()}
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">Trade Information</h2>
            <p className="text-blue-600">Enter information about school trades and students</p>
            {renderTradesSection()}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">Infrastructure</h2>
            <p className="text-blue-600">Enter details about school infrastructure</p>
            {renderInfrastructureSection()}
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">IT Infrastructure</h2>
            <p className="text-blue-600">Enter information about IT equipment and facilities</p>
            {renderITSection()}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="p-6 border-blue-200">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Create New Survey</h1>
            <p className="text-blue-600">Step {currentStep} of 4</p>
          </div>

          <div className="w-full bg-blue-100 h-2 rounded-full mb-8">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              {currentStep !== 3 && (
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

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Submit Survey
                    </Button>
                  )}
                </div>
              )}
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default CreateSurvey

