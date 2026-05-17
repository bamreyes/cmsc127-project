import React, { useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { DriverForm, defaultDriverFormData } from "@/components/modals/forms/DriverForm";
import type { DriverFormData } from "@/components/modals/forms/DriverForm";
import { VehicleForm, defaultVehicleFormData } from "./forms/VehicleForm";
import type { VehicleFormData } from "./forms/VehicleForm";
import { RegistrationForm, defaultRegistrationFormData } from "./forms/RegistrationForm";
import type { RegistrationFormData } from "./forms/RegistrationForm";
import { ViolationForm, defaultViolationFormData } from "./forms/ViolationForm";
import type { ViolationFormData } from "./forms/ViolationForm";
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

export function CreateVehicleModal({ isOpen, onClose, onSuccess }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState<VehicleFormData>(defaultVehicleFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.year === "") {
            toast.error("Please enter the vehicle year.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await api("/vehicles", {
                method: "POST",
                body: JSON.stringify({
                    plate_number: formData.plate_number,
                    license_number: formData.license_number,
                    engine_number: formData.engine_number,
                    chassis_number: formData.chassis_number,
                    make: formData.make,
                    model: formData.model,
                    year: formData.year,
                    vehicle_type: formData.vehicle_type,
                    color: formData.color,
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create vehicle.");

            toast.success("Vehicle created successfully.");
            setFormData(defaultVehicleFormData);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create vehicle.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Add a Vehicle" description = "Enter the details of a vehicle to be added (* required).">
            <form onSubmit = {handleSubmit}>
                <VehicleForm mode = "create" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}

export function CreateRegistrationModal({ isOpen, onClose, onSuccess }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState<RegistrationFormData>(defaultRegistrationFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.registration_date || !formData.expiration_date) {
            toast.error("Please fill in all required date fields.");
            return;
        }

        if (formData.registration_number === "") {
            toast.error("Please enter a registration number.");
            return;
        }

        const toDateString = (d: Date) => d.toISOString().split("T")[0];

        setSubmitting(true);
        try {
            const response = await api("/registrations", {
                method: "POST",
                body: JSON.stringify({
                    registration_number: formData.registration_number,
                    plate_number: formData.plate_number,
                    registration_status: formData.registration_status,
                    registration_date: toDateString(formData.registration_date),
                    expiration_date: toDateString(formData.expiration_date),
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create registration.");

            toast.success("Registration created successfully.");
            setFormData(defaultRegistrationFormData);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create registration.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Add a Registration" description = "Enter the details of a registration to be added (* required).">
            <form onSubmit = {handleSubmit}>
                <RegistrationForm mode = "create" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}

export function CreateViolationModal({ isOpen, onClose, onSuccess }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState<ViolationFormData>(defaultViolationFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.date) {
            toast.error("Please select a violation date.");
            return;
        }

        if (formData.fine_amount === "") {
            toast.error("Please enter the fine amount.");
            return;
        }

        const toDateString = (d: Date) => d.toISOString().split("T")[0];

        setSubmitting(true);
        try {
            const response = await api("/violations", {
                method: "POST",
                body: JSON.stringify({
                    date: toDateString(formData.date),
                    license_number: formData.license_number,
                    plate_number: formData.plate_number,
                    location: formData.location,
                    violation_type: formData.violation_type,
                    fine_amount: formData.fine_amount,
                    apprehending_officer: formData.apprehending_officer,
                    violation_status: formData.violation_status,
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create violation.");

            toast.success("Violation created successfully.");
            setFormData(defaultViolationFormData);
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create violation.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Add a Violation" description = "Enter the details of a violation to be added (* required).">
            <form onSubmit = {handleSubmit}>
                <ViolationForm mode = "create" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}