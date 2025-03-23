"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EvaluationItemProps {
  id: string
  label: string
  availabilityValue: number
  qualityValue: number
  onAvailabilityChange: (value: number) => void
  onQualityChange: (value: number) => void
  marksAllocated: number
  qualityWeight: string
  availabilityWeight: string
  isAvailabilityNA?: boolean
  isQualityNA?: boolean
  observation?: string
  onObservationChange?: (value: string) => void
}

export function EvaluationItem({
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
}: EvaluationItemProps) {
  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    // If quality is N/A, only consider availability (100% of marks)
    if (isQualityNA) {
      return availabilityValue === 1 ? marksAllocated : 0
    }

    // If availability is N/A, only consider quality (100% of marks)
    if (isAvailabilityNA) {
      return qualityValue === 1 ? marksAllocated : 0
    }

    // Calculate total marks based on availability and quality
    const availabilityMarks = availabilityValue === 1 ? marksAllocated * 0.4 : 0
    const qualityMarks = qualityValue === 1 ? marksAllocated * 0.6 : 0
    return availabilityMarks + qualityMarks
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
              value={availabilityValue.toString()}
              onValueChange={(value) => onAvailabilityChange(Number(value))}
              className="flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="1" id={`${id}-availability-yes`} className="text-blue-600" />
                <Label htmlFor={`${id}-availability-yes`} className="text-blue-600">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="0" id={`${id}-availability-no`} className="text-blue-600" />
                <Label htmlFor={`${id}-availability-no`} className="text-blue-600">
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
            <RadioGroup
              value={qualityValue.toString()}
              onValueChange={(value) => onQualityChange(Number(value))}
              className="flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="1" id={`${id}-quality-yes`} className="text-blue-600" />
                <Label htmlFor={`${id}-quality-yes`} className="text-blue-600">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="0" id={`${id}-quality-no`} className="text-blue-600" />
                <Label htmlFor={`${id}-quality-no`} className="text-blue-600">
                  No
                </Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="text-center text-sm font-medium">{marksAllocated.toFixed(1)}</div>

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

