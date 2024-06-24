
export interface Action {
    result: number,
    error?: string
}

const DIVIDE_ERROR_MESSAGE = 'Error: Cannot divide by zero!';


export function add(firstAddend: number, secondAddend: number): Action {
    return { result: firstAddend + secondAddend};
}
export function subtract(minuend: number, subtrahend: number): Action {
    return { result: minuend - subtrahend };
}
export function multiply(firstFactor: number, secondFactor: number): Action {
    return { result: firstFactor * secondFactor };
}

export function divide(dividend: number, divisor: number): Action {
    return {
        error: (divisor === 0) ? DIVIDE_ERROR_MESSAGE : undefined,
        result: dividend / divisor
    }
}
