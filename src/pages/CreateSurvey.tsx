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

const sampleSchools = [
  {
    id: "1",
    name: "IPRC Kigali",
    status: "active",
    category: "public",
    location: {
      province: "Kigali City",
      district: "Nyarugenge",
      sector: "Nyarugenge",
      cell: "Nyarugenge",
      village: "Nyarugenge"
    },
    stats: {
      trades: 5,
      students: 1200,
      teachers: 80
    },
    contact: {
      phone: "+250789123456",
      email: "info@iprckigali.rw",
      headteacher: "Dr. John Doe"
    },
    trades: [
      {
        id: "t1",
        name: "Information Technology",
        levels: [
          {
            level: 3,
            classrooms: 4,
            students: { male: 60, female: 40 }
          },
          {
            level: 4,
            classrooms: 3,
            students: { male: 45, female: 35 }
          },
          {
            level: 5,
            classrooms: 2,
            students: { male: 30, female: 25 }
          }
        ]
      },
      {
        id: "t2",
        name: "Civil Engineering",
        levels: [
          {
            level: 3,
            classrooms: 3,
            students: { male: 50, female: 30 }
          },
          {
            level: 4,
            classrooms: 2,
            students: { male: 40, female: 20 }
          },
          {
            level: 5,
            classrooms: 2,
            students: { male: 35, female: 15 }
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "IPRC Huye",
    status: "active",
    category: "public",
    location: {
      province: "Southern",
      district: "Huye",
      sector: "Huye",
      cell: "Huye",
      village: "Huye"
    },
    stats: {
      trades: 4,
      students: 800,
      teachers: 60
    },
    contact: {
      phone: "+250789123457",
      email: "info@iprchuye.rw",
      headteacher: "Dr. Jane Smith"
    },
    trades: [
      {
        id: "t3",
        name: "Mechanical Engineering",
        levels: [
          {
            level: 3,
            classrooms: 3,
            students: { male: 55, female: 25 }
          },
          {
            level: 4,
            classrooms: 2,
            students: { male: 45, female: 20 }
          },
          {
            level: 5,
            classrooms: 2,
            students: { male: 35, female: 15 }
          }
        ]
      }
    ]
  }
];

const CreateSurvey = ({ authState }: CreateSurveyProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentInfraType, setCurrentInfraType] = useState(0);
  const { toast } = useToast();
  const form = useForm<SurveyData>();

  const infrastructureTypes = [
    "administration block", "classroom block", "computer lab", "library", 
    "kitchen", "refectory", "smart classroom", "dormitories", "washrooms", 
    "playgrounds", "school garden"
  ];

  useEffect(() => {
    const savedData = localStorage.getItem(`survey_draft_${authState.user?.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [authState.user?.id, form]);

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
        status: ""
      };
      form.reset(currentData);
    }
  }, [currentInfraType, infrastructureTypes, form]);

  const saveProgress = (data: Partial<SurveyData>) => {
    if (authState.user?.id) {
      localStorage.setItem(
        `survey_draft_${authState.user.id}`,
        JSON.stringify(data)
      );
      toast({
        description: "Progress saved",
        duration: 1000,
        className: "bg-accent text-accent-foreground"
      });
    }
  };

  const onSubmit = (data: SurveyData) => {
    const surveyData = {
      ...data,
      status: "completed",
      createdBy: authState.user?.id,
      createdAt: new Date().toISOString(),
    };

    const savedSurveys = JSON.parse(localStorage.getItem("completed_surveys") || "[]");
    savedSurveys.push(surveyData);
    localStorage.setItem("completed_surveys", JSON.stringify(savedSurveys));

    localStorage.removeItem(`survey_draft_${authState.user?.id}`);

    toast({
      title: "Survey completed",
      description: "Your survey has been saved successfully.",
    });

    navigate("/dashboard");
  };

  const nextStep = () => {
    if (currentStep < 4) {
      saveProgress(form.getValues());
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextInfraType = () => {
    if (currentInfraType < infrastructureTypes.length - 1) {
      const currentData = form.getValues();
      const nextIndex = currentInfraType + 1;
      
      if (currentData.infrastructure) {
        currentData.infrastructure[nextIndex] = {
          type: infrastructureTypes[nextIndex],
          size: "",
          capacity: "",
          constructionYear: undefined,
          materials: [],
          status: ""
        };
      }
      
      saveProgress(currentData);
      setCurrentInfraType(nextIndex);
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

  const renderSchoolSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="school-select">Select School</Label>
        <select 
          id="school-select"
          className="w-full p-2 border rounded-md"
          {...form.register("school.id")}
          onChange={(e) => {
            const selectedSchool = sampleSchools.find(s => s.id === e.target.value);
            if (selectedSchool) {
              form.reset({ school: selectedSchool });
            }
          }}
        >
          <option value="">Select a school...</option>
          {sampleSchools.map(school => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-name">School Name</Label>
          <Input id="school-name" {...form.register("school.name")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school-status">Status</Label>
          <Input id="school-status" {...form.register("school.status")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-email">Email</Label>
          <Input 
            id="school-email" 
            type="email"
            {...form.register("school.contact.email")} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school-phone">Phone</Label>
          <Input 
            id="school-phone" 
            type="tel"
            {...form.register("school.contact.phone")} 
          />
        </div>
      </div>
    </div>
  );

  const renderTradesSection = () => (
    <div className="space-y-6">
      {form.watch("school.trades")?.map((trade, tradeIndex) => (
        <Card key={trade.id} className="p-4 space-y-4">
          <h3 className="font-semibold">{trade.name}</h3>
          
          {[3, 4, 5].map((level) => (
            <div key={level} className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Level {level}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Classrooms</Label>
                  <Input 
                    type="number"
                    {...form.register(`school.trades.${tradeIndex}.levels.${level-3}.classrooms` as const)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Male Students</Label>
                  <Input 
                    type="number"
                    {...form.register(`school.trades.${tradeIndex}.levels.${level-3}.students.male` as const)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Female Students</Label>
                  <Input 
                    type="number"
                    {...form.register(`school.trades.${tradeIndex}.levels.${level-3}.students.female` as const)}
                  />
                </div>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );

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
                {["1-20", "20-50", "50-100", "100-150", "150-200", "200-250", 
                  "250-300", "300-400", "400-600", "600-more"
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
                {["Ruriba", "Burnt bricks", "Block cement", "Unburnt bricks", 
                  "Wood & mud", "Iron materials", "Roofing sheets", "Clay tiles", "harcoal", 
                  "Cement", "Pavement"
                ].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`material-${material}`}
                      checked={form.watch(`infrastructure.${infraIndex}.materials`)?.includes(material)}
                      onCheckedChange={(checked) => {
                        const currentMaterials = form.watch(`infrastructure.${infraIndex}.materials`) || [];
                        if (checked) {
                          form.setValue(`infrastructure.${infraIndex}.materials`, 
                            [...currentMaterials, material]
                          );
                        } else {
                          form.setValue(`infrastructure.${infraIndex}.materials`,
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
                {...form.register(`infrastructure.${infraIndex}.constructionYear` as const)}
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
          <Button
            type="button"
            variant="outline"
            onClick={prevInfraType}
          >
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
              'Complete Infrastructure'
            )}
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Infrastructure {currentInfraType + 1} of {infrastructureTypes.length}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentInfraType + 1) / infrastructureTypes.length) * 100}%` }}
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
              onValueChange={(value) => form.setValue("it.computerLab.hasLAN", value === "yes")}
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
          onValueChange={(value) => form.setValue("it.computerLab.hasProjectors", value === "yes")}
          defaultValue={form.watch("it.computerLab.hasProjectors") ? "yes" : "no"}
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
              onValueChange={(value) => form.setValue("it.server.exists", value === "yes")}
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
                      const currentSources = form.getValues("it.energySources") || [];
                      if (checked) {
                        form.setValue("it.energySources", [...currentSources, source]);
                      } else {
                        form.setValue("it.energySources", 
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
                    form.setValue("it.equipment.hasAssetRegister", checked as boolean)
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
                      <RadioGroupItem value={status} id={`equipment-status-${status}`} />
                      <Label htmlFor={`equipment-status-${status}`}>{status}</Label>
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
            <p className="text-gray-500">Select a school and verify its information</p>
            {renderSchoolSection()}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trade Information</h2>
            <p className="text-gray-500">Enter information about school trades and students</p>
            {renderTradesSection()}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Infrastructure</h2>
            <p className="text-gray-500">Enter details about school infrastructure</p>
            {renderInfrastructureSection()}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">IT Infrastructure</h2>
            <p className="text-gray-500">Enter information about IT equipment and facilities</p>
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