export interface Vehicle {
  plate_number: string;
  engine_number: string;
  chassis_number: string;
  vehicle_type: "Motorcycle" | "Private Car" | "Public Utility Vehicle";
  make: string;
  model: string;
  year: number;
  color: string;
  license_number: string; // References to driver
}
