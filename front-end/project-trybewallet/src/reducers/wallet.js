const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'RECEIVE_CURRENCY':
    return { ...state, currencies: Object.keys(action.currency), isFetching: false };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default wallet;
