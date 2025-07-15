import React, { useState } from 'react';

const OrderForm = ({ onSubmit, orderSent }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <div className="order-form">
      <h2>Данные заказа</h2>
      
      {orderSent ? (
        <div className="success-message">
          ✅ Заказ отправлен !
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Адрес клиента:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Улица, дом, квартира"
            />
          </label>
          <button type="submit">Отправить заказ</button>
        </form>
      )}
    </div>
  );
};

export default OrderForm;

//8058137136:AAHZnTgSPxjx6D872ZhMPwMib0sP_pY4d9U    -1002254350247