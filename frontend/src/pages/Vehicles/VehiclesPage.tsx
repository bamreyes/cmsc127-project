import { useEffect, useState, useCallback } from "react";
import type { Vehicle } from "@shared";
import { DataTable } from "@/components/DataTable";
import { getVehicleColumns } from "@/components/TableColumns";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/DeleteDialog";
import { FilterVehicleModal } from "@/components/modals/FilterModal";
import { CreateVehicleModal } from "@/components/modals/CreateModal";
import { EditVehicleModal } from "@/components/modals/EditModal";

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; plate_number: string }>({
        isOpen: false,
        plate_number: "",
    });
    const [editModal, setEditModal] = useState<{ isOpen: boolean; vehicle: Vehicle | null }>({
        isOpen: false,
        vehicle: null,
    });

    const fetchVehicles = useCallback(async () => {
        try {
            const [vehRes, drvRes] = await Promise.all([api("/vehicles"), api("/drivers")]);
            if (vehRes.ok && drvRes.ok) {
                const vehResult = await vehRes.json();
                const drvResult = await drvRes.json();
                const drivers = drvResult.data || [];
                const mapped = (vehResult.data || []).map((v: any) => ({
                    ...v,
                    owner_name: drivers.find((d: any) => d.license_number === v.license_number)?.full_name,
                }));
                setVehicles(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch vehicles:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

    const handleDeleteClick = (plate_number: string) => {
        setDeleteModal({ isOpen: true, plate_number });
    };

    const confirmDelete = async () => {
        const { plate_number } = deleteModal;
        setDeleteModal(prev => ({ ...prev, isOpen: false }));
        try {
            const response = await api(`/vehicles/${plate_number}`, { method: "DELETE" });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error: ${response.statusText}`);
            }
            toast.success("Vehicle deleted successfully");
            await fetchVehicles();
        } catch (error) {
            toast.error("Failed to delete vehicle", {
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
                    columns = {getVehicleColumns(handleDeleteClick, (v) => setEditModal({ isOpen: true, vehicle: v }))}
                    data = {vehicles}
                    title = "Vehicles"
                    onFilterClick = {() => setFilterModalOpen(true)}
                    onAddNewClick = {() => setCreateModalOpen(true)}
                />
            )}

            <DeleteDialog
                isOpen = {deleteModal.isOpen}
                onClose = {() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm = {confirmDelete}
                entityName = "Vehicle"
                entityId = {deleteModal.plate_number}
            />

            <FilterVehicleModal
                isOpen = {filterModalOpen}
                onClose = {() => setFilterModalOpen(false)}
                onResults = {(filtered) => setVehicles(filtered)}
            />

            <CreateVehicleModal
                isOpen = {createModalOpen}
                onClose = {() => setCreateModalOpen(false)}
                onSuccess = {fetchVehicles}
            />

            {editModal.vehicle && (
                <EditVehicleModal
                    isOpen = {editModal.isOpen}
                    onClose = {() => setEditModal(prev => ({ ...prev, isOpen: false }))}
                    onSuccess = {fetchVehicles}
                    vehicle = {editModal.vehicle}
                />
            )}
        </div>
    );
};

export default VehiclesPage;