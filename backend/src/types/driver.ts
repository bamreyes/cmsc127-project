export type LicenseType = "Student Permit" | "Non-Professional" | "Professional";
export type LicenseStatus = "Valid" | "Expired" | "Suspended" | "Revoked";
export type Sex = "M" | "F";

export interface DriverFilter {
  license_number?: string | null;
  full_name?: string | null;
  sex?: Sex | null;
  license_type?: LicenseType | null;
  license_status?: LicenseStatus | null;
  min_bdate?: Date | null;
  max_bdate?: Date | null;
  address?: string | null;
  min_issued_at?: Date | null;
  max_issued_at?: Date | null;
  min_expires_at?: Date | null;
  max_expires_at?: Date | null;
}
