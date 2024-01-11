import { ComponentProps } from "react";
import { cn } from "../../app/utils/cs";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
}

export function Button({ className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button {...props}
      className={cn("bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl text-white font-medium transition-all flex items-center justify-center",
        className)}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      { isLoading && <Spinner className="h-6 w-6" /> }
    </button>
  )
}
