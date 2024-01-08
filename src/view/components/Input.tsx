import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  name: string
}

export function Input({ placeholder, name, id, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
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
}
