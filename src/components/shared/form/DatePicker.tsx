import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { format } from "date-fns"

interface DatePickerProps {
    label: string
    name: string
    placeholder?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    error?: string
    disabled?: boolean
    isInvalid?: boolean
}

export default function DatePicker({
    label,
    name,
    placeholder = "Select date",
    value,
    onChange,
    error,
    isInvalid,
    disabled = false
}: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [month, setMonth] = useState<Date | undefined>(value || new Date())
    const [inputValue, setInputValue] = useState(value ? format(value, "dd-MM-yyyy") : "")


    useEffect(() => {
        setInputValue(value ? format(value, "dd-MM-yyyy") : "")
        if (value) {
            setMonth(value)
        }
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        
        const date = new Date(newValue)
        if (isValidDate(date)) {
            onChange?.(date)
            setMonth(date)
        }
    }

    const handleDateSelect = (date: Date | undefined) => {
        onChange?.(date)
        setInputValue(date ? format(date, "dd-MM-yyyy") : "")
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1 text-gbese-grey-400 font-normal">
                {label}
            </Label>
            <div className="relative flex gap-2">
                <Input
                    id={name}
                    name={name}
                    value={inputValue}
                    placeholder={placeholder}
                    className={`bg-gbese-background text-sm px-3.5 py-4 ${isInvalid ? "border-red-600 text-red-600" : ""}`}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            id="date-picker"
                            disabled={disabled}
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                        <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={value}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={handleDateSelect}
                            disabled={disabled}
                            required={false}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {error && (
                <span className="text-sm text-red-600 px-1">{error}</span>
            )}
        </div>
    )
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}