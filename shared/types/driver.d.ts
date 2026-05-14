export type LicenseType = "Student Permit" | "Non-Professional" | "Professional";
export type LicenseStatus = "Valid" | "Expired" | "Suspended" | "Revoked";
export type Sex = "M" | "F";

export interface Driver {
  license_number: string;
  full_name: string;
  date_of_birth: string | Date; // Using string | Date to support JSON serialization
  sex: Sex;
  address: string;
  license_type: LicenseType;
  license_status: LicenseStatus;
  issued_at: string | Date;
  expires_at: string | Date;
}

export interface DriverFilter {
  license_number?: string | null;
  full_name?: string | null;
  sex?: Sex | null;
  license_type?: LicenseType | null;
  license_status?: LicenseStatus | null;
  min_bdate?: string | Date | null;
  max_bdate?: string | Date | null;
  address?: string | null;
  min_issued_at?: string | Date | null;
  max_issued_at?: string | Date | null;
  min_expires_at?: string | Date | null;
  max_expires_at?: string | Date | null;
}
