import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { Button } from "@/components/ui/button";

export function EditDriverModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Edit a Driver"
            description = "Edit the details of a driver (* required)."
        >
            <DriverForm mode = "edit" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Update
                </Button>
            </div>
        </BaseModal>
    )
}