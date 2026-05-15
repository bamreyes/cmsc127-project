import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName: string;
  entityId: string | number;
  warningMessage?: string | null;
  affectedItems?: string[];
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  entityName,
  entityId,
  warningMessage,
  affectedItems,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {entityName}</DialogTitle>
          <DialogDescription className="pt-2 text-slate-600 whitespace-pre-line">
            {warningMessage ||
              `Are you sure you want to delete this ${entityName} (${entityId})?`}
          </DialogDescription>
        </DialogHeader>

        {affectedItems && affectedItems.length > 0 && (
          <div className="my-2 max-h-32 overflow-y-auto rounded-md border p-3">
            <p className="mb-2 text-sm font-semibold">Affected Items:</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
              {affectedItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-sm font-medium text-slate-600 mt-2">
          This action cannot be undone. Are you sure you want to proceed?
        </div>

        <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
