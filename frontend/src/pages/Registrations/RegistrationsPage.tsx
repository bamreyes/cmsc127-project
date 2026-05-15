import { useEffect, useState, useCallback } from "react";
import type { VehicleRegistration } from "@shared";
import { DataTable } from "@/components/DataTable";
import { getRegistrationColumns } from "@/components/TableColumns";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/DeleteDialog";

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<VehicleRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    registration_number: string | number;
  }>({
    isOpen: false,
    registration_number: "",
  });

  const fetchRegistrations = useCallback(async () => {
    try {
      const [regRes, vehRes, drvRes] = await Promise.all([
        api("/registrations"),
        api("/vehicles"),
        api("/drivers"),
      ]);

      if (regRes.ok && vehRes.ok && drvRes.ok) {
        const regResult = await regRes.json();
        const vehResult = await vehRes.json();
        const drvResult = await drvRes.json();

        const drivers = drvResult.data || [];
        const vehicles = vehResult.data || [];
        const registrationsData = regResult.data || [];

        const mappedRegistrations = registrationsData.map((r: any) => {
          const vehicle = vehicles.find((v: any) => v.plate_number === r.plate_number);
          const owner = vehicle ? drivers.find((d: any) => d.license_number === vehicle.license_number) : null;
          return {
            ...r,
            owner_name: owner?.full_name,
            license_number: owner?.license_number,
          };
        });

        setRegistrations(mappedRegistrations);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleDeleteClick = (registration_number: string | number) => {
    setDeleteModal({ isOpen: true, registration_number });
  };

  const confirmDelete = async () => {
    const { registration_number } = deleteModal;
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));

    try {
      console.log("Delete registration", registration_number);
      const response = await api(`/registrations/${registration_number}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      toast.success("Registration deleted successfully");

      await fetchRegistrations();
    } catch (error) {
      toast.error("Failed to delete registration", {
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
        <DataTable columns={getRegistrationColumns(handleDeleteClick)} data={registrations} title="Registrations" />
      )}

      <DeleteDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        entityName="Registration"
        entityId={deleteModal.registration_number}
      />
    </div>
  );
};

export default RegistrationsPage;
