import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Survey {
  id: string;
  school: {
    name: string;
  };
  createdAt: string;
  collectedData?: any;
}

interface SurveyPreviewDialogProps {
  survey: Survey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SurveyPreviewDialog = ({ survey, open, onOpenChange }: SurveyPreviewDialogProps) => {
  if (!survey) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Survey Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p><strong>School:</strong> {survey.school.name}</p>
          <p><strong>Completed on:</strong> {new Date(survey.createdAt).toLocaleDateString()}</p>
          <div className="border-t pt-3">
            <h4 className="font-semibold">Collected Data:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(survey.collectedData, null, 2)}
            </pre>
          </div>
        </div>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};
