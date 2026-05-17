import type { VehicleType } from "@shared";
import { Field, FieldDescription, FieldGroup,
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";

export interface VehicleFormData {
    plate_number: string;
    license_number: string;
    engine_number: string;
    chassis_number: string;
    make: string;
    model: string;
    year: number | "";
    vehicle_type: VehicleType;
    color: string;
}

export interface VehicleFilterData {
    plate_number: string;
    license_number: string;
    engine_number: string;
    chassis_number: string;
    make: string;
    model: string;
    min_year: number | "";
    max_year: number | "";
    vehicle_type_private: boolean;
    vehicle_type_puv: boolean;
    vehicle_type_motor: boolean;
    color: string;
}

export const defaultVehicleFormData: VehicleFormData = {
    plate_number: "",
    license_number: "",
    engine_number: "",
    chassis_number: "",
    make: "",
    model: "",
    year: "",
    vehicle_type: "Private Car",
    color: "",
};

export const defaultVehicleFilterData: VehicleFilterData = {
    plate_number: "",
    license_number: "",
    engine_number: "",
    chassis_number: "",
    make: "",
    model: "",
    min_year: "",
    max_year: "",
    vehicle_type_private: false,
    vehicle_type_puv: false,
    vehicle_type_motor: false,
    color: "",
};

type Props =
    | { mode: "create" | "edit"; formData: VehicleFormData; onChange: (data: VehicleFormData) => void; filterData?: never; onFilterChange?: never; }
    | { mode: "search"; filterData: VehicleFilterData; onFilterChange: (data: VehicleFilterData) => void; formData?: never; onChange?: never; };

export function VehicleForm({ mode, formData, onChange, filterData, onFilterChange }: Props) {
    const isSearch = mode === "search";

    const set = (field: keyof VehicleFormData, value: any) => {
        onChange?.({ ...formData!, [field]: value });
    };

    const setFilter = (field: keyof VehicleFilterData, value: any) => {
        onFilterChange?.({ ...filterData!, [field]: value });
    };

    return (
        <>
            <FieldGroup className = "gap-y-6">
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

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Driver" : "Driver *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "N01-12-345678"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.license_number : formData!.license_number}
                            onChange = {(e) => isSearch ? setFilter("license_number", e.target.value) : set("license_number", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Enter license no. and include hyphens.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Engine No." : "Engine No. *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "ENG-123456"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.engine_number : formData!.engine_number}
                            onChange = {(e) => isSearch ? setFilter("engine_number", e.target.value) : set("engine_number", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphen.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Chassis No." : "Chassis No. *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "CHA-123456"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.chassis_number : formData!.chassis_number}
                            onChange = {(e) => isSearch ? setFilter("chassis_number", e.target.value) : set("chassis_number", e.target.value)}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphen.</FieldDescription>
                </FieldSet>

                <FieldSeparator />

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Make" : "Make *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "Toyota"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.make : formData!.make}
                            onChange = {(e) => isSearch ? setFilter("make", e.target.value) : set("make", e.target.value)}
                        />
                    </Field>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Model" : "Model *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "Corolla"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.model : formData!.model}
                            onChange = {(e) => isSearch ? setFilter("model", e.target.value) : set("model", e.target.value)}
                        />
                    </Field>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Year" : "Year *"}</FieldLabel>
                    {isSearch ? (
                        <div className = "flex flex-row gap-2">
                            <Field>
                                <Input
                                    placeholder = "Min"
                                    className = "rounded-md text-sm w-24"
                                    type = "number"
                                    min = {1886}
                                    max = {new Date().getFullYear() + 10}
                                    step = {1}
                                    value = {filterData!.min_year}
                                    onChange = {(e) => setFilter("min_year", e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            </Field>
                            <Field>
                                <Input
                                    placeholder = "Max"
                                    className = "rounded-md text-sm w-24"
                                    type = "number"
                                    min = {1886}
                                    max = {new Date().getFullYear() + 10}
                                    step = {1}
                                    value = {filterData!.max_year}
                                    onChange = {(e) => setFilter("max_year", e.target.value === "" ? "" : Number(e.target.value))}
                                />
                            </Field>
                        </div>
                    ) : (
                        <Field>
                            <Input
                                placeholder = "2021"
                                className = "rounded-md text-sm"
                                type = "number"
                                min = {1886}
                                max = {new Date().getFullYear() + 10}
                                step = {1}
                                required
                                value = {formData!.year}
                                onChange = {(e) => set("year", e.target.value === "" ? "" : Number(e.target.value))}
                            />
                        </Field>
                    )}
                </FieldSet>

                <FieldSet>
                    <FieldLabel>{isSearch ? "Type" : "Type *"}</FieldLabel>
                    {isSearch ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox
                                        id = "vehicle-checkbox-private"
                                        checked = {filterData!.vehicle_type_private}
                                        onCheckedChange = {(v) => setFilter("vehicle_type_private", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-private">Private Car</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "vehicle-checkbox-puv"
                                        checked = {filterData!.vehicle_type_puv}
                                        onCheckedChange = {(v) => setFilter("vehicle_type_puv", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-puv">Public Utility Vehicle</Label>
                                </div>
                                <div className = "flex flex-row gap-3">
                                    <Checkbox
                                        id = "vehicle-checkbox-motor"
                                        checked = {filterData!.vehicle_type_motor}
                                        onCheckedChange = {(v) => setFilter("vehicle_type_motor", !!v)}
                                    />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-motor">Motorcycle</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup
                            value = {formData!.vehicle_type}
                            onValueChange = {(v) => set("vehicle_type", v as VehicleType)}
                        >
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Private Car" id = "vehicle-private" />
                                <FieldLabel htmlFor = "vehicle-private" className = "font-normal">Private Car</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Public Utility Vehicle" id = "vehicle-puv" />
                                <FieldLabel htmlFor = "vehicle-puv" className = "font-normal">Public Utility Vehicle</FieldLabel>
                            </Field>
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Motorcycle" id = "vehicle-motor" />
                                <FieldLabel htmlFor = "vehicle-motor" className = "font-normal">Motorcycle</FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    <FieldLabel>{isSearch ? "Color" : "Color *"}</FieldLabel>
                    <Field>
                        <Input
                            placeholder = "Classic Silver Metallic"
                            className = "rounded-md text-sm"
                            required = {!isSearch}
                            value = {isSearch ? filterData!.color : formData!.color}
                            onChange = {(e) => isSearch ? setFilter("color", e.target.value) : set("color", e.target.value)}
                        />
                    </Field>
                </FieldSet>
            </FieldGroup>
        </>
    );
}