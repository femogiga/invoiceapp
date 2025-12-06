'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

function formatDate(date: Date | undefined) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

const FormCalender = ({ onSendDate, invoiceData }) => {
  const [open, setOpen] = React.useState(false);

  // ✅ SINGLE SOURCE OF TRUTH: Initialize state once properly
  const [date, setDate] = React.useState<Date | undefined>(() => {
    console.log('🔄 Initializing date from:', invoiceData?.invoiceDate);

    if (invoiceData?.invoiceDate) {
      const parsedDate = new Date(invoiceData.invoiceDate);
      if (isValidDate(parsedDate)) {
        console.log('✅ Using API date:', parsedDate);
        return parsedDate;
      }
    }

    console.log('⚠️ Using today as fallback');
    return new Date();
  });

  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(() => formatDate(date));

  // ✅ Sync with parent when invoiceData changes
  React.useEffect(() => {
    if (invoiceData?.invoiceDate && date) {
      const apiDate = new Date(invoiceData.invoiceDate);
      const currentDateStr = date.toISOString().split('T')[0];
      const apiDateStr = apiDate.toISOString().split('T')[0];

      if (isValidDate(apiDate) && currentDateStr !== apiDateStr) {
        console.log('🔄 Updating from parent:', apiDate);
        setDate(apiDate);
        setMonth(apiDate);
        setValue(formatDate(apiDate));
      }
    }
  }, [invoiceData?.invoiceDate, date]);

  console.log('📊 Current state:', { date, value });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setValue(formatDate(selectedDate));
      setMonth(selectedDate);
      setOpen(false);

      if (onSendDate) {
        // Send ISO string (YYYY-MM-DD)
        onSendDate(selectedDate.toISOString().split('T')[0]);
      }
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Label htmlFor='date'>Invoice Date</Label>
      <div className='relative flex gap-2'>
        <Input
          id='date'
          value={value}
          placeholder='Select date'
          className='bg-background pr-10'
          onChange={(e) => {
            const inputValue = e.target.value;
            setValue(inputValue);

            const inputDate = new Date(inputValue);
            if (isValidDate(inputDate)) {
              setDate(inputDate);
              setMonth(inputDate);
              if (onSendDate) {
                onSendDate(inputDate.toISOString().split('T')[0]);
              }
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='ghost' className='absolute right-2'>
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Debug info */}
      <div className='text-xs text-gray-500'>
        API: {invoiceData?.invoiceDate || 'none'} | Display: {value || 'none'}
      </div>
    </div>
  );
};

export default FormCalender;
