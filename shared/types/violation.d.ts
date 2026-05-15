export type ViolationStatus = "Unpaid" | "Paid" | "Contested";

export interface TrafficViolation {
  violation_id: number;
  date: string | Date;
  location: string;
  fine_amount: number;
  apprehending_officer: string;
  violation_status: ViolationStatus;
  violation_type: string;
  license_number: string; // References to driver
  plate_number: string; // References to vehicle
  violator_name?: string; // Not in the table
}

export interface ViolationFilter {
  violation_id?: number | null;
  min_date?: string | Date | null;
  max_date?: string | Date | null;
  location?: string | null;
  min_fine_amount?: number | null;
  max_fine_amount?: number | null;
  apprehending_officer?: string | null;
  violation_status?: ViolationStatus | null;
  violation_type?: string | null;
  license_number?: string | null;
  plate_number?: string | null;
}
