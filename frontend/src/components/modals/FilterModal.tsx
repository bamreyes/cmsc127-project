import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
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

export function FilterVehicleModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Find a Vehicle"
            description = "Filter out the details of a vehicle (or more) to find."
        >
            <VehicleForm mode = "search" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Find
                </Button>
            </div>
        </BaseModal>
    )
}

export function FilterRegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Find a Registration"
            description = "Filter out the details of a registration (or more) to find."
        >
            <RegistrationForm mode = "search" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Find
                </Button>
            </div>
        </BaseModal>
    )
}

export function FilterViolationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
        onClose();
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Find a Violation"
            description = "Filter out the details of a violation (or more) to find."
        >
            <ViolationForm mode = "search" />

            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleSubmit}>
                    Find
                </Button>
            </div>
        </BaseModal>
    )
}