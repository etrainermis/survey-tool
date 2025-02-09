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
    internet: boolean;
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

const CreateSurvey = ({ authState }: CreateSurveyProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const form = useForm<SurveyData>();

  useEffect(() => {
    const savedData = localStorage.getItem(`survey_draft_${authState.user?.id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [authState.user?.id]);

  const saveProgress = (data: Partial<SurveyData>) => {
    if (authState.user?.id) {
      localStorage.setItem(
        `survey_draft_${authState.user.id}`,
        JSON.stringify(data)
      );
      toast({
        title: "Progress saved",
        description: "Your survey progress has been saved automatically.",
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

  const renderSchoolSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="school-select">Select School</Label>
        <select 
          id="school-select"
          className="w-full p-2 border rounded-md"
          {...form.register("school.id")}
        >
          <option value="">Select a school...</option>
          {/* School options will be populated from API */}
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

  const renderInfrastructureSection = () => (
    <div className="space-y-6">
      {["administration block", "classroom block", "computer lab", "library", "kitchen", 
        "refectory", "smart classroom", "dormitories", "washrooms", "playgrounds", "school garden"
      ].map((type) => (
        <Card key={type} className="p-4 space-y-4">
          <h3 className="font-semibold capitalize">{type}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Size (sq. m)</Label>
              <RadioGroup 
                onValueChange={(value) => 
                  form.setValue(`infrastructure.${type}.size`, value)
                }
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
                {["ruriba", "amatafari ahiye", "block cement", "rukarakara", 
                  "ibiti n'ibyondo", "ibyuma", "amabati", "amategura", "amakara", 
                  "cement", "pavement"
                ].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`material-${material}`}
                      onCheckedChange={(checked) => {
                        const currentMaterials = form.getValues(`infrastructure.${type}.materials`) || [];
                        if (checked) {
                          form.setValue(`infrastructure.${type}.materials`, 
                            [...currentMaterials, material]
                          );
                        } else {
                          form.setValue(`infrastructure.${type}.materials`,
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
                {...form.register(`infrastructure.${type}.constructionYear`)}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup 
                onValueChange={(value) => 
                  form.setValue(`infrastructure.${type}.status`, value)
                }
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
      ))}
    </div>
  );

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
          <div className="space-y-2">
            <Label>Connected with LAN</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has-lan"
                onCheckedChange={(checked) => 
                  form.setValue("it.computerLab.hasLAN", checked as boolean)
                }
              />
              <Label htmlFor="has-lan">Yes</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Has Projectors</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has-projectors"
                onCheckedChange={(checked) => {
                  form.setValue("it.computerLab.hasProjectors", checked as boolean);
                }}
              />
              <Label htmlFor="has-projectors">Yes</Label>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">Internet & Server</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Internet Available</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has-internet"
                onCheckedChange={(checked) => 
                  form.setValue("it.internet", checked as boolean)
                }
              />
              <Label htmlFor="has-internet">Yes</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Has Server</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has-server"
                onCheckedChange={(checked) => 
                  form.setValue("it.server.exists", checked as boolean)
                }
              />
              <Label htmlFor="has-server">Yes</Label>
            </div>
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
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateSurvey;
