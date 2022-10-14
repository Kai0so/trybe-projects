import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import MyContext from './MyContext';
import fetchProducts from '../services/clientAPI';

function MyProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const contextObject = useMemo(() => ({ products,
    setProducts,
    user,
    setUser }), [products, user]);

  const getProducts = async () => {
    const get = await fetchProducts();
    const addQuantity = get.map((product) => ({ ...product, quantity: 0 }));
    setProducts(addQuantity);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MyContext.Provider value={ contextObject }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
