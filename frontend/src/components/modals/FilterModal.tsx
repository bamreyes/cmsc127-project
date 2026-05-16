import React, { useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import { DriverForm, defaultDriverFilterData } from "@/components/modals/forms/DriverForm";
import type { DriverFilterData } from "@/components/modals/forms/DriverForm";
import { VehicleForm } from "./forms/VehicleForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { ViolationForm } from "./forms/ViolationForm";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Driver } from "@shared";

export function FilterDriverModal({ isOpen, onClose, onResults }: {
    isOpen: boolean;
    onClose: () => void;
    onResults: (drivers: Driver[]) => void;
}) {
    const [filterData, setFilterData] = useState<DriverFilterData>(defaultDriverFilterData);
    const [submitting, setSubmitting] = useState(false);

    const handleFind = async () => {
        const toDateString = (d: Date) => d.toISOString().split("T")[0];

        // Build query params from checked boxes and filled fields.
        const params = new URLSearchParams();

        if (filterData.license_number)  params.set("license_number", filterData.license_number);
        if (filterData.full_name)      params.set("full_name", filterData.full_name); 
        if (filterData.address)         params.set("address", filterData.address);

        // Sex: only send if exactly one is checked (backend takes a single value).
        const sexValues = [
            filterData.sex_m && "M",
            filterData.sex_f && "F",
        ].filter(Boolean) as string[];
        if (sexValues.length === 1) params.set("sex", sexValues[0]);

        // License type: send first checked (or none if multiple/none).
        const typeValues = [
            filterData.license_type_nonpro   && "Non-Professional",
            filterData.license_type_pro      && "Professional",
            filterData.license_type_student  && "Student Permit",
        ].filter(Boolean) as string[];
        if (typeValues.length === 1) params.set("license_type", typeValues[0]);

        // License status: send first checked.
        const statusValues = [
            filterData.license_status_valid     && "Valid",
            filterData.license_status_expired   && "Expired",
            filterData.license_status_suspended && "Suspended",
            filterData.license_status_revoked   && "Revoked",
        ].filter(Boolean) as string[];
        if (statusValues.length === 1) params.set("license_status", statusValues[0]);

        if (filterData.date_of_birth_min) params.set("min_bdate", toDateString(filterData.date_of_birth_min));
        if (filterData.date_of_birth_max) params.set("max_bdate", toDateString(filterData.date_of_birth_max));

        setSubmitting(true);
        try {
            const response = await api(`/drivers/filter?${params.toString()}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Filter failed.");
            }

            onResults(result.data || []);
            onClose();
        } catch (error) {
            toast.error("Failed to filter drivers.", {
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
            title = "Find a Driver"
            description = "Filter out the details of a driver (or more) to find."
        >
            <DriverForm
                mode = "search"
                filterData = {filterData}
                onFilterChange = {setFilterData}
            />
            <div className = "mt-6 flex justify-end">
                <Button className = "rounded-lg" onClick = {handleFind} disabled = {submitting}>
                    {submitting ? "Searching..." : "Find"}
                </Button>
            </div>
        </BaseModal>
    );
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