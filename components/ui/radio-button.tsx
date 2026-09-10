import React from "react"
import { RadioGroupItem } from "./radio-group"
import { Label } from "./label"

const RadioButton = ({
  id,
  value,
  label,
}: {
  id: string
  value: string
  label: string
}) => {
  return (
    <div className="flex items-center gap-3">
      <RadioGroupItem value={value} className="peer sr-only!" id={id} />
      <Label
        htmlFor={id}
        className="inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap shadow-none transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:border peer-data-[state=unchecked]:border-input peer-data-[state=unchecked]:bg-secondary peer-data-[state=unchecked]:shadow-none peer-data-[state=checked]:hover:bg-primary/90 peer-data-[state=unchecked]:hover:bg-background peer-data-[state=unchecked]:hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {label}
      </Label>
    </div>
  )
}

export default RadioButton
