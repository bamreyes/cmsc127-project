import { Field, FieldDescription, FieldGroup, 
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { DatePicker } from "@/components/DatePicker";

export function DriverForm({ mode }: { mode: "create" | "edit" | "search" }) {
    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>License No.</FieldLabel>
                    ) : (
                        <FieldLabel>License No. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "N01-12-345678"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Include hyphens.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Full Name</FieldLabel>
                    ) : (
                        <FieldLabel>Full Name *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Juan dela Cruz"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate first, middle, and last name with spaces.</FieldDescription>
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>Birthdate</FieldLabel>
                    ) : (
                        <FieldLabel>Birthdate *</FieldLabel>
                    )}

                    <DatePicker required = {mode !== "search"}></DatePicker>
                </FieldSet>

                <FieldSet>
                    {mode === "search" ? (
                        <FieldLabel>Gender</FieldLabel>
                    ) : (
                        <FieldLabel>Gender *</FieldLabel>
                    )}

                    {mode === "search" ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox id = "gender-checkbox-m" name = "gender-checkbox-m" />
                                    <Label className = "font-normal" htmlFor = "gender-checkbox-m font-normal">M</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "gender-checkbox-f" name = "gender-checkbox-f" />
                                    <Label className = "font-normal" htmlFor = "gender-checkbox-f">F</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "M">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "M" id = "gender-m" />
                                <FieldLabel htmlFor = "gender-m" className = "font-normal">
                                    M
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "F" id="gender-f" />
                                <FieldLabel htmlFor = "gender-f" className = "font-normal">
                                    F
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Address</FieldLabel>
                    ) : (
                        <FieldLabel>Address *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "123 Rizal St, Sampaloc, Manila"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate with commas.</FieldDescription>
                </FieldSet>

                <FieldSeparator/>

                <FieldSet>
                    {mode === "search" ? (
                        <FieldLabel>Type</FieldLabel>
                    ) : (
                        <FieldLabel>Type *</FieldLabel>
                    )}

                    {mode === "search" ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox id = "license-checkbox-nonpro" name = "license-checkbox-nonpro" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-nonpro">Non-Professional</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "license-checkbox-pro" name = "license-checkbox-pro" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-pro">Professional</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "license-checkbox-student" name = "license-checkbox-student" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-student">Student Permit</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "Non-Professional">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Non-Professional" id = "license-nonpro" />
                                <FieldLabel htmlFor = "license-nonpro" className = "font-normal">
                                    Non-Professional
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Professional" id = "license-pro" />
                                <FieldLabel htmlFor = "license-pro" className = "font-normal">
                                    Professional
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Student Permit" id = "license-student" />
                                <FieldLabel htmlFor = "license-student" className = "font-normal">
                                    Student Permit
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet>
                    {mode === "search" ? (
                        <FieldLabel>Status</FieldLabel>
                    ) : (
                        <FieldLabel>Status *</FieldLabel>
                    )}

                    {mode === "search" ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox id = "license-checkbox-valid" name = "license-checkbox-valid" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-valid">Valid</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "license-checkbox-expired" name = "license-checkbox-expired" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-expired">Expired</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "license-checkbox-suspended" name = "license-checkbox-suspended" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-suspended">Suspended</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "license-checkbox-revoked" name = "license-checkbox-revoked" />
                                    <Label className = "font-normal" htmlFor = "license-checkbox-revoked">Revoked</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "Valid">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Valid" id = "license-valid" />
                                <FieldLabel htmlFor = "license-valid" className = "font-normal">
                                    Valid
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Expired" id = "license-expired" />
                                <FieldLabel htmlFor = "license-expired" className = "font-normal">
                                    Expired
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Suspended" id = "license-suspended" />
                                <FieldLabel htmlFor = "license-suspended" className = "font-normal">
                                    Suspended
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Revoked" id = "license-revoked" />
                                <FieldLabel htmlFor = "license-revoked" className = "font-normal">
                                    Revoked
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>License Issued</FieldLabel>
                    ) : (
                        <FieldLabel>License Issued *</FieldLabel>
                    )}

                    <DatePicker required = {mode !== "search"}></DatePicker>
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>Expiry Date</FieldLabel>
                    ) : (
                        <FieldLabel>Expiry Date *</FieldLabel>
                    )}

                    <DatePicker required = {mode !== "search"}></DatePicker>
                </FieldSet>
            </FieldGroup>
        </>
    )
}