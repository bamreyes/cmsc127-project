export type RegistrationStatus = "Active" | "Expired" | "Suspended";
export type DateField = "registration_date" | "expiration_date";

export interface RegistrationFilter {
    registration_status: RegistrationStatus;
    date_field?: DateField;
    min_date?: Date | null;
    max_date?: Date | null;
}