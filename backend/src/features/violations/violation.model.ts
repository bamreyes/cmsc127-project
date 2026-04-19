import { ViolationStatus } from "@/types/violation";

export interface TrafficViolation {
  violation_id: number;
  date: Date;
  region: string;
  province: string;
  city_municipality: string;
  fine_amount: number;
  apprehending_officer: string;
  violation_status: ViolationStatus;
  violation_type: string;
  license_number: string; // References to driver
  plate_number: string; // References to vehicle
}
