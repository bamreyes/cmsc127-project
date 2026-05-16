import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
import { Button } from "@/components/ui/button";

export function CreateDriverModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Driver"
            description = "Enter the details of a driver to be added (* required)."
        >
            <form>
                <DriverForm mode = "create" />

                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" onClick = {handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}

export function CreateVehicleModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new vehicle...");
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Vehicle"
            description = "Enter the details of a vehicle to be added (* required)."
        >
            <form>
                <VehicleForm mode = "create" />

                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" onClick = {handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}

export function CreateRegistrationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new vehicle...");
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Registration"
            description = "Enter the details of a registration to be added (* required)."
        >
            <form>
                <RegistrationForm mode = "create" />

                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" onClick = {handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}

export function CreateViolationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const handleSubmit = () => {
        // To put stuff here soon.
        console.log("Submitting new driver...");
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Violation"
            description = "Enter the details of a violation to be added (* required)."
        >
            <form>
                <ViolationForm mode = "create" />

                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" onClick = {handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}