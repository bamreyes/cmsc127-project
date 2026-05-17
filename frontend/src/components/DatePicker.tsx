"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
    required?: boolean;
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
}

export function DatePicker({ selected, onSelect, placeholder = "Select date", disabled }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Field className = "w-44">
            <Popover open = {open} onOpenChange = {disabled ? undefined : setOpen}>
                <PopoverTrigger asChild className = "rounded-md">
                    <Button
                        variant = "outline"
                        id = "date"
                        className = "justify-start font-normal"
                        disabled = {disabled}
                    >
                        {selected ? selected.toLocaleDateString() : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className = "w-auto overflow-hidden p-0" align = "start">
                    <Calendar
                        mode = "single"
                        selected = {selected}
                        defaultMonth = {selected}
                        captionLayout = "dropdown"
                        startMonth = {new Date(1900, 0)}
                        endMonth = {new Date(new Date().getFullYear() + 10, 11)}
                        onSelect = {(date) => {
                            onSelect?.(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}