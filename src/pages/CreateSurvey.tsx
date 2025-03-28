"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AuthState } from "@/lib/auth";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";
import { AuthApi } from "@/lib/config/axios.config";
import { ESchoolSurveyDataType } from "@/common/enums/SchoolSurveyDataType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAllDistricts } from "@/hooks/useLocation";
import { useSchoolsByDistrict } from "@/hooks/useSchools";
import { useOneSurvey } from "@/hooks/useOneSurvey";

interface CreateSurveyProps {
  authState: AuthState;
}

interface SurveyData {
  school: {
    id: string;
    name: string;
    status: string;
    category: string;
    location: {
      province: string;
      district: string;
      sector: string;
      cell: string;
      village: string;
    };
    stats: {
      trades: number;
      students: number;
      maleTeachers: number;
      femaleTeachers: number;
    };
    contact: {
      phone: string;
      email: string;
      headteacher: string;
      owner: string;
    };
    trades: Array<{
      id: string;
      name: string;
      levels: Array<{
        level: number;
        virtualClassrooms: number;
        physicalClassrooms: number;
        students: {
          male: number;
          female: number;
        };
      }>;
      shortCourse?: {
        virtualClassrooms: number;
        physicalClassrooms: number;
        students: {
          male: number;
          female: number;
        };
      };
    }>;
  };
  companies: Array<{
    name: string;
    distance: string;
    trades: string[];
  }>;
  infrastructure: Array<{
    type: string;
    isPresent?: boolean;
    size: string;
    capacity: string;
    constructionYear: number;
    materials: string[];
    status: string;
  }>;
  it: {
    computerLab: {
      totalComputers: number;
      hasLAN: boolean;
      workingComputers: number;
      nonWorkingComputers: number;
      hasProjectors: boolean;
      totalProjectors: number;
      workingProjectors: number;
      nonWorkingProjectors: number;
    };
    internet: {
      exists: boolean;
      type?: "4G" | "Fiber";
    };
    server: {
      exists: boolean;
      specifications: string;
    };
    hasElearning: boolean;
    energySources: string[];
    equipment: {
      hasAssetRegister: boolean;
      status: string;
      isAvailable: boolean;
      assetRegisterFile?: File;
    };
  };
}

const CreateSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentInfraType, setCurrentInfraType] = useState(0);
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [newTradeName, setNewTradeName] = useState("");
  const { toast } = useToast();
  const form = useForm<SurveyData>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null
  );
  const { schools, fetchingSchools, errorFetchingSchools } =
    useSchoolsByDistrict(selectedDistrictId);
  const { districts, fetchingDistricts, errorFetchingDistricts } =
    useAllDistricts();
  const fileInputRef = useRef(null);

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
  ];
  const [searchParams] = useSearchParams();
  const myParam = searchParams.get("schoolId");
  const {
    survey: fetchedSurvey,
    fetchingSurvey,
    errorFetchingSurvey,
  } = useOneSurvey(myParam);

  useEffect(() => {
    if (user?.id) {
      if (myParam !== undefined && myParam !== null && !!fetchedSurvey?.data) {
        form.reset(JSON.parse(fetchedSurvey.data.generalInformation));
        console.log(form.getValues());
        
        // setSelectedSchool(fetchedSurvey.data.school)
        // console.log(JSON.parse(fetchedSurvey.data.generalInformation).school);
        
        setSelectedSchool((prev) => {
          return fetchedSurvey.data.school;
        });
      
        setSelectedDistrictId(fetchedSurvey.data.school.districtId.id);
      }
    }
  }, [user, form, myParam, fetchedSurvey]);

  useEffect(() => {
    const currentData = form.getValues();

    if (!currentData.infrastructure) {
      currentData.infrastructure = [];
    }
    if (!currentData.infrastructure[currentInfraType]) {
      currentData.infrastructure[currentInfraType] = {
        type: infrastructureTypes[currentInfraType],
        isPresent: true,
        size: "",
        capacity: "",
        constructionYear: null,
        materials: [],
        status: "",
      };
      form.reset(currentData);
    }
  }, [currentInfraType, infrastructureTypes, form]);

  const saveProgress = (data) => {
    if (user?.id) {
      // Make a copy of the data to avoid circular references
      const dataCopy = JSON.parse(JSON.stringify(data));

      // Remove File objects which can't be serialized
      if (dataCopy.it?.equipment?.assetRegisterFile) {
        delete dataCopy.it.equipment.assetRegisterFile;
      }

      localStorage.setItem(
        `survey_draft_${localStorage.getItem("currentEvaluationSchool")}`,
        JSON.stringify(data)
      );
      toast({ description: "Progress saved", duration: 1000 });
    }
  };

  const nextStep = () => {
    form.trigger().then((isValid) => {
      if (isValid) {
        saveProgress(form.getValues());
        setCurrentStep((prev) => prev + 1);
      }
    });
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextInfraType = () => {
    if (currentInfraType < infrastructureTypes.length - 1) {
      const currentData = form.getValues();
      currentData.infrastructure[currentInfraType + 1] = {
        type: infrastructureTypes[currentInfraType + 1],
        isPresent: true,
        size: "",
        capacity: "",
        constructionYear: undefined,
        materials: [],
        status: "",
      };

      saveProgress(currentData);
      setCurrentInfraType(currentInfraType + 1);
    } else {
      nextStep();
    }
  };

  const prevInfraType = () => {
    if (currentInfraType > 0) {
      setCurrentInfraType(currentInfraType - 1);
    } else {
      prevStep();
    }
  };

  const onSubmit = async (data: any) => {
    try {
      // Validate that a school is selected
      if (!selectedSchool) {
        toast({
          title: "Error",
          description: "Please select a school first",
          variant: "destructive",
        });
        return;
      }

      // Make a copy of the data to avoid circular references
      const dataCopy = JSON.parse(JSON.stringify(data));

      // Remove File objects which can't be serialized
      if (dataCopy.it?.equipment?.assetRegisterFile) {
        delete dataCopy.it.equipment.assetRegisterFile;
      }

      const surveyPayload = {
        schoolId: selectedSchool.id,
        generalInformation: JSON.stringify(dataCopy),
      };

      // Submit to API
      const response = await AuthApi.post(
        `/school-survey/add-specific?schoolSurveyDataType=${ESchoolSurveyDataType.GENERAL_INFORMATION}`,
        surveyPayload
      );

      // Handle successful submission
      toast({
        title: "Survey Submitted",
        description: "Your survey has been successfully submitted.",
      });

      // Clear local storage

      // Store the selected school ID in localStorage for the evaluation page
      localStorage.setItem("currentEvaluationSchool", selectedSchool.id);

      // Navigate to evaluation page instead of dashboard
      navigate("/evaluation", {
        state: {
          schoolId: selectedSchool.id,
          schoolName: selectedSchool.name,
        },
      });
    } catch (error) {
      console.log(error);

      // Handle submission error
      toast({
        title: "Submission Error",
        description:
          error.response?.data?.message ||
          "Failed to submit survey. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderSchoolSection = () => (
    <div className="space-y-4">
      {!selectedSchool && (
        <div className="space-y-2">
          <Label htmlFor="district-select" className="text-blue-700">
            Select District
          </Label>
          <select
            id="district-select"
            className="w-full p-2 border border-blue-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={(e) => {
              const district = districts.find(
                (d) => d.id === Number(e.target.value)
              );

              if (district) {
                setSelectedDistrictId(district.id);
              }
            }}
          >
            <option value="">Select a district...</option>
            {fetchingDistricts ? (
              <option disabled>Loading Districts...</option>
            ) : errorFetchingDistricts ? (
              <option disabled>Error fetching schools</option>
            ) : (
              districts?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))
            )}
          </select>
          {form.formState.errors.school?.id && (
            <p className="text-red-500">
              {form.formState.errors.school.id.message}
            </p>
          )}
        </div>
      )}
      {(selectedSchool || selectedDistrictId) && (
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
            value={selectedSchool?.id || ""}
            onChange={(e) => {
              const school = schools?.find((s) => s.id === e.target.value);
              if (school) {
                setSelectedSchool(school);
                form.reset({ school });
                localStorage.setItem("currentEvaluationSchool", school.id);
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
          {form.formState.errors.school?.id && (
            <p className="text-red-500">
              {form.formState.errors.school.id.message}
            </p>
          )}
        </div>
      )}
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
            <p className="text-red-500">
              {form.formState.errors.school.status.message}
            </p>
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
            onChange={(e) => localStorage.setItem("surveyType", e.target.value)}
          >
            <option value="">Select Category...</option>
            <option value="day">Day</option>
            <option value="boarding">Boarding</option>
            <option value="mixed">Mixed</option>
          </select>
          {form.formState.errors.school?.category && (
            <p className="text-red-500">
              {form.formState.errors.school.category.message}
            </p>
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
            <p className="text-red-500">
              {form.formState.errors.school.contact.email.message}
            </p>
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
            <p className="text-red-500">
              {form.formState.errors.school.contact.headteacher.message}
            </p>
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
            <p className="text-red-500">
              {form.formState.errors.school.contact.phone.message}
            </p>
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
                valueAsNumber: true,
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {form.formState.errors.school?.stats?.maleTeachers && (
              <p className="text-red-500">
                {form.formState.errors.school.stats.maleTeachers.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="number-of-female-teachers"
              className="text-blue-700"
            >
              N of Female Teachers
            </Label>
            <Input
              id="number-of-female-teachers"
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("school.stats.femaleTeachers", {
                required: "Number of female teachers is required",
                valueAsNumber: true,
                min: { value: 0, message: "Cannot be negative" },
              })}
            />
            {form.formState.errors.school?.stats?.femaleTeachers && (
              <p className="text-red-500">
                {form.formState.errors.school.stats.femaleTeachers.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradesSection = () => {
    const tradesData = selectedSchool?.trades || [];

    const mappedTrades = tradesData.map((tradeItem) => ({
      id: tradeItem.id,
      name: tradeItem.trade.name,
      certificationCode: tradeItem.trade.certificationCode,
      totalStudents: tradeItem.totalNumberOfStudents,
      status: tradeItem.status,
    }));

    return (
      <div className="space-y-6">
        {mappedTrades.map((trade, tradeIndex) => (
          <Card key={trade.id} className="p-4 space-y-4 border-blue-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-blue-700">{trade.name}</h3>
              <span className="text-sm text-blue-600">
                Code: {trade.certificationCode}
              </span>
            </div>

            {/* Short Course Section */}
            <div className="space-y-4 border-t border-blue-100 pt-4">
              <h4 className="font-medium">Short Course</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="">Virtual Classes</Label>
                  <Input
                    type="number"
                    min="0"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(
                      `school.trades.${tradeIndex}.shortCourse.virtualClassrooms`,
                      {
                        valueAsNumber: true,
                        required: "Number of virtual classrooms is required",
                      }
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="">Physical Classes</Label>
                  <Input
                    type="number"
                    min="0"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(
                      `school.trades.${tradeIndex}.shortCourse.physicalClassrooms`,
                      {
                        valueAsNumber: true,
                        required: "Number of physical classrooms is required",
                      }
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="">Male Students</Label>
                  <Input
                    type="number"
                    min="0"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(
                      `school.trades.${tradeIndex}.shortCourse.students.male`,
                      {
                        valueAsNumber: true,
                        required: "Number of male students is required",
                      }
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="">Female Students</Label>
                  <Input
                    type="number"
                    min="0"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(
                      `school.trades.${tradeIndex}.shortCourse.students.female`,
                      {
                        valueAsNumber: true,
                        required: "Number of female students is required",
                      }
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Regular Levels */}
            {[1, 2, 3, 4, 5].map((level, levelIndex) => (
              <div
                key={level}
                className="space-y-4 border-t border-blue-100 pt-4"
              >
                <h4 className="font-medium ">Level {level}</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="">Virtual Classes</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(
                        `school.trades.${tradeIndex}.levels.${levelIndex}.virtualClassrooms`,
                        {
                          valueAsNumber: true,
                          required: "Number of virtual classrooms is required",
                        }
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="">Physical Classes</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(
                        `school.trades.${tradeIndex}.levels.${levelIndex}.physicalClassrooms`,
                        {
                          valueAsNumber: true,
                          required: "Number of physical classrooms is required",
                        }
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="">Male Students</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(
                        `school.trades.${tradeIndex}.levels.${levelIndex}.students.male`,
                        {
                          valueAsNumber: true,
                          required: "Number of male students is required",
                        }
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="">Female Students</Label>
                    <Input
                      type="number"
                      min="0"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      {...form.register(
                        `school.trades.${tradeIndex}.levels.${levelIndex}.students.female`,
                        {
                          valueAsNumber: true,
                          required: "Number of female students is required",
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-blue-100">
              <div className="flex justify-between text-sm text-blue-600">
                <span>Status: {trade.status}</span>
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
    );
  };

  const renderInfrastructureSection = () => {
    const type = infrastructureTypes[currentInfraType];
    const infraIndex = currentInfraType;

    return (
      <div className="space-y-6">
        <Card className="p-4 space-y-4 border-blue-200">
          <h3 className="font-semibold capitalize text-blue-700">{type}</h3>

          {/* Add this checkbox for marking infrastructure as not present */}
          <div className="mb-4 border-b pb-3 border-blue-100">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`infra-not-present-${infraIndex}`}
                className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                checked={
                  form.watch(`infrastructure.${infraIndex}.isPresent`) === false
                }
                onCheckedChange={(checked) => {
                  form.setValue(
                    `infrastructure.${infraIndex}.isPresent`,
                    !checked
                  );
                }}
              />
              <Label
                htmlFor={`infra-not-present-${infraIndex}`}
                className="font-medium text-gray-700"
              >
                This infrastructure is not present
              </Label>
            </div>
          </div>

          {/* Only show the rest of the form if infrastructure is present */}
          {form.watch(`infrastructure.${infraIndex}.isPresent`) !== false && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="">Size (sq. m)</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue(`infrastructure.${infraIndex}.size`, value)
                    }
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
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="text-blue-600"
                        />
                        <Label htmlFor={`size-${size}`} className="">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="">Construction Material</Label>
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
                      <div
                        key={material}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`material-${material}`}
                          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          checked={form
                            .watch(`infrastructure.${infraIndex}.materials`)
                            ?.includes(material)}
                          onCheckedChange={(checked) => {
                            const currentMaterials =
                              form.watch(
                                `infrastructure.${infraIndex}.materials`
                              ) || [];
                            if (checked) {
                              form.setValue(
                                `infrastructure.${infraIndex}.materials`,
                                [...currentMaterials, material]
                              );
                            } else {
                              form.setValue(
                                `infrastructure.${infraIndex}.materials`,
                                currentMaterials.filter((m) => m !== material)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`material-${material}`} className="">
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="">Construction Year</Label>
                  <Input
                    type="number"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    value={
                      form.watch(
                        `infrastructure.${infraIndex}.constructionYear`
                      ) || ""
                    }
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number.parseInt(e.target.value)
                        : null;
                      form.setValue(
                        `infrastructure.${infraIndex}.constructionYear`,
                        value
                      );
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-700">Status</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue(
                        `infrastructure.${infraIndex}.status`,
                        value
                      )
                    }
                    value={form.watch(`infrastructure.${infraIndex}.status`)}
                  >
                    {["good", "moderate", "poor"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={status}
                          id={`status-${status}`}
                          className="text-blue-600"
                        />
                        <Label htmlFor={`status-${status}`} className="">
                          {status}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </>
          )}
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

          <Button
            type="button"
            onClick={nextInfraType}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
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
            Infrastructure {currentInfraType + 1} of{" "}
            {infrastructureTypes.length}
          </p>
          <div className="w-full bg-blue-100 h-2 rounded-full mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentInfraType + 1) / infrastructureTypes.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderITSection = () => (
    <div className="space-y-6">
      <Card className="p-4 space-y-4 border-blue-200">
        <h3 className="font-semibold text-blue-700">Computer Lab</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="">Total Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.totalComputers", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label className="">Working Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.workingComputers", {
                valueAsNumber: true,
              })}
            />
          </div>
          {/* Not Working Computers */}
          <div className="space-y-2">
            <Label className="">Not Working Computers</Label>
            <Input
              type="number"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              {...form.register("it.computerLab.nonWorkingComputers", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-2">
            <Label className="">Connected with LAN</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.computerLab.hasLAN", value === "yes")
              }
              defaultValue={form.watch("it.computerLab.hasLAN") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="has-lan-yes"
                  className="text-blue-600"
                />
                <Label htmlFor="has-lan-yes" className="">
                  Yes
                </Label>
                <RadioGroupItem
                  value="no"
                  id="has-lan-no"
                  className="text-blue-600"
                />
                <Label htmlFor="has-lan-no" className="">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="">Do you have projectors?</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.computerLab.hasProjectors", value === "yes")
              }
              defaultValue={
                form.watch("it.computerLab.hasProjectors") ? "yes" : "no"
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="has-projectors-yes"
                  className="text-blue-600"
                />
                <Label htmlFor="has-projectors-yes" className="">
                  Yes
                </Label>
                <RadioGroupItem
                  value="no"
                  id="has-projectors-no"
                  className="text-blue-600"
                />
                <Label htmlFor="has-projectors-no" className="">
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
                <Label className="text-black">Total Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.totalProjectors", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {/* Working Projectors */}
              <div className="space-y-2">
                <Label className="text-black">Working Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.workingProjectors", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {/* Not Working Projectors */}
              <div className="space-y-2">
                <Label className="text-black">Not Working Projectors</Label>
                <Input
                  type="number"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  {...form.register("it.computerLab.nonWorkingProjectors", {
                    valueAsNumber: true,
                  })}
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
            <Label className="">Internet Available</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.internet.exists", value === "yes")
              }
              defaultValue={form.watch("it.internet.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="has-internet-yes"
                  className="text-blue-600"
                />
                <Label htmlFor="has-internet-yes" className="">
                  Yes
                </Label>
                <RadioGroupItem
                  value="no"
                  id="has-internet-no"
                  className="text-blue-600"
                />
                <Label htmlFor="has-internet-no" className="">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Show Internet Type dropdown only if "Yes" is selected */}
          {form.watch("it.internet.exists") === true && (
            <div className="space-y-2">
              <Label className="">Internet Type</Label>
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
            <Label className="">Has Server</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.server.exists", value === "yes")
              }
              defaultValue={form.watch("it.server.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="has-server-yes"
                  className="text-blue-600"
                />
                <Label htmlFor="has-server-yes" className="">
                  Yes
                </Label>
                <RadioGroupItem
                  value="no"
                  id="has-server-no"
                  className="text-blue-600"
                />
                <Label htmlFor="has-server-no" className="">
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
            <Label className="">Energy Sources</Label>
            <div className="grid grid-cols-3 gap-2">
              {["Solar", "Grid", "Renewable Energy"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={`energy-${source}`}
                    className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    onCheckedChange={(checked) => {
                      const currentSources =
                        form.getValues("it.energySources") || [];
                      if (checked) {
                        form.setValue("it.energySources", [
                          ...currentSources,
                          source,
                        ]);
                      } else {
                        form.setValue(
                          "it.energySources",
                          currentSources.filter((s) => s !== source)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`energy-${source}`} className="">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4 space-y-4 border-blue-200">
        <h3 className="font-semibold text-blue-700">
          Equipment Asset Register
        </h3>
        <div className="space-y-2">
          <Label className="">Equipment Status</Label>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-asset-register"
                className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                onCheckedChange={(checked) =>
                  form.setValue(
                    "it.equipment.hasAssetRegister",
                    checked as boolean
                  )
                }
              />
              <Label htmlFor="has-asset-register" className="">
                Has Asset Register
              </Label>
            </div>

            {/* <div className="space-y-2">
              <Label className="">Asset Register Document</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  id="asset-register-file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const fileName = e.target.files[0].name
                      const fileElement = document.getElementById("selected-file-name")
                      if (fileElement) {
                        fileElement.textContent = fileName
                        fileElement.className = "text-sm text-blue-600"
                      }

                      // Store the file in form data
                      form.setValue("it.equipment.assetRegisterFile", e.target.files[0])

                      toast({
                        description: `File "${fileName}" selected`,
                        duration: 3000,
                      })
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  + Add File
                </Button>
                <span className="text-sm text-muted-foreground" id="selected-file-name">
                  No file selected
                </span>
              </div>
            </div> */}

            <div className="space-y-2">
              <Label className="">Status</Label>
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue("it.equipment.status", value)
                }
              >
                {["good", "moderate", "poor"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={status}
                      id={`equipment-status-${status}`}
                      className="text-blue-600"
                    />
                    <Label htmlFor={`equipment-status-${status}`} className="">
                      {status}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCompanySection = () => {
    // Add company function
    const addCompany = () => {
      const currentData = form.getValues();
      if (!currentData.companies) {
        currentData.companies = [];
      }
      currentData.companies.push({ name: "", distance: "", trades: [] });
      form.reset(currentData);
      saveProgress(currentData);
    };

    // Add trade to a company
    const openTradeDialog = (companyIndex) => {
      setCurrentCompanyIndex(companyIndex);
      setNewTradeName("");
      setIsTradeDialogOpen(true);
    };

    // Add the trade from dialog
    const addTradeFromDialog = () => {
      if (newTradeName && newTradeName.trim() !== "") {
        const currentData = form.getValues();
        if (!currentData.companies[currentCompanyIndex].trades) {
          currentData.companies[currentCompanyIndex].trades = [];
        }
        currentData.companies[currentCompanyIndex].trades.push(
          newTradeName.trim()
        );
        form.reset(currentData);
        saveProgress(currentData);
        setIsTradeDialogOpen(false);
      }
    };

    // Remove trade from a company
    const removeTrade = (companyIndex, tradeIndex) => {
      const currentData = form.getValues();
      currentData.companies[companyIndex].trades.splice(tradeIndex, 1);
      form.reset(currentData);
      saveProgress(currentData);
    };

    return (
      <div className="space-y-6">
        <Card className="p-4 space-y-4 border-blue-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-blue-700">Company Information</h3>
            <Button
              type="button"
              onClick={addCompany}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Add Company
            </Button>
          </div>

          {(form.watch("companies") || []).map((company, companyIndex) => (
            <div
              key={companyIndex}
              className="space-y-4 border-t border-blue-100 pt-4"
            >
              <h4 className="font-medium">Company {companyIndex + 1}</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="">Company Name</Label>
                  <Input
                    type="text"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(`companies.${companyIndex}.name`, {
                      required: "Company name is required",
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="">Distance from School (km)</Label>
                  <Input
                    type="text"
                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    {...form.register(`companies.${companyIndex}.distance`, {
                      required: "Distance is required",
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="">Trades</Label>
                    <Button
                      type="button"
                      onClick={() => openTradeDialog(companyIndex)}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white h-6 px-2"
                    >
                      + Add Trade
                    </Button>
                  </div>
                  <div className="space-y-2 p-2 border border-blue-200 rounded-md">
                    {(company.trades || []).length > 0 ? (
                      (company.trades || []).map((trade, tradeIndex) => (
                        <div
                          key={tradeIndex}
                          className="flex justify-between items-center p-2 bg-blue-50 rounded-md"
                        >
                          <span>{trade}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() =>
                              removeTrade(companyIndex, tradeIndex)
                            }
                          >
                            ×
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-2 text-blue-500">
                        No trades added. Click "+ Add Trade" to add trades.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(form.watch("companies") || []).length === 0 && (
            <div className="text-center p-4 text-blue-500 bg-blue-50 rounded-lg border border-blue-200">
              Click "Add Company" to add company information
            </div>
          )}
        </Card>

        {/* Trade Dialog */}
        <Dialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Trade</DialogTitle>
              {/* <Button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                variant="ghost"
                onClick={() => setIsTradeDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button> */}
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trade-name" className="text-right">
                  Trade Name
                </Label>
                <Input
                  id="trade-name"
                  value={newTradeName}
                  onChange={(e) => setNewTradeName(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter trade name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTradeFromDialog();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setIsTradeDialogOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="button" onClick={addTradeFromDialog}>
                Add Trade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">
              School Information
            </h2>
            <p className="text-blue-600">
              Select a school and verify its information
            </p>
            {renderSchoolSection()}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">
              Company Information
            </h2>
            <p className="text-blue-600">
              Enter information about companies working with the school
            </p>
            {renderCompanySection()}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">
              Trade Information
            </h2>
            <p className="text-blue-600">
              Enter information about school trades and students
            </p>
            {renderTradesSection()}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">
              Infrastructure
            </h2>
            <p className="text-blue-600">
              Enter details about school infrastructure
            </p>
            {renderInfrastructureSection()}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-800">
              IT Infrastructure
            </h2>
            <p className="text-blue-600">
              Enter information about IT equipment and facilities
            </p>
            {renderITSection()}
          </div>
        );
      default:
        return null;
    }
  };

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
              <h1 className="text-2xl font-bold text-blue-800">
                Create New Survey
              </h1>
              <p className="text-blue-600">Step {currentStep} of 5</p>
            </div>

            <div className="w-full bg-blue-100 h-2 rounded-full mb-8">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {renderStepContent()}

                {currentStep !== 4 && (
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

                    {currentStep < 5 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
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
  );
};

export default CreateSurvey;
