export interface TrafficViolation {
  id: number;
  registration_status: "Active" | "Expired" | "Suspended";
  date: Date;
  location: string;
  fine_amount: number;
  apprehending_officer: string;
  violation_status: "Unpaid" | "Paid" | "Contested";
  violation_type: string;
  license_number: string; // References to driver
  plate_number: string; // References to vehicle
}
