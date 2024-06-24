export function add(firstAddend: number, secondAddend: number): number {
  return firstAddend + secondAddend;
}
export function subtract(minuend: number, subtrahend: number): number {
  return minuend - subtrahend;
}
export function multiply(firstFactor: number, secondFactor: number): number {
  return firstFactor * secondFactor;
}

export function divide(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error('Error: Cannot divide by zero!');
  }
  return dividend / divisor;
}
