import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SchoolTypeSelectionProps {
  schoolType: "day" | "boarding" | null
  setSchoolType: (type: "day" | "boarding") => void
}

export default function SchoolTypeSelection({ schoolType, setSchoolType }: SchoolTypeSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h3 className="text-lg font-medium mb-6 text-blue-800">Please select your school type:</h3>

      <RadioGroup
        value={schoolType || ""}
        onValueChange={(value) => setSchoolType(value as "day" | "boarding")}
        className="flex flex-col md:flex-row gap-6"
      >
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="day" id="day" className="mt-1" />
          <div>
            <Label htmlFor="day" className="text-base font-medium">
              Day School
            </Label>
            <p className="text-sm text-gray-500">For schools where students attend during the day only</p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <RadioGroupItem value="boarding" id="boarding" className="mt-1" />
          <div>
            <Label htmlFor="boarding" className="text-base font-medium">
              Boarding School
            </Label>
            <p className="text-sm text-gray-500">For schools where students reside on campus</p>
          </div>
        </div>
      </RadioGroup>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Your selection will determine which evaluation criteria are applicable. Some components
          are specific to either day schools or boarding schools.
        </p>
      </div>
    </div>
  )
}

