export function currencyStringToNumber(value: string) {
  if (typeof value === 'number') {
    return value;
  }

  const sanitizedString = value.replace(/\./g, '').replace(',', '.');

  return Number(sanitizedString);
}
