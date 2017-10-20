import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/CounterActions';

export default function counter(state = { count: 0, loading: false }, action) {
  switch (action.type) {
    case INCREMENT_COUNTER.START:
      return { ...state, loading: true };
    case INCREMENT_COUNTER.FINISH:
      return { count: state.count + 1, loading: false };
    case DECREMENT_COUNTER.START:
      return { ...state, loading: true };
    case DECREMENT_COUNTER.FINISH:
      return { count: state.count - 1, loading: false };
    default:
    return state;
  }
}
