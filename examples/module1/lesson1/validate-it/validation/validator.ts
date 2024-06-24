import { VALIDATOR_MESSAGES } from './interfaces.ts';
import { isValidInteger } from './helpers.ts';
import { NumericValidationMethod } from '../../_solutions/validate-it/validation/methods.ts';

export function validator(value: string, validators: NumericValidationMethod[]): string {
  if (!isValidInteger(value)) {
    return VALIDATOR_MESSAGES.ERROR_INVALID_INPUT;
  }

  const isValidRangeInteger = validators.every((validatorFn) => validatorFn(Number(value)));
  if (!isValidRangeInteger) {
    return VALIDATOR_MESSAGES.ERROR_INVALID_INT;
  }
  return VALIDATOR_MESSAGES.SUCCESS_VALID_INT;
}