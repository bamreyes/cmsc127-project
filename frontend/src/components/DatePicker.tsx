"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  required?: boolean;
}

export function DatePicker({ required = false }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Field className="w-44">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        required={required}
        value={date ? date.toISOString() : ""}
        onChange={() => {}}
        className="pointer-events-none absolute bottom-0 left-1/2 h-0 w-0 opacity-0"
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="rounded-md">
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}