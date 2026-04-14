import { LicenseType, LicenseStatus, Sex } from "@/types/driver";

export interface Driver {
  license_number: string;
  full_name: string;
  date_of_birth: Date;
  sex: Sex;
  address: string;
  license_type: LicenseType;
  license_status: LicenseStatus;
  issued_at: Date;
  expires_at: Date;
}
