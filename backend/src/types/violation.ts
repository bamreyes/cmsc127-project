export type ViolationStatus = "Unpaid" | "Paid" | "Contested";

export interface ViolationFilter {
  violation_id?: number | null;
  min_date?: Date | null;
  max_date?: Date | null;
  location?: string | null;
  min_fine_amount?: number | null;
  max_fine_amount?: number | null;
  apprehending_officer?: string | null;
  violation_status?: ViolationStatus | null;
  violation_type?: string | null;
  license_number?: string | null;
  plate_number?: string | null;
}
