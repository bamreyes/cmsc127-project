import { useEffect, useState, useCallback } from "react";
import type { VehicleRegistration } from "@shared";
import { DataTable } from "@/components/DataTable";
import { getRegistrationColumns } from "@/components/TableColumns";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/DeleteDialog";
import { FilterRegistrationModal } from "@/components/modals/FilterModal";
import { CreateRegistrationModal } from "@/components/modals/CreateModal";
import { EditRegistrationModal } from "@/components/modals/EditModal";

const RegistrationsPage = () => {
    const [registrations, setRegistrations] = useState<VehicleRegistration[]>([]);
    const [allRegistrations, setAllRegistrations] = useState<VehicleRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        registration_number: string | number;
    }>({
        isOpen: false,
        registration_number: "",
    });
    const [editModal, setEditModal] = useState<{
        isOpen: boolean;
        registration: VehicleRegistration | null;
    }>({
        isOpen: false,
        registration: null,
    });

    const fetchRegistrations = useCallback(async () => {
        try {
            const [regRes, vehRes, drvRes] = await Promise.all([
                api("/registrations"),
                api("/vehicles"),
                api("/drivers"),
            ]);

            const regResult = await regRes.json();
            const vehResult = await vehRes.json();
            const drvResult = await drvRes.json();

            const drivers = drvResult.data || [];
            const vehicles = vehResult.data || [];
            const registrationsData = regResult.data || [];

            const mapped = registrationsData.map((r: any) => {
                const vehicle = vehicles.find((v: any) => v.plate_number === r.plate_number);
                const owner = vehicle ? drivers.find((d: any) => d.license_number === vehicle.license_number) : null;
                return {
                    ...r,
                    owner_name: owner?.full_name,
                    license_number: owner?.license_number,
                };
            });

            setRegistrations(mapped);
            setAllRegistrations(mapped);
        } catch (error) {
            console.error("Failed to fetch registrations:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

    const handleDeleteClick = (registration_number: string | number) => {
        setDeleteModal({ isOpen: true, registration_number });
    };

    const confirmDelete = async () => {
        const { registration_number } = deleteModal;
        setDeleteModal(prev => ({ ...prev, isOpen: false }));
        try {
            const response = await api(`/registrations/${registration_number}`, { method: "DELETE" });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.statusText}`);
            }
            toast.success("Registration deleted successfully");
            await fetchRegistrations();
        } catch (error) {
            toast.error("Failed to delete registration", {
                description: error instanceof Error ? error.message : "An unexpected error occurred",
            });
        }
    };

    return (
        <div className = "w-full space-y-6 p-6">
            {loading ? (
                <div className = "flex h-64 items-center justify-center">
                    <div className = "h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
                </div>
            ) : (
                <DataTable
                    columns = {getRegistrationColumns(
                        handleDeleteClick,
                        (r) => setEditModal({ isOpen: true, registration: r })
                    )}
                    data = {registrations}
                    title = "Registrations"
                    onFilterClick = {() => setFilterModalOpen(true)}
                    onAddNewClick = {() => setCreateModalOpen(true)}
                />
            )}

            <DeleteDialog
                isOpen = {deleteModal.isOpen}
                onClose = {() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm = {confirmDelete}
                entityName = "Registration"
                entityId = {deleteModal.registration_number}
            />

            <FilterRegistrationModal
                isOpen = {filterModalOpen}
                onClose = {() => setFilterModalOpen(false)}
                onResults = {(filtered) => setRegistrations(filtered)}
                allRegistrations = {allRegistrations}
            />

            <CreateRegistrationModal
                isOpen = {createModalOpen}
                onClose = {() => setCreateModalOpen(false)}
                onSuccess = {fetchRegistrations}
            />

            {editModal.registration && (
                <EditRegistrationModal
                    isOpen = {editModal.isOpen}
                    onClose = {() => setEditModal({ isOpen: false, registration: null })}
                    onSuccess = {fetchRegistrations}
                    registration = {editModal.registration}
                />
            )}
        </div>
    );
};

export default RegistrationsPage;