import { Field, FieldDescription, FieldGroup,
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { DatePicker } from "@/components/DatePicker";
import type { LicenseStatus, LicenseType, Sex } from "@shared";

// Data shape for create/edit mode.
export interface DriverFormData {
    license_number: string;
    full_name: string;
    date_of_birth: Date | undefined;
    sex: Sex;
    address: string;
    license_type: LicenseType;
    license_status: LicenseStatus;
    issued_at: Date | undefined;
    expires_at: Date | undefined;
}

// Data shape for search/filter mode (all optional).
export interface DriverFilterData {
    license_number: string;
    full_name: string;
    date_of_birth_min: Date | undefined;
    date_of_birth_max: Date | undefined;
    sex_m: boolean;
    sex_f: boolean;
    address: string;
    license_type_nonpro: boolean;
    license_type_pro: boolean;
    license_type_student: boolean;
    license_status_valid: boolean;
    license_status_expired: boolean;
    license_status_suspended: boolean;
    license_status_revoked: boolean;
    issued_at_min: Date | undefined;
    issued_at_max: Date | undefined;
    expires_at_min: Date | undefined;
    expires_at_max: Date | undefined;
}

export const defaultDriverFormData: DriverFormData = {
    license_number: "",
    full_name: "",
    date_of_birth: undefined,
    sex: "M",
    address: "",
    license_type: "Non-Professional",
    license_status: "Valid",
    issued_at: undefined,
    expires_at: undefined,
};

export const defaultDriverFilterData: DriverFilterData = {
    license_number: "",
    full_name: "",
    date_of_birth_min: undefined,
    date_of_birth_max: undefined,
    sex_m: false,
    sex_f: false,
    address: "",
    license_type_nonpro: false,
    license_type_pro: false,
    license_type_student: false,
    license_status_valid: false,
    license_status_expired: false,
    license_status_suspended: false,
    license_status_revoked: false,
    issued_at_min: undefined,
    issued_at_max: undefined,
    expires_at_min: undefined,
    expires_at_max: undefined,
};

type Props =
    | { mode: "create" | "edit"; formData: DriverFormData; onChange: (data: DriverFormData) => void; filterData?: never; onFilterChange?: never; }
    | { mode: "search"; filterData: DriverFilterData; onFilterChange: (data: DriverFilterData) => void; formData?: never; onChange?: never; };

export function DriverForm({ mode, formData, onChange, filterData, onFilterChange }: Props) {
    const isSearch = mode === "search";

    const set = (field: keyof DriverFormData, value: any) => {
        onChange?.({ ...formData!, [field]: value });
    };

    const setFilter = (field: keyof DriverFilterData, value: any) => {
        onFilterChange?.({ ...filterData!, [field]: value });
    };

    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "License No." : "License No. *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "N01-12-345678"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.license_number : formData!.license_number}
                            onChange = {(e) => isSearch ? setFilter("license_number", e.target.value) : set("license_number", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphens.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Full Name" : "Full Name *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "Juan dela Cruz"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.full_name : formData!.full_name}
                            onChange = {(e) => isSearch ? setFilter("full_name", e.target.value) : set("full_name", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate first, middle, and last name with spaces.</FieldDescription>
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    <FieldLabel>{isSearch ? "Birthdate" : "Birthdate *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <DatePicker
                                placeholder = "Min"
                                selected = {filterData!.date_of_birth_min}
                                onSelect = {(d) => setFilter("date_of_birth_min", d)}
                            />
                            <DatePicker
                                placeholder = "Max"
                                selected = {filterData!.date_of_birth_max}
                                onSelect = {(d) => setFilter("date_of_birth_max", d)}
                            />
                        </div>
                    ) : (
                        <DatePicker
                            required
                            selected = {formData!.date_of_birth}
                            onSelect = {(d) => set("date_of_birth", d)}
                        />
                    )}
                </FieldSet>

                <FieldSet>
                    <FieldLabel>{isSearch ? "Gender" : "Gender *"}</FieldLabel>
                    {isSearch ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox
                                        id = "gender-checkbox-m"
                                        checked = {filterData!.sex_m}
                                        onCheckedChange = {(v) => setFilter("sex_m", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "gender-checkbox-m">M</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "gender-checkbox-f"
                                        checked = {filterData!.sex_f}
                                        onCheckedChange = {(v) => setFilter("sex_f", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "gender-checkbox-f">F</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup
                            value = {formData!.sex}
                            onValueChange = {(v) => set("sex", v as Sex)}
                        >
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "M" id = "gender-m" />
                                <FieldLabel htmlFor = "gender-m" className = "font-normal">M</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "F" id = "gender-f" />
                                <FieldLabel htmlFor = "gender-f" className = "font-normal">F</FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Address" : "Address *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "123 Rizal St, Sampaloc, Manila"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.address : formData!.address}
                            onChange = {(e) => isSearch ? setFilter("address", e.target.value) : set("address", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate with commas.</FieldDescription>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLabel>{isSearch ? "Type" : "Type *"}</FieldLabel>
                    {isSearch ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox
                                        id = "license-checkbox-nonpro"
                                        checked = {filterData!.license_type_nonpro}
                                        onCheckedChange = {(v) => setFilter("license_type_nonpro", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-nonpro">Non-Professional</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "license-checkbox-pro"
                                        checked = {filterData!.license_type_pro}
                                        onCheckedChange = {(v) => setFilter("license_type_pro", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-pro">Professional</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "license-checkbox-student"
                                        checked = {filterData!.license_type_student}
                                        onCheckedChange = {(v) => setFilter("license_type_student", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-student">Student Permit</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup
                            value = {formData!.license_type}
                            onValueChange = {(v) => set("license_type", v as LicenseType)}
                        >
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Non-Professional" id = "license-nonpro" />
                                <FieldLabel htmlFor = "license-nonpro" className = "font-normal">Non-Professional</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Professional" id = "license-pro" />
                                <FieldLabel htmlFor = "license-pro" className = "font-normal">Professional</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Student Permit" id = "license-student" />
                                <FieldLabel htmlFor = "license-student" className = "font-normal">Student Permit</FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet>
                    <FieldLabel>{isSearch ? "Status" : "Status *"}</FieldLabel>
                    {isSearch ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox
                                        id = "license-checkbox-valid"
                                        checked = {filterData!.license_status_valid}
                                        onCheckedChange = {(v) => setFilter("license_status_valid", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-valid">Valid</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "license-checkbox-expired"
                                        checked = {filterData!.license_status_expired}
                                        onCheckedChange = {(v) => setFilter("license_status_expired", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-expired">Expired</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "license-checkbox-suspended"
                                        checked = {filterData!.license_status_suspended}
                                        onCheckedChange = {(v) => setFilter("license_status_suspended", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-suspended">Suspended</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "license-checkbox-revoked"
                                        checked = {filterData!.license_status_revoked}
                                        onCheckedChange = {(v) => setFilter("license_status_revoked", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-revoked">Revoked</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup
                            value = {formData!.license_status}
                            onValueChange = {(v) => set("license_status", v as LicenseStatus)}
                        >
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Valid" id = "license-valid" />
                                <FieldLabel htmlFor = "license-valid" className = "font-normal">Valid</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Expired" id = "license-expired" />
                                <FieldLabel htmlFor = "license-expired" className = "font-normal">Expired</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Suspended" id = "license-suspended" />
                                <FieldLabel htmlFor = "license-suspended" className = "font-normal">Suspended</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Revoked" id = "license-revoked" />
                                <FieldLabel htmlFor = "license-revoked" className = "font-normal">Revoked</FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    <FieldLabel>{isSearch ? "License Issued" : "License Issued *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <DatePicker
                                placeholder = "Min"
                                selected = {filterData!.issued_at_min}
                                onSelect = {(d) => setFilter("issued_at_min", d)}
                            />
                            <DatePicker
                                placeholder = "Max"
                                selected = {filterData!.issued_at_max}
                                onSelect = {(d) => setFilter("issued_at_max", d)}
                            />
                        </div>
                    ) : (
                        <DatePicker
                            required
                            selected = {formData!.issued_at}
                            onSelect = {(d) => set("issued_at", d)}
                        />
                    )}
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    <FieldLabel>{isSearch ? "Expiry Date" : "Expiry Date *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <DatePicker
                                placeholder = "Min"
                                selected = {filterData!.expires_at_min}
                                onSelect = {(d) => setFilter("expires_at_min", d)}
                            />
                            <DatePicker
                                placeholder = "Max"
                                selected = {filterData!.expires_at_max}
                                onSelect = {(d) => setFilter("expires_at_max", d)}
                            />
                        </div>
                    ) : (
                        <DatePicker
                            required
                            selected = {formData!.expires_at}
                            onSelect = {(d) => set("expires_at", d)}
                        />
                    )}
                </FieldSet>
            </FieldGroup>
        </>
    );
}