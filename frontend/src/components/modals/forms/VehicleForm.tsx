import { Field, FieldDescription, FieldGroup, 
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";

export function VehicleForm({ mode }: { mode: "create" | "edit" | "search" }) {
    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Plate No.</FieldLabel>
                    ) : (
                        <FieldLabel>Plate No. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "ABC 1234"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate with spaces.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Driver</FieldLabel>
                    ) : (
                        <FieldLabel>Driver *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "N01-12-345678"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Enter license and include hyphens.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Engine No.</FieldLabel>
                    ) : (
                        <FieldLabel>Engine No. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "ENG-123456"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphen.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Chassis No.</FieldLabel>
                    ) : (
                        <FieldLabel>Chassis No. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "CHA-123456"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphen.</FieldDescription>
                </FieldSet>

                <FieldSeparator/>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Make</FieldLabel>
                    ) : (
                        <FieldLabel>Make *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Toyota"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Model</FieldLabel>
                    ) : (
                        <FieldLabel>Model *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Corolla"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Year</FieldLabel>
                    ) : (
                        <FieldLabel>Year *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "2021"
                            className = "rounded-md text-sm"
                            type = "number"
                            min = {1886}
                            max = {2026}
                            step = {1}
                        />
                    </Field>
                </FieldSet>

                <FieldSet>
                    {mode === "search" ? (
                        <FieldLabel>Type</FieldLabel>
                    ) : (
                        <FieldLabel>Type *</FieldLabel>
                    )}

                    {mode === "search" ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "vehicle-checkbox-private" name = "vehicle-checkbox-private" />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-private">Private Car</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "vehicle-checkbox-puv" name = "vehicle-checkbox-puv" />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-puv">Public Utility Vehicle</Label>
                                </div>
                                
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox id = "vehicle-checkbox-motor" name = "vehicle-checkbox-motor" />
                                    <Label className = "font-normal" htmlFor = "vehicle-checkbox-motor">Motorcycle</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "Private Car">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Private Car" id = "vehicle-private" />
                                <FieldLabel htmlFor = "vehicle-private" className = "font-normal">
                                    Private Car
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Public Utility Vehicle" id = "vehicle-puv" />
                                <FieldLabel htmlFor = "vehicle-puv" className = "font-normal">
                                    Public Utility Vehicle
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Motorcycle" id = "vehicle-motor" />
                                <FieldLabel htmlFor = "vehicle-motor" className = "font-normal">
                                    Motorcycle
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Color</FieldLabel>
                    ) : (
                        <FieldLabel>Color *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Classic Silver Metallic"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                </FieldSet>
            </FieldGroup>
        </>
    )
}