import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SurveyPreviewDialogProps {
  survey: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SurveyPreviewDialog({ survey, open, onOpenChange }: SurveyPreviewDialogProps) {
  if (!survey) return null;

  const parseSchoolSurveyData = (data: string | null) => {
    try {
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error parsing schoolSurveyData:", error);
      return {};
    }
  };

  // Ensure the parsed data is always an object
  const schoolData = parseSchoolSurveyData(survey?.generalInformation) || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-blue-700">
            Survey Details - {survey?.school?.name ?? "Unknown School"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {/* School Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-blue-700">School Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{survey?.school?.name ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">{schoolData?.school?.status ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{survey?.school?.category ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium text-gray-900">{survey?.school?.contact?.phone ?? "N/A"}</p>
                  <p className="text-sm text-gray-600">{survey?.school?.phoneNumber ?? "N/A"}</p>
                </div>
              </div>
            </section>

            <Separator className="bg-blue-100" />

            {/* Trades Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-blue-700">Trades</h3>
              <div className="space-y-4">
                {(survey?.school?.trades ?? []).map((trade: any, tradeIndex: number) => {
                  const matchedTrade = schoolData?.trades?.[tradeIndex] ?? {};

                  return (
                    <div key={tradeIndex} className="border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-blue-600">{trade?.trade?.name ?? "Unknown Trade"}</h4>

                      <div className="grid grid-cols-3 gap-4">
                        {(matchedTrade?.levels ?? []).map((level: any, levelIndex: number) => (
                          <div key={levelIndex} className="space-y-2">
                            <p className="text-sm font-medium text-blue-600">Level {levelIndex + 3}</p>
                            <div className="text-sm text-gray-700">
                              <p>Classrooms: {level?.classrooms ?? "N/A"}</p>
                              <p>Male Students: {level?.maleStudents ?? "N/A"}</p>
                              <p>Female Students: {level?.femaleStudents ?? "N/A"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <Separator className="bg-blue-100" />

            {/* Infrastructure */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-blue-700">Infrastructure</h3>
              <div className="grid grid-cols-2 gap-4">
                {(schoolData?.infrastructureAndEnvironment ?? []).map((item: any, index: number) => (
                  <div key={index} className="border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium capitalize mb-2 text-blue-600">{item?.type ?? "Unknown Type"}</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Size: {item?.size ?? "N/A"} sq. m</p>
                      <p>Construction Year: {item?.constructionYear ?? "N/A"}</p>
                      <p>Status: {item?.status ?? "N/A"}</p>
                      <div>
                        <p className="text-gray-500">Materials:</p>
                        <p>{(item?.materials ?? []).join(", ") || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-blue-100" />

            {/* IT Infrastructure */}
            <section>
              <h3 className="text-lg font-semibold mb-4 text-blue-700">IT Infrastructure</h3>
              <div className="space-y-4">
                <div className="border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-blue-600">Computer Lab</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <p>Total Computers: {schoolData?.itInfrastructure?.computerLab?.totalComputers ?? "N/A"}</p>
                    <p>Working: {schoolData?.itInfrastructure?.computerLab?.workingComputers ?? "N/A"}</p>
                    <p>Non-Working: {schoolData?.itInfrastructure?.computerLab?.nonWorkingComputers ?? "N/A"}</p>
                    <p>Has LAN: {schoolData?.itInfrastructure?.computerLab?.hasLAN ? "Yes" : "No"}</p>
                    <p>Has Projectors: {schoolData?.itInfrastructure?.computerLab?.hasProjectors ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-blue-600">Internet & Equipment</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <p>Internet Available: {schoolData?.it?.internet ? "Yes" : "No"}</p>
                    <p>Has Server: {schoolData?.it?.server?.exists ? "Yes" : "No"}</p>
                    <div className="col-span-2">
                      <p className="text-gray-500">Energy Sources:</p>
                      <p>{(schoolData?.itInfrastructure?.energySources ?? []).join(", ") || "N/A"}</p>
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
