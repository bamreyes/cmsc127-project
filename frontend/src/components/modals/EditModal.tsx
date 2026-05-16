import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
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

export function EditVehicleModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Edit a Vehicle"
            description = "Edit the details of a vehicle (* required)."
        >
            <VehicleForm mode = "edit" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Update
                </Button>
            </div>
        </BaseModal>
    )
}

export function EditRegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Edit a Registration"
            description = "Edit the details of a registration (* required)."
        >
            <RegistrationForm mode = "edit" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Update
                </Button>
            </div>
        </BaseModal>
    )
}

export function EditViolationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Edit a Violation"
            description = "Edit the details of a violation (* required)."
        >
            <ViolationForm mode = "edit" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Update
                </Button>
            </div>
        </BaseModal>
    )
}