import { useEffect, useState, useCallback } from "react";
import type { Vehicle } from "@shared";
import { DataTable } from "@/components/DataTable";
import { getVehicleColumns } from "@/components/TableColumns";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/DeleteDialog";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    plate_number: string;
  }>({
    isOpen: false,
    plate_number: "",
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
        const vehiclesData = vehResult.data || [];

        const mappedVehicles = vehiclesData.map((v: any) => {
          const owner = drivers.find(
            (d: any) => d.license_number === v.license_number,
          );
          return {
            ...v,
            owner_name: owner?.full_name,
          };
        });

        setVehicles(mappedVehicles);
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

  const handleDeleteClick = (plate_number: string) => {
    setDeleteModal({ isOpen: true, plate_number });
  };

  const confirmDelete = async () => {
    const { plate_number } = deleteModal;
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));

    try {
      console.log("Delete vehicle", plate_number);
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
        <DataTable columns={getVehicleColumns(handleDeleteClick)} data={vehicles} title="Vehicles" />
      )}

      <DeleteDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        entityName="Vehicle"
        entityId={deleteModal.plate_number}
      />
    </div>
  );
};

export default VehiclesPage;
