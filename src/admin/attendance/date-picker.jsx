import { format } from "date-fns"
import { useState } from "react"

export function CalendarForm({ value, onChange }) {
  const [open, setOpen] = useState(false)

  // Format the date to display
  const formattedDate = value ? format(value, "PPP") : "Enter date"

  // Handler for date input change
  const handleDateChange = (e) => {
    const dateValue = e.target.value ? new Date(e.target.value) : null
    onChange(dateValue)
    setOpen(false)
  }

  return (
    <form className="space-y-4">
      <div className="relative inline-block w-48">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left px-3 py-2 border rounded-md border-gray-300 bg-white hover:bg-gray-50"
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {formattedDate}
          </span>
        </button>
        {open && (
          <input
            type="date"
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
            max={format(new Date(), "yyyy-MM-dd")}
            min="1900-01-01"
            value={value ? format(value, "yyyy-MM-dd") : ""}
            onChange={handleDateChange}
            onBlur={() => setOpen(false)}
            autoFocus
          />
        )}
      </div>
    </form>
  )
}
