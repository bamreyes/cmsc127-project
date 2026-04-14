import { RegistrationStatus } from "@/types/registration";

export interface VehicleRegistration {
  registration_number: number;
  registration_status: RegistrationStatus;
  registration_date: Date;
  expiration_date: Date;
  plate_number: string; // References to vehicle
}
