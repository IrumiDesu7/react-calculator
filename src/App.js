/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import { useReducer } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import './styles.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  BACKSPACE: 'backspace',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (
        (payload.digit === '0' && state.firstOperand === '0') ||
        (payload.digit === '.' && state.firstOperand.includes('.'))
      ) {
        return state;
      }

      if (state.operation == null) {
        return {
          ...state,
          firstOperand: `${state.firstOperand || ''}${payload.digit}`,
        };
      } else {
        return {
          ...state,
          secondOperand: `${state.secondOperand || ''}${payload.digit}`,
        };
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.firstOperand == null) {
        return state;
      }
      if (state.secondOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      return {
        ...state,
        result: evaluate(state),
      };
  }
};

function evaluate({ firstOperand, operation, secondOperand }) {
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);
  if (isNaN(first) || isNaN(second)) return '';
  // eslint-disable-next-line default-case
  switch (operation) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case 'x':
      return first * second;
    case '÷':
      return second === '0' ? 'error' : first / second;
  }
}

function App() {
  const [{ firstOperand, secondOperand, operation, result }, dispatch] =
    useReducer(reducer, {});
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='operation'>
          {firstOperand} {operation} {secondOperand}
        </div>
        <div className='result'>{result}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>( )</button>
      <button>%</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='x' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <button>⌫</button>
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
