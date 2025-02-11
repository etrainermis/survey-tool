import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "@/lib/auth";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";
import { useAllSchools } from "@/hooks/useSchools";
import { AuthApi } from "@/lib/config/axios.config";

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
      teachers: number;
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
        classrooms: number;
        students: {
          male: number;
          female: number;
        };
      }>;
    }>;
  };
  infrastructure: Array<{
    type: string;
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
      type?: "4G" | "Fiber"; // Add this field
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
    };
  };
}

const CreateSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentInfraType, setCurrentInfraType] = useState(0);
  const { toast } = useToast();
  const form = useForm<SurveyData>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const { schools, fetchingSchools, errorFetchingSchools, mutate } =
    useAllSchools();

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

  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`survey_draft_${user.id}`);
      if (savedData) {
        form.reset(JSON.parse(savedData));
      }
    }
  }, [user, form]);

  useEffect(() => {
    const currentData = form.getValues();
    if (!currentData.infrastructure) {
      currentData.infrastructure = [];
    }
    if (!currentData.infrastructure[currentInfraType]) {
      currentData.infrastructure[currentInfraType] = {
        type: infrastructureTypes[currentInfraType],
        size: "",
        capacity: "",
        constructionYear: undefined,
        materials: [],
        status: "",
      };
      form.reset(currentData);
    }
  }, [currentInfraType, infrastructureTypes, form]);

  const saveProgress = (data) => {
    if (user?.id) {
      localStorage.setItem(`survey_draft_${user.id}`, JSON.stringify(data));
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
      const surveyPayload = {
        schoolId: selectedSchool.id,
        schoolSurveyData: JSON.stringify({
          // School Basic Info
          schoolName: selectedSchool.name,
          schoolStatus: data.school.status,
          schoolCategory: data.school.category,

          // Contact Information
          contactEmail: data.school.contact.email,
          contactPhone: data.school.contact.phone,
          headTeacherName: data.school.contact.headteacher,

          // Stats
          numberOfTeachers: data.school.stats.teachers,

          // Trades Information
          trades: data.school.trades?.map((trade: any) => ({
            tradeName: trade.name,
            levels: trade.levels.map((level) => ({
              level: level.level,
              classrooms: level.classrooms,
              maleStudents: level.students.male,
              femaleStudents: level.students.female,
            })),
          })),

          // Infrastructure
          infrastructure: data.infrastructure?.map((infra) => ({
            type: infra.type,
            size: infra.size,
            capacity: infra.capacity,
            constructionYear: infra.constructionYear,
            materials: infra.materials,
            status: infra.status,
          })),

          // IT Infrastructure
          itInfrastructure: {
            computerLab: {
              totalComputers: data.it.computerLab.totalComputers,
              workingComputers: data.it.computerLab.workingComputers,
              nonWorkingComputers: data.it.computerLab.nonWorkingComputers,
              hasLAN: data.it.computerLab.hasLAN,
              hasProjectors: data.it.computerLab.hasProjectors,
              totalProjectors: data.it.computerLab.totalProjectors,
              workingProjectors: data.it.computerLab.workingProjectors,
              nonWorkingProjectors: data.it.computerLab.nonWorkingProjectors,
            },
            internet: {
              exists: data.it.exists,
              type: data.it.type,
            },
            server: {
              exists: data.it.exists,
              specifications: data.it.specifications,
            },
            energySources: data.it.energySources,
            equipment: {
              hasAssetRegister: data.it.hasAssetRegister,
              status: data.it.status,
            },
          },
        }),
      };

      // Submit to API
      const response = await AuthApi.post("/school-survey/add", surveyPayload);

      // Handle successful submission
      toast({
        title: "Survey Submitted",
        description: "Your survey has been successfully submitted.",
      });

      // Clear local storage and navigate
      localStorage.removeItem(`survey_draft_${user?.id}`);
      navigate("/dashboard");
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
      <div className="space-y-2">
        <Label htmlFor="school-select">Select School</Label>
        <select
          id="school-select"
          className="w-full p-2 border rounded-md"
          {...form.register("school.id", {
            required: "Please select a school",
          })}
          onChange={(e) => {
            const school = schools.find((s) => s.id === e.target.value);
            if (school) {
              setSelectedSchool(school);
              form.reset({ school });
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-status">Status</Label>
          <select
            id="school-status"
            className="w-full p-2 border rounded-md"
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
          <Label htmlFor="school-category">category</Label>
          <select
            id="school-category"
            className="w-full p-2 border rounded-md"
            {...form.register("school.category", {
              required: "school's category is required",
            })}
          >
            <option value="">Select Category...</option>
            <option value="public">TSS</option>
            <option value="private">TVET WING</option>
            <option value="private-govt">VTC</option>
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
          <Label htmlFor="school-email">Email</Label>
          <Input
            id="school-email"
            type="email"
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
          <Label htmlFor="headTeacherName">Head Teacher's Name</Label>
          <Input
            id="headTeacherName"
            type="text"
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
          <Label htmlFor="school-phone">Phone</Label>
          <Input
            id="school-phone"
            type="tel"
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

        <div className="space-y-2">
          <Label htmlFor="number-of-teachers">Number of Teachers</Label>
          <Input
            id="number-of-teachers"
            type="number"
            {...form.register("school.stats.teachers", {
              required: "Number of teachers is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
          />
          {form.formState.errors.school?.stats?.teachers && (
            <p className="text-red-500">
              {form.formState.errors.school.stats.teachers.message}
            </p>
          )}
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
          <Card key={trade.id} className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{trade.name}</h3>
              <span className="text-sm text-gray-500">
                Code: {trade.certificationCode}
              </span>
            </div>

            {[3, 4, 5].map((level, levelIndex) => (
              <div key={level} className="space-y-4 border-t pt-4">
                <h4 className="font-medium">Level {level}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Classrooms</Label>
                    <Input
                      type="number"
                      min="0"
                      {...form.register(
                        `school.trades.${tradeIndex}.levels.${levelIndex}.classrooms`,
                        {
                          valueAsNumber: true,
                          required: "Number of classrooms is required",
                        }
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Male Students</Label>
                    <Input
                      type="number"
                      min="0"
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
                    <Label>Female Students</Label>
                    <Input
                      type="number"
                      min="0"
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

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Status: {trade.status}</span>
                <span>Total Students: {trade.totalStudents}</span>
              </div>
            </div>
          </Card>
        ))}

        {mappedTrades.length === 0 && (
          <div className="text-center p-8 text-gray-500">
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
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold capitalize">{type}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Size (sq. m)</Label>
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
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Construction Material</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "ruriba",
                  "amatafari ahiye",
                  "block cement",
                  "rukarakara",
                  "ibiti n'ibyondo",
                  "ibyuma",
                  "amabati",
                  "amategura",
                  "amakaro",
                  "cement",
                  "pavement",
                ].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
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
                    <Label htmlFor={`material-${material}`}>{material}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Construction Year</Label>
              <Input
                type="number"
                {...form.register(
                  `infrastructure.${infraIndex}.constructionYear` as const
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue(`infrastructure.${infraIndex}.status`, value)
                }
                value={form.watch(`infrastructure.${infraIndex}.status`)}
              >
                {["good", "moderate", "poor"].map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <RadioGroupItem value={status} id={`status-${status}`} />
                    <Label htmlFor={`status-${status}`}>{status}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={prevInfraType}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button type="button" onClick={nextInfraType}>
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
          <p className="text-sm text-gray-500">
            Infrastructure {currentInfraType + 1} of{" "}
            {infrastructureTypes.length}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
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
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">Computer Lab</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Total Computers</Label>
            <Input
              type="number"
              {...form.register("it.computerLab.totalComputers")}
            />
          </div>
          <div className="space-y-2">
            <Label>Working Computers</Label>
            <Input
              type="number"
              {...form.register("it.computerLab.workingComputers")}
            />
          </div>
          {/* Not Working Computers */}
          <div className="space-y-2">
            <Label>Not Working Computers</Label>
            <Input
              type="number"
              {...form.register("it.computerLab.nonWorkingComputers")}
            />
          </div>

          <div className="space-y-2">
            <Label>Connected with LAN</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.computerLab.hasLAN", value === "yes")
              }
              defaultValue={form.watch("it.computerLab.hasLAN") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-lan-yes" />
                <Label htmlFor="has-lan-yes">Yes</Label>
                <RadioGroupItem value="no" id="has-lan-no" />
                <Label htmlFor="has-lan-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Do you have projectors?</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.computerLab.hasProjectors", value === "yes")
              }
              defaultValue={
                form.watch("it.computerLab.hasProjectors") ? "yes" : "no"
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-projectors-yes" />
                <Label htmlFor="has-projectors-yes">Yes</Label>
                <RadioGroupItem value="no" id="has-projectors-no" />
                <Label htmlFor="has-projectors-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Show only when "Yes" is selected */}
          {form.watch("it.computerLab.hasProjectors") === true && (
            <div className="grid grid-cols-2 gap-4">
              {/* Total Projectors */}
              <div className="space-y-2">
                <Label>Total Projectors</Label>
                <Input
                  type="number"
                  {...form.register("it.computerLab.totalProjectors")}
                />
              </div>
              {/* Working Projectors */}
              <div className="space-y-2">
                <Label>Working Projectors</Label>
                <Input
                  type="number"
                  {...form.register("it.computerLab.workingProjectors")}
                />
              </div>
              {/* Not Working Projectors */}
              <div className="space-y-2">
                <Label>Not Working Projectors</Label>
                <Input
                  type="number"
                  {...form.register("it.computerLab.nonWorkingProjectors")}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">Internet & Server</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Internet Available</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.internet.exists", value === "yes")
              }
              defaultValue={form.watch("it.internet.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-internet-yes" />
                <Label htmlFor="has-internet-yes">Yes</Label>
                <RadioGroupItem value="no" id="has-internet-no" />
                <Label htmlFor="has-internet-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Show Internet Type dropdown only if "Yes" is selected */}
          {form.watch("it.internet.exists") === true && (
            <div className="space-y-2">
              <Label>Internet Type</Label>
              <select
                className="w-full p-2 border rounded-md"
                {...form.register("it.internet.type")}
              >
                <option value="4G">4G</option>
                <option value="Fiber">Fiber</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Has Server</Label>
            <RadioGroup
              onValueChange={(value) =>
                form.setValue("it.server.exists", value === "yes")
              }
              defaultValue={form.watch("it.server.exists") ? "yes" : "no"}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-server-yes" />
                <Label htmlFor="has-server-yes">Yes</Label>
                <RadioGroupItem value="no" id="has-server-no" />
                <Label htmlFor="has-server-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {form.watch("it.server.exists") && (
          <div className="space-y-2">
            <Label>Server Specifications</Label>
            <textarea
              className="w-full p-2 border rounded-md"
              {...form.register("it.server.specifications")}
            />
          </div>
        )}
      </Card>
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">Additional Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Energy Sources</Label>
            <div className="grid grid-cols-3 gap-2">
              {["Solar", "Grid", "Renewable Energy"].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={`energy-${source}`}
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
                  <Label htmlFor={`energy-${source}`}>{source}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Equipment Status</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has-asset-register"
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "it.equipment.hasAssetRegister",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="has-asset-register">Has Asset Register</Label>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
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
                      />
                      <Label htmlFor={`equipment-status-${status}`}>
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
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">School Information</h2>
            <p className="text-gray-500">
              Select a school and verify its information
            </p>
            {renderSchoolSection()}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trade Information</h2>
            <p className="text-gray-500">
              Enter information about school trades and students
            </p>
            {renderTradesSection()}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Infrastructure</h2>
            <p className="text-gray-500">
              Enter details about school infrastructure
            </p>
            {renderInfrastructureSection()}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">IT Infrastructure</h2>
            <p className="text-gray-500">
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Survey</h1>
            <p className="text-gray-500">Step {currentStep} of 4</p>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
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
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit">Submit Survey</Button>
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
