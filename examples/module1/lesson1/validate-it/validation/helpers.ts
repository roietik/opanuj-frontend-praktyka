import { NumericValidationMethod } from './interfaces.ts';

export const isGreaterThan = (boundary: number): NumericValidationMethod => {
  return (value: number) => value > boundary;
};
export const isLessThan = (boundary: number): NumericValidationMethod => {
  return (value: number) => value < boundary;
};
export const isEven = (value: number): boolean => value % 2 === 0;

export const isValidInteger = (value: string): boolean => {
  return value !== '' && Number.isInteger(Number(value));
};