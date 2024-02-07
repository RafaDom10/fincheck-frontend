import { NumericFormat } from 'react-number-format'
import { HelperTextError } from './HelperTextError'

interface InputCurrencyProps {
  error?: string
  value?: string
  onChange?(value: string): void
}

export function InputCurrency ({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        className="text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full"
        onChange={(e) => { onChange?.(e.target.value) }}
      />
      {error && <HelperTextError error={error} />}
    </div>
  )
}
