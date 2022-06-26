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
  // eslint-disable-next-line default-case
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.firstOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.firstOperand.includes('.')) {
        return state;
      }

      if (state.operation != null) {
        return {
          ...state,
          secondOperand: `${state.secondOperand || ''}${payload.digit}`,
        };
      }

      return {
        ...state,
        firstOperand: `${state.firstOperand || ''}${payload.digit}`,
      };

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
    // eslint-disable-next-line no-fallthrough
    case ACTIONS.CLEAR:
      return {};
  }
};

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
      <button>=</button>
    </div>
  );
}

export default App;
