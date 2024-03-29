import { useState } from 'react'
import { cn } from '../../app/utils/cn'
import { HelperTextError } from './HelperTextError'
import { formatDate } from '../../app/utils/formatDate'
import { Popover } from './Popover'
import { DatePicker } from './DatePicker'

interface DatePickerInputProps {
  error?: string
  className?: string
  value?: Date
  onChange?(date: Date): void
}

export function DatePickerInput ({ className, error, value, onChange }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())

  function handleChangeDate (date: Date) {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn(
              'bg-white w-full rounded-lg border px-3 border-gray-500 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4',
              error && 'border-red-900 focus:border-red-900',
              className
            )}
          >
            <span className='absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none'>
              Data
            </span>
            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </Popover.Content>
      </Popover.Root>

      {error && <HelperTextError error={error} />}

    </div>
  )
}
