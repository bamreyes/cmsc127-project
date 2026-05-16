import { Field, FieldDescription, FieldGroup, 
         FieldLabel, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { DatePicker } from "@/components/DatePicker";

export function ViolationForm({ mode }: { mode: "create" | "edit" | "search" }) {
    return (
        <>
            <FieldGroup className = "gap-y-6">
                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>ID</FieldLabel>
                    ) : (
                        <FieldLabel>ID *</FieldLabel>
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

                <FieldSet className = "flex-row justify-between">
                    {mode === "search" ? (
                        <FieldLabel>Date</FieldLabel>
                    ) : (
                        <FieldLabel>Date *</FieldLabel>
                    )}

                    <DatePicker></DatePicker>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Violator</FieldLabel>
                    ) : (
                        <FieldLabel>Violator *</FieldLabel>
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

                <FieldSeparator/>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Location</FieldLabel>
                    ) : (
                        <FieldLabel>Location *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Sampaloc, Manila"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate with commas.</FieldDescription>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Violation</FieldLabel>
                    ) : (
                        <FieldLabel>Violation *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "Illegal Parking"
                            className = "rounded-md text-sm"
                            required = {mode !== "search"}
                        />
                    </Field>
                </FieldSet>

                <FieldSet className = "gap-y-2">
                    {mode === "search" ? (
                        <FieldLabel>Fine Amount</FieldLabel>
                    ) : (
                        <FieldLabel>Fine Amount *</FieldLabel>
                    )}

                    <Field>
                        <Input
                            placeholder = "0001"
                            className = "rounded-md text-sm"
                            type = "number"
                            min = {0}
                            step = {0.01}
                            required = {mode !== "search"}
                        />
                    </Field>
                </FieldSet>  

                <FieldSet className = "gap-y-2">
                    <FieldLabel>Officer</FieldLabel>

                    <Field>
                        <Input
                            placeholder = "Juan dela Cruz"
                            className = "rounded-md text-sm"
                        />
                    </Field>
                    <FieldDescription className = "text-xs">Separate first, middle, and last name with spaces.</FieldDescription>
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
                                    <Checkbox id = "violation-checkbox-unpaid" name = "violation-checkbox-unpaid" />
                                    <Label className = "font-normal" htmlFor = "violation-checkbox-unpaid">Unpaid</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "violation-checkbox-paid" name = "violation-checkbox-paid" />
                                    <Label className = "font-normal" htmlFor = "violation-checkbox-paid">Paid</Label>
                                </div>

                                <div className = "flex flex-row gap-3">
                                    <Checkbox id = "violation-checkbox-contested" name = "violation-checkbox-contested" />
                                    <Label className = "font-normal" htmlFor = "violation-checkbox-contested">Contested</Label>
                                </div>
                            </div>
                        </Field>
                    ) : (
                        <RadioGroup defaultValue = "Unpaid">
                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Unpaid" id = "violation-unpaid" />
                                <FieldLabel htmlFor = "violation-unpaid" className = "font-normal">
                                    Unpaid
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Paid" id = "violation-paid" />
                                <FieldLabel htmlFor = "violation-paid" className = "font-normal">
                                    Paid
                                </FieldLabel>
                            </Field>

                            <Field orientation = "horizontal">
                                <RadioGroupItem value = "Contested" id = "violation-contested" />
                                <FieldLabel htmlFor = "violation-contested" className = "font-normal">
                                    Contested
                                </FieldLabel>
                            </Field>
                        </RadioGroup>
                    )}
                </FieldSet>
            </FieldGroup>
        </>
    )
}