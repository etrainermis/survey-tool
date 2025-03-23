"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EvaluationItem } from "./evaluation/EvaluationItem"
import type { HygieneAndSafetyData } from "./evaluation/EvaluationType"
import { Textarea } from "@/components/ui/textarea"

interface HeadteacherHygieneAndSafetyProps {
  data: any
  onDataChange: (data: any) => void
}

export default function HeadteacherHygieneAndSafety({ data, onDataChange }: HeadteacherHygieneAndSafetyProps) {
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

  // Add a type guard function at the top of your component (after the useState declaration)
  const ensureFieldExists = (
    data: HygieneAndSafetyData,
    section: keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">,
    field: string
  ) => {
    // Check if the section exists
    if (!data[section]) {
      data[section] = {} as any;
    }
    
    // Check if the field exists in the section
    if (!data[section][field]) {
      data[section][field] = { availability: 0, quality: 0, observation: "" };
    }
    
    return data;
  };

  // Initialize data from parent component
  useEffect(() => {
    if (data?.hygieneAndSafety) {
      // Create a deep copy of the initial state
      const initialState = JSON.parse(JSON.stringify(hygieneAndSafetyData));
      
      // Merge with incoming data
      const mergedData = {
        ...initialState,
        ...data.hygieneAndSafety
      };
      
      // Ensure all required fields exist
      const sections: (keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">)[] = [
        'administrationBlock', 'classroomBlock', 'computerLab', 'library', 
        'kitchen', 'refectory', 'dormitories', 'washrooms', 
        'playgrounds', 'schoolGarden', 'workshops'
      ];
      
      // For each section, ensure all fields exist
      sections.forEach(section => {
        if (section === 'administrationBlock') {
          ['staffOffices', 'meetingRooms', 'accessibility', 'emergencyExits', 'ventilationLighting'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'classroomBlock') {
          ['capacity', 'desksChairs', 'ventilationLighting', 'emergencyExits'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'computerLab') {
          ['functionalComputers', 'internetAccess', 'workstationSetup', 'accessibility'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'library') {
          ['booksResources', 'studyArea', 'conditionOfBooks', 'computers'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'kitchen') {
          ['healthSafetyCompliance', 'foodStorage', 'sanitationFacilities'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'refectory') {
          ['tablesSeating', 'cleanlinessHygiene', 'ventilation', 'wasteDisposal'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'dormitories') {
          ['spacePrivacy', 'cleanlinessArrangement', 'fireSafety'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'washrooms') {
          ['cleanlinessSupplies', 'privacySafety', 'accessibility'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'playgrounds') {
          ['safetyOfEquipment', 'shadedAreas'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'schoolGarden') {
          ['healthSafetyOfPlants', 'accessibility', 'educationalUse'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        } else if (section === 'workshops') {
          ['toolsMachinery', 'ventilationSafety', 'storeArrangement', 'cleanliness'].forEach(field => {
            mergedData[section][field] = mergedData[section][field] || { availability: 0, quality: 0, observation: "" };
          });
        }
      });
      
      // Ensure overview exists
      mergedData.overview = mergedData.overview || { strengths: "", weaknesses: "", areasOfImprovement: "" };
      
      setHygieneAndSafetyData(mergedData);
    }
  }, [data]);

  // Calculate total marks
  const calculateTotalMarks = () => {
    let totalMarks = 0

    // Administration Block
    const adminItems = [
      { field: hygieneAndSafetyData.administrationBlock.staffOffices, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.administrationBlock.meetingRooms, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.administrationBlock.accessibility, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.administrationBlock.emergencyExits, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.administrationBlock.ventilationLighting, isQualityNA: false, isAvailabilityNA: true },
    ]

    // Classroom Block
    const classroomItems = [
      { field: hygieneAndSafetyData.classroomBlock.capacity, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.classroomBlock.desksChairs, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.classroomBlock.ventilationLighting, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.classroomBlock.emergencyExits, isQualityNA: false, isAvailabilityNA: true },
    ]

    // Computer Lab
    const computerLabItems = [
      { field: hygieneAndSafetyData.computerLab.functionalComputers, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.computerLab.internetAccess, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.computerLab.workstationSetup, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.computerLab.accessibility, isQualityNA: false, isAvailabilityNA: true },
    ]

    // Library
    const libraryItems = [
      { field: hygieneAndSafetyData.library.booksResources, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.library.studyArea, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.library.conditionOfBooks, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.library.computers, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Kitchen
    const kitchenItems = [
      { field: hygieneAndSafetyData.kitchen.healthSafetyCompliance, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.kitchen.foodStorage, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.kitchen.sanitationFacilities, isQualityNA: false, isAvailabilityNA: true },
    ]

    // Refectory
    const refectoryItems = [
      { field: hygieneAndSafetyData.refectory.tablesSeating, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.refectory.cleanlinessHygiene, isQualityNA: false, isAvailabilityNA: true },
      { field: hygieneAndSafetyData.refectory.ventilation, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.refectory.wasteDisposal, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Dormitories
    const dormitoriesItems = [
      { field: hygieneAndSafetyData.dormitories.spacePrivacy, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.dormitories.cleanlinessArrangement, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.dormitories.fireSafety, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Washrooms
    const washroomsItems = [
      { field: hygieneAndSafetyData.washrooms.cleanlinessSupplies, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.washrooms.privacySafety, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.washrooms.accessibility, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Playgrounds
    const playgroundsItems = [
      { field: hygieneAndSafetyData.playgrounds.safetyOfEquipment, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.playgrounds.shadedAreas, isQualityNA: true, isAvailabilityNA: false },
    ]

    // School Garden
    const schoolGardenItems = [
      { field: hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.schoolGarden.accessibility, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.schoolGarden.educationalUse, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Workshops
    const workshopsItems = [
      { field: hygieneAndSafetyData.workshops.toolsMachinery, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.workshops.ventilationSafety, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.workshops.storeArrangement, isQualityNA: true, isAvailabilityNA: false },
      { field: hygieneAndSafetyData.workshops.cleanliness, isQualityNA: true, isAvailabilityNA: false },
    ]

    // Combine all items
    const allItems = [
      ...adminItems,
      ...classroomItems,
      ...computerLabItems,
      ...libraryItems,
      ...kitchenItems,
      ...refectoryItems,
      ...dormitoriesItems,
      ...washroomsItems,
      ...playgroundsItems,
      ...schoolGardenItems,
      ...workshopsItems,
    ]

    // Calculate marks for each item
    allItems.forEach(item => {
      const { field, isQualityNA, isAvailabilityNA } = item
      const marksAllocated = 0.5 // Each item is worth 0.5 marks

      if (isQualityNA) {
        // If quality is N/A, only consider availability (100% of marks)
        totalMarks += field.availability === 1 ? marksAllocated : 0
      } else if (isAvailabilityNA) {
        // If availability is N/A, only consider quality (100% of marks)
        totalMarks += field.quality === 1 ? marksAllocated : 0
      } else {
        // Calculate total marks based on availability and quality
        const availabilityMarks = field.availability === 1 ? marksAllocated * 0.4 : 0
        const qualityMarks = field.quality === 1 ? marksAllocated * 0.6 : 0
        totalMarks += availabilityMarks + qualityMarks
      }
    })

    return totalMarks
  }

  // Update total marks when data changes
  useEffect(() => {
    const newTotalMarks = calculateTotalMarks()
    
    // Only update if the total marks have changed
    if (newTotalMarks !== hygieneAndSafetyData.totalMarks) {
      setHygieneAndSafetyData(prev => ({
        ...prev,
        totalMarks: newTotalMarks
      }))
    }
  }, [
    hygieneAndSafetyData.administrationBlock,
    hygieneAndSafetyData.classroomBlock,
    hygieneAndSafetyData.computerLab,
    hygieneAndSafetyData.library,
    hygieneAndSafetyData.kitchen,
    hygieneAndSafetyData.refectory,
    hygieneAndSafetyData.dormitories,
    hygieneAndSafetyData.washrooms,
    hygieneAndSafetyData.playgrounds,
    hygieneAndSafetyData.schoolGarden,
    hygieneAndSafetyData.workshops
  ])

  // Update parent component when total marks change
  useEffect(() => {
    onDataChange({
      hygieneAndSafety: hygieneAndSafetyData
    })
  }, [hygieneAndSafetyData, onDataChange])

  // Modify your handleEvaluationChange function to use the type guard
  const handleEvaluationChange = (
    section: keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">,
    field: string,
    type: 'availability' | 'quality',
    value: number,
  ) => {
    setHygieneAndSafetyData((prev) => {
      // First ensure the field exists
      const updatedData = ensureFieldExists({...prev}, section, field);
      
      // Then update the value
      updatedData[section][field][type] = value;
      
      return updatedData;
    });
  };

  // Modify your handleObservationChange function to use the type guard
  const handleObservationChange = (
    section: keyof Omit<HygieneAndSafetyData, "overview" | "totalMarks">,
    field: string,
    value: string,
  ) => {
    setHygieneAndSafetyData((prev) => {
      // First ensure the field exists
      const updatedData = ensureFieldExists({...prev}, section, field);
      
      // Then update the value
      updatedData[section][field].observation = value;
      
      return updatedData;
    });
  };

  // Handle field changes
  const handleFieldChange = (
    section: keyof HygieneAndSafetyData,
    field: string,
    subField: 'availability' | 'quality' | 'observation',
    value: number | string
  ) => {
    if (subField === 'observation') {
      handleObservationChange(section, field, value as string);
    } else {
      handleEvaluationChange(section, field, subField as 'availability' | 'quality', value as number);
    }
  }

  // Handle overview changes
  const handleOverviewChange = (field: keyof typeof hygieneAndSafetyData.overview, value: string) => {
    setHygieneAndSafetyData(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: value
      }
    }))
  }

  return (
    <Card className="border-blue-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-700">6. Hygiene and Safety (20 Marks)</h2>
          <div className="text-right">
            <p className="text-sm text-blue-600">Total Score</p>
            <p className="text-xl font-bold text-blue-800">{hygieneAndSafetyData.totalMarks.toFixed(1)} / 20</p>
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 bg-blue-50 p-2 rounded-md mb-2">
          <div className="font-semibold text-blue-700">Evaluation area/Achievement indicators</div>
          <div className="text-center font-semibold text-blue-700">Availability (Weight: 40%)</div>
          <div className="text-center font-semibold text-blue-700">Quality (Weight: 60%)</div>
          <div className="text-center font-semibold text-blue-700">Marks allocated</div>
          <div className="text-center font-semibold text-blue-700">Total marks</div>
          <div className="text-center font-semibold text-blue-700">Observation</div>
        </div>

        {/* 6.1 Administration Block */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.1 Administration Block</h3>
          
          <EvaluationItem
            id="staffOffices"
            label="Offices of all staff"
            availabilityValue={hygieneAndSafetyData.administrationBlock.staffOffices.availability}
            qualityValue={hygieneAndSafetyData.administrationBlock.staffOffices.quality}
            onAvailabilityChange={(value) => handleFieldChange('administrationBlock', 'staffOffices', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('administrationBlock', 'staffOffices', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.administrationBlock.staffOffices.observation}
            onObservationChange={(value) => handleFieldChange('administrationBlock', 'staffOffices', 'observation', value)}
          />

          <EvaluationItem
            id="meetingRooms"
            label="Meeting rooms"
            availabilityValue={hygieneAndSafetyData.administrationBlock.meetingRooms.availability}
            qualityValue={hygieneAndSafetyData.administrationBlock.meetingRooms.quality}
            onAvailabilityChange={(value) => handleFieldChange('administrationBlock', 'meetingRooms', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('administrationBlock', 'meetingRooms', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.administrationBlock.meetingRooms.observation}
            onObservationChange={(value) => handleFieldChange('administrationBlock', 'meetingRooms', 'observation', value)}
          />

          <EvaluationItem
            id="accessibility"
            label="Accessibility and Condition of offices for staff and visitors"
            availabilityValue={hygieneAndSafetyData.administrationBlock.accessibility.availability}
            qualityValue={hygieneAndSafetyData.administrationBlock.accessibility.quality}
            onAvailabilityChange={(value) => handleFieldChange('administrationBlock', 'accessibility', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('administrationBlock', 'accessibility', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.administrationBlock.accessibility.observation}
            onObservationChange={(value) => handleFieldChange('administrationBlock', 'accessibility', 'observation', value)}
          />

          <EvaluationItem
            id="emergencyExits"
            label="Emergency exits"
            availabilityValue={hygieneAndSafetyData.administrationBlock.emergencyExits.availability}
            qualityValue={hygieneAndSafetyData.administrationBlock.emergencyExits.quality}
            onAvailabilityChange={(value) => handleFieldChange('administrationBlock', 'emergencyExits', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('administrationBlock', 'emergencyExits', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.administrationBlock.emergencyExits.observation}
            onObservationChange={(value) => handleFieldChange('administrationBlock', 'emergencyExits', 'observation', value)}
          />

          <EvaluationItem
            id="ventilationLighting"
            label="Ventilation and lighting"
            availabilityValue={hygieneAndSafetyData.administrationBlock.ventilationLighting.availability}
            qualityValue={hygieneAndSafetyData.administrationBlock.ventilationLighting.quality}
            onAvailabilityChange={(value) => handleFieldChange('administrationBlock', 'ventilationLighting', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('administrationBlock', 'ventilationLighting', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.administrationBlock.ventilationLighting.observation}
            onObservationChange={(value) => handleFieldChange('administrationBlock', 'ventilationLighting', 'observation', value)}
          />
        </div>

        {/* 6.2 Classroom Block */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.2 Classroom Block</h3>
          
          <EvaluationItem
            id="capacity"
            label="Capacity to accommodate students comfortably"
            availabilityValue={hygieneAndSafetyData.classroomBlock.capacity.availability}
            qualityValue={hygieneAndSafetyData.classroomBlock.capacity.quality}
            onAvailabilityChange={(value) => handleFieldChange('classroomBlock', 'capacity', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('classroomBlock', 'capacity', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.classroomBlock.capacity.observation}
            onObservationChange={(value) => handleFieldChange('classroomBlock', 'capacity', 'observation', value)}
          />

          <EvaluationItem
            id="desksChairs"
            label="Desks and chairs"
            availabilityValue={hygieneAndSafetyData.classroomBlock.desksChairs.availability}
            qualityValue={hygieneAndSafetyData.classroomBlock.desksChairs.quality}
            onAvailabilityChange={(value) => handleFieldChange('classroomBlock', 'desksChairs', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('classroomBlock', 'desksChairs', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.classroomBlock.desksChairs.observation}
            onObservationChange={(value) => handleFieldChange('classroomBlock', 'desksChairs', 'observation', value)}
          />

          <EvaluationItem
            id="ventilationLightingClassroom"
            label="Ventilation and lighting"
            availabilityValue={hygieneAndSafetyData.classroomBlock.ventilationLighting.availability}
            qualityValue={hygieneAndSafetyData.classroomBlock.ventilationLighting.quality}
            onAvailabilityChange={(value) => handleFieldChange('classroomBlock', 'ventilationLighting', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('classroomBlock', 'ventilationLighting', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.classroomBlock.ventilationLighting.observation}
            onObservationChange={(value) => handleFieldChange('classroomBlock', 'ventilationLighting', 'observation', value)}
          />

          <EvaluationItem
            id="emergencyExitsClassroom"
            label="Emergency exits"
            availabilityValue={hygieneAndSafetyData.classroomBlock.emergencyExits.availability}
            qualityValue={hygieneAndSafetyData.classroomBlock.emergencyExits.quality}
            onAvailabilityChange={(value) => handleFieldChange('classroomBlock', 'emergencyExits', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('classroomBlock', 'emergencyExits', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.classroomBlock.emergencyExits.observation}
            onObservationChange={(value) => handleFieldChange('classroomBlock', 'emergencyExits', 'observation', value)}
          />
        </div>

        {/* 6.3 Computer Lab */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.3 Computer Lab</h3>
          
          <EvaluationItem
            id="functionalComputers"
            label="Functional computers related to the number of students"
            availabilityValue={hygieneAndSafetyData.computerLab.functionalComputers.availability}
            qualityValue={hygieneAndSafetyData.computerLab.functionalComputers.quality}
            onAvailabilityChange={(value) => handleFieldChange('computerLab', 'functionalComputers', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('computerLab', 'functionalComputers', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.computerLab.functionalComputers.observation}
            onObservationChange={(value) => handleFieldChange('computerLab', 'functionalComputers', 'observation', value)}
          />

          <EvaluationItem
            id="internetAccess"
            label="Internet access"
            availabilityValue={hygieneAndSafetyData.computerLab.internetAccess.availability}
            qualityValue={hygieneAndSafetyData.computerLab.internetAccess.quality}
            onAvailabilityChange={(value) => handleFieldChange('computerLab', 'internetAccess', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('computerLab', 'internetAccess', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.computerLab.internetAccess.observation}
            onObservationChange={(value) => handleFieldChange('computerLab', 'internetAccess', 'observation', value)}
          />

          <EvaluationItem
            id="workstationSetup"
            label="Setup of workstations"
            availabilityValue={hygieneAndSafetyData.computerLab.workstationSetup.availability}
            qualityValue={hygieneAndSafetyData.computerLab.workstationSetup.quality}
            onAvailabilityChange={(value) => handleFieldChange('computerLab', 'workstationSetup', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('computerLab', 'workstationSetup', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.computerLab.workstationSetup.observation}
            onObservationChange={(value) => handleFieldChange('computerLab', 'workstationSetup', 'observation', value)}
          />

          <EvaluationItem
            id="accessibilityLab"
            label="Accessibility and quiet study areas"
            availabilityValue={hygieneAndSafetyData.computerLab.accessibility.availability}
            qualityValue={hygieneAndSafetyData.computerLab.accessibility.quality}
            onAvailabilityChange={(value) => handleFieldChange('computerLab', 'accessibility', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('computerLab', 'accessibility', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.computerLab.accessibility.observation}
            onObservationChange={(value) => handleFieldChange('computerLab', 'accessibility', 'observation', value)}
          />
        </div>

        {/* 6.4 Library */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.4 Library</h3>
          
          <EvaluationItem
            id="booksResources"
            label="Books and other resources"
            availabilityValue={hygieneAndSafetyData.library.booksResources.availability}
            qualityValue={hygieneAndSafetyData.library.booksResources.quality}
            onAvailabilityChange={(value) => handleFieldChange('library', 'booksResources', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('library', 'booksResources', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.library.booksResources.observation}
            onObservationChange={(value) => handleFieldChange('library', 'booksResources', 'observation', value)}
          />

          <EvaluationItem
            id="studyArea"
            label="Study area"
            availabilityValue={hygieneAndSafetyData.library.studyArea.availability}
            qualityValue={hygieneAndSafetyData.library.studyArea.quality}
            onAvailabilityChange={(value) => handleFieldChange('library', 'studyArea', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('library', 'studyArea', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.library.studyArea.observation}
            onObservationChange={(value) => handleFieldChange('library', 'studyArea', 'observation', value)}
          />

          <EvaluationItem
            id="conditionOfBooks"
            label="Condition of books and resources"
            availabilityValue={hygieneAndSafetyData.library.conditionOfBooks.availability}
            qualityValue={hygieneAndSafetyData.library.conditionOfBooks.quality}
            onAvailabilityChange={(value) => handleFieldChange('library', 'conditionOfBooks', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('library', 'conditionOfBooks', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.library.conditionOfBooks.observation}
            onObservationChange={(value) => handleFieldChange('library', 'conditionOfBooks', 'observation', value)}
          />

          <EvaluationItem
            id="computers"
            label="Computers"
            availabilityValue={hygieneAndSafetyData.library.computers.availability}
            qualityValue={hygieneAndSafetyData.library.computers.quality}
            onAvailabilityChange={(value) => handleFieldChange('library', 'computers', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('library', 'computers', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.library.computers.observation}
            onObservationChange={(value) => handleFieldChange('library', 'computers', 'observation', value)}
          />
        </div>

        {/* 6.5 Kitchen */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.5 Kitchen</h3>
          
          <EvaluationItem
            id="healthSafetyCompliance"
            label="Compliance with health and safety regulations"
            availabilityValue={hygieneAndSafetyData.kitchen.healthSafetyCompliance.availability}
            qualityValue={hygieneAndSafetyData.kitchen.healthSafetyCompliance.quality}
            onAvailabilityChange={(value) => handleFieldChange('kitchen', 'healthSafetyCompliance', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('kitchen', 'healthSafetyCompliance', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.kitchen.healthSafetyCompliance.observation}
            onObservationChange={(value) => handleFieldChange('kitchen', 'healthSafetyCompliance', 'observation', value)}
          />

          <EvaluationItem
            id="foodStorage"
            label="Cleanliness and organization of food storage"
            availabilityValue={hygieneAndSafetyData.kitchen.foodStorage.availability}
            qualityValue={hygieneAndSafetyData.kitchen.foodStorage.quality}
            onAvailabilityChange={(value) => handleFieldChange('kitchen', 'foodStorage', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('kitchen', 'foodStorage', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.kitchen.foodStorage.observation}
            onObservationChange={(value) => handleFieldChange('kitchen', 'foodStorage', 'observation', value)}
          />

          <EvaluationItem
            id="sanitationFacilities"
            label="Proper sanitation facilities for food preparation"
            availabilityValue={hygieneAndSafetyData.kitchen.sanitationFacilities.availability}
            qualityValue={hygieneAndSafetyData.kitchen.sanitationFacilities.quality}
            onAvailabilityChange={(value) => handleFieldChange('kitchen', 'sanitationFacilities', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('kitchen', 'sanitationFacilities', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.kitchen.sanitationFacilities.observation}
            onObservationChange={(value) => handleFieldChange('kitchen', 'sanitationFacilities', 'observation', value)}
          />
        </div>

        {/* 6.6 Refectory */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.6 Refectory</h3>
          
          <EvaluationItem
            id="tablesSeating"
            label="Condition of tables and seating arrangements"
            availabilityValue={hygieneAndSafetyData.refectory.tablesSeating.availability}
            qualityValue={hygieneAndSafetyData.refectory.tablesSeating.quality}
            onAvailabilityChange={(value) => handleFieldChange('refectory', 'tablesSeating', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('refectory', 'tablesSeating', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.refectory.tablesSeating.observation}
            onObservationChange={(value) => handleFieldChange('refectory', 'tablesSeating', 'observation', value)}
          />

          <EvaluationItem
            id="cleanlinessHygiene"
            label="Cleanliness and hygiene practices"
            availabilityValue={hygieneAndSafetyData.refectory.cleanlinessHygiene.availability}
            qualityValue={hygieneAndSafetyData.refectory.cleanlinessHygiene.quality}
            onAvailabilityChange={(value) => handleFieldChange('refectory', 'cleanlinessHygiene', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('refectory', 'cleanlinessHygiene', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="100%"
            availabilityWeight="N/A"
            isAvailabilityNA={true}
            observation={hygieneAndSafetyData.refectory.cleanlinessHygiene.observation}
            onObservationChange={(value) => handleFieldChange('refectory', 'cleanlinessHygiene', 'observation', value)}
          />

          <EvaluationItem
            id="ventilation"
            label="Ventilation"
            availabilityValue={hygieneAndSafetyData.refectory.ventilation.availability}
            qualityValue={hygieneAndSafetyData.refectory.ventilation.quality}
            onAvailabilityChange={(value) => handleFieldChange('refectory', 'ventilation', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('refectory', 'ventilation', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.refectory.ventilation.observation}
            onObservationChange={(value) => handleFieldChange('refectory', 'ventilation', 'observation', value)}
          />

          <EvaluationItem
            id="wasteDisposal"
            label="Waste disposal systems"
            availabilityValue={hygieneAndSafetyData.refectory.wasteDisposal.availability}
            qualityValue={hygieneAndSafetyData.refectory.wasteDisposal.quality}
            onAvailabilityChange={(value) => handleFieldChange('refectory', 'wasteDisposal', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('refectory', 'wasteDisposal', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.refectory.wasteDisposal.observation}
            onObservationChange={(value) => handleFieldChange('refectory', 'wasteDisposal', 'observation', value)}
          />
        </div>

        {/* 6.7 Dormitories */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.7 Dormitories</h3>
          
          <EvaluationItem
            id="spacePrivacy"
            label="Adequate space and privacy for students"
            availabilityValue={hygieneAndSafetyData.dormitories.spacePrivacy.availability}
            qualityValue={hygieneAndSafetyData.dormitories.spacePrivacy.quality}
            onAvailabilityChange={(value) => handleFieldChange('dormitories', 'spacePrivacy', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('dormitories', 'spacePrivacy', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.dormitories.spacePrivacy.observation}
            onObservationChange={(value) => handleFieldChange('dormitories', 'spacePrivacy', 'observation', value)}
          />

          <EvaluationItem
            id="cleanlinessArrangement"
            label="Cleanliness and beds arrangement"
            availabilityValue={hygieneAndSafetyData.dormitories.cleanlinessArrangement.availability}
            qualityValue={hygieneAndSafetyData.dormitories.cleanlinessArrangement.quality}
            onAvailabilityChange={(value) => handleFieldChange('dormitories', 'cleanlinessArrangement', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('dormitories', 'cleanlinessArrangement', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.dormitories.cleanlinessArrangement.observation}
            onObservationChange={(value) => handleFieldChange('dormitories', 'cleanlinessArrangement', 'observation', value)}
          />

          <EvaluationItem
            id="fireSafety"
            label="Fire safety measures and emergency exits"
            availabilityValue={hygieneAndSafetyData.dormitories.fireSafety.availability}
            qualityValue={hygieneAndSafetyData.dormitories.fireSafety.quality}
            onAvailabilityChange={(value) => handleFieldChange('dormitories', 'fireSafety', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('dormitories', 'fireSafety', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.dormitories.fireSafety.observation}
            onObservationChange={(value) => handleFieldChange('dormitories', 'fireSafety', 'observation', value)}
          />
        </div>
     

        {/* 6.8 Washrooms */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.8 Washrooms</h3>
          
          <EvaluationItem
            id="cleanlinessSupplies"
            label="Cleanliness and availability of supplies (soap, paper)"
            availabilityValue={hygieneAndSafetyData.washrooms.cleanlinessSupplies.availability}
            qualityValue={hygieneAndSafetyData.washrooms.cleanlinessSupplies.quality}
            onAvailabilityChange={(value) => handleFieldChange('washrooms', 'cleanlinessSupplies', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('washrooms', 'cleanlinessSupplies', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.washrooms.cleanlinessSupplies.observation}
            onObservationChange={(value) => handleFieldChange('washrooms', 'cleanlinessSupplies', 'observation', value)}
          />

          <EvaluationItem
            id="privacySafety"
            label="Adequate privacy and safety measures"
            availabilityValue={hygieneAndSafetyData.washrooms.privacySafety.availability}
            qualityValue={hygieneAndSafetyData.washrooms.privacySafety.quality}
            onAvailabilityChange={(value) => handleFieldChange('washrooms', 'privacySafety', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('washrooms', 'privacySafety', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.washrooms.privacySafety.observation}
            onObservationChange={(value) => handleFieldChange('washrooms', 'privacySafety', 'observation', value)}
          />

          <EvaluationItem
            id="accessibility"
            label="Accessibility and sufficient for all students"
            availabilityValue={hygieneAndSafetyData.washrooms.accessibility.availability}
            qualityValue={hygieneAndSafetyData.washrooms.accessibility.quality}
            onAvailabilityChange={(value) => handleFieldChange('washrooms', 'accessibility', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('washrooms', 'accessibility', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.washrooms.accessibility.observation}
            onObservationChange={(value) => handleFieldChange('washrooms', 'accessibility', 'observation', value)}
          />
        </div>

        {/* 6.9 Playgrounds */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.9 Playgrounds</h3>
          
          <EvaluationItem
            id="safetyOfEquipment"
            label="Safety of equipment and surfaces"
            availabilityValue={hygieneAndSafetyData.playgrounds.safetyOfEquipment.availability}
            qualityValue={hygieneAndSafetyData.playgrounds.safetyOfEquipment.quality}
            onAvailabilityChange={(value) => handleFieldChange('playgrounds', 'safetyOfEquipment', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('playgrounds', 'safetyOfEquipment', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.playgrounds.safetyOfEquipment.observation}
            onObservationChange={(value) => handleFieldChange('playgrounds', 'safetyOfEquipment', 'observation', value)}
          />

          <EvaluationItem
            id="shadedAreas"
            label="Availability of shaded areas"
            availabilityValue={hygieneAndSafetyData.playgrounds.shadedAreas.availability}
            qualityValue={hygieneAndSafetyData.playgrounds.shadedAreas.quality}
            onAvailabilityChange={(value) => handleFieldChange('playgrounds', 'shadedAreas', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('playgrounds', 'shadedAreas', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.playgrounds.shadedAreas.observation}
            onObservationChange={(value) => handleFieldChange('playgrounds', 'shadedAreas', 'observation', value)}
          />
        </div>

        {/* 6.10 School Garden */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.10 School Garden</h3>
          
          <EvaluationItem
            id="healthSafetyOfPlants"
            label="Health and safety of plants (non-toxic)"
            availabilityValue={hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.availability}
            qualityValue={hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.quality}
            onAvailabilityChange={(value) => handleFieldChange('schoolGarden', 'healthSafetyOfPlants', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('schoolGarden', 'healthSafetyOfPlants', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.schoolGarden.healthSafetyOfPlants.observation}
            onObservationChange={(value) => handleFieldChange('schoolGarden', 'healthSafetyOfPlants', 'observation', value)}
          />

          <EvaluationItem
            id="accessibilityGarden"
            label="Accessibility for students"
            availabilityValue={hygieneAndSafetyData.schoolGarden.accessibility.availability}
            qualityValue={hygieneAndSafetyData.schoolGarden.accessibility.quality}
            onAvailabilityChange={(value) => handleFieldChange('schoolGarden', 'accessibility', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('schoolGarden', 'accessibility', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.schoolGarden.accessibility.observation}
            onObservationChange={(value) => handleFieldChange('schoolGarden', 'accessibility', 'observation', value)}
          />

          <EvaluationItem
            id="educationalUse"
            label="Educational use of the garden"
            availabilityValue={hygieneAndSafetyData.schoolGarden.educationalUse.availability}
            qualityValue={hygieneAndSafetyData.schoolGarden.educationalUse.quality}
            onAvailabilityChange={(value) => handleFieldChange('schoolGarden', 'educationalUse', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('schoolGarden', 'educationalUse', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.schoolGarden.educationalUse.observation}
            onObservationChange={(value) => handleFieldChange('schoolGarden', 'educationalUse', 'observation', value)}
          />
        </div>

        {/* 6.11 Workshops */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-blue-600 mb-2">6.11 Workshops</h3>
          
          <EvaluationItem
            id="toolsMachinery"
            label="Condition of tools and machinery"
            availabilityValue={hygieneAndSafetyData.workshops.toolsMachinery.availability}
            qualityValue={hygieneAndSafetyData.workshops.toolsMachinery.quality}
            onAvailabilityChange={(value) => handleFieldChange('workshops', 'toolsMachinery', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('workshops', 'toolsMachinery', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.workshops.toolsMachinery.observation}
            onObservationChange={(value) => handleFieldChange('workshops', 'toolsMachinery', 'observation', value)}
          />

          <EvaluationItem
            id="ventilationSafety"
            label="Proper ventilation and safety measures"
            availabilityValue={hygieneAndSafetyData.workshops.ventilationSafety.availability}
            qualityValue={hygieneAndSafetyData.workshops.ventilationSafety.quality}
            onAvailabilityChange={(value) => handleFieldChange('workshops', 'ventilationSafety', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('workshops', 'ventilationSafety', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.workshops.ventilationSafety.observation}
            onObservationChange={(value) => handleFieldChange('workshops', 'ventilationSafety', 'observation', value)}
          />

          <EvaluationItem
            id="storeArrangement"
            label="Store arrangement"
            availabilityValue={hygieneAndSafetyData.workshops.storeArrangement.availability}
            qualityValue={hygieneAndSafetyData.workshops.storeArrangement.quality}
            onAvailabilityChange={(value) => handleFieldChange('workshops', 'storeArrangement', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('workshops', 'storeArrangement', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.workshops.storeArrangement.observation}
            onObservationChange={(value) => handleFieldChange('workshops', 'storeArrangement', 'observation', value)}
          />

          <EvaluationItem
            id="cleanliness"
            label="Cleanliness"
            availabilityValue={hygieneAndSafetyData.workshops.cleanliness.availability}
            qualityValue={hygieneAndSafetyData.workshops.cleanliness.quality}
            onAvailabilityChange={(value) => handleFieldChange('workshops', 'cleanliness', 'availability', value)}
            onQualityChange={(value) => handleFieldChange('workshops', 'cleanliness', 'quality', value)}
            marksAllocated={0.5}
            qualityWeight="N/A"
            availabilityWeight="100%"
            isQualityNA={true}
            observation={hygieneAndSafetyData.workshops.cleanliness.observation}
            onObservationChange={(value) => handleFieldChange('workshops', 'cleanliness', 'observation', value)}
          />
        </div>

        {/* Overview Section */}
        <Card className="border-blue-200">
          <CardContent className="pt-6">
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

            <div className="mt-6 text-right">
              <p className="text-sm text-blue-600">Total Marks for Hygiene and Safety</p>
              <p className="text-xl font-bold text-blue-800">{hygieneAndSafetyData.totalMarks.toFixed(1)} / 20</p>
            </div>
          </CardContent>
        </Card>
</CardContent>
    </Card>
  )
}