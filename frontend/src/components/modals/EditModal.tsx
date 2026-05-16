import React, { useState, useEffect } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import type { DriverFormData } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Driver } from "@shared";

export function EditDriverModal({ isOpen, onClose, onSuccess, driver }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    driver: Driver;
}) {
    const toDate = (val: string | Date | undefined) =>
        val ? new Date(val) : undefined;

    const [formData, setFormData] = useState<DriverFormData>({
        license_number: driver.license_number,
        full_name: driver.full_name,
        date_of_birth: toDate(driver.date_of_birth),
        sex: driver.sex,
        address: driver.address,
        license_type: driver.license_type,
        license_status: driver.license_status,
        issued_at: toDate(driver.issued_at),
        expires_at: toDate(driver.expires_at),
    });

    // Re-sync if a different row's edit is opened.
    useEffect(() => {
        setFormData({
            license_number: driver.license_number,
            full_name: driver.full_name,
            date_of_birth: toDate(driver.date_of_birth),
            sex: driver.sex,
            address: driver.address,
            license_type: driver.license_type,
            license_status: driver.license_status,
            issued_at: toDate(driver.issued_at),
            expires_at: toDate(driver.expires_at),
        });
    }, [driver]);

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
            const response = await api(`/drivers/${driver.license_number}`, {
                method: "PUT",
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
                throw new Error(result.message || "Failed to update driver.");
            }

            toast.success("Driver updated successfully.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update driver.", {
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
            title = "Edit a Driver"
            description = "Edit the details of a driver (* required)."
        >
            <form onSubmit = {handleSubmit}>
                <DriverForm
                    mode = "edit"
                    formData = {formData}
                    onChange = {setFormData}
                />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
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