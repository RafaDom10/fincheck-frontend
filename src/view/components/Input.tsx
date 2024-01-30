import { type ComponentProps, forwardRef } from 'react'
import { cn } from '../../app/utils/cs'
import { HelperTextError } from './HelperTextError'

interface InputProps extends ComponentProps<'input'> {
  name: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder=" "
          className={cn(
            'bg-white w-full rounded-lg border px-3 border-gray-500 h-[52px] text-gray-800 pt-4 peer placeholder-shown:p-3 focus:border-gray-800 transition-all outline-none',
            error && 'border-red-900 focus:border-red-900',
            className
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 text-gray-700 pointer-events-none
          peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && <HelperTextError error={error} />}

      </div>
    )
  })
Input.displayName = 'Input'
