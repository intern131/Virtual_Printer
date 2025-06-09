import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({value,onChange}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <div className="Custom-datepicker" style={{marginTop:'2rem'}}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Choose date " 
         value={value}
         onChange={onChange}
         format="YYYY-MM-DD"
         
          
        />

      </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}