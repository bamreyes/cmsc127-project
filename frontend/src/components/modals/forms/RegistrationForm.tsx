import type { RegistrationStatus } from "@shared";
import { Field, FieldDescription, FieldGroup,
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { DatePicker } from "@/components/DatePicker";

export interface RegistrationFormData {
    registration_number: number | "";
    plate_number: string;
    registration_status: RegistrationStatus;
    registration_date: Date | undefined;
    expiration_date: Date | undefined;
}

export interface RegistrationFilterData {
    registration_number: number | "";
    plate_number: string;
    registration_status_active: boolean;
    registration_status_expired: boolean;
    registration_status_suspended: boolean;
    registration_date_min: Date | undefined;
    registration_date_max: Date | undefined;
    expiration_date_min: Date | undefined;
    expiration_date_max: Date | undefined;
}

export const defaultRegistrationFormData: RegistrationFormData = {
    registration_number: "",
    plate_number: "",
    registration_status: "Active",
    registration_date: undefined,
    expiration_date: undefined,
};

export const defaultRegistrationFilterData: RegistrationFilterData = {
    registration_number: "",
    plate_number: "",
    registration_status_active: false,
    registration_status_expired: false,
    registration_status_suspended: false,
    registration_date_min: undefined,
    registration_date_max: undefined,
    expiration_date_min: undefined,
    expiration_date_max: undefined,
};

type Props =
    | { mode: "create" | "edit"; formData: RegistrationFormData; onChange: (data: RegistrationFormData) => void; filterData?: never; onFilterChange?: never; }
    | { mode: "search"; filterData: RegistrationFilterData; onFilterChange: (data: RegistrationFilterData) => void; formData?: never; onChange?: never; };

export function RegistrationForm({ mode, formData, onChange, filterData, onFilterChange }: Props) {
    const isSearch = mode === "search";

    const set = (field: keyof RegistrationFormData, value: any) => {
        onChange?.({ ...formData!, [field]: value });
    };

    const setFilter = (field: keyof RegistrationFilterData, value: any) => {
        onFilterChange?.({ ...filterData!, [field]: value });
    };

    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Registration No." : "Registration No. *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "0001"
                            className = "rounded-md text-sm"
                            type = "number"
                            min = {0}
                            step = {1}
                            required = {!isSearch}
                            readOnly = {mode === "edit"}
                            value = {isSearch ? filterData!.registration_number : formData!.registration_number}
                            onChange = {(e) => {
                                const val = e.target.value === "" ? "" : Number(e.target.value);
                                isSearch ? setFilter("registration_number", val) : set("registration_number", val);
                            }}
                        />
                    </Field>

                    {mode === "edit" && (
                        <FieldDescription className = "text-xs text-slate-400">Registration no. cannot be changed.</FieldDescription>
                    )}
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Plate No." : "Plate No. *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "ABC 1234"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.plate_number : formData!.plate_number}
                            onChange = {(e) => isSearch ? setFilter("plate_number", e.target.value) : set("plate_number", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate with spaces.</FieldDescription>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLabel>{isSearch ? "Status" : "Status *"}</FieldLabel>
                    {isSearch ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox
                                        id = "registration-checkbox-active"
                                        checked = {filterData!.registration_status_active}
                                        onCheckedChange = {(v) => setFilter("registration_status_active", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-active">Active</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "registration-checkbox-expired"
                                        checked = {filterData!.registration_status_expired}
                                        onCheckedChange = {(v) => setFilter("registration_status_expired", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-expired">Expired</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "registration-checkbox-suspended"
                                        checked = {filterData!.registration_status_suspended}
                                        onCheckedChange = {(v) => setFilter("registration_status_suspended", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-suspended">Suspended</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup
                            value = {formData!.registration_status}
                            onValueChange = {(v) => set("registration_status", v as RegistrationStatus)}
                        >
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Active" id = "registration-active" />
                                <FieldLabel htmlFor = "registration-active" className = "font-normal">Active</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Expired" id = "registration-expired" />
                                <FieldLabel htmlFor = "registration-expired" className = "font-normal">Expired</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Suspended" id = "registration-suspended" />
                                <FieldLabel htmlFor = "registration-suspended" className = "font-normal">Suspended</FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    <FieldLabel>{isSearch ? "Registration Date" : "Registration Date *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <DatePicker
                                placeholder = "Min"
                                selected = {filterData!.registration_date_min}
                                onSelect = {(d) => setFilter("registration_date_min", d)}
                            />
                            <DatePicker
                                placeholder = "Max"
                                selected = {filterData!.registration_date_max}
                                onSelect = {(d) => setFilter("registration_date_max", d)}
                            />
                        </div>
                    ) : (
                        <DatePicker
                            required
                            selected = {formData!.registration_date}
                            onSelect = {(d) => set("registration_date", d)}
                        />
                    )}
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    <FieldLabel>{isSearch ? "Expiration Date" : "Expiration Date *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <DatePicker
                                placeholder = "Min"
                                selected = {filterData!.expiration_date_min}
                                onSelect = {(d) => setFilter("expiration_date_min", d)}
                            />
                            <DatePicker
                                placeholder = "Max"
                                selected = {filterData!.expiration_date_max}
                                onSelect = {(d) => setFilter("expiration_date_max", d)}
                            />
                        </div>
                    ) : (
                        <DatePicker
                            required
                            selected = {formData!.expiration_date}
                            onSelect = {(d) => set("expiration_date", d)}
                        />
                    )}
                </FieldSet>
            </FieldGroup>
        </>
    );
}