export interface Driver {
  license_number: string;
  full_name: string;
  date_of_birth: Date;
  sex: string;
  address: string;
  license_type: "Student Permit" | "Non-Professional" | "Professional";
  license_status: "Valid" | "Expired" | "Suspended" | "Revoked";
  issued_at: Date;
  expires_at: Date;
}
