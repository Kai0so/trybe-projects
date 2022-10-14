import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ClientContext from './ClientContext';
import MyContext from './MyContext';

function ClientProvider({ children }) {
  const { products } = useContext(MyContext);
  const [shoppingCart, setShoppingCart] = useState(products);
  const [orders, setOrders] = useState([]);

  const setItemQuantity = (id, operation) => {
    const [productId] = shoppingCart.filter((product) => product.id === id);

    if (!operation.innerHTML) {
      productId.quantity = Number(operation.value);
    } else if (operation.innerHTML === '+') {
      productId.quantity += 1;
    } else if (productId.quantity > 0) {
      productId.quantity -= 1;
    } else {
      productId.quantity = 0;
    }

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  };

  const fetchOrders = async () => {
    const result = await fetch('http://localhost:3001/sales', {
      method: 'GET',
    });
    const data = await result.json();
    setOrders(data);
  };

  const contextObject = useMemo(() => ({
    shoppingCart,
    setShoppingCart,
    setItemQuantity,
    orders,
    setOrders,
    fetchOrders,
  }), [shoppingCart, setItemQuantity, orders]);

  useEffect(() => {
    if (!localStorage.getItem('shoppingCart')) {
      setShoppingCart(products);
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
  }, []);

  return (
    <ClientContext.Provider value={ contextObject }>
      { children }
    </ClientContext.Provider>
  );
}

ClientProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ClientProvider;
