export interface VehicleRegistration {
  registration_number: number;
  registration_status: "Active" | "Expired" | "Suspended";
  registration_date: Date;
  expiration_date: Date;
  plate_number: string; // References to vehicle
}
