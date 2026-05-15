import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { Button } from "@/components/ui/button";

export function FilterDriverModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Find a Driver"
            description = "Filter out the details of a driver (or more) to find."
        >
            <DriverForm mode = "search" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Find
                </Button>
            </div>
        </BaseModal>
    )
}