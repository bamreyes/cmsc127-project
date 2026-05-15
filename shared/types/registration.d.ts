export type RegistrationStatus = "Active" | "Expired" | "Suspended";
export type DateField = "registration_date" | "expiration_date";

export interface VehicleRegistration {
  registration_number: number;
  registration_status: RegistrationStatus;
  registration_date: string | Date;
  expiration_date: string | Date;
  plate_number: string; // References to vehicle
  owner_name?: string; // Fetched via JOIN
  license_number?: string; // Fetched via JOIN
}

export interface RegistrationFilter {
    registration_status: RegistrationStatus;
    date_field?: DateField;
    min_date?: string | Date | null;
    max_date?: string | Date | null;
}
