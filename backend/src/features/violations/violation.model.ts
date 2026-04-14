import { RegistrationStatus, ViolationStatus } from "@/types/violation";

export interface TrafficViolation {
  id: number;
  registration_status: RegistrationStatus;
  date: Date;
  location: string;
  fine_amount: number;
  apprehending_officer: string;
  violation_status: ViolationStatus;
  violation_type: string;
  license_number: string; // References to driver
  plate_number: string; // References to vehicle
}
