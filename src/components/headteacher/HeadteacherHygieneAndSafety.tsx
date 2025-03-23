"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { HygieneAndSafetyData } from "./evaluation/EvaluationType"

interface HeadteacherHygieneAndSafetyProps {
  data: any
  onDataChange: (data: any) => void
}

export default function HeadteacherHygieneAndSafety({ data, onDataChange }: HeadteacherHygieneAndSafetyProps) {
  const [activeTab, setActiveTab] = useState("administrationBlock")
  const [hygieneAndSafetyData, setHygieneAndSafetyData] = useState<HygieneAndSafetyData>({
    administrationBlock: {
      staffOffices: { availability: 0, quality: 0, observation: "" },
      meetingRooms: { availability: 0, quality: 0, observation: "" },
      accessibility: { availability: 0, quality: 0, observation: "" },
      emergencyExits: { availability: 0, quality: 0, observation: "" },
      ventilationLighting: { availability: 0, quality: 0, observation: "" },
    },
    classroomBlock: {
      capacity: { availability: 0, quality: 0, observation: "" },
      desksChairs: { availability: 0, quality: 0, observation: "" },
      ventilationLighting: { availability: 0, quality: 0, observation: "" },
      emergencyExits: { availability: 0, quality: 0, observation: "" },
    },
    computerLab: {
      functionalComputers: { availability: 0, quality: 0, observation: "" },
      internetAccess: { availability: 0, quality: 0, observation: "" },
      workstationSetup: { availability: 0, quality: 0, observation: "" },
      accessibility: { availability: 0, quality: 0, observation: "" },
    },
    library: {
      booksResources: { availability: 0, quality: 0, observation: "" },
      studyArea: { availability: 0, quality: 0, observation: "" },
      conditionOfBooks: { availability: 0, quality: 0, observation: "" },
      computers: { availability: 0, quality: 0, observation: "" },
    },
    kitchen: {
      healthSafetyCompliance: { availability: 0, quality: 0, observation: "" },
      foodStorage: { availability: 0, quality: 0, observation: "" },
      sanitationFacilities: { availability: 0, quality: 0, observation: "" },
    },
    refectory: {
      tablesSeating: { availability: 0, quality: 0, observation: "" },
      cleanlinessHygiene: { availability: 0, quality: 0, observation: "" },
      ventilation: { availability: 0, quality: 0, observation: "" },
      wasteDisposal: { availability: 0, quality: 0, observation: "" },
    },
    dormitories: {
      spacePrivacy: { availability: 0, quality: 0, observation: "" },
      cleanlinessArrangement: { availability: 0, quality: 0, observation: "" },
      fireSafety: { availability: 0, quality: 0, observation: "" },
    },
    washrooms: {
      cleanlinessSupplies: { availability: 0, quality: 0, observation: "" },
      privacySafety: { availability: 0, quality: 0, observation: "" },
      accessibility: { availability: 0, quality: 0, observation: "" },
    },
    playgrounds: {
      safetyOfEquipment: { availability: 0, quality: 0, observation: "" },
      shadedAreas: { availability: 0, quality: 0, observation: "" },
    },
    schoolGarden: {
      healthSafetyOfPlants: { availability: 0, quality: 0, observation: "" },
      accessibility: { availability: 0, quality: 0, observation: "" },
      educationalUse: { availability: 0, quality: 0, observation: "" },
    },
    workshops: {
      toolsMachinery: { availability: 0, quality: 0, observation: "" },
      ventilationSafety: { availability: 0, quality: 0, observation: "" },
      storeArrangement: { availability: 0, quality: 0, observation: "" },
      cleanliness: { availability: 0, quality: 0, observation: "" },
    },
    overview: {
      strengths: "",
      weaknesses: "",
      areasOfImprovement: "",
    },
    totalMarks: 0,
  })

  // Load data from parent component if available
  useEffect(() => {
    if (data?.hygieneAndSafety) {
      setHygieneAndSafetyData(data.hygieneAndSafety)
    }
  }, [data])

  // Calculate total marks
  const calculateTotalMarks = () => {
    let total = 0

    // Administration Block
    Object.values(hygieneAndSafetyData.administrationBlock).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Classroom Block
    Object.values(hygieneAndSafetyData.classroomBlock).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Computer Lab
    Object.values(hygieneAndSafetyData.computerLab).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Library
    Object.values(hygieneAndSafetyData.library).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Kitchen
    Object.values(hygieneAndSafetyData.kitchen).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Refectory
    Object.values(hygieneAndSafetyData.refectory).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Dormitories
    Object.values(hygieneAndSafetyData.dormitories).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Washrooms
    Object.values(hygieneAndSafetyData.washrooms).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Playgrounds
    Object.values(hygieneAndSafetyData.playgrounds).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // School Garden
    Object.values(hygieneAndSafetyData.schoolGarden).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    // Workshops
    Object.values(hygieneAndSafetyData.workshops).forEach((item) => {
      if (item.availability === 1 || item.quality === 1) {
        total += 0.5
      }
    })

    return total
  }

  // Update data and notify parent component
  const updateData = (newData: HygieneAndSafetyData) => {
    const totalMarks = calculateTotalMarks()
    const updatedData = {
      ...newData,
      totalMarks,
    }

    setHygieneAndSafetyData(updatedData)
    onDataChange({ hygieneAndSafety: updatedData })
  }

  // Handle radio button changes
  const handleRadioChange = (
    section: keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">,
    item: string,
    field: "availability" | "quality",
    value: string,
  ) => {
    const newData = {
      ...hygieneAndSafetyData,
      [section]: {
        ...hygieneAndSafetyData[section],
        [item]: {
          ...hygieneAndSafetyData[section][item],
          [field]: value === "yes" ? 1 : 0,
        },
      },
    }

    updateData(newData)
  }

  // Handle observation changes
  const handleObservationChange = (
    section: keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">,
    item: string,
    value: string,
  ) => {
    const newData = {
      ...hygieneAndSafetyData,
      [section]: {
        ...hygieneAndSafetyData[section],
        [item]: {
          ...hygieneAndSafetyData[section][item],
          observation: value,
        },
      },
    }

    updateData(newData)
  }

  // Handle overview changes
  const handleOverviewChange = (field: keyof HygieneAndSafetyData["overview"], value: string) => {
    const newData = {
      ...hygieneAndSafetyData,
      overview: {
        ...hygieneAndSafetyData.overview,
        [field]: value,
      },
    }

    updateData(newData)
  }

  // Render content for Administration Block
  const renderAdministrationBlock = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.1 Administration Block (2.5 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Offices of all staff</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.administrationBlock.staffOffices.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("administrationBlock", "staffOffices", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="staffOffices-avail-yes" />
                      <Label htmlFor="staffOffices-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="staffOffices-avail-no" />
                      <Label htmlFor="staffOffices-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.administrationBlock.staffOffices.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.administrationBlock.staffOffices.observation}
                    onChange={(e) => handleObservationChange("administrationBlock", "staffOffices", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Meeting rooms</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.administrationBlock.meetingRooms.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("administrationBlock", "meetingRooms", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="meetingRooms-avail-yes" />
                      <Label htmlFor="meetingRooms-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="meetingRooms-avail-no" />
                      <Label htmlFor="meetingRooms-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"> </div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.administrationBlock.meetingRooms.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.administrationBlock.meetingRooms.observation}
                    onChange={(e) => handleObservationChange("administrationBlock", "meetingRooms", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Accessibility and Condition of offices for staff and visitors</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.administrationBlock.accessibility.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("administrationBlock", "accessibility", "quality", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="accessibility-qual-yes" />
                      <Label htmlFor="accessibility-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="accessibility-qual-no" />
                      <Label htmlFor="accessibility-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.administrationBlock.accessibility.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.administrationBlock.accessibility.observation}
                    onChange={(e) => handleObservationChange("administrationBlock", "accessibility", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Emergency exits</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.administrationBlock.emergencyExits.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("administrationBlock", "emergencyExits", "quality", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="emergencyExits-qual-yes" />
                      <Label htmlFor="emergencyExits-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="emergencyExits-qual-no" />
                      <Label htmlFor="emergencyExits-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.administrationBlock.emergencyExits.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.administrationBlock.emergencyExits.observation}
                    onChange={(e) => handleObservationChange("administrationBlock", "emergencyExits", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Ventilation and lighting</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.administrationBlock.ventilationLighting.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("administrationBlock", "ventilationLighting", "quality", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="ventilationLighting-qual-yes" />
                      <Label htmlFor="ventilationLighting-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="ventilationLighting-qual-no" />
                      <Label htmlFor="ventilationLighting-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>
                    {hygieneAndSafetyData.administrationBlock.ventilationLighting.quality === 1 ? "0.5" : "0.0"}
                  </div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.administrationBlock.ventilationLighting.observation}
                    onChange={(e) =>
                      handleObservationChange("administrationBlock", "ventilationLighting", e.target.value)
                    }
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Classroom Block
  const renderClassroomBlock = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.2 Classroom Block (2 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Capacity to accommodate students comfortably</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.classroomBlock.capacity.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("classroomBlock", "capacity", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="capacity-qual-yes" />
                      <Label htmlFor="capacity-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="capacity-qual-no" />
                      <Label htmlFor="capacity-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.classroomBlock.capacity.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.classroomBlock.capacity.observation}
                    onChange={(e) => handleObservationChange("classroomBlock", "capacity", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Desks and chairs</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.classroomBlock.desksChairs.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("classroomBlock", "desksChairs", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="desksChairs-avail-yes" />
                      <Label htmlFor="desksChairs-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="desksChairs-avail-no" />
                      <Label htmlFor="desksChairs-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.classroomBlock.desksChairs.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.classroomBlock.desksChairs.observation}
                    onChange={(e) => handleObservationChange("classroomBlock", "desksChairs", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Ventilation and lighting</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.classroomBlock.ventilationLighting.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("classroomBlock", "ventilationLighting", "quality", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="classroomVentilation-qual-yes" />
                      <Label htmlFor="classroomVentilation-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="classroomVentilation-qual-no" />
                      <Label htmlFor="classroomVentilation-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.classroomBlock.ventilationLighting.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.classroomBlock.ventilationLighting.observation}
                    onChange={(e) => handleObservationChange("classroomBlock", "ventilationLighting", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Emergency exits</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.classroomBlock.emergencyExits.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("classroomBlock", "emergencyExits", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="classroomEmergency-qual-yes" />
                      <Label htmlFor="classroomEmergency-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="classroomEmergency-qual-no" />
                      <Label htmlFor="classroomEmergency-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.classroomBlock.emergencyExits.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.classroomBlock.emergencyExits.observation}
                    onChange={(e) => handleObservationChange("classroomBlock", "emergencyExits", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Computer Lab
  const renderComputerLab = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.3 Computer Lab (2 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Functional computers related to the number of students</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.computerLab.functionalComputers.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("computerLab", "functionalComputers", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="functionalComputers-qual-yes" />
                      <Label htmlFor="functionalComputers-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="functionalComputers-qual-no" />
                      <Label htmlFor="functionalComputers-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.computerLab.functionalComputers.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.computerLab.functionalComputers.observation}
                    onChange={(e) => handleObservationChange("computerLab", "functionalComputers", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Internet access</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.computerLab.internetAccess.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("computerLab", "internetAccess", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="internetAccess-qual-yes" />
                      <Label htmlFor="internetAccess-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="internetAccess-qual-no" />
                      <Label htmlFor="internetAccess-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.computerLab.internetAccess.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.computerLab.internetAccess.observation}
                    onChange={(e) => handleObservationChange("computerLab", "internetAccess", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Setup of workstations</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.computerLab.workstationSetup.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("computerLab", "workstationSetup", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="workstationSetup-qual-yes" />
                      <Label htmlFor="workstationSetup-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="workstationSetup-qual-no" />
                      <Label htmlFor="workstationSetup-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.computerLab.workstationSetup.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.computerLab.workstationSetup.observation}
                    onChange={(e) => handleObservationChange("computerLab", "workstationSetup", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Accessibility and quiet study areas</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.computerLab.accessibility.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("computerLab", "accessibility", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="computerAccessibility-qual-yes" />
                      <Label htmlFor="computerAccessibility-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="computerAccessibility-qual-no" />
                      <Label htmlFor="computerAccessibility-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.computerLab.accessibility.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.computerLab.accessibility.observation}
                    onChange={(e) => handleObservationChange("computerLab", "accessibility", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Library
  const renderLibrary = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.4 Library (2 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Books and other resources</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.library.booksResources.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("library", "booksResources", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="booksResources-avail-yes" />
                      <Label htmlFor="booksResources-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="booksResources-avail-no" />
                      <Label htmlFor="booksResources-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.library.booksResources.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.library.booksResources.observation}
                    onChange={(e) => handleObservationChange("library", "booksResources", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Study area</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.library.studyArea.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("library", "studyArea", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="studyArea-qual-yes" />
                      <Label htmlFor="studyArea-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="studyArea-qual-no" />
                      <Label htmlFor="studyArea-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.library.studyArea.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.library.studyArea.observation}
                    onChange={(e) => handleObservationChange("library", "studyArea", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Condition of books and resources</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.library.conditionOfBooks.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("library", "conditionOfBooks", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="conditionOfBooks-qual-yes" />
                      <Label htmlFor="conditionOfBooks-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="conditionOfBooks-qual-no" />
                      <Label htmlFor="conditionOfBooks-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.library.conditionOfBooks.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.library.conditionOfBooks.observation}
                    onChange={(e) => handleObservationChange("library", "conditionOfBooks", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Computers</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.library.computers.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("library", "computers", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="libraryComputers-avail-yes" />
                      <Label htmlFor="libraryComputers-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="libraryComputers-avail-no" />
                      <Label htmlFor="libraryComputers-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.library.computers.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.library.computers.observation}
                    onChange={(e) => handleObservationChange("library", "computers", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Kitchen
  const renderKitchen = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.5 Kitchen (1.5 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Compliance with health and safety regulations</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.kitchen.healthSafetyCompliance.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("kitchen", "healthSafetyCompliance", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="healthSafetyCompliance-qual-yes" />
                      <Label htmlFor="healthSafetyCompliance-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="healthSafetyCompliance-qual-no" />
                      <Label htmlFor="healthSafetyCompliance-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.kitchen.healthSafetyCompliance.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.kitchen.healthSafetyCompliance.observation}
                    onChange={(e) => handleObservationChange("kitchen", "healthSafetyCompliance", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Cleanliness and organization of food storage</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.kitchen.foodStorage.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("kitchen", "foodStorage", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="foodStorage-qual-yes" />
                      <Label htmlFor="foodStorage-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="foodStorage-qual-no" />
                      <Label htmlFor="foodStorage-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.kitchen.foodStorage.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.kitchen.foodStorage.observation}
                    onChange={(e) => handleObservationChange("kitchen", "foodStorage", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Proper sanitation facilities for food preparation</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.kitchen.sanitationFacilities.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("kitchen", "sanitationFacilities", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="sanitationFacilities-qual-yes" />
                      <Label htmlFor="sanitationFacilities-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="sanitationFacilities-qual-no" />
                      <Label htmlFor="sanitationFacilities-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.kitchen.sanitationFacilities.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.kitchen.sanitationFacilities.observation}
                    onChange={(e) => handleObservationChange("kitchen", "sanitationFacilities", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Refectory
  const renderRefectory = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.6 Refectory (2 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Condition of tables and seating arrangements</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.refectory.tablesSeating.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("refectory", "tablesSeating", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="tablesSeating-qual-yes" />
                      <Label htmlFor="tablesSeating-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="tablesSeating-qual-no" />
                      <Label htmlFor="tablesSeating-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.refectory.tablesSeating.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.refectory.tablesSeating.observation}
                    onChange={(e) => handleObservationChange("refectory", "tablesSeating", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Cleanliness and hygiene practices</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.refectory.cleanlinessHygiene.quality === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("refectory", "cleanlinessHygiene", "quality", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="cleanlinessHygiene-qual-yes" />
                      <Label htmlFor="cleanlinessHygiene-qual-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="cleanlinessHygiene-qual-no" />
                      <Label htmlFor="cleanlinessHygiene-qual-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.refectory.cleanlinessHygiene.quality === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.refectory.cleanlinessHygiene.observation}
                    onChange={(e) => handleObservationChange("refectory", "cleanlinessHygiene", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Ventilation</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.refectory.ventilation.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("refectory", "ventilation", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="refectoryVentilation-avail-yes" />
                      <Label htmlFor="refectoryVentilation-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="refectoryVentilation-avail-no" />
                      <Label htmlFor="refectoryVentilation-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.refectory.ventilation.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.refectory.ventilation.observation}
                    onChange={(e) => handleObservationChange("refectory", "ventilation", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Waste disposal systems</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.refectory.wasteDisposal.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("refectory", "wasteDisposal", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="wasteDisposal-avail-yes" />
                      <Label htmlFor="wasteDisposal-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="wasteDisposal-avail-no" />
                      <Label htmlFor="wasteDisposal-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.refectory.wasteDisposal.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.refectory.wasteDisposal.observation}
                    onChange={(e) => handleObservationChange("refectory", "wasteDisposal", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Dormitories
  const renderDormitories = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.7 Dormitories (1.5 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Adequate space and privacy for students</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.dormitories.spacePrivacy.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("dormitories", "spacePrivacy", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="spacePrivacy-avail-yes" />
                      <Label htmlFor="spacePrivacy-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="spacePrivacy-avail-no" />
                      <Label htmlFor="spacePrivacy-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.dormitories.spacePrivacy.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.dormitories.spacePrivacy.observation}
                    onChange={(e) => handleObservationChange("dormitories", "spacePrivacy", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Cleanliness and beds arrangement</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.dormitories.cleanlinessArrangement.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("dormitories", "cleanlinessArrangement", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="cleanlinessArrangement-avail-yes" />
                      <Label htmlFor="cleanlinessArrangement-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="cleanlinessArrangement-avail-no" />
                      <Label htmlFor="cleanlinessArrangement-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>
                    {hygieneAndSafetyData.dormitories.cleanlinessArrangement.availability === 1 ? "0.5" : "0.0"}
                  </div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.dormitories.cleanlinessArrangement.observation}
                    onChange={(e) => handleObservationChange("dormitories", "cleanlinessArrangement", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Fire safety measures and emergency exits</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.dormitories.fireSafety.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("dormitories", "fireSafety", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="fireSafety-avail-yes" />
                      <Label htmlFor="fireSafety-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="fireSafety-avail-no" />
                      <Label htmlFor="fireSafety-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.dormitories.fireSafety.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.dormitories.fireSafety.observation}
                    onChange={(e) => handleObservationChange("dormitories", "fireSafety", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Washrooms
  const renderWashrooms = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.8 Washrooms (1.5 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Cleanliness and availability of supplies (soap, paper)</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.washrooms.cleanlinessSupplies.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("washrooms", "cleanlinessSupplies", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="cleanlinessSupplies-avail-yes" />
                      <Label htmlFor="cleanlinessSupplies-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="cleanlinessSupplies-avail-no" />
                      <Label htmlFor="cleanlinessSupplies-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.washrooms.cleanlinessSupplies.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.washrooms.cleanlinessSupplies.observation}
                    onChange={(e) => handleObservationChange("washrooms", "cleanlinessSupplies", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Adequate privacy and safety measures</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.washrooms.privacySafety.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("washrooms", "privacySafety", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="privacySafety-avail-yes" />
                      <Label htmlFor="privacySafety-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="privacySafety-avail-no" />
                      <Label htmlFor="privacySafety-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.washrooms.privacySafety.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.washrooms.privacySafety.observation}
                    onChange={(e) => handleObservationChange("washrooms", "privacySafety", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Accessibility and sufficient for all students</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.washrooms.accessibility.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("washrooms", "accessibility", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="washroomAccessibility-avail-yes" />
                      <Label htmlFor="washroomAccessibility-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="washroomAccessibility-avail-no" />
                      <Label htmlFor="washroomAccessibility-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.washrooms.accessibility.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.washrooms.accessibility.observation}
                    onChange={(e) => handleObservationChange("washrooms", "accessibility", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Playgrounds
  const renderPlaygrounds = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.9 Playgrounds (1 mark)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Safety of equipment and surfaces</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.playgrounds.safetyOfEquipment.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("playgrounds", "safetyOfEquipment", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="safetyOfEquipment-avail-yes" />
                      <Label htmlFor="safetyOfEquipment-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="safetyOfEquipment-avail-no" />
                      <Label htmlFor="safetyOfEquipment-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.playgrounds.safetyOfEquipment.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.playgrounds.safetyOfEquipment.observation}
                    onChange={(e) => handleObservationChange("playgrounds", "safetyOfEquipment", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Availability of shaded areas</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.playgrounds.shadedAreas.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("playgrounds", "shadedAreas", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="shadedAreas-avail-yes" />
                      <Label htmlFor="shadedAreas-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="shadedAreas-avail-no" />
                      <Label htmlFor="shadedAreas-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.playgrounds.shadedAreas.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.playgrounds.shadedAreas.observation}
                    onChange={(e) => handleObservationChange("playgrounds", "shadedAreas", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for School Garden
  const renderSchoolGarden = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.10 School Garden (1.5 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Health and safety of plants (non-toxic)</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("schoolGarden", "healthSafetyOfPlants", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="healthSafetyOfPlants-avail-yes" />
                      <Label htmlFor="healthSafetyOfPlants-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="healthSafetyOfPlants-avail-no" />
                      <Label htmlFor="healthSafetyOfPlants-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.observation}
                    onChange={(e) => handleObservationChange("schoolGarden", "healthSafetyOfPlants", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Accessibility for students</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.schoolGarden.accessibility.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("schoolGarden", "accessibility", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="gardenAccessibility-avail-yes" />
                      <Label htmlFor="gardenAccessibility-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="gardenAccessibility-avail-no" />
                      <Label htmlFor="gardenAccessibility-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.schoolGarden.accessibility.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.schoolGarden.accessibility.observation}
                    onChange={(e) => handleObservationChange("schoolGarden", "accessibility", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Educational use of the garden</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.schoolGarden.educationalUse.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("schoolGarden", "educationalUse", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="educationalUse-avail-yes" />
                      <Label htmlFor="educationalUse-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="educationalUse-avail-no" />
                      <Label htmlFor="educationalUse-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.schoolGarden.educationalUse.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.schoolGarden.educationalUse.observation}
                    onChange={(e) => handleObservationChange("schoolGarden", "educationalUse", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render content for Workshops
  const renderWorkshops = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-blue-700">6.11 Workshops (2 marks)</h3>

        <div className="bg-blue-50/50 p-6 rounded-md">
          <div className="space-y-8">
            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Condition of tools and machinery</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.workshops.toolsMachinery.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("workshops", "toolsMachinery", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="toolsMachinery-avail-yes" />
                      <Label htmlFor="toolsMachinery-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="toolsMachinery-avail-no" />
                      <Label htmlFor="toolsMachinery-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.workshops.toolsMachinery.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.workshops.toolsMachinery.observation}
                    onChange={(e) => handleObservationChange("workshops", "toolsMachinery", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Proper ventilation and safety measures</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.workshops.ventilationSafety.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) =>
                      handleRadioChange("workshops", "ventilationSafety", "availability", value)
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="ventilationSafety-avail-yes" />
                      <Label htmlFor="ventilationSafety-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="ventilationSafety-avail-no" />
                      <Label htmlFor="ventilationSafety-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.workshops.ventilationSafety.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.workshops.ventilationSafety.observation}
                    onChange={(e) => handleObservationChange("workshops", "ventilationSafety", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Store arrangement</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.workshops.storeArrangement.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("workshops", "storeArrangement", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="storeArrangement-avail-yes" />
                      <Label htmlFor="storeArrangement-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="storeArrangement-avail-no" />
                      <Label htmlFor="storeArrangement-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.workshops.storeArrangement.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.workshops.storeArrangement.observation}
                    onChange={(e) => handleObservationChange("workshops", "storeArrangement", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                <div className="w-1/3 pt-1">
                  <p className="font-medium">Cleanliness</p>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Availability (40%)</div>
                  <RadioGroup
                    value={hygieneAndSafetyData.workshops.cleanliness.availability === 1 ? "yes" : "no"}
                    onValueChange={(value) => handleRadioChange("workshops", "cleanliness", "availability", value)}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="yes" id="workshopCleanliness-avail-yes" />
                      <Label htmlFor="workshopCleanliness-avail-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="no" id="workshopCleanliness-avail-no" />
                      <Label htmlFor="workshopCleanliness-avail-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-1/6">
                  <div className="text-sm text-gray-500 mb-1">Quality (60%)</div>
                  <div className="text-center">N/A</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>0.5</div>
                </div>
                <div className="w-1/12 text-center">
                  <div className="text-sm text-gray-500 mb-1"></div>
                  <div>{hygieneAndSafetyData.workshops.cleanliness.availability === 1 ? "0.5" : "0.0"}</div>
                </div>
                <div className="w-1/4">
                  <Textarea
                    placeholder="Add observation..."
                    value={hygieneAndSafetyData.workshops.cleanliness.observation}
                    onChange={(e) => handleObservationChange("workshops", "cleanliness", e.target.value)}
                    className="h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "administrationBlock":
        return renderAdministrationBlock()
      case "classroomBlock":
        return renderClassroomBlock()
      case "computerLab":
        return renderComputerLab()
      case "library":
        return renderLibrary()
      case "kitchen":
        return renderKitchen()
      case "refectory":
        return renderRefectory()
      case "dormitories":
        return renderDormitories()
      case "washrooms":
        return renderWashrooms()
      case "playgrounds":
        return renderPlaygrounds()
      case "schoolGarden":
        return renderSchoolGarden()
      case "workshops":
        return renderWorkshops()
      default:
        return renderAdministrationBlock()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">6. Hygiene and Safety (20 Marks)</h2>

          <div className="flex flex-wrap gap-1 bg-slate-50 p-2 rounded-md mb-6">
            <Button
              variant={activeTab === "administrationBlock" ? "default" : "outline"}
              onClick={() => setActiveTab("administrationBlock")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.1 Administration Block
            </Button>
            <Button
              variant={activeTab === "classroomBlock" ? "default" : "outline"}
              onClick={() => setActiveTab("classroomBlock")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.2 Classroom Block
            </Button>
            <Button
              variant={activeTab === "computerLab" ? "default" : "outline"}
              onClick={() => setActiveTab("computerLab")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.3 Computer Lab
            </Button>
            <Button
              variant={activeTab === "library" ? "default" : "outline"}
              onClick={() => setActiveTab("library")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.4 Library
            </Button>
            <Button
              variant={activeTab === "kitchen" ? "default" : "outline"}
              onClick={() => setActiveTab("kitchen")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.5 Kitchen
            </Button>
            <Button
              variant={activeTab === "refectory" ? "default" : "outline"}
              onClick={() => setActiveTab("refectory")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.6 Refectory
            </Button>
            <Button
              variant={activeTab === "dormitories" ? "default" : "outline"}
              onClick={() => setActiveTab("dormitories")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.7 Dormitories
            </Button>
            <Button
              variant={activeTab === "washrooms" ? "default" : "outline"}
              onClick={() => setActiveTab("washrooms")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.8 Washrooms
            </Button>
            <Button
              variant={activeTab === "playgrounds" ? "default" : "outline"}
              onClick={() => setActiveTab("playgrounds")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.9 Playgrounds
            </Button>
            <Button
              variant={activeTab === "schoolGarden" ? "default" : "outline"}
              onClick={() => setActiveTab("schoolGarden")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.10 School Garden
            </Button>
            <Button
              variant={activeTab === "workshops" ? "default" : "outline"}
              onClick={() => setActiveTab("workshops")}
              className="text-sm px-3 py-1 h-auto"
              size="sm"
            >
              6.11 Workshops
            </Button>
          </div>

          {renderActiveTabContent()}

          <div className="mt-8 border-t border-blue-100 pt-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Overview of the findings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Strengths:</h4>
                <Textarea
                  value={hygieneAndSafetyData.overview.strengths}
                  onChange={(e) => handleOverviewChange("strengths", e.target.value)}
                  placeholder="Enter strengths..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Weaknesses:</h4>
                <Textarea
                  value={hygieneAndSafetyData.overview.weaknesses}
                  onChange={(e) => handleOverviewChange("weaknesses", e.target.value)}
                  placeholder="Enter weaknesses..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Areas of improvement:</h4>
                <Textarea
                  value={hygieneAndSafetyData.overview.areasOfImprovement}
                  onChange={(e) => handleOverviewChange("areasOfImprovement", e.target.value)}
                  placeholder="Enter areas of improvement..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-blue-800">Total marks for Hygiene and Safety:</span>
              <span className="text-xl font-bold text-blue-800">{hygieneAndSafetyData.totalMarks.toFixed(1)} / 20</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

