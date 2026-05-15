export type VehicleType = "Motorcycle" | "Private Car" | "Public Utility Vehicle";

export interface Vehicle {
  plate_number: string;
  engine_number: string;
  chassis_number: string;
  vehicle_type: VehicleType;
  make: string;
  model: string;
  year: number;
  color: string;
  license_number: string; // References to driver
  owner_name?: string; // Fetched via JOIN
}

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
