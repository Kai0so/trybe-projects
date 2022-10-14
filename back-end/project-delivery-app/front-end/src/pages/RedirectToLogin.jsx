import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Exemplo() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  });

  return (
    <h1>Loading...</h1>
  );
}

export default Exemplo;
