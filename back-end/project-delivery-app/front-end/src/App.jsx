import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderDetails from './pages/Client/OrderDetails/OrderDetails';
import ClientOrders from './pages/Client/Pedidos/ClientPedidos';
import SellerOrderDetails from './pages/Seller/OrderDetails/SellerOrderDetails';
import RedirectToLogin from './pages/RedirectToLogin';
import Orders from './pages/Client/Pedidos/Orders';
import OrdersSeller from './pages/Seller/OrdersSeller';
import ClientProducts from './pages/Client/Products/ClientProducts';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import ClientProvider from './Provider/ClientProvider';
import MyProvider from './Provider/MyProvider';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Routes>
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/admin/manage" element={ <Admin /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route
            exact
            path="/customer/products"
            element={
              <ClientProvider>
                <ClientProducts />
              </ClientProvider>
            }
          />
          <Route
            exact
            path="/customer/orders/:id"
            element={
              <ClientProvider>
                <OrderDetails />
              </ClientProvider>
            }
          />
          <Route
            exact
            path="/customer/checkout"
            element={
              <ClientProvider>
                <ClientOrders />
              </ClientProvider>
            }
          />
          <Route
            exact
            path="/customer/orders"
            element={
              <ClientProvider>
                <Orders />
              </ClientProvider>
            }
          />
          <Route
            exact
            path="/seller/orders"
            element={
              <ClientProvider>
                <OrdersSeller />
              </ClientProvider>
            }
          />
          <Route exact path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
          <Route exact path="/" element={ <RedirectToLogin /> } />
        </Routes>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
