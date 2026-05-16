import { Field, FieldDescription, FieldGroup, 
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { DatePicker } from "@/components/DatePicker";

export function RegistrationForm({ mode }: { mode: "create" | "edit" | "search" }) {
    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Registration No.</FieldLabel>
                    ) : (
                        <FieldLabel>Registration No. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "0001"
                            className = "rounded-md text-sm"
                            type = "number"
                            min = {0}
                            step = {1}
                        />
                    </Field>
                </FieldSet>  

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
                        <FieldLabel>Registered To</FieldLabel>
                    ) : (
                        <FieldLabel>Registered To. *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "N01-12-345678"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Enter license no. and include hyphens.</FieldDescription>
                </FieldSet>

                <FieldSeparator/>

                <FieldSet>
                    {mode === "search" ? (
                        <FieldLabel>Status</FieldLabel>
                    ) : (
                        <FieldLabel>Status *</FieldLabel>
                    )}

                    {mode === "search" ? (
                        <Field>
                            <div className = "flex flex-col gap-4">
                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "registration-checkbox-active" name = "registration-checkbox-active" />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-active">Active</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "registration-checkbox-expired" name = "registration-checkbox-expired" />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-expired">Expired</Label>
                                </div>
                                
                                <div className = "flex flex-row gap-3 -mt-2.5">
                                    <Checkbox id = "registration-checkbox-suspended" name = "registration-checkbox-suspended" />
                                    <Label className = "font-normal" htmlFor = "registration-checkbox-suspended">Suspended</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "Active">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Active" id = "registration-active" />
                                <FieldLabel htmlFor = "registration-active" className = "font-normal">
                                    Active
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Expired" id = "registration-expired" />
                                <FieldLabel htmlFor = "registration-expired" className = "font-normal">
                                    Expired
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Suspended" id = "registration-suspended" />
                                <FieldLabel htmlFor = "registration-suspended" className = "font-normal">
                                    Suspended
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>  

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>Registration Date</FieldLabel>
                    ) : (
                        <FieldLabel>Registration Date *</FieldLabel>
                    )}

                    <DatePicker></DatePicker>
                </FieldSet>

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>Expiration Date</FieldLabel>
                    ) : (
                        <FieldLabel>Expiration Date *</FieldLabel>
                    )}

                    <DatePicker></DatePicker>
                </FieldSet>
            </FieldGroup>
        </>
    )
}