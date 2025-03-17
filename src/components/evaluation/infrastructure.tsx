"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InfrastructureProps {
  formData: any
  updateFormData: (data: any) => void
  updateSectionMarks: (marks: number) => void
  schoolType: string
}

export default function Infrastructure({
  formData,
  updateFormData,
  updateSectionMarks,
  schoolType,
}: InfrastructureProps) {
  const [localData, setLocalData] = useState({
    // 6.1 Administration Block
    officesAvailability: "",
    officesQuality: "",
    meetingRoomsAvailability: "",
    meetingRoomsQuality: "",
    adminEmergencyExitsAvailability: "",
    adminEmergencyExitsQuality: "",
    adminVentilationAvailability: "",
    adminVentilationQuality: "",

    // 6.2 Classroom Block
    classCapacityAvailability: "",
    classCapacityQuality: "",
    desksChairsAvailability: "",
    desksChairsQuality: "",
    classVentilationAvailability: "",
    classVentilationQuality: "",
    classEmergencyExitsAvailability: "",
    classEmergencyExitsQuality: "",

    // 6.3 Computer Lab
    computersAvailability: "",
    computersQuality: "",
    internetAvailability: "",
    internetQuality: "",
    workstationsAvailability: "",
    workstationsQuality: "",
    studyAreasAvailability: "",
    studyAreasQuality: "",

    // 6.4 Library
    booksAvailability: "",
    booksQuality: "",
    libraryStudyAreaAvailability: "",
    libraryStudyAreaQuality: "",
    bookConditionAvailability: "",
    bookConditionQuality: "",
    libraryComputersAvailability: "",
    libraryComputersQuality: "",

    // 6.5 Kitchen
    healthSafetyAvailability: "",
    healthSafetyQuality: "",
    foodStorageAvailability: "",
    foodStorageQuality: "",
    sanitationAvailability: "",
    sanitationQuality: "",

    // 6.6 Refectory
    tablesSeatingAvailability: "",
    tablesSeatingQuality: "",
    hygieneAvailability: "",
    hygieneQuality: "",
    refectoryVentilationAvailability: "",
    refectoryVentilationQuality: "",
    wasteDisposalAvailability: "",
    wasteDisposalQuality: "",

    // 6.7 Changing rooms
    separateChangingRoomsAvailability: "",
    separateChangingRoomsQuality: "",
    girlsChangingCleanlinessAvailability: "",
    girlsChangingCleanlinessQuality: "",
    boysChangingCleanlinessAvailability: "",
    boysChangingCleanlinessQuality: "",

    // 6.8 Dormitories
    separateDormitoriesAvailability: "",
    separateDormitoriesQuality: "",
    girlsDormCleanlinessAvailability: "",
    girlsDormCleanlinessQuality: "",
    boysDormCleanlinessAvailability: "",
    boysDormCleanlinessQuality: "",

    // 6.9 Washrooms
    separateWashroomsAvailability: "",
    separateWashroomsQuality: "",
    girlsWashroomCleanlinessAvailability: "",
    girlsWashroomCleanlinessQuality: "",
    boysWashroomCleanlinessAvailability: "",
    boysWashroomCleanlinessQuality: "",

    // 6.10 Toilets
    separateToiletsAvailability: "",
    separateToiletsQuality: "",
    girlsToiletCleanlinessAvailability: "",
    girlsToiletCleanlinessQuality: "",
    boysToiletCleanlinessAvailability: "",
    boysToiletCleanlinessQuality: "",

    // 6.11 Playgrounds
    playgroundAvailability: "",
    playgroundQuality: "",
    sportsFacilitiesAvailability: "",
    sportsFacilitiesQuality: "",

    // 6.12 School Garden
    plantsAvailability: "",
    plantsQuality: "",
    educationalGardenAvailability: "",
    educationalGardenQuality: "",

    // 6.13 Workshops
    toolsAvailability: "",
    toolsQuality: "",
    workshopVentilationAvailability: "",
    workshopVentilationQuality: "",
    storeArrangementAvailability: "",
    storeArrangementQuality: "",
    workshopCleanlinessAvailability: "",
    workshopCleanlinessQuality: "",

    // Add observation fields for each item
    officesObservation: "",
    meetingRoomsObservation: "",
    adminEmergencyExitsObservation: "",
    adminVentilationObservation: "",
    classCapacityObservation: "",
    desksChairsObservation: "",
    classVentilationObservation: "",
    classEmergencyExitsObservation: "",
    computersObservation: "",
    internetObservation: "",
    workstationsObservation: "",
    studyAreasObservation: "",
    booksObservation: "",
    libraryStudyAreaObservation: "",
    bookConditionObservation: "",
    libraryComputersObservation: "",
    healthSafetyObservation: "",
    foodStorageObservation: "",
    sanitationObservation: "",
    tablesSeatingObservation: "",
    hygieneObservation: "",
    refectoryVentilationObservation: "",
    wasteDisposalObservation: "",
    separateChangingRoomsObservation: "",
    girlsChangingCleanlinessObservation: "",
    boysChangingCleanlinessObservation: "",
    separateDormitoriesObservation: "",
    girlsDormCleanlinessObservation: "",
    boysDormCleanlinessObservation: "",
    separateWashroomsObservation: "",
    girlsWashroomCleanlinessObservation: "",
    boysWashroomCleanlinessObservation: "",
    separateToiletsObservation: "",
    girlsToiletCleanlinessObservation: "",
    boysToiletCleanlinessObservation: "",
    playgroundObservation: "",
    sportsFacilitiesObservation: "",
    plantsObservation: "",
    educationalGardenObservation: "",
    toolsObservation: "",
    workshopVentilationObservation: "",
    storeArrangementObservation: "",
    workshopCleanlinessObservation: "",

    // Overview
    strength: "",
    weakness: "",
    improvement: "",
    ...formData,
  })

  const initialRender = useRef(true)
  const prevMarks = useRef(0)

  const calculateMarks = () => {
    let total = 0

    // Helper function to calculate marks for an item
    const calculateItemMarks = (baseId, marksAllocated) => {
      const availabilityValue = localData[`${baseId}Availability`]
      const qualityValue = localData[`${baseId}Quality`]

      let marks = 0
      if (availabilityValue === "yes") {
        marks += marksAllocated * 0.4
      }
      if (qualityValue === "yes") {
        marks += marksAllocated * 0.6
      }

      return marks
    }

    // 6.1 Administration Block
    total += calculateItemMarks("offices", 0.5)
    total += calculateItemMarks("meetingRooms", 0.5)
    total += calculateItemMarks("adminEmergencyExits", 0.5)
    total += calculateItemMarks("adminVentilation", 0.5)

    // 6.2 Classroom Block
    total += calculateItemMarks("classCapacity", 0.5)
    total += calculateItemMarks("desksChairs", 0.5)
    total += calculateItemMarks("classVentilation", 0.5)
    total += calculateItemMarks("classEmergencyExits", 0.5)

    // 6.3 Computer Lab
    total += calculateItemMarks("computers", 0.5)
    total += calculateItemMarks("internet", 0.5)
    total += calculateItemMarks("workstations", 0.5)
    total += calculateItemMarks("studyAreas", 0.5)

    // 6.4 Library
    total += calculateItemMarks("books", 0.5)
    total += calculateItemMarks("libraryStudyArea", 0.5)
    total += calculateItemMarks("bookCondition", 0.5)
    total += calculateItemMarks("libraryComputers", 0.5)

    // 6.5 Kitchen
    total += calculateItemMarks("healthSafety", 0.5)
    total += calculateItemMarks("foodStorage", 0.5)
    total += calculateItemMarks("sanitation", 0.5)

    // 6.6 Refectory
    total += calculateItemMarks("tablesSeating", 0.5)
    total += calculateItemMarks("hygiene", 0.5)
    total += calculateItemMarks("refectoryVentilation", 0.5)
    total += calculateItemMarks("wasteDisposal", 0.5)

    // 6.7 Changing rooms (only for day schools)
    if (schoolType === "day") {
      total += calculateItemMarks("separateChangingRooms", 0.5)
      total += calculateItemMarks("girlsChangingCleanliness", 0.5)
      total += calculateItemMarks("boysChangingCleanliness", 0.5)
    }

    // 6.8 Dormitories (only for boarding schools)
    if (schoolType !== "day") {
      total += calculateItemMarks("separateDormitories", 0.5)
      total += calculateItemMarks("girlsDormCleanliness", 0.5)
      total += calculateItemMarks("boysDormCleanliness", 0.5)
    }

    // 6.9 Washrooms
    total += calculateItemMarks("separateWashrooms", 0.5)
    total += calculateItemMarks("girlsWashroomCleanliness", 0.5)
    total += calculateItemMarks("boysWashroomCleanliness", 0.5)

    // 6.10 Toilets
    total += calculateItemMarks("separateToilets", 0.5)
    total += calculateItemMarks("girlsToiletCleanliness", 0.5)
    total += calculateItemMarks("boysToiletCleanliness", 0.5)

    // 6.11 Playgrounds
    total += calculateItemMarks("playground", 0.5)
    total += calculateItemMarks("sportsFacilities", 0.5)

    // 6.12 School Garden
    total += calculateItemMarks("plants", 0.5)
    total += calculateItemMarks("educationalGarden", 0.5)

    // 6.13 Workshops
    total += calculateItemMarks("tools", 0.5)
    total += calculateItemMarks("workshopVentilation", 0.5)
    total += calculateItemMarks("storeArrangement", 0.5)
    total += calculateItemMarks("workshopCleanliness", 0.5)

    // Cap at 20 marks maximum
    return Math.min(total, 20)
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    const currentMarks = calculateMarks()
    if (currentMarks !== prevMarks.current) {
      prevMarks.current = currentMarks
      updateSectionMarks(currentMarks)
    }

    updateFormData(localData)
  }, [localData, updateFormData, updateSectionMarks, schoolType])

  const handleChange = (field: string, value: string) => {
    setLocalData((prev) => {
      if (prev[field] !== value) {
        return { ...prev, [field]: value }
      }
      return prev
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="admin" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-4">
          <TabsTrigger value="admin">6.1-6.2</TabsTrigger>
          <TabsTrigger value="facilities">6.3-6.4</TabsTrigger>
          <TabsTrigger value="dining">6.5-6.6</TabsTrigger>
          {schoolType === "day" ? (
            <TabsTrigger value="changing">6.7 Changing</TabsTrigger>
          ) : (
            <TabsTrigger value="dormitories">6.8 Dormitories</TabsTrigger>
          )}
          <TabsTrigger value="sanitation">6.9-6.10</TabsTrigger>
          <TabsTrigger value="recreation">6.11-6.12</TabsTrigger>

        </TabsList>

        <TabsContent value="admin">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.1 Administration Block</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="offices"
                  label="Offices of all staff"
                  availabilityValue={localData.officesAvailability}
                  qualityValue={localData.officesQuality}
                  onAvailabilityChange={(value) => handleChange("officesAvailability", value)}
                  onQualityChange={(value) => handleChange("officesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.officesObservation}
                  onObservationChange={(value) => handleChange("officesObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="meetingRooms"
                  label="Meeting rooms"
                  availabilityValue={localData.meetingRoomsAvailability}
                  qualityValue={localData.meetingRoomsQuality}
                  onAvailabilityChange={(value) => handleChange("meetingRoomsAvailability", value)}
                  onQualityChange={(value) => handleChange("meetingRoomsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.meetingRoomsObservation}
                  onObservationChange={(value) => handleChange("meetingRoomsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="adminEmergencyExits"
                  label="Emergency exits"
                  availabilityValue={localData.adminEmergencyExitsAvailability}
                  qualityValue={localData.adminEmergencyExitsQuality}
                  onAvailabilityChange={(value) => handleChange("adminEmergencyExitsAvailability", value)}
                  onQualityChange={(value) => handleChange("adminEmergencyExitsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.adminEmergencyExitsObservation}
                  onObservationChange={(value) => handleChange("adminEmergencyExitsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="adminVentilation"
                  label="Ventilation and lighting"
                  availabilityValue={localData.adminVentilationAvailability}
                  qualityValue={localData.adminVentilationQuality}
                  onAvailabilityChange={(value) => handleChange("adminVentilationAvailability", value)}
                  onQualityChange={(value) => handleChange("adminVentilationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.adminVentilationObservation}
                  onObservationChange={(value) => handleChange("adminVentilationObservation", value)}
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.2 Classroom Block</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="classCapacity"
                  label="Capacity to accommodate students comfortably"
                  availabilityValue={localData.classCapacityAvailability}
                  qualityValue={localData.classCapacityQuality}
                  onAvailabilityChange={(value) => handleChange("classCapacityAvailability", value)}
                  onQualityChange={(value) => handleChange("classCapacityQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.classCapacityObservation}
                  onObservationChange={(value) => handleChange("classCapacityObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="desksChairs"
                  label="Desks and chairs"
                  availabilityValue={localData.desksChairsAvailability}
                  qualityValue={localData.desksChairsQuality}
                  onAvailabilityChange={(value) => handleChange("desksChairsAvailability", value)}
                  onQualityChange={(value) => handleChange("desksChairsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.desksChairsObservation}
                  onObservationChange={(value) => handleChange("desksChairsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="classVentilation"
                  label="Ventilation and lighting"
                  availabilityValue={localData.classVentilationAvailability}
                  qualityValue={localData.classVentilationQuality}
                  onAvailabilityChange={(value) => handleChange("classVentilationAvailability", value)}
                  onQualityChange={(value) => handleChange("classVentilationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.classVentilationObservation}
                  onObservationChange={(value) => handleChange("classVentilationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="classEmergencyExits"
                  label="Emergency exits"
                  availabilityValue={localData.classEmergencyExitsAvailability}
                  qualityValue={localData.classEmergencyExitsQuality}
                  onAvailabilityChange={(value) => handleChange("classEmergencyExitsAvailability", value)}
                  onQualityChange={(value) => handleChange("classEmergencyExitsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.classEmergencyExitsObservation}
                  onObservationChange={(value) => handleChange("classEmergencyExitsObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.3 Computer Lab</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="computers"
                  label="Functional computers related to the number of students"
                  availabilityValue={localData.computersAvailability}
                  qualityValue={localData.computersQuality}
                  onAvailabilityChange={(value) => handleChange("computersAvailability", value)}
                  onQualityChange={(value) => handleChange("computersQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.computersObservation}
                  onObservationChange={(value) => handleChange("computersObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="internet"
                  label="Internet access"
                  availabilityValue={localData.internetAvailability}
                  qualityValue={localData.internetQuality}
                  onAvailabilityChange={(value) => handleChange("internetAvailability", value)}
                  onQualityChange={(value) => handleChange("internetQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.internetObservation}
                  onObservationChange={(value) => handleChange("internetObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="workstations"
                  label="Setup of workstations"
                  availabilityValue={localData.workstationsAvailability}
                  qualityValue={localData.workstationsQuality}
                  onAvailabilityChange={(value) => handleChange("workstationsAvailability", value)}
                  onQualityChange={(value) => handleChange("workstationsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.workstationsObservation}
                  onObservationChange={(value) => handleChange("workstationsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="studyAreas"
                  label="Accessibility and quiet study areas"
                  availabilityValue={localData.studyAreasAvailability}
                  qualityValue={localData.studyAreasQuality}
                  onAvailabilityChange={(value) => handleChange("studyAreasAvailability", value)}
                  onQualityChange={(value) => handleChange("studyAreasQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.studyAreasObservation}
                  onObservationChange={(value) => handleChange("studyAreasObservation", value)}
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.4 Library</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="books"
                  label="Books and other resources"
                  availabilityValue={localData.booksAvailability}
                  qualityValue={localData.booksQuality}
                  onAvailabilityChange={(value) => handleChange("booksAvailability", value)}
                  onQualityChange={(value) => handleChange("booksQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.booksObservation}
                  onObservationChange={(value) => handleChange("booksObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="libraryStudyArea"
                  label="Study area"
                  availabilityValue={localData.libraryStudyAreaAvailability}
                  qualityValue={localData.libraryStudyAreaQuality}
                  onAvailabilityChange={(value) => handleChange("libraryStudyAreaAvailability", value)}
                  onQualityChange={(value) => handleChange("libraryStudyAreaQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.libraryStudyAreaObservation}
                  onObservationChange={(value) => handleChange("libraryStudyAreaObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="bookCondition"
                  label="Condition of books and resources"
                  availabilityValue={localData.bookConditionAvailability}
                  qualityValue={localData.bookConditionQuality}
                  onAvailabilityChange={(value) => handleChange("bookConditionAvailability", value)}
                  onQualityChange={(value) => handleChange("bookConditionQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.bookConditionObservation}
                  onObservationChange={(value) => handleChange("bookConditionObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="libraryComputers"
                  label="Computers"
                  availabilityValue={localData.libraryComputersAvailability}
                  qualityValue={localData.libraryComputersQuality}
                  onAvailabilityChange={(value) => handleChange("libraryComputersAvailability", value)}
                  onQualityChange={(value) => handleChange("libraryComputersQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.libraryComputersObservation}
                  onObservationChange={(value) => handleChange("libraryComputersObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dining">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.5 Kitchen</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="healthSafety"
                  label="Compliance with health and safety regulations"
                  availabilityValue={localData.healthSafetyAvailability}
                  qualityValue={localData.healthSafetyQuality}
                  onAvailabilityChange={(value) => handleChange("healthSafetyAvailability", value)}
                  onQualityChange={(value) => handleChange("healthSafetyQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.healthSafetyObservation}
                  onObservationChange={(value) => handleChange("healthSafetyObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="foodStorage"
                  label="Cleanliness and organization of food storage"
                  availabilityValue={localData.foodStorageAvailability}
                  qualityValue={localData.foodStorageQuality}
                  onAvailabilityChange={(value) => handleChange("foodStorageAvailability", value)}
                  onQualityChange={(value) => handleChange("foodStorageQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.foodStorageObservation}
                  onObservationChange={(value) => handleChange("foodStorageObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sanitation"
                  label="Proper sanitation facilities for food preparation"
                  availabilityValue={localData.sanitationAvailability}
                  qualityValue={localData.sanitationQuality}
                  onAvailabilityChange={(value) => handleChange("sanitationAvailability", value)}
                  onQualityChange={(value) => handleChange("sanitationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.sanitationObservation}
                  onObservationChange={(value) => handleChange("sanitationObservation", value)}
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.6 Refectory</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="tablesSeating"
                  label="Condition of tables and seating arrangements"
                  availabilityValue={localData.tablesSeatingAvailability}
                  qualityValue={localData.tablesSeatingQuality}
                  onAvailabilityChange={(value) => handleChange("tablesSeatingAvailability", value)}
                  onQualityChange={(value) => handleChange("tablesSeatingQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.tablesSeatingObservation}
                  onObservationChange={(value) => handleChange("tablesSeatingObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="hygiene"
                  label="Cleanliness and hygiene practices"
                  availabilityValue={localData.hygieneAvailability}
                  qualityValue={localData.hygieneQuality}
                  onAvailabilityChange={(value) => handleChange("hygieneAvailability", value)}
                  onQualityChange={(value) => handleChange("hygieneQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.hygieneObservation}
                  onObservationChange={(value) => handleChange("hygieneObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="refectoryVentilation"
                  label="Ventilation"
                  availabilityValue={localData.refectoryVentilationAvailability}
                  qualityValue={localData.refectoryVentilationQuality}
                  onAvailabilityChange={(value) => handleChange("refectoryVentilationAvailability", value)}
                  onQualityChange={(value) => handleChange("refectoryVentilationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.refectoryVentilationObservation}
                  onObservationChange={(value) => handleChange("refectoryVentilationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="wasteDisposal"
                  label="Waste disposal systems"
                  availabilityValue={localData.wasteDisposalAvailability}
                  qualityValue={localData.wasteDisposalQuality}
                  onAvailabilityChange={(value) => handleChange("wasteDisposalAvailability", value)}
                  onQualityChange={(value) => handleChange("wasteDisposalQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.wasteDisposalObservation}
                  onObservationChange={(value) => handleChange("wasteDisposalObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              {schoolType === "day" && (
                <>
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">6.7 Changing rooms (for day school only)</h3>
                  <div className="space-y-4">
                    <EvaluationItemWithWeights
                      id="separateChangingRooms"
                      label="Separate changing rooms for girls and boys"
                      availabilityValue={localData.separateChangingRoomsAvailability}
                      qualityValue={localData.separateChangingRoomsQuality}
                      onAvailabilityChange={(value) => handleChange("separateChangingRoomsAvailability", value)}
                      onQualityChange={(value) => handleChange("separateChangingRoomsQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.separateChangingRoomsObservation}
                      onObservationChange={(value) => handleChange("separateChangingRoomsObservation", value)}
                    />

                    <EvaluationItemWithWeights
                      id="girlsChangingCleanliness"
                      label="Cleanliness of girls' changing room"
                      availabilityValue={localData.girlsChangingCleanlinessAvailability}
                      qualityValue={localData.girlsChangingCleanlinessQuality}
                      onAvailabilityChange={(value) => handleChange("girlsChangingCleanlinessAvailability", value)}
                      onQualityChange={(value) => handleChange("girlsChangingCleanlinessQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.girlsChangingCleanlinessObservation}
                      onObservationChange={(value) => handleChange("girlsChangingCleanlinessObservation", value)}
                    />

                    <EvaluationItemWithWeights
                      id="boysChangingCleanliness"
                      label="Cleanliness of boys' changing room"
                      availabilityValue={localData.boysChangingCleanlinessAvailability}
                      qualityValue={localData.boysChangingCleanlinessQuality}
                      onAvailabilityChange={(value) => handleChange("boysChangingCleanlinessAvailability", value)}
                      onQualityChange={(value) => handleChange("boysChangingCleanlinessQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.boysChangingCleanlinessObservation}
                      onObservationChange={(value) => handleChange("boysChangingCleanlinessObservation", value)}
                    />
                  </div>
                </>
              )}

              {schoolType !== "day" && (
                <>
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">6.8 Dormitories</h3>
                  <div className="space-y-4">
                    <EvaluationItemWithWeights
                      id="separateDormitories"
                      label="Separate dormitories for girls and boys"
                      availabilityValue={localData.separateDormitoriesAvailability}
                      qualityValue={localData.separateDormitoriesQuality}
                      onAvailabilityChange={(value) => handleChange("separateDormitoriesAvailability", value)}
                      onQualityChange={(value) => handleChange("separateDormitoriesQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.separateDormitoriesObservation}
                      onObservationChange={(value) => handleChange("separateDormitoriesObservation", value)}
                    />

                    <EvaluationItemWithWeights
                      id="girlsDormCleanliness"
                      label="Cleanliness of girls' dormitories"
                      availabilityValue={localData.girlsDormCleanlinessAvailability}
                      qualityValue={localData.girlsDormCleanlinessQuality}
                      onAvailabilityChange={(value) => handleChange("girlsDormCleanlinessAvailability", value)}
                      onQualityChange={(value) => handleChange("girlsDormCleanlinessQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.girlsDormCleanlinessObservation}
                      onObservationChange={(value) => handleChange("girlsDormCleanlinessObservation", value)}
                    />

                    <EvaluationItemWithWeights
                      id="boysDormCleanliness"
                      label="Cleanliness of boys' dormitories"
                      availabilityValue={localData.boysDormCleanlinessAvailability}
                      qualityValue={localData.boysDormCleanlinessQuality}
                      onAvailabilityChange={(value) => handleChange("boysDormCleanlinessAvailability", value)}
                      onQualityChange={(value) => handleChange("boysDormCleanlinessQuality", value)}
                      marksAllocated={0.5}
                      qualityWeight="60%"
                      availabilityWeight="40%"
                      observation={localData.boysDormCleanlinessObservation}
                      onObservationChange={(value) => handleChange("boysDormCleanlinessObservation", value)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changing">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.7 Changing rooms (for day school only)</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="separateChangingRooms"
                  label="Separate changing rooms for girls and boys"
                  availabilityValue={localData.separateChangingRoomsAvailability}
                  qualityValue={localData.separateChangingRoomsQuality}
                  onAvailabilityChange={(value) => handleChange("separateChangingRoomsAvailability", value)}
                  onQualityChange={(value) => handleChange("separateChangingRoomsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.separateChangingRoomsObservation}
                  onObservationChange={(value) => handleChange("separateChangingRoomsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="girlsChangingCleanliness"
                  label="Cleanliness of girls' changing room"
                  availabilityValue={localData.girlsChangingCleanlinessAvailability}
                  qualityValue={localData.girlsChangingCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("girlsChangingCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("girlsChangingCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.girlsChangingCleanlinessObservation}
                  onObservationChange={(value) => handleChange("girlsChangingCleanlinessObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="boysChangingCleanliness"
                  label="Cleanliness of boys' changing room"
                  availabilityValue={localData.boysChangingCleanlinessAvailability}
                  qualityValue={localData.boysChangingCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("boysChangingCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("boysChangingCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.boysChangingCleanlinessObservation}
                  onObservationChange={(value) => handleChange("boysChangingCleanlinessObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormitories">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.8 Dormitories</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="separateDormitories"
                  label="Separate dormitories for girls and boys"
                  availabilityValue={localData.separateDormitoriesAvailability}
                  qualityValue={localData.separateDormitoriesQuality}
                  onAvailabilityChange={(value) => handleChange("separateDormitoriesAvailability", value)}
                  onQualityChange={(value) => handleChange("separateDormitoriesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.separateDormitoriesObservation}
                  onObservationChange={(value) => handleChange("separateDormitoriesObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="girlsDormCleanliness"
                  label="Cleanliness of girls' dormitories"
                  availabilityValue={localData.girlsDormCleanlinessAvailability}
                  qualityValue={localData.girlsDormCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("girlsDormCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("girlsDormCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.girlsDormCleanlinessObservation}
                  onObservationChange={(value) => handleChange("girlsDormCleanlinessObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="boysDormCleanliness"
                  label="Cleanliness of boys' dormitories"
                  availabilityValue={localData.boysDormCleanlinessAvailability}
                  qualityValue={localData.boysDormCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("boysDormCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("boysDormCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.boysDormCleanlinessObservation}
                  onObservationChange={(value) => handleChange("boysDormCleanlinessObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sanitation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.9 Washrooms</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="separateWashrooms"
                  label="Separate washrooms for girls and boys"
                  availabilityValue={localData.separateWashroomsAvailability}
                  qualityValue={localData.separateWashroomsQuality}
                  onAvailabilityChange={(value) => handleChange("separateWashroomsAvailability", value)}
                  onQualityChange={(value) => handleChange("separateWashroomsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.separateWashroomsObservation}
                  onObservationChange={(value) => handleChange("separateWashroomsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="girlsWashroomCleanliness"
                  label="Cleanliness of girls' washrooms"
                  availabilityValue={localData.girlsWashroomCleanlinessAvailability}
                  qualityValue={localData.girlsWashroomCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("girlsWashroomCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("girlsWashroomCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.girlsWashroomCleanlinessObservation}
                  onObservationChange={(value) => handleChange("girlsWashroomCleanlinessObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="boysWashroomCleanliness"
                  label="Cleanliness of boys' washrooms"
                  availabilityValue={localData.boysWashroomCleanlinessAvailability}
                  qualityValue={localData.boysWashroomCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("boysWashroomCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("boysWashroomCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.boysWashroomCleanlinessObservation}
                  onObservationChange={(value) => handleChange("boysWashroomCleanlinessObservation", value)}
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.10 Toilets</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="separateToilets"
                  label="Separate toilets for girls and boys"
                  availabilityValue={localData.separateToiletsAvailability}
                  qualityValue={localData.separateToiletsQuality}
                  onAvailabilityChange={(value) => handleChange("separateToiletsAvailability", value)}
                  onQualityChange={(value) => handleChange("separateToiletsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.separateToiletsObservation}
                  onObservationChange={(value) => handleChange("separateToiletsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="girlsToiletCleanliness"
                  label="Cleanliness of girls' toilets"
                  availabilityValue={localData.girlsToiletCleanlinessAvailability}
                  qualityValue={localData.girlsToiletCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("girlsToiletCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("girlsToiletCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.girlsToiletCleanlinessObservation}
                  onObservationChange={(value) => handleChange("girlsToiletCleanlinessObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="boysToiletCleanliness"
                  label="Cleanliness of boys' toilets"
                  availabilityValue={localData.boysToiletCleanlinessAvailability}
                  qualityValue={localData.boysToiletCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("boysToiletCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("boysToiletCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.boysToiletCleanlinessObservation}
                  onObservationChange={(value) => handleChange("boysToiletCleanlinessObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recreation">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.11 Playgrounds and other sports facilities</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="playground"
                  label="At least one playground among football, volleyball and basketball"
                  availabilityValue={localData.playgroundAvailability}
                  qualityValue={localData.playgroundQuality}
                  onAvailabilityChange={(value) => handleChange("playgroundAvailability", value)}
                  onQualityChange={(value) => handleChange("playgroundQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.playgroundObservation}
                  onObservationChange={(value) => handleChange("playgroundObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="sportsFacilities"
                  label="Sports facilities (balls and kits)"
                  availabilityValue={localData.sportsFacilitiesAvailability}
                  qualityValue={localData.sportsFacilitiesQuality}
                  onAvailabilityChange={(value) => handleChange("sportsFacilitiesAvailability", value)}
                  onQualityChange={(value) => handleChange("sportsFacilitiesQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.sportsFacilitiesObservation}
                  onObservationChange={(value) => handleChange("sportsFacilitiesObservation", value)}
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mb-4 mt-8">6.12 School Garden</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="plants"
                  label="Health and safety of plants (non-toxic)"
                  availabilityValue={localData.plantsAvailability}
                  qualityValue={localData.plantsQuality}
                  onAvailabilityChange={(value) => handleChange("plantsAvailability", value)}
                  onQualityChange={(value) => handleChange("plantsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.plantsObservation}
                  onObservationChange={(value) => handleChange("plantsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="educationalGarden"
                  label="Educational garden"
                  availabilityValue={localData.educationalGardenAvailability}
                  qualityValue={localData.educationalGardenQuality}
                  onAvailabilityChange={(value) => handleChange("educationalGardenAvailability", value)}
                  onQualityChange={(value) => handleChange("educationalGardenQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.educationalGardenObservation}
                  onObservationChange={(value) => handleChange("educationalGardenObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshop">
          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">6.13 Workshops</h3>
              <div className="space-y-4">
                <EvaluationItemWithWeights
                  id="tools"
                  label="Condition of tools and machinery"
                  availabilityValue={localData.toolsAvailability}
                  qualityValue={localData.toolsQuality}
                  onAvailabilityChange={(value) => handleChange("toolsAvailability", value)}
                  onQualityChange={(value) => handleChange("toolsQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.toolsObservation}
                  onObservationChange={(value) => handleChange("toolsObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="workshopVentilation"
                  label="Proper ventilation and safety measures"
                  availabilityValue={localData.workshopVentilationAvailability}
                  qualityValue={localData.workshopVentilationQuality}
                  onAvailabilityChange={(value) => handleChange("workshopVentilationAvailability", value)}
                  onQualityChange={(value) => handleChange("workshopVentilationQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.workshopVentilationObservation}
                  onObservationChange={(value) => handleChange("workshopVentilationObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="storeArrangement"
                  label="Store arrangement"
                  availabilityValue={localData.storeArrangementAvailability}
                  qualityValue={localData.storeArrangementQuality}
                  onAvailabilityChange={(value) => handleChange("storeArrangementAvailability", value)}
                  onQualityChange={(value) => handleChange("storeArrangementQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.storeArrangementObservation}
                  onObservationChange={(value) => handleChange("storeArrangementObservation", value)}
                />

                <EvaluationItemWithWeights
                  id="workshopCleanliness"
                  label="Cleanliness"
                  availabilityValue={localData.workshopCleanlinessAvailability}
                  qualityValue={localData.workshopCleanlinessQuality}
                  onAvailabilityChange={(value) => handleChange("workshopCleanlinessAvailability", value)}
                  onQualityChange={(value) => handleChange("workshopCleanlinessQuality", value)}
                  marksAllocated={0.5}
                  qualityWeight="60%"
                  availabilityWeight="40%"
                  observation={localData.workshopCleanlinessObservation}
                  onObservationChange={(value) => handleChange("workshopCleanlinessObservation", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rest of the component remains the same */}
      </Tabs>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Overview of the findings (kindly be brief and specific)
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="strength" className="text-sm font-medium">
                Strength:
              </Label>
              <Textarea
                id="strength"
                value={localData.strength}
                onChange={(e) => handleChange("strength", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="weakness" className="text-sm font-medium">
                Weakness:
              </Label>
              <Textarea
                id="weakness"
                value={localData.weakness}
                onChange={(e) => handleChange("weakness", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="improvement" className="text-sm font-medium">
                Area of improvement:
              </Label>
              <Textarea
                id="improvement"
                value={localData.improvement}
                onChange={(e) => handleChange("improvement", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-800">Total marks for Infrastructure and Environment:</span>
          <span className="text-xl font-bold text-blue-800">{calculateMarks().toFixed(1)} / 20</span>
        </div>
      </div>
    </div>
  )
}

interface EvaluationItemWithWeightsProps {
  id: string
  label: string
  availabilityValue: string
  qualityValue: string
  onAvailabilityChange: (value: string) => void
  onQualityChange: (value: string) => void
  marksAllocated: number
  qualityWeight: string
  availabilityWeight: string
  observation?: string
  onObservationChange?: (value: string) => void
}

function EvaluationItemWithWeights({
  id,
  label,
  availabilityValue,
  qualityValue,
  onAvailabilityChange,
  onQualityChange,
  marksAllocated,
  qualityWeight,
  availabilityWeight,
  observation = "",
  onObservationChange = () => {},
}: EvaluationItemWithWeightsProps) {
  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    let marks = 0
    if (availabilityValue === "yes") {
      marks += marksAllocated * 0.4
    }
    if (qualityValue === "yes") {
      marks += marksAllocated * 0.6
    }

    return marks
  }

  return (
    <div className="grid grid-cols-1 gap-2 p-2 rounded-md hover:bg-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 items-start">
        <div className="text-sm font-medium">{label}</div>

        <div className="flex flex-col">
          <div className="text-center text-xs text-gray-500 mb-1">
            <div>Availability ({availabilityWeight})</div>
          </div>
          <RadioGroup
            value={availabilityValue}
            onValueChange={onAvailabilityChange}
            className="flex justify-center space-x-4"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="yes" id={`${id}-availability-yes`} />
              <Label htmlFor={`${id}-availability-yes`} className="text-sm">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="no" id={`${id}-availability-no`} />
              <Label htmlFor={`${id}-availability-no`} className="text-sm">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col">
          <div className="text-center text-xs text-gray-500 mb-1">
            <div>Quality ({qualityWeight})</div>
          </div>
          <RadioGroup value={qualityValue} onValueChange={onQualityChange} className="flex justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="yes" id={`${id}-quality-yes`} />
              <Label htmlFor={`${id}-quality-yes`} className="text-sm">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="no" id={`${id}-quality-no`} />
              <Label htmlFor={`${id}-quality-no`} className="text-sm">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="text-center text-sm font-medium">{marksAllocated}</div>

        <div className="text-center text-sm font-medium">{calculateMarksObtained().toFixed(1)}</div>

        <div>
          <Textarea
            value={observation}
            onChange={(e) => onObservationChange(e.target.value)}
            placeholder="Add observation..."
            className="min-h-[60px] text-sm"
          />
        </div>
      </div>
    </div>
  )
}