import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { Button } from "@/components/ui/button";

export function CreateDriverModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Driver"
            description = "Enter the details of a driver to be added (* required)."
        >
            <DriverForm mode = "create" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Submit
                </Button>
            </div>
        </BaseModal>
    )
}