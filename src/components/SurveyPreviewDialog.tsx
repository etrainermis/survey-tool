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
                  <p className="font-medium">{survey.school.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{survey.school.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{survey.school.contact?.phone}</p>
                  <p className="text-sm">{survey.school.contact?.email}</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Trades Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Trades</h3>
              <div className="space-y-4">
                {survey.school.trades?.map((trade: any) => (
                  <div key={trade.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{trade.name}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {trade.levels?.map((level: any) => (
                        <div key={level.level} className="space-y-2">
                          <p className="text-sm font-medium">Level {level.level}</p>
                          <div className="text-sm">
                            <p>Classrooms: {level.classrooms}</p>
                            <p>Male Students: {level.students.male}</p>
                            <p>Female Students: {level.students.female}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Infrastructure */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Infrastructure</h3>
              <div className="grid grid-cols-2 gap-4">
                {survey.infrastructure?.map((item: any, index: number) => (
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
                    <p>Total Computers: {survey.it?.computerLab.totalComputers}</p>
                    <p>Working: {survey.it?.computerLab.workingComputers}</p>
                    <p>Has LAN: {survey.it?.computerLab.hasLAN ? "Yes" : "No"}</p>
                    <p>
                      Has Projectors:{" "}
                      {survey.it?.computerLab.hasProjectors ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Internet & Equipment</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>Internet Available: {survey.it?.internet ? "Yes" : "No"}</p>
                    <p>Has Server: {survey.it?.server?.exists ? "Yes" : "No"}</p>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Energy Sources:</p>
                      <p>{survey.it?.energySources?.join(", ")}</p>
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