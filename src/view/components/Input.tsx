import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<'input'> {
  name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, name, id, ...props }, ref ) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className="bg-white w-full rounded-lg border px-3 border-gray-500 h-[52px]
          text-gray-800 pt-4 peer placeholder-shown:p-3 focus:border-gray-800 transition-all
          outline-none"
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 text-gray-700 pointer-events-none
          peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>
      </div>
    )
  })
