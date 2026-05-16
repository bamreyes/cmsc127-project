import React, { useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { DriverForm, defaultDriverFormData } from "@/components/modals/forms/DriverForm";
import type { DriverFormData } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function CreateDriverModal({ isOpen, onClose, onSuccess }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState<DriverFormData>(defaultDriverFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.date_of_birth || !formData.issued_at || !formData.expires_at) {
            toast.error("Please fill in all required date fields.");
            return;
        }

        const toDateString = (d: Date) => d.toISOString().split("T")[0];

        setSubmitting(true);
        try {
            const response = await api("/drivers", {
                method: "POST",
                body: JSON.stringify({
                    license_number: formData.license_number,
                    full_name: formData.full_name,
                    date_of_birth: toDateString(formData.date_of_birth),
                    sex: formData.sex,
                    address: formData.address,
                    license_type: formData.license_type,
                    license_status: formData.license_status,
                    issued_at: toDateString(formData.issued_at),
                    expires_at: toDateString(formData.expires_at),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create driver.");
            }

            toast.success("Driver created successfully.");
            setFormData(defaultDriverFormData);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create driver.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal
            isOpen = {isOpen}
            onClose = {onClose}
            title = "Add a Driver"
            description = "Enter the details of a driver to be added (* required)."
        >
            <form onSubmit = {handleSubmit}>
                <DriverForm
                    mode = "create"
                    formData = {formData}
                    onChange = {setFormData}
                />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
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