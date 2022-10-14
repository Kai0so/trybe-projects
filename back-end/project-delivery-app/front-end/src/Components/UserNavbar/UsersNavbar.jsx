import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../Provider/MyContext';
import logoIcon from '../../images/LogoIcon.svg';

function UserNavbar() {
  const { setUser, user } = useContext(MyContext);
  const [userRole, setUserRole] = useState('');
  const [hamburguer, setHamgurger] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('totalValue');
    setUser('');
    setHamgurger(false);
    navigate('/login');
  };

  const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    setUserRole(userData.role);
  };

  useEffect(() => {
    getUserData();
    setHamgurger(false);
  }, []);

  return (
    <>
      <nav className="bg-yellow-300 flex lg:justify-between  lg:p-2 p-1">
        {userRole !== 'customer'
          ? (
            <>
              <button
                type="button"
                onClick={ () => navigate('/seller/orders') }
                className="navBoxContent pedidos"
                data-testid="customer_products__element-navbar-link-orders"
              >
                MEUS PEDIDOS
              </button>
              <p
                className="navBoxContent usuarioNome"
                data-testid="customer_products__element-navbar-user-full-name"
              >
                {user ? user.name : 'user'}
              </p>
              <button
                type="button"
                className="navBoxContent logout"
                data-testid="customer_products__element-navbar-link-logout"
                onClick={ logout }
              >
                Sair
              </button>
            </>)
          : (
            <>
              <div className="flex lg:mx-6 items-center justify-evenly lg:w-2/5">
                <div className="lg:mx-6 mx-3">
                  <img src={ logoIcon } alt="Logo icon" width={ 30 } />
                </div>
                <div className="flex flex-row items-left">
                  <button
                    type="button"
                    onClick={ () => navigate('/customer/products') }
                    className="lg:mx-6 lg:p-3"
                    data-testid="customer_products__element-navbar-link-products"
                  >
                    Produtos
                  </button>
                  <button
                    type="button"
                    onClick={ () => navigate('/customer/orders') }
                    className="lg:mx-6 lg:p-3 mx-3"
                    data-testid="customer_products__element-navbar-link-orders"
                  >
                    Pedidos
                  </button>
                </div>
              </div>
              <section
                className="Mobile flex outline outline-1 rounded
             p-3 items-center mx-3 ml-auto lg:hidden"
              >
                <button
                  type="button"
                  className="HAMBURGER-ICON space-y-1 lg:hidden"
                  onClick={ () => {
                    if (hamburguer === true) {
                      setHamgurger(false);
                    } else {
                      setHamgurger(true);
                    }
                  } }
                >
                  <span className="block h-1 w-8 animate-pulse bg-black" />
                  <span className="block h-1 w-8 animate-pulse bg-black" />
                  <span className="block h-1 w-8 animate-pulse bg-black" />
                </button>
              </section>
              <div className="lg:flex lg:flex-row lg:mx-3 text-right items-center hidden">
                <p
                  className="lg:mx-3 font-bold"
                  data-testid="customer_products__element-navbar-user-full-name"
                >
                  {user ? user.name : 'user'}
                </p>
                <button
                  type="button"
                  className="mx-3 p-3 rounded-full w-20 outline text-black
                transition-colors hover:bg-red-500 hover:text-white
                hover:outline-red-800 font-bold outline-1"
                  data-testid="customer_products__element-navbar-link-logout"
                  onClick={ logout }
                >
                  Sair
                </button>
              </div>
            </>
          )}
      </nav>
      { hamburguer ? (
        <div
          className="bg-neutral-100 space-y-3
           block text-right mx-6 items-right py-4"
        >
          <p
            className="lg:mx-3 font-bold"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {user ? user.name : 'user'}
          </p>
          <p>Configurações</p>
          <p>Cupons</p>
          <p>Suporte</p>
          <button
            type="button"
            className="my-2 p-3 rounded-full w-20 outline text-black
                transition-colors bg-yellow-300 hover:bg-red-500 hover:text-white
                hover:outline-red-800 font-bold outline-1"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            Sair
          </button>
        </div>
      ) : ''}
    </>

  );
}

export default UserNavbar;
