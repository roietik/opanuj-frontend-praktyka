import { isEven, isGreaterThan, isLessThan } from './helpers.ts';

export const VALIDATOR_MESSAGES = {
  ERROR_INVALID_INPUT: 'Invalid - empty or non integer.',
  ERROR_INVALID_INT: 'Invalid number.',
  SUCCESS_VALID_INT: 'Valid',
};

export type NumericValidationMethod = (input: number) => boolean;
export type StringValidationMethod = (input: string) => boolean;

export const NUMBER_VALIDATORS: NumericValidationMethod[] = [
  isGreaterThan(0),
  isLessThan(100),
  isEven
];
