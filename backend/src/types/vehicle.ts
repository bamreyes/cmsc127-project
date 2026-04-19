export type VehicleType = "Motorcycle" | "Private Car" | "Public Utility Vehicle";

export interface VehicleFilter {
  plate_number?: string | null;
  engine_number?: string | null;
  chassis_number?: string | null;
  vehicle_type?: VehicleType | null;
  make?: string | null;
  model?: string | null;
  min_year?: number | null;
  max_year?: number | null;
  color?: string | null;
}
