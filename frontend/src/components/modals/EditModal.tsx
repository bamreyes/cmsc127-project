import React, { useState, useEffect } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { DriverForm } from "@/components/modals/forms/DriverForm";
import type { DriverFormData } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import type { VehicleFormData } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import type { RegistrationFormData } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
import type { ViolationFormData } from "./forms/ViolationForm";
import type { Vehicle, VehicleRegistration, TrafficViolation } from "@shared";
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

export function EditVehicleModal({ isOpen, onClose, onSuccess, vehicle }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    vehicle: Vehicle;
}) {
    const [formData, setFormData] = useState<VehicleFormData>({
        plate_number: vehicle.plate_number,
        license_number: vehicle.license_number,
        engine_number: vehicle.engine_number,
        chassis_number: vehicle.chassis_number,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        vehicle_type: vehicle.vehicle_type,
        color: vehicle.color,
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setFormData({
            plate_number: vehicle.plate_number,
            license_number: vehicle.license_number,
            engine_number: vehicle.engine_number,
            chassis_number: vehicle.chassis_number,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            vehicle_type: vehicle.vehicle_type,
            color: vehicle.color,
        });
    }, [vehicle]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.year === "") {
            toast.error("Please enter the vehicle year.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await api(`/vehicles/${vehicle.plate_number}`, {
                method: "PUT",
                body: JSON.stringify({
                    engine_number: formData.engine_number,
                    chassis_number: formData.chassis_number,
                    make: formData.make,
                    model: formData.model,
                    year: formData.year,
                    vehicle_type: formData.vehicle_type,
                    color: formData.color,
                    license_number: formData.license_number,
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update vehicle.");

            toast.success("Vehicle updated successfully.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update vehicle.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Edit a Vehicle" description = "Edit the details of a vehicle (* required).">
            <form onSubmit = {handleSubmit}>
                <VehicleForm mode = "edit" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}

export function EditRegistrationModal({ isOpen, onClose, onSuccess, registration }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    registration: VehicleRegistration;
}) {
    const toDate = (val: string | Date | undefined) => val ? new Date(val) : undefined;

    const [formData, setFormData] = useState<RegistrationFormData>({
        registration_number: registration.registration_number,
        plate_number: registration.plate_number,
        registration_status: registration.registration_status,
        registration_date: toDate(registration.registration_date),
        expiration_date: toDate(registration.expiration_date),
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setFormData({
            registration_number: registration.registration_number,
            plate_number: registration.plate_number,
            registration_status: registration.registration_status,
            registration_date: toDate(registration.registration_date),
            expiration_date: toDate(registration.expiration_date),
        });
    }, [registration]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.registration_date || !formData.expiration_date) {
            toast.error("Please fill in all required date fields.");
            return;
        }

        const toDateString = (d: Date) => d.toISOString().split("T")[0];

        setSubmitting(true);
        try {
            const response = await api(`/registrations/${registration.registration_number}`, {
                method: "PUT",
                body: JSON.stringify({
                    plate_number: formData.plate_number,
                    registration_status: formData.registration_status,
                    registration_date: toDateString(formData.registration_date),
                    expiration_date: toDateString(formData.expiration_date),
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update registration.");

            toast.success("Registration updated successfully.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update registration.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Edit a Registration" description = "Edit the details of a registration (* required).">
            <form onSubmit = {handleSubmit}>
                <RegistrationForm mode = "edit" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}

export function EditViolationModal({ isOpen, onClose, onSuccess, violation }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    violation: TrafficViolation;
}) {
    const toDate = (val: string | Date | undefined) => val ? new Date(val) : undefined;

    const [formData, setFormData] = useState<ViolationFormData>({
        date: toDate(violation.date),
        license_number: violation.license_number,
        plate_number: violation.plate_number,
        location: violation.location,
        violation_type: violation.violation_type,
        fine_amount: violation.fine_amount,
        apprehending_officer: violation.apprehending_officer,
        violation_status: violation.violation_status,
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setFormData({
            date: toDate(violation.date),
            license_number: violation.license_number,
            plate_number: violation.plate_number,
            location: violation.location,
            violation_type: violation.violation_type,
            fine_amount: violation.fine_amount,
            apprehending_officer: violation.apprehending_officer,
            violation_status: violation.violation_status,
        });
    }, [violation]);

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
            const response = await api(`/violations/${violation.violation_id}`, {
                method: "PUT",
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
            if (!response.ok) throw new Error(result.message || "Failed to update violation.");

            toast.success("Violation updated successfully.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update violation.", {
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = "Edit a Violation" description = "Edit the details of a violation (* required).">
            <form onSubmit = {handleSubmit}>
                <ViolationForm mode = "edit" formData = {formData} onChange = {setFormData} />
                <div className = "mt-6 flex justify-end">
                    <Button className = "rounded-lg" type = "submit" disabled = {submitting}>
                        {submitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>
        </BaseModal>
    );
}