import React, { useContext, useState, useEffect } from 'react';
import ClientContext from '../../Provider/ClientContext';
import Items from './Items';

function ItemsOrdered() {
  const { shoppingCart } = useContext(ClientContext);
  const [totalValue, setTotalValue] = useState(0);
  const [soldItems, setSoldItems] = useState([]);

  const getItemsFromLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('shoppingCart'));

    if (!items) {
      setSoldItems(shoppingCart);
    } else {
      setSoldItems(items);
    }
  };

  function getTotalValue() {
    const data = localStorage.getItem('totalValue');
    const converted = data.replace(',', '.');
    setTotalValue(Number(converted));
  }

  const removeCartItem = (e) => {
    const [find] = soldItems.filter((c) => c.id === Number(e.target.id));
    const result = (Number(totalValue) - Number(find.quantity * find.price)).toFixed(2);
    setTotalValue(result);
    find.quantity = 0;
    soldItems.splice(e.target.id - 1, 1, find);
    setSoldItems(soldItems);
    localStorage.setItem('shoppingCart', JSON.stringify(soldItems));
    localStorage.setItem('totalValue', (result).replace('.', ','));
  };

  useEffect(() => {
    getTotalValue();
    getItemsFromLocalStorage();
  }, []);

  return (
    <div className="flex flex-col justify-center container w-2/3">
      <table className="table-auto my-12">
        <thead className="px-3 space-y-2">
          <tr className="text-center px-3 text-left">
            <th className="outline outline-1 outline-neutral-200">Item</th>
            <th className="outline outline-1 outline-neutral-200">Descrição</th>
            <th className="outline outline-1 outline-neutral-200">Quantidade</th>
            <th className="outline outline-1 outline-neutral-200">Valor Unitário</th>
            <th className="outline outline-1 outline-neutral-200">Sub-total</th>
            <th className="outline outline-1 outline-neutral-200">Remover Item</th>
          </tr>
        </thead>
        <tbody className="">
          {
            soldItems
              .filter(({ quantity }) => quantity > 0)
              .map(({ id, name, price, quantity }, index) => (
                <Items
                  id={ id }
                  description={ name }
                  quantity={ quantity }
                  unitValue={ Number(price) }
                  itemNumber={ index }
                  key={ index }
                  removeCartItem={ removeCartItem }
                />
              ))
          }
        </tbody>
      </table>
      <h2 className="text-right text-4xl my-5">
        <span className="font-bold">Total: R$ </span>
        <span
          data-testid="customer_checkout__element-order-total-price"
          className="font-bold"
        >
          {Number(totalValue).toFixed(2).replace('.', ',')}
        </span>
      </h2>
    </div>
  );
}

export default ItemsOrdered;
