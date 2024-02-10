import { NumericFormat } from 'react-number-format';
import { cn } from '../../app/utils/cn';
import { HelperTextError } from './HelperTextError';

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        decimalSeparator=','
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={cn(
          'text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full',
          error && 'text-red-900',
        )}
      />

      {error && <HelperTextError error={error} />}
    </div>
  )
}
