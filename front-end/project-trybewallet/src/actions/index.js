export function loginAction(payload) {
  return ({
    type: 'LOG_IN',
    payload,
  });
}

export const requestCurrency = () => ({
  type: 'REQUEST_CURRENCY',
});

export const receiveCurrency = (currency) => ({
  type: 'RECEIVE_CURRENCY',
  currency,
});

export const failedRequest = (error) => ({
  type: 'FAILED_REQUEST',
  payload: error,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(receiveCurrency(currency)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}

export function addExpenses(payload) {
  return {
    type: 'ADD_EXPENSES',
    payload,
  };
}
