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
  disableConfirm?: boolean;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  entityName,
  entityId,
  warningMessage,
  affectedItems,
  disableConfirm = false,
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{disableConfirm ? "Deletion Restricted" : `Delete ${entityName}`}</DialogTitle>
          <DialogDescription className="pt-2 text-slate-600 whitespace-pre-line">
            {warningMessage ||
              `Are you sure you want to delete this ${entityName} (${entityId})?`}
          </DialogDescription>
        </DialogHeader>

        {affectedItems && affectedItems.length > 0 && (
          <div className={`my-2 max-h-32 overflow-y-auto rounded-md border p-3 ${disableConfirm ? "border-red-200 bg-red-50 text-red-900" : "border-slate-200"}`}>
            <p className="mb-2 text-sm font-semibold">{disableConfirm ? "Blocking Dependencies Found:" : "Affected Items:"}</p>
            <ul className={`list-inside list-disc space-y-1 text-sm ${disableConfirm ? "text-red-700" : "text-slate-600"}`}>
              {affectedItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-sm font-medium text-slate-600 mt-2">
          {disableConfirm 
            ? "This item cannot be deleted because it is currently referenced by other active entities in the database. Please reassign or delete these dependencies first." 
            : "This action cannot be undone. Are you sure you want to proceed?"}
        </div>

        <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={disableConfirm}>
            {disableConfirm ? "Restricted" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
