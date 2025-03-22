"use client"


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ESelectedRadioEvaluationOption } from "./common/eselected-radio-evaluation-option"
import { EvaluationItemWeights } from "./common/evaluation-item-weights"

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
    isAvailabilityNA?: boolean
    isQualityNA?: boolean
    observation?: string
    onObservationChange?: (value: string) => void
  }
  
  export default function EvaluationItemWithWeights({
    id,
    label,
    availabilityValue,
    qualityValue,
    onAvailabilityChange,
    onQualityChange,
    marksAllocated,
    qualityWeight,
    availabilityWeight,
    isAvailabilityNA = false,
    isQualityNA = false,
    observation = "",
    onObservationChange = () => {},
  }: EvaluationItemWithWeightsProps) {
    // Calculate marks obtained for this item
    const calculateMarksObtained = () => {
      // If quality is N/A, only consider availability
      if (qualityValue === "na") {
        return availabilityValue === "yes" ? marksAllocated : 0
      }
  
      // If availability is N/A, only consider quality
      if (availabilityValue === "na") {
        return qualityValue === "yes" ? marksAllocated : 0
      }
  
      // Calculate partial marks based on availability (40%) and quality (60%)
      let marks = 0
      if (availabilityValue === ESelectedRadioEvaluationOption.YES) {
        marks += marksAllocated 
      }
      if (qualityValue === ESelectedRadioEvaluationOption.NO) {
        marks += marksAllocated 
      }
  
      return marks
    }
  
    return (
      <div className="grid grid-cols-1 gap-2 p-2 rounded-md hover:bg-blue-50">
        <div className="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr,1fr] gap-4 items-start">
          <div className="text-sm font-medium">{label}</div>
  
          <div className="flex flex-col">
            <div className="text-center text-xs text-gray-500 mb-1">
              <div>Availability ({availabilityWeight})</div>
            </div>
            {isAvailabilityNA ? (
              <div className="flex justify-center">
                <span className="text-sm font-medium text-gray-600">N/A</span>
              </div>
            ) : (
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
            )}
          </div>
  
          <div className="flex flex-col">
            <div className="text-center text-xs text-gray-500 mb-1">
              <div>Quality ({qualityWeight})</div>
            </div>
            {isQualityNA ? (
              <div className="flex justify-center">
                <span className="text-sm font-medium text-gray-600">N/A</span>
              </div>
            ) : (
              <RadioGroup value={qualityValue} onValueChange={onQualityChange} className="flex justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={ESelectedRadioEvaluationOption.YES} id={`${id}-quality-yes`} />
                  <Label htmlFor={`${id}-quality-yes`} className="text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value={ESelectedRadioEvaluationOption.NO} id={`${id}-quality-no`} />
                  <Label htmlFor={`${id}-quality-no`} className="text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            )}
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
  
  