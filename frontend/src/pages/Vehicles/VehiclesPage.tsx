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
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    plate_number: string;
    warningMessage: string | null;
    affectedItems: string[];
    disableConfirm: boolean;
  }>({
    isOpen: false,
    plate_number: "",
    warningMessage: null,
    affectedItems: [],
    disableConfirm: false,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    vehicle: Vehicle | null;
  }>({
    isOpen: false,
    vehicle: null,
  });

  const fetchVehicles = useCallback(async () => {
    try {
      const [vehRes, drvRes] = await Promise.all([
        api("/vehicles"),
        api("/drivers"),
      ]);
      if (vehRes.ok && drvRes.ok) {
        const vehResult = await vehRes.json();
        const drvResult = await drvRes.json();
        const drivers = drvResult.data || [];
        const mapped = (vehResult.data || []).map((v: any) => ({
          ...v,
          owner_name: drivers.find(
            (d: any) => d.license_number === v.license_number,
          )?.full_name,
        }));
        setVehicles(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleDeleteClick = async (plate_number: string) => {
    try {
      const regsResponse = await api(`/registrations/plate/${plate_number}`);
      const violationsResponse = await api(
        `/violations/filter/vehicle?plate_number=${plate_number}`,
      );
      let warningMessage = null;
      let affectedItems: string[] = [];
      let disableConfirm = false;
      let activeItemsList: string[] = [];
      let expiredItemsList: string[] = [];

      if (regsResponse.ok) {
        const regsData = await regsResponse.json();
        const regs = regsData.data || [];

        const regsList = Array.isArray(regs)
          ? regs
          : regs.registration_number
            ? [regs]
            : [];

        const activeRegs = regsList.filter((r: any) => {
          const isStatusActive = r.registration_status === "Active";
          const isNotExpired = new Date(r.expiration_date) > new Date();
          return isStatusActive && isNotExpired;
        });

        const expiredRegs = regsList.filter((r: any) => {
          const isStatusActive = r.registration_status === "Active";
          const isNotExpired = new Date(r.expiration_date) > new Date();
          return !isStatusActive || !isNotExpired;
        });

        if (activeRegs.length > 0) {
          activeRegs.forEach((r: any) =>
            activeItemsList.push(
              `Active Registration No: ${r.registration_number} (Expires: ${new Date(r.expiration_date).toISOString().slice(0, 10)})`,
            ),
          );
          disableConfirm = true;
        }

        if (expiredRegs.length > 0) {
          expiredRegs.forEach((r: any) =>
            expiredItemsList.push(
              `Expired Registration No: ${r.registration_number} (Expired: ${new Date(r.expiration_date).toISOString().slice(0, 10)})`,
            ),
          );
        }
      }

      if (violationsResponse.ok) {
        const violationsData = await violationsResponse.json();
        const allViolations = violationsData.data || [];
        const violations = allViolations.filter((v: any) => v.violation_status !== "Paid");
        const violationsCount = violations.length;

        if (violationsCount > 0) {
          violations.forEach((v: any) =>
            activeItemsList.push(
              `Violation ID ${v.violation_id}: ${v.violation_type} (${v.violation_status})`,
            ),
          );
          disableConfirm = true;
        }
      }

      if (disableConfirm) {
        affectedItems = activeItemsList;
        warningMessage =
          "Deletion is restricted. This vehicle has an active registration or outstanding traffic violations associated with it in the system. Active registrations must expire before deletion is allowed.";
      } else {
        affectedItems = expiredItemsList;
        if (expiredItemsList.length > 0) {
          warningMessage =
            "This vehicle has expired registrations. Deleting the vehicle will automatically clean up these expired records. Are you sure you want to proceed?";
        }
      }

      setDeleteModal({
        isOpen: true,
        plate_number,
        warningMessage,
        affectedItems,
        disableConfirm,
      });
    } catch (error) {
      console.error("Failed to check vehicle dependencies:", error);
      setDeleteModal({
        isOpen: true,
        plate_number,
        warningMessage: null,
        affectedItems: [],
        disableConfirm: false,
      });
    }
  };

  const confirmDelete = async () => {
    const { plate_number } = deleteModal;
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
    try {
      const response = await api(`/vehicles/${plate_number}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }
      toast.success("Vehicle deleted successfully");
      await fetchVehicles();
    } catch (error) {
      toast.error("Failed to delete vehicle", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
        </div>
      ) : (
        <DataTable
          columns={getVehicleColumns(handleDeleteClick, (v) =>
            setEditModal({ isOpen: true, vehicle: v }),
          )}
          data={vehicles}
          title="Vehicles"
          onFilterClick={() => setFilterModalOpen(true)}
          onAddNewClick={() => setCreateModalOpen(true)}
        />
      )}

      <DeleteDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        entityName="Vehicle"
        entityId={deleteModal.plate_number}
        warningMessage={deleteModal.warningMessage}
        affectedItems={deleteModal.affectedItems}
        disableConfirm={deleteModal.disableConfirm}
      />

      <FilterVehicleModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onResults={(filtered) => setVehicles(filtered)}
      />

      <CreateVehicleModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchVehicles}
      />

      {editModal.vehicle && (
        <EditVehicleModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, vehicle: null })}
          onSuccess={fetchVehicles}
          vehicle={editModal.vehicle}
        />
      )}
    </div>
  );
};

export default VehiclesPage;
