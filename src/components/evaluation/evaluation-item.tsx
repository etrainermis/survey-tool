"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ESelectedRadioEvaluationOption } from "./common/eselected-radio-evaluation-option";
import { EvaluationItemWeights } from "./common/evaluation-item-weights";
import { useEffect, useState } from "react";

interface EvaluationItemWithWeightsProps {
  id: string;
  label: string;
  availabilityValue: EvaluationItemWeights;
  qualityValue: EvaluationItemWeights;
  onAvailabilityChange?: (baseId: any, value: any) => void;
  onQualityChange?: (baseId: any, value: any) => void;
  marksAllocated: number;
  qualityWeight: string;
  availabilityWeight: string;
  isAvailabilityNA?: boolean;
  isQualityNA?: boolean;
  observation?: string;
  onObservationChange?: (value: string) => void;
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
  const getInitialValue = (value: number, expectedValue: number) =>
    value === EvaluationItemWeights.NOT_SELECTED
      ? "no"
      : value === expectedValue || value === marksAllocated
      ? "yes"
      : "no";

  const [availabilitySelectedValue, setAvailabilitySelectedValue] = useState(
    getInitialValue(availabilityValue, EvaluationItemWeights.AVAILABILITY)
  );

  const [qualitySelectedValue, setQualitySelectedValue] = useState(
    getInitialValue(qualityValue, EvaluationItemWeights.QUALITY)
  );

  // Calculate marks obtained for this item
  const calculateMarksObtained = () => {
    // console.log(quantitySelectedValue);
    // console.log(availabilitySelectedValue);

    // If quality is N/A, only consider availability
    if (qualityValue === EvaluationItemWeights.NOT_APPLICABLE) {
      availabilityValue = EvaluationItemWeights.AVAILABILITY;
      return availabilitySelectedValue === "yes" ? marksAllocated : 0;
    }

    // If availability is N/A, only consider quality
    if (availabilityValue === EvaluationItemWeights.NOT_APPLICABLE) {
      qualityValue = EvaluationItemWeights.QUALITY;
      return qualitySelectedValue === "yes" ? marksAllocated : 0;
    }

    // Calculate partial marks based on availability (40%) and quality (60%)
    let marks = 0;
    if (availabilitySelectedValue === ESelectedRadioEvaluationOption.YES) {
      availabilityValue = EvaluationItemWeights.AVAILABILITY;
      marks += marksAllocated * EvaluationItemWeights.AVAILABILITY;
    }
    if (qualitySelectedValue === ESelectedRadioEvaluationOption.YES) {
      qualityValue = EvaluationItemWeights.QUALITY;
      marks += marksAllocated * EvaluationItemWeights.QUALITY;
    }

    return marks;
  };
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    setTotalMarks(calculateMarksObtained());
  }, [qualitySelectedValue, availabilitySelectedValue]);

  const calculateOptionMarks = (
    label: "quality" | "availability",
    selectedOption: string
  ) => {
    if (selectedOption !== "yes") {
      return 0; // No marks if the selected option is not "yes"
    }

    if (label === "quality") {
      if (availabilityValue === EvaluationItemWeights.NOT_APPLICABLE) {
        return marksAllocated; // Full marks if availability is not applicable
      }
      return marksAllocated * EvaluationItemWeights.QUALITY; // Weighted quality marks
    }

    if (label === "availability") {
      if (qualityValue === EvaluationItemWeights.NOT_APPLICABLE) {
        return marksAllocated; // Full marks if quality is not applicable
      }
      return marksAllocated * EvaluationItemWeights.AVAILABILITY; // Weighted availability marks
    }

    return 0; // Default case
  };

  useEffect(() => {
    // console.log(qualityValue);
    // console.log(onQualityChange("strategicPlan", "yes"));
    // console.log(availabilityValue);
  }, []);
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
              value={availabilitySelectedValue}
              onValueChange={(value) => {
                setAvailabilitySelectedValue(value);
                onAvailabilityChange(
                  id,
                  calculateOptionMarks("availability", value)
                );
              }}
              // onChange={() => handleQualityChange("strategicPlan", "yes")}
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
            <RadioGroup
              value={qualitySelectedValue}
              onValueChange={(value) => {
                setQualitySelectedValue(value);
                onQualityChange(id, calculateOptionMarks("quality", value));
              }}
              className="flex justify-center space-x-4"
            >
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
          )}
        </div>

        <div className="text-center text-sm font-medium">{marksAllocated}</div>

        <div className="text-center text-sm font-medium">
          {totalMarks.toFixed(1)}
        </div>

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
  );
}
