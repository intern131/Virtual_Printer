import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

export default function DateRangePickers({ value, onChange }) {
  const [start, end] = value;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1">
          <DatePicker
            label="Start Date"
            value={start}
            onChange={(date) => onChange([date, end])}
            maxDate={end || undefined}
            slotProps={{
              textField: {
                size: "medium",
                fullWidth: true,
                InputProps: {
                  startAdornment: <FaCalendarAlt className="mr-2" />,
                },
              },
            }}
          />
        </div>

        <div className="flex-1">
          <DatePicker
            label="End Date"
            value={end}
            onChange={(date) => onChange([start, date])}
            minDate={start || undefined}
            slotProps={{
              textField: {
                size: "medium",
                fullWidth: true,
                
                InputProps: {
                  startAdornment: <FaCalendarAlt className="mr-2" />,
                },
              },
            }}
          />
        </div>

    
      </div>
    </LocalizationProvider>
  );
}
