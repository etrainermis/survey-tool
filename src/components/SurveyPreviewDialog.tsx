import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SurveyPreviewDialogProps {
  survey: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SurveyPreviewDialog({
  survey,
  open,
  onOpenChange,
}: SurveyPreviewDialogProps) {
  if (!survey) return null;
  const parseSchoolSurveyData = (data: string | null) => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing schoolSurveyData:", error);
      return null;
    }
  };

  // Inside your component:
  const schoolData = parseSchoolSurveyData(survey?.schoolSurveyData);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Survey Details - {survey.school.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {/* School Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">School Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{survey.school.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {schoolData?.school?.status ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{survey.school.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{survey.school.contact?.phone}</p>
                  <p className="text-sm">{survey.school.phoneNumber}</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Trades Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Trades</h3>
              <div className="space-y-4">
                {survey.school.trades?.map((trade: any, tradeIndex: number) => {
                  const matchedTrade = schoolData.trades?.[tradeIndex]; // Match trade from schoolData

                  return (
                    <div key={tradeIndex} className="border rounded-lg p-4">
                      {/* Display the correct trade name */}
                      <h4 className="font-medium mb-2">{trade.trade.name}</h4>

                      <div className="grid grid-cols-3 gap-4">
                        {matchedTrade?.levels?.map(
                          (level: any, levelIndex: number) => (
                            <div key={levelIndex} className="space-y-2">
                              <p className="text-sm font-medium">
                                Level {levelIndex + 3}
                              </p>
                              <div className="text-sm">
                                <p>Classrooms: {level.classrooms}</p>
                                <p>Male Students: {level.maleStudents}</p>
                                <p>Female Students: {level.femaleStudents}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <Separator />

            {/* Infrastructure */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Infrastructure</h3>
              <div className="grid grid-cols-2 gap-4">
                {schoolData.infrastructure?.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium capitalize mb-2">{item.type}</h4>
                    <div className="space-y-2 text-sm">
                      <p>Size: {item.size} sq. m</p>
                      <p>Construction Year: {item.constructionYear}</p>
                      <p>Status: {item.status}</p>
                      <div>
                        <p className="text-muted-foreground">Materials:</p>
                        <p>{item.materials?.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* IT Infrastructure */}
            <section>
              <h3 className="text-lg font-semibold mb-4">IT Infrastructure</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Computer Lab</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                      Total Computers:{" "}
                      {schoolData.itInfrastructure?.computerLab.totalComputers}
                    </p>
                    <p>
                      Working:{" "}
                      {
                        schoolData.itInfrastructure?.computerLab
                          .workingComputers
                      }
                    </p>
                    <p>
                      Working:{" "}
                      {
                        schoolData.itInfrastructure?.computerLab
                          .nonWorkingComputers
                      }
                    </p>
                    <p>
                      Has LAN:{" "}
                      {schoolData.itInfrastructure?.computerLab.hasLAN
                        ? "Yes"
                        : "No"}
                    </p>
                    <p>
                      Has Projectors:{" "}
                      {schoolData.itInfrastructure?.computerLab.hasProjectors
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Internet & Equipment</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                      Internet Available:{" "}
                      {schoolData.it?.internet ? "Yes" : "No"}
                    </p>
                    <p>
                      Has Server: {schoolData.it?.server?.exists ? "Yes" : "No"}
                    </p>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Energy Sources:</p>
                      <p>
                        {schoolData.itInfrastructure?.energySources?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
