import React, { useState } from 'react';
import { add, subtract, multiply, divide, Action } from './calculator.ts';

const App = () => {
  const [firstInput, setFirstInput] = useState<number>(0);
  const [secondInput, setSecondInput] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>('');


  const calculate = (func: (a: number, b: number) => Action) => {
    // setResult(func(firstInput, secondInput));

    const calcResult = func(firstInput, secondInput);
    setResult(calcResult.error ? 0 : calcResult.result);
    setError(calcResult.error || '');
  };

  return (
      <div>
        <div className="grid grid-cols-2 gap-x-4">
          <input
              type="number"
              className="rounded-md shadow-md p-4"
              value={firstInput}
              onChange={(e) => setFirstInput(parseFloat(e.target.value))}
          />
          <input
              type="number"
              className="rounded-md shadow-md p-4"
              value={secondInput}
              onChange={(e) => setSecondInput(parseFloat(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-4 gap-x-4 my-4">
          <button
              className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
              onClick={() => calculate(add)}
          >
            +
          </button>
          <button
              className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
              onClick={() => calculate(subtract)}
          >
            -
          </button>
          <button
              className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
              onClick={() => calculate(multiply)}
          >
            *
          </button>
          <button
              className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
              onClick={() => calculate(divide)}
          >
            /
          </button>
        </div>
        <div>Result: {result}</div>
        <p>{error}</p>
      </div>
  );
};

export default App;
