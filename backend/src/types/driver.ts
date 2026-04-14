export type LicenseType = "Student Permit" | "Non-Professional" | "Professional";
export type LicenseStatus = "Valid" | "Expired" | "Suspended" | "Revoked";
export type Sex = "M" | "F";

export interface DriverFilter {
  sex?: Sex | null;
  license_type?: LicenseType | null;
  license_status?: LicenseStatus | null;
  min_date?: Date | null;
  max_date?: Date | null;
}
